<template>
<div class="weal__wrapper">
  <div class="img__list">
    <img class="img__item" v-for="item in wealList" :key="item" :src="item.imgUrl" alt="" />
  </div>
  <img class="coupon__img" :src="coupon" alt="新人福利">
</div>
</template>

<script>
export default {
  name: 'Weal',
  data () {
    return {
      coupon: 'https://imgcps.jd.com/xappcms/none/none/none/5ruhNjnlj6_nlKg/MTU/5ruhMznlj6_nlKg/MTI/5ruhMznlhYPlj6_nlKg/MTU/t-60d31bc26ea6c13e853ea2f9/2d03d623.png',
      wealList: [{
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/191113/17/4993/3698/60ae420eEd6708ffc/0165e587559fdd60.png'
      }, {
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/178375/11/6447/5014/60b25873Ea4007b44/24009c1abbe6b3ae.png'
      }, {
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/193101/7/5064/4665/60ae42a4Efaa78935/6eb0073871219b9e.png'
      }, {
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/174098/8/17235/5154/60da7f2bE516fda28/54606248b8e04bb5.png'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.weal__wrapper {
  width: 95%;
  margin: auto;
  .img__list {
    display: flex;
    border-radius: .3rem;
    overflow: hidden;
    background: #fff;
    .img__item {
      width: 25%;
    }
  }
  .coupon__img {
    width: 100%;
  }
}
</style>
