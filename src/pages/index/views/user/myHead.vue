<template>
	<div class="myWorks_1">
		<div class="myWorks_2">
			<span class="myWorks_3">我的创作</span>
			<div class="myWorks_4">
				<a :class="['pend',ison=='/myAll'?'router-link-active':'']" @click="goZP('/myAll','全部')">全部</a>
				<a :class="['pend',ison=='/myExamine'?'router-link-active':'']" @click="goZP('/myExamine','待审核')">待审核</a>
				<a :class="['pend',ison=='/myPass'?'router-link-active':'']" @click="goZP('/myPass','已通过')">已通过</a>
				<a :class="['pend',ison=='/myNotPass'?'router-link-active':'']" @click="goZP('/myNotPass','未通过')">未通过</a>
				<a :class="['pend',ison=='/myDraft'?'router-link-active':'']" @click="goZP('/myDraft','草稿')">草稿</a>

			</div>
		</div>
	</div>
</template>

<script>

import {Message} from 'element-ui'
export default {
	name: 'index',
	data(){
		return{
			ison:'/myAll',
		}
	},

	mounted: function () {	
		this.init()	
	}, 
	
	methods: {	
		init(){
			this.ison = this.$route.fullPath;
		},	
		goZP(a,b){
			this.bdtj('我的创作','tab_'+b,'--');
			this.$router.push({path: a})			
		},
	
	},
	
}	
</script>

<style>
.myWorks_1{
	min-width: 1300px;
	height: 80px;
	background: #FFFFFF;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
}
.myWorks_2{
	position: relative;
	width: 1300px;
	line-height: 80px;
	margin: 0 auto;
}
.myWorks_3{
	position: absolute;
	top: 0;
	left: 0;
	font-family: PingFangSC-Medium;
	font-size: 24px;
	color: #1E1E1E;
}
.myWorks_4{

}
.myWorks_4>a{
	position: relative;
	display: inline-block;
	font-size: 16px;
	color: #1E1E1E;
	margin-right: 64px;
}
.myWorks_4>a:last-child{
	margin-right: 0;
}
.myWorks_4>a.router-link-active{
	color: #FF5121;
}
.myWorks_4>a.router-link-active:after{
	content: "";
	position: absolute;
	bottom: -1px;
	left: 5%;
	
	width: 90%;
	height: 2px;
	background: #FF5121;
}
.myWorks_4>a:hover{
	color: #FF5121;
	opacity: .7;
}
</style>
