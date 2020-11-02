<template>
  <div class="goods-manage nav-bar">
    <van-nav-bar
      :border="false"
      @click-left="toView"
      title="我的商品"
      :right-text="batchAction ? '取消' : '添加商品'"
      @click-right="onClickRight"
    >
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
    <van-dropdown-menu>
      <van-dropdown-item
        :title="sortTitle"
        v-model="sortValue"
        ref="sortDropRef"
        class="active"
      >
        <div class="dropdown-panel">
          <div
            class="cell"
            v-for="cell in sortOption"
            :key="cell.value"
            @click="changeDropdownValue(cell, 'sort')"
          >
            <span :class="{ active: sortValue == cell.value }">{{
              cell.text
            }}</span>
          </div>
        </div>
      </van-dropdown-item>
      <van-dropdown-item
        v-model="goodsValue"
        :title="goodsTitle"
        ref="goodsDropRef"
      >
        <div class="dropdown-panel">
          <div
            class="cell"
            v-for="cell in goodsOption"
            :key="cell.value"
            @click="changeDropdownValue(cell, 'goods')"
          >
            <span :class="{ active: goodsValue == cell.value }">{{
              cell.text
            }}</span>
          </div>
        </div>
      </van-dropdown-item>
      <van-dropdown-item
        v-model="categoryValue"
        :title="categoryTitle"
        ref="categoryDropRef"
      >
        <div class="dropdown-panel">
          <div
            class="cell"
            v-for="cell in categoryOption"
            :key="cell.value"
            @click="changeDropdownValue(cell, 'category')"
          >
            <span :class="{ active: categoryValue == cell.value }">{{
              cell.text
            }}</span>
          </div>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
    <div class="cards-wrapper">
      <div class="cards">
        <van-list v-model:loading="loading" :finished="finished" @load="onLoad">
          <good-item
            :good="good"
            v-for="(good, index) in list"
            :key="good.id"
            :underline="index !== list.length - 1"
            :show-checkbox="batchAction"
            :show-action-panel="showActionPanel"
            v-model:good-checked="good.checked"
          ></good-item>
        </van-list>
      </div>
    </div>

    <div class="footer-action">
      <template v-if="!batchAction">
        <van-button round plain type="primary" class="batch putaway"
          >全部上架</van-button
        >
        <van-button round plain type="primary" class="batch soldout"
          >全部下架</van-button
        >
        <van-button
          round
          plain
          type="primary"
          @click="batchAction = true"
          class="batch"
          >批量管理</van-button
        >
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
/* eslint-disable @typescript-eslint/no-explicit-any  */
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
      sortValue: "-1",
      goodsValue: -1,
      categoryValue: -1,
      sortTitle: "",
      goodsTitle: "",
      categoryTitle: "",
      sortOption: [
        {
          text: "智能排序",
          value: -1,
        },
        {
          text: "销量最高",
          value: "pp.sales_volume",
        },
        {
          text: "库存最高",
          value: "pps.quantity",
        },
        {
          text: "价格由高至低",
          value: "price",
        },
      ],
      goodsOption: [
        {
          text: "全部",
          value: -1,
        },
        {
          text: "待审核",
          value: 1,
        },
        {
          text: "已上架",
          value: 2,
        },
        {
          text: "已下架",
          value: 3,
        },
      ],
      categoryOption: [
        {
          text: "选择品类",
          value: -1,
        },
        {
          text: "家电",
          value: 1,
        },
      ],
    };
  },
  mounted() {
    this.sortTitle = this.sortOption[0].text;
    this.goodsTitle = this.goodsOption[0].text;
    this.categoryTitle = this.categoryOption[0].text;
  },
  methods: {
    toView() {
      this.$router.go(-1);
    },
    onClickRight() {
      if (this.batchAction) {
        this.batchAction = false;
      } else {
        this.$router.push("/goodsAdd");
      }
    },
    async changeDropdownValue(
      cell: { text: string; value: string | number },
      el?: string
    ) {
      if (el === "sort") {
        this.sortValue = String(cell.value);
        this.sortTitle = cell.text;
        (this.$refs as any).sortDropRef.toggle();
      } else if (el === "goods") {
        this.goodsValue = Number(cell.value);
        this.goodsTitle = cell.text;
        (this.$refs as any).goodsDropRef.toggle();
      } else if (el === "category") {
        this.categoryValue = Number(cell.value);
        this.categoryTitle = cell.text;
        (this.$refs as any).categoryDropRef.toggle();
      }

      this.current = 0;
      this.finished = false;
      this.list = [];
    },
    onSearch() {
      console.log(123);
    },
    onLoad() {
      this.current += 1;
      this.getGoodsList();
    },
    async getGoodsList() {
      const descOrders = this.sortValue === "-1" ? undefined : [this.sortValue];
      const status = this.goodsValue === -1 ? undefined : this.goodsValue;
      const categoryId =
        this.categoryValue === -1 ? undefined : this.categoryValue;
      const res = await fetchGoodsList({
        current: this.current,
        size: this.size,
        status,
        descOrders,
        categoryId,
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
      res.data.records.map((record: any) => {
        record.checked = false;
      });
      this.list.push(...res.data.records);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "./styles/style.scss";
@import "@/styles/base.scss";
.goods-manage {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.gy-search {
  margin-left: 16px;
  margin-right: 16px;
}
.cards-wrapper {
  padding-bottom: 50px;
  flex: 1;
  overflow-y: scroll;
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
      width: 106px;
      &.putaway {
        border-color: #ffb300;
        color: #ffb300;
      }
      &.soldout {
        border-color: #ea4a72;
        color: #ea4a72;
      }
    }
  }
}
</style>
