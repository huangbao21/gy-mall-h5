<template>
  <div class="goods-manage nav-bar-search">
    <van-nav-bar :border="false" @click-left="toView">
      <template #left>
        <img
          class="leftIcon"
          src="./../../assets/imgs/earnMoney/icon-left.png"
        />
      </template>
      <template #title>
        <van-field
          left-icon="search"
          placeholder="搜索商品订单"
          v-model="searchValue"
        />
      </template>
    </van-nav-bar>
    <van-tabs v-model:active="active" class="gy-tabs">
      <van-tab title="全部">内容 1</van-tab>
      <van-tab title="待审核">内容 2</van-tab>
      <van-tab title="已上架">内容 3</van-tab>
      <van-tab title="已下架">内容 4</van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "GoodsManage",
  data() {
    return { searchValue: "", active: 2 };
  },
  methods: {
    toView() {
      this.$router.go(-1);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
</style>
