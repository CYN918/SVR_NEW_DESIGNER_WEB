<template>
	<div>
		<Inputdf v-model="form.mobile" @setYzm="setYzm" :type="'text'" :oType="'phone'" :chekFn="chekPhpne" :placeholder="'请输入手机号'"></Inputdf>			
		<Inputdf v-model="form.password" :oType="'password'" :chekFn="chekPssword" :type="'password'" :placeholder="'请输入密码'"></Inputdf>	
		<div class="lgoin_s2zy">
			<span><el-checkbox v-model="islogin">自动登录</el-checkbox></span>
			<router-link class="last pend" to="/modifyPassword">忘记密码</router-link>
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
			islogin:false,		
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
			checkType:'',
		}
	},
	mounted: function () {}, 
	methods: {	
		pushData(){
			if(this.checkType){
				if(this.islogin==true){
					this.form.islogin = true;
				}
				return this.form;
			}
			return '';
		},
		setYzm(val){
			this.form.mobile_zone = val;
		},
		pdys1(){    
			this.checkType = '';
			let pd = this.chekPssword(this.form.password);
			if(pd!=true && pd.type!=true){this.$parent.setBtn(false); return }
			let pd3 = this.chekPhpne(this.form.mobile);
			if(pd3!=true && pd3.type!=true){this.$parent.setBtn(false);return}
			this.$parent.setBtn(true);
			this.checkType = 1;
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
.lgoin_s6{
	border-radius: 0 0 8px 8px;
}
</style>
