<template>
  <button class="app-btn" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.app-btn {
  display: inline-block;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  outline: none;

  &.-big {
    padding: 22px 20px;
    font-size: 16px;
  }

  &.-full {
    width: 100%;
  }

  &.-primary {
    color: $color-white;
    background-color: $color-primary;
  }
}
</style>
