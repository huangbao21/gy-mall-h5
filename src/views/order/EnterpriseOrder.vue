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
    <van-tabs v-model:active="active" class="gy-tabs" @click="getVarietyOrder">
      <van-tab title="全部">
        <div class="order-list">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <order-item></order-item>
            <order-item></order-item>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="待发货">1</van-tab>
      <van-tab title="待收货">1</van-tab>
      <van-tab title="已完成">1</van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import OrderItem from "./components/OrderItem.vue";
import { fetchOrderSupplierList } from "@/services/order";
export default defineComponent({
  name: "EnterpriseOrder",
  components: {
    OrderItem,
  },
  data() {
    return {
      searchValue: "",
      loading: false,
      finished: false,
      current: 0,
      size: 10,
      active: 0,
      list: [] as object[],
    };
  },
  methods: {
    toView() {
      this.$router.go(-1);
    },
    onLoad() {
      this.current += 1;
      this.getOrderList();
    },
    async getOrderList(orderStatus?: number) {
      const res = await fetchOrderSupplierList({
        current: this.current,
        size: this.size,
        orderStatus,
      }).catch((err) => {
        this.loading = false;
        this.finished = true;
        return Promise.reject(err);
      });
      this.loading = false;
      if (this.size > res.data.records.length) {
        this.finished = true;
      }
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
