<template>
  <div class="earn-money-detail nav-bar">
    <van-nav-bar
      title="已赚明细"
      left-arrow
      :border="false"
      @click-left="toView"
    >
      <template #left>
        <img
          class="leftIcon"
          src="./../../assets/imgs/common/icon-left.png"
        />
      </template>
    </van-nav-bar>
    <main>
      <div class="summary">
        <span class="des">当前已赚</span>
        <div class="earned">
          <div class="earned-info">
            <img src="./../../assets/imgs/earnMoney/icon-gold.png" />
            <span class="earned--val">{{ balance }}</span>
          </div>
          <span class="earned__btn" @click="toView('/withdrawGold')"
            >立即划转</span
          >
        </div>
        <div class="statistic">
          <div class="statistic-date">
            <span class="des">今日赚钱</span>
            <div class="statistic-info">
              <img src="./../../assets/imgs/earnMoney/icon-gold.png" />
              <span class="statistic--val">{{ todayRewardTotal }}</span>
            </div>
          </div>
          <div class="statistic-date">
            <span class="des">累计赚钱</span>
            <div class="statistic-info">
              <img src="./../../assets/imgs/earnMoney/icon-gold.png" />
              <span class="statistic--val">{{ rewardTotal }}</span>
            </div>
          </div>
        </div>
      </div>
      <h1>明细</h1>
      <van-list v-model:loading="loading" :finished="finished" @load="onLoad">
        <div class="log-items">
          <div class="item" v-for="item in list" :key="item.id">
            <div class="item-key">
              <span class="title">{{ item.name }}</span>
              <div class="des">
                <p>{{ item.remark }}</p>
                <p class="time">{{ item.time }}</p>
              </div>
            </div>
            <div class="item-state">
              <span class="val">{{ `+${item.amount}` }}</span>
              <span class="status" v-if="item.status === 0">待结算</span>
            </div>
          </div>
        </div>
      </van-list>
    </main>
  </div>
</template>
<script lang="ts">
import { fetchBountyList, fetchBounty } from "@/services/earn";
import { defineComponent } from "vue";
export default defineComponent({
  name: "EarnMoneyDetail",
  data() {
    return {
      current: 0,
      size: 10,
      list: [] as object[],
      loading: false,
      finished: false,
      rewardTotal: 0,
      todayRewardTotal: 0,
      balance: 0,
    };
  },
  mounted() {
    this.getBounty();
  },
  methods: {
    toView(url: string) {
      if (url && typeof url === "string") {
        this.$router.push(url);
      } else {
        this.$router.go(-1);
      }
    },
    async getBounty() {
      const res = await fetchBounty();
      this.rewardTotal = res.data.rewardTotal ? res.data.rewardTotal : 0;
      this.todayRewardTotal = res.data.todayRewardTotal;
      this.balance = res.data.balance;
    },
    async getBountyList() {
      const res = await fetchBountyList({
        current: this.current,
        size: this.size,
      }).catch((err) => {
        this.loading = false;
        this.finished = true;
        return Promise.reject(err);
      });
      this.loading = false;
      if (this.size > res.data.records.length) {
        this.finished = true;
      }
      this.list.push(...res.data.records);
    },
    onLoad() {
      this.current += 1;
      this.getBountyList();
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.earn-money-detail {
  min-height: 100%;
  background-color: $bgColor;
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
        margin-top: 1px;
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
