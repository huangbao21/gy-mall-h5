<template>
  <div class="enterprise nav-bar">
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
        <p>查看事例</p>
      </div>
      <div class="summary">
        <span
          >上传最新版三证合一的营业执照正面图，系统识别相关信息自动填充</span
        >
      </div>
      <div class="upload">
         <van-cell-group>
        <van-uploader v-model="fileList" multiple />
         </van-cell-group>
      </div>
      <!-- 主体类型 s -->
      <div class="content">
        <span>主体类型</span>
      </div>
      <div class="soho">
        <van-cell-group>
          <van-field v-model="text" label="请输入" />
        </van-cell-group>
      </div>
      <!-- 主体类型 e  -->

      <!-- 企业名称 s  -->
      <div class="content">
        <span>企业名称</span>
      </div>
      <div class="soho">
        <van-cell-group>
          <van-field v-model="name" label="请输入" />
        </van-cell-group>
      </div>
      <!-- 企业名称 e  -->

      <!-- 统一社会信用代码 s  -->
      <div class="content">
        <span>统一社会信用代码</span>
      </div>
      <div class="soho">
        <van-cell-group>
          <van-field v-model="unified" label="请输入" />
        </van-cell-group>
      </div>
      <!-- 统一社会信用代码 e  -->

      <!-- 有效期 s  -->
      <div class="content">
        <span>有效期</span>
      </div>
      <div class="soho">
        <van-cell-group>
          <van-field v-model="validity" label="请输入" />
        </van-cell-group>
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
          >提交后即视为您理解并确认遵守行业准入规则</span
        >
      </div>
      <div style="margin-top: 16px">
        <div class="button">
          <span>提交</span>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filelist: [
        {
          url: "https://img.yzcdn.cn/vant/leaf.jpg",
        },
        {
          url: "https://cloud-image",
          isImage: true,
        },
      ],

      text: "",
      radio: "",
      name: "",
      unified: "",
      validity: "",
    };
  },
};
</script>
<style lang= "scss" scoped>
@import "@/styles/base.scss";
.enterprise {
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
p {
  text-decoration: underline;
  font-size: 12px;
  color: #e55051;
}
.summary {
  margin-top: 10px;
}
.summary span {
  white-space: nowrap;
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
}
.soho {
  width: 339px;
  height: 50px;
  margin-top: 12px;
  border-radius: 4px;
  background: #1e183c;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
}
.van-cell {
  background-color: #1e183c;
}
.soho .van-field {
  :deep .van-field__control {
    color: #fff;
  }
}
/* .soho .van-cell-group .van-field {
  :deep .van-field__control {
    color: #fff;
  }
} */
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
  /* .van-radio-group .van-radio {
    :deep .van-radio__icon {
      font-size: 14px;
    }
  } */
  a {
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
    width: 36px;
    height: 18px;
    line-height: 45px;
    font-size: 18px;
    font-weight: 500;
    color: #0d0420;
  }
}
</style>
