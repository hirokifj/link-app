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
  async asyncData(context) {
    const userDocSnapshot = await context.$firebase
      .firestore()
      .collection('users')
      .doc(context.$currentUser.get().id)
      .get()

    return {
      userData: {
        ...userDocSnapshot.data(),
        name: context.$currentUser.get().displayName,
      },
    }
  },
  computed: {
    photoUrl() {
      return this.$currentUser.get().photoUrl
    },
  },
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
