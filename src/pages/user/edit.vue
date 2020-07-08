<template>
  <div class="user-edit-page-container">
    <div class="title">
      <PageTitle>プロフィール編集</PageTitle>
    </div>
    <div class="form">
      <UserEditForm />
    </div>
  </div>
</template>

<script>
import UserEditForm from '~/components/user/UserEditForm'

export default {
  components: {
    UserEditForm,
  },
  middleware: 'auth',
}
</script>

<style lang="scss" scoped>
.user-edit-page-container {
  padding: 40px;

  & > .title {
    margin-bottom: 20px;
  }

  & > .form {
    width: 60%;
  }
}
</style>
