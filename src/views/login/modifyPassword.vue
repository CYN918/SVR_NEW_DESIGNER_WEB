<template>
	<div>
		<img class="login_x1" src="/imge/llog.png" alt="">	
		<el-form ref="myform" :model="form" :rules="rules">			
			<el-form-item  prop="mobile">			
				<el-select class="lgoin_s1" v-model="form.mobile_zone">
					<el-option
					v-for="item in xnData"
					:key="item.label"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
				<el-input class="lgoin_s2"  v-model="form.mobile" placeholder="手机号"></el-input>
			</el-form-item>
			
			<el-form-item prop="verify_code">
				<el-input class="lgoin_s3x1" v-model="form.verify_code" placeholder="输入 6 位短信验证码"></el-input>
				<div class="lgoin_s3x2" ><input class="el-input__inner" type="text"><div @click="setTimer">{{timer}}</div></div>		
			</el-form-item>	
					
			<el-form-item>	
				<div :class="['',passqd]">
					<input @blur="checkpassword" :class="['el-input__inner']" v-model="form.password" :type="midf1"  placeholder="6 - 16位密码，区分大小写">
					<div class="padderr">{{padderr}} <span></span></div>
					<div class="iconfont pend mad" @click="chemima('midf1')">
						<span  v-if="midf1=='password'">&#xe61f;</span>
						<span  v-else>&#xe6a2;</span>
					</div>	
				</div>
			</el-form-item>
			
			<el-form-item prop="password_repass">
				<el-input class="lgoin_s3" v-model="form.password_repass" :type="midf2" placeholder="确认密码"></el-input>
				<div class="iconfont pend mad" @click="chemima('midf2')">
					<span  v-if="midf2=='password'">&#xe61f;</span>
					<span  v-else>&#xe6a2;</span>
				</div>				
			</el-form-item>
			
			<el-form-item>
				<el-button class="lgoin_s4" type="primary" @click="submitForm('myform')">注册</el-button>				
			</el-form-item>
			
			<p class="lgoin_s5">已有账号？<router-link class="pend" to="/login">登陆</router-link></p>
			
		</el-form>
	</div>
</template>

<script>
import {Message} from 'element-ui'
export default {
	name: 'register',	 
	data(){
		const vp_r = (rule, value, callback) => {
			if(!this.form.password_repass){
				callback(new Error('请确认密码'))
				return
			}
			if(this.form.password!= this.form.password_repass) {
				callback(new Error('两次密码不一致'))
				return
			}
			callback()
			return			
		};
		const v_c = (rule, value, callback) => {
			if(!this.form.verify_code){
				callback(new Error('请填写验证码'))
				return
			}
			if(!(/^\S*$/.test(this.form.verify_code))){ 				
				callback(new Error('验证码不能有空格'))
				return ; 
			} 			
			if(this.form.verify_code.length!=6){
				callback(new Error('请填写6位验证码'))
				return
			}
		};

		const m_e = (rule, value, callback) => {
			this.phoneD=0;
			if(this.form.mobile_zone!='86'){
				if(!(typeof +this.form.mobile === 'number' && +this.form.mobile%1 === 0)){
					callback(new Error('请输入正确的手机号码'))					
				}			
				return false; 
			}	
			if(!(/^1[34578]\d{9}$/.test(this.form.mobile))){ 
				callback(new Error('请输入正确的手机号码'))
				return false; 
			} 
			this.phoneD=1;
			callback()
		};		
				
		return{
			phoneD:0,
			passqd:'',
			padderr:'',
			midf1:"password",
			midf2:"password",
			setRule:{
				mobile:"",
				verify_code:"",
				password:"",
			},
			form:{
				mobile_zone:'86',
			},
			rules: {
				mobile: [	
					{ required: true, trigger: 'blur', validator: m_e},
				],
				
				verify_code:[
					{ required: true, trigger: 'blur', validator: v_c }
				],

				password_repass:[
					{ required: true, validator: vp_r, trigger: 'blur' }
				]
				
			},
			timer:'获取验证码',
			xnData:[
				{label:"中国 +86",value:"86"},
				{label:"中国香港 +852",value:"852"},
				{label:"中国澳門 +853",value:"853"},
				{label:"中国台灣 +886",value:"886"},
				{label:"美国 +1",value:"1"},
				{label:"日本 +81",value:"81"},
				{label:"韩国 +82",value:"82"},
				{label:"马来西亚 +60",value:"60"},
				{label:"新加坡 +65",value:"65"},
				{label:"越南 +84",value:"84"},
				{label:"澳大利亚 +61",value:"61"},
				{label:"加拿大 +1",value:"1"},
				{label:"英国 +44",value:"44"},
				{label:"法国 +43",value:"43"},
				{label:"泰国 +66",value:"66"},
				{label:"印度 +91",value:"91"},
				{label:"菲律宾 +63",value:"63"},
				{label:"巴西 +55",value:"55"},
				{label:"印度尼西亚 +62",value:"62"},
				{label:"意大利 +39",value:"39"},
				{label:"土耳其 +90",value:"90"}, 								
			],
			ajaxType:0,
		}
	},
	mounted: function () {	
	}, 
	methods: {
		checkpassword(){		
			if(!(/^\S*$/.test(this.form.password))){ 				
				this.padderr = '密码不能有空格';
				this.passqd = 'errd';
				return false; 
			} 
			if(!this.form.password){
				this.padderr = '请输入密码';
				this.passqd = 'errd';
				return false;
			}
			let len = this.form.password.length;
			
			if(len<6){
				this.padderr = '强度：太短';
				this.passqd = 'errd2';
				return false;
			}
			if(len<10){
				this.padderr = '强度：中等';
				this.passqd = 'errd3';
				return true;
			}
			
			if(len>17){
				this.padderr = '密码请小于16位';
				this.passqd = 'errd5';
				return false;
			}
			if(len<17){
				this.padderr = '强度：安全';
				this.passqd = 'errd4';
				return true;
			}
			return false;
		},
		chemima(data){
			this[data] = this[data]=='password'?'text':'password';
		},
		submitForm(formName){
			if(this.ajaxType==1){
				Message({message: '正在提交',type: 'success'});
				return
			}
			let typed = 0;
			if(this.checkpassword()==false){
				typed = 1;
			}
			this.$refs[formName].validate((valid) => {
				if(!valid){
					typed=1;
				}
			});
			
			
			if(typed==1){
				return
			}
			let params = this.form;
			params.password = this.MD5(params.password);
			params.password_repass = this.MD5(params.password_repass);
			
			
			this.ajaxType=1;
			this.api.modifyPassword(params).then(()=>{	
				this.$router.push({path: '/index'});
				this.ajaxType=0;
			}).catch(()=>{
				
				this.ajaxType=0;
			});	
		},
		setTimer(){
			if(this.phoneD==0){
				return
			}
			if(this.timer!='获取验证码'){
				return
			}
			
			if(!this.form.mobile){
				this.$refs.myform.validateField(['mobile']);
				return
			}

			let params = {
				mobile:this.form.mobile,
				mobile_zone:this.form.mobile_zone
			};
			this.api.sendVerifyCode(params).then((response)=>{						
				console.log(response);
				this.runTimer(60);
			}).catch(()=>{
			
	
			});
			
		
			
		},
		runTimer(num){
			this.timer = num +'秒后重新获取';
			if(num==0){
				this.timer = '获取验证码';
				return
			}
			setTimeout(()=>{
				num--;
				this.runTimer(num);
			},1000)
			
		}
	}

}
</script>

<style>

</style>
