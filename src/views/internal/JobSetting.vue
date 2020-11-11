<template>
  <div class="job-setting nav-bar">
    <van-nav-bar
      title="新增职位"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="handleCommissionSave"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <div class="job-content">
      <div class="job-content-cell">
        <p class="input-label">职位名称</p>
        <div class="input-wrapper">
          <van-field
            v-model="sellNumber"
            rows="1"
            type="number"
            autosize
            placeholder="请输入职位名称"
            @blur="handleSalesInputBlur"
          />
        </div>
      </div>
      <div class="job-content-cell">
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
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Toast } from "vant";
import {
  saveCommissionSetting,
  fetchCommissionLimit,
} from "../../services/reseller";
export default defineComponent({
  name: "CommissionSetting",
  data() {
    return {
      ration: "",
      sellNumber: "",
      rationMin: "",
      sellNumberMin: "",
      rationMax: "",
      sellNumberMax: "",
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
        ration: Number(this.ration),
      });
    },
    onClickLeft() {
      this.$dialog
        .confirm({
          message: "权益信息未保存，确认返回？",
          className: "gy-dialog",
        })
        .then(() => {
          this.$router.go(-1);
        });
    },
    async handleRationInputBlur() {
      const res = await fetchCommissionLimit({
        ration: Number(this.ration),
      });
      this.sellNumberMin = res.data.sellNumber;
      this.sellNumberMax = res.data.sellNumberMax;
    },
    async handleSalesInputBlur() {
      const res = await fetchCommissionLimit({
        sellNumber: Number(this.sellNumber),
      });
      this.rationMin = res.data.ration;
      this.rationMax = res.data.rationMax;
      console.log(res);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../../styles/base";
.job-setting {
  height: 100%;
  .van-cell {
    @include gy-input;
    &::after {
      border: none;
    }
  }
  .job-content {
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
