<template>
	<div class="Messgebox">
		<div>
			<img class="pro_cd1" src="/imge/wsj2.png" alt="">
			<div class="pro_cd2">您还不是平台供稿人</div>
			<div class="pro_cd3">立即申请将优秀的作品转化为收益</div>
			<div class="pro_cd4" v-if="userData.is_contributor==0" @click="gosetPersonal">申请认证平台供稿人</div>
			<div class="pro_cd4 pro_cd5" v-if="userData.is_contributor==2">认证审核中</div>
		</div>
		
	</div>
</template>

<script>
import {Message} from 'element-ui'
export default {
	name: 'messge',	
	data(){
		return {
			userData:'',
		}
	},
	mounted: function () {			
		this.init();
	}, 
	methods: {
		init(){
			this.getUserDetail();
		},
		gosetPersonal(){
			this.$router.push({path:'/setPersonal'})			
		},
		getUserDetail(){
			if(!window.userInfo){
				this.$router.push({path:'/login'})
				return
			}			
			let pr = {
				access_token:window.userInfo.access_token,
				user_open_id:window.userInfo.open_id
			};
			this.api.getSelfInfo(pr).then((da)=>{
				if(!da){
					return
				}
				this.userData = da;			
			})
		},
	},
}
</script>

<style>
.Messgebox{
	min-height: 820px;
}
.pro_cd1{
	display: block;
	margin: 120px auto 19px;
}
.pro_cd2{
	margin: 0 auto;
	font-size: 16px;
	color: #333333;
	text-align: center;
	line-height: 24px;
}
.pro_cd3{
	margin: 0 auto 60px;
	font-size: 14px;
	color: #999999;
	text-align: center;
	line-height: 24px;
}
.pro_cd4{
	margin: 0 auto;
	background: #FF5121;
	border-radius: 5px;
	font-size: 16px;
	color: #FFFFFF;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
	width: 340px;
	height: 40px;
}
.pro_cd5{
	background: #999999;
}
</style>
