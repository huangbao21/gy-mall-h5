<template>
  <div class="good-item" :class="{ 'good-item--last': !underline }">
    <van-checkbox
      v-model="checked"
      :checked-color="checkRadioColor"
      v-if="showCheckBox"
      @change="onChange"
    ></van-checkbox>
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
          <div class="card-good-info__des--val">￥ {{ good.price }}</div>
        </div>
        <div class="card-good-info__des">
          <span class="card-good-info__des--key">分佣</span>
          <div class="card-good-info__des--red">￥ {{ good.profit }}</div>
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
</template>
<script lang="ts">
import { defineComponent } from "vue";
import usePropsCom from "@/composables/usePropsCom";

export default defineComponent({
  name: "GoodItem",
  data() {
    return {
      checked: false,
    };
  },
  props: {
    good: Object,
    // 下划线
    underline: {
      type: Boolean,
      default: true,
    },
    showCheckBox: {
      type: Boolean,
      default: false,
    },
    goodChecked: {
      type: Boolean,
      default: false,
    },
    showActionPanel: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { checkRadioColor } = usePropsCom();
    return {
      checkRadioColor,
    };
  },
  watch: {
    goodChecked(newV: boolean) {
      this.checked = this.goodChecked;
      console.log(newV, 2222);
    },
  },
  methods: {
    onChange(checked: boolean) {
      this.$emit("update:good-checked", checked);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.good-item {
  display: flex;
  .van-checkbox {
    margin-right: 20px;
    overflow: unset;
  }
  &--last {
    .card-good {
      border-bottom: none;
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
</style>
