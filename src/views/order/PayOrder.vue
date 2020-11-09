<template>
  <div class="pay-order nav-bar">
    <van-nav-bar title="订单支付" :border="false" @click-left="toView">
      <template #left>
        <img class="leftIcon" src="@/assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <main>
      <div class="pay-state">
        <span>实付金额</span>
        <span class="pay-state--money">￥ <strong>209.65</strong></span>
        <small>支付剩余时间</small>
      </div>
      <div class="pay-ways">
        <van-radio-group v-model="waysRadio" :checked-color="checkRadioColor">
          <div class="cell">
            <img src="@/assets/imgs/common/ic_wallet.png" />
            <span class="title">钱包余额支付</span>
            <van-radio name="wallet" />
          </div>
          <div class="cell">
            <img src="@/assets/imgs/common/ic_wechatpay.png" />
            <span class="title">划转到金币余额</span>
            <van-radio name="wechat" />
          </div>
          <div class="cell">
            <img src="@/assets/imgs/common/ic_alipay.png" />
            <span class="title">划转到金币余额</span>
            <van-radio name="alipay" />
          </div>
        </van-radio-group>
      </div>
    </main>
    <div class="footer-action">
      <van-button round type="primary">支付￥209.09</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { callPayOrder } from "@/services/native";
import usePropsCom from "@/composables/usePropsCom";

export default defineComponent({
  name: "PayOrder",
  setup() {
    const { checkRadioColor } = usePropsCom();
    return {
      checkRadioColor,
    };
  },
  data() {
    return {
      waysRadio: "wallet",
    };
  },
  methods: {
    async toView() {
      await this.$dialog.confirm({
        message: "确定放弃支付该笔订单？",
        className: "gy-dialog",
      });
      this.$router.replace("/enterpriseOrder");
    },
    async pay() {
      await callPayOrder({
        recordId: "123123",
        sdk: "alipay",
        money: "123",
        sign: "feqweqdqw",
      });
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.pay-order {
  display: flex;
  flex-direction: column;
  height: 100%;
  main {
    flex: 1;
    overflow-y: scroll;
  }
  .pay-state {
    color: #fff;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    margin-top: 37px;
    &--money {
      margin-top: 8px;
      margin-bottom: 24px;
      font-size: 20px;
      strong {
        font-size: 32px;
      }
    }
    small {
      font-size: 12px;
    }
  }
  .pay-ways {
    background-color: $contentBgColor;
    margin-left: 18px;
    margin-right: 18px;
    margin-top: 46px;
    border-radius: 8px;
    padding-left: 20px;
    .cell {
      display: flex;
      height: 64px;
      color: #fff;
      align-items: center;
      font-size: 14px;
      border-bottom: 1px solid rgba($color: #f0f0f0, $alpha: 0.4);
      .title {
        flex: 1;
        text-align: left;
        margin-left: 14px;
      }
      img {
        width: 28px;
        height: 28px;
      }
      .van-radio {
        margin-right: 20px;
      }
      &:last-child {
        border-bottom: 0px;
      }
    }
  }
}
.footer-action {
  background-color: $contentBgColor;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 7px;
  padding-bottom: 27px;
  .van-button--primary {
    @include gy-btn-primary;
    width: 100%;
    font-weight: bold;
  }
}
</style>
