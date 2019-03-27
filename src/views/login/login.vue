<template>
	<div>
		<img class="login_x1" src="/imge/llog.png" alt="">
		<p class="login_x2">云创设计，最赚钱的设计师平台</p>
		<el-form ref="myform" :model="form" >
			<div class="login_x3">
				<span @click="cheackLogin" class="pend cheack">账户密码登录</span><span @click="cheackLogin" class="pend">手机号登录</span>
			</div>	
			<Inputdf v-model="form.mobile" @setYzm="setYzm" :type="'text'" :oType="'phone'" :chekFn="chekPhpne" :placeholder="'请输入手机号'"></Inputdf>			
			<Inputdf v-model="form.password" :oType="'password'" :chekFn="chekPssword" :type="'password'" :placeholder="'请输入密码'"></Inputdf>
			<div class="lgoin_s2zy">
				<span><el-checkbox v-model="islogin">自动登录</el-checkbox></span>
				<router-link class="last pend" to="/modifyPassword">忘记密码</router-link>
			</div>
			<el-form-item>
				<el-button :class="['lgoin_s4',btnType]" type="primary" @click="submitForm('myform')">登录</el-button>				
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
import Inputdf from '../../components/input'
import xcheckBox from '../../components/checkBox'
export default {
	components:{Inputdf,xcheckBox},
	name: 'login',	 
	data(){				
		return{
			rideds:[{n:'自动登录',v:1}],
			islogin:false,
			btnType:'',			
			chekPssword:function(val){
				if(!val){return {type:false,text:'请输入密码',cls:'errd'}}
				return true
			},
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
			form:{
				mobile_zone:'86',
			},
			ajaxType:0,
		}
	},
	mounted: function () {	
	
	}, 
	methods: {		
		setYzm(val){
			this.form.mobile_zone = val;
		},
		cheackLogin(){	
			this.$router.push({path: '/login2'})
		},
		submitForm(){
			if(!this.btnType){
				return
			}
			if(this.ajaxType==1){
				Message({message: '正在提交'});
				return
			}
			let params = {			
				mobile_zone:this.form.mobile_zone,
				mobile:this.form.mobile,	
				password:this.MD5(this.form.password),
				login_type:'password',
			};
			
			this.ajaxType=1;
			this.api.login(params).then((da)=>{	
				this.ajaxType=0;
				localStorage.setItem('userT',JSON.stringify(da));	
				if(this.islogin===true){
					localStorage.setItem('pass',JSON.stringify(params));
				}
				if(da.is_detail==0){
					this.$router.push({path: '/userme'})	
					return
				}
				this.$router.push({path: '/index'})			
				
			}).catch(()=>{
				this.ajaxType=0;
			});	
			
		},
		pdys1(){
			this.btnType = '';	    	
			let pd = this.chekPssword(this.form.password);
			if(pd!=true && pd.type!=true){return}
			let pd3 = this.chekPhpne(this.form.mobile);
			if(pd3!=true && pd3.type!=true){return}
			this.btnType = 'btnType';
		},
		
	},
	watch: {
		'form.mobile'() {
			this.pdys1();
		},
		'form.password'() {
			this.pdys1();
		},
	}
	

}
</script>

<style>

</style>
