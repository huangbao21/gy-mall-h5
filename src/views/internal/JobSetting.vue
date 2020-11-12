<template>
  <div class="job-setting nav-bar">
    <van-nav-bar
      :title="type === 'add' ? '新增职位' : '编辑职位'"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="handleSave"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <div class="job-content">
      <div class="job-content-cell">
        <p class="input-label">职位名称</p>
        <div class="input-wrapper">
          <van-field
            v-model="jobInfo.name"
            rows="1"
            autosize
            placeholder="请输入职位名称"
          />
        </div>
      </div>
      <div class="job-content-cell">
        <p class="input-label">分佣比例</p>
        <div class="input-wrapper">
          <van-field
            v-model="jobInfo.ration"
            rows="1"
            type="number"
            autosize
            placeholder="请输入分佣比例"
          />
          <span class="input-sign">%</span>
        </div>
        <p class="input-tips">
          可配置分佣波比区间：0～100%
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Toast } from "vant";
import { addJob, updateJob } from "../../services/internal";
export default defineComponent({
  name: "CommissionSetting",
  data() {
    return {
      type: "add",
      jobInfo: {
        name: "",
        ration: "",
        customerRank: 0,
        id: 0
      }
    };
  },
  mounted() {
    if (this.$route.query.ration !== undefined) {
      this.jobInfo = { ...this.jobInfo, ...this.$route.query };
      console.log(this.jobInfo);
      this.type = "edit";
    }
  },
  methods: {
    async handleSave() {
      if (!this.jobInfo.name.length) {
        Toast(`请设置职位名称`);
        return;
      }
      if (!this.jobInfo.ration.length) {
        Toast(`请设置分佣比例`);
        return;
      }
      if (this.type === "add") {
        await addJob({
          name: this.jobInfo.name,
          ration: Number(this.jobInfo.ration)
        });
      } else if (this.type === "edit") {
        await updateJob({
          id: Number(this.jobInfo.id),
          name: this.jobInfo.name,
          ration: Number(this.jobInfo.ration),
          customerRank: Number(this.jobInfo.customerRank)
        });
      }
      this.$router.go(-1);
    },
    onClickLeft() {
      this.$dialog
        .confirm({
          message: "职位信息未保存，确认返回？",
          className: "gy-dialog"
        })
        .then(() => {
          this.$router.go(-1);
        });
    }
  }
});
</script>
<style lang="scss" scoped>
@import "../../styles/base";
.job-setting {
  height: 100%;
  .van-cell {
    @include gy-input;
    &::after {
      border: none;
    }
  }
  .job-content {
    padding: 0 20px;
    text-align: left;
    p {
      font-size: 14px;
      color: #fff;
    }
    .input-label {
      padding: 12px 0;
    }
    .input-wrapper {
      display: flex;
      .input-sign {
        padding: 0 10px;
        line-height: 44px;
        color: #fff;
      }
    }
    .input-tips {
      color: rgba(255, 255, 255, 0.4);
      padding-top: 12px;
    }
    .rights-tips {
      margin-top: 42px;
      &-title {
        padding: 11px 0;
      }
    }
  }
}
</style>
