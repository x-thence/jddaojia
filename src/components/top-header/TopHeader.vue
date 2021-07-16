<template>
  <div class="wrap">
    <div class="header__wrapper">
      <div class="item header__left">
        <div class="iconfont">&#xe606;</div>
        <span class="text__address">{{address}}</span>
        <div class="iconfont">&#xe731;</div>
      </div>
      <div class="item header__wrapper__search">
        <i class="iconfont icon__search">&#xe624;</i>
        <input type="text" placeholder="大米">
        <i class="iconfont icon__talk">&#xe654;</i>
      </div>
    </div>
    <tag-list></tag-list>
  </div>

</template>

<script>
import TagList from '../tag-list/TagList'
export default {
  name: 'TopHeader',
  data () {
    return {
      address: '深圳市民中心'
    }
  },
  components: {
    TagList
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixins.scss";
.wrap {
  position: fixed;
  width: 100%;
  z-index: 99;
  background: rgb(28, 172, 234);
  .header__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: .45rem;
    box-sizing: border-box;
    .item {
      display: flex;
      justify-items: center;
      font-size: .18rem;
      color: #fff;
      .iconfont {
        font-size: .2rem;
      }
      .text__address {
        max-width: 1.5rem;
        font-size: .16rem;
        font-weight: bold;
        line-height: .22rem;
        @include ellipsis;
      }
    }

    .header__wrapper__search {
      flex:1;
      justify-content: space-between;
      border-radius: .64rem;
      overflow: hidden;
      .iconfont {
        line-height: .28rem;
      }
      .icon__search {
        position: relative;
        left: 10%;
        color: #c9c9c9;
      }
      .icon__talk {
        padding: 0 .05rem;
      }
      input {
        width: 80%;
        border-radius: .64rem;
        padding-left: 11%;
        border: none;
        outline: none;
        height: .28rem;
        font-size: .14rem;
        color: #666;
      }
    }
  }
}

</style>
