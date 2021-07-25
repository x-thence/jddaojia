<template>
  <div class="detail__wrapper">
    <div class="header">
      <span @click="handleBack" class="back">
        <span class="iconfont">&#xe692;</span>
        <span>返回</span>
      </span>
      <span class="title">商家详情</span>
    </div>
    <Merchant :merchant-list="[shopInfo.data]" />
    <div class="search__wrapper">
      <input type="text" placeholder="请输入搜索关键词" >
    </div>
    <Content />
    <Cart @showCartGoods="handleShowCartGoods" :has-count="hasCount" :total-price="totalPrice" :cart-count="count"/>
    <CartGoodsList v-if="isShowCartGoods" />
    <div v-if="isShowCartGoods" @click="handleShowCartGoods" class="mask"></div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Merchant from '../../components/merchant/Merchant'
import Content from './components/Content'
import Cart from './components/Cart'
import CartGoodsList from './components/CartGoodsList'
import { getBusinessEffect, getTotalPriceEffect } from '../../effects/common'
const backEffect = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return handleBack
}
// 根据购物车是否有商品来切换对应的样式
const toggleCartEffect = () => {
  const store = useStore()
  const route = useRoute()
  const getHasCount = computed(() => {
    const businessId = route.params.id
    let hasCount = false
    if (store.state.cartInfo[businessId]) {
      const list = Object.keys(store.state.cartInfo[businessId])
      const res = list.find(ele => store.state.cartInfo[businessId][ele].count > 0)
      if (res) {
        hasCount = true
      }
    }
    return hasCount
  })
  return getHasCount
}
// 计算当前商家购物车商品数量
const computedCountEffect = () => {
  const count = computed(() => {
    const route = useRoute()
    const store = useStore()
    const businessId = route.params.id
    let total = 0
    const list = store.state.cartInfo[businessId]
    if (list) {
      for (const goodKey in list) {
        total += list[goodKey].count
      }
    }
    return total
  })
  return count
}
// 展示当前商家购物车商品详情逻辑
const handleShowCartGoodsEffect = (isShowCartGoods) => {
  const handleShowCartGoods = () => {
    isShowCartGoods.value = !isShowCartGoods.value
  }
  return handleShowCartGoods
}

export default {
  name: 'Detail',
  components: {
    Merchant,
    Content,
    Cart,
    CartGoodsList
  },
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const keywords = ref('')
    const isShowCartGoods = ref(false)
    const { shopInfo } = getBusinessEffect(shopId)
    const handleBack = backEffect()
    const hasCount = toggleCartEffect()
    // 获取当前商家购物车商品总价
    const { totalPrice } = getTotalPriceEffect(shopId)
    const count = computedCountEffect()
    const handleShowCartGoods = handleShowCartGoodsEffect(isShowCartGoods)
    return {
      shopInfo,
      keywords,
      handleBack,
      hasCount,
      totalPrice,
      count,
      handleShowCartGoods,
      isShowCartGoods
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/variable.scss';
.detail__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  .header {
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
  .search__wrapper {
    height: .36rem;
    margin: 0 .1rem;
    padding: 0 .1rem;
    border-radius: .05rem;
    background: $colorNormal;
    line-height: .36rem;
    color: $fontColor6;
    input {
      width: 100%;
      line-height: .36rem;
      border: none;
      outline: none;
      background: none;
    }
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: .5rem;
    right: 0;
    z-index: 0;
    background: rgb(0,0,0,.5);
  }
}
</style>
