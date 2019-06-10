<template>
	<div class="csBox csBoxxxxx">
		<tophead :clasd="clasd"  :onNav="1" ref="mytopcs"></tophead>
		<ul v-if="List.length>0" class=" i_listd homeMinheifh homeMinheifh2">
			<li v-for="(el,index) in List" :key="index">
				<box_a :el="el"></box_a>
			</li>
		</ul>
		<div class="pagesddd wsjzt" v-if="List.length==0"><img  class="wusj2" src="/imge/wsj2.png" alt=""></div>
		<el-pagination class="pagesddd" v-if="total>40"
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
import { Loading } from 'element-ui';	
import tophead from './head';
import box_a from '../../components/box_a';
export default {
	components:{tophead,box_a},
	name: 'home',
	data(){
		return {
			List:[],
			page:1,
			limit:40,
			total:0,
			loading: '',
			querys:'',
			clasd:[],
			classd:'',
			
		}
	},
	mounted: function () {	
		this.getHList();
		this.getClassify();
	}, 
	methods: {
		sreond(type){
			if(type==this.classd){return}
			this.classd = type;
			this.page = 1;
			this.getHList();
		},
		goUser(on){
			this.$router.push({path: '/works',query:{id:this.List[on].user_info.open_id}})	
		},
		backtime(time){
		
			return	window.getTimes(time);
		},	

		openxq(on){
			window.open('#/cont?id='+this.List[on].work_id)
		},

		getHList(){
			let query = this.$route.query.cont || '';
			let pr = {
				query:query,
				type:'work',
				page:this.page,
				limit:this.limit
			};
			if(this.classd){
				pr.classify_1 = this.classd;
			}
			this.$refs.mytopcs.setCont(query);
			this.loading = Loading.service({ fullscreen: true });
			this.api.Searchsearch(pr).then((da)=>{
				this.loading.close();
				if(da=='error'){
					return
				}
				this.List = da.data;
				this.total = da.total;
			}).catch(()=>{
				this.loading.close();
			})
		},
		handleSizeChange(val) {
			this.limit = val;
			this.getHList();
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getHList();
		},
		getClassify(){
			
			let pr ={
				access_token:window.userInfo.access_token,
			};
			
			this.api.getClassify(pr).then((da)=>{
				if(da=='error'){
					return
				}
				let p = JSON.stringify(da);
				p = p.replace(/classify_name/g,"label");
				p = p.replace(/id/g,"value");
				p = p.replace(/sub_data/g,"children");
				p = JSON.parse(p);
				this.clasd = p;

			})
		},
	},
	watch: {	
		'$route': function() {
			this.getHList();
			
		},
		
	},
}
</script>

<style>
.homeMinheifh2{
	min-height: 494px;
}
.csBoxxxxx ul{
	margin: 0 auto 120px;
    text-align: left;
    width: 1300px;
}
.csBoxxxxx li{
	display: inline-block;
	
}
</style>