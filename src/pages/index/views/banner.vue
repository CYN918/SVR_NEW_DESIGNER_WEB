<template>
	<div class="banner">
		<div class="banner1">
			<img v-for="(el,index) in list" @click="opend(el.jump_url,index)" :class="[on==index?'action':'actionno']" :src="el.banner_pic" alt="">
		</div>
		<div class="banner_nav1">
			<span v-for="(el,index) in list" @click="checkBan(index)" :class="[on==index?'action':'']"></span>
		</div>
		<div class="banner_jt pend banner_jt1" @click="checkBan1()"></div>
		<div class="banner_jt pend banner_jt2" @click="checkBan2()"></div>
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
		}
	},
	mounted: function () {	
		this.getBanner();		
	}, 
	methods: {
		opend(url,on){
			this.bdtj('首页','banner'+(on+1),'--');
			window.open(url);
		},
		getBanner(){
			this.api.getBanner().then((da)=>{
				if(da=='error'){return}
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
	margin: 20px auto;
	width: 1300px;
	height: 328px;
	-webkit-box-shadow: 0 0 8px 0 rgba(0,0,0,.2);
	box-shadow: 0 0 8px 0 rgba(0,0,0,.2);
    border-radius: 5px;
	overflow: hidden;
}
.banner_jt{
	position: absolute;
	top: 144px;
	width: 36px;
	height: 36px;
	opacity: 0.2;
	background: #000000;
	border-radius: 5.62px;
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
    left: 44px;
}
.banner_jt2{	
    right: 44px;
    -webkit-transform: rotate(180deg);
	transform: rotate(180deg);
}
.banner_nav1{
	position: absolute;
	bottom: 15px;
	width: 100%;
	text-align: center;
}
.banner_nav1>span{
	width: 8px;
	height: 8px;
	display: inline-block;
	background: #D8D8D8;
	border-radius: 2px;
	margin-right: 5px;
}
.banner_nav1>span:last-child{
	margin-right: 0;
}
.banner_nav1>span.action{
	background: #FF5121;
}
.banner_nav1>span:hover{
	cursor: pointer;
}

.banner1{
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100%;
}
.banner1>img{
	cursor: pointer;
	opacity: 0;
	display: block;
	width: 100%;
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
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