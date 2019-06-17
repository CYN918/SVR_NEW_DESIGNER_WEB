<template>
	<div class="special_first">
		<img class="special_first_1" src="/imge/special/first/banner.png" alt="">
		<div class="special_first_3">
			<div class="special_first_t"><b>赏金活动</b></div>
			<div class="special_first_c">供稿人可参与平台活动 发挥自我优势 收获高额赏金<br/><span>前100名</span>入驻供稿人初审通过率为<span>100%</span></div>
		</div>
	</div>
	
</template>
<script>

export default {
	name: 'tip',
	methods: {
		godd(){
			
			if(!window.userInfo){
				this.$router.push({path: '/login'});
				return
			}
			this.$router.push({path: '/setPersonal'});
		}
	}
}
</script>

<style>
.special_first{
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
</style>