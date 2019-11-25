<template>
	<div class="Messgebox">
		<component v-bind:is="tcZj" :setData="setData"></component>
	</div>
</template>

<script>
import {Message} from 'element-ui'
import email_dom from '../commd/email';
export default {
	components:{email_dom},
	name: 'messge',	
	data(){
		return {
			tcZj:'',
			setData:{},
		}
	},
	mounted: function () {			
		this.init();
	}, 
	methods: {
		init(){

			if(!this.$route.query.ret){
				this.$router.push({path: '/index'})
				return
			}
			let data = JSON.parse(this.$route.query.ret);
			
			
			if(data.operate=='bind' && data.type == 'email'){
				
				if(data.res.result==0){
					this.setData.type = 0;
					this.tcZj = 'email_dom';
				}else{					
					this.$message({message: data.res.message});
					this.setData.type = 1;
					this.tcZj = 'email_dom';				
				}				
				
				return;
			}
			
			if(data.res.result!=0){
				if(data.operate=='bind'){
					this.$router.push({path: '/setSecurity'})
				}else{
					this.$router.push({path: '/index'})
				}

				setTimeout(()=>{
					this.$message({message: data.res.message});
				},500);
				return
			}
			if(data.operate=='bind'){

				this.$router.push({path: '/setSecurity'})
			}
			if(data.operate=='login'){

				this.api.getSelfInfo({}).then((da)=>{
					if(da=='error'){return}
					da.access_token = data.res.data.access_token;
					window.userInfo = da;
					localStorage.setItem('userT',JSON.stringify(da));
					this.$router.push({path: '/index'})					
					setTimeout(()=>{
						this.$message({message: '登录成功'});
					},500);
				}).catch();
				return
			}
			
			
		},
	},
}
</script>

<style>
.Messgebox{
	min-height: 820px;
}
</style>
