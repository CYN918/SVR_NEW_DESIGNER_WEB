<template>
	<div class="special_first">
		<img class="special_first_1" src="/imge/special/first/banner1.png" alt="">
		
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
</style>