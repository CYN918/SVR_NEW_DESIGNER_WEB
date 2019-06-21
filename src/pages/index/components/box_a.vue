<template>
	<div class="list1_box">
		<div @click="openxq()" class="list1_box_1" :style="backBn(el.face_pic)"></div>		
		<div class="list1_box_3">
			<div @click="openxq()" class="list1_box_3_1"><span :title="el.work_name">{{el.work_name.slice(0,10)}}</span> <img class="svgImgx2" v-if="el.is_recommend==1" src="/imge/svg/zs_icon_tj.svg"/></div>
			<div @click="openxq()" class="list1_box_3_2"><span>{{el.classify_1_name+'-'+el.classify_2_name}}</span><span>{{backtime(el.create_time)}}</span></div>
			<div class="list1_box_3_3">
				<span><img @click="goUser()" :src="el.face_pic" alt=""></span>
				<span @click="goUser()" class="list1_box_3_6">{{backName(el.user_info.username)}}</span>
				<div class="list1_box_3_4" @click="openxq()">
					<span class="pend"><img  class="ImgSvg" src="/imge/svg/see/zs_icon_gk.svg">{{el.view_num}}</span>
					<span class="pend"><img class="ImgSvg tof2d" src="/imge/svg/see/zs_icon_dz.svg">{{el.like_num}}</span>
					<span class="pend"><img class="ImgSvg tof1d" src="/imge/svg/see/zs_icon_xx.svg">{{el.comment_num}}</span>
				</div>
			</div>
		</div>
		<userTc :tcData="el"></userTc>
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
		}
	},
	data(){
		return{
			shareData:{},
		}
	},
	methods: {	
		goUser(on){
			this.$router.push({path: '/works',query:{id:this.el.user_info.open_id}})	
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
		opend(ur){
			if(!ur){return}
			window.open(ur);
		},
		openxq(){
			window.open('#/cont?id='+this.el.work_id)
		},
		backBn(ur){
			return 'background-image: url('+ur+');'
		}
	}
}
</script>

<style>
.ImgSvg{
	display: inline-block;
	vertical-align: middle;
	margin-right: 6px;
  	width: 15px;
}
.list1_box{
	position: relative;
    display: inline-block;
    width: 309.8px;
    height: 312.9px;
    background: #F6F6F6;
    border-radius: 5.08px;
    margin-right: 20.2px;
    margin-bottom: 21.0px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #f6f6f6;
}
.list1_box_1{
	width: 100%;
    height: 231.9px;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
	background-size: cover;
	background-position: 50%,50%;
	
}
.list1_box_2{
	display: block;
    width: 309.8px;
    height: 231.9px;
    -webkit-transition: -webkit-transform .1s linear;
    transition: -webkit-transform .1s linear;
    transition: transform .1s linear;
    transition: transform .1s linear, -webkit-transform .1s linear;
}
.list1_box_2:hover {
	-webkit-transform: scale(1.02);
	transform: scale(1.02);
}
.list1_box_3{
	cursor: pointer;
	padding: 5px 10px;
}
.list1_box_3_1{
  font-size: 14px;
  text-align: left;
  color: #1E1E1E;
  margin-bottom: 3px;
}
.list1_box_3_1>img{
  float: right;
  width: 14px;
  height: 14px;
  margin-top: 3px;
}
.list1_box_3_2{
  font-size: 12px;
  color: #878787;
  text-align: left;
  margin-bottom: 5px;
}
.list1_box_3_3 {
  font-size: 12px;
  color: #999999;
  text-align: left;
}
.list1_box_3_3 > div {
  display: inline-block;
}
.list1_box_3_2 > span:last-child {
  float: right;
}
.list1_box_3_3 > span {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
}

.list1_box_3_3 > span.list1_box_3_6{
	width: auto;
    margin-left: 5px;
    overflow: auto;
    border-radius: 0;
}
.list1_box_3_3 > span > img {
  cursor: pointer;
  display: block;
  width: 100%;
  height: 100%;
}
.list1_box_3_3 > div {
  float: right;
  margin-top: 4px;
}
.list1_box_3_3 > div > span {
  margin-right: 24.5px;
  font-size: 12.19px;
  color: #999999;
}
.list1_box_3_3 > div > span:last-child {
  margin-right: 0;
}



.list1_box_3_4 {
  line-height: 14px;
}
.tof2d{
	margin-top: .-2rem;
}
.tof1d{
	margin-top: -.1rem;
}
</style>
