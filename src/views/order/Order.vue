<template>
  <div class="order">
    <div class="order__header">
      <div class="order__header__nav">
      <span @click="handleBack" class="back">
        <span class="iconfont">&#xe692;</span>
        <span @click="goBack">返回</span>
      </span>
      <span class="title">提交订单</span>
    </div>
    </div>
    <div class="order__top">
      <div class="order__top__address">
        <span class="order__top__address__title">收货地址</span>
        <div class="order__top__address__part">
          <span>北京理工大学国防科技园2号楼10号</span>
          <span> ></span>
        </div>
        <span class="order__top__address__phone">王秋狗 156546465</span>
      </div>
      <div class="order__top__time">
        <span class="order__top__time__left">送达时间</span>
        <span class="order__top__time__right">立即送达></span>
      </div>
    </div>
    <div class="order__content">
      <div class="order__content__title">{{ shopInfo.data.title }}</div>
      <div class="order__content__products">
        <ProductItem v-for="item in list" :key="item" :data="item" />
      </div>
    </div>
    <van-submit-bar :price="centPrice" @submit="onSubmit" button-text="提交订单" />
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { Notify, Dialog } from 'vant'
import { getProductListEffect, getBusinessEffect, getTotalPriceEffect } from '../../effects/common'
import ProductItem from './ProductItem'

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
  },
  components: {
    ProductItem
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
  &__header {
    height: .4rem;
    &__nav {
      position: relative;
      line-height: .4rem;
      margin-bottom: .05rem;
      text-align: center;
      background: #fff;
      border-bottom: $borderColor;
      .title {
        font-size: .16rem;
      }
      .back {
        position: absolute;
        display: flex;
        align-items: center;
        left: .1rem;
        font-size: .16rem;
      }
      .iconfont {
        font-size: .16rem;
      }
    }
  }
  &__top {
    width: 95%;
    margin: auto;
    &__address {
      padding: 0.1rem .2rem 0 .2rem;
      height: .85rem;
      margin-top: .1rem;
      color: #333;
      background-color: rgb(250,250,250);
      border-radius: .05rem;
      &__title {
        height: .2rem;
        font-size: .2rem;
      }
      &__part {
        padding-top: .1rem;
        height: .3rem;
        font-size: .16rem;
      }
      &__phone {
        padding-top: .1rem;
      }
    }
    &__time {
      display: flex;
      line-height: .3rem;
      border-radius: .03rem;
      margin-top: .05rem;
      background-color: #fff;
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
    top: 1.75rem;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 .2rem 0 .2rem;
    overflow-y: scroll;
    margin-bottom: .5rem;
    &__title {
      line-height: .4rem;
      font-size: .18rem;
      padding-left: .1rem;
    }
    ::v-deep .van-card__content{
      font-size: .14rem !important;
    }
    ::v-deep .van-card__title {
      line-height: .3rem;
    }
  }
}
</style>
