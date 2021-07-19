<template>
  <div class="docker__wrap">
    <div
      @click="switchTab(item)"
      v-for="item in menu.dockerList"
      :key="item.text"
      :class="{ 'isActive': item.isActive, 'docker__item': true }"
    >
      <div class="iconfont" v-html="item.icon" />
      <span>{{ item.text }}</span>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

export default {
  name: 'Docker',
  setup () {
    const router = useRouter()
    const menu = reactive({ dockerList: [] })
    menu.dockerList = [
      { icon: '&#xe602;', text: '首页', path: '/', isActive: true },
      { icon: '&#xe600;', text: '购物车', isActive: false },
      { icon: '&#xe634;', text: '订单', isActive: false },
      { icon: '&#xe601;', text: '我的', path: '/personal', isActive: false }
    ]
    const switchTab = (item) => {
      for (const ele of menu.dockerList) {
        if (item.text === ele.text) {
          item.isActive = true
          ele.isActive = true
        } else {
          ele.isActive = false
        }
      }
      router.push(item.path)
    }
    return { menu, switchTab }
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
  height: 0.5rem;
  background: #fff;
  .docker__item {
    flex: 1;
    padding-top: 0.05rem;
    text-align: center;
    box-sizing: border-box;
    .iconfont {
      font-size: 0.24rem;
    }
  }
  .isActive {
    color: rgb(28, 172, 234) !important;
  }
}
</style>
