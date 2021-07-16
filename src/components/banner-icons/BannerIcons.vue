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
import { Swipe, SwipeItem } from 'vant'
export default {
  name: 'BannerIcons',
  data () {
    return {
      iconList: [{
        text: '超市',
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/152758/37/12989/8884/5fefa67cE1244a6ad/6495bed0f22bbde8.png'
      }, {
        text: '生鲜果蔬',
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/167276/11/20272/10444/60818dd4Efd444996/b431a72066c3c32a.png'
      }, {
        text: '乳制品',
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/170117/14/17884/8232/6073c058E860b7549/4608bb5de6206c3a.png'
      }, {
        text: '个洗家清',
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/175687/6/5265/8891/607cebf4E00fa2549/bffe07ca1dff3a62.png'
      }, {
        text: '粮油副食',
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/188383/30/7677/9386/60c308b2E2b4b259f/45d803a575430c43.png'
      }, {
        text: '送药上门',
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/188174/11/5016/11161/60ade730E7623640d/f7edff109d18dd3c.png'
      }, {
        text: '休闲食品',
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/191096/7/59/9428/608623ebE86bd6017/a5126fa69bf0ce19.png'
      }, {
        text: '酒水饮料',
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/173730/23/1250/10393/60642179E8ac04847/266e4ae9b63903dc.png'
      }, {
        text: '美妆护肤',
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/184985/2/8411/9355/60c185fdE41f7b5d3/2225851aa2899ede.png'
      }, {
        text: '手机家电',
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/159406/27/1106/9009/5fefa7e5E63f2e1c7/060bb24dfd00503d.png'
      }, {
        text: '母婴',
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/157553/6/17409/9501/606d23fdE45fb5f3d/3f9dee8a2b763a57.png'
      }, {
        text: '家居时尚',
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/166925/40/426/8978/5fefa762E72873d6a/29717e548c12ca36.png'
      }, {
        text: '烘焙蛋糕',
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/158704/3/1167/10639/5fefa77cE72b13dff/9dde706f7245ca15.png'
      }, {
        text: '鲜花礼品',
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/156893/15/3772/10566/5fefa71fEef5f1440/d0345e42d7b32a41.png'
      }, {
        text: '平台公示',
        imgUrl: 'https://img30.360buyimg.com/mobilecms/jfs/t1/169836/11/438/9541/5fefa9c2E3a698661/6be42a0c5f195166.png'
      }]
    }
  },
  computed: {
    swipeItems () {
      const count = Math.ceil(this.iconList.length / 10)
      // 把iconList切割成10个一组的数组
      const arr = []
      for (let i = 0; i < count; i++) {
        arr[i] = this.iconList.slice(i * 10, (i + 1) * 10)
      }
      return arr
    }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
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
