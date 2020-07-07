const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

// ユーザー登録時、usersコレクションに当該ユーザーのドキュメントを作成する
exports.onCreateUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user) => {
    const userRef = admin.firestore().doc(`users/${user.uid}`)

    await admin.firestore().runTransaction(async (t) => {
      // ドキュメントの存在確認
      const userDoc = await t.get(userRef)
      // ドキュメントが存在しない場合のみ処理する
      if (!userDoc.exists) {
        await t.set(userRef, {
          displayId: 'aaa',
          name: user.displayName,
          profileImg: '',
          type: '',
          status: [],
          copy: '',
          comment: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }
    })
  })
