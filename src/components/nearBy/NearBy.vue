<template>
<div class="nearby__wrapper">
  <span class="near__title">附近商家</span>
  <Merchant :merchant-list="nearBys" />
  <van-divider>我也是有底线的</van-divider>
</div>
</template>

<script>
import Merchant from '../merchant/Merchant'
export default {
  name: 'NearBy',
  components: { Merchant },
  setup () {
    const nearBys = [
      {
        id: '01',
        imgUrl: 'https://img30.360buyimg.com/vendersettle/s120x120_jfs/t1/104763/10/17095/195874/5e83ecc2Ec39ed4d9/aaf4060a10ac1cc5.png',
        title: '沃尔玛-福星店',
        rateValue: 4.5,
        priceText: '起送¥0  运费¥10',
        desc: '不含运费满119元，返89-12券/限量'
      },
      {
        id: '02',
        imgUrl: 'https://img30.360buyimg.com/vendersettle/s120x120_jfs/t1/164976/33/8309/6745/6062d823Ec5b853b7/8316462bae32fc47.png',
        title: '永旺-新洲店',
        rateValue: 4,
        priceText: '起送¥0  运费¥10',
        desc: '不含运费满119元，返89-12券/限量'
      },
      {
        id: '03',
        imgUrl: 'https://img30.360buyimg.com/vendersettle/s120x120_jfs/t17815/10/1165301958/17857/34565043/5abdf45bNd33a42d1.jpg',
        title: '山姆会员商店(华强)',
        rateValue: 4.5,
        priceText: '起送¥0  运费¥10',
        desc: '不含运费满119元，返89-12券/限量'
      },
      {
        id: '04',
        imgUrl: 'https://img30.360buyimg.com/vendersettle/s120x120_jfs/t1/90010/33/7051/78456/5df88610E16c5f1d8/f7474a271166c9bc.jpg',
        title: '华润万家-益田店',
        rateValue: 5,
        priceText: '起送¥0  运费¥10',
        desc: '不含运费满119元，返89-12券/限量'
      },
      {
        id: '05',
        imgUrl: 'https://img30.360buyimg.com/vendersettle/s120x120_jfs/t1/88008/39/15296/65542/5e6fbf28E9e091c31/2950b23f68fa49f1.jpg',
        title: 'Ole精品超市（深业上城店）',
        rateValue: 3.5,
        priceText: '起送¥0  运费¥10',
        desc: '不含运费满119元，返89-12券/限量'
      }
    ]
    return { nearBys }
  }
}
</script>

<style lang="scss" scoped>
.nearby__wrapper {
  width: 95%;
  margin: auto;
  .near__title {
    display: inline-block;
    padding: .1rem 0;
    font-size: .16rem;
  }
}
</style>
