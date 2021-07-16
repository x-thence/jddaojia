<template>
  <div class="cartlist__wrapper">
    <div class="header">
      <van-checkbox v-model="checked">全选(已选2件)</van-checkbox>
      <div class="clear">
        <span>清空购物车</span>
      </div>
    </div>
    <div class="content">
      <div class="goods__item" v-for="item in list" :key="item">
        <img :src="item.imgUrl" alt="">
        <div class="text__wrapper">
          <span class="name">{{ item.name }}</span>
          <p>{{ item.desc }}</p>
          <span class="price">￥{{ item.price}}</span>
        </div>
        <div class="count__wrapper">
        <span class="icon" @click="handleChangeCount('minus', item)">
          <van-icon color="icon" name="minus" />
        </span>
          <span class="count">{{ item.count }}</span>
          <span class="icon" @click="handleChangeCount('plus', item)">
          <van-icon name="plus" />
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
export default {
  name: 'CartGoodsList',
  setup () {
    const store = useStore()
    const route = useRoute()
    const data = reactive({ list: [] })
    const businessId = route.params.id
    if (store.state.cartInfo[businessId]) {
      const goods = Object.keys(store.state.cartInfo[businessId])
      goods.forEach((ele) => {
        data.list.push(store.state.cartInfo[businessId][ele])
      })
    }
    const { list } = toRefs(data)
    return { list }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/style/variable.scss";
@import '../../../assets/style/mixins.scss';

.cartlist__wrapper {
  position: fixed;
  bottom: .5rem;
  width: 100%;
  height: 50%;
  box-sizing: border-box;
  z-index: 2;
  background: #fff;
  .header {
    display: flex;
    justify-items: center;
    justify-content: space-around;
    margin-bottom: .1rem;
    padding: .1rem;
    .clear {
      flex: 1;
      text-align: right;
    }
  }
  .content {
    padding: .1rem;
    display: flex;
    overflow-y: scroll;
    height: 85%;
    box-sizing: border-box;
    flex-wrap: wrap;
    .goods__item {
      display: flex;
      width: 100%;
      height: .7rem;
      position: relative;
      //padding: .1rem 0;
      img {
        width: .7rem;
        height: .7rem;
      }
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
        bottom: .25rem;
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
