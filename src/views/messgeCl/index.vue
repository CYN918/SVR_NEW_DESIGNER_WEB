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
			if(data.res.result!=0){
				
				Message({message: data.res.message});
				setTimeout(()=>{
					this.$router.push({path: '/index'})
				},2000);
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
