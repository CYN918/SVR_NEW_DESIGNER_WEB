<template>
	<div class="contf" v-html="dataD.info">
		
	</div>
</template>

<script>
export default {
	name: 'home',	 
	data(){	
		return{
			dataList:[],
			dataD:{}
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
				this.dataD = da;
              
			});
		},
		
	},
	
	
	
}	
	
	
</script>

<style>
.contf{
	width: 1300px;
	margin: 0 auto 60px;
	text-align: left;
}
</style>
