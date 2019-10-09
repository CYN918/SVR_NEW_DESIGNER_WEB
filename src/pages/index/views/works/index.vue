<template>
	<div class="csBox">		
		<div class="in_d1">
			<pTop class="in_d3" :cn="topCn">
				<template v-slot:todo="{ todo }">
					<div class="homghhd">
						<a @click="qhNav('rec')" :class="['pend',type?'router-link-active':'']">首页推荐</a>
						<a @click="qhNav('')" :class="['pend',type?'':'router-link-active']">最新发布</a>	
					</div>	
				</template>		
			</pTop>
		</div>	
		<list :config="data" ref="sfafa">
			<template v-slot:todo="{ todo }">
				<box_a :tjData="bdtjdata" :el="todo"></box_a>
			</template>			
		</list>
	</div>
</template>
<script>

import list from '../../components/list';
import box_a from '../../components/box_a';
import pTop from '../../components/postionTop';
export default {
	components:{list,box_a,pTop},
	name: 'home',
	data(){
		return {
			data:{
				ajax:{
					url:'getHList',
				},
				pr:{
					type:'rec',
				},
				bdtj:[['首页','翻页'],['首页','更改单页显示数']]				
			},	
			topCn:{
				min:60,
			},
			bdtjdata:[['首页','作品'],['首页','创作者']],
			type:'rec',
			isTop:'',
			adFn:'',
		}
	},
	mounted: function(){
		this.init()		
	}, 
	methods: {
		init(){
			this.mJs.scTop(1);
		},
		qhNav(on){
			if(on==this.type){return}
			this.type=on;
			this.data.pr={};
			if(on){
				this.data.pr.type = on;	
			}
			this.mJs.scTop(1);	
			this.$refs.sfafa.sxfn();			
		},
	}
}
</script>

<style>
.proNav2{
	padding-top: 7px;
	border-bottom: 2px solid #E6E6E6;
}
.in_d1{
	height: 75px;	
}
.in_d3{
	width: 100%;
	height: 75px;
}
.proNav2_1{
	position: relative;
	text-align: center;
	margin: 0 auto;
	line-height: 48px;
	height: 48px;
	width: 1300px;
}
.proNav2_1>a{
	display: inline-block;
	margin: 0 20px;
	font-size:16px;
	font-weight:400;
	color:rgba(30,30,30,1);
}
.proNav2_1>a.router-link-active{
	font-weight:500;
	color:rgba(255,81,33,1);
}
.proNav2_1>a.router-link-active:after{
	content: "";
	display: block;
	margin: 0 auto;
	background: #FF5121;
	width: 100%;
	height: 2px;
	
}
.homghhd{
	margin: 0 auto ;
	width: 1300px;
	padding: 27px 0 ;
	text-align: center;
}
	
.homghhd>a{
	position: relative;
	display: inline-block;
	font-size:16px;
	font-weight:400;
	color:rgba(30,30,30,1);
	line-height:22px;
	margin-right: 40px;
}
.homghhd>a.router-link-active{
	color: #FF5121;
}

.in_d1 .p_isTop{
	z-index: 9999;
	position: fixed;
	top: 0;
	left: 0;

	width: 100%;
	-webkit-animation: bjs .3s linear forwards;
	animation: bjs .3s linear forwards;
}

</style>