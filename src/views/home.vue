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
				<list1 :el="el"></list1>			
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
import userTc from '../components/userTc';
import list1 from '../components/list1';
export default {
	components:{userTc,list1},
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
			};
			if(window.userInfo){
				params.access_token = window.userInfo.access_token;
			}
			
			this.loading = Loading.service({ fullscreen: true });
			this.api.getHList(params).then((da)=>{
				this.loading.close();
				if(!da){
					return
				}
				this.List = da.data;
				this.total = da.total;
				document.documentElement.scrollTop =0;
				document.body.scrollTop =0;
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
