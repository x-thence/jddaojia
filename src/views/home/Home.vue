<template>
<div class="home__wrapper">
  <top-header></top-header>
  <div class="main__wrapper">
    <banner-icons></banner-icons>
    <weal></weal>
    <near-by></near-by>
  </div>
  <docker :currentIndex="0"></docker>
</div>
</template>

<script>
import Docker from '../../components/docker/Docker'
import TopHeader from '@/components/top-header/TopHeader'
import BannerIcons from '@/components/banner-icons/BannerIcons'
import Weal from './components/Weal'
import NearBy from '../../components/nearBy/NearBy'
export default {
  name: 'Home',
  components: {
    Docker,
    TopHeader,
    BannerIcons,
    Weal,
    NearBy
  }
}
</script>

<style lang="scss" scoped>
.home__wrapper {
  background: #f7f7f7;
  padding-bottom: .5rem;
  .main__wrapper {
    padding-top: .7rem;
    overflow: hidden;
  }
}
</style>
