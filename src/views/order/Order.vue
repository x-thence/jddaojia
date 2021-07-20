<template>
  <div class="order">
    <div class="order__header">
      <van-nav-bar
      title="提交订单"
      left-text="返回"
      right-text="分享"
      left-arrow
      @click-left="goBack"
      @click-right="onShare"
    />
    </div>
    <div class="order__top">
      <van-contact-card
        type="edit"
        name="王秋狗"
        tel="12345678911"
      />
      <div class="order__top__time">
        <span class="order__top__time__left">送达时间</span>
        <span class="order__top__time__right">立即送达></span>
      </div>
    </div>
    <div class="order__content">
      <div class="order__content__title">大润发(吉水店)</div>
      <div class="order__content__products">
        <van-card
          v-for="item in 15"
          :key="item"
          num="2"
          price="2.00"
          desc="描述信息"
          title="商品标题"
          thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
        />
      </div>
    </div>
    <van-submit-bar :price="3050" button-text="提交订单" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { Notify } from 'vant'
// import { ref } from 'vue'
export default {
  name: 'Order',
  setup () {
    const router = useRouter()
    const goBack = () => {
      router.back()
    }
    const onShare = () => {
      Notify({ type: 'warning', message: '努力开发中。。。。。' })
    }
    return { goBack, onShare }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/variable.scss';
.order {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  &__top {
    &__time {
      display: flex;
      line-height: .3rem;
      &__left {
        width: 1.5rem;
        text-indent: .2rem;
      }
      &__right {
        flex: 1;
        text-align: right;
        padding-right: .2rem;
        color: $priceColor;
      }
    }
  }
  &__content {
    position: absolute;
    top: 1.5rem;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    margin-bottom: .5rem;
    &__title {
      line-height: .4rem;
      font-size: .18rem;
      text-indent: .2rem;
    }
  }
}
</style>
