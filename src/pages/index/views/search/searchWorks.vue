<template>
	<div class="csBox csBoxxxxx">
		<tophead :clasd="clasd"  :onNav="0" ref="mytopcs"></tophead>
		
		<list class="seccWr" :config="data" ref="sfafa">
			<template v-slot:todo="{ todo }">
				<box_a :tjData="bdtjdata" :iscre="iscre" :el="todo"></box_a>
			</template>			
		</list>
	</div>
</template>

<script>

import list from '../../components/list';
import tophead from './head';
import box_a from '../../components/box_a';
export default {
	components:{tophead,list,box_a},
	name: 'home',
	data(){
		return {
			data:{
				ajax:{
					url:'Searchsearch',
				},
				pr:{
					type:'work',
				},
				
				
			},
			iscre:'',
			bdtjdata:[['搜索页','作品搜索结果','点击作品'],['搜索页','作品搜索结果'],['搜索页','作品搜索结果']],
			querys:'',
			clasd:[],
			
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
			this.iscre = this.data.pr.query;
		},
		getData(){
			
			this.data.pr.query =this.$route.query.cont || '';
			this.iscre = this.data.pr.query;
			this.$refs.sfafa.getData();
		},
		getClassify(){			
			this.api.getClassify().then((da)=>{
				if(da=='error' || da=='104'){
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
			if(n[0]){
				this.data.pr.classify_1 = n[0];
				this.data.pr.classify_2 = n[1];
			}else{
				this.data.pr = {
					type:'work',
					query:this.$route.query.cont || ''
				}
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
.seccWr{
	padding-top: 20px;
	margin-bottom: 40px;
}
.seccWr .emptyData{
	margin: 0 auto;
}
</style>