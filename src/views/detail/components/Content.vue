<template>
<div class="content">
  <div class="content__sidebar">
    <div :class="{nav__item: true, is__active: item.tab === currentTab }" v-for="item in navList" :key="item" @click="handleTabClick(item.tab)">{{ item.title }}</div>
  </div>
  <div class="content__goods">
    <div class="goods__item" v-for="item in data" :key="item">
      <img :src="item.imgUrl" alt="">
      <div class="text__wrapper">
        <span class="name">{{ item.name }}</span>
        <p>{{ item.desc }}</p>
        <span class="price">￥{{ item.price}}</span>
      </div>
      <div class="count__wrapper">
        <span class="icon" @click="() => handleChangeCount('minus', item)">
          <van-icon color="icon" name="minus" />
        </span>
        <span class="count">{{ cartInfo?.[businessId]?.[item.id]?.count || 0 }}</span>
        <span class="icon" @click="() => handleChangeCount('plus', item)">
          <van-icon name="plus" />
        </span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { storeEffect } from './common'
import { useStore } from 'vuex'
// tab列表
const navList = [{
  title: '时令蔬菜',
  tab: 'vegetables',
  isActive: false
}, {
  title: '新鲜水果',
  tab: 'fruit'
}, {
  title: '肉蛋家禽',
  tab: 'egg'
}, {
  title: '水产海鲜',
  tab: 'aquatic'
}, {
  title: '熟食快餐',
  tab: 'fast'
}]
// 获取商品数据的逻辑
const getBusinessDataEffect = (tab) => {
  const route = useRoute()
  const goods = reactive({ data: {} })
  const getBusinessData = async (tab) => {
    const businessId = route.params.id
    if (businessId && tab) {
      const res = await axios.get(`https://www.fastmock.site/mock/eac3f83516b2299ea36c1e78f6f09ffa/mock/api/v1/get_business_data?businessId=${businessId}&tab=${tab.value}`)
      if (res.data.code === 0) {
        goods.data = res?.data?.data
      } else {
        return []
      }
    }
  }
  // tab变更以及首次渲染加载数据
  watchEffect(() => {
    getBusinessData(tab)
  })
  const { data } = toRefs(goods)
  return { data }
}
// 切换tab获取相应商品数据
const tabEffect = () => {
  const currentTab = ref('egg')
  const handleTabClick = async (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}
// 获取购物车
const useCartEffect = () => {
  const store = useStore()
  const { cartInfo } = toRefs(store.state)
  return { cartInfo }
}
export default {
  name: 'Content',
  setup () {
    const { currentTab, handleTabClick } = tabEffect()
    const { data } = getBusinessDataEffect(currentTab)
    const { handleChangeCount } = storeEffect()
    const route = useRoute()
    const businessId = route.params.id
    const { cartInfo } = useCartEffect()
    return { navList, currentTab, data, handleTabClick, handleChangeCount, cartInfo, businessId }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/style/variable.scss';
@import '../../../assets/style/mixins.scss';

.content {
  display: flex;
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: aquamarine;

  &__sidebar {
    width: .9rem;
    background: rgb(244,244,244);
    overflow-y: scroll;
    .nav__item{
      display: inline-block;
      width: 100%;
      height: .4rem;
      line-height: .4rem;
      text-align: center;
      color: #666;
    }
    .is__active {
      color: red;
      background: #fff;
    }
   }
  &__goods {
    flex: 1;
    background: #fff;
    padding-right: .1rem;
    overflow-x: hidden;
    overflow-y: scroll;
    img {
      width: .8rem;
    }
    .goods__item {
      display: flex;
      position: relative;
      padding: .1rem 0;
      .text__wrapper {
        .name {
          font-weight: bold;
          @include ellipsisMany;
        }
        p {
          color: $fontColor6;
          line-height: .2rem;
          margin: .05rem 0;
        }
        .price {
          color: $priceColor;
          font-size: .18rem;
        }
      }
      .count__wrapper {
        position: absolute;
        right: .01rem;
        bottom: .1rem;
        text-align: center;
        font-size: .16rem;
        color: $baseGreenColor;
        .icon {
          border: .01rem solid $baseGreenColor;
          border-radius: 50%;
          padding: .02rem;
        }
        .count {
          margin: 0 .1rem;
          line-height: .15rem;
          font-size: .16rem;
          color: $fontColor6;
        }
      }
    }
  }
}
</style>
