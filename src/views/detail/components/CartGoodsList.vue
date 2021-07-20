<template>
  <div class="cartlist__wrapper">
    <div class="header">
      <div class="icon__wrapper">
        <span>
          <i v-show="!isAllChecked" @click="setAllChecked" class="iconfont no-all-check-icon">&#xe6b2;</i>
          <i v-show="isAllChecked" @click="cancelAllChecked" class="iconfont all-check-icon">&#xe614;</i>
        </span>
        <span class="all__ckeck__text">全选(已选{{ checkedCount }}件)</span>
      </div>
      <div class="clear">
        <span @click="handleClearCart">
          <i class="iconfont">&#xe637;</i>
          <span class="clear__text">清空购物车</span>
        </span>
      </div>
    </div>
    <div v-if="list.length" class="content">
      <template v-for="item in list" :key="item.imgurl">
        <div v-if="item.count" class="goods__item">
          <van-checkbox v-model="item.checked" checked-color="rgb(53,217,96)"></van-checkbox>
          <img :src="item.imgUrl" alt="">
          <div class="text__wrapper">
            <span class="name">{{ item.name }}</span>
            <p>{{ item.desc }}</p>
            <span class="price">￥{{ item.price}}</span>
          </div>
          <div class="count__wrapper">
          <span class="icon" @click="handleChangeCount('minus', item, true)">
            <van-icon color="icon" name="minus" />
          </span>
            <span class="count">{{ item.count }}</span>
            <span class="icon" @click="handleChangeCount('plus', item, true)">
            <van-icon name="plus" />
          </span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { storeEffect, getProductListEffect } from './common'
// 判断是否全选
const isAllChecked = computed(() => {
  const store = useStore()
  const route = useRoute()
  const isAllChecked = ref(true)
  const businessId = route.params.id
  if (store.state.cartInfo[businessId]) {
    for (const key in store.state.cartInfo[businessId]) {
      const product = store.state.cartInfo[businessId][key]
      if (product.count > 0 && !product.checked) {
        isAllChecked.value = false
      }
    }
  }
  return isAllChecked.value
})
// 计算选中商品的数量
const checkedCount = computed(() => {
  const store = useStore()
  const route = useRoute()
  let total = 0
  const businessId = route.params.id
  if (store.state.cartInfo[businessId]) {
    for (const key in store.state.cartInfo[businessId]) {
      const product = store.state.cartInfo[businessId][key]
      if (product.count > 0 && product.checked) {
        total += 1
      }
    }
  }
  return total
})
// 全选的逻辑
const setAllCheckedEffect = (store, route) => {
  const setAllChecked = () => {
    const businessId = route.params.id
    store.commit('setAllChecked', businessId)
  }
  return { setAllChecked }
}
// 取消全选的逻辑
const cancelAllCheckedEffect = (store, route) => {
  const cancelAllChecked = () => {
    const businessId = route.params.id
    store.commit('cancelAllChecked', businessId)
  }
  return { cancelAllChecked }
}
// 清空购物车的逻辑
const handleClearCartEffect = (store, route) => {
  const handleClearCart = () => {
    const businessId = route.params.id
    store.commit('clearCurrentShopCart', businessId)
  }
  return { handleClearCart }
}

export default {
  name: 'CartGoodsList',
  setup () {
    const { handleChangeCount } = storeEffect()
    const store = useStore()
    const route = useRoute()
    const shopId = route.params.id
    const { handleClearCart } = handleClearCartEffect(store, route)
    const { setAllChecked } = setAllCheckedEffect(store, route)
    const { cancelAllChecked } = cancelAllCheckedEffect(store, route)
    const { list } = getProductListEffect(shopId)
    return { handleChangeCount, list, isAllChecked, checkedCount, handleClearCart, setAllChecked, cancelAllChecked }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/style/variable.scss";
@import '../../../assets/style/mixins.scss';

.cartlist__wrapper {
  position: fixed;
  bottom: .5rem;
  width: 100%;
  height: 50%;
  box-sizing: border-box;
  z-index: 2;
  background: $bgColorWhite;
  .header {
    display: flex;
    justify-items: center;
    justify-content: space-around;
    margin-bottom: .1rem;
    padding: .1rem;
    border-bottom: .01rem solid $colorGrey;
    .icon__wrapper {
      display: flex;
      align-items: center;
      .no-all-check-icon {
        color: $colorGrey;
        font-size: .22rem;
      }
      .all-check-icon {
        color: #4869f7;
        font-size: .22rem;
      }
      .all__ckeck__text {
        margin-left: .1rem;
      }
    }
    .clear {
      flex: 1;
      text-align: right;
      .clear__text {
        margin-left: .05rem;
      }
    }
  }
  .content {
    padding: .1rem;
    display: flex;
    overflow-y: scroll;
    max-height: 85%;
    box-sizing: border-box;
    flex-wrap: wrap;
    .goods__item {
      display: flex;
      width: 100%;
      height: .7rem;
      position: relative;
      img {
        width: .7rem;
        height: .7rem;
      }
      .text__wrapper {
        .name {
          font-weight: bold;
          @include ellipsisMany;
        }
        p {
          color: $fontColor6;
          line-height: .2rem;
          margin: .05rem 0;
        }
        .price {
          color: $priceColor;
          font-size: .18rem;
        }
      }
      .count__wrapper {
        position: absolute;
        right: .01rem;
        bottom: .25rem;
        text-align: center;
        font-size: .16rem;
        color: $baseGreenColor;
        .icon {
          border: .01rem solid $baseGreenColor;
          border-radius: 50%;
          padding: .02rem;
        }
        .count {
          margin: 0 .1rem;
          line-height: .15rem;
          font-size: .16rem;
          color: $fontColor6;
        }
      }
    }
  }
}
</style>
