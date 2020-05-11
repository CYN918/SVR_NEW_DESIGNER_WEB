<template>
	<header class="header">
		<img @click="goIndex" class="log" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/header/logo.svg" alt="">		
		
		<span v-if="['/activvity','/index'].indexOf($route.path)==-1" @click="shar" class="fxbtn">分享</span>
		<span v-else @click="qh()" class="qh_pc"><img src="/imge/app/icon_web_h5.svg"/>电脑端</span>
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
	mounted: function () {
		this.init()
	}, 
	
	methods:{
		init(){
			console.log(this.$route);
		},
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
.qh_pc{
	position: absolute;
    right: 1rem;
    top: 0;
    font-size: .8rem;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(40,40,40,1);
    line-height: 2rem;
}
.qh_pc>img{
	display: inline-block;
	vertical-align: top;
	width: 2rem;
}
</style>
