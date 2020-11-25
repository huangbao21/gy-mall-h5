<template>
  <div class="goods-add-page nav-bar">
    <van-nav-bar title="商品展示" left-arrow @click-left="onClickLeft">
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>

    <div class="goods-add-content-wrapper">
      <div class="goods-cover-wrapper">
        <div class="goods-cover-preview">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="item in goodsInfo.bannerList" :key="item.id">
              <img :src="item.fileUrl" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <van-field
        class="goods-title"
        v-model="goodsInfo.name"
        rows="2"
        type="textarea"
        placeholder="请输入商品名称(最多40个字)"
        show-word-limit
        readonly
      />
      <div class="goods-price-info" v-if="goodsInfo.productSkuList[0].price">
        <van-cell>
          <van-col class="goods-price" span="7"
            >¥
            <span class="goods-price-digit">{{
              goodsInfo.productSkuList[0].price
            }}</span></van-col
          >
          <van-col class="goods-profit" span="7"
            ><span class="goods-profit-triangle"></span>分佣¥{{
              goodsInfo.productSkuList[0].profit
            }}</van-col
          >
        </van-cell>
        <van-cell class="goods-origin-wrapper">
          <van-col class="goods-origin-price" span="14"
            >淘宝价：¥{{ goodsInfo.productSkuList[0].retailPrice }}</van-col
          >
          <van-col span="10" style="text-align: right"
            >库存{{ goodsInfo.productSkuList[0].storeNumber }}件</van-col
          >
        </van-cell>
      </div>
      <div class="goods-cells-edit">
        <van-cell title="商品类目" is-link :value="goodsInfo.categoryText" />
        <van-cell title="价格/分佣/库存" is-link />
        <van-cell class="goods-express" title="运费" value="免邮" />
      </div>
      <div class="goods-detail-img-wrapper">
        <div class="goods-detail-img-list">
          <div
            class="goods-detail-img-item"
            v-for="item in goodsInfo.productInfoList"
            :key="item.id"
          >
            <van-image width="375" :src="item.fileUrl" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Toast } from "vant";
import { uploadFile } from "@/services/common";
import { saveGoods, fetchAgentGoodDetail } from "@/services/goods";
export default defineComponent({
  name: "agentGoodsShow",
  data() {
    return {
      goodsInfo: {
        bannerList: [] as object[],
        productInfoList: [] as object[],
        name: "",
        categoryId: -1,
        categoryText: "",
        activeIndex: 0,
        productSkuList: [
          {
            id: 0,
            idList: [0],
            param: "string",
            price: "",
            profit: "",
            retailPrice: "",
            sign: "string",
            skuJson: "string",
            storeNumber: ""
          }
        ] as object[]
      },
      currentCoverIndex: 0,
      maxCount: 6,
      operateType: "show",
      goodId: 0
    };
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.goodId !== undefined) {
      next((vm: any) => {
        console.log(11);
        vm.operateType = to.query.operateType;
        vm.goodId = to.query.goodId;
      });
    } else {
      next();
    }
  },
  created() {
    const tempGoodsInfo = localStorage.getItem("tempGoodsInfo");
    if (tempGoodsInfo) {
      this.goodsInfo = JSON.parse(tempGoodsInfo);
    }
  },
  mounted() {
    this.fetchAgentGoodDetail();
  },
  methods: {
    async fetchAgentGoodDetail() {
      console.log(this.goodId);
      const res = await fetchAgentGoodDetail({ id: this.goodId });
      res.data.categoryText = res.data.categoryName;
      this.goodsInfo = { ...this.goodsInfo, ...res.data };
    },
    handleItemClick(index: number) {
      this.currentCoverIndex = index;
    },
    deleteImgFromList(index: number) {
      console.log(index);
      this.goodsInfo.bannerList.splice(index, 1);
      this.currentCoverIndex = 0;
    },
    async afterRead(file: any) {
      const formData = new FormData();
      formData.append("file", file.file);
      const res = await uploadFile(formData);
      const len = this.goodsInfo.bannerList.length;
      this.goodsInfo.bannerList.push({
        id: res.data.id,
        fileUrl: res.data.fileUrl,
        mainStatus: len === 0 ? 1 : 0
      });
      this.currentCoverIndex = this.goodsInfo.bannerList.length - 1;
    },
    saveTempData() {
      localStorage.setItem("tempGoodsInfo", JSON.stringify(this.goodsInfo));
    },
    clearTempData() {
      localStorage.setItem("tempGoodsInfo", "");
    },
    async detailAfterRead(file: any) {
      const formData = new FormData();
      formData.append("file", file.file);
      const res = await uploadFile(formData);
      const len = this.goodsInfo.productInfoList.length;
      this.goodsInfo.productInfoList.push({
        id: res.data.id,
        fileUrl: res.data.fileUrl,
        sort: 0
      });
    },
    deleteDetailImgFromList(index: number) {
      this.goodsInfo.productInfoList.splice(index, 1);
    },
    async onSave() {
      const len = this.goodsInfo.productInfoList.length;
      for (let i = 0; i < len; i++) {
        (this.goodsInfo.productInfoList[i] as any).sort = i;
      }
      await saveGoods({
        ...this.goodsInfo
      });
      this.clearTempData();
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
});
</script>
<style lang="scss" scoped>
@import "../../styles/base";
.goods-add-page {
  height: 100%;
}
.goods-add-content-wrapper {
  height: calc(100% - 30px);
  background-color: $bgColor;
  overflow-x: hidden;
  overflow-y: scroll;
}
.goods-cover-preview {
  background-color: $contentBgColor;
  img {
    width: 375px;
    height: 375px;
  }
}
.goods-img-operate-area {
  width: 100%;
  padding: 0 0 0 14px;
  display: flex;
  background-color: $contentBgColor;
  height: 76px;
  align-items: center;
  .van-uploader {
    :deep(.van-uploader__wrapper) {
      padding: 0 10px 0 0;
    }
  }
  .goods-img-list {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    width: 100%;
    padding: 12px;
    &::-webkit-scrollbar {
      display: none;
    }
    .goods-img-item {
      padding: 0 16px 0 0;
      display: flex;
      align-items: center;
      .goods-img-sm-preview {
        position: relative;
        .goods-img-preview-delete {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 16px;
          img {
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }
}
.goods-title {
  height: 84px;
  @include gy-input;
  :deep(.van-field__word-limit) {
    margin-top: 0;
  }
  :deep(.van-field__control) {
    color: #fff;
  }
}
.van-cell {
  &::after {
    border: none;
  }
}
.goods-price-info {
  background-color: $contentBgColor;
  :deep(.van-cell__value) {
    display: flex;
  }
  .goods-price {
    color: #ea4a72;
    &-digit {
      font-size: 24px;
      font-weight: bold;
    }
  }
  .goods-profit {
    position: relative;
    color: #ea4a72;
    width: 82px;
    height: 22px;
    background: linear-gradient(90deg, #ffccd2 0%, #ffccd2 100%);
    border-radius: 2px;
    text-align: center;
    .goods-profit-triangle:before {
      content: "";
      position: absolute;
      width: 0px;
      height: 0px;
      left: -21px;
      border: 11px solid transparent;
      border-right-color: #ffccd2;
      font-size: 0;
    }
  }
  .goods-origin-wrapper {
    :deep(.van-cell__value) {
      color: rgba(255, 255, 255, 0.4);
    }
  }
  .goods-origin-price {
    text-decoration: line-through;
  }
  .van-cell {
    background-color: $contentBgColor;
  }
}
.goods-cells-edit {
  .goods-express {
    margin: 16px 0;
  }
  .van-cell {
    background-color: $contentBgColor;
    letter-spacing: 1px;
    height: 50px;
    :deep(.van-cell__title) {
      text-align: left;
      color: #fff;
    }
  }
}
.goods-detail-img-wrapper {
  padding-bottom: 40px;
  .goods-detail-img-plus {
    :deep(.van-uploader__input-wrapper) {
      width: 375px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $contentBgColor;
      color: #fff;
    }
  }
  .goods-detail-img-list {
    .van-image {
      vertical-align: top;
    }
  }
}
</style>
