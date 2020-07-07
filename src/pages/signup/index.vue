<template>
  <div class="signup-page-container">
    <div class="form">
      <div class="formwrapper">
        <div v-if="errMsg" class="errmsg">
          <span class="msg">{{ errMsg }}</span>
        </div>
        <div class="socialbox">
          <SocialLoginBtn
            provider="google"
            text="Googleで登録"
            @click="signUp('google')"
          />
          <SocialLoginBtn provider="github" text="Githubで登録" />
        </div>
        <div class="boundary">
          <span>or</span>
        </div>
        <div class="form">
          <SignupForm @onSubmit="signUp('email', $event)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SocialLoginBtn from '~/components/SocialLoginBtn'
import SignupForm from '~/components/SignupForm'

import { getFirebaseErrMsgInJP } from '~/lib/functions'

export default {
  layout: 'single',
  components: {
    SocialLoginBtn,
    SignupForm,
  },
  data() {
    return {
      errMsg: '',
    }
  },
  methods: {
    async signUp(type, formData = {}) {
      // エラーメッセージ初期化
      this.errMsg = ''

      try {
        // ユーザーの登録処理
        let credential = null
        if (type === 'email') {
          credential = await this.$auth.createUserWithEmailAndPassword(
            formData.email,
            formData.password
          )
        } else if (type === 'google') {
          credential = await this.$auth.signInWithPopup(
            new this.$firebase.auth.GoogleAuthProvider()
          )
        }

        // 登録したユーザーを取得
        const user = credential.user

        // usersコレクションへのドキュメント追加（cloud functionsで実行）を監視
        const unsubscribe = this.$firebase
          .firestore()
          .doc(`users/${user.uid}`)
          .onSnapshot((snapshot) => {
            if (snapshot.exists) {
              // 監視を解除
              unsubscribe()
              // homeへリダイレクト
              this.$router.push('/home')
            }
          })
      } catch (error) {
        this.errMsg = getFirebaseErrMsgInJP(error.code)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.signup-page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.signup-page-container > .form {
  width: 90%;
  max-width: 600px;
}

.signup-page-container > .form > .formwrapper {
  width: 100%;
  padding: 60px 80px;
  background-color: $color-white;
  border-radius: 10px;
}

.signup-page-container > .form > .formwrapper > .errmsg {
  margin-bottom: 20px;
  color: red;
  text-align: center;
}

.signup-page-container > .form > .formwrapper > .socialbox {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.signup-page-container
  > .form
  > .formwrapper
  > .socialbox
  > .social-login-btn:first-child {
  margin-right: 20px;
}

.signup-page-container > .form > .formwrapper > .boundary {
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

.signup-page-container > .form > .formwrapper > .form {
  width: 90%;
  margin: 0 auto;
}
</style>
