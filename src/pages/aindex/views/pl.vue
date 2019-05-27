<template>
	<ul class="boxd">
		<li v-for="(el,index) in hfData" :key="index">
			<slot name="todo" v-bind:todo="el"></slot>			
		</li>
	</ul>	
</template>
<script>
export default {
	data(){
		return{
			hfData:[],
			hfnum:0,
			page:1,
			limit:10,
		}
	},
	mounted: function () {	
		this.init();
	}, 
	methods: {	
		init(){
			if(!this.$route.query || !this.$route.query.id){
				window.close();
				return;
			}			
			this.getCommentList();
		},		
		getCommentList(){
			let pr = {
				work_id:this.$route.query.id,
				page:this.page,
				limit:this.limit,
			};
			if(window.userInfo){
				pr.access_token = window.userInfo.access_token;
			}
			this.api.getCommentList(pr).then((da)=>{
				if(!pr){return}
				this.hfnum = da.total;
				this.hfData = this.hfData.concat(da.data);
				
		    });
		},
	
	}
}
</script>

<style>

</style>
