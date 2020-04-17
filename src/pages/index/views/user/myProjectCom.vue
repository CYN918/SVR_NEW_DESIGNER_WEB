<template>
	<div class="opfi">
		<tophead class="xm_u_01" :con="navData"></tophead>
		<div class="csBox opfi2">
			<list :config="data" class="iopdlf_01" ref="listDom">
				<template v-slot:todo="{ todo }">
					<cent :elm="todo"></cent>
				</template>			
			</list>
			
		</div>
	</div>
</template>
<script>
import tophead from './myHead';

import list from '../../components/list';
import cent from '../project/cent_2';
export default {
	components:{tophead,list,cent},
	name: 'myAll',
	data(){
		return {
			navData:{
				title:'我的项目',
				list:[
					// {a:'/projectAll',b:'全部'},
					{a:'/projectBm',b:'已报名'},
					{a:'/projectZz',b:'制作中'},
					{a:'/projectYs',b:'已验收'},									
				],
				bdtj:'我的项目'				
			},
			isTypeList:{
				// projectAll:'',
				projectBm:'1',
				projectZz:'2',
				projectYs:'3',
			},
			
			data:{
				ajax:{
					url:'pr_personalList',
				
				},
				pr:{},
				isDjs:1,

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
			this.data.pr = {};
			if(this.$route.name=='projectAll'){return}			
			this.data.pr.type =  this.isTypeList[this.$route.name];
		},
		
	}
}
</script>

<style>
.opfi{
	background: #f4f6f9;
}
.opfi2{
	padding-top: 20px;
}
.iopdlf_01>li{
	display: inline-block;
	margin-bottom: 40px;
	margin-right: 20px;
}
.iopdlf_01>li:nth-child(2n+2){
	margin-right: 0;
}
.opfi .xm_u_01{
	-webkit-box-shadow: none;
	box-shadow: none;
}
.xm_u_01 .myWorks_3{
	font-size: 16px;
}
.xm_u_01 .myWorks_4>a{
	font-size: 14px;
}
</style>
