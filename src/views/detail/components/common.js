
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

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
