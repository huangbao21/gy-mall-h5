<template>
  <div class="order-item" :class="{ view: isView }">
    <div class="order-item__sn" v-if="!isView">
      <span>订单编号 {{ order.detailSn }} </span>
      <span class="order-item__sn--state">{{
        order.orderStatus == 0
          ? "待支付"
          : order.orderStatus == 1
          ? "待发货"
          : order.orderStatus == 2
          ? "待收货"
          : order.orderStatus == 3
          ? "已收货"
          : order.orderStatus == 4
          ? "已完成"
          : "已取消"
      }}</span>
    </div>
    <div class="order-item__good" @click="viewOrder(order)">
      <img :src="order.productMainImageUrl" />
      <div class="order-item__good-info">
        <p class="order-item__good-info--name">
          {{ order.productName }}
        </p>
        <p class="order-item__good-info--prop">
          <span>单价 ￥ {{ order.productPrice }}</span>
          <span style="margin-left: 10px">数量 {{ order.quantity }}</span>
        </p>
        <p class="order-item__good-info--total">总价 ￥{{ order.amount }}</p>
      </div>
    </div>
    <div class="order-item__status" v-if="!isView">
      <span class="order-item__status--time"
        >下单时间: {{ order.createTime }}</span
      >
      <template v-if="order.orderStatus == 1">
        <van-button round type="primary">发货</van-button>
      </template>
      <template
        v-else-if="
          order.orderStatus == 2 ||
          order.orderStatus == 3 ||
          order.orderStatus == 4
        "
      >
        <van-button round>查看物流</van-button>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "OrderItem",
  props: {
    order: Object,
    isView: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    viewOrder(order: any) {
      this.$emit("click-order", order);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.order-item {
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 16px;
  padding-bottom: 28px;
  background-color: $contentBgColor;
  color: #fff;
  font-size: 12px;
  margin-top: 16px;
  &__sn {
    display: flex;
    justify-content: space-between;
    &--state {
      color: rgba($color: #fff, $alpha: 0.4);
    }
  }
  &__good {
    display: flex;
    text-align: left;
    margin-top: 18px;
    padding-bottom: 12px;
    margin-bottom: 16px;
    border-bottom: 1px solid rgba($color: #f0f0f0, $alpha: 0.4);
    &-info {
      &--prop {
        color: rgba($color: #fff, $alpha: 0.4);
        margin-top: 10px;
        margin-bottom: 18px;
      }
    }
    img {
      width: 94px;
      height: 94px;
      border-radius: 6px;
      background: #d8d8d8;
      margin-right: 10px;
    }
  }
  &__status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &--time {
      color: rgba($color: #fff, $alpha: 0.4);
    }
    .van-button--primary {
      @include gy-btn-plain;
      width: 90px;
      height: 32px;
    }
    .van-button--default {
      @include gy-btn-default;
      width: 90px;
      height: 32px;
    }
  }
}
.order-item.view {
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 0px;
  .order-item__good {
    margin-top: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
}
</style>
