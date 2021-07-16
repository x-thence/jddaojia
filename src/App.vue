<template>
<div>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</div>
</template>
<script>
export default {
  name: 'Vue',
  components: {
  }
}
</script>
<style lang="scss">
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: .5rem;
}
</style>
