<template>
  <div class="set-id-page-conatiner">
    <div class="title">
      <PageTitle>ID設定</PageTitle>
    </div>
    <div class="form">
      <UserSetIdForm :err-msg="errMsg" :user-id="displayId" />
    </div>
  </div>
</template>

<script>
import UserSetIdForm from '~/components/user/UserSetIdForm'

export default {
  components: {
    UserSetIdForm,
  },
  async asyncData({ $firebase, $currentUser }) {
    const userDocSnapshot = await $firebase
      .firestore()
      .collection('users')
      .doc($currentUser.get().id)
      .get()

    return {
      displayId: userDocSnapshot.data().displayId,
    }
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
