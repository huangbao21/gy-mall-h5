<template>
  <div class="goods-choose nav-bar">
    <van-nav-bar :border="false" @click-left="toView">
      <template #title>
        <div class="title" @click="showSheet = true">
          <span>{{ supplierTitle }}</span>
          <van-icon name="arrow-down" color="#fff" />
        </div>
      </template>
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
            type="agent"
            :good="good"
            v-for="(good, index) in list"
            :key="good.id"
            :underline="index !== list.length - 1"
            show-checkbox
            forceClickGood
            @click-good="viewGood"
            @update:good-checked="onChangeGoodCheck($event)"
            v-model:good-checked="good.checked"
          ></good-item>
        </van-list>
      </div>
    </div>
    <div class="footer-action">
      <span class="info">已选 {{ checkedNum }} 件商品</span>
      <van-checkbox
        v-model="allChecked"
        :checked-color="checkRadioColor"
        @change="onAllCheckedChange"
        >全选</van-checkbox
      >
      <van-button
        round
        plain
        type="primary"
        class="batch putaway"
        @click="handleGoodsStocks"
        >进货</van-button
      >
      <van-button round plain type="primary" class="batch soldout"
        >退货</van-button
      >
    </div>
    <van-action-sheet
      v-model:show="showSheet"
      :actions="supplierList"
      cancel-text="取消"
      class="gy-sheet"
      @select="changeSupplier"
      close-on-click-action
    />
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any  */
import { defineComponent, onMounted } from "vue";
import {
  fetchGoodsSelect,
  fetchCategoryList,
  fetchSupplierList,
  stockOrOutGoods,
} from "@/services/goods";
import usePropsCom from "@/composables/usePropsCom";
import useDropmenu from "@/composables/useDropmenu";
import GoodItem from "@/components/GoodItem.vue";
export default defineComponent({
  name: "GoodsChoose",
  components: {
    GoodItem,
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
      categoryOption,
    };
  },
  data() {
    return {
      searchValue: "",
      current: 0,
      size: 10,
      list: [] as object[],
      treeActiveId: 0,
      treeActiveIds: [] as number[],
      treeActiveIndex: 0,
      loading: false,
      finished: false,
      allChecked: false,
      showSheet: false,
      goodsValue: -1,
      categoryValue: -1,
      checkedNum: 0,
      sortValue: "-1",
      sortTitle: "",
      goodsTitle: "",
      categoryTitle: "",
      supplierList: [{ name: "所有企业", supplierId: -1 }],
      supplierId: -1,
      supplierTitle: "所有企业",
    };
  },
  mounted() {
    this.sortTitle = this.sortOption[0].text;
    this.goodsTitle = this.goodsOption[0].text;
    this.categoryTitle = this.categoryOption[0].text;
    this.getSupplierList();
  },
  methods: {
    toView() {
      this.$router.go(-1);
    },
    viewGood(good: any) {
      this.$router.push({
        path: "/agentGoodsShow",
        query: { goodId: good.id, operateType: "show" },
      });
    },
    async handleGoodsStocks(isTrue: number) {
      const idList: any[] = [];
      this.list.map((item: any) => {
        if (item.checked) idList.push(item.id);
      });
      if (idList.length === 0) {
        this.$toast("请选择商品");
        return;
      }
      await this.$dialog.confirm({
        message: `确定选择${isTrue ? "进货" : "退货"}所选商品`,
        className: "gy-dialog",
        confirmButtonText: `${isTrue ? "进货" : "退货"}`,
      });
      // await stockOrOutGoods({ isTrue, idList });
      
    },
    async getSupplierList() {
      const res = await fetchSupplierList();
      res.data.records.map((item: any) => {
        item.name = item.shopName;
      });
      this.supplierList.push(...res.data.records);
    },
    changeSupplier(item: any) {
      this.supplierId = item.supplierId;
      this.supplierTitle = item.name;
      this.reloadList();
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
      this.finished = false;
      this.list = [];
    },
    async getGoodsList() {
      const descOrders = this.sortValue === "-1" ? undefined : [this.sortValue];
      const status = this.goodsValue === -1 ? undefined : this.goodsValue;
      const categoryIds =
        this.categoryValue === -1 ? undefined : this.treeActiveIds;
      const supplierId = this.supplierId === -1 ? undefined : this.supplierId;
      const res = await fetchGoodsSelect({
        current: this.current,
        size: this.size,
        status,
        descOrders,
        categoryIds,
        name: this.searchValue,
        supplierId,
      }).catch((err) => {
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
    },
  },
});
</script>
<style lang="scss" scoped>
@import "./styles/style.scss";
@import "@/styles/base.scss";
.goods-choose {
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
  background-color: #1e183c;
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 7px;
  padding-bottom: 27px;
  justify-content: space-between;
  position: relative;
  .info {
    position: absolute;
    top: -28px;
    color: #fff;
    background-color: #1c1932;
    left: 0;
    right: 0;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
  }
  .van-button--primary {
    @include gy-btn-primary;
    width: 160px;
  }
  :deep(.van-checkbox__label) {
    color: #fff;
  }
  .van-button--plain {
    @include gy-btn-plain;
    &.batch {
      width: 106px;
      &.putaway {
        border-color: #ffb300;
        color: #ffb300;
      }
      &.soldout {
        border-color: #ea4a72;
        color: #ea4a72;
      }
    }
  }
}
</style>
