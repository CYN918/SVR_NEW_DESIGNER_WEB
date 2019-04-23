<template>
	<div>
		<tophead></tophead>
		<div class="setUserBox">
			<div class="setUserBoxs">
				<div class="setUserBoxs_nav">
					<div  v-for="(el,index) in navDta" :key="index" @click="setNavd(index)" :class="[index==navdOn?'action':'']">{{el}}</div>
					
				</div>
				<div class="navDwzc">
					<div :class="['setUserBoxs_nav',topTyped?'fixdon':'']">
						<div  v-for="(el,index) in navDta" :key="index" @click="setNavd(index)" :class="[index==navdOn?'action':'']">{{el}}</div>
					</div>
				</div>
				
				<div class="setUserBoxs_cent">
					<div class="suc_1">
						<div class="suc_title">个人资料</div>
						<div class="suc_1_1">
							<span>头像</span><div class="suc_1_1_1"><img  :src="form.avatar" alt=""><div @click="showisPhto">修改头像</div></div>
						</div>
						<div>
							<span>用户名</span><div class="xgnamed">{{form.username}}<span>修改</span></div> 
						</div>
						<div>
							<span>手机号</span><div class="xgnamed">{{form.mobile}}<span>修改</span></div> 
						</div>
						<div>
							<span>邮箱</span><div class="xgnamed">{{form.email}}<span>修改</span></div> 
						</div>
						<div>
							<span>性别</span><rideo class="setUserRiode" :valued="form.sex"  :Data="sexData" v-model="form.sex"></rideo>	
						</div>
						<div>
							<span>职业</span><Select class="setUserSeLET" :valued="vocationOn" :Data="zy" v-model="form.vocation"></Select>	
						</div>
						<div>
							<span>所在地</span><Citys :valued="form.citye" class="setUserSeLET" v-model="form.citye"></Citys>
						</div>
						<div class="suc_1_3">
							<span>个性签名</span><Input :valued="form.personal_sign" class="userBoxd2_1" v-model="form.personal_sign"  :oType="'max'" :max="30"  :chekFn="chekusername" :type="'text'" :placeholder="'请输入签名'"></Input>		
						</div>
					</div>
					<div class="suc_1 suc_2">
						<div class="suc_title">教育背景</div>
						<div class="suc_1_3">
							<span>学校名称</span>
							<Input class="userBoxd2_2" :valued="form.education_school" v-model="form.education_school"  :oType="'max'" :max="20"  :chekFn="chekusername" :type="'text'" :placeholder="'请输入学校名称'"></Input>		
						</div>
					</div>
					<div class="suc_1 suc_3">
						<div class="suc_title">联系方式</div>
						<div class="suc_1_3">
							<span>微信号</span>
							<el-input class="suc_3xInput" v-model="form.weixin" placeholder="请输入内容"></el-input>
							<el-select class="suc_3xInputx" v-model="form.weixin_visible" placeholder="请选择">
								<el-option
								  v-for="item in inDad"
								  :key="item.value"
								  :label="item.label"
								  :value="item.value">
								</el-option>
							</el-select>
							
						</div>
						<div class="suc_1_3">
							<span>QQ号</span>
							<el-input class="suc_3xInput " v-model="form.qq" placeholder="请输入内容"></el-input>
							<el-select class="suc_3xInputx" v-model="form.qq_visible" placeholder="请选择">
								<el-option
								  v-for="item in inDad"
								  :key="item.value"
								  :label="item.label"
								  :value="item.value">
								</el-option>
							</el-select>
						
						</div>
						
						
					</div>
					<div class="suc_1 suc_4">
						<div class="suc_title">个人链接</div>
						<div class="suc_1_3">
							<span>主页链接</span>
							<!-- <el-input class="suc_3xInput" v-model="input" placeholder="请输入内容"></el-input> -->
							<span>zookingsoft.com.cn</span>
						</div>
					</div>
					
					<div class="suc_btndf" @click="Userupdate">保存资料</div>
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
			navDta:[
				'个人资料',
				'教育背景',
				'联系方式',
				'个人链接'				
			],
			form:{},
			sexData:[{n:'男',v:1},{n:'女',v:2}],	
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
				
			chekusername:function(val){
				
				return true
			},
			vocationOn:0,
			inDad:[
				{label:'仅自己可见',value:'0'},
				{label:'所有人可见',value:'1'}
			],
			topTyped:false,
			navdOn:0,
			postData:{}
		}
	},
	mounted: function () {			
		this.init();
		
	}, 
	methods: {
		init(){
			this.getUserDetail();
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
			window.onscroll = ()=>{
				let t = document.documentElement.scrollTop||document.body.scrollTop;
				if(t==0){
					document.documentElement.scrollTop =1;
					document.body.scrollTop =1;
				}
				if(this.topTyped==false){
					if(t>188){
						this.topTyped=true;
					}
					
				}
				if(t<=188){
					this.topTyped=false;
				}
				
				if(t>=480){
					this.navdOn =3;
					return
				}
				if(t>=320){
					this.navdOn =2;
					return
				}
				if(t>=160){
					this.navdOn =1;
					return
				}
				
				this.navdOn =0;
				

;			}
		},
		setNavd(on){
			this.navdOn = on;
			this.setScll(160*on)
			
		},
		Userupdate(){
			let postData = {
				access_token:window.userInfo.access_token,
				username:this.form.username,
				sex:this.form.sex,
				vocation:this.form.vocation,
				avatar:this.form.avatar,
				country:this.form.citye[0],
				province:this.form.citye[1],
				city:this.form.citye[2],
				personal_sign:this.form.personal_sign,
				education_school:this.form.education_school,
				weixin:this.form.weixin,
				weixin_visible:this.form.weixin_visible,
				qq:this.form.qq,
				qq_visible:this.form.qq_visible
			};
			this.api.Userupdate(postData).then((da)=>{
				if(!da){
					return
				}
				Message({message: '修改成功'});
			});
			
		},
		setScll(top){
			
			if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
			
                document.documentElement.scrollTop = Number(top);
            }
            if (document.body) {// all other Explorers
			
                document.body.scrollTop = Number(top);
				
			}	
			
		
		},
		getUserDetail(){
			let pr = {
				access_token:window.userInfo.access_token,
				user_open_id:window.userInfo.open_id
			};
			this.api.getUserDetail(pr).then((da)=>{
				if(!da){
					return
				}
				this.form = da;
				for(let i=0,n=this.zy.length;i<n;i++){
					if(this.zy[i].n ==this.form.vocation){
						this.vocationOn = i;
						break
					}
					
				}
				console.log(this.form.qq_visible)
				this.form.citye = [this.form.country,this.form.province,this.form.city]
			
			})
		},
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
.setUserRiode{
	display: inline-block;
}
.setUserRiode>label>span{
	width: 8px;
	height: 8px;
	border-radius: 0;
	margin-right: 10px;
}
.setUserRiode>label>span:after{
	width: 8px;
	height: 8px;
	border-radius: 2px;
}
.setUserRiode>.onchek>span:after{
	background:  #FF5121;

	border:1px solid  #FF5121;
}
.setUserSeLET{
	display: inline-block;
}
.userBoxd2_1{
	display: inline-block;
    width: 549px;
    margin-bottom: 0;
    vertical-align: middle;
}
.userBoxd2_2{
	display: inline-block;
    width: 250px;
    margin-bottom: 0;
    vertical-align: middle;	
}
.suc_3xInput{
	display: inline-block;
	width: 250px;
}
.suc_3xInput input{
	border: none;
	border-bottom: 1px solid #ddd;
	border-radius: 0;
	padding: 0;
}
.suc_3xInputx{
	vertical-align: middle;
	margin-left: 21px;
}
.navDwzc .setUserBoxs_nav{
	display: none;
}
.navDwzc .fixdon{
	display: block;
}

.fixdon{
	position: fixed;
	top: 0;
}
.navDwzc{
	position: fixed;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 1300px;
}
.setUserBoxs_cent>.suc_btndf{
	background: #FF5121;
	border-radius: 5px;
	width: 140px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	font-size: 16px;
	color: #FFFFFF;
	margin: 60px auto;
	padding: 0;
	cursor: pointer;
}
.suc_3xInputx{
	vertical-align: middle;
}
.suc_3xInputx input{
	border: none;
	border-bottom: 1px solid #DDDDDD;
	border-radius: 0;
}
</style>
