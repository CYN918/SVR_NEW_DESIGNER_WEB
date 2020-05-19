<template>
	<div style="padding:0px 30px 0px 30px;">
		<Input v-model="form.mobile" @setYzm="setYzm" :type="'text'" :oType="'phone'" :chekFn="chekPhpne" :placeholder="'请输入手机号'"  ></Input>
		<Input v-model="form.verify_code" @ajaxYzm="ajaxYzm" :type="'text'" :oType="'yzm'" :chekFn="chekverify" :placeholder="'输入 6 位短信验证码'"  ref="verify"></Input>							
		<div class="lgoin_s2zy"></div>	
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
				if(!(/^1[23456789]\d{9}$/.test(val))){ 
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
			checkType:'',
		}
	},
	mounted: function () {	
	}, 
	methods: {
		pushData(){
			if(this.checkType){
				return this.form;
			}
			return '';
		},
		ajaxYzm(){
			this.bdtj('登录页','发送验证码','--');
			if(!this.chekPhpne(this.form.mobile)){
				Message({message: '请先填写手机号码'});
				return
			}
			
			
			let params = {
				mobile:this.form.mobile,
				mobile_zone:this.form.mobile_zone,
				type:'login',
			};
			this.api.sendVerifyCode(params).then((da)=>{
				
				if(da=='error'){
					return	
				}
				this.$refs.verify.runTimer(60);
			}).catch(()=>{
				
			});
		},
		setYzm(val){
			this.form.mobile_zone = val;
		},
		pdys2(){
			this.checkType = '';
	    	let pd = this.chekverify(this.form.verify_code);
	    	if(pd!=true && pd.type!=true){
	    		this.$parent.setBtn(false);
				return;
	    	}
	 		let pd3 = this.chekPhpne(this.form.mobile);
	    	if(pd3!=true && pd3.type!=true){
	    		this.$parent.setBtn(false);
				return;
	    	}
			this.checkType = 1;
	    	this.$parent.setBtn(true);
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
