<template>
	<div class="Messgebox">
		<div>
			<img class="pro_cd1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/img/svg/empty_nodata.svg" alt="">
			<div class="pro_cd2">您还不是平台供稿人</div>
			<div class="pro_cd3">立即申请将优秀的作品转化为收益</div>
			<div class="pro_cd4" v-if="userData.contributor_format_status==0 || !userData.contributor_format_status" @click="gosetPersonal">申请认证平台供稿人</div>
			<div class="pro_cd4 pro_cd5" v-if="userData.contributor_format_status==1">认证审核中</div>
			<div class="pro_cd4 pro_cd5" v-if="userData.contributor_format_status==-1" @click="gosetPersonal">认证失败再次认证</div>
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
			this.bdtj('我的收益','申请认证平台供稿人','--');
			this.$router.push({path:'/setPersonal'})			
		},
		getUserDetail(){
			console.log(window.userInfo);
			if(!window.userInfo){
				this.$router.push({path:'/login'})
				return
			}	
			let pr={};
			this.api.getSelfInfo(pr).then((da)=>{
				
				if(da=='error'){return}
				let userData = window.userInfo.access_token;
				window.userInfo = da;
				window.userInfo.access_token = userData;
				this.userData = window.userInfo;
				localStorage.setItem('userT',JSON.stringify(da));	
				if(da.is_contributor!=0){
					this.$router.push({path: '/profit'});
					return
				}
			});

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
	margin: 0 auto 60px;
	background: #33B3FF;
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