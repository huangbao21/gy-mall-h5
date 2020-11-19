<template>
  <div class="address-edit nav-bar">
    <van-nav-bar
      title="体系管理"
      :right-text="type === 'edit' ? '删除' : ''"
      left-arrow
      :border="false"
      @click-left="onClickLeft"
      @click-right="handleDelete"
    >
      <template #left>
        <img class="leftIcon" src="./../../assets/imgs/common/icon-left.png" />
      </template>
    </van-nav-bar>
    <van-address-edit
      :area-list="areaList"
      show-search-result
      :search-result="searchResult"
      :address-info="addressInfo"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      detail-rows="2"
      @change-area="onChangeArea"
    >
      <template #default>
        <van-cell
          center
          title="设为默认收获地址"
          class="van-address-edit__default"
          label="提醒：每次下单会默认推荐使用该地址"
        >
          <template #right-icon>
            <van-switch v-model="checked" size="24" />
          </template>
        </van-cell>
      </template>
    </van-address-edit>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Toast } from "vant";
import {
  fetchAreaList,
  saveAddress,
  AddressInfo,
  fetchAddressInfo,
  deleteAddress,
  editAddressInfo
} from "../../services/address";
interface AreaRules {
  [key: number]: string;
}

export default defineComponent({
  name: "Home",
  data() {
    return {
      areaList: {},
      searchResult: [] as object[],
      addressInfo: {
        id: "",
        tel: "",
        province: "",
        city: "",
        county: "",
        areaCode: "",
        isDeafult: 0,
        name: "",
        addressDetail: "",
        cityCode: "",
        provinceCode: ""
      },
      checked: false,
      isContentChange: false,
      type: "add",
      addressId: -1,
      provinceCode: "",
      cityCode: ""
    };
  },
  components: {
    // HelloWorld
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.addressId !== undefined) {
      next((vm: any) => {
        vm.addressId = to.query.addressId;
        vm.type = to.query.type;
      });
    } else {
      next();
    }
  },
  mounted() {
    this.fetchAddressInfo();
  },
  methods: {
    onClickLeft() {
      this.$dialog
        .confirm({
          message: "地址信息未保存，确认返回？",
          className: "gy-dialog"
        })
        .then(() => {
          this.$router.go(-1);
        });
    },
    async handleDelete() {
      await deleteAddress({ id: this.addressId });
      Toast(`地址删除成功`);
      this.$router.go(-1);
    },
    async fetchAddressInfo() {
      await this.fetchAreaList();
      if (this.addressId < 0) {
        return;
      }
      const res = await fetchAddressInfo({ id: this.addressId });
      this.addressInfo = {
        id: res.data.id,
        tel: res.data.mobile,
        province: res.data.provinceName,
        city: res.data.cityName,
        county: res.data.districtName,
        areaCode: res.data.districtCode,
        isDeafult: res.data.byDefault,
        name: res.data.linkman,
        addressDetail: res.data.street,
        cityCode: res.data.cityCode,
        provinceCode: res.data.provinceCode
      };
      if (res.data.byDefault) {
        this.checked = true;
      }
    },
    dealAreaListData(list: any) {
      const res = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        province_list: {} as AreaRules,
        // eslint-disable-next-line @typescript-eslint/camelcase
        city_list: {} as AreaRules,
        // eslint-disable-next-line @typescript-eslint/camelcase
        county_list: {} as AreaRules
      };
      list.forEach((provinceList: any) => {
        res.province_list[provinceList.adcode] = provinceList.name;
        provinceList.districts.forEach((cityList: any) => {
          res.city_list[cityList.adcode] = cityList.name;
          cityList.districts.forEach((countyList: any) => {
            res.county_list[countyList.adcode] = countyList.name;
          });
        });
      });
      return res;
    },
    async fetchAreaList() {
      const res = await fetchAreaList();
      this.areaList = this.dealAreaListData(res.data.districts);
    },
    async onSave(addressInfo: AddressInfo) {
      if (this.type === "add") {
        await saveAddress({
          byDefault: this.checked ? 1 : 0,
          cityName: addressInfo.city,
          districtCode: addressInfo.areaCode,
          districtName: addressInfo.county,
          linkman: addressInfo.name,
          mobile: addressInfo.tel,
          provinceName: addressInfo.province,
          street: addressInfo.addressDetail,
          provinceCode: this.provinceCode,
          cityCode: this.cityCode
        });
      } else {
        await editAddressInfo({
          id: this.addressId,
          byDefault: this.checked ? 1 : 0,
          cityName: addressInfo.city,
          districtCode: addressInfo.areaCode,
          districtName: addressInfo.county,
          linkman: addressInfo.name,
          mobile: addressInfo.tel,
          provinceName: addressInfo.province,
          street: addressInfo.addressDetail,
          provinceCode: this.addressInfo.provinceCode,
          cityCode: this.addressInfo.cityCode
        });
      }

      Toast("保存成功");
      this.$router.go(-1);
    },
    onDelete() {
      Toast("delete");
    },
    onChangeArea(values: any) {
      console.log(values);
      console.log(this.addressInfo);
      if (this.type === "edit") {
        this.addressInfo.provinceCode = values[0].code;
        this.addressInfo.cityCode = values[1].code;
      } else {
        this.provinceCode = values[0].code;
        this.cityCode = values[1].code;
      }
    },
    onChangeDetail(val: boolean) {
      this.isContentChange = true;
      if (val) {
        this.searchResult = [];
      } else {
        this.searchResult = [];
      }
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";
.address-edit {
  .van-address-edit {
    padding: 0;
  }
  .van-cell::after {
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  }
  :deep(.van-cell) {
    background-color: $contentBgColor;
    &::after {
      border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    }
    .van-field__label {
      color: #fff;
    }
    .van-field__value {
      color: $commonWordColor;
    }
    .van-switch--on {
      background-color: #6f5fef;
    }
    .van-cell__title {
      text-align: left;
      color: #fff;
    }
    .van-field__control {
      color: #fff;
    }
    .van-field__control::-webkit-input-placeholder {
      color: $commonWordColor;
    }
  }
  :deep(.van-button--danger) {
    background-color: #00ffd2;
    border: none;
    .van-button__content {
      color: #0d0420;
      font-weight: bold;
    }
  }
}
</style>
