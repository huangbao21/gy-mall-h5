<template>
  <div class="staff nav-bar">
    <van-nav-bar
      title="人员列表"
      right-text="新增"
      left-arrow
      @click-left="onClickLeft"
      @click-right="handleStaffAdd"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <staff-item
        @edit="handleStaffEdit"
        v-for="item in staffList"
        :key="item.id"
        :staffInfo="item"
      ></staff-item>
    </van-list>
  </div>
</template>
<script lang="ts">
import { fetchStaffList } from "@/services/internal";
import { defineComponent } from "vue";
import StaffItem from "./component/StaffItem.vue";
export default defineComponent({
  name: "Staff",
  components: {
    StaffItem
  },
  data() {
    return {
      size: 10,
      current: 0,
      customerRank: -1,
      staffList: [] as object[],
      loading: false,
      finished: false
    };
  },
  mounted() {
    console.log(this.$route);
    this.customerRank = Number(this.$route.query.customerRank);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async fetchStaffList() {
      const res = await fetchStaffList({
        size: this.size,
        current: this.current,
        customerRank: this.customerRank
      });
      this.loading = false;
      if (
        this.size > res.data.records.length ||
        this.current * this.size >= res.data.total
      ) {
        this.finished = true;
      }
      console.log(res);
      this.staffList.push(...res.data.records);
    },
    onLoad() {
      this.current += 1;
      this.fetchStaffList();
    },
    handleStaffAdd() {
      this.$router.push({ path: "/staffSetting" });
    },
    handleStaffEdit(satffInfo: any) {
      console.log(satffInfo);
      this.$router.push({
        path: "/staffSetting",
        query: { userId: satffInfo.id, type: "edit" }
      });
    }
  }
});
</script>
<style lang="scss" scoped>
@import "../../styles/base";
</style>
