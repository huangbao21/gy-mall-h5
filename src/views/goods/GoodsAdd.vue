<template>
  <div class="goods-add-page nav-bar">
    <van-nav-bar
      title="新增商品"
      right-text="完成"
      left-arrow
      @click-right="onClickRight"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>

    <div class="goods-add-content-wrapper">
      <div class="goods-cover-wrapper">
        <div class="goods-cover-preview">
          <van-uploader :after-read="afterRead" v-if="coverImgList.length == 0">
            <div class="goods-upload-photo-wrapper">
              <van-icon name="photo" size="40" />
              <p class="van-uploader-text">添加商品封面</p>
            </div>
          </van-uploader>
          <van-image
            width="375"
            height="375"
            :src="
              coverImgList[currentCoverIndex].fileUrl
                ? coverImgList[currentCoverIndex].fileUrl
                : ''
            "
          />
        </div>
        <div class="goods-img-operate-area" v-if="coverImgList.length > 0">
          <van-uploader
            v-if="coverImgList.length != maxCount"
            :after-read="afterRead"
          >
            <van-button icon="plus"></van-button>
          </van-uploader>
          <div class="goods-img-list">
            <div
              class="goods-img-item"
              v-for="(item, i) in coverImgList"
              :key="item.id"
            >
              <van-image
                class="goods-img-sm-preview"
                width="48"
                height="48"
                :src="item.fileUrl"
                @click="handleItemClick(i)"
              >
                <van-image
                  class="goods-img-preview-delete"
                  :src="require('./../../assets/imgs/common/icon-close.png')"
                  @click="deleteImgFromList(i)"
              /></van-image>
            </div>
          </div>
        </div>
      </div>
      <van-field
        class="goods-title"
        v-model="goodsTitle"
        rows="2"
        type="textarea"
        maxlength="40"
        placeholder="请输入商品名称(最多40个字)"
        show-word-limit
      />
      <div class="goods-cells-edit">
        <van-cell title="商品类目" is-link @click="handleCategoryClick" />
        <van-cell title="价格/分佣/库存" is-link @click="handleSkuClick" />
        <van-cell class="goods-express" title="运费" value="免邮" />
      </div>
      <div class="goods-detail-img-wrapper">
        <div class="goods-detail-img-plus" v-if="detailImgList.length == 0">
          <van-uploader style="width: 375px" :after-read="detailAfterRead">
            <van-icon name="plus" />
            <span>添加详情图</span>
          </van-uploader>
        </div>
        <div class="goods-img-operate-area" v-if="detailImgList.length > 0">
          <van-uploader :after-read="detailAfterRead">
            <van-button icon="plus"></van-button>
          </van-uploader>
          <div class="goods-img-list">
            <div
              class="goods-img-item"
              v-for="(item, i) in detailImgList"
              :key="item"
            >
              <van-image
                class="goods-img-sm-preview"
                width="48"
                height="48"
                :src="item"
              >
                <van-image
                  class="goods-img-preview-delete"
                  :src="require('./../../assets/imgs/common/icon-close.png')"
                  @click="deleteDetailImgFromList(i)"
              /></van-image>
            </div>
          </div>
        </div>
        <div class="goods-detail-img-list">
          <div
            class="goods-detail-img-item"
            v-for="item in detailImgList"
            :key="item"
          >
            <van-image width="375" :src="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Toast } from "vant";
import { fetchCategoryList } from "@/services/goods";
import { uploadFile } from "@/services/common";
export default defineComponent({
  name: "GoodsAdd",
  data() {
    return {
      coverImgList: [
        {
          id: 1,
          mainStatus: 1,
          fileUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
        },
        {
          id: 2,
          mainStatus: 0,
          fileUrl: "https://img.yzcdn.cn/vant/cat.jpeg",
        },
      ],
      detailImgList: [
        "https://img.yzcdn.cn/vant/cat.jpeg",
        "https://img.yzcdn.cn/vant/cat.jpeg",
      ],
      currentCoverIndex: 0,
      fileList: [],
      maxCount: 6,
      goodsTitle: "",
    };
  },
  mounted() {
    this.fetchCategoryList();
  },
  methods: {
    onClickRight() {
      Toast("按钮");
    },
    handleItemClick(index: number) {
      this.currentCoverIndex = index;
    },
    deleteImgFromList(index: number) {
      console.log(index);
      this.coverImgList.splice(index, 1);
      this.currentCoverIndex = 0;
    },
    afterRead(file: any) {
      console.log(file);
      this.coverImgList.push(file.content);
      this.currentCoverIndex = this.coverImgList.length - 1;
      const formData = new FormData();
      formData.append("file", file.file);
      this.uploadFile(formData);
    },
    handleCategoryClick() {
      this.$router.replace({ path: "/goodsCategory" });
    },
    handleSkuClick() {
      this.$router.replace({ path: "/goodsSKU" });
    },
    detailAfterRead(file: any) {
      this.detailImgList.push(file.content);
    },
    deleteDetailImgFromList(index: number) {
      this.detailImgList.splice(index, 1);
    },
    async fetchCategoryList() {
      const res = await fetchCategoryList();
      console.log(res);
    },
    async uploadFile(file: FormData) {
      const res = await uploadFile(file);
      console.log(res);
    },
  },
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
  background-color: #1e183c;
  .van-uploader {
    width: 375px;
    height: 375px;
    :deep(.van-uploader__input-wrapper) {
      width: 375px;
      height: 375px;
    }
    .goods-upload-photo-wrapper {
      position: relative;
      top: 120px;
      color: #fff;
    }
  }
}
.goods-img-operate-area {
  width: 100%;
  padding: 0 0 0 14px;
  display: flex;
  background-color: #1e183c;
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
  background-color: #0f0525;
  :deep(.van-field__word-limit) {
    margin-top: 0;
  }
}
.van-cell {
  &::after {
    border: none;
  }
}
.goods-cells-edit {
  .goods-express {
    margin: 16px 0;
  }
  .van-cell {
    background-color: #1e183c;
    letter-spacing: 4px;
    height: 50px;
    :deep(.van-cell__title) {
      text-align: left;
      color: #fff;
    }
  }
}
.goods-detail-img-wrapper {
  .goods-detail-img-plus {
    :deep(.van-uploader__input-wrapper) {
      width: 375px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #1e183c;
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
