<template>
  <div class="myorder">
    <div class="myorder__header">我的订单</div>
    <div class="myorder__content">
      <OrderItem :orderInfo="orderInfo" />
    </div>
    <Docker :current-index="2" />
  </div>
</template>

<script>
import Docker from '../../components/docker/Docker'
import OrderItem from './OrderItem'
import Request from '../../api/request'
import { reactive } from 'vue'

const getOrderListEffect = (orderInfo) => {
  const getOrderList = async () => {
    const res = await Request.get('/v1/get_order_list')
    if (res.data.code === 0) {
      orderInfo.list = res.data.list
    }
  }
  getOrderList()
}
export default {
  name: 'MyOrderList',
  setup () {
    const orderInfo = reactive({ list: [] })
    getOrderListEffect(orderInfo)
    return { orderInfo }
  },
  components: {
    Docker,
    OrderItem
  }
}
</script>

<style lang="scss" scoped>
.myorder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eee;
  &__header {
    line-height: .4rem;
    text-align: center;
    background: #fff;
  }
  &__content {
    padding: .1rem;
    border-radius: .4rem;
    overflow: hidden;
  }
}
</style>
