<template>
  <div class="page-wrapper _bg-gray">
    <div class="header">
      <TheHeader />
    </div>
    <main class="main">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import TheHeader from '../components/layout/TheHeader'

export default {
  components: {
    TheHeader,
  },
}
</script>

<style lang="scss">
@import '../assets/scss/base/_entry.scss';

.page-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 0;
  min-height: 100vh;
}

.page-wrapper > .header {
  flex-shrink: 0;
}

.page-wrapper > .main {
  flex-grow: 1;
}
</style>
