<template>
  <div class="order-item">
    <div class="order-item__sn">
      <span>订单编号 1271234700887609540 </span>
      <span class="order-item__sn--state">待发货</span>
    </div>
    <div class="order-item__good">
      <img src="@/assets/logo.png" />
      <div class="order-item__good-info">
        <p class="order-item__good-info--name">
          三星Galaxy Watch Active酷黑智能手表音乐播放心率 中号
        </p>
        <p class="order-item__good-info--prop">
          <span>单价 ￥ 209.65</span>
          <span style="margin-left:10px">数量 10</span>
        </p>
        <p class="order-item__good-info--total">总价 ￥209.65</p>
      </div>
    </div>
    <div class="order-item__status">
      <span class="order-item__status--time"
        >下单时间: 2020-10-20 09:11:34</span
      >
      <van-button round type="primary">发货</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "OrderItem",
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
</style>
