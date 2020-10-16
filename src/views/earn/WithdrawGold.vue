<template>
  <div class="withdrawGold nav-bar">
    <van-nav-bar
      title="金币划转"
      left-arrow
      :border="false"
      @click-left="toView"
    >
      <template #left>
        <img
          class="leftIcon"
          src="./../../assets/imgs/earnMoney/icon-left.png"
        />
      </template>
    </van-nav-bar>
    <div class="account">
      <span><small>￥</small>0</span>
      <span class="des">到账金币</span>
    </div>
    <div class="account-input">
      <van-field
        v-model="goldValue"
        label="划转金币数量"
        placeholder="请输入用户名"
      />
    </div>
    <div class="gold-action">
      <span
        >赚钱中心金币余额:<span class="gold-val"
          ><img src="./../../assets/imgs/earnMoney/icon-gold.png" />10000</span
        ></span
      >
      <span class="gold__withdraw">全部划转</span>
    </div>
    <div class="account-sel">
      <van-radio-group v-model="transferWay">
        <div class="account-sel__el">
          <div class="radio__des">
            <img src="./../../assets/imgs/earnMoney/ic_balance.png" />
            <div class="text">
              <span class="title">划转到金币余额</span>
              <small>划转秒到账</small>
            </div>
          </div>
          <van-radio name="coin" :checked-color="checkRadioColor" />
        </div>
        <div class="account-sel__el">
          <div class="radio__des">
            <img src="./../../assets/imgs/earnMoney/ic_wallet.png" />
            <div class="text">
              <span class="title">划转到钱包余额</span>
              <small>可直接用于打赏、购物、兑换优惠券</small>
            </div>
          </div>

          <van-radio name="wallet" :checked-color="checkRadioColor" />
        </div>
      </van-radio-group>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import usePropsCom from "@/composables/usePropsCom";
export default defineComponent({
  name: "withdrawGold",
  setup() {
    const { checkRadioColor } = usePropsCom();
    return {
      checkRadioColor,
    };
  },
  data() {
    return {
      goldValue: "",
      transferWay: "coin",
      abc: "#EA4A72",
    };
  },
  methods: {
    toView() {
      console.log(123);
      this.$router.go(-1);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.withdrawGold {
  min-height: 100%;
  background-color: $bgColor;
  padding-left: 18px;
  padding-right: 18px;
}
.account {
  display: flex;
  font-size: 32px;
  color: #fff;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  small {
    font-size: 20px;
  }
  .des {
    font-size: 12px;
    color: rgba($color: #fff, $alpha: 0.4);
  }
}
.account-input {
  margin-top: 30px;
  .van-cell {
    @include gy-input;
    border-radius: 22px;
    :deep(input) {
      font-size: 15px;
    }
  }
}
.gold-action {
  display: flex;
  color: rgba($color: #fff, $alpha: 0.4);
  font-size: 12px;
  justify-content: space-between;
  margin-top: 16px;
  padding-left: 20px;
  padding-right: 20px;
  .gold-val {
    color: #ffb300;
    margin-left: 8px;
    img {
      width: 12px;
      height: 12px;
    }
  }
  .gold__withdraw {
    color: #00ffd2;
  }
}
.account-sel {
  height: 130px;
  border-radius: 8px;
  background-color: $contentBgColor;
  margin-top: 30px;
  padding-left: 20px;
  &__el {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
    padding-top: 16px;
    padding-right: 20px;
    &:first-child {
      border-bottom: 1px solid #f0f0f0;
    }
    .radio__des {
      display: flex;
      align-items: center;
      img {
        width: 28px;
        height: 28px;
      }
      .text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 15px;
        color: #fff;
        margin-left: 15px;
        small {
          font-size: 12px;
          color: rgba($color: #fff, $alpha: 0.6);
        }
      }
    }
  }
}
</style>
