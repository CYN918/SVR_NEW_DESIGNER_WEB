<template>
	<div class="newUsermeBOX">
		<div class="newUserme2">
			<div class="userBoxd">
				<span>手机号</span>
				<inptPhone class="newUserme_x1" @checkBack="checkphoneBack" v-model="form.mobiles" :inputType="'phones'"  :placeholder="'请输入手机号'"></inptPhone>
			</div>
			<div class="userBoxd">
				<span>登录密码</span>
				<inptPhone class="newUserme_x1" @checkBack="checkphoneBack" v-model="form.password" :inputType="'password'" :type="'password'" :placeholder="'请输入您的登录密码'"></inptPhone>						
			</div>
			<div class="yhtop6f">
				<div class="yhtop5 btnType" @click="goOut">退出</div>
				<div :class="['yhtop5',btnType]" @click="addSelfInfo">进入首页</div>
			</div>
		</div>
	</div>
</template>
<script>
import inptPhone from '../../components/input/input_phone';
export default {
	name: 'login',
	components:{inptPhone},
	data(){		
		return{	
			form:{},
			btnType:'',
			phones:false,		
			password:false,
			navOn:0,
		
		}
	},
	mounted: function () {}, 
	methods: {
		goOut(){
			let p = {
				access_token:window.userInfo.access_token
			};
			this.api.logout(p).then((da)=>{
				if(da=='error'){
					return
				}			
				localStorage.setItem('pass','');			
				localStorage.setItem('userT','');
				window.userInfo='';
				window.passIn = '';
				this.$router.push({path: '/login'})	
			});
		},
		
		checkphoneBack(type,on){
			this[on] = type;			
		},


		addSelfInfo(){
			if(!this.btnType){
				return
			}		
			if(!window.userInfo){
				this.$router.push({path: '/login'})
			}
			let pr = {
				mobile:this.form.mobiles.mobile,
				mobile_zone:this.form.mobiles.mobile_zone,
				login_type:'password',
				password:this.MD5(this.form.password),
			}
			this.api.bindExist(pr).then((da)=>{
				if(da=='error'){
					return
				}
	
				window.userInfo = da;
				localStorage.setItem('userT',JSON.stringify(da));
				this.$router.push({path:'/index'})
			});
		},
		pdys1(){		
			this.btnType = '';	 
			if(!this.form.mobiles){
				return
			}
			if(!this.form.password){
				return
			}	
			this.btnType = 'btnType';
		},
		
	},
	watch: {
	    'form.mobiles'(){
	    	this.pdys1();
	    },
		'form.password'(){
			this.pdys1();
		},


	}
}
</script>

<style>

</style>
