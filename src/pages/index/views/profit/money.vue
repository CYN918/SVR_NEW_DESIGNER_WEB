<template>
	<div>
		<navd :config="sxConfig"></navd>
		<div class="pr_title">
			<span v-for="(el,index) in title" :key="index">{{el}}</span>
			
		</div>
		<list class="prList" :config="data">
			<template v-slot:todo="{ todo }">
				<div class="prList1">
					<div class="prList1_1" style="background-image: url(http://zk-new-designer.oss-cn-beijing.aliyuncs.com/058ffd3ada2d7b0d799c2097e7c6a11f.png);"></div>
				
					<div class="prList1_2">
						<div class="prList1_3">小魔熊-设计品牌IP形象</div>
						<div class="prList1_4">原创-平面-海报</div>
						<div class="prList1_5">2019/02/13 18:00:00</div>
					</div>
				</div>
				<div class="prList1">
					<div class="prList1_1" style="background-image: url(http://zk-new-designer.oss-cn-beijing.aliyuncs.com/058ffd3ada2d7b0d799c2097e7c6a11f.png);"></div>
					<div class="prList1_2">
						<div class="prList1_3">小魔熊-设计品牌IP形象</div>
						<div class="prList1_4">原创-平面-海报</div>
						<div class="prList1_5">2019/02/13 18:00:00</div>
					</div>
				</div>
				<div class="prList2">￥50，000.00</div>
				<div class="prList3"><span :class="todo.id=='711'?'type1':todo.id=='709'?'type2':'type3'"></span>1 条投放中</div>
				<div class="prList4"><span class="prList4_1 pend">查看详情</span></div>
			</template>			
		</list>
	</div>
</template>

<script>
import navd from './navd';
import list from '../../components/list';
export default {
	components:{navd,list},
	name: 'pr_works',
	data(){
		return {
			sxConfig:{
				list1:[
					{label:'全部记录',value:0},
					{label:'买断式',value:1},
					{label:'分成式',value:2}
				],
				v1:0,
				list2:[
					{label:'全部记录',value:0},
					{label:'近一周',value:1},
					{label:'近一个月',value:2},
					{label:'近一半年',value:3},
					{label:'近一年',value:4}
				],
				v2:0
			},
			data:{
				type:'box_a',
				ajax:{
					url:'getHList',
				}
			},	
			title:['录用作品信息','所属活动信息','总结算收益','订单状态','操作']
		}
	},
	mounted: function(){}, 
	methods: {
		
	}
}
</script>

<style>
.prList{
	box-sizing: border-box;
    display: block;
    margin: 0 auto;
    width: 1300px;
    padding: 0 0 160px;
}
.prList>li{
	box-sizing: border-box;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;
	padding: 30px;
	width: 100%;
}
.pr_title{
	text-align: left;
	box-sizing: border-box;
	margin: 20px auto;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;
	padding: 20px 30px;
	font-size:14px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:20px;
	width: 1300px;
}
.pr_title>span{
	display: inline-block;
	text-align: left;
	margin-right: 112px;
}
.pr_title>span:nth-child(1){
	width: 280px;
}
.pr_title>span:nth-child(2){
	width: 280px;
}
.pr_title>span:nth-child(3){
	width: 91px;
}
.pr_title>span:nth-child(4){
	width: 60px;
}
.pr_title>span:nth-child(5){
	width: 56px;
	margin-right: 0;
}

.prList>li>div{
	display: inline-block;
	vertical-align: top;
	margin-right: 105px;
	height: 75px;
	line-height: 75px;
}
.prList>li>div:last-child{
	margin-right: 0;
}
.prList1{
	display: inline-block;
	width: 280px;
}
.prList1_1{
	display: inline-block;
	vertical-align: top;
	margin-right: 10px;
	background-size: cover;
	width:100px;
	height:75px;
	border-radius:5px;
}
.prList1_2{
	display: inline-block;
	vertical-align: top;
}
.prList1_3{
	margin-bottom: 4px;
	font-size:16px;
	font-weight:500;
	width: 165px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
	color:rgba(19,19,19,1);
	line-height:22px;	
}
.prList1_4{
	margin-bottom: 12px;
	font-size:14px;
	font-weight:400;
	color:rgba(19,19,19,1);
	line-height:20px;
}
.prList1_5{
	font-size:12px;
	font-weight:400;
	color:rgba(19,19,19,1);
	line-height:17px;
}
.prList2{
	font-size:14px;
	font-weight:500;
	color:rgba(30,30,30,1);
	margin-right: 5px !important;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 195px;
	height: 75px;
	line-height: 75px;
}
.prList4_1{
	color: #FF5121;
}
.prList3>span{
	display: inline-block;
	vertical-align: middle;
	border-radius: 50%;
	margin-right: 10px;
	width:6px;
	height:6px;
	
}
.type1{
	background:rgba(255,153,1,1);
}
.type2{
	background:rgba(103,194,57,1);
}
.type3{
	background:rgba(255,153,1,1);
}
</style>
