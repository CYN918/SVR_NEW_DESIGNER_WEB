<template>
	<div>
		<img class="login_x1" src="/imge/llog.png" alt="">
		<p class="login_x2">云创设计，最赚钱的设计师平台</p>
		<el-form ref="myform" :model="form">
			<div class="login_x3">
				<span @click="cheackLogin" class="pend">账户密码登录</span><span  class="pend cheack">手机号登录</span>
			</div>	
			<Input v-model="form.mobile" @setYzm="setYzm" :type="'text'" :oType="'phone'" :chekFn="chekPhpne" :placeholder="'请输入手机号'"  ></Input>
			<Input v-model="form.verify_code" @ajaxYzm="ajaxYzm" :type="'text'" :oType="'yzm'" :chekFn="chekverify" :placeholder="'输入 6 位短信验证码'"  ref="verify"></Input>
			<div class="lgoin_s2zy">
				<span><input type="checkbox">自动登录</span>
				<router-link class="last pend" to="/modifyPassword">忘记密码</router-link>
			</div>
			<el-form-item>
				<el-button class="lgoin_s4" type="primary" @click="submitForm('myform')">登录</el-button>				
			</el-form-item>
			<p class="lgoin_s5">没有账号？<router-link class="pend" to="/register">注册</router-link></p>
		</el-form>
		<div class="lgoin_s6x"></div>
		<div class="lgoin_s6">
			<img src="/imge/01.png" alt="">
			<img src="/imge/02.png" alt="">
			<img src="/imge/03.png" alt="">
		</div>
	</div>
</template>
<script>
import {Message} from 'element-ui'
import Input from '../../components/input'
export default {
	name: 'login',	
	components:{Input},
	data(){	
		return{
			chekPhpne:function(val){
				if(this.form.mobile_zone!='86'){
					if(!(typeof val === 'number' && val%1 === 0)){
						return {type:false,text:'请输入正确的手机号码',cls:'errd'}; 					
					}			
					return true; 
				}	
				if(!(/^1[34578]\d{9}$/.test(val))){ 
					return {type:false,text:'请输入正确的手机号码',cls:'errd'}; 
				} 
				return true;
			},
			chekverify:function(val){
				if(!val){
					return {type:false,text:'请填写验证码',cls:'errd'};
				}
				if(!(/^\S*$/.test(val))){ 				
					return {type:false,text:'验证码不能有空格',cls:'errd'}; 
				} 				
				if(val.length!=6){
					return {type:false,text:'请填写6位验证码',cls:'errd'};
				}
				return true;
			},
			type:1,
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
			if(this.chekPhpne(this.form.mobile)){
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
		cheackLogin(){
			this.$router.push({path: '/login'})
		},
		submitForm(formName){
			if(this.ajaxType==1){
				Message({message: '正在提交'});
				return
			}
			let params = {
				login_type:'verify_code',
				mobile_zone:this.form.mobile_zone,
				mobile:this.form.mobile,
				verify_code:this.form.verify_code
			};
			this.ajaxType=1;
			this.api.login(params).then((response)=>{	
				localStorage.setItem('userT',response.access_token);
				this.$router.push({path: '/index'})
				this.ajaxType=0;
			}).catch(()=>{
				this.ajaxType=0;
			});				
		},
		pdys2(){
			this.btnType = '';
	    	let pd = this.chekverify(this.form.verify_code);
	    	if(pd!=true && pd.type!=true){
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
	    	this.pdys2();
	    },
	    'form.verify_code'(val) {
	    	this.pdys2();
	    },
	}

}
</script>

<style>

</style>
