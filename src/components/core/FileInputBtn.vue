<template>
  <div class="file-input-btn">
    <label for="profileimg" class="btn"><slot></slot></label>
    <input
      id="profileimg"
      ref="input"
      type="file"
      class="fileinput"
      v-bind="accept"
      @change="onFileChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    onlyImg: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    accept() {
      if (this.onlyImg) {
        return {
          accept: 'image/*',
        }
      } else {
        return {}
      }
    },
  },
  methods: {
    onFileChange(e) {
      // fileがない場合は、nullを返す。
      const res = e.target.files[0] || null
      this.$emit('change', res)
    },
    reset() {
      // 一旦、text属性にすることで選択内容をリセットする。
      this.$refs.input.type = 'text'
      this.$refs.input.type = 'file'

      // 上記の処理だけでは、onChangeが動かないので手動でemitする。
      this.$emit('change', null)
    },
  },
}
</script>

<style lang="scss" scoped>
.file-input-btn > .btn {
  display: inline-block;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
  color: $color-white;
  text-align: center;
  cursor: pointer;
  background-color: $color-primary;
  border: none;
  border-radius: 5px;
  outline: none;
}

.file-input-btn > .fileinput {
  display: none;
}
</style>
