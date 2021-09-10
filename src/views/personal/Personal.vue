<template>
  <div class="personal">
    <div class="personal__header">个人中心</div>
    <div class="personal__avtar">
      <img src="@/assets/images/user.png" alt="头像">
    </div>
    <docker :currentIndex="3" />
  </div>
</template>

<script>
import Docker from '../../components/docker/Docker'
export default {
  name: 'Personal',
  components: { Docker }
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
    background: #fff;
  }
  &__avtar {
    width: .8rem;
    height: .8rem;
    margin: auto;
    img {
      width: 100%;
    }
  }
}
</style>
