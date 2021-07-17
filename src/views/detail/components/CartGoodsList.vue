<template>
  <div class="cartlist__wrapper">
    <div class="header">
      <!-- <van-checkbox v-model="checked">全选(已选2件)</van-checkbox> -->
      <div class="clear">
        <span>清空购物车</span>
      </div>
    </div>
    <div v-if="list.length" class="content">
      <template v-for="item in list" :key="item.imgurl">
        <div v-if="item.count" class="goods__item">
          <img :src="item.imgUrl" alt="">
          <div class="text__wrapper">
            <span class="name">{{ item.name }}</span>
            <p>{{ item.desc }}</p>
            <span class="price">￥{{ item.price}}</span>
          </div>
          <div class="count__wrapper">
          <span class="icon" @click="handleChangeCount('minus', item)">
            <van-icon color="icon" name="minus" />
          </span>
            <span class="count">{{ item.count }}</span>
            <span class="icon" @click="handleChangeCount('plus', item)">
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
// import { reactive, toRefs } from 'vue'
import { storeEffect } from './common'

// 计算当前商家被添加进购物车的商品
const showProductsEffect = () => {
  const store = useStore()
  const route = useRoute()
  const businessId = route.params.id
  const list = []
  const data = store.state.cartInfo[businessId]
  // 商户id不存在直接return
  if (!businessId) {
    return
  }
  Object.keys(data).forEach((productId) => {
    if (data[productId].count > 0) {
      list.push(data[productId])
    }
  })
  return list
}
export default {
  name: 'CartGoodsList',
  setup () {
    const { handleChangeCount } = storeEffect()
    const list = showProductsEffect()
    return { handleChangeCount, list }
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
  background: #fff;
  .header {
    display: flex;
    justify-items: center;
    justify-content: space-around;
    margin-bottom: .1rem;
    padding: .1rem;
    .clear {
      flex: 1;
      text-align: right;
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
