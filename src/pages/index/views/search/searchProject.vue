<template>
	<div class="csBox csBoxxxxx">
		<tophead :clasd="clasd" :pz="pzcon" :onNav="2" ref="mytopcs"></tophead>
		
		<list class="seccPr" :isDjs="'1'" :config="data" ref="sfafa">
			<template v-slot:todo="{ todo }">
				<cent :djs="djson" :conf="pr_con" :el="todo"></cent>
			</template>			
		</list>
	</div>
</template>

<script>

import list from '../../components/list';
import tophead from './head';
import cent from '../project/cent_1';
export default {
	components:{tophead,list,cent},
	name: 'home',
	data(){
		return {
			pzcon:{
				va:2
			},
			data:{
				ajax:{
					url:'Searchsearch',
				},
				pr:{
					type:'project',
				},
				
				
			},	
			pr_con:{
				t_show:'',
			},
			bdtjdata:[['搜索页','作品'],['搜索页','创作者']],
			querys:'',
			clasd:[],
			djson:0,
			djsOb:'',
			
		}
	},
	created(){
		this.init();
	},	
	mounted: function(){
		this.$refs.mytopcs.setCont(this.data.pr.query);
		
		
		this.getClassify();
	}, 
	methods: {
		stardjs(){
			clearInterval(this.djsOb);
			this.djsOb = setInterval(()=>{
				if(this.$route.name!='searchProject'){
					clearInterval(this.djsOb);
				}
				this.djson = this.djson==1?0:1;
			},1000);
		},
		djsjs(){
			clearInterval(this.djsOb);
			this.$refs.sfafa.getData();
		},
		init(){
			this.data.pr.query =this.$route.query.cont || '';				
		},
		getData(){
			this.data.pr.query =this.$route.query.cont || '';	
			this.$refs.sfafa.getData();
		},
		getClassify(){
			this.api.pr_classify().then((da)=>{
				if(da=='error'){
					return
				}
				let arr = [{label:'全部',value:''}];
				for(let i=0,n=da.length;i<n;i++){
					arr.push({
						label:da[i].classify_name,
						value:da[i].id,
					})
				}
				this.clasd = arr;
			})			
		},
		sreond(n){
			this.data.pr = {
				type:'project',
			};
			if(n[0]){
				this.data.pr.classify_id = n[0];
			}			
			this.getData();
		},
	},
	watch: {
		'$route': function() {
			this.getData();
			
		},
		
	},

}
</script>

<style>
.seccPr{
	padding-top: 20px;
}
.csBox{
	background: #f4f6f9;
}
.seccPr li{
	margin: 0 20px 40px 0;
}
.seccPr li:nth-child(2n+2){
	margin-right: 0;
}
.seccPr .emptyData{
	margin: 0 auto;
}
.seccPr{
	margin-bottom: 40px;
}
</style>