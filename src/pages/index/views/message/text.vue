<template>
	<div>
		<headNav :config="navData" ref="xtop"></headNav>
		<headNav v-if="topTyped==true" class="dbxfyS" :config="navData" ref="xtop"></headNav>
		<router-view/>
	</div>
</template>

<script>
import headNav from '../../components/myHead2'
export default {
	components:{headNav},
	name: 'index',
	data(){
		return{
			navData:{
				title:'文档服务中心',
				arr:[
					{u:'/text/about',n:'关于我们'},
					{u:'/text/userProtocol',n:'用户协议'},
					{u:'/text/authorization',n:'授权协议'},
					{u:'/text/help',n:'帮助中心'}
				]
			},
			topTyped:false,
		}
	},	
	mounted: function(){
		this.init();
	}, 
	methods: {
		init(){
			this.getXsm();
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
			window.onscroll = ()=>{
				
				let t = document.documentElement.scrollTop||document.body.scrollTop;
				if(t==0){
					document.documentElement.scrollTop =1;
					document.body.scrollTop =1;
				}
				if(t>60 && this.topTyped==false){
					this.topTyped=true;
				}
				if(t<=60 && this.topTyped==true){				
					this.topTyped=false;
				}
			}
		
		},
		getXsm(){
			let pr = {
				user_open_id:'system_admin'
			};
			this.api.getUserDetail(pr).then((da)=>{
				if(da=='error'){
					return
				}
				window.xsmData= da;
				
			}).catch(()=>{
				
			});
		},
	},
	watch: {	
		'$route': function() {
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
		},
	}
}	
</script>

<style>
.content{
	max-width: 1300px;
	margin: 80px auto;
    text-align: left;
    min-height: 666px;
}
.content p{
	margin: 20px auto;
}
.dbxfyS{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;

}

</style>
