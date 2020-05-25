<template>
	<div>
		<div class="setHeadBox">
			<div class="setHeadBox_1">
				<span class="setHeadBox_2">平台供稿人-认证申请</span>
				<div class="setHeadBox_3">
					<a></a>
					<a v-if="navOn==0 || navOn==1"  :class="[ison=='/setPersonal'?'router-link-active':'']" @click="goZP('/setPersonal','个人')">个人</a>	
					<a v-if="navOn==0 || navOn==2"  :class="[ison=='/setEnterprise'?'router-link-active':'']" @click="goZP('/setEnterprise','企业')">企业</a>		
				</div>
			</div>
		</div>
		<router-view/>
	</div>
</template>
<script>
export default {
	name: 'rzCom',
	
	data(){
		return{
			navOn:0,
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
			this.bdtj('认证页面','tab_'+b,'--');
			this.$router.push({path: a})			
		},
		setNav(on){
		
			this.navOn=on;
		}
	
	},
	watch: {	
		'$route': function() {
			this.init();
		},
	}
	
	
}	
</script>

<style>
.setHeadBox{
	min-width: 1300px;
	height: 80px;
	background: #FFFFFF;

}

.setHeadBox_1{
	position: relative;
	width: 1300px;
	line-height: 80px;
	margin: 0 auto;
	text-align: left;
}
.setHeadBox_2{
	font-size: 16px;
	color: #1E1E1E;
    display: inline-block;
    width: 361px;
}
.setHeadBox_3{
	display: inline-block;
}
.setHeadBox_3>a{
	position: relative;
	display: inline-block;
	font-size: 14px;
	color: #1E1E1E;
	margin-right: 64px;
}
.setHeadBox_3>a:last-child{
	margin-right: 0;
}
.setHeadBox_3>a.router-link-active{
	color: #33B3FF;
}
.setHeadBox_3>a.router-link-active:after{
	content: "";
	position: absolute;
	bottom: 1px;
	left: 5%;
	
	width: 90%;
	height: 2px;
	background: #33B3FF;
}
.setHeadBox_3>a:hover{
	color: #33B3FF;
	opacity: .7;
}
</style>
