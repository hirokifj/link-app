<template>
  <div class="set-id-page-conatiner">
    <div class="title">
      <PageTitle>ID設定</PageTitle>
    </div>
    <div class="form">
      <UserSetIdForm :err-msg="errMsg" />
    </div>
  </div>
</template>

<script>
import UserSetIdForm from '~/components/user/UserSetIdForm'

export default {
  components: {
    UserSetIdForm,
  },
  data() {
    return {
      errMsg: '',
    }
  },
}
</script>

<style lang="scss" scoped>
.set-id-page-conatiner {
  padding: 40px;

  & > .title {
    margin-bottom: 20px;
  }

  & > .form {
    width: 60%;
  }
}
</style>
