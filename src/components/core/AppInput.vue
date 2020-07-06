<template>
  <input v-bind="$attrs" class="app-input" @input="onInput" />
</template>

<script>
export default {
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.app-input {
  display: block;
  width: 100%;
  padding: 18px;
  font-size: 16px;
  color: $color-gray-dark-1;
  background-color: $color-gray-light-4;
  border: 2px solid transparent;
  border-radius: 5px;

  &:focus {
    border-bottom: 2px solid $color-primary;
    outline: none;
  }
}
</style>
