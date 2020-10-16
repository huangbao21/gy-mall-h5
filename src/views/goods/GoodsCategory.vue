<template>
  <div class="goods-category-page nav-bar">
    <van-nav-bar
      title="商品类目"
      right-text="完成"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <van-tree-select
      v-model:active-id="activeId"
      v-model:main-active-index="activeIndex"
      :items="goodsCategory"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Toast } from "vant";
export default defineComponent({
  name: "GoodsAdd",
  data() {
    return {
      activeId: 1,
      activeIndex: 0,
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
  methods: {
    onClickRight() {
      Toast("按钮");
    },
    onClickLeft() {
      this.$router.replace({ path: "/goodsAdd" });
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../../styles/base";
.goods-category-page {
  background-color: $bgColor;
  min-height: 100%;
}
</style>
