<template>
  <div class="place-order nav-bar">
    <van-nav-bar title="确认订单" :border="false" @click-left="toView">
      <template #left>
        <img class="leftIcon" src="@/assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <main>
      <div class="order-info">
        <div class="order-info__adress-wrap">
          <div class="order-info__adress-user">
            <span>{{ orderInfo.address }}</span>
            <span class="phone">{{ orderInfo.realName }} {{ orderInfo.phone }}</span>
          </div>
          <van-icon name="arrow" />
        </div>
        <order-item :order="orderInfo" isView></order-item>
        <div class="order-info__money">
          <div class="order-info__money-row">
            <span>商品总额</span>
            <span>￥ {{ orderInfo.amount }}</span>
          </div>
          <div class="order-info__money-row">
            <span>运费</span>
            <span>免费</span>
          </div>
          <div class="order-info__money-row--total">
            <span>合计付款：</span>
            <span class="sum">￥ {{ orderInfo.amount }}</span>
          </div>
        </div>
      </div>
      <div class="footer-action">
        <span>应付金额：</span>
        <span class="real-money"
          >￥ <strong>{{ orderInfo.payAmount }}</strong></span
        >
        <van-button round plain type="primary" style="margin-left: 10px"
          >提交订单</van-button
        >
      </div>
    </main>
  </div>
  <express-popup
    :order-info="orderInfo"
    :express-info="expressInfo"
    v-model="expressPopup"
  ></express-popup>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any  */
// 错误的接口请求
import { queryCustomerOrderDetail } from "@/services/order";
import { defineComponent } from "vue";
import OrderItem from "./components/OrderItem.vue";
import ExpressPopup from "./components/ExpressPopup.vue";
export default defineComponent({
  name: "PlaceOrder",
  components: {
    OrderItem,
    ExpressPopup,
  },
  data() {
    return {
      orderId: -1,
      orderInfo: {} as any,
      expressInfo: {} as object,
      expressPopup: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm: any) => {
      vm.orderId = to.query.orderId;
    });
  },
  mounted() {
    this.getOrderDetail();
  },
  methods: {
    toView() {
      this.$router.go(-1);
    },
    async getOrderDetail() {
      const res = await queryCustomerOrderDetail({ id: this.orderId });
      this.orderInfo = res.data;
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.place-order {
  display: flex;
  flex-direction: column;
  height: 100%;
}
main {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.order-info {
  flex: 1;
  &__adress {
    &-wrap {
      background-color: $contentBgColor;
      padding-top: 17px;
      padding-bottom: 17px;
      padding-left: 15px;
      padding-right: 15px;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
    }
    &-user {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex: 1;
      .phone {
        margin-top: 10px;
        text-align: right;
        font-size: 12px;
      }
    }
  }
  &__money {
    background-color: $contentBgColor;
    color: #fff;
    font-size: 12px;
    text-align: left;
    padding: 18px;
    margin-top: 10px;
    &-row {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 16px;
      &--total {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .sum {
          font-size: 16px;
        }
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
  color: #fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  .real-money {
    color: #ea4a72;
    font-size: 14px;
    flex: 1;
    text-align: left;
    strong {
      font-size: 20px;
    }
  }
  .van-button--primary {
    @include gy-btn-primary;
    font-size: 14px;
  }
}
</style>
