<template>
	<div>
		<navd :config="sxConfig"></navd>
		<prTable :cg="config" ref="tabds"></prTable>
	</div>
</template>

<script>
import navd from './navd';
import prTable from './prTable';
export default {
	components:{navd,prTable},
	name: 'pr_works',
	data(){
		return {
			config:{
				title:[
					{n:'提现时间',poprs:'apply_time'},
					{n:'收款账户名',clfn:(da)=>{ 
							let len = da.account_name.length,
							str = da.account_name.substring(-1,1),
							xx = '';
							for(let i=0;i<len-1;i++){
								xx+='*';
							}
							return xx+str;
						},
					},
					{n:'帐号主体',clfn:(da)=>{ 
							return da.contributor_type==1?'个人':'企业/机构';
						},					
					},
					{n:'银行卡号',clfn:(da)=>{ 
							return da.bank_card_id.substring(0,4)+'*******'+da.bank_card_id.substring(-1,4);
						},					
					},
					{n:'开户银行',poprs:'bank_name'},
					{n:'提现金额',poprs:'cash_money'},
					{n:'当前状态',temp:{cFn:'',clfn:(da)=>{
							if(da.check_status==0){
								return '<span class="cojType"><i></i>待审核</span>';
							}
							if(da.check_status==1){
								return '<span class="cojType"><i></i>审核中</span>';
							}
							if(da.check_status==2){
								return '<span class="cojType"><i></i>审核中</span>';
							}
							if(da.check_status==3){
								return '<span class="cojType cojType1"><i></i>已付款</span>';
							}
							if(da.check_status==3){
								return '<span class="cojType cojType2"><i></i>审核不通过</span>';
							}
						}}
					},
					{n:'审核时间',poprs:'check_time'},
					{n:'操作',temp:{cFn:'chtj',clfn:(da)=>{
							if(da.check_status==0){
								return '<span class="pend">撤回</span>';
							}
							if(da.check_status==1){
								return '<span class="pend">撤回</span>';
							}
							if(da.check_status==2){
								return '<span class="pend">撤回</span>';
							}
							if(da.check_status==3){
								return '<span>--</span>';
							}
							if(da.check_status==3){
								return '<span class="pend">撤回</span>';
							}
						}}
					}
				],
				
				ajax:{
					url:'Income_applyList',
				},
				setp:(da)=>{			
					da.time =  new Date().getTime()-(30*1000*60*60*24);				
				},			
							
			},
			sxConfig:{
				list2:[
					{label:'全部记录',value:0},
					{label:'近一周',value:7},
					{label:'近一个月',value:30},
					{label:'近一半年',value:183},
					{label:'近一年',value:365}
				],
				v2:30
			},
			timed:30,

		}
	},
	mounted: function(){}, 
	methods: {

		chtj(d){
			alert(111);
		},
		setTim(o){
			this.timed = o;
			this.$refs.tabds.sxfn((da)=>{	
				if(this.timed!=0){
					da.time =  new Date().getTime()-(this.timed*1000*60*60*24);
				}
					
			});
		}
	}
}
</script>

<style>
.cojType>i{
	display: inline-block;
	vertical-align: middle;
	margin-right: 10px;
	background: #FF9901;
	border-radius: 50%;
	width: 6px;
	height: 6px;
}
.cojType1{
	background: #67C239;
}
.cojType2{
	background: #FF0000;
}
</style>
