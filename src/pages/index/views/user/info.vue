<template>
	<div>
		<tophead ref="tophead"></tophead>
		<div class="info_boxd">
			<div class="info_box">
				<div>
					<h1>个人资料</h1>
					<div>
						<span>头像</span><img class="info_box-ac" :src="userInfo.avatar" alt="">
					</div>
					<div>
						<span>用户名</span><span>{{userInfo.username}}</span>
					</div>
					<div>
						<span>性别</span><span>{{userInfo.sex=='1'?'男':'女'}}</span>
					</div>
					<div>
						<span>职业</span><span>{{userInfo.vocation}}</span>
					</div>
					<div>
						<span>所在地</span><span>{{userInfo.province+' '+userInfo.city}}</span>
					</div>
					<div>
						<span>手机号</span><span>{{userInfo.mobile}}</span>
					</div>
					<div v-if="userInfo.email">
						<span>邮箱</span><span>{{userInfo.email}}</span>
					</div>
					<div v-if="userInfo.weixin && (userInfo.qq_visible==1 || isMe())">
						<span>微信</span><span>{{userInfo.weixin}}</span>
					</div>
					<div v-if="userInfo.qq && (userInfo.weixin_visible==1 || isMe())">
						<span>qq</span><span>{{userInfo.qq}}</span>
					</div>
					<div v-if="userInfo.personal_sign">
						<span class="forddf">个性签名</span><span>{{userInfo.personal_sign}}</span>
					</div>
				</div>
				
				<div v-if="userInfo.home_page">
					<h1>个人资料</h1>
					<div class="forddf_btnd_1">
						<span class="forddf">主页链接</span><span>{{userInfo.home_page+'.shiquaner.zookingsoft.com'}}</span>
					</div>		
							
				</div>
				<span v-if="isMe()" @click="gouser" class="forddf_btnd">更新资料</span>	
			</div>
		</div>
		
	</div>
</template>

<script>
import tophead from './head';
import {Message} from 'element-ui'
export default {
	name: 'index',
	components:{tophead},
	data(){
		return{
			userInfo:{}
		}
	},
	mounted: function () {	
			
	}, 
	methods: {
	
		setData(data){
			this.userInfo = data;
		},
		isMe(){
			if(!window.userInfo){
				return false
			}
			return this.$route.query.id ==  window.userInfo.open_id;
		},
		gouser(){
			this.$router.push({path: '/setUser'})
		},
	}
}
</script>

<style>
.info_boxd{
	padding-bottom: 60px;
}
.info_box{
	box-sizing: border-box;
	
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	margin: 20px auto 0;
	width: 860px;
	padding-bottom: 40px;
	text-align: left;
}
.info_box>div{
	padding: 1px 0 0 100px;
}

.info_box>div>h1{
	margin-top: 37px;
	font-size: 15px;
	color: #1E1E1E;
	margin-bottom: 37px;

}
.info_box>div>div{margin-bottom: 27px;}
.info_box>div>div>span{
	display: inline-block;
	margin-right: 73px;
	width: 42px;
	font-size: 14px;
	color: #999999;
	text-align: justify;
	text-align-last: justify;
}
.info_box>div>div>span:last-child{
	color: #333;
	text-align: left;
	width: auto;
}
.info_box>div>div>span.forddf{
	width: 56px;
	margin-right: 59px;
}
.info_box>div:last-child{
	border-top: 1px solid #E6E6E6;
}
.info_box-ac{
	display: inline-block;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    vertical-align: middle;
}
.info_box>div>div.forddf_btnd_1{
	margin-bottom: 98px;
}
.forddf_btnd{
	cursor: pointer;
	display: block;
	margin: 0 auto;
	font-size: 16px;
	color: #FFFFFF;
	text-align: center;
	width: 140px;
	height: 40px;
	line-height: 40px;
	background: #333333;
	border-radius: 5px;
}
.forddf_btnd:hover{
	opacity: .7;
}
</style>
