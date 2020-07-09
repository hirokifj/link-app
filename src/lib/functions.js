import JsSHA from 'jssha'

export const getFirebaseErrMsgInJP = (code) => {
  let errMsg = ''

  switch (code) {
    case 'auth/invalid-email':
      errMsg = 'メールアドレスを正しく入力してください。'
      break
    case 'auth/email-already-in-use':
      errMsg = 'このメールアドレスは既に利用されています。'
      break
    case 'auth/operation-not-allowed':
      errMsg = '無効のユーザーアカウントです。'
      break
    case 'auth/weak-password':
      errMsg = 'パスワードは6文字以上で入力してください。'
      break
    case 'auth/user-disabled':
      errMsg = '無効のユーザーアカウントです。'
      break
    case 'auth/user-not-found':
      errMsg = 'ユーザーが見つかりませんでした。'
      break
    case 'auth/wrong-password':
      errMsg = '認証情報が一致しません。'
      break
    case 'auth/popup-blocked':
      errMsg = 'ブラウザによってポップアップがブロックされました。'
      break
    case 'auth/popup-closed-by-user':
      errMsg = 'ポップアップが閉じられました。'
      break
    default:
      errMsg = '処理に失敗しました。時間をおいて再度お試しください。'
      break
  }

  return errMsg
}

// 渡された文字列をハッシュ化して返す。
export const getHash = (str, type = 'SHA-256') => {
  const shaObj = new JsSHA(type, 'TEXT')
  shaObj.update(str)

  return shaObj.getHash('HEX')
}

// 渡された文字列が半角英数字かチェックする
export const isHankakuEisu = (str) => !!str.match(/^[A-Za-z0-9]+$/)
