<template>
	<div>
		<ul class="i_listd" >
			<img class="wsj" v-if="List.length<1" src="/imge/wsj.png" alt="">
			<li v-for="(el,index) in List" :key="index" @click="openxq(index)">
				<img class="i_listd1" :src="el.face_pic" alt="">
				<div class="i_listd2">
					<div class="i_listd2_1"><span :title="el.work_name">{{el.work_name.slice(0,10)}}</span> <img v-if="el.is_recommend==1" src="/imge/zs_icon_tj.png" alt=""></div>
					<div class="i_listd2_2"><span>{{el.classify_1+'-'+el.classify_2}}</span><span>{{backtime(el.create_time)}}</span></div>
					<div class="i_listd2_3">
						<span><img :src="el.face_pic" alt=""></span>
						
						<div>
							<span class="iconfont pend">&#xe6a2; {{el.view_num}}</span>
							<span class="iconfont pend">&#xe672; {{el.like_num}}</span>
							<span class="iconfont pend">&#xe616; {{el.comment_num}}</span>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<el-pagination v-if="List.length>0" class="pagesddd"
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
export default {
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
			})
		},
		a_getWork(){
			if(!this.$route.query.id){
				this.$router.push({path:'/activvity'})	
				return
			}
			let pr = {
				type:2,
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
