
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, reactive } from 'vue'
import Request from '../../../api/request'

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
