<template>
	<div class="wk_a" @mouseover="tipStar" @mousemove="setZb" @mouseout="tipClser">
		<div class="wk_a_1">
			<div @click="openxq()" class="wk_a_1_1" :style="backBn(el.face_pic)"></div>
		</div>
		<div class="wk_a_2">
			<div class="wk_a_2_1">
				<span class="hft">{{el.work_name}}</span>
				<img v-if="el.is_recommend==1" src="/imge/new/works/icon_r.svg" />
			</div>
			<div class="wk_a_2_2">
				<span>{{el.classify_1_name}}</span>{{el.classify_2_name+'-'+el.classify_3_name}}
			</div>
			<div class="wk_a_2_3">
				<span v-for="(eld,index) in icons" :key="index" class="pend"><img :src="eld.i">{{el[eld.n]}}</span>

			</div>
		</div>
		<div class="wk_a_3">
			<div class="wk_a_3_1">
				<img @click="goUser()" :src="el.user_info.avatar+'?x-oss-process=image/resize,w_128'" alt="">
				<span @click="goUser()" class="hft">{{el.user_info.username}}</span>
				<div class="wk_a_3_2">{{mJs.getTimes(el.create_time)}}</div>
				<userTc v-if="el.work_id" :tcData="el" :tjData="tjData"></userTc>
			</div>		
			
		</div>
		<div class="Ttip hft" :style="showtIP">{{el.work_name}}</div>
	</div>

</template>

<script>

import userTc from './userTc';
export default {
	components:{userTc},
	props:{
		el:{
			type:Object,
			default:{}
		},
		tjData:Array
	},
	data(){
		return{
			shareData:{},
			icons:[
				{i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/see/zs_icon_gk.svg',n:'view_num'},
				{i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/see/zs_icon_dz.svg',n:'like_num'},
				{i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/see/zs_icon_xx.svg',n:'comment_num'},
				
			],
			showtIP:'',
			showtIPOb:'',
			tipX:0,
			tipY:0,
		}
	},
	methods: {	
		setZb(e){
		
			this.tipY = e.offsetY;
			this.tipX = e.offsetX;
		},
		tipStar(e){
			clearTimeout(this.showtIPOb);
			this.showtIPOb = setTimeout(()=>{
				this.showtIP = 'display: block;top: '+(this.tipY-20)+'px;left: '+this.tipX+'px;';
			},1000);
		},
		tipClser(e){
			clearTimeout(this.showtIPOb);
			this.showtIP = '';
		},
		goUser(on){
			if(this.tjData && this.tjData[1]){
				this.tongj(this.tjData[1]);
			}
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
			this.$router.push({path: '/works',query:{id:this.el.user_info.open_id}})
			
		},
		tongj(a){
			if(!a){return}
			this.bdtj(a[0],a[1],'--');
		},
		backtime(time){		
			return	window.getTimes(time);
		},
		backName(n){
			let a = n;
			if(a.length>6){
				a = a.slice(0,6)+'...';
			}
			return a;
		},
		openxq(){
			if(this.tjData && this.tjData[0]){
				this.tongj(this.tjData[0]);
			}
			
			window.open('#/cont?id='+this.el.work_id)
		},
		backBn(ur){			
			if(!ur || ur==null || ur==undefined || ur=='null' || ur=='undefined'){
				return 'background-image: url(/imge/new/com/no_img.svg);background-size:70%;';
			}
			return 'background-image: url('+ur+'?x-oss-process=image/resize,w_307);';
		},

	}
}
</script>

<style>
.wk_a{
	position: relative;
	text-align: left;
	display: inline-block;
	vertical-align: top;
	width:310px;
	height:373px;
	background:rgba(255,255,255,1);
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	border: 1px solid #f6f6f6;
	border-radius:5px;
	margin: 0 20px 20px 0;
}
.wk_a_1{
	overflow: hidden;
	border-radius: 5px 5px 0 0;
	margin-bottom: 10px;
	width: 100%;
	height: 232px;	
}
.wk_a_1_1{
	cursor: pointer;
	width: 100%;
	height: 232px;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50%,50%;
	-webkit-transition: transform .1s linear;
	transition: transform .1s linear,;
	-webkit-transform-origin: center;	
	transform-origin: center;
}
.wk_a_1_1:hover{
	-webkit-transform: scale(1.03);
	transform: scale(1.03);
}	
.wk_a_2{
	margin: 0 15px;
	border-bottom: 1px solid #F4F6F9;
}	
.wk_a_2_1{
	position: relative;
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
	margin-bottom: 7px;
}
.wk_a_2_1>span{
	display: inline-block;
	vertical-align: top;
	width: 250px;
}
.wk_a_2_1>img{
	position: absolute;
	top: 0;
	right: 0;
	width: 10px;
}	
.wk_a_2_2{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:22px;
	margin-bottom: 10px;
}
.wk_a_2_2>span{
	display: inline-block;
	background:rgba(244,246,249,1);
	border-radius:5px;
	margin-right: 5px;
	text-align: center;
	width:40px;
	height:22px;
}
.wk_a_2_3{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
	margin-bottom: 10px;
}
.wk_a_2_3>span{
	display: inline-block;
	vertical-align: top;
	margin-right: 22px;
}
.wk_a_2_3>span>img{
	display: inline-block;
	vertical-align: middle;
	margin-right: 5px;
}
.wk_a_2_3>span:nth-child(1)>img{
    vertical-align: initial;
}
.wk_a_3{
	padding: 10px 15px;
}
.wk_a_3_1{
	position: relative;
	font-size:12px;
	color:rgba(51,51,51,1);
	line-height:24px;
}
.wk_a_3_1>span{
	display: inline-block;
	vertical-align: top;
	width: 180px;
}
.wk_a_3_1>img{
	display: inline-block;
	vertical-align: top;
	border-radius: 50%;
	margin-right: 10px;
	width: 24px;
	height: 24px;
}
.wk_a_3_2{
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
}

.Ttip{
	z-index: 1000;
	display: none;
    position: absolute;
    padding: 1px 8px;
    background: rgba(0,0,0,.5);
    color: #fff;
    border-radius: 3px;
    font-size: 12px;
    color: rgba(255,255,255,1);
    line-height: 20px;
	
}

</style>
