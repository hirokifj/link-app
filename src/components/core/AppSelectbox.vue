<template>
  <div class="app-selectbox">
    <select ref="select" v-bind="$attrs" class="selectbox" @change="onChange">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        :disabled="option.disabled"
        >{{ option.label }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  // props未指定の属性が、自動でルート要素に付与されるのを防ぐ。
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    // マウント時はchangeイベントが起こってないので、親側で値が空になってしまう。
    // それを防ぐため、値がない場合はoptionsの一つ目を親に返す。
    if (!this.$refs.select.value) {
      this.$emit('input', this.options[0].value)
    }
  },
  methods: {
    onChange(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.app-selectbox {
  position: relative;
  z-index: 0;

  &::before {
    position: absolute;
    top: 42%;
    right: 5%;
    display: block;
    width: 10px;
    height: 10px;
    pointer-events: none;
    content: '';
    border-right: $color-primary 2px solid;
    border-bottom: $color-primary 2px solid;
    transform: rotate(45deg) translateY(-50%);
  }
}

.app-selectbox > .selectbox {
  display: block;
  width: 100%;
  padding: 18px;
  font-size: 16px;
  color: $color-gray-dark-1;
  background-color: $color-gray-light-4;
  border: 2px solid transparent;
  border-radius: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:focus {
    border-bottom: 2px solid $color-primary;
    outline: none;
  }
}
</style>
