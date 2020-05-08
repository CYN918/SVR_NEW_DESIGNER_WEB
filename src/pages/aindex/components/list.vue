<template>
	<ul class="boxd">
		<li v-for="(el,index) in List" :key="index">
			<slot name="todo" v-bind:todo="el"></slot>			
		</li>
		<img v-if="isNodaa" class="boxdn_01" src="/imge/app/noData.png">
		<span v-if="total>List.length" @click="addMo" class="btns">查看更多</span>
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
			List:[],
			page:1,
			limit:10,
			total:0,
			loading: '',
			isNodaa:''
		}
	},
	mounted: function () {	
		this.getData();		
	}, 
	methods: {	
		addMo(){
			this.page++;
			this.getData();
		},
		getData(){
			let params = {
				page:this.page,
				limit:this.limit
			};
			if(window.userInfo){
				params.access_token = window.userInfo.access_token;
			}	
			if(this.config.prms){
				params[this.config.prms.n] = this.config.prms.v();
			}
			this.api[this.config.ajaxUrl](params).then((da)=>{
				
				if(da=='error'){
					if(this.List.length==0){
						this.isNodaa = 1;
					}
					return
				}
				this.isNodaa = '';
				this.total = da.total;
				if(this.List.length==0 && da.data.length==0){
					this.isNodaa = 1;
				}
				
				if(this.List.length>0){
					this.List = this.List.concat(da.data);
					return
				}
				this.List = da.data;	
				
			}).catch(()=>{
				if(this.List.length==0){
					this.isNodaa = 1;
				}
			})
		},
	}
}
</script>

<style>
.boxd{
	width: 100%;
	padding: 1.29rem 0;
}
.btns{
	display: block;
    width: 8.45rem;
    height: 1.8rem;

    margin: 0 auto;
    text-align: center;

    border: 1px solid #000;
    border-radius: .2rem;
    font-size: .7rem;
    line-height: 1.8rem;
    text-align: center;
}
.boxdn_01{
	width: 3rem;
	display: block;
    margin: 8rem auto;
}
</style>
