<template>
  <div class="user-set-id-form">
    <div class="control">
      <AppLabel class="label" text="ユーザーID" />
      <AppInput
        id="username"
        v-model="formUserId"
        type="text"
        placeholder="ユーザーID"
      />
    </div>
    <div class="text">
      <p>ユーザ検索に利用するIDです。</p>
      <p>英数字で入力してください。</p>
    </div>
    <div class="submit">
      <AppBtn class="-primary" @click="submit">IDを設定する</AppBtn>
    </div>
    <div class="err">
      <span>{{ errMsg }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userId: {
      type: String,
      default: '',
    },
    errMsg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      formUserId: this.userId,
    }
  },
  methods: {
    submit() {
      this.$emit('onSubmit', this.formUserId)
    },
  },
}
</script>

<style lang="scss" scoped>
.user-set-id-form {
  padding: 40px 60px;
  background-color: $color-white;
  border-radius: 10px;
}

.user-set-id-form > .control {
  margin-bottom: 16px;
}

.user-set-id-form > .control > .label {
  margin-bottom: 8px;
}

.user-set-id-form > .text {
  margin-bottom: 24px;
}

.user-set-id-form > .submit {
  margin-bottom: 10px;
}

.user-set-id-form > .err {
  color: red;
}
</style>
