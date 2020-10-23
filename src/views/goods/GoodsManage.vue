<template>
  <div class="goods-manage nav-bar-search">
    <van-nav-bar :border="false" @click-left="toView">
      <template #left>
        <img class="leftIcon" src="@/assets/imgs/common/icon-left.png" />
      </template>
      <template #title>
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
          <van-list
            v-model:loading="loading"
            :finished="finished"
            @load="onLoad"
          >
            <div class="cell">
              <div class="card-good">
                <van-image :src="require('@/assets/logo.png')">
                  <span class="card-good--status">待申请</span>
                </van-image>
                <div class="card-good-info">
                  <div class="card-good-actions">
                    <div class="card-good__action card-good__action--editor">
                      <img src="@/assets/imgs/common/ic_editor.png" />
                      <span>编辑</span>
                    </div>
                    <div class="card-good__action card-good__action--putaway">
                      <img src="@/assets/imgs/common/ic_putaway.png" />
                      <span>上架</span>
                    </div>
                    <!-- <div class="card-good__action card-good__action--soldout">
                    <img src="@/assets/imgs/common/ic_putaway.png" />
                    <span>下架</span>
                  </div> -->
                    <div class="card-good__action card-good__action--delete">
                      <img src="@/assets/imgs/common/ic_delete.png" />
                      <span>删除</span>
                    </div>
                  </div>
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
            <div class="cell cell__last">
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
          </van-list>
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
<script lang="ts">
import { defineComponent } from "vue";
import { fetchGoodsList } from "@/services/goods";
export default defineComponent({
  name: "GoodsManage",
  data() {
    return {
      searchValue: "",
      active: 0,
      current: 0,
      size: 10,
      list: [] as object[],
      loading: false,
      finished: false,
    };
  },
  methods: {
    toView() {
      this.$router.go(-1);
    },

    onLoad() {
      this.current += 1;
      this.getGoodsList();
    },
    async getGoodsList() {
      const res = await fetchGoodsList({
        current: this.current,
        size: this.size,
      }).catch((err) => {
        this.loading = false;
        this.finished = true;
        return Promise.reject(err);
      });
      this.loading = false;
      if (this.size > res.data.records.length) {
        this.finished = true;
      }
      this.list.push(...res.data.records);
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
  .cell{
    &__last {
      .card-good{
        border-bottom: none;
      }
    }
  }
}
.card-good {
  display: flex;
  border-bottom: 1px solid rgba($color: #fff, $alpha: 0.4);
  padding-bottom: 10px;
  padding-top: 10px;
  position: relative;
  &--status {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background-color: rgba($color: #000000, $alpha: 0.7);
    font-size: 12px;
    color: #fff;
    line-height: 20px;
  }
  .van-image {
    height: 94px;
    border-radius: 6px;
    background-color: #d8d8d8;
    position: relative;

    :deep(img) {
      width: 94px;
      height: 94px;
    }
  }
  &-info {
    margin-left: 10px;
    text-align: left;
    font-size: 12px;
    color: #fff;
    position: relative;

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
  &-actions {
    position: absolute;
    background-color: rgba($color: $contentBgColor, $alpha: 0.9);
    position: absolute;
    background-color: rgba(30, 24, 60, 0.9);
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  &__action {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 14px;
      height: 14px;
      margin-bottom: 10px;
    }
  }
}
.footer-action {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $contentBgColor;
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 7px;
  padding-bottom: 27px;
  justify-content: space-between;
  .van-button--primary {
    @include gy-btn-primary;
    width: 160px;
  }
  .van-button--plain {
    @include gy-btn-plain;
  }
}
</style>
