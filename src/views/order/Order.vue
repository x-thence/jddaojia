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
      <div class="order__content__title">{{ shopInfo.data.title }}</div>
      <div class="order__content__products">
        <van-card
          v-for="item in list"
          :key="item"
          :num="item.count"
          :price="item.price"
          :desc="item.desc"
          :title="item.name"
          :thumb="item.imgUrl"
        />
      </div>
    </div>
    <van-submit-bar :price="centPrice" @submit="onSubmit" button-text="提交订单" />
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { Notify, Dialog } from 'vant'
import { getProductListEffect, getBusinessEffect, getTotalPriceEffect } from '../../effects/common'
// import { ref } from 'vue'

const onSubmitEffect = (router) => {
  const onSubmit = () => {
    Dialog.confirm({
      title: '确认订单',
      message: '是否确认提交订单'
    })
      .then(() => {
        router.push('/my_order_list')
      })
      .catch(() => {
        router.push('/')
      })
  }
  return { onSubmit }
}

export default {
  name: 'Order',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const shopId = route.query.shopId
    const goBack = () => {
      router.back()
    }
    // 点击右上角的分享按钮
    const onShare = () => {
      Notify({ type: 'warning', message: '努力开发中。。。。。' })
    }
    const { list } = getProductListEffect(shopId)
    const { shopInfo } = getBusinessEffect(shopId)
    const { totalPrice } = getTotalPriceEffect(shopId)
    const { onSubmit } = onSubmitEffect(router)
    let centPrice = 0
    centPrice = totalPrice.value * 100
    return { goBack, onShare, list, shopInfo, centPrice, onSubmit }
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
