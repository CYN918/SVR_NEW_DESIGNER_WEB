<template>
	<header class="header">
		<img @click="goIndex" class="log" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/app/logo.png" alt="">
		
		<span class="fxbtn"></span>
	</header>
</template>

<script>
export default {
	name: 'home',	 
	data(){	
		return{}		
	},
	methods:{
		goIndex(){
			this.$router.push({path: '/index'});
		}
	},
}
</script>

<style>
.header{
	width: 100%;
    height: 2.11rem;
    background: #323232;
}
.log{
	display: inline-block;
	vertical-align: middle;
    width: 3.7rem;
    margin: .4rem;
}
.fxbtn{
    float: right;
    font-size: .7rem;
    margin-right: .8rem;
}
</style>
