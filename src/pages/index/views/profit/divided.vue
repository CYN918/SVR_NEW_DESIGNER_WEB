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
	name: 'pr_divided',
	data(){
		return {
			config:{
				title:[
					{n:'结算日期',poprs:'balance_date'},
					{n:'项目名称',temp:{cFn:'goWork',poprs:'name',cls:'pend',clfn:(d)=>{
						return '<span class="ficSp1">'+d.name+'</span>';
					}}},
					{n:'收益加成',clfn:(da)=>{return '￥'+this.mJs.money_deiv(da.profit_fee)+'(' + '+' +da.gain_share_rate+'%)'}},
					{n:'收益',t:'1',temp:{cFn:'',clfn:(da)=>{if(da.deal_type == '3'){return '￥'+this.mJs.money_deiv(da.balance_fee)+'(已付预付金)' + '<img class="pbx_n_img" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/09.svg" alt=""/>'}else if(da.deal_type == '2'){return '<span class="sy">' + '￥'+this.mJs.money_deiv(da.balance_fee) + '</span>'}else{return}}}},
				],
					
				ajax:{
					url:'Income_personMoney',
				},
				pr:{work_type:3},
							
			},
			dataList:[1,2,3,4,5,6,7],
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
			this.$router.push({path: '/prcent',query:{id:d.work_id}});
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

</style>
