<template>
  <div class="status-tag" :class="{ '-removable': isRemovable }">
    <span class="text">#{{ text }}</span>
    <fa v-if="isRemovable" class="icon" :icon="faTimesCircle" @click="remove" />
  </div>
</template>

<script>
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    isRemovable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    faTimesCircle: () => faTimesCircle,
  },
  methods: {
    remove() {
      this.$emit('remove')
    },
  },
}
</script>

<style lang="scss" scoped>
.status-tag {
  padding: 8px 16px;
  line-height: 1;
  background-color: $color-white;
  border: 1px solid $color-border-gray;
  border-radius: 5px;
}

.status-tag > .text {
  font-size: 14px;
}

.status-tag.-removable {
  display: flex;
  align-items: center;
}

.status-tag.-removable > .text {
  margin-right: 20px;
}

.status-tag > .icon {
  font-size: 18px;
  cursor: pointer;
}
</style>
