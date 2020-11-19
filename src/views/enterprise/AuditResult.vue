<template>
  <div class="audit-result nav-bar">
    <van-nav-bar
      :title="
        status === 0
          ? '待审核'
          : status === 1
          ? '审核通过'
          : status === 2
          ? '审核未通过'
          : ''
      "
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
        <img
          v-if="status === 0"
          src="../../assets/imgs/common/ic_not.png"
          alt=""
        />
        <img
          v-if="status === 1"
          src="../../assets/imgs/common/ic_pass.png"
          alt=""
        />
        <img
          v-if="status === 2"
          src="../../assets/imgs/common/ic_notpass.png"
          alt=""
        />
      </div>
      <span v-if="status === 0">企业认证信息已提交</span>
      <span v-if="status === 1">企业认证成功</span>
      <span v-if="status === 2">企业认证失败</span>

      <!-- 进度条 -->
      <div class="progress" v-if="status !== 0">
        <div class="round">
          <p></p>
          <p></p>
          <p v-if="status !== 2"></p>
          <p class="round_circular" v-if="status === 2">
            <i>x</i>
          </p>
        </div>
        <div class="progress_status">
          <p style="margin-left: -19px">提交资料</p>
          <p style="margin-left: 15px">后台审核</p>
          <p v-if="status === 1" style="margin-right: -20px">通过审核</p>
          <p v-if="status === 2" style="color: #ea4a72; margin-right: -25px">
            审核未通过
          </p>
        </div>
      </div>

      <div class="conditions">
        <p v-if="status === 0">请耐心等待1-2个工作日，我们会尽快为您审核</p>
        <p v-if="status === 2" style="margin-top: 50px">
          拒绝原因：营业执照已过期，请重新提交认证资料
        </p>
      </div>

      <div class="button" v-if="status === 0">
        <span @click="toBackApp">返回我的</span>
      </div>
      <div class="button" v-if="status === 2">
        <span @click="toResubmit">重新提交认证资料</span>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { queryQualification } from "@/services/enterprise";
import useBackAppApi from "@/composables/useBackAppApi";
export default defineComponent({
  name: "AuditResult",
  setup() {
    const { toBackApp } = useBackAppApi();
    return {
      toBackApp,
    };
  },
  data() {
    return {
      status: -1,
      title: "",
      id: -1,
    };
  },
  mounted() {
    this.getQualification();
  },
  methods: {
    async getQualification() {
      const info = await queryQualification();
      this.status = info.data?.status;
      this.id = info.data?.id;
    },
    toResubmit() {
      this.$router.replace({ path: "/certifiCation", query: { id: this.id } });
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";
.audit-result {
  min-height: 100%;
  background-color: $bgColor;
  color: #fff;
}
main {
  padding-left: 18px;
  padding-right: 18px;
}
.content {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
.content img {
  width: 80px;
}
span {
  font-size: 12px;
  line-height: 70px;
}
.conditions p {
  height: 50px;
  font-size: 12px;
}
.round {
  display: flex;
  justify-content: space-between;
}
.round p {
  width: 9px;
  height: 9px;
  border-radius: 5px;
  margin-top: -3px;
  background: #ffb300;
}
.round .round_circular {
  width: 15px;
  height: 15px;
  margin: -7px;
  border-radius: 10px;
  background: #ea4a72;
  i {
    font-style: normal;
    position: absolute;
    right: 44px;
    top: 272px;
  }
}
.progress {
  width: 280px;
  height: 2px;
  margin: auto;
  background-color: #ffb300;
  .progress_status {
    display: flex;
    justify-content: space-between;
    p {
      margin-top: 10px;
      font-size: 12px;
      display: inline-block;
      color: #ffb300;
    }
  }
}
.button {
  width: 300px;
  height: 44px;
  margin-top: 35px;
  border-radius: 22px;
  margin: auto;
  background: #00ffd2;
  span {
    line-height: 45px;
    font-size: 18px;
    font-weight: 500;
    color: #0d0420;
  }
}
</style>
