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
          placeholder="搜索商品"
          :clearable="false"
          show-action
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
      </template>
    </van-nav-bar>
    <van-tabs v-model:active="active" class="gy-tabs" @click="getVarietyGoods">
      <van-tab title="全部(4)" name="-1">
        <div class="cards">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            @load="onLoad"
          >
            <div
              class="cell"
              v-for="(good, index) in list"
              :key="good.id"
              :class="{ cell__last: index === list.length - 1 }"
            >
              <!-- <van-checkbox
                v-model="checked"
                :checked-color="checkRadioColor"
              ></van-checkbox> -->
              <div class="card-good">
                <van-image :src="good.mainImageUrl">
                  <span class="card-good--status" v-if="good.status !== 2">{{
                    good.status === 0
                      ? "待申请"
                      : good.status === 1
                      ? "待审核"
                      : good.status === 3
                      ? "已下架"
                      : "审核失败"
                  }}</span>
                </van-image>
                <div class="card-good-info">
                  <div class="card-good-actions" v-if="showActionPanel">
                    <div class="card-good__action card-good__action--editor">
                      <img src="@/assets/imgs/common/ic_editor.png" />
                      <span>编辑</span>
                    </div>
                    <div class="card-good__action card-good__action--putaway">
                      <img src="@/assets/imgs/common/ic_putaway.png" />
                      <span>上架</span>
                    </div>
                    <div class="card-good__action card-good__action--soldout">
                      <img src="@/assets/imgs/common/ic_putaway.png" />
                      <span>下架</span>
                    </div>
                    <div class="card-good__action card-good__action--delete">
                      <img src="@/assets/imgs/common/ic_delete.png" />
                      <span>删除</span>
                    </div>
                    <div class="card-good__action card-good__action--close">
                      <img src="@/assets/imgs/common/ic_close.png" />
                      <span>关闭</span>
                    </div>
                  </div>
                  <div class="card-good-info__title">
                    {{ good.name }}
                  </div>
                  <div class="card-good-info__des">
                    <span class="card-good-info__des--key">售价</span>
                    <div class="card-good-info__des--val">
                      ￥ {{ good.price }}
                    </div>
                  </div>
                  <div class="card-good-info__des">
                    <span class="card-good-info__des--key">分佣</span>
                    <div class="card-good-info__des--red">
                      ￥ {{ good.profit }}
                    </div>
                  </div>
                  <div class="card-good-info-sku">
                    <div class="card-good-info-sku__profile">
                      <span>库存 {{ good.stockNumber }}</span>
                      <span>销量 {{ good.salesVolume }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="待审核(2)" name="1">内容 2</van-tab>
      <van-tab title="已上架" name="2">内容 3</van-tab>
      <van-tab title="已下架" name="3">内容 4</van-tab>
    </van-tabs>
    <div class="footer-action">
      <template v-if="!batchAction">
        <van-button round type="primary">添加商品</van-button>
        <van-button round plain type="primary">批量管理</van-button>
      </template>
      <template v-else>
        <van-checkbox v-model="checked" :checked-color="checkRadioColor"
          >全选</van-checkbox
        >
        <van-button round plain type="primary" class="batch putaway"
          >批量上架</van-button
        >
        <van-button round plain type="primary" class="batch soldout"
          >批量下架</van-button
        >
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { fetchGoodsList } from "@/services/goods";
import usePropsCom from "@/composables/usePropsCom";
export default defineComponent({
  name: "GoodsManage",
  setup() {
    const { checkRadioColor } = usePropsCom();
    return {
      checkRadioColor,
    };
  },
  data() {
    return {
      searchValue: "",
      active: 0,
      current: 0,
      size: 10,
      list: [] as object[],
      loading: false,
      finished: false,
      checked: true,
      showActionPanel: false,
      batchAction: false,
    };
  },
  methods: {
    toView() {
      this.$router.go(-1);
    },
    getVarietyGoods(name: number, title: string) {
      this.current = 1;
      if (name === -1) {
        this.getGoodsList();
      } else {
        this.getGoodsList(name);
      }
    },
    onSearch() {
      console.log(123);
    },
    onLoad() {
      this.current += 1;
      this.getGoodsList();
    },
    async getGoodsList(status?: number) {
      const res = await fetchGoodsList({
        current: this.current,
        size: this.size,
        status,
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
      // this.list = res.data.records.slice(0, 2);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.goods-manage {
  display: flex;
  flex-direction: column;
  height: 100%;
  .gy-tabs {
    flex: 1;
    overflow-y: hidden;
    :deep(.van-tabs__content) {
      height: 100%;
      padding-bottom: 50px;
      overflow-y: scroll;
    }
  }
}
.cards {
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 16px;
  background-color: $contentBgColor;
  .cell {
    display: flex;
    .van-checkbox {
      margin-right: 20px;
      overflow: unset;
    }
    &__last {
      .card-good {
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
  flex: 1;
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
    width: 94px;
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
    flex: 1;
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
  background-color: #1e183c;
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
  :deep(.van-checkbox__label) {
    color: #fff;
  }
  .van-button--plain {
    @include gy-btn-plain;
    &.batch {
      width: 116px;
      &.putaway {
        border-color: #ea4a72;
        color: #ea4a72;
      }
      &.soldout {
        border-color: #ffb300;
        color: #ffb300;
      }
    }
  }
}
</style>
