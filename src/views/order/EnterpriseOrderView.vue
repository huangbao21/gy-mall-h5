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
            <span
              class="btn"
              @click="copy"
              id="copy"
              :data-clipboard-text="orderInfo.detailSn"
              >复制</span
            >
          </div>
          <div class="order-info__profile-row">
            <span class="name">下单时间:</span>
            <span class="val">{{ orderInfo.createTime }}</span>
          </div>
        </div>
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
      <div
        class="footer-action"
        v-if="
          orderInfo.orderStatus == 1 ||
          orderInfo.orderStatus == 2 ||
          orderInfo.orderStatus == 3
        "
      >
        <van-button
          round
          plain
          type="primary"
          v-if="orderInfo.orderStatus == 1"
          >去发货</van-button
        >
        <van-button round v-else @click="expressPopup = true"
          >查看物流</van-button
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
import { queryLogistics, queryOrderDetail } from "@/services/order";
import { defineComponent } from "vue";
import ClipboardJs from "clipboard";
import OrderItem from "./components/OrderItem.vue";
import ExpressPopup from "./components/ExpressPopup.vue";
export default defineComponent({
  name: "EnterpriseOrderView",
  components: {
    OrderItem,
    ExpressPopup,
  },
  data() {
    return {
      orderId: -1,
      orderInfo: {} as object,
      expressInfo: {} as object,
      expressPopup: false,
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
    this.queryExpress();
  },
  methods: {
    toView() {
      this.$router.go(-1);
    },
    copy() {
      console.log(123);
      const clipboard = new ClipboardJs("#copy");
      clipboard.on("success", (e) => {
        this.$toast("复制成功");
      });
      clipboard.on("error", (e) => {
        this.$toast("复制失败");
      });
    },
    async queryExpress() {
      const res = await queryLogistics({ id: this.orderId });
      this.expressInfo = res.data;
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
main {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.order-info {
  flex: 1;
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
      .btn {
        padding: 2px 4px;
        background-color: #fff;
        border-radius: 2px;
        color: #000;
        margin-left: 7px;
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
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 7px;
  padding-bottom: 27px;
  text-align: right;
  .van-button--primary {
    @include gy-btn-primary;
  }
  :deep(.van-checkbox__label) {
    color: #fff;
  }
  .van-button--default {
    @include gy-btn-default;
    height: 36px;
  }
}
</style>
