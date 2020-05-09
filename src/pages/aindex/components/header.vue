<template>
	<header class="header">
		<img @click="goIndex" class="log" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/header/logo.svg" alt="">		
		<span @click="qh()">切换</span>
		<span @click="shar" class="fxbtn">分享</span>
		
		<component v-bind:is="tanc.zj" v-model="tanc" ref="tanbox"></component>
	</header>
</template>

<script>
import sharDom from './sharDom';
export default {
	components:{sharDom},
	name: 'home',	 
	data(){	
		return{
			tanc:{}
		}		
	},
	methods:{
		goIndex(){
			this.$router.push({path: '/index'});
		},
		shar(){
			this.tanc = {
				zj:'sharDom'
			};
			
		},
		qh(){
			sessionStorage.setItem('isqh',1);
			window.location = location.origin;
		}
		
	},
}
</script>

<style>
.header{
	position: relative;
	width: 100%;
    height: 2rem;
	background:#fff;
	-webkit-box-shadow:0px 2px 6px 0px rgba(0,0,0,0.05);
	box-shadow:0px 2px 6px 0px rgba(0,0,0,0.05);
}
.log{
    display: inline-block;
    vertical-align: middle;
    width: 4.3rem;
    margin: .3rem 0 0 1rem;
}
.fxbtn{
	position: absolute;
    line-height: 2rem;
    font-size: .6rem;
    right: .9rem;
}
</style>
