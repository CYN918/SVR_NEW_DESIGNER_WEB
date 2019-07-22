<template>
	<div>
		<headNav :config="navData" ref="xtop"></headNav>
		<headNav v-if="topTyped==true" class="dbxfyS" :config="navData" ref="xtop"></headNav>
		<div class="content">
			<div v-html="comt"></div>
		</div>
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
					{u:'/about',n:'关于我们'},
					{u:'/userProtocol',n:'用户协议'},
					{u:'/authorization',n:'授权协议'},
					{u:'/help',n:'帮助中心'}
				]
			},
			topTyped:false,
			comt:'',
			isaj:'',
		}
	},	
	mounted: function(){
		this.init();
	}, 
	methods: {
		init(){
			this.isaj = '';
			this.getXsm();
			this.getMrData();
			this.getPzData();
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
			})
		},		
		getMrData(){			
			this.$ajax.get('/js/'+this.$route.name+'.json').then((da)=>{
				if(!this.isaj){
					this.comt = da.data;
				}				  
			})			
		},
		getPzData(){			
			this.api.documentget({type:this.$route.name}).then((da)=>{
				if(da=="error" || !da.document){return}
				this.isaj = 1;
				this.comt = da.document;
			})
		}
	},
	watch: {	
		'$route': function() {
			this.init();
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
