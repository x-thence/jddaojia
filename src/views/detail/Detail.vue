<template>
  <div class="detail__wrapper">
    <div class="header">
      <span @click="handleBack" class="back">
        <van-icon size="20" name="arrow-left" />
        <span>返回</span>
      </span>
      <span class="title">商家详情</span>
    </div>
    <Merchant :merchant-list="[obj.data]" />
    <van-search v-model="keywords" placeholder="请输入搜索关键词" />
    <Content />
    <Cart @showCartGoods="handleShowCartGoods" :has-count="hasCount" :total-price="totalPrice" :cart-count="count"/>
    <CartGoodsList v-if="isShowCartGoods" />
    <div v-if="isShowCartGoods" @click="handleShowCartGoods" class="mask"></div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import Merchant from '../../components/merchant/Merchant'
import Content from './components/Content'
import Cart from './components/Cart'
import CartGoodsList from './components/CartGoodsList'
import axios from 'axios'

const backEffect = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return handleBack
}
// 获取商家信息逻辑
const getBusinessEffect = () => {
  const route = useRoute()
  const obj = reactive({ data: {} })
  const getDetail = async () => {
    const res = await axios.get(`https://www.fastmock.site/mock/eac3f83516b2299ea36c1e78f6f09ffa/mock/api/v1/get_detail/${route.params.id}`)
    if (res.status === 200) {
      obj.data = res.data
    }
  }
  return { getDetail, obj }
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
// 计算当前商家购物车总价
const getTotalPriceEffect = () => {
  const totalPrice = computed(() => {
    const route = useRoute()
    const store = useStore()
    const businessId = route.params.id
    let total = 0
    const list = store.state.cartInfo[businessId]
    if (list) {
      for (const goodKey in list) {
        total += list[goodKey].count * list[goodKey].price
      }
    }
    return total.toFixed(2)
  })
  return totalPrice
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
    const keywords = ref('')
    const isShowCartGoods = ref(false)
    const { getDetail, obj } = getBusinessEffect()
    getDetail()
    const handleBack = backEffect()
    const hasCount = toggleCartEffect()
    const totalPrice = getTotalPriceEffect()
    const count = computedCountEffect()
    const handleShowCartGoods = handleShowCartGoodsEffect(isShowCartGoods)
    return {
      obj,
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
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 0;
    background: rgb(0,0,0,.5);
  }
}
</style>
