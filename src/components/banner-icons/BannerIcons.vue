<template>
<div class="icons__wrapper">
  <van-swipe class="my-swipe" indicator-color="rgb(28, 172, 234)">
    <van-swipe-item class="item" v-for="(item, index) in swipeItems.length" :key="item">
      <div class="icon__outter">
        <div class="icon__item" v-for="value in swipeItems[index]" :key="value">
          <img class="img" :src="value.imgUrl" />
          <span class="text">{{ value.text }}</span>
        </div>
      </div>
    </van-swipe-item>
  </van-swipe>
</div>
</template>

<script>
import { reactive, computed } from 'vue'
import Request from '../../api/request'
// 获取iconList列表
const getIcons = async (iconsInfo) => {
  const res = await Request.get('/v1/get_banner_list')
  if (res?.data?.code === 0) {
    iconsInfo.iconList = res.data.iconList
  }
}

export default {
  name: 'BannerIcons',
  setup () {
    const iconsInfo = reactive({ iconList: [] })
    getIcons(iconsInfo)
    // 分割iconList
    const swipeItems = computed(() => {
      const count = Math.ceil(iconsInfo.iconList.length / 10)
      // 把iconList切割成10个一组的数组
      const arr = []
      for (let i = 0; i < count; i++) {
        arr[i] = iconsInfo.iconList.slice(i * 10, (i + 1) * 10)
      }
      return arr
    })
    return { swipeItems }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/variable.scss";
.icons__wrapper {
  .item {
    min-height: 1.7rem;
    .icon__outter {
      display: flex;
      flex-wrap: wrap;
      margin-top: .1rem;
      .icon__item {
        display: flex;
        flex-direction: column;
        padding-bottom: .1rem;
        box-sizing: border-box;
        align-items: center;
        width: 20%;
        color: #666;
        font-size: .12rem;
        img {
          width: 60%;
        }
        .text {
          padding-top: .05rem;
        }
      }
    }
  }
  ::v-deep .van-swipe__indicators{
    position: absolute;
    bottom: .06rem !important;
  }
}

</style>
