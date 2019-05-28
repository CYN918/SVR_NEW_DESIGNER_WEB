<template>
	<header class="header">
		<img @click="goIndex" class="log" src="/imge/app/log.png" alt="">
		狮大大
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
	line-height: 2.11rem;
    background: #ff5121;
	font-size: .75rem;
	color: #fff;
}
.log{
	display: inline-block;
	vertical-align: middle;
    width: 1.5rem;
    margin: .4rem;
}
.fxbtn{
    float: right;
    font-size: .7rem;
    margin-right: .8rem;
}
</style>
