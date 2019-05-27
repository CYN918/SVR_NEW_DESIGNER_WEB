<template>
	<div>
		<ul class="i_listd" >
			<img class="wsj" v-if="List.length<1" src="/imge/wsj.png" alt="">
			<li v-for="(el,index) in List" :key="index" @click="openxq(index)">
				<box_a :el="el"></box_a>
			</li>
		</ul>
		<el-pagination v-if="total>40" class="pagesddd"
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
import box_a from '../../components/box_a';
export default {
	components:{box_a},
	name: 'home',	 
	data(){	
		return{
			List:[],
			page:1,
			limit:40,
			total:0,
			loading: '',
		}
		
	},
	mounted: function () {	
		this.a_getWork()
	}, 
	methods:{
		getHList(){
			let params = {
				page:this.page,
				limit:this.limit
			}
			this.api.getHList(params).then((da)=>{
				if(!da){					
					return
				}
				this.List = da.data;
				this.total = da.total;
				document.documentElement.scrollTop =0;
				document.body.scrollTop =0;
			})
		},
		a_getWork(){
			if(!this.$route.query.id){
				this.$router.push({path:'/activvity'})	
				return
			}
			let pr = {
				type:1,
				activity_id:this.$route.query.id
			};
			this.api.a_getWork(pr).then((da)=>{			
				if(!da){					
					return
				}
				this.List = da.data;
				this.total = da.total;
			});
		},
		openxq(on){
			window.open('#/cont?id='+this.List[on].work_id)
		},
		backtime(time){
		
			return	window.getTimes(time);
		},
		handleSizeChange(val) {
			this.limit = val;
			this.getHList();
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getHList();
		}
	},
	
	
	
}
</script>

<style>
</style>
