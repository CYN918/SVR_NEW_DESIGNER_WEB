<template>
	<div>
		<img class="login_x1" src="/imge/llog.png" alt="">
		<p class="login_x2">云创设计，最赚钱的设计师平台</p>
		<el-form ref="myform" :model="form" :rules="rules">
			<div class="login_x3">
				<span @click="cheackLogin(0)" :class="['pend',type==0?'cheack':'']">账户密码登录</span><span @click="cheackLogin(1)" :class="['pend',type==1?'cheack':'']">手机号登录</span>
			</div>	
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
						
			<el-form-item  prop="password">
				<el-input class="lgoin_s3" v-model="form.password" :type="midf2" placeholder="确认密码"></el-input>
				<div class="iconfont pend mad" @click="chemima('midf2')">
					<span  v-if="midf2=='password'">&#xe61f;</span>
					<span  v-else>&#xe6a2;</span>
				</div>				
			</el-form-item>
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
export default {
	name: 'login',	 
	data(){
		const validatePass4 = (rule, value, callback) => {
			if(!this.form.password){
				callback(new Error('请输入密码'))
				return
			}		
			callback()
			return			
		};

		const phone = (rule, value, callback) => {
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
			checked:0,
			type:0,
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
					{ required: true, trigger: 'blur', validator: phone},
				],
				password:[
					{ required: true, validator: validatePass4, trigger: 'blur' }
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
		cheackLogin(){	
			this.$router.push({path: '/login2'})
		},
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
			this.$refs[formName].validate((valid) => {
				if(!valid){
					typed=1;
				}
			});
			if(typed==1){
				return
			}
			let params = {
				login_type:'password',
				mobile_zone:this.form.mobile_zone,
				mobile:this.form.mobile,
				password:this.MD5(this.form.password)
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
			this.api.sendVerifyCode(params).then(()=>{						
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
