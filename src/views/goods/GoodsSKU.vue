<template>
  <div class="goods-sku-page nav-bar">
    <van-nav-bar
      title="价格库存"
      right-text="完成"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <div class="goods-sku-wrapper">
      <p>市场价格</p>
      <van-field
        v-model="marketPrice"
        rows="1"
        label="¥"
        type="number"
        autosize
        placeholder="请输入市场价格"
      />
      <p>销售价格</p>
      <van-field
        v-model="price"
        rows="1"
        label="¥"
        autosize
        type="number"
        placeholder="请输入销售价格"
      />
      <p>经销商返佣</p>
      <van-field
        v-model="commissions"
        rows="1"
        label="¥"
        autosize
        type="number"
        placeholder="请输入返佣金额"
      />
      <p>总库存</p>
      <van-field
        v-model="stock"
        rows="1"
        autosize
        type="number"
        placeholder="请输入库存数"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Toast } from "vant";
export default defineComponent({
  name: "GoodsSKU",
  data() {
    return {
      goods: {
        price: 0,
        marketPrice: 0,
        commissions: 0,
        stock: 0,
      },
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
.goods-sku-page {
  background-color: $bgColor;
  min-height: 100%;
  .goods-sku-wrapper {
    padding: 32px 18px;
  }
  .van-cell {
    background-color: #1e183c;
    padding: 8px;
    height: 50px;
    border-radius: 8px;
    align-items: center;
    &::after {
      border-bottom: none;
    }
    :deep(.van-cell__value) {
      flex: 12;
    }
    :deep(.van-field__label) {
      margin-right: 4px;
      flex: 1;
      text-align: center;
    }
    :deep(.van-field__control) {
      color: #fff;
    }
  }
  p {
    text-align: left;
    font-size: 14px;
    color: #fff;
    padding: 14px 0;
  }
}
</style>
