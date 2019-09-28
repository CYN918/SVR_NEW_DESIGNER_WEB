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
					{n:'结算日期',poprs:'settle_time'},
					{n:'作品标题',temp:{cFn:'goWork',poprs:'work_name',cls:'pend'}},
					{n:'结算收益',poprs:'settle_income'},					
				],					
				ajax:{
					url:'Income_flowList',
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
		}
	},
	created(){
		this.init();
	},	
	methods: {
		init(){			  	
			this.config.pr.time = new Date().getTime()-(30*60*60*24);
		},
		goWork(d){
			this.$router.push({path: '/cont',query:{id:d.work_id}});
		},
		setTim(o){
			this.timed = o;
			this.config.pr.time = new Date().getTime()-(this.timed*60*60*24);
			this.$refs.tabds.sxfn();
		}
	}
}
</script>

<style>

</style>
