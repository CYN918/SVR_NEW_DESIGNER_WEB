<template>
	<div class="banner">
		<div class="banner1">
			<img v-for="(el,index) in list" @click="opend(el.jump_url,index)" :class="[on==index?'action':'actionno']" :src="el.banner_pic" alt="">
		</div>
		<div class="banner_nav1">
			<span v-for="(el,index) in list" @click="checkBan(index)" :class="[on==index?'action':'']"></span>
		</div>
		<div v-if="list.length>1" class="bannerBtn">
			<div class="banner_jt pend banner_jt1" @click="checkBan1()"></div>
			<div class="banner_jt pend banner_jt2" @click="checkBan2()"></div>
		</div>
		
	</div>
</template>
<script>
export default {
	name: 'banner',
	data(){
		return {
			list:[],
			on:0,
			jsan:'',
			isks:'',
		}
	},
	mounted: function () {	
		this.getBanner();		
	}, 
	methods: {
		opend(url,on){
			this.bdtj('首页','banner'+(on+1),'--');
			if(!url){
				return
			}
			window.open(url);
		},
		getBanner(){
			this.api.getBanner().then((da)=>{
				if(da=='error'){return}
				this.list = da;	
				this.isks = 'aactionno';
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
			this.on = on;
		},
		checkBan1(){
			this.setAn();
			if(this.on>0){
				this.on--;
				return
			}
			this.on = this.list.length-1;
		},
		checkBan2(){
			this.setAn();
			if(this.on<this.list.length-1){
				this.on++;				
				return
			}
			this.on = 0;
		},
		
	}
}
</script>

<style>
.banner{
	position: relative;
	background: #f1f1f1;
	overflow: hidden;
	padding-bottom: 31.25%;
	width: 100%;
}
.bannerBtn{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	width: 100%;
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
    left:100px;
}
.banner_jt2{	
    right: 100px;
    -webkit-transform: rotate(180deg);
	transform: rotate(180deg);
}
.banner_nav1{
	position: absolute;
	bottom: 24px;
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
	width: 100%;
}
.banner1>img{
	cursor: pointer;
	opacity: 0;
	display: block;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: none;
}
.banner1>img.action{
	-webkit-animation: jxd 2s forwards;
	animation: jxd 2s forwards;
	display: block;

}
.banner1>img.actionno{
	pointer-events: none;
	-webkit-animation: jxd2 2s forwards;
	animation: jxd2 2s forwards;
	display: block;
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