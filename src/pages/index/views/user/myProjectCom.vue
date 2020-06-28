<template>
	<div class="opfi">
		<tophead class="xm_u_01" :con="navData"></tophead>
		<div class="csBox opfi2">
			<list :config="data" class="pr_ml_0" ref="listDom">
				<template class="cs" v-slot:todo="{ todo }">
					<cent  :elm="todo"></cent>
				</template>			
			</list>
			
		</div>
		<component v-bind:is="tanc.zj" v-model="tanc"></component>		
	</div>
</template>
<script>
import tophead from './myHead';
import list from '../../components/list';
import cent from '../project/cent_3';
import sucsses from '../push_Zp/sucsses';
export default {
	components:{tophead,list,cent,sucsses},
	name: 'myAll',
	data(){
		return {
			tanc:{
				zj:'',
				type:''
			},
			pagename:'我的项目页',
			navData:{
				title:'我的项目',
				list:[
					{a:'/projectBm',b:'已报名'},
					{a:'/projectZz',b:'制作中'},
					{a:'/projectYs',b:'已验收'},									
				],
				bdtj:'我的项目页'				
			},
			isTypeList:{
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
			tanc2:{
				zj:''
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
			
			if(this.$route.query.type){
				this.tanc = {
					zj:'sucsses',
					type:this.$route.query.type
				};
			}
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
.pr_ml_0>li{
	display: block !important;
}
.csBox .pr_ml_0>li:nth-child(4n+4)>div {
    margin-right: auto !important;
}
</style>
