<template>
	<div>
		<tophead :clasd="clasd"  :onNav="1" ref="mytopcs"></tophead>
		<ul v-if="List.length>0" class="i_listd homeMinheifh homeMinheifh2">
			<li v-for="(el,index) in List" :key="index">
				<div @click="openxq(index)" class="i_listd1x1"><img class="i_listd1" :src="el.face_pic"></div>
				
				<div class="i_listd2">
					<div @click="openxq(index)" class="i_listd2_1"><span :title="el.work_name">{{el.work_name.slice(0,10)}}</span> <img v-if="el.is_recommend==1" src="/imge/zs_icon_tj.png" alt=""></div>
					<div @click="openxq(index)" class="i_listd2_2"><span>{{el.classify_1_name+'-'+el.classify_2_name}}</span><span>{{backtime(el.create_time)}}</span></div>
					<div class="i_listd2_3">
						<span><img @click="goUser(index)" :src="el.user_info.avatar" alt=""></span>
						
						<div class="i_listd2_3x1" @click="openxq(index)">
							<span class="pend"><img src="/imge/icon/zs_icon_gk.png">{{el.view_num}}</span>
							<span class="pend"><img src="/imge/icon/zs_icon_dz.png">{{el.like_num}}</span>
							<span class="pend"><img src="/imge/icon/zs_icon_xx.png">{{el.comment_num}}</span>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<div class="pagesddd wsjzt" v-if="List.length==0"><img  class="wusj2" src="/imge/wsj2.png" alt=""></div>
		<el-pagination class="pagesddd" v-if="List.length>0"
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
export default {
	components:{tophead},
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
			
		}
	},
	mounted: function () {	
		this.getHList();
		this.getClassify();
	}, 
	methods: {
		sreond(type){
			console.log(type)
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
			let params = {
				query:query,
				type:'work',
				page:this.page,
				limit:this.limit
			};
			this.$refs.mytopcs.setCont(query);
			this.loading = Loading.service({ fullscreen: true });
			this.api.Searchsearch(params).then((da)=>{
				this.loading.close();
				if(!da){
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
				if(!da){
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
</style>