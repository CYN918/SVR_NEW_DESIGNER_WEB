<template>
	<div>
		<img class="login_x1" src="/imge/llog.png" alt="">
		<p class="login_x2">云创设计，最赚钱的设计师平台</p>
		<el-form ref="myform" :model="form">	
			<Input v-model="form.mobile" @setYzm="setYzm" :type="'text'" :oType="'phone'" :chekFn="chekPhpne" :placeholder="'请输入手机号'"  ></Input>
			<Input v-model="form.verify_code"  @ajaxYzm="ajaxYzm" :type="'text'" :oType="'yzm'" :chekFn="chekverify" :placeholder="'输入 6 位短信验证码'"  ref="verify"></Input>
			<Input v-model="form.password"  :oType="'password'" :chekFn="chekPssword" :type="'password'" :placeholder="'6 - 16位密码，区分大小写'"></Input>			
			<Input v-model="form.password_repass"  :oType="'password'" :chekFn="vp_r" :type="'password'" :placeholder="'确认密码'"  ></Input>
			<el-form-item>
				<el-button :class="['lgoin_s4',btnType]" type="primary" @click="submitForm('myform')">注册</el-button>				
			</el-form-item>
			<p class="lgoin_s5">已有账号？<router-link class="pend" to="/login">登陆</router-link></p>
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
				if(!(/^1[34578]\d{9}$/.test(val))){ 
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
		}
	},
	mounted: function () {	
	}, 
	methods: {
		ajaxYzm(){
			let pd = this.chekPhpne(this.form.mobile);
			if(pd!=true && pd.type!=true){
				Message({message: '请先填写手机号码'});
				return
			}
			this.$refs.verify.runTimer(60);			
			let params = {
				mobile:this.form.mobile,
				mobile_zone:this.form.mobile_zone
			};
			this.api.sendVerifyCode(params).then(()=>{	
				
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
			params.password = this.MD5(params.password);
			params.password_repass = this.MD5(params.password_repass);
			this.ajaxType=1;
			this.api.register(params).then((da)=>{
				
				if(!da){
					this.ajaxType=0;
					return
				}
				
				Message({message: '注册成功'});
				let pr = {			
					mobile_zone:params.mobile_zone,
					mobile:params.mobile,	
					password:params.password,
					login_type:'password',
				};
				this.api.login(pr).then((da)=>{	
					
					if(!da){
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
