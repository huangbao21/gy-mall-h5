<template>
  <div class="goods-category-page nav-bar">
    <van-nav-bar
      title="商品类目"
      right-text="完成"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onSelectedOk"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <van-tree-select
      class="goods-category-tree"
      v-model:active-id="activeId"
      v-model:main-active-index="activeIndex"
      :items="goodsCategory"
      @click-item="handleItemClick"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { fetchCategoryList } from "@/services/goods";
import { Toast } from "vant";
export default defineComponent({
  name: "GoodsAdd",
  data() {
    return {
      activeId: -1,
      activeIndex: 0,
      itemText: "",
      navText: "",
      goodsCategory: [
        {
          text: "食品",
          children: [
            {
              text: "进口食品",
              id: 1,
            },
            {
              text: "休闲零食",
              id: 2,
            },
            {
              text: "营养保健",
              id: 3,
            },
          ],
        },
        {
          text: "美妆护肤",
          children: [
            {
              text: "美容护肤",
              id: 4,
            },
            {
              text: "彩妆/香水/美妆工具",
              id: 5,
            },
            {
              text: "美发/护发/假发",
              id: 6,
            },
          ],
        },
      ],
    };
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.activeId !== undefined) {
      next((vm: any) => {
        vm.activeId = Number(to.query.activeId);
        vm.activeIndex = to.query.activeIndex;
      });
    } else {
      next();
    }
  },
  mounted() {
    this.fetchCategoryList();
  },
  methods: {
    onSelectedOk() {
      if (this.activeId < 0) {
        Toast(`请选择类目`);
        return;
      }
      this.$router.push({
        path: "/goodsAdd",
        query: {
          categoryId: this.activeId,
          categoryText: `${this.goodsCategory[this.activeIndex].text}/${this.itemText}`,
          activeIndex: this.activeIndex,
        },
      });
    },
    onClickLeft() {
      this.$router.replace({ path: "/goodsAdd" });
    },
    async fetchCategoryList() {
      const res = await fetchCategoryList();
      this.goodsCategory = res.data;
    },
    handleItemClick(data: { text: string; id: number }) {
      this.itemText = data.text;
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../../styles/base";
.goods-category-page {
  background-color: $bgColor;
  height: 100%;
  .goods-category-tree {
    height: calc(100% - 44px) !important;
    :deep(.van-sidebar) {
      background-color: $bgColor;
      .van-sidebar-item {
        background-color: $bgColor;
        color: rgba(255, 255, 255, 0.4);
        &--select {
          background-color: #1e183c;
          color: #fff;
        }
      }
    }
    :deep(.van-tree-select__content) {
      background-color: #1e183c;
      color: #fff;
    }
  }
}
</style>
