<template>
  <div class="apply-transition nav-bar">
    <van-nav-bar
      title="提交申请"
      left-arrow
      :border="false"
      @click-left="onClickLeft">
      <template #left>
        <img
          class="leftIcon"
          src="./../../assets/imgs/common/icon-left.png"/>
      </template>
    </van-nav-bar>
    <main>
      <div class="content">
          <img src="../../assets/imgs/common/ic_not.png" alt="">
      </div>
      <span>申请成为代理商信息已提交</span>
      <div>请耐心等待1-2个工作日，我们会尽快为您审核</div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "apply-transition",
  methods: {
    onClickLeft() {
      this.$router.replace({ path: "/certifiCation" });
    },
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";
.apply-transition {
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
  font-size: 14px;
  line-height: 45px;
}
</style>
