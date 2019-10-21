<template>
	<div class="myWorks_1">
		<div class="myWorks_2">
			<span class="myWorks_3">我的关注</span>
			<div class="myWorks_4">
				<a :class="['pend',ison=='/myDynamic'?'router-link-active':'']" @click="goZP('/myDynamic','动态')">动态</a>
				<a :class="['pend',ison=='/myCreators'?'router-link-active':'']" @click="goZP('/myCreators','创作者')">创作者</a>
				<a :class="['pend',ison=='/myFans'?'router-link-active':'']" @click="goZP('/myFans','粉丝')">粉丝</a>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'index',
	data(){
		return{
			ison:'',
		}
	},
	mounted: function () {	
		this.init();	
	}, 
	
	methods: {	
		init(){
			this.ison = this.$route.fullPath;
		},	
		goZP(a,b){
			this.bdtj('我的关注','tab_'+b,'--');
			this.$router.push({path: a})			
		},
	
	}
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
	
	font-size: 16px;
	color: #1E1E1E;
}
.myWorks_4{

}
.myWorks_4>a{
	position: relative;
	display: inline-block;
	font-size: 14px;
	color: #1E1E1E;
	margin-right: 64px;
}
.myWorks_4>a:last-child{
	margin-right: 0;
}
.myWorks_4>a.router-link-active{
	color: #33B3FF;
}
.myWorks_4>a.router-link-active:after{
	content: "";
	position: absolute;
	bottom: -1px;
	left: 5%;
	
	width: 90%;
	height: 2px;
	background: #33B3FF;
}
.myWorks_4>a:hover{
	color: #33B3FF;
	opacity: .7;
}
</style>
