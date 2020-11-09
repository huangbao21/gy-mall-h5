<template>
  <div class="address nav-bar">
    <van-nav-bar
      title="收货地址管理"
      right-text="新增地址"
      left-arrow
      :border="false"
      @click-left="onClickLeft"
      @click-right="handleAddressAdd"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <div class="address-list">
      <van-swipe-cell
        v-for="item in list"
        :key="item.id"
        @click="handleAddressSelect(item.id)"
      >
        <div class="van-address-item">
          <div class="van-cell van-cell--borderless">
            <div
              class="van-cell__value van-cell__value--alone van-address-item__value"
            >
              <div
                role="radio"
                class="van-radio"
                tabindex="0"
                aria-checked="false"
              >
                <span class="van-radio__label"
                  ><div class="van-address-item__name">
                    {{ item.linkman }} {{ item.mobile
                    }}<span
                      class="van-tag van-tag--round van-tag--danger van-address-item__tag"
                      v-if="item.byDefault"
                      >默认</span
                    >
                  </div>
                  <div class="van-address-item__address">
                    {{ item.provinceName }}{{ item.cityName
                    }}{{ item.districtName }}{{ item.street }}
                  </div></span
                >
              </div>
            </div>
            <i
              class="van-badge__wrapper van-icon van-icon-edit van-address-item__edit"
              @click="handleEdit(item.id)"
              ><!----><!----><!----></i
            ><!---->
          </div>
        </div>
        <template #right>
          <van-button
            square
            type="primary"
            text="设为默认"
            @click="setAddressDefault(item.id)"
          />
          <van-button
            square
            type="danger"
            text="删除"
            @click="handleDelete(item.id)"
          />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Toast } from "vant";
import {
  fetchAddressList,
  deleteAddress,
  setAddressDefault
} from "@/services/address";
export default defineComponent({
  name: "Home",
  data() {
    return {
      chosenAddressId: "1",
      list: [] as object[],
      current: 1,
      size: 50
    };
  },
  components: {
    // HelloWorld
  },
  mounted() {
    this.fetchAddressList();
  },
  methods: {
    handleAddressSelect(addressId: number) {
      // 要判断来源是app还是订单
      this.$router.replace({
        path: "/placeOrder",
        query: { ...this.$route.query, chosenAddressId: addressId }
      });
    },
    handleAddressAdd() {
      this.$router.push({ path: "/addressEdit" });
    },
    handleEdit(addressId: string) {
      console.log("编辑地址");
      this.$router.push({
        path: "/addressEdit",
        query: { type: "edit", addressId }
      });
    },
    async setAddressDefault(id: number) {
      await setAddressDefault({ id });
      this.fetchAddressList();
    },
    async handleDelete(id: number) {
      await deleteAddress({ id });
      this.list = [];
      this.fetchAddressList();
    },
    async fetchAddressList() {
      const res = await fetchAddressList({
        current: this.current,
        size: this.size
      });
      console.log(res);
      this.list.push(...res.data.records);
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";
.address {
  &-list {
    margin-top: 10px;
    .van-button--square {
      height: 100%;
    }
    .van-address-item {
      background-color: $contentBgColor;
      .van-cell {
        background-color: $contentBgColor;
      }
      &__name {
        color: #fff;
        font-weight: bold;
      }
      &__address {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
</style>
