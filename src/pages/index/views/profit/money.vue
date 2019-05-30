<template>
	<div>
		<navd :config="sxConfig"></navd>
		<div class="pr_title2 pr_title2x">
			<span v-for="(el,index) in title" :key="index">{{el}}</span>
			
		</div>
		<list class="prList" :config="data">
			<template v-slot:todo="{ todo }">
				<div class="pr_title2 pr_title2x">
					<span>2019/02/30 18:00</span>
					<span>深圳掌酷软件…</span>
					<span>企业/机构</span>
					<span>2222 ******** 6666</span>
					<span>招商银行</span>
					<span>￥50,000.00</span>
					<span class="prList3"><span class="type1"></span>待处理</span>
					<span>2019/02/30 18:00</span>
					<span @click="showCh">撤回</span>
				</div>
				
			</template>			
		</list>
		<tancQr v-if="isCh" :cg="tanData"></tancQr>
	</div>
</template>

<script>
import navd from './navd';
import list from '../../components/list';
import tancQr from '../../components/tancQr';
export default {
	components:{navd,list,tancQr},
	name: 'pr_works',
	data(){
		return {
			isCh:'',
			sxConfig:{
				list2:[
					{label:'全部记录',value:0},
					{label:'近一年',value:1}
				],
				v2:1
			},
			data:{
				type:'box_a',
				ajax:{
					url:'getHList',
				}
			},	
			title:['提现时间','收款账户名','账号主体','银行卡号','开户银行','提现金额','当前状态','审核时间','操作'],
			tanData:{
				title:'确定撤回提现单？',
				btns:[{n:'取消',fn:'close'},{n:'确定',fn:'pushch',cls:'ysHei'}]
			}
		}
	},
	mounted: function(){}, 
	methods: {
		showCh(){
			this.isCh=1;
		},
		close(){
			this.isCh='';
		},
		pushch(){
			
		}
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
.pr_title2>li{
	box-sizing: border-box;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;
	padding: 30px;
	width: 100%;
}
.pr_title2{
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
.pr_title2x>span{
	display: inline-block;
	text-align: left;
	margin-right:45px;
}
.pr_title2x>span:nth-child(1){
	width: 118px;
}
.pr_title2x>span:nth-child(2){
	width: 98px;
}
.pr_title2x>span:nth-child(3){
	width: 63px;
}
.pr_title2x>span:nth-child(4){
	width: 135px;
}
.pr_title2x>span:nth-child(5){
	width: 56px;
}
.pr_title2x>span:nth-child(6){
	width: 120px;
}

.pr_title2x>span:nth-child(7){
	width: 118px;
}
.pr_title2x>span:nth-child(8){
	width: 109px;
}
.pr_title2x>span:last-child{
	width: 56px;
	margin-right: 0;
}

.prList>li>div{
	display: inline-block;
	vertical-align: top;
	margin-right: 105px;
	
}
.prList>li>div.pr_title2x{
	height: auto;
	line-height: initial;
	margin: 10px auto;
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
