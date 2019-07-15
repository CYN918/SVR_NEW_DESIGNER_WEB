<template>
	<div>
		<div class="yhtop">
			<upoloadcaver v-show="isPhto" @close="close" ref="upoloadcaver"></upoloadcaver>
			<div class="yhtop1">用户资料完善</div>
			<div class="yhtop2">基本信息设置</div>
			<div class="newUsermeBOX">
				<div class="newUserme">
					<div class="nav_tx">
						<span>头像</span>
						<img @click="showisPhto(true)" :src="caver" alt="">				
					</div>
					<div class="userBoxd">
						<span>用户名</span>
						<Input class="userBoxd2" v-model="form.username"  :oType="'max'" :max="15"  :chekFn="chekusername" :type="'text'" :placeholder="'15字符内'"></Input>		
					</div>
					<div class="userBoxd">
						<span>性别</span>
						<rideo class="onusert" :Data="sexData" v-model="form.sex"></rideo>			
					</div>
					<div class="userBoxd">
						<span>职业</span>
						<Select :Data="zy" v-model="form.vocation"></Select>	
					</div>
					<div class="userBoxd">
						<span>所在地</span>
						<Citys v-model="form.citye"></Citys>						
					</div>
					<div class="yhtop6f">
						<div class="yhtop5 btnType" @click="goOut">退出</div>
						<div :class="['yhtop5',btnType]" @click="addSelfInfo">进入首页</div>
					</div>
					
				</div>
			</div>
			
		</div>
		<Footer></Footer>
	</div>	
</template>
<script>
import upoloadcaver from './upoloadcaver';
import Input from '../../components/input'
import Citys from '../../components/citys'
import Select from '../../components/select'
import rideo from '../../components/rideo'
import Footer from '../../components/footer';
export default {
	name: 'login',
	components:{upoloadcaver,Input,Citys,Select,rideo,Footer},
	data(){		
		return{	
			isPhto:false,
			caver:'/imge/svg/MRTX.svg',
			form:{
				citye:[],
				sex:'',
			},
			chekusername:function(val){
				if(!val){return {type:false,text:'请输入用户名',cls:'errd'}}
				return true
			},
			ctis:'',
			sexData:[{n:'男',v:1},{n:'女',v:2}],		
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
			btnType:'',
			
		}
	},
	mounted: function () {	
	
	}, 
	methods: {
		init(){
			let pr = {
				access_token:window.userInfo.access_token
			};
			this.api.getSelfInfo(pr).then((da)=>{
				if(da=='error'){return}		
				let userData = window.userInfo.access_token;
				window.userInfo = da;	
				window.userInfo.access_token = userData;
			}).catch();
		},
		goOut(){
			let p = {
				access_token:window.userInfo.access_token
			};
			this.api.logout(p).then((da)=>{
				if(da=='error'){
					return
				}			
				localStorage.setItem('pass','');			
				localStorage.setItem('userT','');
				window.userInfo='';
				window.passIn = '';
				this.$router.push({path: '/login'})	
			});
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
		addSelfInfo(){
			this.bdtj('手机号注册完善页面','进入首页','--');
			if(!this.btnType){
				return
			}
			
			if(!window.userInfo){
				this.$router.push({path: '/login'})
			}
			let pr = {
				access_token:window.userInfo.access_token,
				avatar:this.caver,
				username:this.form.username,
				sex:this.form.sex,
				vocation:this.form.vocation,
				country:this.form.citye[0],
				province:this.form.citye[1],
				city:this.form.citye[2],
			}
			this.api.addSelfInfo(pr).then((da)=>{
				if(da=='error'){
					return
				}
				this.init();
				window.userInfo.avatar = pr.avatar;
				window.userInfo.username = pr.username;
				window.userInfo.sex = pr.sex;
				window.userInfo.vocation = pr.vocatio;
				window.userInfo.country = pr.country;
				window.userInfo.province = pr.province;
				window.userInfo.city = pr.citye;
				window.userInfo.is_detail =1;
				localStorage.setItem('userT',JSON.stringify(window.userInfo));
				this.$router.push({path:'/index'})
			});
		},
		pdys1(){
			this.btnType = '';	    	
			let pd = this.chekusername(this.form.username);
			if(pd!=true && pd.type!=true){
				return
			}
			if(!this.form.sex){
				return
			}
			this.btnType = 'btnType';
		},
		
	},
	watch: {
	    'form.username'(val) {
	    	this.pdys1();
	    },
	    'form.sex'(val) {
	    	this.pdys1();
	    },
	}
}
</script>

<style>
#app>div>div.yhtop{
	padding: 0;
	padding-bottom: 70px;
}
.yhtop{
	min-width: 1300px;
}
.yhtop1{
	width: 100%;
	height: 60px;
	font-size: 16px;
	color: #FFFFFF;
	text-align: center;
	line-height: 60px;
	background: #323232;
}
.yhtop2{
	height: 80px;
	background: #EFEFEF;
	line-height: 80px;
	font-size: 28px;
	color: #333333;
	text-align: left;
	text-indent: 310px;
}
.newUserme{
	height: 742px;
    position: relative;
	margin: 40px auto 40px;
	padding: 65px 110px;
	box-sizing: border-box;
	width: 860px;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
}

.yhtop3 input{
	border: none !important;
	border-radius: 0 !important;
	border-bottom: 1px solid #ddd !important;
	width: 128px;
}
.yhtop3 .el-input{
	display: inline-block; 
	width: auto;
}
.yhtop3 .el-form-item__content{
	text-align: left;
}
.nav_tx{
	text-align: left;
}
.nav_tx>img{
	display: inline-block;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	vertical-align: middle;
	
}
.nav_tx>span{
	display: inline-block;
	width: 68px;
	text-align: justify;
    text-align-last: justify;
	margin-right: 62px;
}
.yhtop3 .el-form-item__content,.nav_tx{
	margin-bottom: 41px;
}
.yhtop4 .el-input__inner{
	width: 349px !important;
}

.yhtop3 .el-form-item__label{
	width: 68px;
	text-align: justify;
    text-align-last: justify;
	margin-right: 62px;
	font-size: 16px;
	color: #333333;
	padding: 0;
}
.yhtop6f{
	position: absolute;
    bottom: 65px;
    left: 0;
	width: 100%;
}
.yhtop6f>div{
	display: inline-block;
	margin: 0 15px;
	width: 200px;
	height: 40px;
	font-size: 16px;
	color: #FFFFFF;
	text-align: center;
	background: #999999;
	line-height: 40px;
	border-radius: 5px;
}
.yhtop5:hover{
	cursor: pointer;
	opacity: .7;
}
.cjBox{
	position: absolute;
	top: 0;
	left: 0;
	width: 200px;
	height: 200px;
}
.nav_tx{
	position: relative;
}
.userBoxd{
	display: flex;
	margin-bottom: 27px;
}
.userBoxd>span{
	display: inline-block;
	vertical-align: middle;
	width: 68px;
	line-height: 40px;
	text-align: justify;
	text-align-last: justify;
	margin-right: 62px;
}
.userBoxd>.itext{
	flex: 1;
}
.userBoxd2.inptud {
    width: 296px;
}
.btnType{
	background: #FF5121;
}
.onusert{
	line-height: 40px;
}
</style>
