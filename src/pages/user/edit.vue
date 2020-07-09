<template>
  <div class="user-edit-page-container">
    <div class="title">
      <PageTitle>プロフィール編集</PageTitle>
    </div>
    <div class="form">
      <UserEditForm
        :original-data="userData"
        :photo-url="userData.photoUrl"
        :err-msg="errMsg"
        @onSubmit="updateUser"
      />
    </div>
  </div>
</template>

<script>
import UserEditForm from '~/components/user/UserEditForm'
import { getHash, getFirebaseErrMsgInJP } from '~/lib/functions'

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
      },
    }
  },
  data() {
    return {
      isProcessing: false,
      errMsg: '',
    }
  },
  methods: {
    async updateUser({ newData, newFile }) {
      // 処理中はスキップ
      if (this.isProcessing) return

      // 処理中フラグを立てる
      this.isProcessing = true
      try {
        // ファイルがある場合は、アップロードする。
        if (newFile) {
          // ファイル名+タイムスタンプでハッシュ化する（ファイル名の重複防止）
          const fileName = getHash(newFile.name + this.$dayjs().unix())

          // storageへのアップロード
          const storageRef = this.$storage.ref().child(`images/${fileName}`)
          await storageRef.put(newFile)

          // アップロード後のURLを取得
          newData.photoUrl = await storageRef.getDownloadURL()
        }

        // ユーザ情報の更新
        await this.$firebase
          .firestore()
          .doc(`users/${this.$currentUser.get().id}`)
          .update({
            ...newData,
            createdAt: newData.createdAt.toDate(),
            updatedAt: this.$dayjs().toDate(),
          })

        this.isProcessing = false
        // 更新完了後、home画面へリダイレクト
        this.$router.push('/home')
      } catch (error) {
        this.isProcessing = false
        this.errMsg = getFirebaseErrMsgInJP(error.code)
      }
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
