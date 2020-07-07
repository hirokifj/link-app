<template>
  <div class="page-wrapper">
    <main class="main">
      <TheHeader />
      <div class="multi-container">
        <div class="side">
          <TheSidebar />
        </div>
        <div class="content u-bg-gray">
          <Nuxt />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import TheHeader from '../components/layout/TheHeader'
import TheSidebar from '../components/layout/TheSidebar'

export default {
  components: {
    TheHeader,
    TheSidebar,
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

.page-wrapper > .main {
  flex-grow: 1;
}

.multi-container {
  display: flex;
  width: 100%;
  height: calc(100% - 60px);
}

.multi-container > .side {
  flex: 0 0 240px;
  border-right: 1px solid $color-border-gray;
}

.multi-container > .content {
  flex: 0 0 calc(100% - 240px);
}
</style>
