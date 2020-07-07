<template>
  <div class="login-form">
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
      <TextLink to="/reset">パスワードをお忘れですか？</TextLink>
    </div>
    <div class="submit">
      <AppBtn class="-primary -big -full" @click="submit">
        ログイン
      </AppBtn>
    </div>
    <div class="link">
      <TextLink to="/signup">アカウントが必要ですか？</TextLink>
    </div>
  </div>
</template>

<script>
import AppBtn from '../components/core/AppBtn'
import AppLabel from '~/components/core/AppLabel'
import AppInput from '~/components/core/AppInput'
import TextLink from '~/components/core/TextLink'

export default {
  components: {
    AppLabel,
    AppInput,
    AppBtn,
    TextLink,
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
.login-form > .control {
  margin-bottom: 32px;
}

.login-form > .control.-pass {
  margin-bottom: 42px;
}

.login-form > .control > .label {
  margin-bottom: 8px;
}

.login-form > .submit {
  margin-bottom: 8px;
}
</style>
