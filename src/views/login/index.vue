<template>
	<div class="loginBox">
		<img class="loginBoxbg" src="/imge/lo1.png" alt="">
		<div class="login_1">
			<div class="login_2">
				<router-view/>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
import Footer from '../../components/footer';

export default {
	name: 'login',
	components:{Footer},
	data(){
		return{

		}
	}
}
</script>
<style>
.loginBox{
	position: relative;
	width: 100%;
	overflow-x: hidden;
}
.loginBoxbg{
	display: block;
	width: 1920px;

}

.login_1{
	position: absolute;
	top: 46%;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 480px;
}
.login_2{
	width: 100%;
	box-sizing: border-box;
	padding: 37px 56px;
    border-radius: 8px;
    background: #fff;
}


.login_x1{
    display: block;
    margin: 0 auto 16px;
    width: 178px;
}
.login_x2{
	font-size: 20px;
	color: #666666;
	text-align: center;
	margin-bottom: 51px;
}

.lgoin_s1>.el-input{
	display: inline-block !important;
	width: 140px;
}
.lgoin_s2{
	position: relative;
	/* width: 61% !important; */
	
}
.lgoin_s2:after{
	content: "";
	position: absolute;
	top: 10px;
	left: 0;
	width: 1px;
	height: 20px;
	background: #EEEEEE;
	
}

.login_2 .el-form-item__error{
	text-indent: 17px;
	line-height: 20px;
}
.lgoin_s4{
	margin-top: 17px;
	width: 100%;
	background: #999 !important;
	border-color:#999  !important;
	
}
.lgoin_s4:hover{
	background: #999;
	border-color:#999 ;
}
.lgoin_s4:active{
	background: #999;
	border-color:#999 ;
}
.login_x3{
	margin-bottom: 38px;
}
.login_x3>span{
	display: inline-block;
	width: 50%;
	text-align: center;
	font-size: 16px;
	color: #666666;
	line-height: 40px;
	border-bottom: 1px solid #EEEEEE;
}
.login_x3>span.cheack{
	border-bottom: 2px solid #FF5121;
	color: #FF5121;
}
.lgoin_s5{
	font-size: 18.29px;
	color: #333333;
	text-align: center;
	line-height: 25px;
}
.lgoin_s5>a{
	color: #FF5121 ;
}
.lgoin_s6x{
	height: 65px;
}
.lgoin_s6{
	position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
	line-height: 65px;
	background: #EEE;
}
.lgoin_s6>img{
	display: inline-block;
	width: 36px;
	margin-top: 15px;
	margin-right: 81px;
}
.lgoin_s6>img:hover{
	cursor: pointer;
	-webkit-opacity: .7;
	opacity: .7;
}
.lgoin_s6>img:last-child{
	margin-right: 0;
}
.mad{
	top: 0;
    position: absolute;
    right: 20px;
}
.lgoin_s3x1{
	width: 71%;
}
.lgoin_s3x2{
	position: relative;
    display: inline-block;
    width: 120px;
	line-height: 40px;
    vertical-align: middle;
    color: #FF5121;
    font-size: 14px;
    text-align: center;
    border: none;
    cursor: pointer;
	
}
.lgoin_s3x2:hover{
	opacity: .7;
}

.lgoin_s2zy>span{
	float: left;
}
.lgoin_s2zy>span>input{
	vertical-align: middle;
	width: 16px;
	height: 16px;
	background: #fff;
	border: 1px solid #EEEEEE;
	border-radius: 3.43px;
	margin-right: 10px;
}
.lgoin_s2zy>a{
	float: right;
	color: #FF5121;
}
.lgoin_s2zy>a:hover{
	cursor: pointer;
	opacity: .7;
}
.lgoin_s2zy{
	height: 21px;
}
.btnType{
	background: #FF5121 !important;
	border-color: #FF5121 !important;
}
.wjmm{
	font-size: 30px;
    color: #FF5121;
    margin-bottom: 51px;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
	color: #ff5121;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #ff5121;
    border-color: #ff5121;
}
.el-checkbox__inner:hover {
    border-color: #eee;
}
</style>
