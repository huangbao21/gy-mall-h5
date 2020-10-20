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
      :finished="finished"
      @load="onLoad"
      :immediate-check="false"
      ref="vanList"
    >
      <div class="items">
        <template v-for="(item, index) in list" :key="item.id">
          <div
            class="items-row"
            :class="index === 0 ? 'first' : ''"
            v-if="index % 2 === 0"
          >
            <div class="item" @click="activeMission(item)">
              <img :src="item.iconUrl" />
              <template v-if="index === 0">
                <div class="item-action">
                  <div class="condition">
                    <img src="./../../assets/imgs/earnMoney/icon-gold.png" />
                    <span>{{ item.bountyQuantity }}{{ item.unit }}</span>
                  </div>
                  <template v-if="item.type === 1">
                    <span class="btn disabled" v-if="item.quantity === 0"
                      >今日达上限</span
                    >
                    <span class="btn" v-else-if="item.flag">抢任务</span>
                    <span class="btn" v-else
                      ><van-count-down
                        :time="countDown(item.nextTime)"
                        @finish="finishCount(item)"
                    /></span>
                  </template>
                  <template v-if="item.type === 2">
                    <span class="btn">立即邀请</span>
                  </template>
                </div>
              </template>
            </div>
            <div
              class="item"
              v-if="index + 1 < list.length"
              @click="activeMission(list[index + 1])"
            >
              <img :src="list[index + 1].iconUrl" />
              <template v-if="index === 0">
                <div class="item-action">
                  <div class="condition">
                    <img src="./../../assets/imgs/earnMoney/icon-gold.png" />
                    <span
                      >{{ list[index + 1].bountyQuantity }}
                      {{ list[index + 1].unit }}</span
                    >
                  </div>
                  <template v-if="list[index + 1].type === 1">
                    <template v-if="list[index + 1].type === 1">
                      <span
                        class="btn disabled"
                        v-if="list[index + 1].quantity === 0"
                        >今日达上限</span
                      >
                      <span class="btn" v-else-if="list[index + 1].flag"
                        >抢任务</span
                      >
                      <span class="btn" v-else
                        ><van-count-down
                          :time="countDown(list[index + 1].nextTime)"
                          @finish="finishCount(item)"
                      /></span>
                    </template>
                  </template>
                  <template v-if="list[index + 1].type === 2">
                    <span class="btn">立即邀请</span>
                  </template>
                </div>
              </template>
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
import { fetchMissionList, fetchBounty, saveMission } from "@/services/earn";
import useBackAppApi from "@/composables/useBackAppApi";
import { toCompleteMission } from "@/services/native";
import qs from "qs";
import moment from "moment";
import { Toast } from "vant";

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
    this.$dialog.alert({
      message: "我是一只小小小小小鸟",
      className: "gy-dialog",
    });
    const paramsStr = location.search.split("?");
    const params = qs.parse(paramsStr[1]);
    if (
      params.verify &&
      params.verifyStr &&
      params.bountyQuantity &&
      params.id
    ) {
      this.saveMission(params);
    } else {
      this.onLoad();
      (this.$refs as any).vanList.check();
    }
  },
  methods: {
    toView() {
      this.$router.push("/earnMoneyDetail");
    },
    activeMission(item: any) {
      if (item.toApp) {
        // 第三方限制
        if (item.type === 1 && item.flag) {
          toCompleteMission({
            url: item.addressUrl,
            bountyQuantity: item.bountyQuantity,
            id: item.id,
            verify: item.verify,
            verifyStr: item.verifyStr,
            androidPid: item.androidPid,
            iosPid: item.iosPid,
          });
          return;
        }
        // 内部不限制
        if (item.type === 2) {
          toCompleteMission({
            url: item.addressUrl,
            bountyQuantity: item.bountyQuantity,
            id: item.id,
            androidPid: item.androidPid,
            iosPid: item.iosPid,
            verify: item.verify,
            verifyStr: item.verifyStr,
          });
        }
      } else {
        Toast("暂未开放！");
      }
    },
    finishCount(item: any) {
      item.flag = true;
    },
    countDown(time: string) {
      const now = +moment();
      const next = +moment(time);
      return next - now;
    },
    async saveMission(data: any) {
      await saveMission({
        bountyQuantity: data.bountyQuantity,
        id: data.id,
        verify: data.verify,
        verifyStr: data.verifyStr,
      }).catch((err) => {
        this.onLoad();
        (this.$refs as any).vanList.check();
        return Promise.reject(err);
      });
      this.getBounty();
      this.onLoad();
      (this.$refs as any).vanList.check();
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
      if (this.size > res.data.records.length) {
        this.finished = true;
      }
      this.list.push(...res.data.records);
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
        position: relative;
        &-action {
          position: absolute;
          color: #fff;
          display: flex;
          left: 10px;
          right: 10px;
          bottom: 16px;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          .btn {
            width: 68px;
            height: 24px;
            background: linear-gradient(143deg, #fec749 0%, #eea705 100%);
            box-shadow: 0px 0px 3px 0px rgba(255, 255, 255, 1);
            border-radius: 20px;
            line-height: 24px;
            &.disabled {
              background: #c5c5c5;
            }
            .van-count-down {
              color: inherit;
              line-height: inherit;
              font-size: inherit;
            }
          }
          .condition {
            display: flex;
            img {
              width: 15px;
              height: 15px;
            }
          }
        }
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
