<template>
  <div class="pass-reset-form">
    <div class="control">
      <AppLabel for="email" class="label" text="メールアドレス" />
      <AppInput
        id="email"
        v-model="email"
        type="text"
        placeholder="メールアドレス"
        :disabled="isDone"
      />
    </div>
    <div class="submit">
      <AppBtn class="-primary -big -full" @click="submit">
        メール送信
      </AppBtn>
    </div>
  </div>
</template>

<script>
import AppBtn from '../components/core/AppBtn'
import AppLabel from '~/components/core/AppLabel'
import AppInput from '~/components/core/AppInput'

export default {
  components: {
    AppLabel,
    AppInput,
    AppBtn,
  },
  props: {
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: '',
    }
  },
  methods: {
    submit() {
      this.$emit('onSubmit', {
        email: this.email,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.pass-reset-form > .control {
  margin-bottom: 42px;
}

.pass-reset-form > .control > .label {
  margin-bottom: 8px;
}
</style>
