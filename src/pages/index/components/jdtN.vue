<template>
	<div class="jdt_boxd_1">
		<div class="jdt_1_1">
			<div class="circleProgress_wrapper">
				<div class="wrapper right">
					<div class="circleProgress rightcircle" :style="{transform:'rotate('+backLift(value)+'deg)'}"></div>
				</div>
				<div class="wrapper left">
					<div class="circleProgress leftcircle" :style="{transform:'rotate('+backRigh(value)+'deg)'}"></div>
				</div>								
			</div>
			<div class="jdt_1_1">{{value+'%'}}</div>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		value:{
			type:Number,
			default:0
		}
	},
	methods: {
		backRigh(on){
			if(on<=50){
				return 225;
			}
			if(on>100){
				return 405;
			}
			return 45+on*3.6;
		},
		backLift(on){
			if(on>50){
				return 405;
			}
			if(on<0){
				return 225;
			}
			return 225+on*3.6;
		},
	}
}	
</script>

<style>
.jdt_boxd_1{
	position: absolute;
	top: 0;
	left: 0;
	background: rgb(243, 243, 243);
	width: 100%;
	height: 100%;
}

.jdt_1_1{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
}
.circleProgress_wrapper{
   	width: 60px;
    height: 60px;
    margin: 0 auto;
    position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	border-radius: 50%;
}
.wrapper{
    width: 50%;
    height: 100%;
    position: absolute;
    top:0;
    overflow: hidden;
}
.right{
    right:0;
}
.left{
    left:0;
}
.circleProgress{
    width: 54px;
    height:54px;
    border:3px solid #E6E6E6;
    border-radius: 50%;
    position: absolute;
    top:0;
    -webkit-transform: rotate(225deg);
	transform: rotate(225deg);
}
.rightcircle{
    border-top:3px solid #33B3FF;
    border-right:3px solid #33B3FF;
    right:0;
	-webkit-transition: -webkit-transform .1s linear;
	transition: transform .1s linear;
}
.leftcircle{
    border-bottom:3px solid #33B3FF;
    border-left:3px solid #33B3FF;
    left:0;
	-webkit-transition: -webkit-transform .1s linear;
	transition: transform .1s linear;
} 
</style>
