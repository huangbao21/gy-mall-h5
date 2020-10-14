<template>
  <div class="earnMoneyDetail">
    <van-nav-bar
      title="已赚明细"
      left-arrow
      :border="false"
      @click-left="toView"
    >
      <template #left>
        <img
          class="leftIcon"
          src="./../../assets/imgs/earnMoney/icon-left.png"
        />
      </template>
    </van-nav-bar>
    <main>
      <div class="summary">
        <span class="des">当前已赚</span>
        <div class="earned">
          <div class="earned-info">
            <img src="./../../assets/imgs/earnMoney/icon-gold.png" />
            <span class="earned--val">200000000</span>
          </div>
          <span class="earned__btn">立即提现</span>
        </div>
        <div class="statistic">
          <div class="statistic-date">
            <span class="des">今日赚钱</span>
            <div class="statistic-info">
              <img src="./../../assets/imgs/earnMoney/icon-gold.png" />
              <span class="statistic--val">200000000</span>
            </div>
          </div>
          <div class="statistic-date">
            <span class="des">累计赚钱</span>
            <div class="statistic-info">
              <img src="./../../assets/imgs/earnMoney/icon-gold.png" />
              <span class="statistic--val">200000000</span>
            </div>
          </div>
        </div>
      </div>
      <h1>明细</h1>
      <div class="log-items">
        <div class="item">
          <div class="item-key">
            <span class="title">视频赚钱</span>
            <div class="des">
              <p>初级任务A</p>
              <p class="time">2020-09-20 12:54</p>
            </div>
          </div>
          <div class="item-state">
            <span class="val">+99</span>
            <span class="status">待结算</span>
          </div>
        </div>
        <div class="item">
          <div class="item-key">
            <span class="title">视频赚钱</span>
            <div class="des">
              <p>初级任务A</p>
              <p class="time">2020-09-20 12:54</p>
            </div>
          </div>
          <div class="item-state">
            <span class="val">+99</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "earnMoneyDetail",
  methods: {
    toView() {
      this.$router.go(-1);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.earnMoneyDetail {
  min-height: 100%;
  background-color: $bgColor;
  padding-top: 27px;
  color: #fff;
}
main {
  padding-left: 18px;
  padding-right: 18px;
}
.summary {
  width: 339px;
  height: 149px;
  background: url("./../../assets/imgs/earnMoney/summaryBg.png");
  background-size: cover;
  border-radius: 8px;
  text-align: left;
  padding-left: 20px;
  padding-top: 20px;
  margin-top: 20px;
  .des {
    opacity: 0.6;
    font-size: 12px;
  }
  .earned {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    align-items: center;
    &-info {
      font-size: 24px;
      font-weight: bold;
      display: flex;
      img {
        width: 24px;
        height: 24px;
        margin-right: 6px;
        margin-top: 3px;
      }
    }
    &__btn {
      width: 80px;
      height: 24px;
      background: linear-gradient(270deg, #46cdff 0%, #8539f7 100%);
      border-radius: 20px 0px 0px 20px;
      font-size: 12px;
      text-align: center;
      line-height: 24px;
      margin-bottom: 6px;
    }
  }
  .statistic {
    display: flex;
    font-size: 16px;
    margin-top: 5px;
    padding-left: 3px;
    &-date {
      &:nth-child(2) {
        margin-left: 30px;
      }
    }
    &-info {
      display: flex;
      align-items: center;
      img {
        width: 15px;
        height: 15px;
        margin-right: 5px;
        margin-bottom: 4px;
      }
    }
  }
}
h1 {
  text-align: left;
  font-weight: normal;
  font-size: 16px;
  margin-top: 18px;
  margin-bottom: 18px;
}
.log-items {
  .item {
    width: 340px;
    height: 90px;
    background: #1e183c;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    &-key {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: left;
      color: rgba($color: #fff, $alpha: 0.6);
      font-size: 12px;
      .title {
        font-size: 16px;
        color: rgba($color: #fff, $alpha: 1);
        margin-bottom: 8px;
      }
    }
    &-state {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .val {
        font-weight: bold;
      }
      .status {
        font-size: 12px;
        color: #00ffd2;
      }
    }
  }
}
</style>
