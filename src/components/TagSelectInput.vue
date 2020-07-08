<template>
  <div class="tag-select-input">
    <div v-click-outside="closeSuggestions" class="inputbox">
      <input
        type="text"
        class="input"
        :value="searchWord"
        :placeholder="placeholder"
        @input="searchWord = $event.target.value"
        @focus="openSuggestions"
      />
      <div v-show="isFocused" class="suggestions">
        <template v-for="(item, index) in suggestions">
          <span :key="index" class="item" @click="selectItem(item)">{{
            item
          }}</span>
        </template>
      </div>
    </div>
    <div v-show="hasSelectedItem" class="tags">
      <template v-for="(item, index) in selectedItems">
        <StatusTag
          :key="index"
          class="tag"
          :text="item"
          :is-removable="true"
          @remove="removeItem(item)"
        />
      </template>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import StatusTag from '~/components/StatusTag'

export default {
  directives: {
    ClickOutside,
  },
  components: {
    StatusTag,
  },
  props: {
    dataList: {
      type: Array,
      required: true,
    },
    selectedItems: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isFocused: false,
      searchWord: '',
    }
  },
  computed: {
    suggestions() {
      const pattern = new RegExp(this.searchWord, 'gi')

      return (
        this.dataList
          // 選択済みのものを除く
          .filter((item) => !this.selectedItems.includes(item))
          // 検索ワードによるチェック
          .filter((item) => item.match(pattern))
      )
    },
    hasSelectedItem() {
      return this.selectedItems.length > 0
    },
  },
  methods: {
    openSuggestions() {
      this.isFocused = true
    },
    closeSuggestions() {
      this.isFocused = false
    },
    selectItem(targetItem) {
      this.$emit('change', {
        type: 'select',
        targetItem,
      })

      // 初期化
      this.searchWord = ''
      this.closeSuggestions()
    },
    removeItem(targetItem) {
      this.$emit('change', {
        type: 'remove',
        targetItem,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.tag-select-input > .inputbox {
  position: relative;
  margin-bottom: 20px;
}

.tag-select-input > .inputbox > .suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 180px;
  overflow: scroll;
  background-color: $color-gray-light-4;
  border-right: 2px solid $color-gray-light-2;
  border-bottom: 2px solid $color-gray-light-2;
  border-left: 2px solid $color-gray-light-2;
  border-radius: 0 0 5px 5px / 0 0 5px 5px;
}

.tag-select-input > .inputbox > .suggestions > .item {
  display: block;
  padding: 10px 18px;
  cursor: pointer;
  background-color: lighten($color-gray-light-4, 5%);
  transition: background-color 0.4s;

  &:not(:last-child) {
    border-bottom: 1px solid $color-gray-light-2;
  }

  &:hover {
    background-color: darken($color-gray-light-4, 5%);
  }
}

.tag-select-input > .inputbox > .input {
  display: block;
  width: 100%;
  padding: 18px;
  font-size: 16px;
  color: $color-gray-dark-1;
  background-color: $color-gray-light-4;
  border: 2px solid transparent;
  border-radius: 5px;

  &:focus {
    outline: none;
  }

  &[disabled] {
    background-color: darken($color-gray-light-4, 20%);
  }
}

.tag-select-input > .tags {
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  padding: 10px;
  background-color: $color-gray-light-3;
  border-radius: 5px;
}

.tag-select-input > .tags > .tag {
  margin-right: 16px;
  margin-bottom: 10px;
}
</style>
