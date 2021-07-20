<template>
<div class="nearby__wrapper">
  <span class="near__title">附近商家</span>
  <Merchant :merchant-list="nearBys" />
  <van-divider>我也是有底线的</van-divider>
</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Request from '../../api/request'
import Merchant from '../merchant/Merchant'
export default {
  name: 'NearBy',
  components: { Merchant },
  setup () {
    // 获取附近商家列表
    const nearByInfo = reactive({ nearBys: [] })
    const getNearBys = async () => {
      const res = await Request.get('/v1/get_nearby_list')
      if (res.data.code === 0) {
        nearByInfo.nearBys = res.data.nearby_list
      }
    }
    getNearBys()
    const { nearBys } = toRefs(nearByInfo)
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
