<template>
	<div class="csBox">
		<baner></baner>
		<div class="homghhd">			
			<a @click="qhNav('')" :class="['pend',type?'':'router-link-active']">首页推荐</a>
			<a @click="qhNav('rec')" :class="['pend',type?'router-link-active':'']">最新发布</a>	
		</div>		
		<list :config="data" ref="sfafa">
			<template v-slot:todo="{ todo }">
				<box_a :el="todo"></box_a>
			</template>			
		</list>
	</div>
</template>
<script>
import baner from './banner';
import list from '../components/list';
import box_a from '../components/box_a';
export default {
	components:{baner,list,box_a},
	name: 'home',
	data(){
		return {
			data:{
				type:'box_a',
				ajax:{
					url:'getHList',
				},
				setp:(da)=>{
					
					da.type ='rec';
					return true;
				}
				
			},	
			type:'',
		}
	},
	mounted: function(){
	}, 
	methods: {
		qhNav(on){
			if(on==this.type){return}
			this.type=on;
			this.$refs.sfafa.sxfn((da)=>{
				if(this.type){
					da.type =this.type;
				}
			});
		}
	}
}
</script>

<style>
.proNav2{
	padding-top: 7px;
	border-bottom: 2px solid #E6E6E6;
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
	margin: 27px auto 27px;
	width: 1300px;
	margin-bottom: 20px;
	text-align: left;
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
.homghhd>a.router-link-active:after{
	content: "";
	position: absolute;
	width: 90%;
	height: 2px;
	background: #FF5121;
	bottom: -7px;
	left: 50%;
	transform: translateX(-50%);
}
</style>