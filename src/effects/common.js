
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, reactive } from 'vue'
import Request from '../api/request'
// import { getLocalStorage } from '../effects/common'

export const storeEffect = () => {
  const store = useStore()
  const route = useRoute()
  const handleChangeCount = (type, item, isCart) => {
    const businessId = route.params.id
    if (type === 'minus') {
      !isCart && (item.count -= 1)
      if (item.count < 0) {
        item.count = 0
        return
      }
      store.commit('minusItem', {
        item,
        businessId
      })
    }
    if (type === 'plus') {
      store.commit('addItem', {
        item,
        businessId
      })
      !isCart && (item.count += 1)
    }
  }
  return { handleChangeCount }
}

// 获取某个商家被添加进购物车的商品
export const getProductListEffect = (shopId) => {
  const list = computed(() => {
    const store = useStore()
    const list = []
    const data = store.state.cartInfo[shopId]
    // 商户id不存在直接return
    if (!shopId) {
      return
    }
    Object.keys(data).forEach((productId) => {
      if (data[productId].count > 0) {
        list.push(data[productId])
      }
    })
    return list
  })
  return { list }
}
// 获取商家详情
export const getBusinessEffect = (shopId) => {
  const shopInfo = reactive({ data: {} })
  const getDetail = async () => {
    const res = await Request.get(`/v1/get_detail/${shopId}`)
    if (res.status === 200) {
      shopInfo.data = res.data
    }
  }
  getDetail()
  return { shopInfo }
}
// 计算商家购物车总价
export const getTotalPriceEffect = (shopId) => {
  const totalPrice = computed(() => {
    const store = useStore()
    let total = 0
    const list = store.state.cartInfo[shopId]
    if (list) {
      for (const goodKey in list) {
        total += list[goodKey].count * list[goodKey].price
      }
    }
    return total.toFixed(2)
  })
  return { totalPrice }
}
