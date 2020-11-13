<template>
  <div class="company-manage nav-bar">
    <van-nav-bar title="企业主管理" :border="false" @click-left="onClickLeft">
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
      ref="tabsRef"
    >
      <van-tab title="可申请" name="toApply">
        <div class="company-list">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <company-item
              v-for="item in list"
              :key="item.agencyId"
              :companyInfo="item"
              :activeName="tabActive"
              @apply="handleApply(item)"
              @click-company="viewCompanyGoods(item)"
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
              :activeName="tabActive"
              @click-company="viewCompanyGoods(item)"
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
              :activeName="tabActive"
              @click-company="viewCompanyGoods(item)"
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
              :activeName="tabActive"
              @click-company="toAgentGoodsManage(item.agencyId)"
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
  fetchAppliedRecords,
  applyAgency
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
  beforeRouteEnter(to, from, next) {
    if (to.query.from !== undefined) {
      next((vm: any) => {
        vm.tabActive = "toDeliver";
        vm.scrollToDeliver();
      });
    } else {
      next();
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    viewCompanyGoods(companyItem: any) {
      this.$router.push({
        path: "/companyShop",
        query: {
          agencyId: companyItem.agencyId,
          shopName: companyItem.shopName
        }
      });
    },
    scrollToDeliver() {
      (this.$refs.tabsRef as any).scrollTo("toDeliver");
    },
    async handleApply(companyItem: any) {
      console.log(this.tabActive);
      await applyAgency({ id: companyItem.agencyId });
      this.scrollToDeliver();
    },
    getCompanyStatus() {
      console.log(`tabActive`, this.tabActive);
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
    },
    toAgentGoodsManage(supplierId: number) {
      this.$router.push({ path: "/agentGoodsManage", query: { supplierId } });
    }
  }
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.company-manage {
  height: 100%;
}
.gy-search {
  margin-left: 16px;
  margin-right: 16px;
}
.company-manage {
  width: 100%;
}
.company-list {
  /*   display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 154);
  overflow-y: scroll; */
}
</style>
