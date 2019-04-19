<template>
	<div>
		<tophead></tophead>
		<div class="setUserBox">
			<div class="setUserBoxs">
				<div class="setUserBoxs_nav">
					<div class="action">个人资料</div>
					<div>教育背景</div>
					<div>联系方式</div>
					<div>个人链接</div>
				</div>
				<div class="setUserBoxs_cent">
					<div class="suc_1">
						<div class="suc_title">个人资料</div>
						<div class="suc_1_1">
							<span>头像</span><div class="suc_1_1_1"><img  :src="caver" alt=""><div @click="showisPhto">修改头像</div></div>
						</div>
						<div>
							<span>用户名</span><div class="xgnamed">jagger<span>修改</span></div> 
						</div>
						<div>
							<span>手机号</span><div class="xgnamed">151****3540<span>修改</span></div> 
						</div>
						<div>
							<span>邮箱</span><div class="xgnamed">756373155@qq.com<span>修改</span></div> 
						</div>
						<div>
							<span>性别</span>
						</div>
						<div>
							<span>职业</span>
						</div>
						<div>
							<span>所在地</span>
						</div>
						<div class="suc_1_3">
							<span>个性签名</span>
						</div>
					</div>
					<div class="suc_2">
						<div class="suc_title">教育背景</div>
					</div>
					<div class="suc_3">
						<div class="suc_title">联系方式</div>
					</div>
					<div class="suc_4">
						<div class="suc_title">个人链接</div>
					</div>
				</div>
			</div>
			
		</div>
		<upoloadcaver v-show="isPhto" @close="close" ref="upoloadcaver"></upoloadcaver>
	</div>
</template>

<script>

import {Message} from 'element-ui'
import tophead from './myHead2';
import upoloadcaver from './upoloadcaver';
import Input from '../../components/input'
import Citys from '../../components/citys'
import Select from '../../components/select'
import rideo from '../../components/rideo'
export default {
	name: 'works',
	components:{upoloadcaver,Input,Citys,Select,rideo,tophead},
	data(){
		return {
			isPhto:false,
			zy:[
				{n:"平面设计师"},
				{n:"插画师"},
				{n:"三维设计师"},
				{n:"网页设计师"},
				{n:"UI设计师"},
				{n:"动画师"},
				{n:"产品设计师"},
				{n:"室内设计师"},
				{n:"摄影师"},
				{n:"学生"},
				{n:"设计爱好者"},
				{n:"UX设计师"},
				{n:"新媒体设计师"},
				{n:"概念设计师"},
				{n:"特效合成师"},
				{n:"建筑师"},
				{n:"服装设计师"},
				{n:"手工艺人"},
				{n:"艺术工作者"},
				{n:"教育工作者"},
			],
			caver:'/imge/nav_tx.png',
			sexData:[{n:'男',v:1},{n:'女',v:2}],		
		}
	},
	mounted: function () {			
		
		
	}, 
	methods: {
		showisPhto(){
			this.$refs.upoloadcaver.setImgd(this.caver);
			this.isPhto=true;
		},
		close(img){
			if(img){
				this.caver = img;
			}
			this.isPhto=false;
		},
	}
}
</script>

<style>

.setUserBox{
	min-height: 754px;
}
.setUserBoxs{
	padding-top: 20px;
	width: 1300px;
	margin: 0 auto;
	text-align: left;
}
.setUserBoxs_nav{
	margin-right: 20px;
	vertical-align: top;
	display: inline-block;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 310px;
	height: 206px;
}
.setUserBoxs_nav>div{
	position: relative;
	line-height: 50px;
	font-size: 16px;
	color: #1E1E1E;
	border-bottom: 1px solid #E6E6E6;
	text-indent: 30px;
	cursor: pointer;
}
.setUserBoxs_nav>div:last-child{
	border-bottom: 0;
}
.setUserBoxs_nav>div.action{
	color: #FF5121;
}
.setUserBoxs_nav>div.action:after{
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	background: #FF5121;
	width: 3px;
	height: 100%;
	
}
.setUserBoxs_cent{
	display: inline-block;
}
.setUserBoxs_cent>div{
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 910px;
	padding: 27px 30px;
	margin-bottom: 20px;
}
.suc_title{
	font-size: 15px;
	color: #1E1E1E;
	margin-bottom: 37px;
}
.suc_1>div>span{
	display: inline-block;
	vertical-align: middle;
	margin-right: 74px;
	width: 42px;
	font-size: 14px;
	color: #999999;
	text-align: justify;
	text-align-last: justify;
}
.suc_1>div{
	margin-bottom: 25px;
}
.suc_1_1_1{
	position: relative;
	display: inline-block;
	vertical-align: middle;
	border-radius: 50%;
	overflow: hidden;
}
.suc_1_1_1>img{
	display: inline-block;
	vertical-align: middle;
	width: 100px;
	height: 100px;
	border-radius: 50%;
}
.suc_1_1_1:hover>div{
	display: block;
}
.suc_1_1_1>div{
	display: none;
	cursor: pointer;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.5);
	text-align: center;
	font-size: 14px;
	color: #FFFFFF;
	text-align: center;
	line-height: 100px;
	
}
.suc_1>.suc_1_1>span{
	margin-right: 54px;
}
.suc_1>.suc_1_3>span{
	width: 56px;
	margin-right: 60px;
}
.xgnamed{
	min-width: 150px;
	display: inline-block;
	vertical-align: middle;
}
.xgnamed>span{
	float: right;
	font-size: 14px;
	color: #FF5121;
	width: 58px;
	text-align: right;
	cursor: pointer;
}
</style>
