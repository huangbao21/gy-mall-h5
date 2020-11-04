<template>
  <div class="enterprise-order-view nav-bar">
    <van-nav-bar title="订单详情" :border="false" @click-left="toView">
      <template #left>
        <img class="leftIcon" src="@/assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <main>
      <div class="order-info">
        <div class="order-info--status">
          <span>{{
            orderInfo.orderStatus == 0
              ? "待支付"
              : orderInfo.orderStatus == 1
              ? "待发货"
              : orderInfo.orderStatus == 2
              ? "待收货"
              : orderInfo.orderStatus == 3
              ? "已收货"
              : orderInfo.orderStatus == 4
              ? "已完成"
              : "已取消"
          }}</span>
        </div>
        <div class="order-info__adress-wrap">
          <div class="order-info__adress-user">
            <van-icon name="location-o" />
            <span>{{ orderInfo.realName }}</span>
            <span class="phone">{{ orderInfo.phone }}</span>
          </div>
          <div class="order-info__adress--val">
            <span>{{ orderInfo.address }}</span>
          </div>
        </div>
        <order-item :order="orderInfo" isView></order-item>
        <div class="order-info__profile">
          <div class="order-info__profile-row">
            <span class="name">订单编号:</span>
            <span class="val">{{ orderInfo.detailSn }}</span>
            <span class="btn">复制</span>
          </div>
          <div class="order-info__profile-row">
            <span class="name">下单时间:</span>
            <span class="val">{{ orderInfo.createTime }}</span>
          </div>
          <div class="order-info__profile-row">
            <span class="name">物流编号:</span>
            <span class="val">{{ orderInfo.logisticsId }}</span>
            <span class="support">中通快递</span>
          </div>
        </div>
        <div class="order-info__money">
          <div class="order-info__money-row">
            <span>商品总额</span>
            <span>￥ {{ orderInfo.payAmount }}</span>
          </div>
          <div class="order-info__money-row">
            <span>运费</span>
            <span>免费</span>
          </div>
          <div class="order-info__money-row--total">
            <span>合计付款：</span>
            <span class="sum">￥ {{ orderInfo.payAmount }}</span>
          </div>
        </div>
      </div>
      <div class="footer-action"></div>
    </main>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any  */
import { queryOrderDetail } from "@/services/order";
import { defineComponent } from "vue";
import OrderItem from "./components/OrderItem.vue";
export default defineComponent({
  name: "EnterpriseOrderView",
  components: {
    OrderItem,
  },
  data() {
    return {
      orderId: -1,
      orderInfo: {} as object,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm: any) => {
      console.log(to);
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
      const res = await queryOrderDetail({ id: this.orderId });
      this.orderInfo = res.data;
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.enterprise-order-view {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.order-info {
  &--status {
    height: 74px;
    color: #fff;
    font-size: 18px;
    text-align: left;
    padding-top: 12px;
    padding-left: 18px;
    background: url("../../assets/imgs/order/statusBg.png") no-repeat;
  }
  &__adress {
    &-wrap {
      background-color: $contentBgColor;
      padding-top: 20px;
      padding-bottom: 18px;
      padding-left: 20px;
      padding-right: 18px;
      text-align: left;
      color: #fff;
    }
    &-user {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      .van-icon {
        margin-right: 10px;
      }
      .phone {
        flex: 1;
        text-align: right;
      }
    }
    &--val {
      font-size: 12px;
      margin-left: 25px;
    }
  }
  &__profile {
    background-color: $contentBgColor;
    margin-top: 10px;
    color: #fff;
    font-size: 12px;
    text-align: left;
    padding: 18px 18px 0 18px;
    &-row {
      margin-bottom: 16px;
      &:last-child {
        margin-bottom: 0;
        padding-bottom: 16px;
        border-bottom: 1px solid rgba($color: #f0f0f0, $alpha: 0.4);
      }
      .name {
        margin-right: 10px;
      }
    }
  }
  &__money {
    background-color: $contentBgColor;
    color: #fff;
    font-size: 12px;
    text-align: left;
    padding: 18px;
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
          color: #00ffd2;
          font-size: 16px;
        }
      }
    }
  }
}
.footer-action {
  background-color: $contentBgColor;
}
</style>
