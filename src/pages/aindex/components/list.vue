<template>
	<ul>
		<li v-for="(el,index) in List" :key="index">
			<slot name="todo" v-bind:todo="el"></slot>			
		</li>
	</ul>
</template>

<script>


export default {
	
	props:{
		config:{
			type:Object,
			default:{}
		}
	},
	data(){
		return{
			shareData:{},
			List:[1,2,3,4,5,6],
			page:1,
			limit:10,
			total:0,
			loading: '',
		}
	},
	mounted: function () {	
		this.getData();		
	}, 
	methods: {	
		getData(){
			window.scrollTo(0,0);
			let params = {
				page:this.page,
				limit:this.limit
			};
			if(window.userInfo){
				params.access_token = window.userInfo.access_token;
			}			

			this.api[this.config.ajaxUrl](params).then((da)=>{

				if(!da){
					return
				}
				this.List = da.data;
				this.total = da.total;
			}).catch(()=>{

			})
		},

	}
}
</script>

<style>

</style>
