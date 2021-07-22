<template>
  <div class="merchant__wrapper">
    <div class="merchant__item" v-for="item in merchantList" :key="item.title" @click="showMerchantDetail(item)">
      <img class="logo" :src="item.imgUrl" :alt="item.title">
      <div class="item__text__wrapper">
        <span class="title">{{ item.title }}</span>
        <div class="point__wrapper">
          <i  v-for="icon in item.rateValue" :key="icon" class="iconfont">&#xe647;</i>
        </div>
        <span class="price__text">{{ item.priceText }}</span>
        <p class="desc">{{item.desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Merchant',
  props: ['merchantList'],
  setup () {
    const router = useRouter()
    const showMerchantDetail = (item) => {
      router.push(`/detail/${item.id}`)
    }
    return { showMerchantDetail }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/variable.scss';

.merchant__wrapper {
  width: 95%;
  margin: auto;
  .merchant__item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .logo {
      width: .6rem;
      height: .6rem;
    }
    .item__text__wrapper {
      display: flex;
      flex:1;
      box-sizing: border-box;
      padding-left: .3rem;
      flex-direction: column;
      font-size: .12rem;
      .point__wrapper .iconfont {
        position: relative;
        top: .02rem;
        margin-right: .02rem;
        font-size: .14rem;
        color: $orangeColor;
      }
      .title {
        font-size: .16rem;
        font-weight: bold;
      }
      .price__text {
        padding-top: .1rem;
        color: $fontColor6;
      }
      .desc {
        color: $fontColor6;
        font-size: .13rem;
      }
    }
  }
}
</style>
