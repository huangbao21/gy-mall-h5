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
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="value"
            :options="conditionOption"
            @change="handleValueChange"
          />
        </van-dropdown-menu>
        <div class="condition-content">
          <div
            class="input-wrapper"
            v-if="
              this.conditionOption.length &&
              value === this.conditionOption[1].value
            "
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
            v-if="
              this.conditionOption.length &&
              value === this.conditionOption[0].value
            "
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
            v-if="
              this.conditionOption.length &&
              value === this.conditionOption[2].value
            "
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
      conditionOption: [],
      value: 1,
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
    };
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.name !== undefined) {
      next((vm) => {
        vm.goodsTitle = to.query.name;
        vm.value = 3;
      });
    } else {
      next();
    }
  },
  created() {
    this.queryConditionList();
    this.queryRatio();
    this.queryCondition();
  },
  methods: {
    onClickLeft() {
      this.$dialog
        .confirm({
          message: "添加的商品信息未保存，确认返回",
          className: "gy-dialog",
        })
        .then(() => {
          this.$router.go(-1);
        });
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
      console.log(res);
    },
    async queryCondition() {
      const res = await queryCondition();
      this.value = res.data.type;
      if (res.data.type === 1) {
        this.consumeTime = res.data.conditionValue;
      } else if (res.data.type === 2) {
        console.log(res.data.conditionValue);
        this.consumeNumber = res.data.conditionValue;
      } else {
        this.goodsTitle = res.data.title;
        this.selectedId = res.data.conditionValue;
      }
      console.log(res);
    },
    async queryConditionList() {
      const res = await queryConditionList();
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].text = res.data[i].msg;
        res.data[i].value = res.data[i].code;
      }
      this.conditionOption.push(...res.data);
    },
    async handleValueChange(value) {
      if (value === 3) {
        const res = await fetchGoodsList({
          current: this.current,
          size: this.size,
          status: 2,
        });
        console.log(res.data);
      }
    },
    async handleConditionSave() {
      await saveCondition({ type: this.value, conditionValue: 12 });
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
      Toast(`波比设置保存成功！`);
    },
    async handleSave() {
      if (this.activeIndex === 1) {
        this.handleConditionSave();
      } else {
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
