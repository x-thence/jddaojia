<template>
  <div class="merchant__wrapper">
    <div class="merchant__item" v-for="item in merchantList" :key="item.title" @click="showMerchantDetail(item)">
      <img class="logo" :src="item.imgUrl" :alt="item.title">
      <div class="item__text__wrapper">
        <span class="title">{{ item.title }}</span>
        <van-rate v-model="item.rateValue" void-icon="star" allow-half size="15" color="#ffd21e" />
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
      .title {
        font-size: .16rem;
        font-weight: bold;
      }
      .price__text {
        padding-top: .1rem;
        color: #666;
      }
      .desc {
        color: #666;
        font-size: .14rem;
      }
    }
  }
}
</style>
