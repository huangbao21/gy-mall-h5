<template>
  <div class="reseller-audit nav-bar">
    <van-nav-bar title="申请列表" left-arrow @click-left="onClickLeft">
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <van-list
      class="audit-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="audit-list-cell" v-for="item in applyRecord" :key="item">
        <div class="audit-list-cell-header">
          <div class="apply-user-info">
            <van-image width="44px" height="44px" round :src="item.avatarUrl" />
            <span class="apply-user-info-name">{{ item.nickName }}</span>
          </div>
          <div class="apply-data">
            <span class="apply-monetary">{{ item.describe }}</span>
            <span class="apply-date">申请时间 {{ item.applyTime }}</span>
          </div>
        </div>
        <div class="audit-list-cell-footer">
          <van-button round plain type="primary" @click="handleReject(item.id)"
            >拒绝</van-button
          >
          <van-button round type="primary" @click="handleAgree(item.id)"
            >同意</van-button
          >
        </div>
      </div>
    </van-list>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  fetchAgencyApplyList,
  auditAgencyApply
} from "../../services/reseller";
import { AuditStatus } from "../../utils/const";
import { Toast } from "vant";
export default defineComponent({
  name: "ResellerAudit",
  data() {
    return {
      applyRecord: [] as object[],
      current: 0,
      size: 10,
      loading: false,
      finished: false
    };
  },
  mounted() {
    console.log(`组件挂载`);
  },
  methods: {
    resetAuditList() {
      Toast(`操作成功`);
      this.current = 0;
      this.applyRecord = [];
      this.onLoad();
    },
    async handleAgree(id: number) {
      await auditAgencyApply({ id, auditStatus: AuditStatus.Agree });
      this.resetAuditList();
    },
    async handleReject(id: number) {
      await auditAgencyApply({ id, auditStatus: AuditStatus.Reject });
      this.resetAuditList();
    },
    async fetchApplyList() {
      this.loading = true;
      const res = await fetchAgencyApplyList({
        current: this.current,
        size: this.size,
        auditStatus: AuditStatus.Audit
      }).catch(err => {
        this.loading = false;
        this.finished = true;
        return Promise.reject(err);
      });
      this.loading = false;
      if (
        this.size > res.data.records.length ||
        this.current * this.size >= res.data.total
      ) {
        console.log(new Date(), res.data.current, "没有数据了");
        this.finished = true;
      }
      this.applyRecord.push(...res.data.records);
    },
    onLoad() {
      if (this.loading) return;
      this.current += 1;
      this.fetchApplyList();
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
});
</script>
<style lang="scss" scoped>
@import "../../styles/base";
.reseller-audit {
  height: 100%;
  .audit-list {
    padding: 0 18px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 44px);
    overflow-y: scroll;
    .audit-list-cell {
      padding: 0 20px;
      margin: 7px 0;
      background-color: rgba(30, 24, 60, 1);
      border-radius: 8px;
      .audit-list-cell-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70px;
        border-bottom: 1px solid rgba(240, 240, 240, 0.2);
        .apply-user-info {
          display: flex;
          align-items: center;
          &-name {
            margin-left: 9px;
            color: #fff;
          }
        }
        .apply-data {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-size: 12px;
          color: #fff;
          line-height: 24px;
        }
      }
      .audit-list-cell-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 74px;
        button {
          width: 90px !important;
          height: 32px;
          margin-left: 12px;
        }
        .van-button--primary {
          @include gy-btn-primary;
          width: 160px;
        }
        .van-button--plain {
          @include gy-btn-plain;
        }
      }
    }
  }
}
</style>
