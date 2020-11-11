<template>
  <div class="goods-sku-page nav-bar">
    <van-nav-bar
      title="价格库存"
      right-text="完成"
      left-arrow
      @click-left="onClickLeft"
      @click-right="handleEditOk"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <div class="goods-sku-wrapper">
      <p>市场价格</p>
      <van-field
        v-model="goods.retailPrice"
        rows="1"
        label="¥"
        type="number"
        autosize
        maxlength="10"
        placeholder="请输入市场价格"
      />
      <p>销售价格</p>
      <van-field
        v-model="goods.price"
        rows="1"
        label="¥"
        autosize
        type="number"
        maxlength="10"
        placeholder="请输入销售价格"
      />
      <p>经销商返佣</p>
      <van-field
        v-model="goods.profit"
        rows="1"
        label="¥"
        autosize
        type="number"
        maxlength="10"
        placeholder="请输入返佣金额"
      />
      <p>总库存</p>
      <van-field
        v-model="goods.storeNumber"
        rows="1"
        autosize
        type="number"
        maxlength="10"
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
        price: "",
        retailPrice: "",
        profit: "",
        storeNumber: "",
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.price !== undefined) {
      next((vm: any) => {
        vm.goods = { ...vm.goods, ...to.query };
      });
    } else {
      next();
    }
  },
  mounted() {
    console.log(this.goods);
  },
  methods: {
    handleEditOk() {
      if (!this.goods.retailPrice.length) {
        Toast("市场价格不能为空");
        return;
      }
      if (!this.goods.price.length) {
        Toast("销售价格不能为空");
        return;
      }
      if (!this.goods.profit.length) {
        Toast("佣金不能为空");
        return;
      }
      if (!this.goods.storeNumber.length) {
        Toast("库存不能为空");
        return;
      }
      this.$router.replace({
        path: "/goodsAdd",
        query: {
          price: Number(this.goods.price),
          retailPrice: Number(this.goods.retailPrice),
          profit: Number(this.goods.profit),
          storeNumber: Number(this.goods.storeNumber),
        },
      });
    },
    onClickLeft() {
      this.$dialog
        .confirm({
          message: "规格信息未保存，确认返回",
          className: "gy-dialog",
        })
        .then(() => {
          this.$router.replace({ path: "/goodsAdd" });
        });
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
    @include gy-input;
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
  }
  p {
    text-align: left;
    font-size: 14px;
    color: #fff;
    padding: 14px 0;
  }
}
</style>
