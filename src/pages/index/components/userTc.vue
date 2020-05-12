<template>
	<div class="usertc_6">
		<div class="usertc_0">
			<img @click="goR('/works')" class="usertc_1 pend" :src="mJs.Cavars(tcData.user_info.avatar)" alt="">
			<div @click="goR('/works')" class="usertc_2 pend">{{tcData.user_info.username}}</div>
			<div class="usertc_3">{{tcData.user_info.city+' | '+tcData.user_info.vocation}}</div>
			<div class="usertc_4">
				<span class="pend" @click="goR('/followFans')">
					粉丝<div>{{tcData.user_info.fans_num}}</div>				
				</span>
				<span>
					人气<div>{{tcData.user_info.popular_num}}</div>				
				</span>
				<span class="pend" @click="goR('/works')">
					创作<div>{{tcData.user_info.work_num}}</div>				
				</span>
			</div>
			<div v-if="isme()==false" class="usertc_5">
				<span class="csys pend" @click="gzFn(tcData.user_info.follow_flag)">{{backtype(tcData.user_info.follow_flag)}}</span>
				<!-- <span @click="goChat" class="btns pend">私信</span> -->
			</div>
			<div v-else class="usertc_5">
				<span class="csys pend" @click="goR('/works')">进入主页</span>
			</div>
		</div>
		<div @click="goR('/works')" class="usertc_6x"></div>
	</div>
</template>

<script>

import {Message} from 'element-ui'
export default {
	name: 'myInput',
	data(){
		return{
			chatData:{},
		}
	},
	props: {
		tcData:Object,
		tjData:Array,
	},
	
	mounted: function () {	
		
		
	}, 
	
	methods: {
		
		goChat(){
			let pr = {
				open_id:this.tcData.user_info.open_id,
				avatar:this.tcData.user_info.avatar,
				username:this.tcData.user_info.username,
				city:this.tcData.user_info.city,
				vocation:this.tcData.user_info.vocation,
			};
			this.$router.push({path:'/chat',query:pr});
		},
		goR(d){	
			
			if(this.tjData){
				this.bdtj(this.tjData[1][0],this.tjData[1][1],'--');
			}
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
			this.$router.push({path:d,query:{id:this.tcData.user_info.open_id}});
		},
		isme(){
			if(!window.userInfo){
				return false;
			}
			return window.userInfo.open_id == this.tcData.user_info.open_id;
		},
		backtype(to){
			return to==2?'互相关注':to==1?'已关注':'关注';
		},
		gzFn(on){
			
			if(on==0){
				this.Follow_add();
				return
			}
			this.Follow_del();
		},
		Follow_add(on){
			if(!window.userInfo){
				this.$router.push({path: '/login'})
				return
			}
			if(this.follwTyle==1){
				return
			}
			if(!this.tcData.user_info.open_id){
				return
			}
			this.follwTyle=1;
			let pr = {
				access_token:window.userInfo.access_token,
				follow_id:this.tcData.user_info.open_id
			};
			this.api.Follow_add(pr).then((da)=>{
				
				this.follwTyle=0;
				if(da=='error'){return}
				this.$set(this.tcData.user_info,'follow_flag',1);
			
				Message({message: '关注成功'});
			}).catch(()=>{
				this.follwTyle = 0;		
			});
			
		
		},
		Follow_del(){
			
			if(this.follwTyle==1){
				return
			}
			this.follwTyle=1;
			let pr = {
				access_token:window.userInfo.access_token,
				follow_id:this.tcData.user_info.open_id
			};
			this.api.Follow_del(pr).then((da)=>{
				this.follwTyle=0;
				if(da=='error'){return}
				Message({message: '取消关注成功'});
				this.$set(this.tcData.user_info,'follow_flag',0);
				
			}).catch(()=>{
				this.follwTyle = 0;		
			});
		},
	}
}
</script>

<style>
.usertc_0{
	display: none;
    position: absolute;
    bottom: 27px;
    left: 0;
    background: #FFFFFF;
    -webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    border-radius: 5px 5px 5px 1px 1px 1px 5px;
	padding: 20px 0;
    width: 310px;

}
.usertc_0:after{
    content: "";
    position: absolute;
    left: 16px;
    bottom: -5px;
    width: 8px;
    height: 8px;
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    -webkit-transform: rotate(45deg);
    transform: rotate(-135deg);
    z-index: 9;
    background: #fff;
}
.usertc_1{
	display: block;
	margin: 0 auto 7px;
	border-radius: 50%;
	width: 88px;
	height: 88px;
}
.usertc_2{
	font-size: 16px;
	color: #1E1E1E;
	text-align: center;
	line-height: 22px;
	margin-bottom: 4px;
}
.usertc_3{
	font-size: 14px;
	color: #999999;
	text-align: center;
	margin-bottom: 14px;
}
.usertc_4{
	text-align: center;
	margin-bottom: 10px;
}
.usertc_4>span{
	display: inline-block;
	font-size: 14px;
	color: #999999;
	text-align: center;
	width: 90px;
}
.usertc_4>span>div{

	margin: 2px auto 0;
	display: block;
	font-size: 14px;
	line-height: 20px;
	color: #1E1E1E;
	text-align: center;
}
.usertc_5{
	text-align: center;
}
.usertc_5>span{
	display: inline-block;
	border: 1px solid #999999;
	border-radius: 5px;
	font-size: 14px;
	color: #333333;
	text-align: center;
	line-height: 38px;
	width: 98px;
	height: 38px;
	margin: 0 15px;
}
.usertc_5>span.csys{
	border-color: #33B3FF;
	background: #33B3FF;
	color: #fff;
}
.usertc_6{
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 35px;
    height: 29px;
}
.usertc_6:hover>.usertc_0{
	display: block;
}
.usertc_6x{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	cursor: pointer;
}
</style>
