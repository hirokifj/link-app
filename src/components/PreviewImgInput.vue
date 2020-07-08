<template>
  <div class="preview-img-input">
    <div class="imgbox">
      <template v-if="imgPath">
        <img class="img" :src="imgPath" />
        <fa
          v-if="previewPath"
          class="icon"
          :icon="faTimesCircle"
          @click="reset"
        />
      </template>
      <template v-else>
        <div class="img -blank"></div>
      </template>
    </div>
    <FileInputBtn ref="fileInputBtn" :only-img="true" @change="onFileInput"
      >画像を選択</FileInputBtn
    >
  </div>
</template>

<script>
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    uploadedImgPath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      previewPath: '',
    }
  },
  computed: {
    imgPath() {
      return this.previewPath || this.uploadedImgPath
    },
    faTimesCircle: () => faTimesCircle,
  },
  methods: {
    onFileInput(fileData) {
      this.$emit('change', fileData)

      if (fileData) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.previewPath = e.target.result
        }
        reader.readAsDataURL(fileData)
      } else {
        this.previewPath = ''
      }
    },
    // 画像をリセット（除去）する。
    reset() {
      // 子側のリセット用メソッドを呼ぶ。
      this.$refs.fileInputBtn.reset()
      // previewPathを初期化する
      this.previewPath = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.preview-img-input > .imgbox {
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
}

.preview-img-input > .imgbox > .img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.preview-img-input > .imgbox > .icon {
  position: absolute;
  right: 4px;
  bottom: 2px;
  z-index: 1;
  font-size: 24px;
  cursor: pointer;
  background-color: $color-white;
}

.preview-img-input > .imgbox > .img.-blank {
  display: block;
  background-color: $color-gray-light-4;
}
</style>
