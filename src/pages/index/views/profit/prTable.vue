<template>
	<div class="pr_boxd">
		<table class="tabld" border="1">
			<tr >
				<th v-for="(el,index) in cg.title" :key="index">{{el}}</th>
			</tr>
			<tr v-for="(el,index) in da" :key="index">
				<td>2019/02/30 18:00</td>
				<td>2019/02/30 18:00</td>
				<td>2019/02/30 18:00</td>
				<td>2019/02/30 18:00</td>
				<td>2019/02/30 18:00</td>
				<td>买断式</td>
				<td>2019/02/30 18:00</td>
			</tr>
	
		</table>
		
		<el-pagination class="pagesddd"
		background
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page="page"
		:page-sizes="[40, 80, 120, 160]"
		:page-size="limit"
		layout="prev,pager, next,sizes, jumper"
		:total="total">   
		</el-pagination>
		
	</div>
</template>

<script>
export default {
	name: 'prTable',
	props:{
		cg:{
			type:Object,
			default:{}
		},
	
	},
	data(){
		return {
			da:[1,2,3,4,5],
			page:1,
			limit:40,
			total:0
		}
	},
	mounted: function(){}, 
	methods: {
		getData(){
			
		},
		handleSizeChange(val) {
			this.limit = val;
			this.page=1;
			this.getData();
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getData();
		}
	}
}
</script>

<style>
.pr_boxd{
	width: 1300px;
	margin: 20px auto 140px;
}
.tabld{
	width: 100%;
	text-align: left;
	border: none;
	line-height: 55px;
	border-collapse: collapse;
}
.tabld th{
	padding-left: 20px;
	background: gainsboro;
	border: none;

}
.tabld td{
	padding-left: 20px;
	border: none;
	border-bottom: 1px solid #E6E6E6;
}
</style>
