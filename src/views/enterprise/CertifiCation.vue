<template>
  <div class="certification nav-bar">
    <van-nav-bar
      title="填写资料"
      left-arrow
      :border="false"
      @click-left="toBackApp"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <main>
      <div class="content">
        <span>营业执照</span>
        <a @click="show = true">查看事例</a>
        <van-popup v-model:show="show">
          <h3>营业执照拍照示例</h3>
          <img src="../../assets/imgs/common/timg.jpeg" alt="" />
          <div class="content_regulations">
            <p>1.请保证营业执照的照片清晰无遮挡；</p>
            <p>
              2.请保证拍摄的营业执照照片内的文字内容清晰可辨；
              营业执照支持企业、个体户性质的营业执照。
            </p>
          </div>
          <div class="content_upload">
            <p @click="show = false">去上传</p>
          </div>
        </van-popup>
      </div>
      <div class="summary">
        <span
          >上传最新版三证合一的营业执照正面图，系统识别相关信息自动填充</span
        >
      </div>
      <!-- 上传 s  -->
      <div class="upload">
        <van-cell-group>
          <van-uploader
            v-model="fileList"
            :max-count="1"
            :after-read="afterRead"
            upload-text="点击上传"
          />
        </van-cell-group>
      </div>
      <!-- 上传 e  -->

      <!-- 主体类型 s -->
      <!-- <div class="content" v-if="enterprise.type"> -->
      <div class="content">
        <span>主体类型</span>
      </div>
      <div class="content-input">
        <van-field
          v-model="enterprise"
          rows="1"
          autosize
          type="text"
          placeholder="企业/个体户"
          :disabled="isDisabled"
        />
      </div>
      <!-- 主体类型 e  -->

      <!-- 企业名称 s  -->
      <div class="content">
        <span>企业名称</span>
      </div>
      <div class="content-input">
        <van-field
          v-model="enterprisename"
          rows="1"
          autosize
          type="text"
          placeholder="请输入企业名称"
          :disabled="isDisabled"
        />
      </div>
      <!-- 企业名称 e  -->

      <!-- 店铺名称 s  -->
      <div class="content">
        <span>店铺名称</span>
      </div>
      <div class="content-input">
        <van-field
          v-model="shopName"
          rows="1"
          autosize
          type="text"
          placeholder="请输入店铺名称"
          :disabled="isDisabled"
        />
      </div>
      <!-- 店铺名称 e  -->

      <!-- 统一社会信用代码 s  -->
      <div class="content">
        <span>统一社会信用代码</span>
      </div>
      <div class="content-input">
        <van-field
          v-model="unified"
          rows="1"
          autosize
          type="text"
          placeholder="请输入您的社会信用代码"
          :disabled="isDisabled"
        />
      </div>
      <!-- 统一社会信用代码 e  -->

      <!-- 有效期 s  -->
      <div class="content">
        <span>有效期</span>
      </div>
      <div class="content-input">
        <van-field
          v-model="period"
          rows="1"
          autosize
          type="text"
          placeholder="请输入您的有效期"
          :disabled="isDisabled"
        />
      </div>
      <div class="footer">
        <van-radio-group v-model="radio">
          <van-radio name="1" checked-color="#EA4A72" icon-size="14px">
          </van-radio>
        </van-radio-group>

        <span
          >同意并遵守<a href="#">《平台企业服务协议》</a>以及<a href="#"
            >《平台企业认证审核标准指引》</a
          >提交后即视为您理解并确认遵守行业准入规则
        </span>
      </div>
      <div class="footer-action">
        <van-button
          round
          type="primary"
          @click="toSubmit"
          :disabled="
            !enterprise || !enterprisename || !unified || !period || !shopName
          "
          >提交</van-button
        >
      </div>
    </main>
  </div>
</template>
<script lang="ts">
/*  eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent } from "vue";
import useBackAppApi from "@/composables/useBackAppApi";
import {
  discernQualification,
  saveQuqlification,
  modifyQualification,
  queryQualification,
} from "@/services/enterprise";
import { uploadFile } from "@/services/common";
import { Toast } from "vant";
export default defineComponent({
  name: "CertifiCation",
  setup() {
    const { toBackApp } = useBackAppApi();
    return {
      toBackApp,
    };
  },

  data() {
    return {
      enterprise: "",
      enterprisename: "",
      unified: "",
      period: "",
      radio: false,
      fileList: [] as any[],
      enterpriseInfo: {} as any,
      shopName: "",
      show: false,
      qualificationInfo: {} as any,
      isDisabled: true,
      imgData: {
        imgUrl: "",
        id: "",
      },
    };
  },
  mounted() {
    this.getQualificationInfo();
  },
  methods: {
    async getQualificationInfo() {
      const res = await queryQualification();
      this.qualificationInfo = res.data;
      if (this.qualificationInfo && !this.$route.query.id) {
        this.$router.replace("/auditResult");
      }
      if (this.$route.query.id) {
        this.setInputValue(this.qualificationInfo);
        this.imgData.imgUrl = this.qualificationInfo.licenseImageUrl;
        this.imgData.id = this.qualificationInfo.licenseImageId;
        this.fileList = [{ url: this.imgData.imgUrl, isImage: true }];
        this.isDisabled = false;
        this.enterpriseInfo = this.qualificationInfo;
      }
    },
    // 资质信息保存
    async toSubmit() {
      if (!this.radio) {
        return Toast("请勾选并同意服务协议");
      }
      this.enterpriseInfo.name = this.enterprisename;
      this.enterpriseInfo.validPeriod = this.period;
      this.enterpriseInfo.regNum = this.unified;
      this.enterpriseInfo.type = this.enterprise;
      this.enterpriseInfo.shopName = this.shopName;
      this.enterpriseInfo.licenseImageUrl = this.imgData.imgUrl;
      this.enterpriseInfo.licenseImageId = this.imgData.id;
      if (this.$route.query.id) {
        await modifyQualification(this.enterpriseInfo);
        this.$router.replace({ path: "/auditResult" });
      } else {
        // 访问保存的接口
        await saveQuqlification(this.enterpriseInfo);
        this.$router.replace({ path: "/auditResult" });
      }
    },
    // 修改资质信息
    afterRead(file: any) {
      const formData = new FormData();
      formData.append("file", file.file);
      this.uploadFile(formData);
    },
    async uploadFile(file: any) {
      const res = await uploadFile(file);
      const info = await discernQualification({
        param: res.data.fileUrl,
      }).catch((err) => {
        this.setInputValue({});
        return Promise.reject(err);
      });
      this.imgData.imgUrl = res.data.fileUrl;
      this.imgData.id = res.data.id;
      this.isDisabled = false;
      this.enterpriseInfo = info.data;
      this.setInputValue(info.data);
    },
    setInputValue(info: any) {
      this.enterprisename = info.name;
      this.period = info.validPeriod;
      this.unified = info.regNum;
      this.enterprise = info.type;
      this.shopName = info.shopName;
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.certification {
  min-height: 100%;
  background-color: $bgColor;
  color: #fff;
}
main {
  padding-left: 18px;
  padding-right: 18px;
  height: 900px;
}
.content {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
h3 {
  margin-top: 25px;
  font-size: 18px;
  font-weight: 400;
}
.content img {
  width: 105px;
  height: 140px;
  margin: 10px;
}
.content_regulations {
  width: 240px;
  height: 126px;
  margin: auto;
  p {
    text-align: left;
  }
}
.content_upload {
  width: 270px;
  height: 44px;
  margin-top: 28px;
  border-top: 1px solid #fff;
  p {
    margin-top: 10px;
    font-size: 16px;
    color: #00ffd2;
  }
}
span {
  font-size: 14px;
}
a {
  text-decoration: underline;
  font-size: 12px;
  color: #e55051;
}
.content {
  :deep .van-popup {
    background-color: #28244d;
  }
}
.summary {
  margin-top: 10px;
  span {
    font-size: 10px;
    display: block;
    color: #ccc;
    text-align: left;
  }
}
.upload {
  width: 105px;
  margin-top: 10px;
  border-radius: 4px;
  background: #1e183c;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
}
.van-uploader {
  :deep .van-uploader__preview-image {
    width: 105px;
    height: 140px;
  }
}
.van-cell-group {
  background-color: #1e183c;
}
.van-hairline--top-bottom::after {
  border-width: 0px;
}
.van-uploader {
  :deep .van-uploader__upload {
    margin: 0 0px 8px 0;
    background-color: #1e183c;
  }
}
.content-input {
  margin-top: 12px;
}
.van-cell {
  line-height: 30px;
  padding: 10px 15px;
  background-color: #1e183c;
}
.content-input .van-field {
  :deep(.van-field__control) {
    color: #fff;
  }
}
.footer {
  width: 335px;
  height: 28px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  span {
    font-size: 10px;
    margin-top: -2px;
  }
  a {
    text-decoration: none;
    color: #e55051;
  }
}
.footer-action {
  .van-button--primary {
    @include gy-btn-primary;
    width: 100%;
    margin-top: 15px;
  }
}
</style>
