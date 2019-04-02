<template>
	<div>
		<div class="circleProgress_wrapper">
		    <div class="wrapper right">
		        <div class="circleProgress rightcircle" :style="{transform:'rotate('+leftRo+'deg)'}"></div>
		    </div>
		    <div class="wrapper left">
		        <div class="circleProgress leftcircle" :style="{transform:'rotate('+rightRo+'deg)'}"></div>
		    </div>
			
		</div>
		<div class="loadingsdsd">{{dard.bf+'%'}}</div>
		<div class="qxclos" @click="qxclosd">取消上传</div>
	</div>
</template>

<script>
export default {
	props:['dard','index'],
	data(){
		return{
			leftRo:225,
			rightRo:225,
		}
	},
	methods: {
		qxclosd(){
			this.$parent.qxUpload(this.index); 
			this.dard.xhr.abort();		
		},
		setBfb(on){
			if(on<=50){		
				this.leftRo= 225+on*3.6;
				this.rightRo= 225;
				return
			}
			if(this.leftRo!=405){
				this.leftRo = 405;
			}
			this.rightRo= 225+(on-50)*3.6;		
			if(on=100){
				this.leftRo= 405;
				this.rightRo= 405;	
			}	
		},
		
	},
	watch: {
	    'dard.bf'(val) {
			this.setBfb(val);   		      		      	
	    },
	},
	
	
}
</script>

<style>
.qxclos{
	cursor: pointer;
    font-size: 14px;
    color: #FF5121;
    position: absolute;
    bottom: 15px;
    text-align: center;
    width: 100%;
}
.qxclos:hover{
	opacity: .7;
}
.loadingsdsd{
	position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
	font-size: 14px;
	color: #666666;
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
    border-top:3px solid #FF5121;
    border-right:3px solid #FF5121;
    right:0;
	-webkit-transition: -webkit-transform .1s linear;
	transition: transform .1s linear;
}
.leftcircle{
    border-bottom:3px solid #FF5121;
    border-left:3px solid #FF5121;
    left:0;
	-webkit-transition: -webkit-transform .1s linear;
	transition: transform .1s linear;
}
</style>
