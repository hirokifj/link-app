<template>
  <div class="signup-form">
    <div class="control">
      <AppLabel for="email" class="label" text="メールアドレス" />
      <AppInput
        id="email"
        v-model="email"
        type="text"
        placeholder="メールアドレス"
      />
    </div>
    <div class="control -pass">
      <AppLabel for="pass" class="label" text="パスワード" />
      <AppInput
        id="pass"
        v-model="password"
        type="password"
        placeholder="パスワード"
      />
    </div>
    <div class="submit">
      <AppBtn class="-primary -big -full" @click="submit">
        登録
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
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    submit() {
      this.$emit('onSubmit', {
        email: this.email,
        password: this.password,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.signup-form > .control {
  margin-bottom: 32px;
}

.signup-form > .control.-pass {
  margin-bottom: 48px;
}

.signup-form > .control > .label {
  margin-bottom: 8px;
}
</style>
