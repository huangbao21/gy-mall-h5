<template>
  <div class="home">
    <div class="money">
      <div class="title">可提现</div>
      <div class="money-withdrawal">
        <div class="money-withdrawal-amount">
          ¥
          <span class="money-withdrawal-amount-num">{{
            salesInfo.canWithdrawNumber
          }}</span>
        </div>
        <div class="money-withdrawal-btn" @click="handleWithdrawal">提现</div>
      </div>
      <div class="money-data">
        <div class="total-sales">
          <div class="total-sales-number">
            ¥
            <span class="total-sales-number-num">{{
              salesInfo.totalSalesNumber
            }}</span>
          </div>
          <div class="total-sales-text">总销售金额</div>
        </div>
        <div class="money-balance">
          <div class="money-balance-number">
            ¥
            <span class="money-balance-number-num">{{
              salesInfo.waitSettleNumber
            }}</span>
          </div>
          <div class="money-balance-text">待结算余额</div>
        </div>
      </div>
    </div>
    <div class="today-data">
      <div class="today-data__title">
        <div class="today-data__title-left">今日数据</div>
        <div class="today-data__title-right">
          更新于：{{ salesInfo.updateTime }}
        </div>
      </div>
      <div class="today-data__body">
        <div class="today-order">
          <div class="today-order-number">
            {{ salesInfo.todayOrdersNumber }}
          </div>
          <div class="today-order-text">今日订单数</div>
        </div>
        <div class="today-sales">
          <div class="today-sales-body">
            ¥
            <span class="today-sales-number">{{
              salesInfo.todaySalesNumber
            }}</span>
          </div>
          <div class="today-sales-text">今日销售额</div>
        </div>
      </div>
    </div>
    <div class="operate">
      <div class="operate-item" @click="goGoodsAdd">
        <img
          class="operate-item__icon"
          src="../assets/imgs/home/ic_good_add.png"
        />
        <div class="operate-item__text">新增商品</div>
      </div>
      <div class="operate-item" @click="goGoodsManage">
        <img class="operate-item__icon" src="../assets/imgs/home/ic_good.png" />
        <div class="operate-item__text">商品管理</div>
      </div>
      <div class="operate-item" @click="goOrderManage">
        <img
          class="operate-item__icon"
          src="../assets/imgs/home/ic_order.png"
        />
        <div class="operate-item__text">订单管理</div>
      </div>
      <div class="operate-item" @click="goSystem">
        <img
          class="operate-item__icon"
          src="../assets/imgs/home/ic_system.png"
        />
        <div class="operate-item__text">体系管理</div>
      </div>
      <div class="operate-item" @click="goInternal">
        <img
          class="operate-item__icon"
          src="../assets/imgs/home/ic_inner.png"
        />
        <div class="operate-item__text">内部管理</div>
      </div>
      <div class="operate-item" @click="goReseller">
        <img
          class="operate-item__icon"
          src="../assets/imgs/home/ic_reseller.png"
        />
        <div class="operate-item__text">代理商管理</div>
      </div>
      <div class="operate-item"></div>
      <div class="operate-item"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { fetchSalesData, transferMoney } from "../services/home";
import Utils from "../utils/index";
export default defineComponent({
  name: "Home",
  data() {
    return {
      salesInfo: {
        canWithdrawNumber: 0,
        todayOrdersNumber: 0,
        todaySalesNumber: 0,
        totalSalesNumber: 0,
        userId: 883420,
        waitSettleNumber: 0,
        updateTime: ""
      }
    };
  },
  components: {
    // HelloWorld
  },
  mounted() {
    this.fetchSalesData();
  },
  methods: {
    formatTime(stamp: number) {
      const date = new Date(stamp);
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },
    async fetchSalesData() {
      const res = await fetchSalesData();
      console.log(res);
      const updateTime = this.formatTime(res.data.refreshTime);
      console.log(updateTime);
      this.salesInfo = { ...this.salesInfo, ...res.data, updateTime };
    },
    goGoodsAdd() {
      this.$router.push({ path: "/goodsAdd" });
    },
    goSystem() {
      this.$router.push({ path: "/systemManagement" });
    },
    goReseller() {
      this.$router.push({ path: "/resellerManagement" });
    },
    goGoodsManage() {
      this.$router.push({ path: "/goodsManage" });
    },
    goOrderManage() {
      this.$router.push({ path: "/enterpriseOrder" });
    },
    goInternal() {
      this.$router.push({ path: "/internalManage" });
    },
    handleItemClick($event: any) {
      console.log($event);
    },
    async handleWithdrawal() {
      await transferMoney({ transferMoney: this.salesInfo.canWithdrawNumber });
    }
  }
});
</script>
<style lang="scss" scoped>
@import "../styles/base";
.home {
  padding: 0 18px;
  height: 100%;
  .money {
    display: flex;
    flex-direction: column;
    width: 339px;
    height: 174px;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
    background-color: $contentBgColor;
    border-top: 1px solid #7e00ff;
    /* border-image: linear-gradient(#7e00ff, #0078ff) 30 30; */
    .title {
      color: $commonWordColor;
      text-align: left;
    }
    &-withdrawal {
      display: flex;
      justify-content: space-between;
      color: #fff;
      font-weight: bold;
      &-amount-num {
        font-size: 24px;
      }
      &-btn {
        width: 44px;
        height: 22px;
        border-radius: 11px;
        line-height: 22px;
        font-size: 12px;
        color: #000;
        background-color: #00ffd2;
      }
    }
    &-data {
      display: flex;
      justify-content: space-around;
      margin-top: 35px;
      .total-sales,
      .money-balance {
        display: flex;
        flex-direction: column;
        .total-sales-text,
        .money-balance-text {
          color: $commonWordColor;
          font-size: 12px;
        }
        .total-sales-number,
        .money-balance-number {
          color: #fff;
          .total-sales-number-num,
          .money-balance-number-num {
            font-size: 18px;
          }
        }
      }
    }
  }
  .today-data {
    width: 339px;
    height: 122px;
    border-top: 1px solid #7e00ff;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    background-color: $contentBgColor;
    &__title {
      display: flex;
      justify-content: space-between;
      color: $commonWordColor;
      &-left {
        font-size: 14px;
        font-weight: bold;
      }
      &-right {
        font-size: 10px;
      }
    }
    &__body {
      display: flex;
      justify-content: space-around;
      margin-top: 26px;
      .today-order,
      .today-sales {
        display: flex;
        flex-direction: column;
        color: #fff;
        &-body {
          font-weight: bold;
        }
        .today-order-number,
        .today-sales-number {
          font-size: 18px;
          font-weight: bold;
        }
        .today-order-text,
        .today-sales-text {
          font-size: 12px;
          color: $commonWordColor;
        }
      }
    }
  }
  .operate {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-content: flex-start;
    .operate-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80px;
      text-align: center;
      font-size: 16px;
      color: #fff;
      margin-top: 28px;
      img {
        width: 28px;
        height: 28px;
      }
      &__text {
        font-size: 16px;
        margin-top: 12px;
      }
    }
  }
}
</style>
