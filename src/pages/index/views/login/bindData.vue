<template>
	<div>
		<upoloadcaver v-show="isPhto" @close="close" ref="upoloadcaver"></upoloadcaver>

			<div class="newUsermeBOX">
				<div class="newUserme2 newUserme2x_1">
					<div class="userBoxd">
						<span>手机号</span>
						<inptPhone class="newUserme_x1" @checkBack="checkphoneBack" v-model="form.mobiles" :inputType="'phones'"  :placeholder="'请输入手机号'"></inptPhone>
					</div>
					<div class="userBoxd">
						<span>验证码</span>
						<inptPhone class="newUserme_x1" :iscf="'1'" @checkBack="checkphoneBack" v-model="form.verifys" :inputType="'verifys'"  :placeholder="'输入 6 位短信验证码'"></inptPhone>
					</div>
					<div class="userBoxd">
						<span>登录密码</span>
						<inptPhone class="newUserme_x1" @checkBack="checkphoneBack" v-model="form.password" :inputType="'password'" :type="'password'" :placeholder="'6 - 16位密码，区分大小写'"></inptPhone>						
					</div>
					<div class="userBoxd">
						<span>确认密码</span>
						<inptPhone class="newUserme_x1" @checkBack="checkphoneBack" v-model="form.password_repass" :inputType="'password_repass'" :type="'password'"  :placeholder="'确认密码'"></inptPhone>	
					</div>
				</div>
			</div>
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
						<Select :prd='"选择职业"' :Data="zy" v-model="form.vocation"></Select>	
					</div>
					<div class="userBoxd">
						<span>所在地</span>
						<Citys :prd='"选择所在地"' v-model="form.citye"></Citys>						
					</div>
					<div class="yhtop6f">
						
						<div class="btn_n btn_n1 nbt_lef" @click="goOut">退出</div>
						<div :class="['btn_n btn_n2',btnType]" @click="addSelfInfo">进入首页</div>
					</div>
				</div>
			</div>
	</div>		
</template>
<script>
import upoloadcaver from './upoloadcaver';
import Input from '../../components/input'
import Citys from '../../components/citys'
import Select from '../../components/select'
import rideo from '../../components/rideo'

import inptPhone from '../../components/input/input_phone';
export default {
	name: 'login',
	components:{upoloadcaver,Input,Citys,Select,rideo,inptPhone},
	data(){		
		return{	
			
			isPhto:false,
			caver:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/imge/svg/MRTX.png',
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
			phones:false,
			verifys:false,
			password:false,
			password_repass:false,
			navOn:0,
		
		}
	},
	mounted: function () {}, 
	methods: {
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
		
		checkphoneBack(type,on){
			this[on] = type;			
		},

		setYzm(val){
			this.form.mobile_zone = val;
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
			this.bdtj('第3方注册完善页面','进入首页','--');
			if(!this.btnType){
				return
			}
			
			if(!window.userInfo){
				this.$router.push({path: '/login'})
			}
			let pr = {
				access_token:window.userInfo.access_token,
				type:'third_login',
				mobile:this.form.mobiles.mobile,
				mobile_zone:this.form.mobiles.mobile_zone,
				verify_code:this.form.verifys,
				password:this.MD5(this.form.password),
				password_repass:this.MD5(this.form.password_repass),
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
					this.bdtj('第3方注册完善页面','进入首页失败','--');
					return
				}
				window.userInfo.mobile = pr.mobile;
				window.userInfo.mobile_zone = pr.mobile_zone;
				window.userInfo.avatar = pr.avatar;
				window.userInfo.username = pr.username;
				window.userInfo.sex = pr.sex;
				window.userInfo.vocation = pr.vocatio;
				window.userInfo.country = pr.country;
				window.userInfo.province = pr.province;
				window.userInfo.city = pr.citye;
				window.userInfo.is_detail =1;
				localStorage.setItem('userT',JSON.stringify(window.userInfo));
				this.bdtj('第3方注册完善页面','进入首页成功','--');
				this.$router.push({path:'/index'})
			});
		},
		pdys1(){
		
			this.btnType = '';	 
			if(!this.form.mobiles){
				return
			}
			if(!this.form.verifys){
				return
			}	
		
			if(!this.form.password){
				return
			}	
			if(!this.form.password_repass){
				return
			}	
			if(this.form.password_repass!=this.form.password){
				return
			}
			let pd = this.chekusername(this.form.username);
			if(pd!=true && pd.type!=true){
				return
			}
			if(!this.form.sex){
				return
			}
			this.btnType = 'btn_n3';
		},
		
	},
	watch: {
	    'form.username'() {
	    	this.pdys1();
	    },
	    'form.sex'() {
	    	this.pdys1();
	    },
	    'form.mobiles'(){
			this.pdys1();
		},
		'form.verifys'(){
			this.pdys1();
		},
		'form.password'(){
			this.pdys1();
		},
		'form.password_repass'(){
			this.pdys1();
		},
		'form.vocation'(){
			this.pdys1();
		},
		'form.citye'(){
			this.pdys1();
		},

	}
}
</script>

<style>

</style>
