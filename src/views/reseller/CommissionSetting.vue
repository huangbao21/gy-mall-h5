<template>
  <div class="ration-setting nav-bar">
    <van-nav-bar
      title="新增权益"
      right-text="完成"
      left-arrow
      @click-left="onClickLeft"
      @click-right.stop="handleCommissionSave"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <div class="ration-content">
      <div class="ration-content-cell">
        <p class="input-label">销售额</p>
        <div class="input-wrapper">
          <van-field
            v-model="sellNumber"
            rows="1"
            type="number"
            autosize
            placeholder="请输入销售额"
            @blur="handleSalesInputBlur"
          />
          <span class="input-sign">元</span>
        </div>
        <p class="input-tips" v-if="sellNumberMin || sellNumberMax">
          可配置销售额度区间:{{ sellNumberMin }}-{{ sellNumberMax }}
        </p>
      </div>
      <div class="ration-content-cell">
        <p class="input-label">分佣比例</p>
        <div class="input-wrapper">
          <van-field
            v-model="ration"
            rows="1"
            type="number"
            autosize
            placeholder="请输入分佣比例"
            @blur="handleRationInputBlur"
          />
          <span class="input-sign">%</span>
        </div>
        <p class="input-tips">
          可配置分佣比例区间:{{ rationMin }}-{{ rationMax }}
        </p>
      </div>
      <div class="rights-tips">
        <p class="rights-tips-title">权益说明</p>
        <p class="rights-tips-content">
          用户本月达到此销售额，则本月按照该分佣比
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Toast } from "vant";
import {
  saveCommissionSetting,
  fetchCommissionLimit
} from "../../services/reseller";
export default defineComponent({
  name: "CommissionSetting",
  data() {
    return {
      ration: "",
      sellNumber: "",
      rationMin: "0",
      sellNumberMin: "",
      rationMax: "100",
      sellNumberMax: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.ration !== undefined) {
      next((vm: any) => {
        vm.ration = to.query.ration;
        vm.sellNumber = to.query.sellNumber;
      });
    } else {
      next();
    }
  },
  methods: {
    async handleCommissionSave() {
      if (!this.sellNumber.length) {
        Toast(`请设置销售额`);
        return;
      }
      if (!this.ration.length) {
        Toast(`请设置分佣比例`);
        return;
      }
      await saveCommissionSetting({
        sellNumber: Number(this.sellNumber),
        ration: Number(this.ration)
      });
      this.$router.go(-1);
    },
    onClickLeft() {
      this.$dialog
        .confirm({
          message: "权益信息未保存，确认返回？",
          className: "gy-dialog"
        })
        .then(() => {
          this.$router.go(-1);
        });
    },
    async handleRationInputBlur() {
      if (!this.ration) {
        return;
      } else if (this.sellNumber && this.ration) {
        return;
      }
      console.log(`ration 失去焦点`)
      const res = await fetchCommissionLimit({
        ration: Number(this.ration)
      });
      this.sellNumberMin = res.data.sellNumber;
      this.sellNumberMax = res.data.sellNumberMax;
    },
    async handleSalesInputBlur() {
      if (!this.sellNumber) {
        return;
      } else if (this.sellNumber && this.ration) {
        return;
      }
      console.log(`sale 失去焦点`)
      const res = await fetchCommissionLimit({
        sellNumber: Number(this.sellNumber)
      });
      if (res.data.ration) {
        this.rationMin = res.data.ration;
      } else {
        this.rationMin = "0";
      }
      if (res.data.rationMax) {
        this.rationMax = res.data.rationMax;
      } else {
        this.rationMax = 100 + "";
      }
      console.log(res);
    }
  }
});
</script>
<style lang="scss" scoped>
@import "../../styles/base";
.ration-setting {
  height: 100%;
  .van-cell {
    @include gy-input;
    &::after {
      border: none;
    }
  }
  .ration-content {
    padding: 0 20px;
    text-align: left;
    p {
      font-size: 14px;
      color: #fff;
    }
    .input-label {
      padding: 12px 0;
    }
    .input-wrapper {
      display: flex;
      .input-sign {
        padding: 0 10px;
        line-height: 44px;
        color: #fff;
      }
    }
    .input-tips {
      color: rgba(255, 255, 255, 0.4);
      padding-top: 12px;
    }
    .rights-tips {
      margin-top: 42px;
      &-title {
        padding: 11px 0;
      }
    }
  }
}
</style>
