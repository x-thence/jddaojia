<template>
  <div class="mycart">
    <div class="mycart__header">我的购物车</div>
    <Docker :current-index="1" />
  </div>
</template>

<script>
import Docker from '../../components/docker/Docker'

export default {
  name: 'Cart',
  components: {
    Docker
  }
}
</script>

<style lang="scss" scoped>
.mycart {
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
}
</style>
