<template>
  <div class="pass-reset-page-container">
    <div class="form">
      <div class="formwrapper">
        <div v-if="errMsg" class="errmsg">
          <span class="msg">{{ errMsg }}</span>
        </div>
        <div class="form">
          <PassResetForm @onSubmit="sendMail" />
        </div>
        <div class="text">
          <p v-if="!isDone">
            パスワード再設定メールを送信します。<br />登録したメールアドレスを入力してください。
          </p>
          <p v-else class="green">
            パスワード再設定メールを送信しました。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PassResetForm from '~/components/PassResetForm'

import { getFirebaseErrMsgInJP } from '~/lib/functions'

export default {
  layout: 'single',
  components: {
    PassResetForm,
  },
  data() {
    return {
      errMsg: '',
      isDone: false,
    }
  },
  methods: {
    async sendMail(formData) {
      // メール送信済みの場合は、処理スキップ
      if (this.isDone) return

      this.errMsg = ''

      try {
        await this.$auth.sendPasswordResetEmail(formData.email, {
          // TODO: URLを修正する。
          url: 'http://localhost:3000/signin',
        })

        // 処理完了フラグを立てる
        this.isDone = true
      } catch (error) {
        this.errMsg = getFirebaseErrMsgInJP(error.code)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.pass-reset-page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.pass-reset-page-container > .form {
  width: 90%;
  max-width: 600px;
}

.pass-reset-page-container > .form > .formwrapper {
  width: 100%;
  padding: 60px 80px;
  background-color: $color-white;
  border-radius: 10px;
}

.pass-reset-page-container > .form > .formwrapper > .errmsg {
  margin-bottom: 20px;
  color: red;
  text-align: center;
}

.pass-reset-page-container > .form > .formwrapper > .form {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
}

.pass-reset-page-container > .form > .formwrapper > .text {
  width: 90%;
  margin: 0 auto;
  text-align: center;
}

.pass-reset-page-container > .form > .formwrapper > .text > .green {
  color: green;
}
</style>
