<template>
	<div style="padding:0px 30px 0px 30px;">
		<Inputdf v-model="form.mobile" @setYzm="setYzm" :type="'text'" :oType="'phone'" :chekFn="chekPhpne" :placeholder="'请输入手机号'"></Inputdf>			
		<Inputdf v-model="form.password" :oType="'password'" :chekFn="chekPssword" :type="'password'" :placeholder="'请输入密码'" :tip="tip"></Inputdf>	
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
				if(!(/^1[345789]\d{9}$/.test(val))){ 
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
		'islogin'(){
			this.bdtj('登录页','自动登录'+this.islogin,'--');
		},
	}
	

}
</script>

<style scoped="scoped">
.lgoin_s6{
	border-radius: 0 0 8px 8px;
}
.tip{
	color: #F56C6C;
    font-size: 12px;
    line-height: 27px;
    text-align: left;
}
</style>
