<template>
  <div class="earnMoneyCenter nav-bar">
    <van-nav-bar
      title="赚钱中心"
      left-arrow
      :border="false"
      @click-left="toBackApp"
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
          <span>{{ bounty }}</span>
        </div>
      </div>
      <div class="profit-icon">
        <van-icon name="arrow" />
      </div>
    </div>

    <van-list
      v-model:loading="loading"
      loading-text=""
      :finished="finished"
      @load="onLoad"
    >
      <div class="items">
        <template v-for="(item, index) in list" :key="item.id">
          <div
            class="items-row"
            :class="index === 0 ? 'first' : ''"
            v-if="index % 2 === 0"
          >
            <div class="item">
              <img :src="item.iconUrl" />
            </div>
            <div class="item" v-if="index + 1 < list.length">
              <img :src="list[index + 1].iconUrl" />
            </div>
          </div>
        </template>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent } from "vue";
import { fetchMissionList, fetchBounty } from "@/services/earn";
import useBackAppApi from "@/composables/useBackAppApi";

export default defineComponent({
  name: "earnMoneyCenter",
  components: {
    // HelloWorld
  },
  setup() {
    const { toBackApp } = useBackAppApi();
    return {
      toBackApp,
    };
  },
  data() {
    return {
      current: 0,
      size: 10,
      list: [] as object[],
      loading: false,
      finished: false,
      bounty: 0,
    };
  },
  mounted() {
    this.getBounty();
  },
  methods: {
    toView() {
      this.$router.push("/earnMoneyDetail");
    },
    async getBounty() {
      const res = await fetchBounty();
      this.bounty = res.data.rewardTotal ? res.data.rewardTotal : 0;
    },
    async getMissionData() {
      const res = await fetchMissionList({
        current: this.current,
        size: this.size,
      }).catch((err) => {
        this.loading = false;
        this.finished = true;
        return Promise.reject(err);
      });
      this.loading = false;
      if (this.size > res.data.records) {
        this.finished = true;
      } else {
        this.list.push(...this.list, ...res.data.records);
      }
    },
    onLoad() {
      this.current += 1;
      this.getMissionData();
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.earnMoneyCenter {
  background: url(./../../assets/imgs/earnMoney/bg.png) no-repeat;
  background-size: contain;
  min-height: 100%;
  background-color: $bgColor;
  padding-top: 27px;
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
