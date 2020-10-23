<template>
  <div class="commission-setting nav-bar">
    <van-nav-bar
      title="新增权益"
      right-text="完成"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onSave"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <div class="commission-content">
      <div class="commission-content-cell">
        <p class="input-label">分佣比例</p>
        <van-field
          v-model="commission"
          rows="1"
          type="number"
          autosize
          placeholder="请输入分佣比例"
        />
        <p class="input-tips">实际可获得：总佣金*分销商波比*分佣比例</p>
      </div>
      <div class="commission-content-cell">
        <p class="input-label">销售额</p>
        <van-field
          v-model="commission"
          rows="1"
          type="number"
          autosize
          placeholder="请输入销售额"
        />
        <p class="input-tips">达到该销售额就可按照该分佣比例进行分佣</p>
      </div>
      <div class="rights-tips">
        <p class="rights-tips-title">权益说明</p>
        <p class="rights-tips-content">
          用户成功下单后，将从店主佣金中，按“波比”化出部分给让利会员
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CommissionSetting",
  data() {
    return {
      commission: "",
    };
  },
  methods: {},
});
</script>
<style lang="scss" scoped>
@import "../../styles/base";
.commission-setting {
  height: 100%;
  .van-cell {
    @include gy-input;
    &::after {
      border: none;
    }
  }
  .commission-content {
    padding: 0 20px;
    text-align: left;
    p {
      font-size: 14px;
      color: #fff;
    }
    .input-label {
      padding: 12px 0;
    }
    .input-tips {
      color: rgba(255, 255, 255, 0.4);
      padding-top: 12px;
    }
    .rights-tips {
      margin-top: 42px;
      &-title{
        padding: 11px 0;
      }
    }
  }
}
</style>
