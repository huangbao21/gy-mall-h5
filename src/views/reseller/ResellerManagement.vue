<template>
  <div class="reseller-management nav-bar">
    <van-nav-bar
      title="分销商管理"
      right-text="申请列表"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onSave"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <div class="reseller-management-content">
      <div class="reseller-info">
        <div class="reseller">
          <span class="reseller-data">20000</span>
          <span class="reseller-des">分销商数</span>
        </div>
        <div class="total-sales">
          <span class="total-sales-data">20000</span>
          <span class="total-sales-des">总销售额</span>
        </div>
      </div>
      <div class="commission-list">
        <div class="commission-cell">
          <div class="commission-cell-header">
            <span class="commission-cell-header-title">权益01</span>
            <van-button type="primary">编辑</van-button>
          </div>
          <div class="commission-cell-content">
            <div class="profit">
              <span class="profit-data">80%</span>
              <span class="profit-des">分佣比例</span>
            </div>
            <div class="sales">
              <span class="sales-data">22.34万</span>
              <span class="sales-des">销售额</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ResellerManagement",
  data() {
    return {};
  },
  methods: {},
});
</script>
<style lang="scss" scoped>
@import "../../styles/base";
.reseller-management {
  .reseller-management-content {
    padding: 0 18px;
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
      justify-content: center;
      .commission-cell {
        width: 339px;
        height: 122px;
        background-color: #1e183c;
        border-radius: 8px;
        padding: 0 20px;
        .commission-cell-header {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid rgba(240, 240, 240, 0.4);
          line-height: 44px;
          height: 45px;
          &-title{
            color:white;
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
          }
          .sales {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
}
</style>
