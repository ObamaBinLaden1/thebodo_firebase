<template>
  <div class="container">
    <h5>Sign In</h5>
    <button @click="signInWithGoogle">Sign In with Google</button>
  </div>
</template>

<script>
import {firebase, auth} from './../firebase.js'
export default {
  mounted () {
    if (this.$parent.user) this.$router.push({path: '/'})
  },
  watch: {
    'this.$parent.user' () {
      this.$router.push({path: '/'})
    }
  },
  methods: {
    signInWithGoogle () {
      let provider = new firebase.auth.GoogleAuthProvider()
      this.socialSignIn(provider)
    },
    socialSignIn (provider) {
      auth.signInWithRedirect(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken
        // The signed-in user info.
        var user = result.user
        // ...
        console.log(token, user)
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // The email of the user's account used.
        var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        // ...
        console.log(errorCode, errorMessage, email, credential)
      })
    }
  }
}
</script>
<style scoped>
</style>
