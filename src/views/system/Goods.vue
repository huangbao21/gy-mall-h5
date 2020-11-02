<template>
  <div class="goods-page nav-bar">
    <van-nav-bar title="选择商品" left-arrow @click-left="onClickLeft">
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <div class="goods-list">
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <good-item
          v-for="(good, index) in list"
          :good="good"
          :key="good.id"
          :underline="!(index == list.length - 1)"
          show-checkbox
          @update:good-checked="handleGoodCheck($event, good)"
          :good-checked="good.checked"
        ></good-item>
      </van-list>
    </div>
    <div class="footer-action">
      <van-button type="primary" @click="handleGoodAdd">确定</van-button>
    </div>
    Í
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import GoodItem from "@/components/GoodItem.vue";
import { fetchGoodsList } from "@/services/common";
import { Toast } from "vant";
export default defineComponent({
  name: "Goods",
  components: {
    GoodItem,
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [] as object[],
      current: 0,
      size: 10,
      showActionPanel: false,
      selectedId: -1,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.selectedId !== undefined) {
      next((vm: any) => {
        console.log(`路由赋值`);
        vm.selectedId = to.query.selectedId;
      });
    } else {
      next();
    }
  },
  methods: {
    onClickLeft() {
      this.$dialog
        .confirm({
          message: "添加的商品信息未保存，确认返回",
          className: "gy-dialog",
        })
        .then(() => {
          this.$router.replace({ path: "/systemManagement" });
        });
    },
    isNoChecked(item: any) {
      return item.checked === false;
    },
    handleGoodAdd() {
      const res = this.list.every(this.isNoChecked);
      if (res) {
        Toast(`请选择一个商品`);
        return;
      }
      const selectedGood = this.list.filter(
        (goodItem: any) => goodItem.checked === true
      )[0];
      console.log(selectedGood);
      this.$router.replace({
        path: "/systemManagement",
        query: { ...selectedGood },
      });
    },
    handleGoodCheck(isChecked: boolean, good: any) {
      this.list.forEach((ele: any) => (ele.checked = false));
      good.checked = isChecked;
      console.log(this.list);
    },
    async fetchGoodsList() {
      this.loading = true;
      const res = await fetchGoodsList({
        current: this.current,
        size: this.size,
      }).catch((err) => {
        this.loading = false;
        this.finished = true;
        return Promise.reject(err);
      });
      this.loading = false;
      if (
        this.size > res.data.records.length ||
        this.current * this.size >= res.data.total
      ) {
        this.finished = true;
      }
      const records = res.data.records;
      console.log(this.selectedId);
      records.forEach((element: any) => {
        console.log(element.id);
        if (element.id === Number(this.selectedId)) {
          console.log(`come in`);
          element.checked = true;
        } else {
          element.checked = true;
        }
      });
      this.list.push(...res.data.records);
    },
    onLoad() {
      if (this.loading) return;
      console.log(`啥子情况`);
      this.current += 1;
      this.fetchGoodsList();
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.goods-page {
  height: 100%;
  .goods-list {
    padding-left: 20px;
    height: calc(100% - 90px);
    overflow-y: scroll;
  }
  .footer-action {
    position: fixed;
    bottom: 4px;
    left: 0;
    right: 0;
    .van-button--primary {
      @include gy-btn-primary;
      width: 335px;
      height: 44px;
      border-radius: 20px;
      color: rgba(13, 4, 32, 1);
      font-weight: bold;
    }
  }
}
</style>
