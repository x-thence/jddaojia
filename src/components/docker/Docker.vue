<template>
<div class="docker__wrap">
  <div
    class="docker__item"
    :class="item.isActive ? 'docker__item--active' : '' "
    @click="switchTab(item)"
    v-for="item in dockerList"
    :key="item.text">
    <div class="iconfont" v-html="item.icon" />
    <span>{{ item.text }}</span>
  </div>
</div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Docker',
  setup () {
    const router = useRouter()
    const dockerList = [
      { icon: '&#xe602;', text: '首页', path: '/', isActive: true },
      { icon: '&#xe600;', text: '购物车', isActive: false },
      { icon: '&#xe634;', text: '订单', isActive: false },
      { icon: '&#xe601;', text: '我的', path: '/login', isActive: false }
    ]
    const switchTab = (item) => {
      router.push(item.path)
      item.isActive = true
    }
    return { dockerList, switchTab }
  }
}
</script>

<style lang="scss" scoped>
.docker__wrap {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: .5rem;
  background: #fff;
  .docker__item {
    flex: 1;
    padding-top: .05rem;
    text-align: center;
    box-sizing: border-box;
    &--active {
      color: rgb(28, 172, 234);
    }
    .iconfont {
      font-size: .24rem;
    }
  }
}
</style>
