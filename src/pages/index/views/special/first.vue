<template>
	<div class="special_first">
		<img class="special_first_1" src="/imge/special/first/banner.png" alt="">
		<div class="special_first_btn_1" @click="go1()"></div>
		<div class="special_first_btn_2" @click="go2()"></div>
		<div class="special_first_btn_3" @click="go3(1)"></div>
		<div class="special_first_btn_4" @click="go3(2)"></div>
		<div class="special_first_btn_5" @click="go3(3)"></div>
	</div>
	
</template>
<script>

export default {
	name: 'tip',
	methods: {
		go1(){
			if(!window.userInfo){
				this.$router.push({path: '/login'})	
				return
			}
			
			if(!window.userInfo.is_contributor || window.userInfo.is_contributor==0){
				this.$router.push({path: '/setPersonal'});
				return
			}	
			this.$router.push({path: '/profit'});
			

		},
		go2(){
			if(!window.userInfo){
				this.$router.push({path: '/login'})	
				return
			}
			this.$router.push({path: '/upload'})	
			
		},
		go3(){
			
		},
	}
}
</script>

<style>
.special_first{
	position: relative;
	min-height: 100%;
}
.special_first_1{
	display: block;
	max-width: 100%;
	min-width: 1300px;
}
.special_first_2{
	margin: 0 auto;
	width: 1300px;
}
.special_first_2>div{
	display: inline-block;
	width:310px;
	height:287px;
	background:rgba(255,255,255,1);
	border-radius:20px;
	margin-right: 20px;
	box-shadow: 2px 3px 6px 4px rgba(38, 143, 255, 0.24);
}
.special_first_2>div:last-child{
	margin-right: 0;
}
.special_first_2>div>img{
	display: block;
	margin: 42px auto 32px;
	width: 96px;
	height: 96px;
	
}
.special_first_2>div>div:nth-child(2){
	font-size:18px;
	font-weight:500;
	color:rgba(0,0,0,1);
	line-height:25px;
	margin-bottom: 8px;
}
.special_first_2>div>div:nth-child(3){
	font-size:14px;
	font-weight:400;
	color:rgba(0,0,0,1);
	line-height:20px;
}
.special_first_2>div>div>span{
	color: #FF5121;
}

.special_first_t{
	font-size:68px;
	font-family:PingFangSC-Semibold;
	font-weight:600;
	color:rgba(0,0,0,1);
	line-height:95px;
	margin-bottom: 14px;
}
.special_first_c{
	font-size:16px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgb(133, 136, 138);
	line-height:22px;
}
.special_first_c>span{
	color: #FF5121;
}
.special_first_btn_1{
    position: absolute;
    top: 63.6%;
    left: 38%;
    width: 6.5%;
    padding: 2%;
	cursor: pointer;
}
.special_first_btn_2{
    position: absolute;
    top: 63.6%;
    left: 51.5%;
    width: 6.5%;
    padding: 2%;
	cursor: pointer;
}
.special_first_btn_3{
    position: absolute;
    bottom: 6.4%;
    left: 16.2%;
    width: 9.5%;
    padding: 6%;

}
.special_first_btn_4{
    position: absolute;
    bottom: 6.4%;
    left: 39.2%;
    width: 9.5%;
    padding: 6%;

}
.special_first_btn_5{
    position: absolute;
    bottom: 6.4%;
    left: 62.2%;
    width: 9.5%;
    padding: 6%;

}
</style>