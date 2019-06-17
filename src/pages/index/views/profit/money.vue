<template>
	<div>
		<navd :config="sxConfig"></navd>
		<prTable :cg="config" ref="tabds"></prTable>
		<tancQr v-if="isCh" :cg="qrCg"></tancQr>
	</div>
</template>

<script>
import navd from './navd';
import tancQr from '../../components/tancQr';
import prTable from './prTable';
import {Message} from 'element-ui'
export default {
	components:{navd,prTable,tancQr},
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
								return '<span class="cojType"><i></i>审核通过</span>';
							}
							if(da.check_status==3){
								return '<span class="cojType cojType1"><i></i>已付款</span>';
							}
							if(da.check_status==-1){
								return '<span class="cojType cojType2"><i></i>审核不通过</span>';
							}
							if(da.check_status==-2){
								return '<span class="cojType cojType2"><i></i>撤回</span>';
							}
						}}
					},
					{n:'审核时间',poprs:'check_time'},
					{n:'操作',temp:{cFn:'chtj',clfn:(da)=>{
							if(da.check_status==0){
								return '<span class="pend">撤回</span>';
							}
							return '<span>--</span>';
						}}
					}
				],
				
				ajax:{
					url:'Income_applyList',
				},
				pr:{}	
							
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
			cxType:0,
			qrCg:{
				title:"确定撤回提现单？",
				btns:[{n:'取消',fn:'close'},{n:'确定',fn:'tcOk'}],
			},
			chid:'',
			isCh:'',
			je:0,
		}
	},
	created(){
		this.init();
	},	
	methods: {
		init(){			  	
			this.config.pr.time = new Date().getTime()-(30*1000*60*60*24);
		},
		addGetData(){
			this.config.pr.time =  new Date().getTime()-(this.timed*1000*60*60*24);
			this.$refs.tabds.sxfn();
		},
		tcOk(){
			if(this.cxType==1){
				Message({message: '正在提交请稍后'});
				return
			}
			let pr = {
				apply_id:this.chid
			};
			this.cxType=1;
					
			this.api.Income_applyCancel(pr).then((da)=>{
				this.cxType=0;
				if(da=='undefined'){return}	
				this.$parent.basDa.account_balance = this.$parent.basDa.account_balance+(+this.je);
				this.$parent.num1 = '￥ '+this.$parent.basDa.account_balance;
				this.close();
				
				this.$refs.tabds.sxfn();
				
				
				this.chid='';	
			}).catch(()=>{				
				this.cxType=0;
			});
		},
		chtj(d){
			if(d.check_status!=0){
				return
			}
			this.isCh = 1;
			this.chid = d.apply_id;
			this.je = d.cash_money;
		},
		close(){
			this.isCh = '';
			this.chid='';
		},
		setTim(o){
			this.timed = o;
			this.config.pr.time =  new Date().getTime()-(this.timed*1000*60*60*24);
			this.$refs.tabds.sxfn();
		},
		
	},
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
.cojType1>i{
	background: #67C239;
}
.cojType2>i{
	background: #FF0000;
}
</style>
