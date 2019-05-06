<template>
	<div class="csBox">
		<div class="banner">
			<div class="banner1">
				<img v-for="(el,index) in banners" @click="opend(el.jump_url)" :class="[banOn==index?'action':'']" :src="el.banner_pic" alt="">
			</div>
			<div class="banner_nav1">
				<span v-for="(el,index) in banners" @click="checkBan(index)" :class="[banOn==index?'action':'']"></span>
			</div>
			<div class="banner_jt pend banner_jt1" @click="checkBan1()"></div>
			<div class="banner_jt pend banner_jt2" @click="checkBan2()"></div>
		</div>
		<ul class="i_listd homeMinheifh">
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
export default {

	name: 'home',
	data(){
		return {
			banners:[],
			List:[],
			banOn:0,
			page:1,
			limit:40,
			total:0,
			loading: '',
			
		}
	},
	mounted: function () {	
		this.getBanner();
		this.getHList();
		
	}, 
	methods: {
		goUser(on){
			this.$router.push({path: '/works',query:{id:this.List[on].user_info.open_id}})	
		},
		backtime(time){
		
			return	window.getTimes(time);
		},	
		opend(ur){
			if(!ur){return}
			window.open(ur);
		},
		openxq(on){
			window.open('#/cont?id='+this.List[on].work_id)
		},
		getBanner(){
			this.api.getBanner().then((da)=>{
				this.banners = da;
				setInterval(()=>{
					this.checkBan2();
				},5000);
			});
			
		},
		checkBan(on){
			this.banOn = on;
		},
		checkBan1(){
			if(this.banOn>0){
				this.banOn--;
				return
			}
			this.banOn = this.banners.length-1;
		},
		checkBan2(){
			if(this.banOn<this.banners.length-1){
				this.banOn++;
				return
			}
			this.banOn = 0;
		},
		getHList(){
			let params = {
				page:this.page,
				limit:this.limit
			}
			this.loading = Loading.service({ fullscreen: true });
			this.api.getHList(params).then((da)=>{
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
		}
	}
}
</script>

<style>

</style>
