<template>
  <div class="good-item" :class="{ 'good-item--last': !underline }">
    <van-checkbox
      v-model="checked"
      :checked-color="checkRadioColor"
      v-if="showCheckbox"
      @change="onChange"
    ></van-checkbox>
    <div class="card-good" @click="viewGood(good)">
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
        <span class="card-good--status" v-if="good.isAgency==0">未进货</span>
      </van-image>
      <div class="card-good-info">
        <div class="card-good-actions" v-if="showActionPanel" @click.stop>
          <template
            v-if="
              (good.status == 0 || good.status == 3 || good.status == 4) &&
              type == 'enterprise'
            "
          >
            <div
              class="card-good__action card-good__action--editor"
              @click="actionEvent('edit')"
            >
              <img src="@/assets/imgs/common/ic_editor.png" />
              <span>编辑</span>
            </div>
          </template>
          <template
            v-if="good.status == 0 || good.status == 3 || good.status == 4"
          >
            <div
              class="card-good__action card-good__action--putaway"
              @click="actionEvent('putaway')"
            >
              <img src="@/assets/imgs/common/ic_putaway.png" />
              <span>上架</span>
            </div>
          </template>
          <template v-if="good.status == 2">
            <div
              class="card-good__action card-good__action--soldout"
              @click="actionEvent('soldout')"
            >
              <img src="@/assets/imgs/common/ic_putaway.png" />
              <span>下架</span>
            </div>
          </template>
          <template
            v-if="good.status == 0 || good.status == 3 || good.status == 4"
          >
            <div
              class="card-good__action card-good__action--delete"
              @click="actionEvent('del')"
            >
              <img src="@/assets/imgs/common/ic_delete.png" />
              <span>删除</span>
            </div>
          </template>
          <div
            class="card-good__action card-good__action--close"
            @click="actionEvent('close')"
          >
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
    <span class="good-item__more" v-if="showAction">
      <img
        src="@/assets/imgs/common/ic_more.png"
        @click.self="showActionPanel = true"
      />
    </span>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any  */
import { defineComponent } from "vue";
import usePropsCom from "@/composables/usePropsCom";

export default defineComponent({
  name: "GoodItem",
  data() {
    return {
      checked: false,
      showActionPanel: false,
    };
  },
  props: {
    good: Object,
    // 下划线
    underline: {
      type: Boolean,
      default: true,
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    goodChecked: {
      type: Boolean,
      default: false,
    },
    showAction: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "enterprise",
    },
    forceClickGood: {
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
  created() {
    this.checked = this.goodChecked;
  },
  watch: {
    goodChecked(newV: boolean) {
      this.checked = newV;
    },
  },
  methods: {
    viewGood(good: any) {
      if (this.forceClickGood || !this.showCheckbox) {
        this.$emit("click-good", good);
      }
    },
    actionEvent(name: string) {
      if (name === "close") this.showActionPanel = false;
      this.$emit(`action-${name}`);
    },
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
  position: relative;
  .van-checkbox {
    margin-right: 20px;
    overflow: unset;
  }
  &__more {
    position: absolute;
    bottom: 15px;
    right: 0;
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
        width: 100%;
        justify-content: flex-start;
        color: rgba($color: #fff, $alpha: 0.6);
        span:first-child {
          width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  &-actions {
    position: absolute;
    background-color: rgba($color: $contentBgColor, $alpha: 0.9);
    background-color: rgba(30, 24, 60, 0.9);
    z-index: 10;
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
