<template>
	<div class="topNavComBox">
		<div class="topNavComBox1">
			<div class="topNavComBox2">{{Data.title}}</div>
			<router-link v-for="(el,index) in Data.rot" :key="index" class="pend" :to="el.to">{{el.n}}</router-link>
		</div>
		
	</div>
</template>

<script>
import topNavCom from './topNavcom'
export default {
	props:{
		Data:Object,
	},

}
	
</script>

<style>
.topNavComBox{
	min-width: 1300px;
	height: 80px;
	background: #FFFFFF;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);	
	margin-bottom: 20px;
}
.topNavComBox1{
	width: 1300px;
	margin: 0 auto;
	text-align: left;
	
}
.topNavComBox2{
	display: inline-block;
	font-size: 24px;
	color: #1E1E1E;
	line-height: 80px;
	margin-right: 124px;
}
.topNavComBox1>a{
	display: inline-block;
	position: relative;
	font-size: 16px;
	line-height: 74px;
	color: #1E1E1E;
	margin-right: 59px;
}
.topNavComBox1>a:after{
	content: "";
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 58px;
	height: 2px;
}
.router-link-active:after{
	background: #FF5121;
}
</style>
