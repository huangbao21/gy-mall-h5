<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Utils from "@/utils";

export default defineComponent({
  // setup() {},
  mounted() {
    Utils.adjustViewport()
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body,
html {
  height: 100%;
}
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
