<template>
  <div class="certification nav-bar">
    <van-nav-bar
      title="填写资料"
      left-arrow
      :border="false"
      @click-left="onClickLeft"
    >
      <template #left>
        <img
          class="leftIcon"
          src="./../../assets/imgs/earnMoney/icon-left.png"
        />
      </template>
    </van-nav-bar>
    <main>
      <div class="content">
        <span>营业执照</span>
        <!-- <p>查看事例</p> -->
        <a href="#">查看事例</a>
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
            preview-size="90px"
            :after-read="afterRead"
          />
        </van-cell-group>
        <span>点击上传</span>
      </div>
      <!-- 上传 e  -->

      <!-- 主体类型 s -->
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
        />
      </div>
      <!-- 企业名称 e  -->

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
        />
      </div>
      <!-- 有效期 e  -->
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
      <div style="margin-top: 16px" @click="toSubmit">
        <div :class="radio=='1'?'button activeBtn':'button'">
          <span>提交</span>
        </div>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
// import { Uploader } from 'vant';
import { findQuqlification, saveQuqlification } from "@/services/enterprise";
import { uploadFile } from "@/services/common";
import { Toast } from "vant";
export default defineComponent({
  name: "CertifiCation",
  data() {
    return {
      enterprise: "",
      enterprisename: "",
      unified: "",
      period: "",
      radio: false,
      fileList: [],
      // 图片识别的信息
      imgData: {},
    };
  },
  methods: {
    // 资质信息保存
    async toSubmit() {
      if (!this.radio) {
        return Toast("请勾选并同意服务协议");
      }
      // 访问保存的借口
      const res = await saveQuqlification(this.imgData);
      if (res.status === "000000") {
        this.$router.push("../enterprise/SubmitAudit");
      }
    },
    afterRead(file: any) {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file.file);
      this.uploadFile(formData);
    },
    async uploadFile(file: any) {
      const res = await uploadFile(file);
      const info = await findQuqlification({ param: res.data.fileUrl });
      if (info.status === "000000") {
        // 图片识别的信息存放
        this.imgData = info.data;
        this.enterprisename = info.data.name;
        this.period = info.data.validPeriod;
        this.unified = info.data.regNum;
        this.enterprise = info.data.type;
      }
    },
  },
});
</script>
<style lang= "scss" scoped>
@import "@/styles/base.scss";
.certification {
  min-height: 100%;
  background-color: $bgColor;
  color: #fff;
}
main {
  padding-left: 18px;
  padding-right: 18px;
  height: 800px;
}
.content {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
span {
  font-size: 14px;
}
a {
  text-decoration: underline;
  font-size: 12px;
  color: #e55051;
}
.summary {
  margin-top: 10px;
}
.summary span {
  font-size: 10px;
  color: #ccc;
}
.upload {
  width: 105px;
  height: 140px;
  margin-top: 10px;
  border-radius: 4px;
  background: #1e183c;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  span {
    width: 50px;
    height: 20px;
    display: block;
    margin-left: 27px;
    font-size: 12px;
  }
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
.button {
  width: 300px;
  height: 44px;
  border-radius: 22px;
  margin: auto;
  background: #09696a;
  span {
    line-height: 45px;
    font-size: 18px;
    font-weight: 500;
    color: #0d0420;
  }
}
.activeBtn {
  background-color: #00FFD2;
}
</style>
