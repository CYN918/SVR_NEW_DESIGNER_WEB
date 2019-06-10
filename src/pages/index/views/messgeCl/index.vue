<template>
	<div class="Messgebox">
		
	</div>
</template>

<script>
import {Message} from 'element-ui'
export default {
	name: 'messge',	
	data(){
		return {}
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
			console.log(data);
			if(data.res.result!=0){
				
				Message({message: data.res.message});
				setTimeout(()=>{
					this.$router.push({path: '/index'})
				},2000);
				return
			}
			if(data.operate=='login'){
				let pr = {
					access_token:data.res.data.access_token
				};
				this.api.getSelfInfo(pr).then((da)=>{
					if(da=='error'){return}
					da.access_token = data.res.data.access_token;
					window.userInfo = da;
					localStorage.setItem('userT',JSON.stringify(da));
					Message({message: '登录成功'});
					setTimeout(()=>{
						this.$router.push({path: '/index'})
					},2000);
				}).catch();
				return
			}
			if(data.operate=='bind'){
				this.$router.push({path: '/setSecurity'})
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
