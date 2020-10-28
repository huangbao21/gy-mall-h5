<template>
  <div class="reseller-management nav-bar">
    <van-nav-bar
      title="分销商管理"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
      <template #right>
        <div class="nav-bar-right">
          <span class="nav-bar-right-text">申请列表</span>
          <span class="nav-bar-right-tips">20</span>
        </div>
      </template>
    </van-nav-bar>
    <div class="reseller-management-content">
      <div class="reseller-info">
        <div class="reseller">
          <span class="reseller-data">{{ peopleNumber }}</span>
          <span class="reseller-des">分销商数</span>
        </div>
        <div class="total-sales">
          <span class="total-sales-data">{{ saleNumber }}</span>
          <span class="total-sales-des">总销售额</span>
        </div>
      </div>
      <div class="commission-list">
        <div
          class="commission-cell"
          v-for="(item, index) in commissionSettingList"
          :key="item.id"
        >
          <div class="commission-cell-header">
            <span class="commission-cell-header-title"
              >权益{{ index + 1 }}</span
            >
            <van-button
              type="primary"
              plain
              round
              @click="handleCommissionEdit(item)"
              >编辑</van-button
            >
          </div>
          <div class="commission-cell-content">
            <div class="profit">
              <span class="profit-data">{{ item.ration }}%</span>
              <span class="profit-des">分佣比例</span>
            </div>
            <div class="sales">
              <span class="sales-data">{{ item.sellNumber }}万</span>
              <span class="sales-des">销售额</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-action">
        <van-button type="primary" @click="handleCommissionAdd"
          >新增权益</van-button
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  fetchCommissionSettingList,
  queryAgencyAndSales,
} from "../../services/reseller";
export default defineComponent({
  name: "ResellerManagement",
  data() {
    return {
      commissionSettingList: [] as object[],
      peopleNumber: 0,
      saleNumber: 0,
    };
  },
  created() {
    this.fetchCommissionSettingList();
    this.queryAgencyAndSales();
  },
  methods: {
    async fetchCommissionSettingList() {
      const res = await fetchCommissionSettingList();
      this.commissionSettingList = res.data;
    },
    async queryAgencyAndSales() {
      const res = await queryAgencyAndSales();
      this.saleNumber = res.data.saleNumber;
      this.peopleNumber = res.data.peopleNumber;
    },
    handleCommissionEdit(item: any) {
      console.log(`分佣比例设置`);
      this.$router.push({ path: "/commissionSetting", query: { ...item } });
    },
    handleCommissionAdd() {
      console.log(`新增权益设置`);
      this.$router.push({ path: "/commissionSetting" });
    },
    onClickRight() {
      this.$router.push({ path: "/resellerAudit" });
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../../styles/base";
.reseller-management {
  height: 100%;
  .nav-bar-right {
    &-text {
      color: rgba(0, 255, 210, 1);
    }
    &-tips {
      position: absolute;
      top: 4px;
      right: 6px;
      width: 18px;
      height: 18px;
      border-radius: 18px;
      background-color: rgba(234, 74, 114, 1);
      font-size: 8px;
      color: #fff;
    }
  }
  .reseller-management-content {
    padding: 0 18px;
    height: calc(100% - 44px);
    .reseller-info {
      display: flex;
      justify-content: space-around;
      padding: 25px 0;
      .reseller {
        display: flex;
        flex-direction: column;
        .reseller-data {
          font-size: 28px;
          color: #ffb300;
        }
        .reseller-des {
          color: rgba(255, 255, 255, 0.4);
        }
      }
      .total-sales {
        display: flex;
        flex-direction: column;
        .total-sales-data {
          font-size: 28px;
          color: #ffb300;
        }
        .total-sales-des {
          color: rgba(255, 255, 255, 0.4);
        }
      }
    }
    .commission-list {
      display: flex;
      flex-direction: column;
      height: calc(100% - 164px);
      overflow-y: scroll;
      .commission-cell {
        width: 339px;
        height: 122px;
        background-color: #1e183c;
        border-radius: 8px;
        padding: 0 20px;
        margin: 7px 0;
        .commission-cell-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(240, 240, 240, 0.4);
          line-height: 44px;
          height: 45px;
          &-title {
            color: #fff;
          }
          .van-button--plain {
            @include gy-btn-plain;
          }
        }
        .commission-cell-content {
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 77px;
          .profit {
            display: flex;
            flex-direction: column;
            .profit-data {
              font-size: 18px;
              color: #fff;
            }
            .profit-des {
              font-size: 12px;
              color: rgba(255, 255, 255, 0.4);
            }
          }
          .sales {
            display: flex;
            flex-direction: column;
            .sales-data {
              font-size: 18px;
              color: #fff;
            }
            .sales-des {
              font-size: 12px;
              color: rgba(255, 255, 255, 0.4);
            }
          }
        }
      }
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
}
</style>
