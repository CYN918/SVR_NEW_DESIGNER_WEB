<template>
	<div>
		<tophead :con="navData"></tophead>
		<div class="csBox opodd">
			<list :config="data" ref="listDom">
				<template v-slot:todo="{ todo }">
					111111
				</template>			
			</list>
		</div>
	</div>
</template>
<script>
import tophead from './myHead';
import list from '../../components/list';
export default {
	components:{tophead,list},
	name: 'myAll',
	data(){
		return {
			navData:{
				title:'我的项目',
				list:[
					{a:'/projectAll',b:'全部'},
					{a:'/projectBm',b:'已报名'},
					{a:'/projectZz',b:'制作中'},
					{a:'/projectYs',b:'已验收'},									
				],
				bdtj:'我的项目'				
			},
			isTypeList:{
				projectAll:'all',
				projectBm:'0',
				projectZz:'-2',
				projectYs:'2',
			},
			
			data:{
				ajax:{
					url:'getSelfWorkList',
				},
				pr:{},

			},
			
		}
	},
	created(){
		this.init();
	},	
	watch: {
		
		'$route': function() {
			this.init();
			this.$refs.listDom.getData();
		},
	},
	methods: {
		init(){
			this.data.pr.status =  this.isTypeList[this.$route.name];
		},
		
	}
}
</script>

<style>
.opodd{
	padding-top: 20px;
}
</style>
