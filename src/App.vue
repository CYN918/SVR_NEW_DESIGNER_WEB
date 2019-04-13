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
	
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
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
	vertical-align: bottom;
	margin-right: 6px;
	width: 15px;
	
}
.atren{
	font-size: 14px;
	color: #FF5121;
	margin-right: 20px;
}
.seed{
	padding-bottom: 120px;
}
.seed1box{
	min-width: 1300px;
	height: 128px;
	background: #FFFFFF;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);	
	margin-bottom: 20px;
	
}
.seed1{
	width: 1300px;
	margin: 0 auto;
	
	text-align: left;
}
.seed1_1{
	padding-top: 15px;
	font-size: 24px;
	color: #1E1E1E;
	margin-bottom: 12px;
}
.seed1_2{
	font-size: 14px;
	color: #666666;
	margin-bottom: 13px;
	text-align: left;
}
.seed1_2_1{
	
	padding-top: 8px;
}

.seed1_2_2,.seed1_2_3{
	display: inline-block;
	font-size: 14px;
	color: #999999;
	margin-right: 48px;
}
.seed1_2_2>span,.seed1_2_3>span{
	margin-right: 13px;
}
.seed1_2_4{
	margin-right: 20px;
}
.seed1_2_5,.seed1_2_4{
	cursor: pointer;
	display: inline-block;
	border: 1px solid #979797;
	border-radius: 5px;
	box-sizing: border-box;
	width: 140px;
	height: 38px;
	text-align: center;
	line-height: 38px;
	font-size: 14px;
	color: #1E1E1E;
	box-sizing: border-box;
}
.seed1_2_5>span,.seed1_2_4>span{
	margin-right: 6px;
}
.seed1_2_5{
	margin-right: 0px;
}
.seed1_3{
	font-size: 14px;
	color: #666666;
}
.seed1_3_1{
	display: inline-block;
	position: relative;
	vertical-align: middle;
	margin-left: 45px;
	cursor: pointer;
}
.seed1_3_1>div{
	display: none;
	position: absolute;
    left: 0;
    bottom: 0;
    -webkit-transform: translate(-50%,115%);
    transform: translate(-24%,115%);
    padding: 8px 12px;
    font-size: 12px;
    color: #FFFFFF;
    background: #323232;
    border-radius: 6px;
}
.seed1_3_1>div>div{
	white-space: nowrap;
}
.seed1_3_1>div:before{
	display: none;
	content: "";
    content: "";
    position: absolute;
    top: -3px;
    left: 25%;
    width: 6px;
    height: 6px;
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    z-index: 9;
    background: #323232;
}
.seed1_3_1:hover>div:before{
	display: block;
}
.seed1_3_1:hover>div{
	display: block;
}
.seed2{
	width: 1300px;
	margin: 0 auto;
	
}
.seed2_1_1_1x>p{
	margin-bottom: 30px;
}
.seed2>.seed2_2,.seed2>.seed2_1>div{
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;

}

.seed2_1>div:first-child{
	
	padding: 40px;
	margin-bottom: 20px;
}
.seed2_1{
	display: inline-block;
	width: 950px;
	vertical-align: top;
}
.seed2_2{
	display: inline-block;
	width: 330px;
	margin-left: 20px;
	box-sizing: border-box;
	
}
.seed2_1_2{
	padding: 40px;
	height: 481px;
    overflow: hidden;
	overflow-y: auto;
}
.seed2_1_2::-webkit-scrollbar {
    width: 6px;     
    height: 1px;
}
.seed2_1_2::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;
}
.seed2_1_2::-webkit-scrollbar-track {
    background: none;
}
.seed2_1_1_1{
	margin-bottom: 17px;
}
.seed2_1_1_1>img{
	display: inline-block;
	
	
}
.contavatar{
	width: 100px;
	height: 100px;
	border-radius: 50%;
	margin-right: 10px;
	vertical-align: middle;
}
.seed2_1_1_1>div{
	display: inline-block;
	vertical-align: middle;
	text-align: left;
}
.seed2_1_1_1>div>div:nth-child(1){
	font-size: 16px;
	color: #1E1E1E;
	line-height: 35px;
}
.seed2_1_1_1>div>div:nth-child(2){
	font-size: 12px;
	color: #999999;
	margin-bottom: 14px;
}
.seed2_1_1_1>div>div:nth-child(3){
	font-size: 16px;
	color: #1E1E1E;
}
.seed2_2_1_2>div{
	display: inline-block;
	font-size: 12px;
	color: #999999;
	margin-right: 68px;
}
.seed2_2_1_2>div:last-child{
	margin-right: 0;
}
.seed2_2_1_2>div>div{
	margin-top: 7px;
	font-size: 16px;
	color: #1E1E1E;
}
.seed2_2_1_2{
	margin-bottom: 16px;
}
.seed2_1_1_3>div>span{
	cursor: pointer;
	display: inline-block;
	border: 1px solid #979797;
	border-radius: 5px;
	box-sizing: border-box;
	width: 120px;
	height: 40px;
	text-align: center;
	line-height: 40px;
}
.seed2_1_1_3>div>span:hover{
	opacity: .7;
}
.seed2_1_1_3>div>span:first-child{
	background: #FF5121;
	border-color: #FF5121;
	color: #fff;
	margin-right: 20px;
}
.seed2_2>div{
	border-bottom: 1px solid #E6E6E6;
	padding: 41px 30px;
}
.seed2_1_2_1{
	font-size: 16px;
	color: #FF5121;
	margin-bottom: 18px;
}
.seed2_1_2_2{
	background: #F6F6F6;
	border-radius: 5.08px;
	width: 270px;
	margin: 0 auto;
	text-align: left;
}
.seed2_1_2_2>img{
	display: block;
	width: 100%;
	height: 201px;
}
.seed2_1_2_2{
	cursor: pointer;
	margin-bottom: 40px;
}
.seed2_1_2_2:hover{
	opacity: .7;
}
.seed2_1_1_2{
	text-align: left;
}
.seed2_1_1_2>span{
	display: inline-block;
	padding: 2px 5px;
	border: 1px solid #999999;
	border-radius: 5px;
	font-size: 14px;
	color: #999999;
	margin-right: 12px;
}
.seed2_1_1_2>span:first-child{
	margin-left: 18px;
}
.seed2_1_1_2>span.iconfont{
	border: none;
	margin-left: 17px;
	margin-top: 12px;
	float: right;
}
.seed2_1_1_2>div{
	cursor: pointer;
	background: #E6E6E6;
	border-radius: 5px;
	font-size: 14px;
	color: #666666;
	text-align: center;
	line-height: 40px;
	width: 216px;
	height: 40px;

	float: right;
}
.seed2_1_2_1>div{
	position: relative;
	display: inline-block;
	width: 690px;
	height: 40px;
	line-height: 40px;
	text-align: left;
	background: #E6E6E6;
	border-radius: 5px;
	box-sizing: border-box;
	padding: 0 20px;
	font-size: 14px;
	color: #666666;
	
}
.seed2_1_2_1>div>span{
	float: right;
}
.seed2_1_2_1>span{
	cursor: pointer;
	vertical-align: top;
	display: inline-block;
	background: #666666;
	border-radius: 5px;
	width: 160px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	font-size: 14px;
	color: #FFFFFF;
	margin-left: 20px;
}
.seed2_1_2_1 .myInput{
	border:none;
}
.seed2_1_2_1 .myInput input{
	background:none;
}
.seed2_1_2_1 .inptud{
	margin-bottom:0;
}
.pl_01,.pl_02{
	width: 871px;
	margin: 0 auto;
	text-align: left;
}
.pl_01{
	border-top: 1px solid #E6E6E6;
	padding-top: 26px;
	font-size: 14px;
	color: #666666;
	margin-bottom: 7px;
}
.pl_02_1>img{
	display: inline-block;
	width: 44px;
	height: 44px;
	border-radius: 50%;
	margin-right: 15px;
	border-radius: 50%;
}
.pl_02_1>div:nth-child(2){
	display: inline-block;
	font-size: 14px;
	color: #1E1E1E;
	vertical-align: top;

	max-width: 100%;
    word-break: break-all;

    line-height: 21px;
}
.pl_02_1>div:nth-child(2)>span:nth-child(1){
	display: inline-block;
	margin-right: 44px;
	margin-bottom: 12px;
}
.pl_02_1>div:nth-child(2)>span:nth-child(2){
	display: inline-block;
	font-size: 14px;
	color: #999999;
	margin-right: 44px;
}
.pl_02_1>div:nth-child(2)>span:nth-child(3){
	display: inline-block;
	position: relative;
	color: #999;
}
.hfdZ_1{
	
}

.pl_02_1>div:nth-child(2)>span:nth-child(4){
	display: block;
	font-size: 14px;
	color: #333333;
	
}

.seed2_1_1_1x img{
	max-width: 100% !important;
	height: auto !important;
}
.pl_02_1>div:nth-child(3){
	margin-top: 31px;
	font-size: 14px;
	color: #1E1E1E;
}
.hfdZ_3{
	margin-right: 32px;
	margin-left: 60px;
	cursor: pointer;
}
.hfdZ_3:hover{
	opacity: .7;
}
.hfdZ_4{
	display: inline-block;
}
.hfdZ_4:after{
content: "";
    display: inline-block;
    width: 8.5px;
    height: 8.5px;
    border: 1px solid #979797;
    border-top: 0;
    border-right: 0;
    margin-left: 15px;
	-webkit-transform: rotate(-45deg) translateY(-5px);
	transform: rotate(-45deg) translateY(-5px);    
    -webkit-transform-origin: 25%;
    transform-origin: 50% 50%;
	
}
.hfdZ_4.ishowfud:after{
	-bwekit-transform: rotate(136deg) translateY(0px) translateX(3px);
	transform: rotate(136deg) translateY(0px) translateX(3px);
}
.hfdZ_1{
	float: right;
	font-size: 14px;
	color: #999999;
	margin-right: 60px;
	
}
.pl_02_1xxc .hfdZ_1{
	margin-right: 0;
}

.hfdZ_1>span{
	margin-right: 12px;
	
}
.hfdZ_2{
    float: right;
    font-size: 17px;
    color: #999999;
    margin: 1px 23px;
	opacity: 0;
}
.pl_02_1:hover .hfdZ_2{
	opacity: 1;
}
.pl_02_1{
	border-bottom: 1px solid #E6E6E6;
	padding: 20px 0;
}
.hfBox{
	display: flex;
	width: 100%;
	margin: 17px auto 0;
}
.hfBox .tip{
	display: none;
}
.hfBox .nubMax{
	display: none;
}
.hfBox .userBoxd2{
	flex: 1;
	margin-left: 58px;
	margin-bottom: 20px;
	
}
.hfBox .myInput{
	border: 1px solid #979797;
	border-radius: 5px;
	padding: 1px;
}
.hfBox span{
	display: inline-block;
	background: #666666;
	border-radius: 5px;
	width: 102px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 14px;
	color: #fff;
	margin-left: 14px;
}
.pl_02_1xxc{
	width: 86%;
	margin: 29px auto;
} 
.addmpl{
	margin-top: 40px;
}
.myplde{
	margin: 77px auto 38px;
	font-size: 14px;
	color: #666666;
}
.likeis{
	color: red !important;
}
.i_listd1x2{
	width: 269.9px;
	height: 201.5px;
	overflow: hidden;
}
.seed11{
	display: inline-block;
}
.seed12{
	margin-top: 45px;
	float: right;
}
.topNav_x_1{
	position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
    line-height: 80px;
	z-index: 999;
}
.topNav_x_1>.topNav_x_2{
	width: 1300px;
	margin: 0 auto;
	text-align: left;
}
.topNav_x_1_1{
	display: inline-block;
	font-size: 24px;
	color: #1E1E1E;
	line-height: 80px;
}
.topNav_x_1_2{
	float: right;
	line-height: 80px;
}
.seed1_2_3>img{
	vertical-align: bottom;
	display: inline-block;
	width: 17px;
	margin-right: 8px;
}
.seed1_2_2>img{
	vertical-align: bottom;
	display: inline-block;
	width: 17px;
	margin-right: 8px;
}
</style>
