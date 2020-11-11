<template>
  <div class="staff-item">
    <div style="display:flex;">
      <van-image
        width="10rem"
        height="10rem"
        :src="staffInfo.avatarUrl"
        class="staff-item__image"
      />
      <div class="staff-item__info">
        <div class="staff-item__info-name">{{staffInfo.nickName}}</div>
        <div class="staff-item__info-job">
          <div class="staff-item__info-job__title">{{staffInfo.rankName}}</div>
          <div class="staff-item__info-job__ration">分佣波比{{staffInfo.ratio}}%</div>
        </div>
      </div>
    </div>
    <div class="staff-item__sales">
      <span class="staff-item_sales-num">销售额：{{ staffInfo.saleNumber }}</span>
      <i class="staff-item__sales-icon" @click="handleStaffEdit(staffInfo)"></i>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "StaffItem",
  props: {
    staffInfo: Object
  },
  data() {
    return {};
  },
  mounted() {
    console.log(`组件挂载`);
  },
  methods: {
    handleStaffEdit(staffInfo: any) {
      this.$emit("edit", staffInfo);
    }
  }
});
</script>
<style lang="scss" scoped>
.staff-item {
  display: flex;
  justify-content: space-between;
  height: 80px;
  background-color: rgba(30, 24, 60, 1);
  align-items: center;
  padding: 0 18px;
  color: #fff;
  &__image {
    width: 46px !important;
    height: 46px !important;
    :deep(.van-image__img) {
      border-radius: 50%;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
    &-name {
      text-align: left;
    }
    &-job {
      display: flex;
      font-size: 12px;
      line-height: 36px;
      &__ration {
        margin-left: 20px;
      }
    }
  }
  &__sales {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    line-height: 36px;
    align-items: flex-end;
    &-icon {
      color: #969799;
      display: inline-block;
      font: normal normal normal 14px/1 vant-icon;
      &::before {
        display: inline-block;
        content: "\F04D";
        font-size: 20px;
      }
    }
  }
}
</style>
