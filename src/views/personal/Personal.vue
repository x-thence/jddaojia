<template>
  <div class="personal">
    <div class="personal__header">个人中心</div>
    <div class="personal__avtar">
      <img src="@/assets/images/user.png" alt="头像">
    </div>
    <div class="personal__content">
      <ul class="personal__content__ul">
        <li v-for="item of list" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
    <docker :currentIndex="3" />
  </div>
</template>

<script>
import Docker from '../../components/docker/Docker'
export default {
  name: 'Personal',
  components: { Docker },
  setup () {
    const list = [{
      id: Math.random(),
      name: '我的钱包'
    }, {
      id: Math.random(),
      name: '我的关注'
    }, {
      id: Math.random(),
      name: '我的地址'
    }, {
      id: Math.random(),
      name: '省钱秘笈'
    }, {
      id: Math.random(),
      name: '我的评价'
    }, {
      id: Math.random(),
      name: '商家会员'
    }, {
      id: Math.random(),
      name: '售后退款'
    }, {
      id: Math.random(),
      name: 'V+会员'
    }, {
      id: Math.random(),
      name: '客服与帮助'
    }]
    return { list }
  }
}
</script>

<style lang="scss" scoped>
.personal{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eee;
  &__header {
    line-height: .4rem;
    text-align: center;
    // background: #fff;
  }
  &__avtar {
    width: .8rem;
    height: .8rem;
    margin: .2rem auto;
    img {
      width: 100%;
    }
  }
  &__content {
    margin: 0 .2rem;
    // background: #fff;
    li {
      line-height: .4rem;
      border-bottom: 1px solid #fff;
    }
  }
}
</style>
