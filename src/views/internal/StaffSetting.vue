<template>
  <div class="staff-setting nav-bar">
    <van-nav-bar
      :title="type==='add'?'新增员工':'编辑员工'"
      right-text="完成"
      left-arrow
      @click-left="onClickLeft"
      @click-right="handleCommissionSave"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <div class="staff-content">
      <div class="staff-content-cell" v-if="type === 'add'">
        <p class="input-label">手机号</p>
        <div class="input-wrapper">
          <van-field
            v-model="mobile"
            rows="1"
            type="number"
            autosize
            placeholder="请输入手机号"
            @blur="handleSalesInputBlur"
          />
        </div>
      </div>
      <div class="staff-content-cell">
        <p class="input-label">职位</p>
        <div class="input-wrapper">
          <van-field
            v-model="jobTitle"
            right-icon="arrow"
            placeholder="请选择职位"
            @click="showPicker = true"
          />
        </div>
      </div>
      <div class="rights-tips">
        <p class="rights-tips-title">人员说明</p>
        <p class="rights-tips-content">
          代理商需与该人员签订正式劳动合同，平台不承担任何法律风险
        </p>
      </div>
      <van-popup v-model:show="showPicker" position="bottom" round>
        <van-picker
          :columns="jobColumns"
          @cancel="showPicker = false"
          @confirm="changeJobTitle"
          class="gy-picker"
        />
      </van-popup>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Toast } from "vant";
import { addStaff, updateStaff, fetchJobList } from "../../services/internal";
export default defineComponent({
  name: "CommissionSetting",
  data() {
    return {
      ration: "",
      mobile: "",
      rank: -1,
      type: "add",
      jobTitle: "",
      showPicker: false,
      jobColumns: [] as object[],
      userId: -1
    };
  },
  mounted() {
    if (this.$route.query.userId !== undefined) {
      this.userId = Number(this.$route.query.userId);
      this.type = "edit";
    }
    this.fetchJobList();
  },
  methods: {
    async fetchJobList() {
      const res = await fetchJobList();
      const jobsTitle = res.data.map((item: any) => {
        return { text: item.name, rank: item.customerRank };
      });
      this.jobColumns.push(...jobsTitle);
    },
    changeJobTitle(value: { text: string; rank: number }) {
      this.jobTitle = value.text;
      this.rank = value.rank;
      this.showPicker = false;
    },
    async handleCommissionSave() {
      if (!this.mobile.length) {
        Toast(`请设置手机号`);
        return;
      }
      if (!this.jobTitle.length) {
        Toast(`请设置职位`);
        return;
      }
      if (this.type === "add") {
        await addStaff({ mobile: this.mobile, rank: this.rank });
      } else if (this.type === "edit") {
        await updateStaff({ id: this.userId, param: this.rank + "" });
      }
      this.$router.go(-1);
    },
    onClickLeft() {
      this.$dialog
        .confirm({
          message: "员工信息未保存，确认返回？",
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
.staff-setting {
  height: 100%;
  .van-cell {
    @include gy-input;
    &::after {
      border: none;
    }
  }
  .staff-content {
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
