<template>
  <teleport to="body">
    <div class="express-popup" v-if="modelValue">
      <div class="express-popup__top">
        <img :src="orderInfo.productMainImageUrl" />
        <div class="good-info">
          <p class="title">
            {{ orderInfo.productName }}
          </p>
          <p>{{ expressInfo.expName }}: {{ expressInfo.sn }}</p>
        </div>
      </div>
      <div class="express-popup__flow">
        <van-steps :active="0" direction="vertical">
          <van-step v-for="(item, index) in expressInfo.list" :key="index">
            <h3>{{ item.status }}</h3>
            <p>{{ item.time }}</p>
          </van-step>
        </van-steps>
      </div>
      <p class="express-popup__close" @click="close">
        <img src="@/assets/imgs/order/popup_close.png" />
      </p>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ExpressPopup",
  props: {
    orderInfo: Object,
    expressInfo: Object,
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit("update:modelValue", false);
    },
  },
});
</script>
<style lang="scss" scoped>
.express-popup {
  position: absolute;
  height: 445px;
  width: 315px;
  background-color: #fff;
  border-radius: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  z-index: 99;
  &__top {
    display: flex;
    padding: 23px 20px 14px 20px;
    background: url("../../../assets/imgs/order/popupBg.png") no-repeat;
    background-size: contain;
    color: #fff;
    font-size: 13px;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      background-color: #d8d8d8;
      border-radius: 6px;
    }
    .good-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 10px;
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  &__flow {
    overflow-y: scroll;
    flex: 1;
  }
  &__close {
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
  }
  &__flow {
    .van-step {
      font-size: 12px;
    }
  }
}
</style>
