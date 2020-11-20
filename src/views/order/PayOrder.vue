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
        <span class="pay-state--money"
          >￥ <strong>{{ orderInfo.payAmount }}</strong></span
        >
        <small
          >支付剩余时间<van-count-down
            :time="countDown(orderInfo.expiredTime)"
            @finish="finishCountDown(orderInfo.expiredTime)"
          ></van-count-down
        ></small>
      </div>
      <div class="pay-ways">
        <van-radio-group v-model="waysRadio" :checked-color="checkRadioColor">
          <div class="cell">
            <img src="@/assets/imgs/common/ic_wallet.png" />
            <span class="title">钱包余额支付</span>
            <van-radio :name="3" />
          </div>
          <div class="cell" v-if="wxFlag">
            <img src="@/assets/imgs/common/ic_wechatpay.png" />
            <span class="title">划转到金币余额</span>
            <van-radio :name="2" />
          </div>
          <div class="cell">
            <img src="@/assets/imgs/common/ic_alipay.png" />
            <span class="title">划转到金币余额</span>
            <van-radio :name="1" />
          </div>
        </van-radio-group>
      </div>
    </main>
    <div class="footer-action">
      <van-button round type="primary" :disabled="btnDisable" @click="pay"
        >支付￥{{ orderInfo.payAmount }}</van-button
      >
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable indent */

import { defineComponent } from "vue";
import { callPayOrder } from "@/services/native";
import { queryCustomerOrderDetail, fetchPayParam } from "@/services/order";
import usePropsCom from "@/composables/usePropsCom";
import moment from "moment";
import Utils from '@/utils';

export default defineComponent({
  name: "PayOrder",
  setup() {
    const { checkRadioColor } = usePropsCom();
    return {
      checkRadioColor,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm: any) => {
      vm.orderId = Number(to.query.orderId);
    });
  },
  data() {
    return {
      waysRadio: 3,
      orderId: -1,
      orderInfo: {} as any,
      btnDisable: false,
      wxFlag: true,
    };
  },
  mounted() {
    this.getOrderDetail();
    if (Utils.isIOS()) {
      this.wxFlag = false;
    }
  },
  methods: {
    countDown(time: string) {
      const now = +moment();
      const next = +moment(time);
      console.log(moment(time).format("YYYY-MM-DD HH:mm:ss"));
      return next - now;
    },
    finishCountDown(time: string) {
      if (time) {
        this.btnDisable = true;
      }
    },
    async toView() {
      await this.$dialog.confirm({
        message: "确定放弃支付该笔订单？",
        className: "gy-dialog",
      });
      this.$router.replace("/customerOrder");
    },
    async getOrderDetail() {
      const res = await queryCustomerOrderDetail({ id: this.orderId });
      this.orderInfo = res.data;
    },
    async pay() {
      const res = await fetchPayParam({
        id: this.orderId,
        type: this.waysRadio,
      });
      await callPayOrder({
        recordId: String(this.orderId),
        sdk:
          res.data.type,
        money: res.data.payAmount,
        sign: res.data.sign,
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
      display: flex;
      justify-content: center;
      .van-count-down {
        margin-left: 10px;
        color: #fff;
      }
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
