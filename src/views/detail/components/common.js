
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export const storeEffect = () => {
  const store = useStore()
  const route = useRoute()
  const handleChangeCount = (type, item) => {
    const businessId = route.params.id
    if (type === 'minus') {
      item.count -= 1
      if (item.count < 0) {
        item.count = 0
        return
      }
      store.commit('minusItem', {
        item,
        businessId
      })
    } else {
      item.count += 1
      store.commit('addItem', {
        item,
        businessId
      })
    }
  }
  return { handleChangeCount }
}
