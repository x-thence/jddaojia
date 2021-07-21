<template>
  <div class="order__item" v-for="item in list" :key="item.shopName">
    <div class="order__item__header">
      <span class="order__item__header__title">{{ item.shopName }}</span>
      <span class="order__item__header__status">{{ item.isCancel ? '已取消' : '已支付' }}</span>
    </div>
    <div class="order__item__content">
      <div class="order__item__content__imgs">
        <div class="order__item__content__imgs__main" v-for="(subItem, subIndex) in item.products" :key="subIndex">
          <img :src="subItem.imgUrl" alt="">
          <span>x {{ subItem?.count || '' }}</span>

        </div>
      </div>
      <div class="order__item__content__total">
        <span>共{{ getTotalInfo(item)?.count || '' }}件</span>
        <p>￥{{ getTotalInfo(item)?.totalPrice || '' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue'
const getTotalInfo = (orderItem) => {
  let count = 0
  let totalPrice = 0
  orderItem.products.forEach((ele) => {
    count += ele.count
    totalPrice += ele.count * ele.price
  })
  totalPrice = totalPrice.toFixed(2)
  return { count, totalPrice }
}

export default {
  name: 'OrderItem',
  props: ['orderInfo'],
  setup (props) {
    const { list } = toRefs(props.orderInfo)
    return { list, getTotalInfo }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/variable.scss';
.order__item {
  display: flex;
  flex-direction: column;
  height: 1rem;
  padding: .05rem;
  background: $bgColorWhite;
  border-bottom: .01rem solid #eee;
  &__header {
    display: flex;
    line-height: .3rem;
    &__title {
      font-size: .16rem;
      flex: 1;
    }
    &__status {
      width: 1rem;
      text-align: right;
      color: $fontColor6
    }
  }
  &__content {
    display: flex;
    &__imgs {
      flex: 1;
      display: flex;
      &__main {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: .55rem;
          height: .55rem;
          margin-right: .1rem;
        };
        span {
          color: #ccc;
        }
      }
    }
    &__total {
      width: .8rem;
      height: .8rem;;
      position: relative;
      span {
        position: absolute;
        right: 0;
        display: inline-block;
        margin-top: .1rem;
        color: $fontColor6;
      }
      p {
        position: absolute;
        right: 0;
        bottom: 0;
        color: $priceColor;
        font-size: .18rem;
      }
    }
  }
}
</style>
