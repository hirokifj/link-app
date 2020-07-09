<template>
  <div class="set-id-page-conatiner">
    <div class="title">
      <PageTitle>ID設定</PageTitle>
    </div>
    <div class="form">
      <UserSetIdForm
        :err-msg="errMsg"
        :user-id="displayId"
        @onSubmit="updateId"
      />
    </div>
  </div>
</template>

<script>
import UserSetIdForm from '~/components/user/UserSetIdForm'
import { isHankakuEisu, getFirebaseErrMsgInJP } from '~/lib/functions'
import { displayIdExists, updateDisplayId } from '~/lib/api/user'

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
      isProcessing: false,
    }
  },
  methods: {
    async updateId(newDisplayId) {
      // IDが変更されてない場合は何もしない。
      if (this.displayId === newDisplayId) return

      // バリデーション
      // 必須チェック
      if (newDisplayId === '') {
        this.errMsg = 'IDを入力してください。'
        return
      }
      // 半角英数字チェック
      if (!isHankakuEisu(newDisplayId)) {
        this.errMsg = '半角英数字で入力してください。'
        return
      }

      try {
        this.isProcessing = true

        // 同一IDチェック
        if (await displayIdExists(newDisplayId)) {
          this.errMsg = 'このIDは既に利用されています。'
          return
        }

        // ユーザIDの更新
        await updateDisplayId(this.$currentUser.get().id, newDisplayId)
        // 更新完了後、home画面へリダイレクト
        this.$router.push('/home')
      } catch (error) {
        this.errMsg = getFirebaseErrMsgInJP(error.code)
      } finally {
        this.isProcessing = false
      }
    },
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
