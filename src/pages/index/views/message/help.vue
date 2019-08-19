<template>
	<div class="help_boxd">
		<headNav :config="navData" ref="xtop"></headNav>
		<headNav v-if="topTyped==true" class="dbxfyS" :config="navData" ref="xtop"></headNav>
		
		<div class="setUserBox">
			<div class="setUserBoxs">
				<div class="setUserBoxs_nav">
					<div  v-for="(el,index) in navDta" :key="index" @click="setNavd(index)" :class="[index==navdOn?'action':'']">{{el}}</div>
					
				</div>
				<div class="navDwzc">
					<div :class="['setUserBoxs_nav',topTyped?'fixdon':'']">
						<div  v-for="(el,index) in navDta" :key="index" @click="setNavd(index)" :class="[index==navdOn?'action':'']">{{el}}</div>
					</div>
				</div>
				
				<div class="setUserBoxs_cent">
					<div class="suc_1 hlepdd">
						{{list[navdOn]}}
					</div>
					
				</div>
			</div>
			
		</div>
		
	</div>
</template>

<script>
import headNav from '../../components/myHead2'
export default {
	name: 'works',
	components:{headNav},
	data(){
		return {
			navData:{
				title:'文档服务中心',
				arr:[
					{u:'/about',n:'关于我们'},
					{u:'/userProtocol',n:'用户协议'},
					{u:'/authorization',n:'授权协议'},
					{u:'/help',n:'帮助中心'}
				]
			},
			navdOn:0,
			navDta:[
				'如何报名项目',
				'报名条件是什么',
				'如何提高中标率',
				'如何得知是否中标'		
			],
			list:['aaaaaaaaaa','bbbbbbbbbbbbbb','cccccccccc','dddddddddddddddd'],
		}
	},
	mounted: function () {			
		this.init();
		
	}, 
	methods: {
		
		init(){
		
			// document.documentElement.scrollTop =1;
			// document.body.scrollTop =1;
// 			window.onscroll = ()=>{
// 				let t = document.documentElement.scrollTop||document.body.scrollTop;
// 				if(t==0){
// 					document.documentElement.scrollTop =1;
// 					document.body.scrollTop =1;
// 				}
// 				if(this.topTyped==false){
// 					if(t>188){
// 						this.topTyped=true;
// 					}
// 					
// 				}
// 				if(t<=188){
// 					this.topTyped=false;
// 				}
// 
// 
// 			}
		},
		setNavd(on){
			this.navdOn = on;
			// if(on==0){
			// 	this.setScll(1);
			// 	return
			// }
			this.setScll(1)
			
		},
		
		setScll(top){
			
			if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
			
                document.documentElement.scrollTop = Number(top);
            }
            if (document.body) {// all other Explorers
			
                document.body.scrollTop = Number(top);
				
			}	
			
		
		},
		
	}
}
</script>

<style>
.help_boxd{
	background:rgba(244,246,249,1);
}
.hlepdd{
	min-height: 730px;
}
</style>
