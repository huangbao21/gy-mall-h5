<template>
  <div class="introduce nav-bar">
    <van-nav-bar title="光鹰" :border="false" @click-left="toView">
      <template #left>
        <img class="leftIcon" src="@/assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <img
      src="https://quanmingjx.oss-cn-shanghai.aliyuncs.com/images/f42b5d011be241018dc3b6f11241df5f"
    />
  </div>
</template>
<script lang="ts">
import useBackAppApi from "@/composables/useBackAppApi";

import { defineComponent } from "vue";
export default defineComponent({
  name: "Introduce",
  setup() {
    const { toBackApp } = useBackAppApi();
    return {
      toBackApp,
    };
  },
  methods: {
    toView() {
      this.toBackApp();
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";

.introduce {
  height: 100%;
}
img {
  width: 100%;
}
</style>
