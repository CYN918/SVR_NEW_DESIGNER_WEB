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
	top: 50%;
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

.login_2 input{
	border: none;
    border-bottom: 1px solid;
	border-radius: 0 !important;
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
	width: 61% !important;
	
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
	padding-left: 34px;
	width: 72px;
	height: 38px;
	vertical-align: middle;
    line-height: 20px;
	color: #FF5121;
	
}
.lgoin_s3x2>input{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.lgoin_s3x2>div{
	cursor: pointer;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.lgoin_s3x2>div:hover{
	opacity: .7;
}
.lgoin_s3x2:after{
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 1px;
	height: 20px;
	background: #eee;
}
.errd>input{
	border-color: #F56C6C;
}
.errd5>input{
	border-color: #F56C6C;
}
.padderr{	
	height: 0;
	text-align: left;
	color: #F56C6C;
    font-size: 12px;
	text-indent: 17px;
	line-height: 26px;
}

.padderr>span{
	position: relative;
	display: inline-block;
	height: 4px;
	background: #F5F5F5;
	border-radius: 2.5px;
	margin-left: 11px;
	vertical-align: middle;
}
.padderr>span:after{
	content: "";
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	background: #FF0000;
	border-radius: 2.5px;
}
.errd2>.padderr>span{	
	width: 120px;
}

.errd2>input{
	border-color: #F56C6C;
}
.errd2>.padderr>span:after{	
	width: 40px;	
}
.errd3>.padderr{
	color: #FF9A00;
}
.errd3>input{
	border-color: #FF9A00;
}
.errd3>.padderr>span{	
	width: 120px;
}
.errd3>.padderr>span:after{	
	width: 80px;
	background: #FF9A00;
}
.errd4>input{
	border-color: #51C514;
}
.errd4>.padderr{
	color: #51C514;
}
.errd4>.padderr>span{	
	width: 120px;
}
.errd4>.padderr>span:after{	
	width: 120px;	
	background: #51C514;
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
</style>
