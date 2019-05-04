<template>
	<div class="searchHaed">
		<div class="sea_1">
			<span @click="goto('searchWorks')" :class="['sea_2',onNav==1?'sea_on':'']">作品</span>
			<span @click="goto('searchUser')" :class="[onNav==2?'sea_on':'']">创作者</span>
			<div class="sea_4"></div>
		</div>
	</div>
</template>

<script>
export default {

	name: 'home',
	data(){
		return{
			
		}
	},
	methods: {
		goto(on){
			this.$router.push({path:on})	
		},
	},	
	props:{
		onNav:{
			String,
			default:1
		}
	},
	
}
</script>

<style>
.searchHaed{
	background: #FFFFFF;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
	margin-bottom: 20px;
	width: 100%;
	height: 80px;
}
.sea_1{
	margin: 0 auto;
	width: 1300px;
	text-align: left;
	font-size: 16px;
	color: #1E1E1E;
	line-height: 80px;
}
.sea_1>span{
	position: relative;
	display: inline-block;
}
.sea_2{
	margin-right: 64px;
}
.sea_on{
	color: #FF5121;
}
.sea_on:after{
	position: absolute;
	content: "";
	bottom: 0;
	left: 50%;
	-webkit-transform: translate(-50%,10%);
	transform: translate(-50%,10%);
	background: #FF5121;
	width: 80%;
	height: 2px;
}
</style>