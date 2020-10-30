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
            <good-item
              :good="good"
              v-for="(good,index) in list"
              :key="good.id"
              :underline="!(index==list.length-1)"
              show-check-box
              v-model:goodChecked="checked"
            ></good-item>
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
import GoodItem from "@/components/GoodItem.vue";
export default defineComponent({
  name: "GoodsManage",
  components: {
    GoodItem,
  },
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
  watch: {
    checked(newV, old) {
      console.log(newV, 10);
    },
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
