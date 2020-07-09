import { firebase } from '~/plugins/firebase'

// displayIdの存在チェック。
// firestoreに存在する場合はtrueを返す。
export const displayIdExists = async (displayId) => {
  const res = await firebase
    .firestore()
    .collection('users')
    .where('displayId', '==', displayId)
    .get()

  return !res.empty
}

// displayIDの更新処理
export const updateDisplayId = async (userId, displayId) => {
  await firebase.firestore().doc(`users/${userId}`).update({
    displayId,
  })
}
