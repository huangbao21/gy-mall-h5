<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Utils from "@/utils";
import qs from "qs";

export default defineComponent({
  mounted() {
    Utils.adjustViewport();
    const paramsStr = location.search.split("?");
    const params = qs.parse(paramsStr[1]);
    if (params.token) {
      Utils.setLoginCookie(params);
    }
  },
});
</script>
<style lang="scss">
@import "@/styles/global.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  font-size: 16px;
}
</style>
