<template>
  <nuxt-link class="text-link" :to="to"><slot></slot></nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.text-link {
  font-size: 14px;
  font-weight: bold;
  color: $color-secondary;
}
</style>
