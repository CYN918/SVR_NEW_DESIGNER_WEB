<template>
	<div>
		<img class="login_x1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/header/logo.svg" @click="jump">
		<p class="login_x2">让创意更有价值，让生活更加自在</p>
		<el-form ref="myform" :model="form">	
			<Input v-model="form.mobile" @setYzm="setYzm" :type="'text'" :oType="'phone'" :chekFn="chekPhpne" :placeholder="'请输入手机号'"  ></Input>
			<Input v-model="form.verify_code"  @ajaxYzm="ajaxYzm" :type="'text'" :oType="'yzm'" :chekFn="chekverify" :placeholder="'输入 6 位短信验证码'"  ref="verify"></Input>
			<Input v-model="form.password"  :oType="'password'" :chekFn="chekPssword" :type="'password'" :placeholder="'6 - 16位密码，区分大小写'"></Input>			
			<Input v-model="form.password_repass" :oType="'password'" :chekFn="vp_r" :type="'password'" :placeholder="'确认密码'"  ></Input>
			<el-form-item>
				<el-button :class="['lgoin_s4',btnType]" type="primary" @click="submitForm('myform')">注册</el-button>				
			</el-form-item>
			<p class="lgoin_s5">已有账号？<a class="pend" @click="god('/login')">登录</a></p>
		</el-form>
	</div>
</template>

<script>
import {Message} from 'element-ui'
import Input from '../../components/input'
export default {
	components:{Input},
	name: 'register',	 
	data(){
		return{
			btnType:'',
			vp_r(val){
				if(!val){
					return {type:false,text:'请确认密码',cls:'errd'}
				}
				if(this.$parent.$parent.form.password != val){
					return {type:false,text:'两次密码不一致',cls:'errd'}
				}
				return true
			},
			chekPssword(val){	
				if(!val){
					return {type:false,text:'请输入密码',cls:'errd'}
				}
				if(!(/^\S*$/.test(val))){ 				
					return {type:false,text:'密码不能有空格',cls:'errd'}
				} 				
				let len = val.length;				
				if(len<6){
					return {type:false,text:'强度：太短',cls:'errd2'}
				}
				if(len<10){
					return {type:true,text:'强度：中等',cls:'errd3'}
				}
				
				if(len>16){
					return {type:false,text:'密码请小于16位',cls:'errd'}
				}
				if(len<17){
					return {type:true,text:'强度：安全',cls:'errd4'}
				}
				return false;
			},
			chekPhpne:function(val){
				if(this.form.mobile_zone!='86'){
					if(!(typeof val === 'number' && val%1 === 0)){
						return {type:false,text:'请输入正确的手机号码',cls:'errd5'}; 					
					}			
					return true; 
				}	
				if(!(/^1[23456789]\d{9}$/.test(val))){ 
					return {type:false,text:'请输入正确的手机号码',cls:'errd5'}; 
				} 
				return true;
			},
			chekverify:function(val){
				if(!val){
					return {type:false,text:'请填写验证码',cls:'errd5'}; 
				}
				if(!(/^\S*$/.test(val))){ 				
					return {type:false,text:'验证码不能有空格',cls:'errd5'}; 
				} 			
				if(val.length!=6){
					return {type:false,text:'请填写6位验证码',cls:'errd5'}
				}
				return true
			},
			form:{
				mobile_zone:'86',
			},
			timer:'获取验证码',
			ajaxType:0,
			listen:'',
		}
		
	},
	mounted: function () {	
		this.init();
	}, 
	beforeDestroy:function(){
		document.removeEventListener('keydown',this.keyDown);
	},
	methods: {
		init(){	
			let referrer_id = this.$route.query.referrer_id;
			if(referrer_id){
				let pr = {
					referrer_id:referrer_id,
					time:(new Date()).getTime()
				};
				localStorage.setItem('referrer_id',JSON.stringify(pr));
			}
			document.addEventListener('keydown',this.keyDown);
		},
		keyDown(e){
			if(e.keyCode==13){
				this.submitForm('myform');
			}	
		},
		god(d){
			this.bdtj('注册页','已有账号','--')
			this.$router.push({path:d})
		},
        jump(){
            this.$router.push({path:'/index'})
        },
		ajaxYzm(){
			this.bdtj('注册页','获取验证码','--');
			let pd = this.chekPhpne(this.form.mobile);
			if(pd!=true && pd.type!=true){
				Message({message: '请先填写手机号码'});
				return
			}
				
			let params = {
				mobile:this.form.mobile,
				mobile_zone:this.form.mobile_zone,
				type:'register',
			};
			this.api.sendVerifyCode(params).then((da)=>{	
				if(da=='error' || da=='104'){
					return	
				}
				this.$refs.verify.runTimer(60);		
			}).catch(()=>{
				
			});
		},
		setYzm(val){
			this.form.mobile_zone = val;
		},
		chemima(data){
			this[data] = this[data]=='password'?'text':'password';
		},
		submitForm(formName){
			this.bdtj('注册页','注册按钮','点击');
			if(!this.btnType){
				return
			}
			if(this.ajaxType==1){
				Message({message: '正在提交'});
				return
			}
		
			let params = {
				mobile:this.form.mobile_zone,
				mobile_zone: this.form.mobile_zone,
				mobile: this.form.mobile,
				verify_code: this.form.verify_code,
				password: this.form.password,
				password_repass:this.form.password_repass
			};
			let prreferrer = localStorage.getItem('referrer_id');
			if(prreferrer){
				prreferrer = JSON.parse(prreferrer);
				let ontime = (new Date()).getTime();
				if(ontime-prreferrer.time>60*1000*60*24){
					localStorage.setItem('referrer_id','');
				}else{
					params.referrer_id = prreferrer.referrer_id;
				}
			}		
			params.password = this.MD5(params.password);
			params.password_repass = this.MD5(params.password_repass);
			this.ajaxType=1;
			this.api.register(params).then((da)=>{
				
				if(da=='error' || da=='104'){
					this.bdtj('注册页','注册失败','--');
					this.ajaxType=0;
					return
				}
				this.bdtj('注册页','注册成功','--');
				localStorage.setItem('referrer_id','');
				Message({message: '注册成功'});
				let pr = {			
					mobile_zone:params.mobile_zone,
					mobile:params.mobile,	
					password:params.password,
					login_type:'password',
				};
				this.api.login(pr).then((da)=>{	
					
					if(da=='error' || da=='104'){
						return
					}
					this.ajaxType=0;
					localStorage.setItem('userT',JSON.stringify(da));
					window.userInfo = da;										
					this.$router.push({path: '/userme'})	
				}).catch(()=>{
					Message({message: '自定登录失败请稍后自行登录'});
					this.ajaxType=0;
				});	
			}).catch(()=>{	
				this.bdtj('注册页','注册失败','--');
				Message({message: '注册失败'});
				this.ajaxType=0;
			});	
		},
		pdys1(){
			this.btnType = '';
			if(!this.form.password_repass){
				return;
			}
			if(this.form.password_repass != this.form.password){
				return;
			}
			let pd = this.chekPssword(this.form.password);
	    	if(pd!=true && pd.type!=true){
	    		return
	    	}
	    	let pd2 = this.chekverify(this.form.verify_code);
	    	if(pd2!=true && pd2.type!=true){
	    		return
	    	}
	 		let pd3 = this.chekPhpne(this.form.mobile);
	    	if(pd3!=true && pd3.type!=true){
	    		return
	    	}
	    	this.btnType = 'btnType';
		},
	},
	watch: {
	    'form.mobile'(val) {
	    	this.pdys1();
	    },
	    'form.password'(val) {
	    	this.pdys1();
	    },
	    'form.password_repass'(val) {
	    	this.pdys1();
	    },
	    'form.verify_code'(val) {
	    	this.pdys1();
	    },	    
	}

}
</script>

<style>

</style>
