<template>
	<div class="csBox csBoxxxxx">
		<tophead :clasd="clasd"  :onNav="0" ref="mytopcs"></tophead>
		
		<list :config="data" ref="sfafa">
			<template v-slot:todo="{ todo }">
				<cent :djs="djson" :el="todo"></cent>
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
			data:{
				ajax:{
					url:'Searchsearch',
				},
				pr:{
					type:'project',
				},
				
				
			},	
			bdtjdata:[['搜索页','作品'],['搜索页','创作者']],
			querys:'',
			clasd:[],
			djson:0,
			
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
		init(){
			this.data.pr.query =this.$route.query.cont || '';				
		},
		getData(){
			this.data.pr.query =this.$route.query.cont || '';	
			this.$refs.sfafa.getData();
		},
		getClassify(){			
			this.api.getClassify().then((da)=>{
				if(da=='error'){
					return
				}
				let p = JSON.stringify(da);
				p = p.replace(/classify_name/g,"label");
				
				p = p.replace(/id/g,"value");
				p = p.replace(/sub_data/g,"children");
				
				p = JSON.parse(p);
				
				for(let i=0,n=p.length;i<n;i++){
					for(let i2=0,n2=p[i].children.length;i2<n2;i2++){
						p[i].children[i2].children = '';
					}
				}
				
				
				p.unshift({label: "全部",value: ""})
				
				this.clasd = p;
		
			})
		},
		sreond(n){
			this.data.pr.classify_1 = n[0];
			this.data.pr.classify_2 = n[1];
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
</style>