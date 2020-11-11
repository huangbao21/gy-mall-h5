<template>
  <div class="goods-manage nav-bar">
    <van-nav-bar :border="false" @click-left="toView" :title="shopName">
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
    <van-dropdown-menu>
      <van-dropdown-item
        :title="sortTitle"
        v-model="sortValue"
        ref="sortDropRef"
        class="active"
      >
        <div class="dropdown-panel">
          <div
            class="cell"
            v-for="cell in sortOption"
            :key="cell.value"
            @click="changeDropdownValue(cell, 'sort')"
          >
            <span :class="{ active: sortValue == cell.value }">{{
              cell.text
            }}</span>
          </div>
        </div>
      </van-dropdown-item>
      <van-dropdown-item
        v-model="goodsValue"
        :title="goodsTitle"
        ref="goodsDropRef"
      >
        <div class="dropdown-panel">
          <div
            class="cell"
            v-for="cell in goodsOption"
            :key="cell.value"
            @click="changeDropdownValue(cell, 'goods')"
          >
            <span :class="{ active: goodsValue == cell.value }">{{
              cell.text
            }}</span>
          </div>
        </div>
      </van-dropdown-item>
      <van-dropdown-item
        v-model="categoryValue"
        :title="categoryTitle"
        ref="categoryDropRef"
      >
        <div class="dropdown-panel category">
          <div class="cell__parent">
            <div
              class="cell"
              v-for="(cell, index) in categoryOption"
              :key="cell.value"
              @click="changeDropdownValue(cell, 'category', index)"
            >
              <span :class="{ active: categoryValue == cell.value }">{{
                cell.text
              }}</span>
            </div>
          </div>
          <div class="cell__children" v-if="categoryValue != -1">
            <span
              v-for="child in categoryOption[treeActiveIndex].children"
              :key="child.id"
              @click="changeDropdownValue(child, 'categoryChild')"
              :class="{ active: treeActiveId == child.value }"
              >{{ child.text }}</span
            >
          </div>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
    <div class="cards-wrapper">
      <div class="cards">
        <van-list v-model:loading="loading" :finished="finished" @load="onLoad">
          <good-item
            :good="good"
            :ref="setGoodItemRef"
            v-for="(good, index) in list"
            :key="good.id"
            :underline="index !== list.length - 1"
            :show-checkbox="batchAction"
            @click-good="viewGood"
            @update:good-checked="onChangeGoodCheck($event)"
            v-model:good-checked="good.checked"
          ></good-item>
        </van-list>
      </div>
    </div>

    <div class="footer-action">
      <van-button type="primary" @click="handleApply"
        >申请成为代理商</van-button
      >
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineComponent, onMounted } from "vue";
import {
  allGoodsOnDown,
  batchGoodsOnDown,
  delGood,
  fetchCategoryList
} from "@/services/goods";
import { fetchCompanyGoodsListOnline, applyAgency } from "@/services/company";
import usePropsCom from "@/composables/usePropsCom";
import useDropmenu from "@/composables/useDropmenu";
import GoodItem from "@/components/GoodItem.vue";
export default defineComponent({
  name: "GoodsManage",
  components: {
    GoodItem
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.agencyId !== undefined) {
      next((vm: any) => {
        vm.agencyId = to.query.agencyId;
        vm.shopName = to.query.shopName;
      });
    } else {
      next();
    }
  },
  setup() {
    const { checkRadioColor } = usePropsCom();
    const { sortOption, goodsOption, categoryOption } = useDropmenu();
    const getCategoryList = async () => {
      const res = await fetchCategoryList();
      const temp = res.data.map((item: any) => {
        item.value = item.id;
        if (item.children) {
          item.children.map((child: any) => {
            child.value = child.id;
          });
          item.children.unshift({ text: "全部", value: -1 });
        }

        return item;
      });
      categoryOption.value.push(...temp);
    };
    onMounted(getCategoryList);
    return {
      checkRadioColor,
      sortOption,
      goodsOption,
      categoryOption
    };
  },
  data() {
    return {
      shopName: "",
      agencyId: 0,
      goodItemRefs: [] as any,
      searchValue: "",
      active: 0,
      current: 0,
      size: 10,
      list: [] as object[],
      treeActiveId: 0,
      treeActiveIds: [] as number[],
      treeActiveIndex: 0,
      loading: false,
      finished: false,
      allChecked: false,
      showActionPanel: true,
      batchAction: false,
      sortValue: "-1",
      goodsValue: -1,
      categoryValue: -1,
      checkedNum: 0,
      sortTitle: "",
      goodsTitle: "",
      categoryTitle: ""
    };
  },
  mounted() {
    this.sortTitle = this.sortOption[0].text;
    this.goodsTitle = this.goodsOption[0].text;
    this.categoryTitle = this.categoryOption[0].text;
  },
  methods: {
    async handleApply() {
      await applyAgency({ id: this.agencyId });
      this.$router.replace({ path: "/applyTransition" });
    },
    toView() {
      this.$router.go(-1);
    },
    viewGood(good: any) {
      this.$router.push({
        path: "/customerGoodsShow",
        query: { goodId: good.id, operateType: "show", agencyId: this.agencyId }
      });
    },
    setGoodItemRef(el: any) {
      this.goodItemRefs.push(el);
    },
    async goodActionEvent(name: string, item: any, index: number) {
      // edit putaway soldout del
      switch (name) {
        case "edit":
          this.$router.push({
            path: "/goodsAdd",
            query: { goodId: item.id, operateType: "edit" }
          });
          break;
        case "putaway":
          await this.$dialog.confirm({
            message: "确定上架该商品?",
            confirmButtonText: "上架",
            className: "gy-dialog"
          });
          await batchGoodsOnDown({ isTrue: 1, idList: [item.id] });
          item.status = 1;
          this.goodItemRefs[index].actionEvent("close");
          break;
        case "soldout":
          await this.$dialog.confirm({
            message: "确定下架该商品?",
            confirmButtonText: "下架",
            className: "gy-dialog"
          });
          await batchGoodsOnDown({ isTrue: 0, idList: [item.id] });
          item.status = 3;
          this.goodItemRefs[index].actionEvent("close");
          break;
        case "del":
          await this.$dialog.confirm({
            message: "确定删除该商品？",
            confirmButtonText: "删除",
            className: "gy-dialog"
          });
          await delGood({ id: item.id });
          this.goodItemRefs[index].actionEvent("close");
          this.list.splice(index, 1);

          break;
      }
    },
    async goodsOnorDown(isTrue: number, batch?: boolean) {
      if (batch) {
        const idList: any[] = [];
        this.list.map((item: any) => {
          if (item.checked) idList.push(item.id);
        });
        if (idList.length === 0) {
          this.$toast("请选择商品");
          return;
        }
        await this.$dialog.confirm({
          message: `确定批量${isTrue ? "上架" : "下架"}已选择 ${
            idList.length
          } 种商品`,
          className: "gy-dialog",
          confirmButtonText: `${isTrue ? "上架" : "下架"}`
        });
        await batchGoodsOnDown({ isTrue, idList });
        this.reloadList();
      } else {
        await this.$dialog.confirm({
          message: `确定全部${isTrue ? "上架" : "下架"}商品`,
          className: "gy-dialog",
          confirmButtonText: `${isTrue ? "上架" : "下架"}`
        });
        await allGoodsOnDown({ isTrue });
        this.reloadList();
      }
    },
    onChangeGoodCheck(checked: boolean) {
      if (checked) {
        this.checkedNum += 1;
      } else {
        this.checkedNum -= 1;
      }
    },
    onAllCheckedChange(checked: boolean) {
      if (checked) {
        this.list.forEach((item: any) => {
          item.checked = true;
        });
      } else {
        this.list.forEach((item: any) => {
          item.checked = false;
        });
      }
    },

    onClickRight() {
      if (this.batchAction) {
        this.batchAction = false;
      } else {
        this.$router.push("/goodsAdd");
      }
    },
    onLoad() {
      this.current += 1;
      this.getGoodsList();
    },
    onSearch() {
      this.reloadList();
    },
    async changeDropdownValue(
      cell: { text: string; value: string | number },
      el?: string,
      treeIndex = 0
    ) {
      if (el === "sort") {
        this.sortValue = String(cell.value);
        this.sortTitle = cell.text;
        (this.$refs as any).sortDropRef.toggle();
      } else if (el === "goods") {
        this.goodsValue = Number(cell.value);
        this.goodsTitle = cell.text;
        (this.$refs as any).goodsDropRef.toggle();
      } else if (el === "category") {
        this.categoryValue = Number(cell.value);
        this.categoryTitle = cell.text;
        if (this.categoryValue !== -1) {
          this.treeActiveIndex = treeIndex;
          return;
        }
        (this.$refs as any).categoryDropRef.toggle();
      } else if (el === "categoryChild") {
        this.treeActiveId = Number(cell.value);
        if (cell.value !== -1) {
          this.treeActiveIds = [Number(cell.value)];
          this.categoryTitle = cell.text;
        } else {
          this.treeActiveIds = [];
          const pcategory: any = this.categoryOption[this.treeActiveIndex];
          pcategory.children.map((item: any) => {
            item.id && this.treeActiveIds.push(item.id);
          });
          this.categoryTitle = pcategory.text;
        }
        (this.$refs as any).categoryDropRef.toggle();
      }
      this.reloadList();
    },
    reloadList() {
      this.current = 0;
      this.batchAction = false;
      this.finished = false;
      this.list = [];
    },
    async getGoodsList() {
      const descOrders = this.sortValue === "-1" ? undefined : [this.sortValue];
      const categoryIds =
        this.categoryValue === -1 ? undefined : this.treeActiveIds;
      const res = await fetchCompanyGoodsListOnline({
        agencyId: this.agencyId,
        current: this.current,
        size: this.size,
        descOrders,
        categoryIds,
        name: this.searchValue
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
        this.finished = true;
      }
      res.data.records.map((record: any) => {
        record.checked = false;
      });
      this.list.push(...res.data.records);
    }
  }
});
</script>
<style lang="scss" scoped>
@import "./styles/style.scss";
@import "@/styles/base.scss";
.goods-manage {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.gy-search {
  margin-left: 16px;
  margin-right: 16px;
}
.cards-wrapper {
  padding-bottom: 50px;
  flex: 1;
  overflow-y: scroll;
}
.cards {
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 16px;
  background-color: $contentBgColor;
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
</style>
