<template>
  <button class="social-login-btn" @click="$emit('click')">
    <fa class="icon" :icon="icon" />
    <span class="text">{{ text }}</span>
  </button>
</template>

<script>
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'

export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
  },
  computed: {
    icon() {
      return this.provider === 'google' ? faGoogle : faGithub
    },
  },
}
</script>

<style lang="scss" scoped>
.social-login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  padding: 10px 20px;
  font-weight: bold;
  color: $color-secondary;
  text-align: center;
  cursor: pointer;
  background-color: $color-white;
  border: 2px solid $color-secondary;
  border-radius: 5px;
  outline: none;
}

.social-login-btn > .icon {
  margin-right: 10px;
  font-size: 20px;
}
</style>
