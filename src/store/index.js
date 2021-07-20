import { createStore } from 'vuex'
// 将购物车内容set本地存储
const setLocalStorage = (data) => {
  try {
    localStorage.setItem('store', JSON.stringify(data))
  } catch (err) {
    console.log(err)
  }
}
// 从本地存储取出数据
const getLocalStorage = () => {
  try {
    const data = localStorage.getItem('store')
    return JSON.parse(data)
  } catch (err) {
    return {}
  }
}

export default createStore({
  state: {
    // 购物车数据结构 { cartInfo: { "[businessId]": { "001(商品id)": { count: } } } }
    cartInfo: getLocalStorage() || {}
  },
  mutations: {
    // 添加商品进购物车
    addItem (state, params) {
      const { businessId, item } = params
      const businessCartInfo = state.cartInfo[businessId]
      // 若没有该商家的数据先初始化商家id信息
      if (!businessCartInfo) {
        state.cartInfo[businessId] = {}
        state.cartInfo[businessId][item.id] = {
          id: item.id,
          count: 1,
          price: item.price,
          imgUrl: item.imgUrl,
          desc: item.desc,
          checked: true
        }
      } else {
        // 若已存在商家数据则判断购物车是否含有该商品的数据，有则+1，没有则进行初始化
        if (!businessCartInfo[item.id]) {
          businessCartInfo[item.id] = {
            id: item.id,
            count: 1,
            price: item.price,
            imgUrl: item.imgUrl,
            desc: item.desc,
            checked: true
          }
        } else {
          businessCartInfo[item.id].count += 1
        }
      }
      setLocalStorage(state.cartInfo)
    },
    // 从购物车中删除商品
    minusItem (state, params) {
      const { businessId, item } = params
      const businessCartInfo = state.cartInfo[businessId]
      if (businessCartInfo) {
        if (businessCartInfo[item.id] && businessCartInfo[item.id].count > 0) {
          businessCartInfo[item.id].count -= 1
          if (businessCartInfo[item.id].count <= 0) {
            delete businessCartInfo[item.id]
          }
        }
      }
      setLocalStorage(state.cartInfo)
    },
    // 清空当前商家下的购物车
    clearCurrentShopCart (state, businessId) {
      if (state.cartInfo[businessId]) {
        state.cartInfo[businessId] = {}
      }
      // 清空本地购物车数据
      setLocalStorage({})
    },
    // 设置全选
    setAllChecked (state, businessId) {
      if (state.cartInfo[businessId]) {
        for (const id in state.cartInfo[businessId]) {
          state.cartInfo[businessId][id].checked = true
        }
      }
    },
    // 取消全选
    cancelAllChecked (state, businessId) {
      if (state.cartInfo[businessId]) {
        for (const id in state.cartInfo[businessId]) {
          state.cartInfo[businessId][id].checked = false
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
