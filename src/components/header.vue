<template>
	<header class="header">
		<img class="header_1 pend" src="/imge/log.png">
		<span class="header_2">
			<router-link class="pend" to="/index">首页</router-link>
			<router-link class="last pend" to="/event">活动</router-link>
		</span>
		<div class="header_3">
			<span class="iconfont pend">&#xe609;</span>
			<span class="iconfont pend">&#xe65b;</span>
			<span class="iconfont pend">&#xe61e;</span>
			<span class="header_4" v-if="userMssge"><div><img :src="userMssge.avatar" alt=""></div>{{userMssge.username}}</span>	
			<span class="header_4" v-else><router-link class="pend" to="/login">登录</router-link><span>|</span><router-link class="pend" to="/register">注册</router-link></span>			
					
					
		</div>
	</header>
</template>

<script>
export default {
	name: 'home',	 
	data(){	
		return{
			userMssge:'',
		}
		
	},
	mounted: function () {	
		let p = localStorage.getItem('userT');
		if(p){
			this.userMssge = JSON.parse(p);
		}
		console.log(this.userMssge)
	}, 
}
</script>

<style>
.header{
	width: 100%;
	display: flex;
    height: 60px;
    background: #323232;
}
.header_1{
    margin: 0 97px 0 60px;
    width: 135px;   
}
.header>span{
	flex: 1;
}
.header>span>a{
	position: relative;
	display: inline-block;
	font-size: 16px;
	color: #FFFFFF;
	line-height: 60px;
}
.header .last{
	margin-left: 100px;
}
.header>span>a.router-link-active:after{
    content: "";
    position: absolute;
    bottom: 12px;
    left: 5px;
    width: 76%;
    height: 2px;
    background: #FCFCFC;
}
.header_3{
	width: 301px;
	color: #fff;
	margin-right: 66px;
}
.header_3>span{
	line-height: 60px;
	margin-right: 31px;
}
.header_4{
    margin-right: 66px !important;
}
.header_4>a{
	color: #fff;
}
.header_4>span{
	margin: 0 10px;
}
.header_4>div{
	display: inline-block;
	vertical-align: middle;
	width: 44px;
	height: 44px;
	overflow: hidden;
	margin-right: 12px;
	overflow: hidden;
}
.header_4>div>img{
	display: block;
	width: 100%;
}
</style>
