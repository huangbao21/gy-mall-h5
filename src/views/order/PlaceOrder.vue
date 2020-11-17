<template>
  <div class="place-order nav-bar">
    <van-nav-bar title="确认订单" :border="false" @click-left="toView">
      <template #left>
        <img class="leftIcon" src="@/assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <main>
      <div class="order-info">
        <div class="order-info__adress-wrap" @click="toView('/address')">
          <div class="order-info__adress-user">
            <small
              >{{ addressInfo.provinceName }}{{ addressInfo.cityName
              }}{{ addressInfo.districtName }}</small
            >
            <span>{{ addressInfo.street }}</span>
            <span class="phone"
              >{{ addressInfo.linkman }} {{ addressInfo.mobile }}</span
            >
          </div>
          <van-icon name="arrow" />
        </div>
        <div class="good-wrap">
          <van-image :src="goodInfo.mainImageUrl" />
          <div class="good-info">
            <p class="good-info--name">宠物小精灵</p>
            <p class="good-info--prop">
              <span>单价 ￥ {{ goodInfo.price }}</span>
              <span class="stepper"> <van-stepper v-model="quantity" /></span>
            </p>
            <p class="good-info--total">
              总价 ￥{{ goodInfo.price * quantity }}
            </p>
          </div>
        </div>
        <div class="order-info__money">
          <div class="order-info__money-row">
            <span>商品总额</span>
            <span>￥ {{ goodInfo.price * quantity }}</span>
          </div>
          <div class="order-info__money-row">
            <span>运费</span>
            <span>免费</span>
          </div>
          <div class="order-info__money-row--total">
            <span>合计付款：</span>
            <span class="sum">￥ {{ goodInfo.price * quantity }}</span>
          </div>
        </div>
      </div>
      <div class="footer-action">
        <span>应付金额：</span>
        <span class="real-money"
          >￥ <strong>{{ goodInfo.price * quantity }}</strong></span
        >
        <van-button
          round
          plain
          type="primary"
          style="margin-left: 10px"
          @click="submitOrder"
          >提交订单</van-button
        >
      </div>
    </main>
  </div>
  <express-popup
    :order-info="goodInfo"
    :express-info="expressInfo"
    v-model="expressPopup"
  ></express-popup>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any  */
import { fetchCustomerGoodDetail } from "@/services/goods";
import {
  queryDefaultAddress,
  AddressInfoServe,
  fetchAddressInfo,
} from "@/services/address";
import { createOrder } from "@/services/order.ts";
import { defineComponent } from "vue";
import ExpressPopup from "./components/ExpressPopup.vue";
export default defineComponent({
  name: "PlaceOrder",
  components: {
    ExpressPopup,
  },
  data() {
    return {
      goodId: -1,
      agencyId: -1,
      goodInfo: {} as any,
      expressInfo: {} as object,
      expressPopup: false,
      addressInfo: {} as AddressInfoServe,
      chosenAddressId: "",
      quantity: 1,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm: any) => {
      vm.goodId = to.query.goodId;
      vm.agencyId = to.query.agencyId;
      vm.chosenAddressId = to.query.chosenAddressId;
    });
  },
  mounted() {
    this.getOrderDetail();
    this.getShowAddress();
  },
  methods: {
    toView(url: string) {
      if (url === "/address") {
        this.$router.replace({
          path: url,
          query: {
            goodId: this.goodId,
            agencyId: this.agencyId,
            chosenAddressId: this.chosenAddressId,
          },
        });
      } else {
        this.$router.go(-1);
      }
    },
    async submitOrder() {
      const res = await createOrder({
        addressId: Number(this.chosenAddressId),
        quantity: this.quantity,
        skuId: this.goodInfo.productSkuList[0].id,
        agencyId: this.agencyId,
      });
      this.$router.replace({
        path: "payOrder",
        query: { orderId: res.data.orderId },
      });
    },
    async getShowAddress() {
      let res;
      if (this.chosenAddressId) {
        res = await fetchAddressInfo({
          id: Number(this.chosenAddressId),
        });
      } else {
        res = await queryDefaultAddress();
        this.chosenAddressId = res.data.id;
      }
      this.addressInfo = res.data;
    },
    async getOrderDetail() {
      const res = await fetchCustomerGoodDetail({
        id: Number(this.goodId),
        agencyId: Number(this.agencyId),
      });
      this.goodInfo = res.data;
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
.good-wrap {
  display: flex;
  text-align: left;
  margin-top: 16px;
  margin-bottom: 16px;
  background-color: $contentBgColor;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 16px;
  padding-bottom: 13px;
  color: #fff;
  font-size: 12px;
  .good-info {
    flex: 1;
    &--prop {
      color: rgba($color: #fff, $alpha: 0.4);
      margin-top: 10px;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      .stepper {
        flex: 1;
        text-align: right;
      }
    }
  }
  .van-image {
    width: 94px;
    height: 94px;
    border-radius: 6px;
    background: #d8d8d8;
    margin-right: 10px;
  }
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
      background-image: url("../../assets/imgs/common/line-decorate.png");
      background-repeat: no-repeat;
      background-position: bottom;
    }
    &-user {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex: 1;
      small {
        font-size: 12px;
        margin-bottom: 10px;
        color: #ccc;
      }
      .phone {
        margin-top: 10px;
        text-align: right;
        font-size: 12px;
        color: #ccc;
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
