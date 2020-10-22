 <template>
  <div class="systemManagement nav-bar">
    <van-nav-bar
      title="体系管理"
      left-arrow
      :border="false"
      @click-left="onClickLeft"
    >
      <template #left>
        <img
          class="leftIcon"
          src="./../../assets/imgs/common/icon-left.png"
        />
      </template>
    </van-nav-bar>
    <main>
      <div class="content">
        <div class="content_l">
          <span>员工数（人）</span>
          <span>99999</span>
        </div>
        <div class="content_r"></div>
      </div>
      <div class="rate">
        <h2>员工波比</h2>
        <div class="bobby"></div>
        <h2>分销商波比</h2>
        <div class="distributors"></div>
      </div>
    </main>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
@import "@/styles/base.scss";
.systemManagement {
  min-height: 100%;
  background-color: $bgColor;
  color: #fff;
}
main {
  padding-left: 18px;
  padding-right: 18px;
}
.content {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.content_l {
  width: 160px;
  height: 80px;
  border-radius: 8px;
  padding-left: 16px;
  text-align: left;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  background: linear-gradient(0deg, #2661dd 0%, #588ee9 100%);
}
.content_r {
  width: 160px;
  height: 80px;
  border-radius: 8px;
  background: linear-gradient(360deg, #c49f00 0%, #f3ce30 100%);
}
h2 {
  width: 76px;
  height: 18px;
  line-height: 45px;
  font-size: 14px;
}
.bobby,
.distributors {
  width: 339px;
  height: 50px;
  background: #1e183c;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.bobby {
  margin-top: 30px;
}
.distributors {
  margin-top: 25px;
}
</style>
