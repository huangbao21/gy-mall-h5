<template>
  <div class="enterprise-order nav-bar">
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
              @click-order="viewOrder"
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
              @click-order="viewOrder"
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
              @click-order="viewOrder"
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
              @click-order="viewOrder"
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
import { defineComponent } from "vue";
import OrderItem from "./components/OrderItem.vue";
import { fetchOrderSupplierList, queryLogistics } from "@/services/order";
import ExpressPopup from "./components/ExpressPopup.vue";

export default defineComponent({
  name: "EnterpriseOrder",
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
        path: "/enterpriseOrderView",
        query: { orderId: order.id },
      });
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
      const res = await fetchOrderSupplierList({
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
.enterprise-order {
  min-height: 100%;
  background-color: $bgColor;
}
.gy-search {
  margin-left: 16px;
  margin-right: 16px;
}
</style>
