<template>
  <div class="earnMoneyCenter">
    <van-nav-bar
      title="赚钱中心"
      left-arrow
      :border="false"
      @click-left="onClickLeft"
    >
      <template #left>
        <img
          class="leftIcon"
          src="./../../assets/imgs/earnMoney/icon-left.png"
        />
      </template>
    </van-nav-bar>
    <div class="profit" @click="toView">
      <div class="profit-info">
        <span class="profit-info__text">已赚</span>
        <div class="profit-info__gold">
          <img src="./../../assets/imgs/earnMoney/icon-gold.png" />
          <span>2000000000</span>
        </div>
      </div>
      <div class="profit-icon">
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="items">
      <div class="items-row first">
        <div class="item">
          <img src="./../../assets/imgs/earnMoney/视频任务.png" />
        </div>
        <div class="item">
          <img src="./../../assets/imgs/earnMoney/邀请好友.png" />
        </div>
      </div>
      <div class="items-row">
        <div class="item">
          <img src="./../../assets/imgs/earnMoney/高佣巨赚.png" />
        </div>
        <div class="item">
          <img src="./../../assets/imgs/earnMoney/高佣巨赚二.png" />
        </div>
      </div>
      <div class="items-row">
        <div class="item">
          <img src="./../../assets/imgs/earnMoney/游戏赚钱.png" />
        </div>
        <div class="item">
          <img src="./../../assets/imgs/earnMoney/注册赚钱.png" />
        </div>
      </div>
      <div class="items-row">
        <div class="item">
          <img src="./../../assets/imgs/earnMoney/阅读赚钱.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { fetchMissionList } from "@/services/earn";
import { PostData } from '@/axios';

export default defineComponent({
  name: "earnMoneyCenter",
  components: {
    // HelloWorld
  },
  setup(props) {
    let repositories;
    const getMissionData = async () => {
      repositories = await fetchMissionList({
        current: 1,
        size: 10,
        token: "123",
      });
    };
    return {
      repositories,
      getMissionData
    };
  },
  methods: {
    toView() {
      this.$router.push("/earnMoneyDetail");
    },
  },
});
</script>
<style lang="scss" scoped>
@import "./style.scss";
.earnMoneyCenter {
  background: url(./../../assets/imgs/earnMoney/bg.png) no-repeat;
  background-size: contain;
  min-height: 100%;
  background-color: $bgColor;
  padding-top: 27px;
  :deep(.van-nav-bar__title) {
    color: #fff;
    font-weight: bold;
    font-size: 18px;
  }
}

.profit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  &-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #fff;
    margin-top: 28px;
    &__text {
      opacity: 0.6;
      margin-bottom: 12px;
      font-size: 12px;
    }
    &__gold {
      display: flex;
      align-items: center;
      font-size: 24px;
      font-weight: bold;
      img {
        width: 24px;
        height: 24px;
        margin-right: 6px;
        margin-bottom: 4px;
      }
    }
  }
  &-icon {
    .van-icon {
      color: #fff;
      font-size: 18px;
      margin-top: 30px;
    }
  }
}
.items {
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 24px;
  &-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    &.first {
      .item {
        height: 129px;
      }
    }
    .item {
      width: 165px;
      height: 92px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
