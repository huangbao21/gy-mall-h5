<template>
  <div class="withdrawGold nav-bar">
    <van-nav-bar
      title="金币划转"
      left-arrow
      :border="false"
      @click-left="toView"
    >
      <template #left>
        <img
          class="leftIcon"
          src="./../../assets/imgs/earnMoney/icon-left.png"
        />
      </template>
    </van-nav-bar>
    <div class="account">
      <span><small>￥</small>0</span>
      <span class="des">到账金额</span>
    </div>
    <div class="account-input">
      <span>划转金币数量</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "withdrawGold",
  data() {
    return {};
  },
  methods: {
    toView() {
      console.log(123);
      this.$router.go(-1);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.withdrawGold {
  min-height: 100%;
  background-color: $bgColor;
}
.account {
  display: flex;
  font-size: 32px;
  color: #fff;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  small {
    font-size: 20px;
  }
  .des {
    font-size: 12px;
    color: rgba($color: #fff, $alpha: 0.4);
  }
}
</style>
