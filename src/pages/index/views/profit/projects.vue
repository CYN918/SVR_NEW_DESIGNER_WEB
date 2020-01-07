<template>
	<div>
		<navd :config="sxConfig"></navd>
		<prTable class="xmdd_01" :cg="config" ref="tabds"></prTable>
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
					{n:'项目名称',temp:{cFn:'goWork',poprs:'name',cls:'pend',clfn:(d)=>{
						return '<img class="ficPic" src="'+d.banner+'"/><span class="ficSp1">'+d.name+'<span class="ficSp">'+d.classify_name+'</span></span>';
					}}},
					{n:'验收价格',clfn:(da)=>{ return '￥'+this.mJs.money_deiv(da.acceptance_price)}},
					{n:'额外奖金',clfn:(da)=>{ return '￥'+this.mJs.money_deiv(da.extra_reward)}},
					{n:'延时交稿扣减',clfn:(da)=>{ return '-￥'+this.mJs.money_deiv(da.deduction_price)}},
					{n:'收益加成',clfn:(da)=>{ return '￥'+this.mJs.money_deiv(da.gain_share_price)+'('+da.gain_share_rate+'%)'}},
					{n:'成交价格',temp:{cls:'pend',clfn:(d)=>{
						return '<span class="font_cf">￥'+this.mJs.money_deiv(d.deal_price)+'</span>';
					}}},
			
					{n:'验收时间',clfn:(da)=>{ return this.mJs.backTime(da.delivery_deadline,'/')}},
					
					
					
				],
					
				ajax:{
					url:'Income_hireworkList',
				},
				pr:{work_type:3},
							
			},
			dataList:[1,2,3,4,5,6,7],
			sxConfig:{
				list1:[
					{label:'全部记录',value:0},
					{label:'买断式',value:1},
					{label:'分成式',value:2}
				],
				v1:0,
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
			typed:1,

		}
	},
	created(){
		this.init();
	},	
	methods: {
		init(){			  	
			this.config.pr.time = parseInt(new Date().getTime()/1000)-(30*60*60*24);
		},

		goWork(d){
			this.$router.push({path: '/prcent',query:{id:d.project_id}});
		},
		goAc(d){
			this.$router.push({path: '/detailed',query:{id:d.activity_id}});
		},
		setType(o){
			this.typed = o;
			if(this.typed!=0){
				this.config.pr.hire_type =this.typed;
			}		
			this.$refs.tabds.sxfn();
		},
		setTim(o){
			this.timed = o;
			this.config.pr.time =  parseInt(new Date().getTime()/1000)-(this.timed*60*60*24);
			this.$refs.tabds.sxfn();
		}
	}
}
</script>

<style>
.xmdd_01{
	color: #666;
}
.ficPic{
	display: inline-block;
	vertical-align: top;
	width: 72px;
	height: 52px;
	border-radius: 5px;
	margin: 16px 10px 16px 0;
	vertical-align: middle;
}
.ficSp1{
	display: inline-block;
	vertical-align: top;
}
.ficSp{
	display: block;
	font-size: 14px;
	color: rgba(187,187,187,1);
	line-height: 5px;
}
.font_cf{
	color: #33B3FF;
}
</style>
