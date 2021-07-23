<template>
<div class="tag__wrapper">
  <span class="tag__item" v-for="(item, index) in list" :key="index">{{ item.value }}</span>
  <!-- <van-tag class="tag__item" round type="primary" text-color="#fff" color="rgb(26,166,232)" v-for="(item, index) in list" :key="index">{{ item.value }}</van-tag> -->
</div>
</template>

<script>
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
  }
}
</script>

<style lang="scss" scoped>
.tag__wrapper {
  display: flex;
  justify-content: space-around;
  padding-bottom: .05rem;
  .tag__item {
    padding: .05rem .1rem;
    background: rgba(0,0,0, .1);
    color: #fff;
    border-radius: .2rem;
    box-sizing: border-box;
    text-align: center;
    font-size: .12rem;
  }
}
</style>
