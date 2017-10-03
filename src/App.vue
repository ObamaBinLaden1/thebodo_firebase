<template>
  <div id="app">
  <header>
    <router-link :to="{path:'/'}" id="logo">The Bodo</router-link>
    <ul class="header-menu">
      <li v-if="!user"><router-link :to="{path:'account'}">Sign In</router-link> </li>
      <li v-else @click="signOut"><a href="javascript:;">{{user.displayName}}</a></li>
    </ul>
  </header>
    <router-view></router-view>
  </div>
</template>

<script>
import {auth} from './firebase.js'
export default {
  name: 'app',
  data () {
    return {
      user: null
    }
  },
  mounted () {
    this.initAuthState()
  },
  methods: {
    initAuthState () {
      let vm = this
      auth.onAuthStateChanged((user) => {
        vm.user = user
        vm.$toasted.show('Welcome back ' + user.displayName)
      })
    },
    signOut () {
      auth.signOut()
    }
  }
}
</script>

<style>

*{
  padding: 0;
  margin: 0;
}
#logo{
  font-size: 28px;
  line-height: 80px
}
.header-menu{
  display: inline-block;
  list-style: none;
  float: right;
  line-height: 80px;
}
.inline{
  display: inline-block;
}
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button{
  padding: 8px 8px;
  background: #fff;
  border: 1px solid #eee;
  cursor: pointer;
  box-shadow: 1px 1px 1px #eee;
}
button:hover {
  background: blue;
  color: #fff;
}*/
a{
  text-decoration: none;
  color: inherit;
}
header{
  padding: 15px;
  height: 80px;
  background: #4b5790;
  color: #fff;
      border-bottom: 4px solid #b5c462;
}
</style>
