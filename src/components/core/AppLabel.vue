<template>
  <label v-bind="$attrs" class="app-label">{{ text }}</label>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.app-label {
  display: block;
  font-weight: bold;
  color: $color-secondary;
}
</style>
