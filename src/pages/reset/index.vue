<template>
  <div class="pass-reset-page-container">
    <div class="form">
      <div class="formwrapper">
        <div class="form">
          <PassResetForm />
        </div>
        <div class="text">
          <p>
            パスワード再設定メールを送信します。<br />登録したメールアドレスを入力してください。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PassResetForm from '~/components/PassResetForm'

export default {
  layout: 'single',
  components: {
    PassResetForm,
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
</style>
