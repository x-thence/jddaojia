import { createStore } from 'vuex'

export default createStore({
  state: {
    cartInfo: {}
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
          count: 1,
          price: item.price,
          imgUrl: item.imgUrl,
          desc: item.desc
        }
      } else {
        // 若已存在商家数据则判断购物车是否含有该商品的数据，有则+1，没有则进行初始化
        if (!businessCartInfo[item.id]) {
          businessCartInfo[item.id] = {
            count: 1,
            price: item.price,
            imgUrl: item.imgUrl,
            desc: item.desc
          }
        } else {
          businessCartInfo[item.id].count += 1
        }
      }
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
    }
  },
  actions: {
  },
  modules: {
  }
})
