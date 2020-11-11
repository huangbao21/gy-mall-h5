<template>
  <div class="company-item">
    <div
      style="display:flex;padding-bottom:13px"
      @click="viewGoodsList(companyInfo)"
    >
      <img :src="companyInfo.avatar" alt="" class="company-item__avatar" />
      <div class="company-item__info">
        <div class="company-item__info--name">
          {{ companyInfo.shopName }}
        </div>
        <div class="company-item__info--number">
          已有{{ companyInfo.agencyNumber }}人代理
        </div>
        <div class="company-item__info--imgs">
          <img
            v-for="img in companyInfo.agencyProductVoList"
            :key="img.id"
            :src="img.imgaeUrl"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="company-item__action" v-if="activeName === 'toApply'">
      <van-button plain type="primary" @click="onApply(companyInfo)"
        >申请</van-button
      >
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CompanyItem",
  props: {
    companyInfo: Object,
    activeName: String
  },
  data() {
    return {};
  },
  components: {
    // HelloWorld
  },
  methods: {
    viewGoodsList(companyInfo: any) {
      this.$emit("click-company", companyInfo);
    },
    onApply(companyInfo: any) {
      this.$emit("apply", companyInfo);
    }
  }
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.company-item {
  display: flex;
  flex-direction: column;
  padding: 12px 12px 0 12px;
  margin: 8px 0;
  width: 100%;
  background-color: $contentBgColor;
  &__avatar {
    width: 94px;
    height: 94px;
  }
  &__info {
    display: flex;
    flex-direction: column;
    margin-left: 9px;
    width: 70%;
    &--name {
      color: #fff;
      text-align: left;
    }
    &--number {
      color: rgba(255, 255, 255, 0.4);
      font-size: 12px;
      line-height: 28px;
      text-align: left;
    }
    &--imgs {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: scroll;
      height: 45px;
      width: 100%;
      &::-webkit-scrollbar {
        display: none;
      }
      img {
        width: 45px;
        height: 45px;
        margin: 0 5px;
      }
    }
  }
  &__action {
    height: 66px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid rgba(240, 240, 240, 0.4);
    .van-button--plain {
      @include gy-btn-plain;
      height: 32px;
      border-radius: 22px;
    }
  }
}
</style>
