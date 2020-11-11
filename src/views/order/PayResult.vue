<template>
  <div class="pay-result nav-bar">
    <van-nav-bar title="支付结果" :border="false" @click-left="toView">
      <template #left>
        <img class="leftIcon" src="@/assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <div class="main">
      <img :src="state == 'success' ? successImg : failImg" />
      <span class="main--text">{{
        state == "fail"
          ? "支付失败"
          : state == "success"
          ? "支付成功"
          : "支付取消"
      }}</span>
      <van-button round type="primary" @click="toView">返回</van-button>
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any  */

import { defineComponent } from "vue";
import successImg from "@/assets/imgs/common/ic_successful.png";
import failImg from "@/assets/imgs/common/ic_failure.png";
export default defineComponent({
  name: "PayResult",
  data() {
    return {
      state: "fail", // success fail cancel
      successImg: successImg,
      failImg: failImg,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm: any) => {
      vm.state = to.query.state;
    });
  },
  methods: {
    toView() {
      this.$router.replace("/customerOrder");
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  padding-left: 34px;
  padding-right: 34px;
  img {
    width: 80px;
    height: 80px;
  }
  &--text {
    color: #fff;
    font-size: 12px;
    margin-top: 25px;
    margin-bottom: 35px;
  }
  .van-button--primary {
    @include gy-btn-primary;
    width: 100%;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
