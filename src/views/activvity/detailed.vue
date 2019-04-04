<template>
	<div>
		
	</div>
</template>

<script>
export default {
	name: 'home',	 
	data(){	
		return{
			dataList:[],
			
		}
		
	},
	mounted: function () {	
		this.a_getInfo()
	}, 
	methods:{
		a_getInfo(){
			if(!this.$route.query.id){
				this.$router.push({path:'/activvity'})	
				return
			}
			this.api.a_getInfo({activity_id:this.$route.query.id}).then((da)=>{			
				console.log(da);			
			});
		},
		
	},
	
	
	
}	
	
	
</script>

<style>
</style>
