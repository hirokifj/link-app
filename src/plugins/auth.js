import Vue from 'vue'

const authPlugin = (context, inject) => {
  const state = Vue.observable({ currentUser: null })

  context.$auth.onAuthStateChanged(function (user) {
    if (user) {
      state.currentUser = {
        id: user.uid,
      }
    } else {
      state.currentUser = null
    }
  })

  const loginuUser = {
    get() {
      return state.currentUser
    },
  }
  inject('currentUser', loginuUser)
}

export default authPlugin
