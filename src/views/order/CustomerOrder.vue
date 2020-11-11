<template>
  <div class="customer-order nav-bar">
    <van-nav-bar title="订单管理" :border="false" @click-left="toView">
      <template #left>
        <img class="leftIcon" src="@/assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <van-search
      v-model="searchValue"
      shape="round"
      placeholder="搜索商品"
      :clearable="false"
      show-action
      class="gy-search"
    >
      <template #right-icon>
        <img
          v-show="searchValue"
          class="gy-clear"
          src="@/assets/imgs/common/ic_clear.png"
          @click="searchValue = ''"
        />
      </template>
      <template #action>
        <div class="search-btn" @click="onSearch">搜索</div>
      </template>
    </van-search>
    <van-tabs
      v-model:active="tabActive"
      class="gy-tabs"
      @click="getVarietyOrder"
    >
      <van-tab title="全部" name="all">
        <div class="order-list">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <order-item
              v-for="order in list"
              :key="order.id"
              :order="order"
              type="customer"
              @click-order="viewOrder"
              @cancel-order="cancelOrder"
              @receipt-order="receiptOrder"
              @view-express="viewExpress"
            ></order-item>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="待发货" name="toDeliver">
        <div class="order-list">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <order-item
              v-for="order in list"
              :key="order.id"
              :order="order"
              type="customer"
              @click-order="viewOrder"
              @cancel-order="cancelOrder"
              @receipt-order="receiptOrder"
              @view-express="viewExpress"
            ></order-item>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="待收货" name="toReceive">
        <div class="order-list">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <order-item
              v-for="order in list"
              :key="order.id"
              :order="order"
              type="customer"
              @click-order="viewOrder"
              @cancel-order="cancelOrder"
              @receipt-order="receiptOrder"
              @view-express="viewExpress"
            ></order-item>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="已完成" name="finished">
        <div class="order-list">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <order-item
              v-for="order in list"
              :key="order.id"
              :order="order"
              type="customer"
              @click-order="viewOrder"
              @cancel-order="cancelOrder"
              @receipt-order="receiptOrder"
              @view-express="viewExpress"
            ></order-item>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
  <express-popup
    :order-info="currentOrder"
    :express-info="expressInfo"
    v-model="expressPopup"
  ></express-popup>
</template>
<script lang="ts">
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any  */
import { defineComponent } from "vue";
import OrderItem from "./components/OrderItem.vue";
import {
  fetchOrderCustomerList,
  queryLogistics,
  cancelOrder as cancelOrderService,
  receiptOrder as receiptOrderService,
} from "@/services/order";
import ExpressPopup from "./components/ExpressPopup.vue";

export default defineComponent({
  name: "CustomerOrder",
  components: {
    OrderItem,
    ExpressPopup,
  },
  data() {
    return {
      searchValue: "",
      loading: false,
      finished: false,
      current: 0,
      size: 10,
      tabActive: "all",
      list: [] as object[],
      currentOrder: {} as object,
      expressInfo: {} as object,
      expressPopup: false,
    };
  },
  methods: {
    toView() {
      this.$router.go(-1);
    },
    async viewExpress(order: any) {
      const res = await queryLogistics({ id: order.id });
      this.currentOrder = order;
      this.expressInfo = res.data;
      this.expressPopup = true;
    },
    viewOrder(order: any) {
      this.$router.push({
        path: "/customerOrderView",
        query: { orderId: order.id },
      });
    },
    async cancelOrder(order: any) {
      await this.$dialog.confirm({
        message: "确定取消订单？",
        confirmButtonText: "确定",
        className: "gy-dialog",
      });
      await cancelOrderService({ id: order.id });
      order.orderStatus = 5;
    },
    async receiptOrder(order: any) {
      await this.$dialog.confirm({
        message: "是否确认收货？",
        confirmButtonText: "确认",
        className: "gy-dialog",
      });
      await receiptOrderService({ id: order.id });
      order.orderStatus = 4;
    },
    onLoad() {
      this.current += 1;
      this.getOrderList();
    },
    onSearch() {
      this.reloadList();
    },
    getVarietyOrder() {
      console.log(this.tabActive);
      this.reloadList();
    },
    reloadList() {
      this.current = 0;
      this.finished = false;
      this.list = [];
    },
    async getOrderList() {
      const orderStatus =
        this.tabActive === "all"
          ? undefined
          : this.tabActive === "toDeliver"
          ? 1
          : this.tabActive === "toReceive"
          ? 2
          : 4;
      const res = await fetchOrderCustomerList({
        current: this.current,
        size: this.size,
        orderStatus,
        productName: this.searchValue,
      }).catch((err) => {
        this.loading = false;
        this.finished = true;
        return Promise.reject(err);
      });
      this.loading = false;
      if (
        this.size > res.data.records.length ||
        this.current * this.size >= res.data.total
      ) {
        this.finished = true;
      }
      this.list.push(...res.data.records);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.customer-order {
  min-height: 100%;
  background-color: $bgColor;
}
.gy-search {
  margin-left: 16px;
  margin-right: 16px;
}
</style>
