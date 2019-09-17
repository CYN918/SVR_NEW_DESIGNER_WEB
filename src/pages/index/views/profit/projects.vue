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
					{n:'项目名称',temp:{cFn:'goWork',poprs:'name',cls:'pend'}},
					{n:'验收价格',poprs:'acceptance_price'},
					{n:'额外奖金',poprs:'extra_reward'},
					{n:'延时交稿扣减',temp:{cFn:'goAc',poprs:'activity_name',cls:'pend'}},
					{n:'收益加成',clfn:(da)=>{ return da.gain_share_price+'('+da.gain_share_rate+')'}},
					{n:'成交价格',clfn:(da)=>{ return da.deal_price}},
					{n:'验收时间',poprs:'delivery_deadline'},
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
			this.config.pr.time = new Date().getTime()-(30*1000*60*60*24);
		},

		goWork(d){
			this.$router.push({path: '/cont',query:{id:d.work_id}});
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
			this.config.pr.time =  new Date().getTime()-(this.timed*1000*60*60*24);
			this.$refs.tabds.sxfn();
		}
	}
}
</script>

<style>

</style>
