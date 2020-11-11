<template>
  <div class="internal-management nav-bar">
    <van-nav-bar
      title="内部管理"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <div class="internal-management-content">
      <div class="job-list">
        <div
          class="job-cell"
          v-for="item in jobList"
          :key="item.id"
          @click="goStaff(item)"
        >
          <div class="job-cell-header">
            <span class="job-cell-header-title">{{ item.name }}</span>
            <van-button type="primary" plain round @click.stop="handleJobEdit(item)"
              >编辑</van-button
            >
          </div>
          <div class="job-cell-content">
            <div class="profit">
              <span class="profit-data">{{ item.ration }}%</span>
              <span class="profit-des">分佣比例</span>
            </div>
            <div class="people">
              <span class="people-data">{{ item.number }}人</span>
              <span class="people-des">已有</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-action">
        <van-button type="primary" @click="handleJobAdd">新增职位</van-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { fetchJobList } from "../../services/internal";
export default defineComponent({
  name: "InternalManagement",
  data() {
    return {
      jobList: [] as object[],
      peopleNumber: 0,
      saleNumber: 0,
      applyNumber: 0
    };
  },
  created() {
    this.fetchJobList();
    /*  this.queryAgencyAndSales();
    this.fetchApplyNumber(); */
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async fetchJobList() {
      const res = await fetchJobList();
      console.log(res);
      this.jobList = res.data;
    },
    goStaff(job: any) {
      this.$router.push({
        path: "/staff",
        query: { customerRank: job.customerRank }
      });
    },
    handleJobEdit(item: any) {
      console.log(`编辑职位`);
      this.$router.push({ path: "/jobSetting", query: { ...item } });
    },
    handleJobAdd() {
      console.log(`新增职位`);
      this.$router.push({ path: "/jobSetting" });
    },
    onClickRight() {
      this.$router.push({ path: "/resellerAudit" });
    }
  }
});
</script>
<style lang="scss" scoped>
@import "../../styles/base";
.internal-management {
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
  .internal-management-content {
    padding: 0 18px;
    height: calc(100% - 44px);
    .job-list {
      display: flex;
      flex-direction: column;
      height: calc(100% - 164px);
      overflow-y: scroll;
      .job-cell {
        width: 339px;
        height: 122px;
        background-color: #1e183c;
        border-radius: 8px;
        padding: 0 20px;
        margin: 7px 0;
        .job-cell-header {
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
        .job-cell-content {
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
          .people {
            display: flex;
            flex-direction: column;
            .people-data {
              font-size: 18px;
              color: #fff;
            }
            .people-des {
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
