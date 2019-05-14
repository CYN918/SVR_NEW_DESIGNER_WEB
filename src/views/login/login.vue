<template>
	<div>
		<img class="login_x1" src="/imge/llog.png" @click="jump">
		<p class="login_x2">云创设计，最赚钱的设计师平台</p>
		<div class="login_x3">
			<span @click="cheackLogin('password')" :class="['pend',btnType=='password'?'cheack':'']">账户密码登录</span><span @click="cheackLogin('verify_code')" :class="['pend',btnType=='verify_code'?'cheack':'']">手机号登录</span>
		</div>	
		<component v-bind:is="btnType" ref="loginFrom"></component>			
		<el-button :class="['lgoin_s4',btnType2]" type="primary" @click="loginUp">登录</el-button>		
		<p class="lgoin_s5"><span>没有账号？<router-link class="pend" to="/register">注册</router-link></span><span><router-link class="pend" to="/index">返回首页</router-link></span></p>
		<div class="lgoin_s6x"></div>
		<div class="lgoin_s6">
			<img @click="thirdLogin('qq')" src="/imge/01.png" alt="">
			<img @click="thirdLogin('weixin')" src="/imge/02.png" alt="">
			<img @click="thirdLogin('weibo')" src="/imge/03.png" alt="">
		</div>
	</div>
</template>
<script>
import password from './login3'
import verify_code from './login4'
export default {
	components:{password,verify_code},
	name: 'login',	 
	data(){				
		return{
			btnType:'password',		
			btnType2:'',
			ajaxType:0,
		}
	},
	mounted: function () {	
	}, 
	methods: {	
		init(){			
			if(window.passIn){
				this.loginPost(window.passIn);
				return
			}
		},
		jump(){
		    this.$router.push({
				path:'/index'
			})
		},
		cheackLogin(on){	
			if(on==this.btnType){return}
			this.btnType = on;
			this.btnType2 = '';
		},
		thirdLogin(type){
			if(!type){return}
			window.location.href='http://139.129.221.123/Passport/user/thirdLogin?type='+type;
		},
		loginUp(){
			let params = this.$refs.loginFrom.pushData();
			if(!params){
				return
			}
			if(this.ajaxType==1){
				Message({message: '正在提交'});
				return
			}
			if(params.password){
				params.password = this.MD5(params.password)
			}
			params.login_type = this.btnType;
			if(params.islogin){
				this.islogin = params.islogin;
			}			
			this.ajaxType=1;
			this.loginPost(params);				
		},
		loginPost(data){
			this.api.login(data).then((da)=>{	
				if(!da){
					this.ajaxType=0;
					return
				}
				this.ajaxType=0;
				window.userInfo = da;
				localStorage.setItem('userT',JSON.stringify(da));	
				if(this.islogin===true){
					window.passIn = data;
					localStorage.setItem('pass',JSON.stringify(data));
				}
				if(da.is_detail==0){
					this.$router.push({path: '/userme'})	
					return
				}
				
				if(window.frompath){
					this.$router.push({path: window.frompath})	
					return
				}
				this.$router.push({path: '/index'})							
			}).catch(()=>{
				this.ajaxType=0;
			});	
		},
		setBtn(type){
			this.btnType2 = '';
			if(type==true){
				this.btnType2 = 'btnType';
			}			
		}
	},
	watch: {}
}
</script>

<style>
.lgoin_s6{
	border-radius: 0 0 8px 8px;
}
</style>
