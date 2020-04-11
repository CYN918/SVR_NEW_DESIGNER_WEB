<template>
	<div class="box">
		<div class="tab_image">
			<img :src="imgSig+'newHome/sign_up_ewm.svg'" alt="" v-if="isShow_ewm" @click="btnTab('ewm')"/>
			<img :src="imgSig+'newHome/sign_up_dn.svg'" alt="" v-if="isShow_dn" @click="btnTab('dn')"/>
		</div>
		<div v-show="isShow_ewm">
			<div class="login_x3">
				<span @click="cheackLogin('password')" :class="['pend',btnType=='password'?'cheack':'']">账户登录</span><span @click="cheackLogin('verify_code')" :class="['pend',btnType=='verify_code'?'cheack':'']">手机号登录</span>
			</div>	
			<component v-bind:is="btnType" ref="loginFrom"></component>			
			<el-button :class="['lgoin_s4',btnType2]" type="primary" @click="loginUp">登录</el-button>		
			<p class="lgoin_s5"><span>没有账号？<a class="pend" @click="gotj()">注册</a></span><span><router-link class="pend" to="/index">返回首页</router-link></span></p>
			<!-- <div class="lgoin_s6x"></div> -->
			<div class="tip_t"><p class="p_t"></p><p class="p_text">第三方快捷登陆</p><p class="p_h"></p></div>
			<div class="lgoin_s6">
				<span @click="thirdLogin('qq')" class="dsf_qq"></span>
				<span @click="thirdLogin('weixin')" class="dsf_wx"></span>
				<span @click="thirdLogin('weibo')" class="dsf_wb"></span>
			</div>
		</div>
		<div v-show="isShow_dn" class="isShow_dn">
			<div class="login_x3" style="margin-bottom: 8px;">
				<span class="pend" style="width:100%;text-align: left;">微信二维码登陆</span>
			</div>
			<div id="login_container"></div>
			<p class="lgoin_s5" style="z-index:999999;"><span style="text-align: center;">没有账号？<a class="pend" @click="gotj()">注册</a></span></p>
		</div>
		
		
	</div>
</template>
<script>
import password from './login3'
import {Message} from 'element-ui'
import verify_code from './login4'
export default {
	inject:['reload'],
	components:{password,verify_code},
	name: 'login',	 
	data(){				
		return{
			btnType:'password',		
			btnType2:'',
			ajaxType:0,
			outc:{
				num:2,
				scroll:2,
			},
			isShow_ewm:true,
			isShow_dn:false,
		}
	},
	mounted: function () {	
		this.init();
	}, 
	methods: {
		wxLogin(){
			var obj = new WxLogin({
				self_redirect:false,
				id:'login_container',
				appid:'wxdf1b8a041cf76df1',
				scope:'snsapi_login',
				redirect_uri:"https%3A%2F%2Fshiquaner-api.zookingsoft.com%2FPassport%2FAuth%2Fcallback%3Ftype%3Dweixin",
				state:'login',
				style:'black',
				href:'https://zk-img.oss-cn-qingdao.aliyuncs.com/h5/cyn/text.css',
			})
		},
		btnTab(type){
			if(type == 'ewm'){
				this.isShow_dn = true;
				this.isShow_ewm = false;
				this.wxLogin();
			}
			if(type == 'dn'){
				this.isShow_dn = false;
				this.isShow_ewm = true;
			}
		},
		
		init(data){
			if(data){
				this.outc.num = data.num;
				this.gotj();
			}	
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
		gotj(){
			// this.bdtj('登录页','没有帐号去注册','--');
			// this.$router.push({
			// 	path:d
			// })
			this.$emit('funcRegister',this.outc)
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
			if(window.login_froms){
				data.from = window.login_froms;
			}			
			this.api.login(data).then((da)=>{	
				if(da=='error'){
					this.bdtj('登录页','登录失败','--');
					if(ispass){
						localStorage.setItem('pass','');
					}
					this.ajaxType=0;
					return
				}
				console.log(da)
				
				this.bdtj('登录页','登录成功','--');
				this.ajaxType=0;
				window.userInfo = da;
				localStorage.setItem('userT',JSON.stringify(da));	
				if(data.password){
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
				if(window.frompath2 && window.frompath2!=window.location.href){
					window.location.href = window.frompath2;
					return;
				}
				let pr = {
					access_token:window.userInfo.access_token
				};
				
				
				this.api.getSelfInfo(pr).then((da)=>{
					if(da=='error'){return}		
					this.$parent.$parent.close()
					console.log(da)
					this.reload();
					let userData = window.userInfo.access_token;
					window.userInfo = da;		
					window.userInfo.access_token = userData;
				}).catch();
				
					
				
				// this.$router.push({path: '/index'})
									
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
	watch: {

	}
}
</script>

<style scoped="scoped">
.lgoin_s6{
	border-radius: 0 0 8px 8px;
}
.box{
	width:404px;
	height:486px;
	background:rgba(255,255,255,1);
	box-shadow:0px 8px 32px 0px rgba(0,0,0,0.05);
	border-radius:5px;
	position: absolute;
	top: 160px;
    left: 21px;
}
.login_x3 .pend{
	width: 30%;
	float: left;
}
.login_x3{
	margin-top: 30px;
	padding-left: 30px;
	padding-right: 30px;
	height: 42px;
}
.lgoin_s4{
	width: 85%;
}
.lgoin_s5{
	padding:0px 30px 0px 30px;
}
.tab_image{
	position: absolute;
	right: 12px;
	top: 12px;
	cursor: pointer;
}
.tip_t{
	padding:0px 30px 0px 30px;
	height: 20px;
	line-height: 20px;
	margin-top: 30px;
}
.p_t{
	width: 100px;
	height: 1px;
	background: #E6E6E6;
	float: left;
	margin-top: 10px;
}
.p_text{
	float: left;
	color: #666666;
	font-size: 14px;
	margin-left: 25px;
}
.p_h{
	width: 100px;
	height: 1px;
	background: #E6E6E6;
	float: right;
	margin-top: 10px;
}
.isShow_dn{
	height: 415px;
}
#login_container,#login_container >>> iframe{
	height: 370px;
}
.isShow_dn >>> .impowerBox .title{
	display: none;
}
</style>
