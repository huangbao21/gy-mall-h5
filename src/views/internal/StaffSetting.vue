<template>
  <div class="staff-setting nav-bar">
    <van-nav-bar
      title="新增员工"
      right-text="完成"
      left-arrow
      @click-left="onClickLeft"
      @click-right="handleCommissionSave"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <div class="staff-content">
      <div class="staff-content-cell">
        <p class="input-label">手机号</p>
        <div class="input-wrapper">
          <van-field
            v-model="mobile"
            rows="1"
            type="number"
            autosize
            placeholder="请输入手机号"
            @blur="handleSalesInputBlur"
          />
        </div>
      </div>
      <div class="staff-content-cell">
        <p class="input-label">分佣比例</p>
        <div class="input-wrapper">
          <van-field
            v-model="goodsTitle"
            right-icon="arrow"
            placeholder="显示图标"
            @click="handleJobRankSelect"
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
import { addStaff, updateStaff } from "../../services/internal";
export default defineComponent({
  name: "CommissionSetting",
  data() {
    return {
      ration: "",
      mobile: "",
      rank: "",
      type: "add"
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
      if (this.type === "add") {
        await addStaff({ mobile: "18667625328", rank: "1" });
      } else if (this.type === "edit") {
        await updateStaff({ id: 1, param: "1" });
      }
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
    }
  }
});
</script>
<style lang="scss" scoped>
@import "../../styles/base";
.staff-setting {
  height: 100%;
  .van-cell {
    @include gy-input;
    &::after {
      border: none;
    }
  }
  .staff-content {
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
