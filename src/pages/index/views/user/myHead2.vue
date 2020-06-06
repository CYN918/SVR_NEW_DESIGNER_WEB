<template>
	<div class="usn2">
	<pTop class="userNavBoxXz2" :cn="topCn">
		<template v-slot:todo="{ todo }">
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
	</pTop>			
	</div>
	
	
</template>
<script>
import pTop from '../../components/postionTop';
export default {
	components:{pTop},

	name: 'index',
	data(){
		return{
			ison:'',
			topCn:{
				min:68,
			},
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
			this.bdtj('我的关注','切换Tab',b);
			this.$router.push({path: a})			
		},
	
	}
}	
</script>

<style>
.usn2{
	height: 80px;
	
}
.myWorks_1{
	min-width: 1300px;
	height: 80px;
	background: #FFFFFF;

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
	height: 3px;
	background: #33B3FF;
}
.myWorks_4>a:hover{
	color: #33B3FF;
	opacity: .7;
}
.usn2 .p_isTop{
	z-index: 9999;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	
    -webkit-box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
    box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
}
</style>
