<template>
  <div class="withdraw-gold nav-bar">
    <van-nav-bar
      title="金币划转"
      left-arrow
      :border="false"
      @click-left="toView"
    >
      <template #left>
        <img
          class="leftIcon"
          src="./../../assets/imgs/common/icon-left.png"
        />
      </template>
    </van-nav-bar>
    <main>
      <div class="account">
        <span><small>￥</small>{{ goldValue ? goldValue : 0 }}</span>
        <span class="des">到账金币</span>
      </div>
      <div class="account-input">
        <van-field
          v-model="goldValue"
          label="划转金币数量"
          placeholder="请输入金币"
        />
      </div>
      <div class="gold-action">
        <span
          >赚钱中心金币余额:<span class="gold-val"
            ><img src="./../../assets/imgs/earnMoney/icon-gold.png" />{{
              balance
            }}</span
          ></span
        >
        <span class="gold__withdraw" @click="transferAll">全部划转</span>
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

            <van-radio
              name="wallet"
              :checked-color="checkRadioColor"
              :disabled="level === 'normal'"
            />
          </div>
        </van-radio-group>
      </div>
      <div
        class="btn"
        @click="transfer"
        :class="{ disabled: !goldValue || goldValue === '0' }"
      >
        立即划转
      </div>
      <div class="indicate">
        <article>
          <header>划转说明：</header>
          <p>
            1、赚钱中心中的金币可划转至个人中心金币余额、钱包余额中，进行统一提现。
          </p>
          <p>2、赚钱中心中的金币划转免手续费且秒到账。</p>
          <p>
            3、您理解并统一光鹰应用人工智能分析提现行为，如发现造假等违规操作，光鹰有权阻止您使用提现功能以及取消您获得的分红与奖励。若您通过非正常手段获得金币（包括但不限于刷单软件、模拟器、应用多开），光鹰视频有权限制您的提现行为，且光鹰视频有权采取封号等必要措施，并保留追究法律责任的权利，情节严重构成犯罪的，将移交司法部门追究刑事责任。
          </p>
        </article>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import usePropsCom from "@/composables/usePropsCom";
import { fetchBountyAndRank, updateTransfer } from "@/services/earn";
export default defineComponent({
  name: "WithdrawGold",
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
      balance: 0,
      level: "normal",
    };
  },
  mounted() {
    this.getBountyRank();
  },
  methods: {
    toView() {
      this.$router.go(-1);
    },
    transferAll() {
      this.goldValue = String(this.balance);
    },
    async getBountyRank() {
      const res = await fetchBountyAndRank();
      this.balance = res.data.balance;
      this.level = res.data.level;
    },
    async transfer() {
      if (this.goldValue || this.goldValue === "0") {
        const res = await updateTransfer({
          amount: Number(this.goldValue),
          zone: this.transferWay,
        });
        this.goldValue = "";
        this.$toast.success({
          message: res.msg,
          forbidClick: true,
          onClose: () => {
            this.getBountyRank();
          },
        });
      }
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.withdraw-gold  {
  min-height: 100%;
  background-color: $bgColor;
  padding-bottom: 20px;
}
main {
  padding-left: 18px;
  padding-right: 18px;
}
.btn {
  width: 339px;
  height: 44px;
  background: #00ffd2;
  border-radius: 22px;
  font-size: 18px;
  line-height: 44px;
  font-weight: bold;
  margin-top: 50px;
  &.disabled {
    opacity: 40%;
  }
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
.indicate {
  font-size: 12px;
  color: #fff;
  text-align: left;
  margin-top: 35px;
  article {
    line-height: 17px;
  }
  header {
    margin-bottom: 20px;
  }
}
</style>
