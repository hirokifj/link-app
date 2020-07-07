<template>
  <div class="login-page-container">
    <div class="form">
      <div class="formwrapper">
        <div v-if="errMsg" class="errmsg">
          <span class="msg">{{ errMsg }}</span>
        </div>
        <div class="socialbox">
          <SocialLoginBtn
            provider="google"
            text="Googleでログイン"
            @click="login('google')"
          />
          <SocialLoginBtn provider="github" text="Githubでログイン" />
        </div>
        <div class="boundary">
          <span>or</span>
        </div>
        <div class="form">
          <LoginForm @onSubmit="login('email', $event)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SocialLoginBtn from '~/components/SocialLoginBtn'
import LoginForm from '~/components/LoginForm'

import { getFirebaseErrMsgInJP } from '~/lib/functions'

export default {
  layout: 'single',
  components: {
    SocialLoginBtn,
    LoginForm,
  },
  data() {
    return {
      errMsg: '',
    }
  },
  methods: {
    async login(type, formData = {}) {
      this.errMsg = ''

      try {
        if (type === 'email') {
          await this.$auth.signInWithEmailAndPassword(
            formData.email,
            formData.password
          )
        } else if (type === 'google') {
          await this.$auth.signInWithPopup(
            new this.$firebase.auth.GoogleAuthProvider()
          )
        }

        this.$router.push('/home')
      } catch (error) {
        this.errMsg = getFirebaseErrMsgInJP(error.code)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login-page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.login-page-container > .form {
  width: 90%;
  max-width: 600px;
}

.login-page-container > .form > .formwrapper {
  width: 100%;
  padding: 60px 80px;
  background-color: $color-white;
  border-radius: 10px;
}

.login-page-container > .form > .formwrapper > .errmsg {
  margin-bottom: 20px;
  color: red;
  text-align: center;
}

.login-page-container > .form > .formwrapper > .socialbox {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.login-page-container
  > .form
  > .formwrapper
  > .socialbox
  > .social-login-btn:first-child {
  margin-right: 20px;
}

.login-page-container > .form > .formwrapper > .boundary {
  margin-bottom: 30px;
  font-size: 16px;
  text-align: center;

  & span {
    position: relative;
    display: inline-block;
    &::before,
    &::after {
      position: absolute;
      top: 50%;
      display: inline-block;
      width: 160px;
      height: 1px;
      content: '';
      background-color: $color-gray-light-1;
    }

    &::before {
      left: 40px;
    }

    &::after {
      right: 40px;
    }
  }
}

.login-page-container > .form > .formwrapper > .form {
  width: 90%;
  margin: 0 auto;
}
</style>
