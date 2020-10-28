 <template>
  <div class="system-management nav-bar">
    <van-nav-bar
      title="体系管理"
      left-arrow
      :border="false"
      @click-left="onClickLeft"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <van-tabs v-model:active="activeIndex" class="gy-tabs">
      <van-tab title="门槛设置">
        <van-dropdown-menu class="dropdown-menu">
          <van-dropdown-item
            v-model="selectedValue"
            :options="conditionOption"
          />
        </van-dropdown-menu>
        <div class="condition-content">
          <div class="input-wrapper">
            <van-field
              v-model="sellNumber"
              rows="1"
              type="number"
              autosize
              placeholder="请输入消费金额"
              @blur="handleSalesInputBlur"
            />
            <span class="input-sign">元</span>
          </div>
          <div class="input-wrapper">
            <van-field
              v-model="sellNumber"
              rows="1"
              type="number"
              autosize
              placeholder="请输入消费次数"
              @blur="handleSalesInputBlur"
            />
            <span class="input-sign">次</span>
          </div>
          <div class="goods-list">

          </div>
        </div>
      </van-tab>
      <van-tab title="波比设置">2222</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { queryConditionList } from "@/services/system";
export default defineComponent({
  name: "SystemManagement",
  data() {
    return {
      activeIndex: 0,
      conditionOption: [],
      selectedValue: 2,
    };
  },
  created() {
    this.queryConditionList();
  },
  methods: {
    async queryConditionList() {
      const res = await queryConditionList();
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].text = res.data[i].msg;
        res.data[i].value = res.data[i].code;
      }
      this.conditionOption = res.data;
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.system-management {
  height: 100%;
  /*  .dropdown-menu {
    width: 108px;
    height: 32px;
  } */
}
</style>
