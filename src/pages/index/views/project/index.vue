<template>
	<div class="pr_box">		
		<div class="pr_01">
			<div class="pr_01_1">
				找到值得心仪的接单项目让<span class="pr_01_2">创意完美实现</span>。
			</div>
			<div class="pr_01_3">每日，平台都会发布不同的项目需求，专业平台团队把控，只发布优质稳定的项目。</div>
		</div>
		<div class="pr_02">
			<div class="pr_02_1">
				<span 
				v-for="(el,index) in prLn" 
				:key="index"
				:class="['pr_02_2',onId==el.id?'pr_02_2On':'']"
				>{{el.classify_name+'（'+el.project_num+'）'}}</span>
				<span class="pr_02_3 pend">项目承接指南</span>
			</div>
			<list :config="data" class="iopdlf_01" ref="sfafa">
				<template v-slot:todo="{ todo }">
					<cent></cent>
					
					<!-- <box_a :tjData="bdtjdata" :el="todo"></box_a> -->
				</template>			
			</list>
		</div>
	</div>
</template>
<script>
import list from '../../components/list';
import cent from './cent_1';
export default {
	components:{list,cent},
	name: 'home',
	data(){
		return {
			data:{
				ajax:{
					url:'pr_list',
				},
				pr:{
					type:'rec',
				},
				bdtj:[['首页','翻页'],['首页','更改单页显示数']]
				
			},	
			bdtjdata:[['首页','作品'],['首页','创作者']],
			type:'rec',
			cont:50,
			onId:0,
			prLn:[],
		}
	},
	mounted: function(){
		this.getCl();
	}, 
	methods: {
		getCl(){
			this.api.pr_classify().then((da)=>{
				if(da=='error'){
					return
				}
				this.prLn = da;
			})
			this.prLn = [				
				{id:0,classify_name:'全部',project_num:50},
				{id:1,classify_name:'视觉设计',project_num:10},
				{id:2,classify_name:'设计加工',project_num:40},
				{id:3,classify_name:'图标设计',project_num:40},
				{id:4,classify_name:'动效加工',project_num:40},
				{id:5,classify_name:'动作脚本',project_num:40},
			];
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
			this.$refs.sfafa.sxfn();
			
		}
	}
}
</script>

<style>
.pr_box{
	background:rgba(244,246,249,1);
}
.pr_01{
	padding: 40px 0 60px 310px;
    text-align: left;
	background: #fff;
}
.pr_01_1{
	margin-bottom: 20px;
	font-size:36px;
	font-weight:400;
	color:rgba(40,40,40,1);
	line-height:50px;
	width: 400px;
}
.pr_01_2{
	display: inline-block;
	background: #F06431;
	color: #fff;	
}
.pr_01_3{
	margin-bottom: 60px;
	font-size:14px;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.pr_02{
	padding: 50px 0;
	margin: 0 auto;
	width: 1300px;
}
.pr_02_1{
	text-align: left;
	height: 40px;
	line-height: 40px;
	margin-bottom: 50px;
}
.pr_02_2{
	
	font-size:14px;
	font-weight:400;
	margin-right: 40px;
}
.pr_02_2On{
	color:rgba(255,81,33,1);
}
.pr_02_3{
	display: inline-block;
	float: right;
	background:rgba(255,81,33,1);
	border-radius:5px;
	width:140px;
	height:40px;
	text-align: center;
	line-height: 40px;
	color: #fff;
	font-size:14px;
	font-weight:400;
}
.iopdlf_01>li{
	display: inline-block;
	margin-bottom: 40px;
	margin-right: 20px;
}
.iopdlf_01>li:nth-child(2n+2){
	margin-right: 0;
}
</style>