<template>
<div class="tag__wrapper">
  <van-tag class="tag__item" round type="primary" text-color="#fff" color="rgb(26,166,232)" v-for="(item, index) in list" :key="index">{{ item.value }}</van-tag>
</div>
</template>

<script>
import { Tag } from 'vant'
export default {
  name: 'TagList',
  data () {
    return {
      list: [{
        value: '牛奶'
      }, {
        value: '鸡蛋'
      }, {
        value: '矿泉水'
      }, {
        value: '食用油'
      }, {
        value: '酸奶'
      }, {
        value: '面包'
      }, {
        value: '盐'
      }]
    }
  },
  components: {
    [Tag.name]: Tag
  }
}
</script>

<style lang="scss" scoped>
.tag__wrapper {
  display: flex;
  justify-content: space-around;
  padding-bottom: .05rem;
  .tag__item {
    display: flex;
    justify-content: center;
    text-align: right;
    box-sizing: border-box;
    text-align: center;
    font-size: .14rem;
    padding: .05rem .1rem;
  }
}
</style>
