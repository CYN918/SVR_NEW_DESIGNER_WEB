<template>
	<div class="usertc_6">
		<div class="usertc_0">
			<img @click="goFans('/works')" class="usertc_1" :src="tcData.user_info.avatar" alt="">
			<div @click="goFans('/works')" class="usertc_2">{{tcData.user_info.username}}</div>
			<div class="usertc_3">{{tcData.user_info.city+' | '+tcData.user_info.vocation}}</div>
			<div class="usertc_4">
				<span @click="goFans('/followFans')">
					粉丝<div>{{tcData.user_info.fans_num}}</div>				
				</span>
				<span>
					人气<div>{{tcData.user_info.follow_num}}</div>				
				</span>
				<span @click="goFans('/works')">
					创作<div>{{tcData.user_info.work_num}}</div>				
				</span>
			</div>
			<div v-if="isme()==false" class="usertc_5">
				<span class="csys" @click="gzFn(tcData.user_info.follow_flag)">{{backtype(tcData.user_info.follow_flag)}}</span><span @click="gosx">私信</span>
			</div>
			<div v-else class="usertc_5">
				<span class="csys" @click="goFans('/works')">进入主页</span>
			</div>
		</div>
	
	</div>
</template>

<script>
import {Message} from 'element-ui'
export default {
	name: 'myInput',
	data(){
		return{
		}
	},
	props: {
		tcData:Object,
		default:{
			img:'/imge/nav_tx.png',
			name:'未知的',
			ad:'未知',
			zy:'',
			fs:0,
			rq:0,
			cz:0,
			follwTyle:0,
		}
	},
	methods: {

		gosx(){
			this.$router.push({path:'/chat',query:{openid:this.tcData.user_info.open_id,avatar:this.tcData.user_info.avatar,username:this.tcData.user_info.username}});
		},
		goFans(d){
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
				if(!da){return}
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
				if(!da){return}
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
    width: 310px;
    height: 275px;
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
	margin: 12px auto 7px;
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
	border-color: #FF5121;
	background: #FF5121;
	color: #fff;
}
.usertc_6{
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 54px;
    height: 29px;
}
.usertc_6:hover>.usertc_0{
	display: block;
}
</style>
