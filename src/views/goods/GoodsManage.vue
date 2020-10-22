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
        <!-- <van-field
          left-icon="search"
          placeholder="搜索商品订单"
          v-model="searchValue"
        /> -->
        <van-search
          v-model="searchValue"
          shape="round"
          placeholder="搜索商品订单"
        />
      </template>
    </van-nav-bar>
    <van-tabs v-model:active="active" class="gy-tabs">
      <van-tab title="全部(4)">
        <div class="cards">
          <div class="card-good">
            <van-image :src="require('@/assets/logo.png')" />
            <div class="card-good-info">
              <div class="card-good-info__title">
                三星Galaxy Watch Active酷黑智能手表音乐播放心率 中号
              </div>
              <div class="card-good-info__des">
                <span class="card-good-info__des--key">售价</span>
                <div class="card-good-info__des--val">￥ 209.65</div>
              </div>
              <div class="card-good-info__des">
                <span class="card-good-info__des--key">分佣</span>
                <div class="card-good-info__des--red">￥ 209.65</div>
              </div>
              <div class="card-good-info-sku">
                <div class="card-good-info-sku__profile">
                  <span>库存 10</span>
                  <span>销量 12</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card-good">
            <van-image :src="require('@/assets/logo.png')" />
            <div class="card-good-info">
              <div class="card-good-info__title">
                三星Galaxy Watch Active酷黑智能手表音乐播放心率 中号
              </div>
              <div class="card-good-info__des">
                <span class="card-good-info__des--key">售价</span>
                <div class="card-good-info__des--val">￥ 209.65</div>
              </div>
              <div class="card-good-info__des">
                <span class="card-good-info__des--key">分佣</span>
                <div class="card-good-info__des--red">￥ 209.65</div>
              </div>
              <div class="card-good-info-sku">
                <div class="card-good-info-sku__profile">
                  <span>库存 10</span>
                  <span>销量 12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="待审核(2)">内容 2</van-tab>
      <van-tab title="已上架">内容 3</van-tab>
      <van-tab title="已下架">内容 4</van-tab>
    </van-tabs>
  </div>
  <div class="footer-action">
    <van-button round type="primary">添加商品</van-button>
    <van-button round plain type="primary">批量管理</van-button>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "GoodsManage",
  data() {
    return { searchValue: "", active: 0 };
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
.cards {
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 16px;
  background-color: $contentBgColor;
}
.card-good {
  display: flex;
  border-bottom: 1px solid rgba($color: #fff, $alpha: 0.4);
  padding-bottom: 10px;
  padding-top: 10px;
  &:last-child {
    border-bottom: 0px;
  }
  .van-image {
    height: 94px;
    border-radius: 6px;
    background-color: #d8d8d8;
    :deep(img) {
      width: 94px;
      height: 94px;
    }
  }
  img {
    width: 94px;
    height: 94px;
    border-radius: 6px;
    background-color: #8d8d8d;
  }
  &-info {
    margin-left: 10px;
    text-align: left;
    font-size: 12px;
    color: #fff;
    &__title {
      margin-bottom: 8px;
    }
    &__des {
      display: flex;
      &--key {
        margin-right: 6px;
      }
      &--red {
        color: #ea4a72;
      }
    }
    &-sku {
      margin-top: 5px;
      display: flex;
      &__profile {
        display: flex;
        width: 130px;
        justify-content: space-between;
        color: rgba($color: #fff, $alpha: 0.6);
      }
    }
  }
}
.footer-action {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: $contentBgColor;
  .van-button--primary {
    @include gy-btn-primary;
    width: 160px;
  }
  .van-button--plain {
    @include gy-btn-plain;
  }
}
</style>
