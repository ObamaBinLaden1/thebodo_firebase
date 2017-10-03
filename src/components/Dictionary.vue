<template>
  <div class="container">
    <h4>Dictionary</h4>
    <div v-if="inProgress">
    	<bounce-loader :loading="inProgress" color="#3AB982" height="50px" width="15px"></bounce-loader>
    </div>
    <div v-if="!editWord && !inProgress">
      <form @submit.prevent="dosearch">
        <input type="text" name="search" v-model="search" placeholder="search">
        <input type="submit" value="Submit">
      </form>
    	<div class="paginator">
    		<button :disabled="!prevEnabled || inProgress" @click="prevPage">Prev</button>
    			<form @submit.prevent="updatePage" class="inline"> <input type="number" v-model="page" name=""></form> of {{lastPage}}
    		<button :disabled="!nextEnabled || inProgress" @click="nextPage">Next</button>
	    </div>
	    <table >
	    	<thead>
		    	<tr>
		    		<td>Word</td>
		    		<td>Class</td>
		    		<td>English Definition</td>
		    		<td>Bodo Definition</td>
		    	</tr>
	    	</thead>
	    	<tbody>
	    		<tr v-for="word in words">
	    			<td>{{word.word}}</td>
	    			<td>{{word.wordtype}}</td>
	    			<td>{{word.eng_definition}}</td>
	    			<td>{{word.bodo_definition}} <br>
	    			<button @click="editWord = word">edit</button>
	    			</td>
	    		</tr>
	    	</tbody>
	    	
	    </table>
	    <div class="paginator">
	    	<button :disabled="!prevEnabled || inProgress" @click="prevPage">Prev</button>
	    	<form class="inline" @submit.prevent="updatePage"> <input type="number" v-model="page" name=""></form> of {{lastPage}}
	    	<button :disabled="!nextEnabled || inProgress" @click="nextPage">Next</button>
	    </div>
    </div>
    <div v-if="editWord && !inProgress">
      <form @submit.prevent="updateWord()">
    	{{editWord.word}} ({{editWord.wordtype}}) :<br>
    	Eng. definition : <br>
    	<small>{{editWord.eng_definition}}</small>
    	<textarea placeholder="Bodo Definition" v-model="editWord.bodo_definition"></textarea>
    	<button type="submit" class="button-primary" :disabled="inProgress">Save</button>
    	<button type="button" @click="editWord = null" :disabled="inProgress">Cancel</button>
      </form>
    </div>
    
    <br>
  </div>
</template>
<script>
import {db} from './../firebase.js'
export default {
  data () {
    return {
      page: parseInt(this.$route.query.page) || 1,
      words: [],
      perpage: 25,
      total: 170623,
      editWord: null,
      editKey: null,
      inProgress: false,
      search: ''
    }
  },
  watch: {
    '$route.query' () {
      this.bindDictionary()
    }
    // 'page' () {
    //   this.$router.push({path: '/dictionary', query: {page: this.page}})
    //   this.bindDictionary()
    // }
  },
  mounted () {
    this.bindDictionary()
  },
  methods: {
    bindDictionary () {
      // this.$bindAsArray('words', db.ref('dictionary').startAt('2').limitToFirst(25))
      let vm = this
      vm.inProgress = true
      db.ref('dictionary')
      .orderByKey()
      .startAt(String(this.perpage * (this.page - 1) + 1))
      .limitToFirst(this.perpage)
      .once('value')
      .then((snapshot) => {
        vm.words = []
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key
          var childData = childSnapshot.val()
          childData.id = childKey
          vm.words.push(childData)
        })
        vm.inProgress = false
      })
    },
    updateWord () {
      let updates = {}
      let vm = this
      vm.inProgress = true
      updates['/dictionary/' + this.editWord.id] = {
        word: this.editWord.word,
        wordtype: this.editWord.wordtype,
        eng_definition: this.editWord.eng_definition,
        bodo_definition: this.editWord.bodo_definition
      }
      db.ref().update(updates)
      .then(() => {
        vm.$toasted.show('Successfully saved!')
        vm.inProgress = false
        vm.editWord = null
      })
      .catch(() => {
        vm.$toasted.show('Error saving!')
        vm.inProgress = false
      })
    },
    updatePage () {
      this.$router.push({path: '/dictionary', query: {page: this.page}})
    },
    dosearch () {
      let vm = this
      vm.inProgress = true
      vm.words = []
      let search = this.search.split('').map((val, index) => index === 0 ? val.toUpperCase() : val).join('')
      db.ref('dictionary')
      // .orderByKey()
      .orderByChild('word')
      .equalTo(search + '')
      // .startAt(String(25 * (this.page - 1) + 1))
      .limitToFirst(3)
      .on('value', (snapshot) => {
        console.log(snapshot)
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key
          var childData = childSnapshot.val()
          childData.id = childKey
          vm.words.push(childData)
        })
        vm.inProgress = false
      }, (error) => {
        console.log(error)
        vm.inProgress = false
      })
      // .then((snapshot) => {
      //   // vm.words = []
      //   // snapshot.forEach(function (childSnapshot) {
      //   //   var childKey = childSnapshot.key
      //   //   var childData = childSnapshot.val()
      //   //   childData.id = childKey
      //   //   vm.words.push(childData)
      //   // })
      //   vm.words.push(snapshot.getValue())
      //   vm.inProgress = false
      // })
      // .catch(() => {
      //   vm.inProgress = false
      // })
    },
    nextPage () {
      this.page += 1
      this.$router.push({path: '/dictionary', query: {page: this.page}})
    },
    prevPage () {
      this.page -= 1
      this.$router.push({path: '/dictionary', query: {page: this.page}})
    }
  },
  computed: {
    lastPage () {
      return 7041// Math.round(this.total / this.perpage)
    },
    prevEnabled () {
      return this.page > 1
    },
    nextEnabled () {
      return this.page < this.lastPage
    }
  }

}
</script>
<style scoped>
/*td{
	padding: 15px;
	border: 1px solid #eee;
}*/
.paginator{
	text-align: center;
}
textarea{
	display: block;
	width: 100%
}
</style>
