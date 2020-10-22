<template>
  <div class="submitaudit nav-bar">
    <van-nav-bar
      title="提交审核"
      left-arrow
      :border="false"
      @click-left="onClickLeft">
      <template #left>
        <img
          class="leftIcon"
          src="./../../assets/imgs/earnMoney/icon-left.png"/>
      </template>
    </van-nav-bar>
    <main>
      <div class="content">
          <img src="../../assets/imgs/common/ic_not.png" alt="">
      </div>
      <span>企业认证信息已提交</span>

    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "SubmitAudit",
  methods: {
    onClickLeft() {
      this.$router.replace({ path: "/certifiCation" });
    },
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";
.submitaudit {
  min-height: 100%;
  background-color: $bgColor;
  color: #fff;
}
main {
  padding-left: 18px;
  padding-right: 18px;
}
.content {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
.content img {
  width: 80px;
}
span {
  font-size: 12px;
  line-height: 45px;
}
</style>
