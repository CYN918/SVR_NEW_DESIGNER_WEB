<template>
	<div>
		<headNav :config="navData" class="cenct_n2" ref="xtop"></headNav>
		<headNav v-if="topTyped" class="cenct_n2 dbxfyS btomShow" :config="navData" ref="xtop"></headNav>
		<div v-if="isJD" class="content">
			<div v-html="comt"></div>
		</div>
		
		<div v-else class="setUserBox">
			<div class="setUserBoxs">
				<div :class="['setUserBoxs_nav',topTyped!=false?'tm_opd':'']">
					<div 
					v-for="(el,index) in navDta" 
					:key="index" 
					:name="el.h"
					@click="setNavd(index)" 
					:class="[index==navdOn?'action':'']">{{el.t}}</div>
					
				</div>
				<div v-if="topTyped==true" class="navDwzc navDwzc4">
					<div :class="['setUserBoxs_nav',topTyped?'fixdon':'']">
						<div v-for="(el,index) in navDta" :key="index" @click="setNavd(index)" :class="[index==navdOn?'action':'']">{{el.t}}</div>
					</div>
				</div>
				
				<div class="setUserBoxs_cent setUserBoxs_centx">
					<div class="scBox suc_1 hlepdd" v-html="comt">
						
					</div>
					
				</div>
			</div>
			
		</div>
		
		
		
	</div>
</template>
<script>
import headNav from '../../components/myHead2';
import { Loading } from 'element-ui';
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
			topTyped:'',
			comt:'',
			isaj:'',
			isJD:'1',
			navdOn:0,
			navDta:[
				{t:'账号相关',h:'[name="1-01"]'},
				{t:'作品相关',h:'[name="2-01"]'},
				{t:'平台推荐相关',h:'[name="3-01"]'},
				{t:'收益与项目相关',h:'[name="4-01"]'},
			],
			list:'',
			loading: '',
		}
	},	
	mounted: function(){
		this.init();
		
	}, 
	methods: {
		goAnchor(a) {
			let anchor = this.$el.querySelector(a);
			if(!anchor){
				setTimeout(()=>{
					this.goAnchor(a);
				},100)
				return
			}
			let ghh = anchor.offsetTop - 80;
			this.mJs.scTop(ghh);
		},
		setNavd(on){
			this.navdOn = on;
			this.goAnchor(this.navDta[on].h);
		},		
		pzData(){
			this.isaj = '';
			if(!window.xsmData){
				this.getXsm();
			}	
			
			this.getPzData();
			
		},
		getHelp(){
			this.$ajax({
				type:'get',
				url:'/js/cs.json'
			}).then((da)=>{
			
				this.list = da.data;
				
			})
		},
		
		
		
		init(){
			this.mJs.scTop(1);		
			
			this.pzData();
			if(this.$route.query.on){
				this.topTyped=1;
			}
		},
		
		reHid(i){
			let on = this.navDta[i];
			if(!on.top){
				let ob = document.querySelector(on.h);
				if(ob){
					on.top = ob.offsetTop;				
				}				
			}
			return on.top?on.top:'';			
		},
		addLsSc(){
			window.onscroll = ()=>{
				let t = document.documentElement.scrollTop||document.body.scrollTop;
				if(t==0){
					this.mJs.scTop(1);
				}
				
				if(this.isJD==1){
					if(t>60 && !this.topTyped){
						this.topTyped=1;
						return
					}
					if(t<=60 && this.topTyped==1){				
						this.topTyped='';
						return
					}
					return
				}
				
				if(!this.topTyped && t>100){
					this.topTyped=1;					
				}
				if(t<=100){
					this.topTyped='';
				}
				
				let on1 = this.reHid(1);
				if(on1 && t<on1-300){
					this.navdOn = 0;
					return
				}
				let on2 = this.reHid(2);
				if(on2 && t<on2-300){
					this.navdOn = 1;
					return
				}
				let on3 = this.reHid(3);
				if(on3 && t<on3-300){
					this.navdOn = 2;
					return
				}
				this.navdOn = 3;


				
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
				if(this.topTyped==1){
					this.mJs.scTop(60);
				}else{
					this.mJs.scTop(1);
				}
			})			
		},
		getPzData(){
			this.loading = Loading.service({target:'.jloadBox', fullscreen: true,background:'rgba(0,0,0,0)' });		
			this.api.documentget({type:this.$route.name}).then((da)=>{
				if(da=="error" || !da.document){this.getMrData();return}
				this.loading.close();
				this.isaj = 1;
				this.comt = da.document;
				
				
				if(this.$route.name == 'help'){
					this.isJD = '';
					let oid = this.$route.query.on;
					if(oid){
						
						setTimeout(()=>{
							this.goAnchor('[name="'+oid+'"]');
						},100);
						return
					}
					
				}else{
					this.isJD = 1;
				}
				this.addLsSc();
			
				
				let t = document.documentElement.scrollTop||document.body.scrollTop;
				if(t>=60){
					this.mJs.scTop(60);
				}else{
					this.mJs.scTop(1);
				}
				
			}).catch(()=>{
				this.getMrData();
			})
		}
	},
	watch: {	
		'$route': function() {
			this.pzData();
		},
	}
}	
</script>

<style>
.content{
	max-width: 1300px;
	margin: 20px auto 40px;
    text-align: left;
    min-height: 666px;
   	padding: 40px;
    background: #fff;
    box-sizing: border-box;
}
.content p{
	margin: 20px auto;
}
.dbxfyS{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background: #fff;

}
.help_boxd{
	background:rgba(244,246,249,1);
}
.hlepdd{
	min-height: 730px;
}


.navDwzc4{
	top: 100px;
}
.tm_opd{
	opacity: 0;
}
.cenct_n2 .setHeadBox_3{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	text-align: center;
}
</style>
