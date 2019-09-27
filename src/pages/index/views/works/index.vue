<template>
	<div class="csBox">		
		<div class="in_d1">
			<div :class="isTop?'in_d2':''">
				<div class="homghhd">			
					<a @click="qhNav('rec')" :class="['pend',type?'router-link-active':'']">首页推荐</a>
					<a @click="qhNav('')" :class="['pend',type?'':'router-link-active']">最新发布</a>	
				</div>	
			</div>
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
export default {
	components:{list,box_a},
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
			bdtjdata:[['首页','作品'],['首页','创作者']],
			type:'rec',
			isTop:'',
		}
	},
	mounted: function(){
		this.init()
		this.cs();
	}, 
	methods: {
		init(){
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
		},
		qhNav(on){
			if(on==this.type){return}
			this.type=on;
			if(on){
				this.data.pr.type = on;	
			}
			else{
				this.data.pr={};
			}		
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
			this.$refs.sfafa.sxfn();
			
		},
		setTop(e){		
			let t = document.documentElement.scrollTop||document.body.scrollTop;
			if(t==0){
				document.documentElement.scrollTop =1;
				document.body.scrollTop =1;
				return
			}
			if(t>55 && !this.isTop){
				this.isTop='isTop';
				return
			}
			if(t<=55 && this.isTop=='isTop'){				
				this.isTop='';
				return
			}
		},
		cs(){	
			document.removeEventListener('scroll',this.setTop);	
			document.addEventListener("scroll",this.setTop);
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
	height: 48px;	
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

.in_d2{
	z-index: 9999;
	position: fixed;
	top: 0;
	left: 0;
	background: #fff;
	width: 100%;
}
</style>