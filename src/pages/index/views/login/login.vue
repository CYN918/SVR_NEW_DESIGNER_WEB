<template>
	<div>
		<img class="login_x1" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/login_logo.svg" @click="jump">
		<p class="login_x2">让创意更有价值，让生活更加自在</p>
		<div class="login_x3">
			<span @click="cheackLogin('password')" :class="['pend',btnType=='password'?'cheack':'']">账户密码登录</span><span @click="cheackLogin('verify_code')" :class="['pend',btnType=='verify_code'?'cheack':'']">手机号登录</span>
		</div>	
		<component v-bind:is="btnType" ref="loginFrom"></component>			
		<el-button :class="['lgoin_s4',btnType2]" type="primary" @click="loginUp">登录</el-button>		
		<p class="lgoin_s5"><span>没有账号？<a class="pend" @click="gotj('/register')">注册</a></span><span><router-link class="pend" to="/index">返回首页</router-link></span></p>
		<div class="lgoin_s6x"></div>
		<div class="lgoin_s6">
			
			<img @click="thirdLogin('qq')" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/login/zc_icon_qq.svg" alt="">
			<img @click="thirdLogin('weixin')" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/login/zc_icon_wx.svg" alt="">
			<img @click="thirdLogin('weibo')" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/login/zc_icon_wb.svg" alt="">
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
		this.init();
	}, 
	methods: {	
		init(){	
			let passIN = localStorage.getItem('pass');
			if(passIN){
				this.loginPost(JSON.parse(passIN),'ispass');
				return;
			}
			document.addEventListener('keydown',(e)=>{
				if(e.keyCode==13){				
				if(this.$route.fullPath=='/login'){
					this.loginUp();
				}					
			}
			},false)
		},
		gotj(d){
			this.bdtj('登录页','没有帐号去注册','--');
			this.$router.push({
				path:d
			})
		},
		jump(){
		    this.$router.push({
				path:'/index'
			})
		},
		cheackLogin(on){	
			this.bdtj('登录页','tag_'+on,'--')
			if(on==this.btnType){return}
			this.btnType = on;
			this.btnType2 = '';
		},
		thirdLogin(type){
			this.bdtj('登录页','第三方登录_'+type,'--');
			if(!type){return}
			window.location.href=window.basrul+'/Passport/user/thirdLogin?type='+type;
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
		loginPost(data,ispass){
			this.api.login(data).then((da)=>{	
				if(da=='error'){
					this.bdtj('登录页','登录失败','--');
					if(ispass){
						localStorage.setItem('pass','');
					}
					this.ajaxType=0;
					return
				}
				this.bdtj('登录页','登录成功','--');
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
				let pr = {
					access_token:window.userInfo.access_token
				};
				this.api.getSelfInfo(pr).then((da)=>{
					if(da=='error'){return}		
					
					let userData = window.userInfo.access_token;
					window.userInfo = da;		
					window.userInfo.access_token = userData;
				}).catch();
				
				this.$router.push({path: '/index'})							
			}).catch(()=>{
				this.bdtj('登录页','登录失败','--');
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
