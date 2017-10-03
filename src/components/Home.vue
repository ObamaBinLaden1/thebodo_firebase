<template>
  <div class="container">
  	<h4>Menu</h4>
  
    <div class="row">
	    <div class="six columns">
	      <router-link :to="{path:'/dictionary'}">
    		<div class="card">
    			<img src="./../assets/big-dictionary.svg"><br>
    	    	Eng-Bodo Dictionary
    		</div>
    	  </router-link>
	    </div>
	    <div class="six columns">
	      
    	</div>
	  </div>
  </div>
</template>

<script>
export default {
}
</script>
<style scoped>
.card{
  box-shadow: 1px 1px 1px #eee solid;
  text-align: center;
}
.card img{
	max-width: 200px;
}
</style>
