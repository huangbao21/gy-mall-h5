<template>
  <div class="pay-order">
    <van-button @click="pay">点击调起支付</van-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { callPayOrder } from "@/services/native";

export default defineComponent({
  name: "PayOrder",
  data() {
    return {};
  },
  methods: {
    async pay() {
      await callPayOrder({
        recordId: "123123",
        sdk: "alipay",
        money: "123",
        sign: "feqweqdqw",
      });
    },
  },
});
</script>
