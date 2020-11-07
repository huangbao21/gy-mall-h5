<template>
  <div class="company-manage nav-bar">
    <van-nav-bar title="订单管理" :border="false" @click-left="toView">
      <template #left>
        <img class="leftIcon" src="@/assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <van-search
      v-model="searchValue"
      shape="round"
      placeholder="搜索商品"
      :clearable="false"
      show-action
      class="gy-search"
    >
      <template #right-icon>
        <img
          v-show="searchValue"
          class="gy-clear"
          src="@/assets/imgs/common/ic_clear.png"
          @click="searchValue = ''"
        />
      </template>
      <template #action>
        <div class="search-btn" @click="onSearch">搜索</div>
      </template>
    </van-search>
    <van-tabs
      v-model:active="tabActive"
      class="gy-tabs"
      @click="getCompanyStatus"
    >
      <van-tab title="可申请" name="toApply">
        <div class="company-list">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <company-item
              v-for="item in list"
              :key="item.agencyId"
              :companyInfo="item"
              :tabActive="tabActive"
              @apply="handleApply"
            />
          </van-list>
        </div>
      </van-tab>
      <van-tab title="审核中" name="toDeliver">
        <div class="company-list">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <company-item
              v-for="item in list"
              :key="item.agencyId"
              :companyInfo="item"
              :tabActive="tabActive"
            />
          </van-list>
        </div>
      </van-tab>
      <van-tab title="未通过" name="toReject">
        <div class="company-list">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <company-item
              v-for="item in list"
              :key="item.agencyId"
              :companyInfo="item"
              :tabActive="tabActive"
            />
          </van-list>
        </div>
      </van-tab>
      <van-tab title="已通过" name="toResolve">
        <div class="company-list">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <company-item
              v-for="item in list"
              :key="item.agencyId"
              :companyInfo="item"
              :tabActive="tabActive"
            />
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  fetchApplyCompanyList,
  fetchAppliedRecords
} from "@/services/company.ts";
import { AppliedStatus } from "@/utils/const.ts";
import CompanyItem from "./component/CompanyItem.vue";
export default defineComponent({
  name: "Home",
  components: {
    CompanyItem
  },
  data() {
    return {
      searchValue: "",
      current: 0,
      size: 10,
      list: [] as object[],
      tabActive: "toApply",
      loading: false,
      finished: false
    };
  },
  methods: {
    async handleApply() {
      console.log(`处理申请`);
    },
    getCompanyStatus() {
      this.reloadList();
    },
    async getCompanyList() {
      console.log(`请求列表`);
      let res = null;
      if (this.tabActive === "toApply") {
        res = await fetchApplyCompanyList({
          size: this.size,
          current: this.current
        }).catch(err => {
          this.loading = false;
          this.finished = true;
          return Promise.reject(err);
        });
      } else {
        const auditStatus =
          this.tabActive === "toReject"
            ? AppliedStatus.reject
            : this.tabActive === "toResolve"
              ? AppliedStatus.resolve
              : AppliedStatus.deliver;
        res = await fetchAppliedRecords({
          size: this.size,
          current: this.current,
          auditStatus
        }).catch(err => {
          this.loading = false;
          this.finished = true;
          return Promise.reject(err);
        });
      }
      this.loading = false;
      if (
        this.size > res.data.records.length ||
        this.current * this.size >= res.data.total
      ) {
        this.finished = true;
      }
      this.list.push(...res.data.records);
    },
    async fetchApplyCompanyList() {
      const res = await fetchApplyCompanyList({
        current: this.current,
        size: this.size
      });
      console.log(res);
      this.list = res.data.records;
    },
    onLoad() {
      this.current += 1;
      this.getCompanyList();
    },
    onSearch() {
      console.log(`开启搜索`);
    },
    reloadList() {
      this.current = 0;
      this.finished = false;
      this.list = [];
    }
  }
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.gy-search {
  margin-left: 16px;
  margin-right: 16px;
}
.company-manage {
  width: 100%;
}
.company-list {
  width: 100%;
}
.company-item {
  display: flex;
  flex-direction: column;
  padding: 12px 12px 0 12px;
  margin: 8px 0;
  width: 100%;
  background-color: $contentBgColor;
  &__avatar {
    width: 94px;
    height: 94px;
  }
  &__info {
    display: flex;
    flex-direction: column;
    margin-left: 9px;
    width: 70%;
    &--name {
      color: #fff;
      text-align: left;
    }
    &--number {
      color: rgba(255, 255, 255, 0.4);
      font-size: 12px;
      line-height: 28px;
      text-align: left;
    }
    &--imgs {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: scroll;
      height: 45px;
      width: 100%;
      &::-webkit-scrollbar {
        display: none;
      }
      img {
        width: 45px;
        height: 45px;
        margin: 0 5px;
      }
    }
  }
  &__action {
    height: 66px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .van-button--plain {
      @include gy-btn-plain;
      height: 32px;
      border-radius: 22px;
    }
  }
}
</style>
