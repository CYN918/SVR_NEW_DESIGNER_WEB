<template>
	<div class="banner">
		<div class="banner1">
			<img v-for="(el,index) in list" @click="opend(el.jump_url,index)" :class="backcls(index)" :src="el.banner_pic" alt="">
		</div>
		<div class="banner_nav1">
			<span v-for="(el,index) in list" @click="checkBan(index)" :class="[on==index?'action':'']"></span>
		</div>
		<div v-if="list.length>1" class="bannerBtn">
			<div class="banner_jt pend banner_jt1" @click="checkBan1()"></div>
			<div class="banner_jt pend banner_jt2" @click="checkBan2()"></div>
		</div>
		<div class="banner_propaganda">
			<ul>
				<li @click="go_p()">
					<img :src="imgSig+'newHome/project_rukou.svg'" alt=""/>
					<button class="undertake">承接项目</button>
				</li>
				<li class="banner_propaganda_t"  @click="go_show()">
					<img :src="imgSig+'newHome/show_laidian.svg'" alt=""/>
					<button class="making">开始制作来电秀</button>
				</li>
			</ul>
		</div>
		<loginDialog ref="logindialog" :config="outc"></loginDialog>
		<component v-bind:is="tancD.zj" v-model="tancD" ref="tanbox"></component>
	</div>
</template>
<script>
import loginDialog from '../components/loginDialog'
import home_tc from './home_tc';
export default {
	components:{loginDialog,home_tc},
	name: 'banner',
	data(){
		return {
			tancD:{
				// zj:'home_tc'
				zj:''
			},
			list:[],
			on:0,
			jsan:'',


			nexOn:0,
			outc:{
				num:'',
				scroll:2,
			}
		}
	},
	mounted: function () {	
		this.getBanner();		
	}, 
	methods: {
		backcls(inx){
			if(inx==this.on){
				return 'action'
			}
			if(this.nexOn!=this.on && inx==this.nexOn){
				return 'actionno';
			}
			return '';
		},
		opend(url,on){
			this.bdtj('首页','banner'+(on+1),'--');
			if(!url){
				return
			}
			window.open(url);
		},
		getBanner(){
			this.api.getBanner().then((da)=>{
				if(da=='error' || da=='104'){return}
				this.list = da;	
				this.setAn();
			});			
		},
		setAn(){
			clearTimeout(this.jsan);
		
			this.jsan = setTimeout(()=>{
				this.checkBan2();
			},5000);
		},
		checkBan(on){
			if(this.on==on){
				return
			}
			this.setAn();
			this.nexOn = this.on;
			this.on = on;
		},
		checkBan1(){
			this.setAn();
			this.nexOn = this.on;
			if(this.on>0){
				this.on--;
				return
			}
			this.on = this.list.length-1;
		},
		checkBan2(){
			this.setAn();
			this.nexOn = this.on;
			if(this.on<this.list.length-1){
			
				this.on++;				
				return
			}
			
			this.on = 0;
		},
		go_p(){
			this.bdtj('首页','承接项目','--');
			this.$router.push({path:'/project'});	
		},
		go_show(){
			if(!window.userInfo){
				this.$refs.logindialog.show();
				this.outc.num = 1;
				return
			}
			this.bdtj('首页','开始制作来电秀','--');
			this.$router.push({path:'/toluser'});
			// if(window.userInfo.contributor_format_status == 2){
			// 	
			// 	return
			// }
			// this.$message({
			// 	message:'请先认证'
			// })
			// setTimeout(()=>{
			// 	this.$router.push({path: '/setPersonal'})
			// }, 1000);
				
		}
		
	}
}
</script>

<style>
.banner{
	position: relative;
	background: #FFFFFF;
	overflow: hidden;
	/* padding-bottom: 31.25%; */
	width: 100%;
	height: 719px;
}
.bannerBtn{
	position: absolute;
	top: 25%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	width: 1300px;
	height: 0;
}
.banner_jt{
	position: absolute;
	top: 0;
	width: 48px;
	height: 48px;
	opacity: 0.2;
	background: #000000;
	border-radius: 50%;
}
.banner_jt:after{
    content: "";
    position: absolute;
	
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border: 2px solid #fff;
    border-right: 0;
    border-bottom: 0;
    -webkit-transform: translate(-35%,-50%) rotate(-45deg);
    transform: translate(-35%,-50%) rotate(-45deg);
}
.banner_jt1{	
    left:3.6%;
}
.banner_jt2{	
    right: 3.6%;
    -webkit-transform: rotate(180deg);
	transform: rotate(180deg);
}
.banner_nav1{
	position: absolute;
	bottom: 365px;
	width: 100%;
	text-align: center;
}
.banner_nav1>span{
	display: inline-block;
	width: 16px;
	height: 4px;	
	background: #D8D8D8;
	border-radius: 4px;
	margin-right: 8px;
}
.banner_nav1>span:last-child{
	margin-right: 0;
}
.banner_nav1>span.action{
	width: 24px;
	background: #fff;
}
.banner_nav1>span:hover{
	cursor: pointer;
}

.banner1{
	position: relative;
	width: 1300px;
	height: 356px;
	margin-left: auto;
	margin-right: auto;
	margin-top: 20px;
}
.banner1>img{
	cursor: pointer;
	opacity: 0;
	width: 100%;
	max-height: 356px;
	position: absolute;
	top: 0;
	left: 0;
	display: none;
	border-radius: 5px;
}
.banner1>img.action{

	-webkit-animation: jxd 2s forwards;
	animation: jxd 2s forwards;
	display: block;

}
.banner1>img.actionno{
	z-index: 10;
	pointer-events: none;
	-webkit-animation: jxd2 2s forwards;
	animation: jxd2 2s forwards;
	display: block;
}
.banner_propaganda{
	width: 1300px;
	height: 234px;
	margin-left: auto;
	margin-right: auto;
	margin-top: 20px;
}
.banner_propaganda > ul > li{
	width: 640px;
	height: 234px;
	float: left;
	position: relative;
}
.banner_propaganda > ul .banner_propaganda_t{
	margin-left: 20px;
}
.banner_propaganda > ul > li > button{
	outline: none;
	border: none;
	position: absolute;
	left: 24px;
	top: 172px;
	cursor: pointer;
}
.banner_propaganda > ul > li .undertake{
	width: 88px;
	height: 38px;
	text-align: center;
	line-height: 38px;
	background: #A53030;
	color: #FFFFFF;
	font-size: 14px;
	border-radius: 5px;
}
.banner_propaganda > ul > li .making{
	width: 130px;
	height: 38px;
	text-align: center;
	line-height: 38px;
	background: #1950b2;
	color: #FFFFFF;
	font-size: 14px;
	border-radius: 5px;
}
@-webkit-keyframes jxd{
	from {opacity: 0}
	to{opacity: 1}
}
@keyframes jxd{
	from {opacity: 0}
	to{opacity: 1}	
}
@-webkit-keyframes jxd2{
	from {opacity: 1;visibility: visible;}
	to{opacity: 0;visibility: hidden;}
}
@keyframes jxd2{
	from {opacity: 1;visibility: visible;}
	to{opacity: 0;visibility: hidden;}	
}
</style>