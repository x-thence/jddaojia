<template>
  <div class="">
    个人中心
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

</style>
