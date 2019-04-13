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
	margin: 0 auto;
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
	font-family: 'PingFangSC-Medium','Avenir', Helvetica, Arial, sans-serif;
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
.cropper-view-box[data-v-6dae58fd]{
	
	outline-color: #FF5121 !important;
    outline-color: rgba(51, 153, 255, 0.75);
}
.crop-point[data-v-6dae58fd]{
	background: #FF5121 !important;
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
    border-radius: 5px;
	overflow: hidden;
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
	cursor: pointer;
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
.i_listd1x1{
	width: 309.8px;
	height: 231.9px;
	overflow: hidden
}
.i_listd1{
	display: block;
	width: 309.8px;
	height: 231.9px;
	-webkit-transition: -webkit-transform .25s linear;
	transition: transform .25s linear;
}
.i_listd1:hover{
	
	-webkit-transform: scale(1.4);
	transform: scale(1.4);
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
	cursor: pointer;
	display: block;
	width: 100%;
	height: 100%;
}
.i_listd2_3>div{
	float: right;
}
.i_listd2_3>div>span{
	margin-right: 24.5px;
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

.wsj{
	display: block;
	margin: 0 auto;
}

.citysbos3_1{border-bottom: 1px solid transparent!important;}
.myInput .el-select{text-align: left;display: inline-block;width: auto}
.el-select-dropdown__item.selected{
	color: #FF5121;
}
.inptud{
	width: 100%;
	height: 40px;
	margin-bottom: 22px;
}
.myInput{
	position: relative;
	display: flex;
    width: 100%;
    border-bottom: 1px solid #ddd;

    line-height: 39px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.myInput input{
	border: none;
	outline: none;
	box-sizing: border-box;
    padding-left: 0 ;
    height: 40px;
    flex: 1;
}
.myInput .inputType1{
	padding: 0 47px 0 15px;	
}
.errd>.myInput{
	border-color:#F56C6C;
}
.onIn>.myInput{
	border-color: #409EFF;
}
/*.onIn{
	
}
.sussd{
	
}
.errd{
	
}*/
.inptud .tip{
	color: #F56C6C;
    font-size: 12px;
    line-height: 27px;
    text-align: left;
  
}
.lgoin_s2{
	position: relative;
	width:0;
	margin:  0 29px;
}
.lgoin_s2:after {
    content: "";
    position: absolute;
    top: 10px;
    left: 0;
    width: 1px;
    height: 20px;
    background: #EEEEEE;
}


.inptud>.tip>span{
	position: relative;
	display: inline-block;
	height: 4px;
	background: #F5F5F5;
	border-radius: 2.5px;
	margin-left: 11px;
	vertical-align: middle;
}
.inptud>.tip>span:after{
	content: "";
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	background: #FF0000;
	border-radius: 2.5px;
}
.errd2>.tip>span{	
	width: 120px;
}
.errd3>.tip{
	color: #FF9A00;
}
.errd2>.tip>span:after{	
	width: 40px;	
}
.errd2>.myInput{
	border-color:#F56C6C;
}
.errd3>.myInput{
	color: #FF9A00;
}
.errd3>.tip{
	color: #FF9A00;
}
.errd3>.tip>span{	
	width: 120px;
}
.errd3>.tip>span:after{	
	width: 80px;
	background: #FF9A00;
}
.errd4>.tip{
	color: #51C514;
}
.errd4>.myInput{
	color: #51C514;
}
.errd4>.tip>span{	
	width: 120px;
}
.errd4>.tip>span:after{	
	width: 120px;	
	background: #51C514;
}
.errd5>.myInput{
	color: #F56C6C;
}
.loginBox{
	position: relative;
	width: 100%;
	overflow-x: hidden
	
}

.logindboxd{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
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
	width: auto;
	
}
.lgoin_s2{
	
	/* width: 61% !important; */
	
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
	margin-top: 21.5px;
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
    width: 70px;
	line-height: 40px;
    vertical-align: middle;
    color: #FF5121;
    font-size: 14px;
    text-align: right;
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
.phoshc{
	position: fixed;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index:22;
}
.phoshc1{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.1);
}
.phoshc2{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	width: 860px;
	height: 460px;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.2);
	border-radius: 10px;
	padding: 20px;
	box-sizing: border-box;
}
.phoshc3{
	width: 560px;
	height: 382px;
	display: inline-block;
	background: rgba(0,0,0,.4);
}
.phoshc4{
	display: inline-block;
	width: 250px;
	vertical-align: top;
}
.phoshc4_1{
	width: 150px;
	height: 150px;
	border-radius: 50%;
	overflow: hidden;
	background: rgba(0, 0, 0, 0.5);
	margin: 0 auto;
}
.phoshc4_1>img{
	display: block;
	width: 100%;
}
.phoshc4_2{
	font-size: 14px;
	color: #333333;
	opacity: .7;
	margin: 16px auto 150px;
}
.phoshc4_3{
	text-align: left;
}
.phoshc4_3>div{
	display: inline-block;
	border: 1px solid #979797;
	border-radius: 25.5px;
	width: 107px;
	height: 42.8px;
	line-height: 42.8px;
	text-align: center;
	font-size: 16px;
	color: #333333;
	margin-left: 16px;
}
.phoshc4_3>div:last-child{
	background: #353232;
	color: #FFFFFF;	
}
.phoshc4_3>div:hover{
	opacity: .7;
	cursor: pointer;
}
.vue-cropper[data-v-6dae58fd]{
	background: none;
}
.phoshc5_1:hover{
	opacity: .7;
	cursor: pointer;
}
.phoshc5{
	width: 566px;
	text-align: right;
}
.phoshc5_1{
	float: left;
	cursor: pointer;
	display: inline-block;
	position: relative;
	width: 80px;
	height: 28px;
	line-height: 28px;
	text-align: center;
	font-size: 20px;
	color: #333333;
}
.phoshc5_1>#uploads{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	opacity: 0;		
}
.phoshc5_2{
	display: inline-block;
	vertical-align: middle;
}
.phoshc5_2>img{
	display: inline-block;
	width: 28px;
	margin-right: 24px;
}
.phoshc5_2>img:last-child{
	margin-right: 0;
}
.phoshc5_2>img:hover{
	cursor: pointer;
	opacity: .7;
}
.el-input--suffix .el-input__inner{
	padding-left: 0 ;
}
.el-pagination__jump{
	margin-left: 0;
}
.el-pagination__jump>div{
	margin: 0 24px;
}
.el-pagination .el-select .el-input{
	width: 100px;
    margin: 0 24px 0 5px;
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
	margin: 0 16px 0 0;
}
.i_listd2_3x1{
	line-height: 14px
}
.i_listd2_3x1>span>img{
	display: inline-block;
	vertical-align: middle;
	margin-right: 6px;
	
}
</style>
