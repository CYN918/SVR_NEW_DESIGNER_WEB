<template>
	<div>
		<navd :config="sxConfig"></navd>
		<prTable :cg="config"></prTable>
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
				title:['作品标题','作品分类','发布时间','所属活动名','录用时间','录用方式','收益'],				
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
					{label:'近一周',value:1},
					{label:'近一个月',value:2},
					{label:'近一半年',value:3},
					{label:'近一年',value:4}
				],
				v2:2
			},
			data:{
				type:'box_a',
				ajax:{
					url:'getHList',
				}
			},

		}
	},
	mounted: function(){}, 
	methods: {

	}
}
</script>

<style>

</style>
