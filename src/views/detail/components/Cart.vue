<template>
<div class="cart__wrapper">
  <div class="left">
    <div v-show="!hasCount" class="block">
      <div class="iconfont icon__cart_empty">&#xe733;</div>
      <span class="empty">购物车是空的</span>
    </div>
    <div v-show="hasCount" class="block">
      <van-badge :content="cartCount" @click="showCartInfo">
        <div class="iconfont icon__cart_has" >&#xe732;</div>
      </van-badge>
      <span class="price">￥{{ totalPrice }}</span>
    </div>
  </div>
  <div class="right">
    <span :class="{pay: true, payable: hasCount}" @click="handleToSettle">去结算</span>
  </div>
</div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
export default {
  name: 'Cart',
  props: {
    hasCount: Boolean,
    cartCount: Number,
    totalPrice: String
  },
  setup (props, context) {
    const router = useRouter()
    const route = useRoute()
    const { emit } = context
    const showCartInfo = () => {
      emit('showCartGoods')
    }
    const handleToSettle = () => {
      const hasCount = props.hasCount
      if (hasCount) {
        const shopId = route.params.id
        router.push(`/order?shopId=${shopId}`)
      }
    }
    return { showCartInfo, handleToSettle }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/style/variable.scss";
.cart__wrapper {
  position: fixed;
  display: flex;
  left: 0;
  z-index: 19;
  bottom: 0;
  width: 100%;
  height: .5rem;
  overflow: hidden;
  .left {
    display: flex;
    align-items: center;
    .block{
      display: flex;
      align-items: center;
    }
    .hasCount {
      transform: translate(.1rem, 28%) !important;
    }
    .iconfont {
      font-size: .3rem;
      margin-left: .15rem;
    }
    .icon__cart_empty, .empty {
      color: $fontColor6;
    }
    .icon__cart_has {
      color: $baseGreenColor;
    }
    .empty {
      margin-left: .05rem;
    }
    .price {
      margin-left: .05rem;
      color: $priceColor;
      font-size: .2rem;
    }
  }
  .right {
    flex: 1;
    position: relative;
    .pay{
      position: absolute;
      right: .2rem;
      top: 50%;
      transform: translate(0, -50%);
      display: inline-block;
      padding: .1rem .25rem;
      border-radius: .3rem;
      color: $bgColorWhite;
    }
    .payable{
      background:$baseGreenColor !important;
    }
  }
}
</style>
