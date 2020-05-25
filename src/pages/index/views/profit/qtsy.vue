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
					{n:'收益类型',clfn:(da)=>{if(da.work_type == 2){return '其他收益'}}},
					{n:'备注信息',clfn:(da)=>{if(da.desc_reason == ''){return '暂无备注信息'}else{return da.desc_reason}}},
					{n:'收益发放时间',poprs:'hire_time'},
					{n:'收益金额',poprs:'income'},
				],
					
				ajax:{
					url:'Income_hireworkList',
				},
				pr:{work_type:2},
							
			},
			dataList:[1,2,3,4,5,6,7],
			sxConfig:{
				
				list2:[
					{label:'全部记录',value:0},
					{label:'近一周',value:7},
					{label:'近一个月',value:30},
					{label:'近半年',value:183},
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
			// this.config.pr.time = parseInt(new Date().getTime()/1000)-(30*60*60*24);
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
