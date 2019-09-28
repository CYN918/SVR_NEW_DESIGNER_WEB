<template>
	<div class="newUsermeBOX">
		<div class="newUserme2 newUsermeHx2 newUserme2x_1">
			<div class="userBoxd">
				<span>手机号</span>
				<inptPhone class="newUserme_x1" @checkBack="checkphoneBack" v-model="form.mobiles" :inputType="'phones'"  :placeholder="'请输入手机号'"></inptPhone>
			</div>
			<div class="userBoxd">
				<span>登录密码</span>
				<inptPhone class="newUserme_x1" @checkBack="checkphoneBack" v-model="form.password" :inputType="'password'" :type="'password'" :placeholder="'请输入您的登录密码'"></inptPhone>						
			</div>
			
		</div>
		<div class="setBin_n2">
				<div class="btn_n btn_n1 nbt_lef" @click="goOut">退出</div>
				<div :class="['btn_n btn_n2',btnType]" @click="addSelfInfo">进入首页</div>
		</div>
	</div>
</template>
<script>
import inptPhone from '../../components/input/input_phone';
export default {
	name: 'login',
	components:{inptPhone},
	data(){		
		return{	
			form:{},
			btnType:'',
			phones:false,		
			password:false,
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


		addSelfInfo(){
			this.bdtj('第3方注册完善页面绑定已有帐号','进入首页','--');
			if(!this.btnType){
				return
			}		
			if(!window.userInfo){
				this.$router.push({path: '/login'})
			}
			let pr = {
				mobile:this.form.mobiles.mobile,
				mobile_zone:this.form.mobiles.mobile_zone,
				login_type:'password',
				password:this.MD5(this.form.password),
			}
			this.api.bindExist(pr).then((da)=>{
				if(da=='error'){
					this.bdtj('第3方注册完善页面绑定已有帐号','进入首页失败','--');
					return
				}
	
				window.userInfo = da;
				localStorage.setItem('userT',JSON.stringify(da));
				this.bdtj('第3方注册完善页面绑定已有帐号','进入首页成功','--');
				this.$router.push({path:'/index'})
			});
		},
		pdys1(){		
			this.btnType = '';	 
			if(!this.form.mobiles){
				return
			}
			if(!this.form.password){
				return
			}	
			this.btnType = 'btn_n3';
		},
		
	},
	watch: {
	    'form.mobiles'(){
	    	this.pdys1();
	    },
		'form.password'(){
			this.pdys1();
		},


	}
}
</script>

<style>
.setBin_n2{
	padding-top: 60px;
	text-align: center;
}
</style>
