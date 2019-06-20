<template>
	<div>
		<div class="yhtop">
			<div class="yhtop1">用户资料完善</div>
			<div class="yhtop2">
				基本信息设置 
				<!-- <div class="yhtop2Box">
					<span @click="chekNav(0)" :class="['pend',navOn==0?'router-link-active':'']">完善资料</span>
					<span @click="chekNav(1)" :class="['pend',navOn==1?'router-link-active':'']">绑定已有帐号</span>
				</div> -->
			</div>
			<bindData v-if="navOn==0"></bindData>
			<bindUser v-if="navOn==1"></bindUser>	
			
		</div>
		<Footer></Footer>
	</div>	
</template>
<script>
import bindData from './bindData';
import bindUser from './bindUser';
export default {
	name: 'login',
	components:{bindData,bindUser},
	data(){		
		return{	
			navOn:0,		
		}
	},
	mounted: function () {}, 
	methods: {
		chekNav(on){
			this.navOn = on;
		}
		
	},
}
</script>

<style>
#app>div>div.yhtop{
	padding: 0;
	padding-bottom: 70px;
}
.yhtop{
	min-width: 1300px;
}
.yhtop1{
	width: 100%;
	height: 60px;
	font-size: 16px;
	color: #FFFFFF;
	text-align: center;
	line-height: 60px;
	background: #323232;
}
.yhtop2{
	position: relative;
	height: 80px;
	background: #EFEFEF;
	line-height: 80px;
	font-size: 28px;
	color: #333333;
	text-align: left;
	text-indent: 310px;
}
.newUserme{
	box-sizing: border-box;
	height: 742px;
    position: relative;
	margin: 40px auto 40px;
	padding: 65px 110px;
	box-sizing: border-box;
	width: 860px;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
}

.yhtop3 input{
	border: none !important;
	border-radius: 0 !important;
	border-bottom: 1px solid #ddd !important;
	width: 128px;
}
.yhtop3 .el-input{
	display: inline-block; 
	width: auto;
}
.yhtop3 .el-form-item__content{
	text-align: left;
}
.nav_tx{
	text-align: left;
}
.nav_tx>img{
	display: inline-block;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	vertical-align: middle;
	
}
.nav_tx>span{
	display: inline-block;
	width: 68px;
	text-align: justify;
    text-align-last: justify;
	margin-right: 62px;
}
.yhtop3 .el-form-item__content,.nav_tx{
	margin-bottom: 41px;
}
.yhtop4 .el-input__inner{
	width: 349px !important;
}

.yhtop3 .el-form-item__label{
	width: 68px;
	text-align: justify;
    text-align-last: justify;
	margin-right: 62px;
	font-size: 16px;
	color: #333333;
	padding: 0;
}
.yhtop6f{
	position: absolute;
    bottom: 65px;
    left: 0;
	width: 100%;
}
.yhtop6f>div{
	display: inline-block;
	margin: 0 15px;
	width: 200px;
	height: 40px;
	font-size: 16px;
	color: #FFFFFF;
	text-align: center;
	background: #999999;
	line-height: 40px;
	border-radius: 5px;
}

.yhtop5:hover{
	cursor: pointer;
	opacity: .7;
}
.cjBox{
	position: absolute;
	top: 0;
	left: 0;
	width: 200px;
	height: 200px;
}
.nav_tx{
	position: relative;
}
.userBoxd{
	display: flex;
	margin-bottom: 27px;
}
.userBoxd>span{
	display: inline-block;
	vertical-align: middle;
	width: 68px;
	line-height: 40px;
	text-align: justify;
	text-align-last: justify;
	margin-right: 62px;
}
.userBoxd>.itext{
	flex: 1;
}
.userBoxd2.inptud {
    width: 296px;
}
.btnType{
	background: #FF5121;
}
.newUserme_x1{
	width: 350px;
}
.newUserme2{
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	margin: 20px auto -20px;
	box-sizing: border-box;
	padding: 44px 110px;
	width: 860px;
	height: 245px;
}
.newUserme2 .userBoxd{
	margin-bottom: 0;
}
.onusert{
	line-height: 40px;
}
.yhtop2Box{
    display: inline-block;
    text-indent: 0;
    margin-left: 35px;
}
.yhtop2Box>span {
    position: relative;
    display: inline-block;
    font-size: 16px;
    color: #1E1E1E;
	text-indent: 0;
    margin-right: 64px;
}

.yhtop2Box>span.router-link-active {
    color: #FF5121;
}
.yhtop2Box>span.router-link-active:after {
    content: "";
    position: absolute;
    bottom: 5px;
    left: 5%;
    width: 90%;
    height: 2px;
    background: #FF5121;
}
</style>
