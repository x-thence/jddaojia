<template>
  <div class="product">
    <div class="goods__item">
      <img :src="data.imgUrl" alt="">
      <div class="text__wrapper">
        <span class="name">{{ data.name }}</span>
        <p>{{ data.desc }}</p>
        <span class="price">￥{{ data.price}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: ['data']
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/variable.scss';
@import '../../assets/style/mixins.scss';
.product {
  .goods__item {
      display: flex;
      position: relative;
      padding: .1rem 0;
      img {
        width: .8rem;
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
    }
}
</style>
