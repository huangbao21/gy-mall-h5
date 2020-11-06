 <template>
  <div class="system-management nav-bar">
    <van-nav-bar
      title="体系管理"
      right-text="保存"
      left-arrow
      :border="false"
      @click-left="onClickLeft"
      @click-right="handleSave"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <van-tabs v-model:active="activeIndex" class="gy-tabs">
      <van-tab title="门槛设置">
       <!--  <van-dropdown-menu>
          <van-dropdown-item
            v-model="value"
            :options="actions"
            @change="handleValueChange"
          />
        </van-dropdown-menu> -->
        <van-cell
          is-link
          :title="valueToName"
          @click="show = true"
          arrow-direction="down"
          class="select-item"
        />
        <van-action-sheet
          v-model:show="show"
          :actions="actions"
          @select="onSelect"
        />
        <div class="condition-content">
          <div
            class="input-wrapper"
            v-if="this.actions.length && value === this.actions[1].value"
          >
            <van-field
              v-model="consumeNumber"
              rows="1"
              type="number"
              autosize
              placeholder="请输入消费金额"
              @blur="handleSalesInputBlur"
            />
            <span class="input-sign">元</span>
          </div>
          <div
            class="input-wrapper"
            v-if="this.actions.length && value === this.actions[0].value"
          >
            <van-field
              v-model="consumeTime"
              rows="1"
              type="number"
              autosize
              placeholder="请输入消费次数"
              @blur="handleSalesInputBlur"
            />
            <span class="input-sign">次</span>
          </div>
          <van-field
            v-if="this.actions.length && value === this.actions[2].value"
            v-model="goodsTitle"
            right-icon="arrow"
            placeholder="显示图标"
            @click="handleGoodsSelect"
          />
        </div>
      </van-tab>
      <van-tab title="波比设置">
        <div class="ration-content">
          <div class="ration-content-cell">
            <p class="input-label">内部员工波比</p>
            <div class="input-wrapper">
              <van-field
                v-model="staffRatio"
                rows="1"
                type="number"
                autosize
                placeholder="请输入内部员工波比"
                @blur="handleStaffInputBlur"
              />
              <span class="input-sign">%</span>
            </div>
            <p class="input-tips">
              可配置内部波比区间:{{ staffRatioMin }}~{{ staffRatioMax }}%
            </p>
          </div>
          <div class="ration-content-cell">
            <p class="input-label">分销商波比</p>
            <div class="input-wrapper">
              <van-field
                v-model="agencyRatio"
                rows="1"
                type="number"
                autosize
                placeholder="请输入分销商波比"
                @blur="handleAgencyInputBlur"
              />
              <span class="input-sign">%</span>
            </div>
            <p class="input-tips">
              可配置分销商波比区间:{{ agencyRatioMin }}~{{ agencyRatioMax }}%
            </p>
          </div>
          <div class="rights-tips">
            <p class="rights-tips-title">波比说明</p>
            <p class="rights-tips-content">
              波比分为内部员工波比和分销商波比，波比总和不能超过100%，用于分配商品佣金，按波比比例将佣金分配给内部员工和分销商
            </p>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  queryConditionList,
  saveCondition,
  saveRatio,
  queryCondition,
  queryRatio,
} from "@/services/system";
import { fetchGoodsList } from "@/services/common";
import { Toast } from "vant";
export default defineComponent({
  name: "SystemManagement",
  data() {
    return {
      activeIndex: 0,
      actions: [],
      value: 1,
      valueToName: "消费次数",
      current: 1,
      size: 10,
      staffRatio: "",
      agencyRatio: "",
      staffRatioMin: 0,
      staffRatioMax: 100,
      agencyRatioMin: 0,
      agencyRatioMax: 100,
      goodsTitle: "",
      consumeNumber: "",
      consumeTime: "",
      selectedId: -1,
      addGood: false,
      ratioEditSave: false,
      conditionEditSave: false,
      show: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.name !== undefined) {
      next((vm) => {
        console.log(`商品。。。`);
        console.log(to.query.name);
        vm.goodsTitle = to.query.name;
        vm.value = 3;
        vm.addGood = true;
        vm.selectedId = to.query.id;
      });
    } else {
      next();
    }
  },
  mounted() {
    this.queryConditionList();
    this.queryRatio();
    if (!this.addGood) {
      this.queryCondition();
    }
  },
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      this.value = item.value;
      this.valueToName = item.msg;
    },
    onClickLeft() {
      let msg = "";
      if (!this.ratioEditSave || !this.conditionEditSave) {
        if (!this.ratioEditSave && !this.conditionEditSave) {
          msg = `设置信息未保存，确认返回？`;
        } else if (!this.ratioEditSave) {
          msg = `波比设置未保存，确认返回？`;
        } else {
          msg = `门槛信息设置未保存，确认返回？`;
        }
        this.$dialog
          .confirm({
            message: msg,
            className: "gy-dialog",
          })
          .then(() => {
            this.$router.go(-1);
          });
      } else {
        this.$router.go(-1);
      }
    },
    handleGoodsSelect() {
      this.$router.replace({
        path: "/goods",
        query: { selectedId: this.selectedId },
      });
    },
    handleStaffInputBlur() {
      if (Number(this.staffRatio) > this.staffRatioMax) {
        this.staffRatio = this.staffRatioMax;
      }
      this.staffRatioMax === 100 &&
        (this.agencyRatioMax = 100 - Number(this.staffRatio));
      if (Number(this.agencyRatio) > this.agencyRatioMax) {
        this.agencyRatio = this.agencyRatioMax;
      }
    },
    handleAgencyInputBlur() {
      if (Number(this.agencyRatio) > this.agencyRatioMax) {
        this.agencyRatio = this.agencyRatioMax;
      }
      this.agencyRatioMax === 100 &&
        (this.staffRatioMax = 100 - Number(this.agencyRatio));
      if (Number(this.staffRatio) > this.staffRatioMax) {
        this.staffRatio = this.staffRatioMax;
      }
    },
    async queryRatio() {
      const res = await queryRatio();
      this.staffRatio = res.data.staffRatio;
      this.agencyRatio = res.data.agencyRatio;
      console.log(res);
    },
    async queryCondition() {
      const res = await queryCondition();
      res.data.type && (this.value = res.data.type);
      if (res.data.type === 1) {
        this.consumeTime = res.data.conditionValue;
      } else if (res.data.type === 2) {
        this.consumeNumber = res.data.conditionValue;
      } else if (res.data.type === 3) {
        this.goodsTitle = res.data.title;
        this.selectedId = res.data.conditionValue;
      }
    },
    async queryConditionList() {
      console.log(`查询条件列表`);
      const res = await queryConditionList();
      console.log(`查询条件列表2`);
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].text = res.data[i].msg;
        res.data[i].value = res.data[i].code;
        res.data[i].name = res.data[i].msg;
      }
      this.actions.push(...res.data);
    },
    async handleValueChange(value) {
      console.log(value);
    },
    async handleConditionSave() {
      let conditionValue = "";
      if (this.value === 1) {
        conditionValue = this.consumeTime;
      } else if (this.value === 2) {
        conditionValue = this.consumeNumber;
      } else {
        conditionValue = this.selectedId;
      }
      await saveCondition({ type: this.value, conditionValue });
      this.conditionEditSave = true;
      Toast(`门槛设置保存成功`);
    },
    async handleRatioSave() {
      if (this.staffRatio === "") {
        Toast(`请设置员工波比`);
        return;
      }
      if (this.agencyRatio === "") {
        Toast(`请设置分销商波比`);
        return;
      }
      await saveRatio({
        staffRatio: this.staffRatio,
        agencyRatio: this.agencyRatio,
      });
      this.ratioEditSave = true;
      Toast(`波比设置保存成功！`);
    },
    async handleSave() {
      console.log(this.activeIndex);
      if (this.activeIndex === 0) {
        console.log(111);
        this.handleConditionSave();
      } else {
        console.log(222);
        this.handleRatioSave();
      }
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.system-management {
  height: 100%;
  :deep(.van-tabs__content) {
    padding: 18px 18px;
  }
  .select-item {
    width: 120px;
    margin-bottom: 18px;
  }
  .van-cell {
    background-color: #1e183c;
    color: #fff;
    &::after {
      border: none;
    }
    :deep(.van-field__control) {
      color: #fff;
    }
  }
  :deep(.van-dropdown-menu) {
    .van-dropdown-menu__bar {
      width: 200px;
      height: 32px;
      background-color: #1e183c;
      color: #fff;
      margin-bottom: 18px;
    }
    .van-dropdown-menu__title {
      color: #fff;
    }
    .van-dropdown-item__content {
      width: 200px;
      left: 18px;
    }
  }
  .input-wrapper {
    display: flex;
    .input-sign {
      padding: 0 10px;
      line-height: 44px;
      color: #fff;
    }
  }
  .ration-content {
    text-align: left;
    p {
      font-size: 14px;
      color: #fff;
    }
    .input-label {
      padding: 12px 0;
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
