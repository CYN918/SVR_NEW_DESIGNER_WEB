<template>
	<div class="pr_box">		
		<div class="pr_01">
			<div>
				<div class="pr_01_1">
					发挥所长，轻松赚钱，从这里开始<br/>狮圈儿，让<span class="pr_01_2">创意更有价值</span>，让生活更加自由
				</div>
				<div class="pr_01_3">项目每周更新发布，专业平台团队把控，只提供优质稳定的项目需求。</div>
			</div>
		</div>
		<div class="pr_02">
			<div class="pr_02_1">
				<span 
				v-for="(el,index) in prLn" 
				:key="index"
				:class="['pr_02_2 pend',type==index?'pr_02_2On':'']"
				@click="qhNav(index)"
				>{{el.classify_name+'（'+el.project_num+'）'}}</span>
				<span @click="goOn('/help',{on:'4_1'})" class="pr_02_3 pend">项目承接指南</span>
			</div>
			<list :page="setPage" :config="data" class="iopdlf_01" ref="sfafa">
				<template v-slot:todo="{ todo }">
					<cent :djs="djson" :el="todo"></cent>
					
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
					
				},
				bdtj:[['首页','翻页'],['首页','更改单页显示数']]
				
			},	
			setPage:{page:1,limit:10,size:[10,20,40,60]},
			bdtjdata:[['首页','作品'],['首页','创作者']],
			type:0,
			cont:50,
			djson:0,
			prLn:[],
		}
	},
	mounted: function(){
		this.getCl();
	}, 
	methods: {
		goOn(on,cs){
			this.$router.push({path:on,query:cs})	
		},
		getCl(){
			this.api.pr_classify().then((da)=>{
				if(da=='error'){
					return
				}
				this.prLn = da;
			})
		},
		qhNav(on){
			if(on==this.type){return}
			this.type=on;
			if(this.prLn[on].id){
				this.data.pr.classify_id = this.prLn[on].id;
				
			}else{
				this.data.pr = {};
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
	padding: 20px 0;
    text-align: left;
	background: #fff;
}
.pr_01>div{
	margin: 0 auto;
	width: 1300px;
}
.pr_01_1{
	margin-bottom: 20px;
	font-size:36px;
	font-weight:400;
	color:rgba(40,40,40,1);
	line-height:50px;
	font-family:PingFang SC Regular;
}
.pr_01_2{
	display: inline-block;
	background: #F06431;
	color: #fff;	
}
.pr_01_3{
	font-size:14px;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.pr_02{
	padding: 20px 0 50px;
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