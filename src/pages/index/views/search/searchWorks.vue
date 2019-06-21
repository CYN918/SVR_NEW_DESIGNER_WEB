<template>
	<div class="csBox csBoxxxxx">
		<tophead :clasd="clasd"  :onNav="1" ref="mytopcs"></tophead>
		
		<list :config="data" ref="sfafa">
			<template v-slot:todo="{ todo }">
				<box_a :el="todo"></box_a>
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
				}
			},	
			
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
		
				p.unshift({label: "全部",value: ""})
				this.clasd = p;
		
			})
		},
		sreond(n){
			this.data.pr.classify_1 = n;
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