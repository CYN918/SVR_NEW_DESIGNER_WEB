<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<style lang="scss">
html,body,div,img,p,ul,li{
	margin: 0;
	padding: 0;
	border: none;
}
html,body{
	min-width: 1300px;
	
}
html{
	height:100%;
}
body{
	position: relative;
	min-height:100%;
}
a{list-style-type: none}
:link{text-decoration:none;}
a:visited{text-decoration:none;}
a:hover{text-decoration:none;}
a:active{text-decoration:none;}
li{list-style-type: none}
@font-face {
	font-family: 'iconfont';
	src: url('/font/iconfont.eot');
	src: url('/font/iconfont.eot?#iefix') format('embedded-opentype'),
	url('/font/iconfont.woff') format('woff'),
	url('/font/iconfont.ttf') format('truetype'),
	url('/font/iconfont.svg#iconfont') format('svg');
}
.iconfont{
	font-family:"iconfont" !important;
	font-size:16px;font-style:normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;

}
.pend{
	cursor: pointer;	
}
.pend:hover{
	opacity: .7;
}
 input::-webkit-input-placeholder{
    color:#c0c4cc;
}
input::-moz-placeholder{   
    color:#c0c4cc;
}
input:-moz-placeholder{ 
   	color:#c0c4cc;
}
input:-ms-input-placeholder{
    color:#c0c4cc;
}
.rideoBox{
	
}
.rideoBox>audio{
	
}

.videoBox{
	
	
}
.videoBox>video{
	width: 100%;
}
.banner{
	position: relative;
	margin: 20px auto;
	width: 1300px;
	height: 328px;
	-webkit-box-shadow: 0 0 8px 0 rgba(0,0,0,.2);
	box-shadow: 0 0 8px 0 rgba(0,0,0,.2);
    border-radius: 8px;
	/* background: red; */
}
.banner_jt{
	position: absolute;
	top: 144px;
	width: 36px;
	height: 36px;
	opacity: 0.2;
	background: #000000;
	border-radius: 5.62px;
}
.banner_jt:after{
    content: "";
    position: absolute;
	
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border: 2px solid #fff;
    border-right: 0;
    border-bottom: 0;
    -webkit-transform: translate(-35%,-50%) rotate(-45deg);
    transform: translate(-35%,-50%) rotate(-45deg);
}
.banner_jt1{	
    left: 44px;
}
.banner_jt2{	
    right: 44px;
    -webkit-transform: rotate(180deg);
	transform: rotate(180deg);
}
.banner_nav1{
	position: absolute;
	bottom: 15px;
	width: 100%;
	text-align: center;
}
.banner_nav1>span{
	width: 8px;
	height: 8px;
	display: inline-block;
	background: #D8D8D8;
	border-radius: 2px;
	margin-right: 5px;
}
.banner_nav1>span:last-child{
	margin-right: 0;
}
.banner_nav1>span.action{
	background: #FF5121;
}
.banner_nav1>span:hover{
	cursor: pointer;

}
.i_listd{
	width: 1300px;
	margin: 0 auto;
	text-align: left;
}
.i_listd>li{
	display: inline-block;
	overflow: hidden;
	width: 309.8px;
	height: 312.9px;
	background: #F6F6F6;
	border-radius: 5.08px;
	margin-right: 20.2px;
	margin-bottom: 21.0px;
}
.i_listd>li:nth-child(4n+4){
	margin-right: 0;
}

.banner1{
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100%;
}
.banner1>img{
	display: block;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: none;
}
.banner1>img.action{
	display: block;
}
.i_listd1{
	display: block;
	width: 309.8px;
	height: 231.9px;
}
.i_listd2{
	padding: 5px 10px;
}
.i_listd2_1{
	font-size: 16.25px;
	text-align: left;
	color: #1E1E1E;	
	margin-bottom: 3px;
}
.i_listd2_1>img{
	float: right;
	width: 14px;
	height: 14px;
	margin-top: 3px;
}
.i_listd2_2{
	font-size: 12.19px;
	color: #878787;
	text-align: left;
	margin-bottom: 5px;
}
.i_listd2_3{
	font-size: 12.19px;
	color: #999999;
	text-align: left;
}
.i_listd2_3>div{
	display: inline-block;
}
.i_listd2_2>span:last-child{
	float: right;
	
}
.i_listd2_3>span{
	display: inline-block;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	overflow: hidden;
}
.i_listd2_3>span>img{
	display: block;
	width: 100%;
	height: 100%;
}
.i_listd2_3>div{
	float: right;
}
.i_listd2_3>div>span{
	margin-right: 13.9px;
	font-size: 12.19px;
	color: #999999;
}
.i_listd2_3>div>span:last-child{
	margin-right: 0;
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    margin: 0 5px;
    background-color: initial;
    color: #606266;
    min-width: 30px;
    border-radius: 2px;
	border:1px solid #eee;
	
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #FF5121;
    color: #FFF;
	border-color: #FF5121;
}
.i_listd{
	margin-bottom: 62.1px;
}
.pagesddd{
	padding-bottom: 135px;
}
</style>
