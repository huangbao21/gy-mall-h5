<template>
  <div class="deliver-page nav-bar">
    <van-nav-bar
      :border="false"
      @click-left="toView"
      title="发货"
      right-text="确定"
      @click-right="onClickRight"
    >
      <template #left>
        <img class="leftIcon" src="@/assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <main>
      <span class="label">快递单号</span>
      <van-field
        v-model="sn"
        class="sn-input"
        placeholder="请输入快递单号"
      />
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { deliverOrder } from "@/services/order";
export default defineComponent({
  name: "DeliverPage",
  data() {
    return {
      sn: "",
      orderId: 0,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm: any) => {
      vm.orderId = to.query.orderId;
    });
  },
  methods: {
    toView() {
      this.$router.go(-1);
    },
    async onClickRight() {
      console.log(this.sn, this.orderId);
      if (this.sn && this.orderId) {
        await deliverOrder({ sn: this.sn, id: this.orderId });
        this.toView();
      }
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
main {
  color: #fff;
  text-align: left;
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 18px;
}
.label {
  margin-bottom: 12px;
  display: block;
}
.sn-input {
  @include gy-input;
}
</style>
