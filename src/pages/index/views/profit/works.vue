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
					{n:'作品标题',temp:{cFn:'goWork',poprs:'work_name',cls:'pend'}},
					{n:'作品分类',clfn:(da)=>{ return da.classify_1_name+'-'+da.classify_2_name+'-'+da.classify_3_name}},
					{n:'发布时间',poprs:'created_at'},
					{n:'所属活动名',temp:{cFn:'goAc',poprs:'activity_name',cls:'pend'}},
					{n:'录用时间',poprs:'hire_time'},
					{n:'录用方式',clfn:(da)=>{ return da.hire_type==1?'买断':'分成'}},
					{n:'收益',poprs:'income'},
				],
					
				ajax:{
					url:'Income_hireworkList',
				},
				pr:{},
							
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
			this.config.pr.time =  parseInt(new Date().getTime()/1000)-(this.timed*60*60*24);
			this.$refs.tabds.sxfn();
		}
	}
}
</script>

<style>

</style>
