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
	position: relative;
	margin: 0 auto;
	min-width: 1300px;
	height:100%;
}
a{list-style-type: none}
:link{text-decoration:none;}
a:visited{text-decoration:none;}
a:hover{text-decoration:none;}
a:active{text-decoration:none;}
li{list-style-type: none}
input::-webkit-input-placeholder{color:#c0c4cc;}
input::-moz-placeholder{color:#c0c4cc;}
input:-moz-placeholder{color:#c0c4cc;}
input:-ms-input-placeholder{color:#c0c4cc;}
textarea::-webkit-input-placeholder{color:#c0c4cc;}
textarea::-moz-placeholder{color:#c0c4cc;}
textarea:-moz-placeholder{color:#c0c4cc;}
textarea:-ms-input-placeholder{color:#c0c4cc;}
input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    border: 1px solid #CCC!important;
}

input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {
	-webkit-text-fill-color: #606266 !important;
	-webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
    background-color:transparent;
    background-image: none;
     transition: background-color 50000s ease-in-out 0s;
}
input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill{
	border: none !important;
}
input {
	background-color:transparent;
}
textarea:focus{
	border-color:#979797;
}
.el-textarea__inner:focus{
	border-color:#DCDFE6;
}
.el-checkbox__inner:focus{
	border-color:#DCDFE6 !important;
}
input,textarea{
	outline: none;
}
textarea{
	resize: none;
}
img{
	outline-width: 0px;
	vertical-align: top;
}
@font-face {
	font-family: 'iconfont';
	src: url('https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/font/iconfont.eot');
	src: url('https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/font/iconfont.eot?#iefix') format('embedded-opentype'),
	url('https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/font/iconfont.woff') format('woff'),
	url('https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/font/iconfont.ttf') format('truetype'),
	url('https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/font/iconfont.svg#iconfont') format('svg');
}
.hft{
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.hidIn{
	position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    opacity: 0;
}
.mxImgbg>div{

	background-origin:content;
	background-position:50% 50%;
	background-size:cover; 
	background-repeat:no-repeat; 
}
@keyframes bjs{
	from{background: rgba(255,255,255,0);}
	to{background: rgba(255,255,255,1)}
}
@-webkit-keyframes bjs{
	from{background: rgba(255,255,255,0);}
	to{background: rgba(255,255,255,1)}
}
.iconfont{
	font-family:"iconfont" !important;
	font-size:16px;font-style:normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}
.TitTip:hover .Ttip{
	-webkit-animation: showD 1.2s linear forwards;
	animation: showD 1.2s linear forwards;
}
@-webkit-keyframes showD{
	0{visibility: hidden;opacity: 0;}
	90%{
		visibility: visible;opacity: 0;
	}
	100%{
		visibility: visible;opacity: 1;
	}

}
@keyframes showD{
	0{visibility: hidden;opacity: 0;}
	90%{
		visibility: visible;opacity: 0;
	}
	100%{
		visibility: visible;opacity: 1;
	}
}
#app{
	font-family: 'PingFang SC Regular','Helvetica', 'Arial', 'sans-serif',"microsoft yahei";
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	text-align: center;
	height: 100%;
}
#app>div{
	height: 100%;
}
#app>div>div{
	position: relative;
	box-sizing: border-box;
	min-height: 102%;
	padding: 60px 0 150px;
	background: #F4F6F9;
}
.pend{
	cursor: pointer;	
}
.pend:hover{
	opacity: .7;
}
.tancBox{
	z-index: 10000;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0,0,0,.3);
	
	width: 100%;
	height: 100%;
}
.tanc1{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;
}





.cropper-view-box[data-v-6dae58fd]{	
	outline-color: #33B3FF !important;
    outline-color: rgba(51, 153, 255, 0.75);
}
.crop-point[data-v-6dae58fd]{
	background: #33B3FF !important;
}
.videoBox>video{
	width: 100%;
}

.homeMinheifh{
	min-height: 404px
}
.homeMinheifh>li{
	position: relative;
}

.i_listd1x1{
	width: 100%;
	height: 231.9px;
	border-radius: 5px 5px 0 0;
	overflow: hidden
}
.i_listd1{
	display: block;
	width: 309.8px;
	height: 231.9px;
	-webkit-transition: -webkit-transform .1s linear;
	transition: transform .1s linear;
}
.i_listd1:hover{
	-webkit-transform: scale(1.02);
	transform: scale(1.02);
}
.i_listd2{
	cursor: pointer;
	padding: 5px 10px;
}
.i_listd2_1{
	font-size: 14px;
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
	width: 20px;
	height: 20px;
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
	margin-top: 4px;
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
	width:40px;
	height:40px;
	text-align: center;
	line-height: 40px;
	color:rgba(153,153,153,1);
	background:rgba(255,255,255,1);
	border-radius:5px;
	border:1px solid rgba(187,187,187,1);
	
}
.el-pagination .el-select .el-input .el-input__inner{
	height: 40px;
}
.el-pagination__editor.el-input .el-input__inner{
	height: 40px;
}
.el-pagination__jump{
	color: #999999;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #33B3FF;
    color: #FFF;
	border-color: #33B3FF;
}

.pagesddd{
	position: absolute;
	bottom: 210px;
	left: 0;
	box-sizing: border-box;
	width: 100%;
	text-align: center;
}

.wsj{
	display: block;
	margin: 0 auto;
}

.citysbos3_1{border-bottom: 1px solid transparent!important;}
.myInput .el-select{text-align: left;display: inline-block;width: auto}
.el-select-dropdown__item.selected{
	color: #33B3FF;
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
	color: #bbb;
    line-height: 39px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.myInput input{
	border: none;
	outline: none;
	box-sizing: border-box;
    padding-left: 0 ;
	font-size: 14px;
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
	margin:  0 0 0 19px;
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
	height: 100%;
	overflow-x: hidden
	
}

.login_1{
	position: fixed;
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
    margin: 0 auto 20px;
    width: 191px;
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
	font-size: 16px;
	margin-top: 17px;
	margin-bottom: 22px;
	width: 100%;
	color:rgba(187,187,187,1);
	background: #dfdfdf !important;
	border-color:#dfdfdf  !important;
	
}
.lgoin_s4:hover{
	color:rgba(187,187,187,1);
	background: #dfdfdf;
	border-color:#dfdfdf ;
}
.lgoin_s4:active{
	color:rgba(187,187,187,1);
	background: #dfdfdf;
	border-color:#dfdfdf;
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
	border-bottom: 2px solid #33B3FF;
	color: #33B3FF;
}
.lgoin_s5{
	font-size:16px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:25px;
}
.lgoin_s5>span{
	display: inline-block;
	width: 50%
	
}
.lgoin_s5>a{
	color: #33B3FF;
}
.lgoin_s5>span:nth-child(1){
	text-align: left;
}
.lgoin_s5>span:nth-child(2){
	text-align: right;
}
.lgoin_s5>span>a{
	color: #33B3FF;
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
#edui40_colorlump{
	width: 52%;
	right: 0;
	left: auto;
}
.dsf_qq,.dsf_wb,.dsf_wx{
	display: inline-block;
	vertical-align: top;
	width: 36px;
	height:36px;
	margin: 15px 0 0;
	background-size:100% ;
	
}
.dsf_wx{
	margin: 15px 86px 0;
}
.dsf_qq{
	background:url(/imge/svg/login/qq.svg) no-repeat 0/100%;
}
.dsf_qq:hover{
	background:url(/imge/svg/new/qq.svg) no-repeat 0/100%;
}
.dsf_wb{
	background:url(/imge/svg/login/wb.svg) no-repeat 0 0/100%;
}
.dsf_wb:hover{
	background:url(/imge/svg/new/wb.svg) no-repeat 0 0/100%;
}
.dsf_wx{
	background:url(/imge/svg/login/wx.svg) no-repeat 0 0/100%;
}
.dsf_wx:hover{
	background:url(/imge/svg/new/wx.svg) no-repeat 0 0/100%;
}
.lgoin_s6>img{
	display: inline-block;
	width: 36px;
	margin-top: 15.5px;
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
    width: 110px;
	line-height: 40px;
    vertical-align: middle;
    color: #ff9200;
    font-size: 14px;
    text-align: right;
    border: none;
    cursor: pointer;
	overflow: hidden;
    height: 40px;
	
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
	color: rgba(255, 146, 0, 1);
}
.lgoin_s2zy>a:hover{
	cursor: pointer;
	opacity: .7;
}
.lgoin_s2zy{
	height: 21px;
}
.btnType{
	background: #33B3FF !important;
	color: #fff !important;
	border-color: #33B3FF !important;
}
.wjmm{
	font-size: 30px;
    color: #33B3FF;
    margin-bottom: 51px;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
	color: #33B3FF;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #33B3FF;
    border-color: #33B3FF;
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
	z-index:10001;
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
	border:1px solid #bbb;
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
	text-align:center;
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
	color: #333333;
	text-align: left;
    margin-left: 5px;
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
	margin: 0 16px;
}
.el-pagination .el-select .el-input{
	width: 100px;
    margin: 0 16px 0 0;
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
	color: #33B3FF;
	margin-right: 20px;
}
.seed{
	padding-bottom: 120px;
}
.seed1box{
	position: relative;
	min-width: 1300px;
	height: 128px;
	background: #FFFFFF;
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
	max-width: 733px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
	line-height: 24px;
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
	z-index: 10;
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
	position: relative;
	width: 1300px;
	margin: 0 auto 60px;
	
}
.onIn>.myInput{
	border-color:#ddd;
}

.seed2>.seed2_2,.seed2>.seed2_1>div{
	background: #FFFFFF;
	border-radius: 5px;

}
.qxBm_btns_1{
	margin: 30px 84px;
}
.qxBm_btns{
	border-top: 1px solid rgba(244,246,249,1);
	height: 79px;
	line-height: 79px;
}
.qxBm_btns>div{
	vertical-align: top;
	margin-top: 20px;
}
.qxBm_btns2>.btns{
	margin-top: 18px;
}
.seed2_1>div:first-child{
	
	padding: 40px;
	margin-bottom: 20px;
}
.seed2_2p{
	position: relative;
	display: inline-block;
	width: 330px;
	min-height: 800px;
	margin-left: 20px;
}
.seed2_1{
	position: relative;
	display: inline-block;
	width: 950px;
	vertical-align: top;
}
.seed2_2{
	width: 330px;	
	box-sizing: border-box;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	
	
}
.isfix{
	position: fixed;
	top: 100px;
}
.seed2_1_2{
	padding: 40px;
}
.seed2_1_2::-webkit-scrollbar {
    width: 2px;     
    height: 1px;
}
.seed2_1_2::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 5px rgba(246, 246, 246,.6);
    background: #535353;
}
.seed2_1_2::-webkit-scrollbar-track {
    background: none;
}
.seed2_1_1_1{
	margin-bottom: 17px;
}
.seed2_1_1_1>img{
	display: block;
	margin: 0 auto;
}
.contavatar{
	width: 100px;
	height: 100px;
	border-radius: 50%;
	margin-right: 10px;

}
.seed2_1_1_1>div{
	display: inline-block;
	vertical-align: middle;
	text-align: left;
}
.seed2_1_1_1>div>div:nth-child(1){
	display: block;
	margin: 0 auto;
	width: 160px;
	text-align: center;
	font-size: 16px;
	color: #1E1E1E;
	line-height: 35px;
}
.seed2_1_1_1>div>div:nth-child(2){
	display: block;
	text-align: center;
	margin: 0 auto;
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
.lastsedd_1{
	margin-left: 20px;
}
.seed2_1_1_3>div>span:hover{
	opacity: .7;
}

.jsBtn{
	background: #33B3FF !important;
	border-color: #33B3FF !important;
	color: #fff !important;
}
.seed2_2>div{
	border-bottom: 1px solid #E6E6E6;
	padding: 41px 0 0;
}
.seed2_2>.seed2_1_1{
	padding-bottom: 30px
}
.seed2_1_2_1{
	font-size: 16px;
	color: #33B3FF;
	margin-bottom: 18px;
}
.seed2_1_2_2{
	position: relative;


	width: 310px;
	margin: 0 auto 0;
	box-sizing: border-box;

	text-align: left;
}
.seed2_1_2_2 .wk_a{
    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.06);
}
.seed2_1_2_2>img{
	display: block;
	width: 100%;
	height: 201px;
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
.new_c_1{
	cursor: pointer;
	display: inline-block;
    vertical-align: top;
    
    background: #DFDFDF;
    border-radius: 5px;
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: #FFFFFF;
    margin-left: 20px;
}
.seed2_1_2_1_new1{
	margin-bottom: 18px;
}
.seed2_1_2_1_new1 .inptud{
	height: 40px!important;
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
	max-width: 650px;
    word-break: break-all;

    line-height: 21px;
}
.pl_02_1>div:nth-child(2)>span:nth-child(1){
	display: inline-block;
	margin-right: 44px;
	margin-bottom: 10px;
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


.pl_02_1>div:nth-child(3){
	margin-top: 20px;
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
.pl_02 .pl_02_1:last-child{
	border-bottom: 0;
}
.pl_02_1{
	border-bottom: 1px solid #E6E6E6;
	padding: 30px 0;
}
.hfBox{
	display: flex;
	width: 100%;
	margin: 17px auto 0;
}

.hfBox input{
	padding: 0 10px;
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
	background: rgba(223,223,223,1);
	border-radius: 5px;
	width: 102px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 14px;
	color: rgba(187,187,187,1);
	margin-left: 14px;
}
.pl_02_1xxc{
    border-bottom: 1px solid #E6E6E6;
    width: 811px;
    margin: 0 0 0 60px;
} 
.addmpl{
	margin-top: 40px;
}

.likeis{
	color: red !important;
}
.i_listd1x2{
	cursor: pointer;
	width: 269.9px;
	height: 201.5px;
	overflow: hidden;
}
.seed11{
	display: inline-block;
}
.seed12{
	position: relative;
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
	width: 24px;
	margin-right: 8px;
}
.seed1_2_2>img{
	vertical-align: bottom;
	display: inline-block;
	width: 24px;
	margin-right: 8px;
}
.plBoxd{padding: 30px 0;}

.page2_2_2_2_2>.el-select>.el-input>.el-input__inner{
	padding-left: 10px;
}
.el-cascader>.el-input>.el-input__inner{
	padding-left: 10px;
}

.is-active{
	color:#33B3FF!important;
}

.setUserBox{
	min-height: 754px;
}
.setUserBoxs{
	padding-top: 20px;
	width: 1300px;
	margin: 0 auto;
	text-align: left;
}
.setUserBoxs_nav{
	margin-right: 20px;
	vertical-align: top;
	display: inline-block;
	background: #FFFFFF;
	border-radius: 5px;
	width: 310px;
	
}
.setUserBoxs_nav>div{
	position: relative;
	line-height: 59px;
	font-size: 14px;
	color: #1E1E1E;
	border-bottom: 1px solid #E6E6E6;
	text-indent: 30px;
	cursor: pointer;
}
.setUserBoxs_nav>div:last-child{
	border-bottom: 0;
}
.setUserBoxs_nav>div.action{
	color: #33B3FF;
}
.setUserBoxs_nav>div.action:after{
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	background: #33B3FF;
	width: 3px;
	height: 100%;
	
}
.setUserBoxs_cent{
	display: inline-block;
	width: 910px;
}
.setUserBoxs_cent>div.scBox{
	background: #FFFFFF;
	border-radius: 5px;
	width: 910px;
	padding: 27px 30px;
	margin-bottom: 20px;
}
.setUserBoxs_cent>.poerrsas{
	position: relative;
	border: none;
    box-shadow: none;
    min-height: 420px;
}
.padxx_01{
	margin-bottom: 60px
}
.suc_title{
	font-size: 15px;
	color: #1E1E1E;
	margin-bottom: 37px;
}
.suc_1>div>span{
	display: inline-block;
	vertical-align: middle;
	margin-right: 74px;
	width: 42px;
	font-size: 14px;
	color: #999999;
	text-align: justify;
	text-align-last: justify;
}
.suc_1>div{
	margin-bottom: 25px;
}
.suc_1x>div{
	line-height: 40px;
	margin-bottom: 25px;
}
.suc_1_1_1{
	position: relative;
	display: inline-block;
	vertical-align: middle;
	border-radius: 50%;
	overflow: hidden;
}
.suc_1_1_1>img{
	display: inline-block;
	vertical-align: middle;
	width: 100px;
	height: 100px;
	border-radius: 50%;
}
.suc_1_1_1:hover>div{
	display: block;
}
.suc_1_1_1>div{
	display: none;
	cursor: pointer;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.5);
	text-align: center;
	font-size: 14px;
	color: #FFFFFF;
	text-align: center;
	line-height: 100px;
	
}
.suc_1>.suc_1_1>span{
	margin-right: 54px;
}
.suc_1>.suc_1_3>span{
	width: 56px;
	margin-right: 60px;
}
.suc_1 > div:last-child{
	margin-bottom: 0;
}
.xgnamed{
	min-width: 150px;
	line-height: 20px;
	display: inline-block;
	vertical-align: middle;
}
.xgnamed>span{
	float: right;
	font-size: 14px;
	color: #33B3FF;
	width: 58px;
	text-align: right;
	cursor: pointer;
}
.setUserRiode{
	display: inline-block;
}
.setUserRiode>label>span{
	width: 8px;
	height: 8px;
	border-radius: 0;
	margin-right: 10px;
}
.setUserRiode>label>span:after{
	width: 8px;
	height: 8px;
	border-radius: 2px;
}
.setUserRiode>.onchek>span:after{
	background:  #33B3FF;

	border:1px solid  #33B3FF;
}
.setUserSeLET{
	display: inline-block;
}
.userBoxd2_1{
	display: inline-block;
    width: 549px;
    margin-bottom: 0;
    vertical-align: middle;
}
.userBoxd2_2{
	display: inline-block;
    width: 250px;
    margin-bottom: 0;
    vertical-align: middle;	
}
.suc_3xInput{
	display: inline-block;
	width: 250px;
}
.suc_3xInput input{
	border: none;
	border-bottom: 1px solid #ddd;
	border-radius: 0;
	padding: 0;
}
.suc_3xInputx{
	vertical-align: middle;
	margin-left: 21px;
	width: 129px !important;
}
.navDwzc .setUserBoxs_nav{
	display: none;
}
.navDwzc .fixdon{
	display: block;
}

.fixdon{
	position: fixed;
	top: 0;
}
.navDwzc{
	position: fixed;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 1300px;
}
@media screen and (max-width: 1300px){
	.navDwzc{left:0;
	transform: translateX(0);}
}
.setUserBoxs_cent>.suc_btndf{
	background: #33B3FF;
	border-radius: 5px;
	width: 140px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	font-size: 16px;
	color: #FFFFFF;
	margin: 60px auto;
	padding: 0;
	cursor: pointer;
}
.suc_3xInputx{
	vertical-align: middle;
}
.suc_3xInputx input{
	border: none;
	border-bottom: 1px solid #DDDDDD;
	border-radius: 0;
}
.tc_sucd{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
	background: rgba(0,0,0,.5);
}
.tc_sucd_1{
	padding: 30px 40px 8px;
	font-size: 14px;
}
.tc_sucd_1_1{

	margin-bottom: 40px;
}
.tc_sucd_1_2>.btns{
	vertical-align: top;
}
.tc_sucd_1_2>span{
	cursor: pointer;
	display: inline-block;
	border: 1px solid #999999;
	border-radius: 5px;
	width: 98px;
	height: 38px;
	font-size: 14px;
	line-height: 38px;
	color: #333333;
	text-align: center;
	margin: 0 15px;
}
.tc_sucd_1_2>span:hover{
	opacity: .7;
}
.tc_sucd_1_2>span:last-child{
	background: #333;
	border-color: #333;
	color: #fff;
}
.tc_sucd_1X{
	position: absolute;
	cursor: pointer;
	top: -26px;
	right: -26px;
	width: 26px;
	height: 26px;
}

.bindEamil{
	display: inline-block;
	font-size: 14px;
	color: #33B3FF;
	cursor: pointer;
}

.elmentIputNoborder input{
	border: none;
    border-bottom: 1px solid #E6E6E6;
    padding: 0;
    border-radius: 0;
}
.tc_sucd_1 .emailyzm .el-input{
	width: 278px;
}
.emailyzm{
	border-bottom: 1px solid #E6E6E6;
}
.elmentIputNoborder{
	margin-bottom: 30px;
}
.emailyzm{
	margin-bottom: 30px;
}
.emailyzm input{
	border: none;
	padding: 0;
	border-radius: 0;
}
.emailyzm .el-input{
	width: 207px;
	display: inline-block;
}
.emailyzm2{
	display: inline-block;
	vertical-align: middle;
}
.emailyzm2:before{
	content: "";
	display: inline-block;
	width: 1.6px;
	height: 18.9px;
	background: #eee;
	margin-right: 20px;
	vertical-align: middle;
}
	
.emailyzm2>img{
	display: inline-block;
    vertical-align: middle;
}
	
.tAncType4_1{
	display: block;
	margin: 0 auto;
}
.tAncType4_2{
	font-size: 14px;
    color: #666666;
    text-align: center;
    line-height: 24px;
    margin-bottom: 30px;
}
.userSZ_1{
	display: inline-block;
	font-size: 14px;
	color: #333333;
	line-height: 40px;
}
.userSZ_1_n1{
	display: inline-block;
	font-size: 14px;
	color: #dddd;
	line-height: 40px;
}
.userSZ_2{
	float: right;
	text-align: right;
	margin-right: 111px;
}
.userSZ_2>span{
	display: inline-block;
	border: 1px solid #999999;
	border-radius: 5px;
	width: 98px;
	line-height: 38px;
	font-size: 14px;
	color: #333333;
	text-align: center;
	cursor: pointer;
	margin:0 10px;
	vertical-align: middle;
}
.userSZ_2>span:last-child{
	background: #33B3FF;
	color: #fff;
	border-color: #33B3FF;
}
.tc_spasswodr_1{
	margin-bottom: 40px;
}
.tc_spasswodr_1>span{
	cursor: pointer;
    display: inline-block;
    text-align: center;
    width: 50%;
    line-height: 40px;
    border-bottom: 1px solid #E6E6E6;
}
.tc_sucd_1_2{
	text-align: center;
	margin-bottom: 30px;
}
.tc_spasswodr_1>.checkd{
	border-color: #33B3FF;
	color: #33B3FF;
}

.suc_1>.suc_1_4>span{

	width: 73px;
	margin-right: 43px;
}
.suc_1>.suc_1_4>span>img{
	display: inline-block;
	vertical-align: middle;
	margin-right: 9px;
}
.bindwxd_1{
	display: inline-block;
	width: 120px;
}
.bindwxd_2{
	display: inline-block;
}
.bindwxd_3{
	display: block;
	margin-bottom: 30px;
	text-align: center;
}

.rzzt_1{
	display: inline-block;
	font-size: 14px;
	color: #333333;
	width: 120px;
}
.rzzt_2{
    display: inline-block;
    border: 1px solid #999999;
    border-radius: 5px;
    font-size: 14px;
    color: #333333;
    text-align: center;
    line-height: 38px;
    width: 98px;
    cursor: pointer;
}

.suc_1 >.suc_1_9> span{
	display: inline-block;
	width: 157px;
	text-align: left;
	margin-right: 0;
	text-align-last:auto;
}
.suc_1_9_1{
	display: inline-block;
	width: 300px;
}
.suc_1_9_1 input{
	border: none;
	border-radius: 0;
	border-bottom: 1px solid #DDDDDD;
	padding: 0;
}
.suc_1_9_2{
	display: inline-block;
}
.suc_1_9_3{
	display: inline-block;
	border: 1px solid #999999;
	border-radius: 5px;
	font-size: 14px;
	color: #333333;
	text-align: center;
	width: 98px;
	line-height: 38px;
	cursor: pointer;

}
.suc_1_9_4{
	position: relative;
	display: inline-block;
    margin-left: 20px;
    font-size: 20px;
    vertical-align: middle;
	cursor: pointer;
	color:#bbb;
}
.suc_1_9_4:hover>.suc_1_9_5{
	display: block;
}
.suc_1_9_5{
	display: none;
	position: absolute;
	background: #FFFFFF;
	box-shadow: 0 3px 6px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	padding: 30px;
	top: 0;
    left: 28px;
	z-index: 9;
	white-space: nowrap;

}
.suc_1_9_5:after{
	content: "";
	position: absolute;
	left: 0;
	top:0;

	background: #fff;
	border: 1px solid #fff;

    width: 10px;
    height: 10px;
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    -webkit-transform: rotate(-45deg) translate(-88%,19%);
    transform: rotate(-45deg) translate(-88%,19%);
    z-index: 20;
 
}
.suc_1_9_6{
	vertical-align: top;
	display: inline-block;

}
.suc_1_9_7{
	margin-left: 29px;
	vertical-align: top;
	display: inline-block;
	width: 260px;
}
.suc_1_9_9{
	font-size: 14px;
	color: #333333;
	margin-bottom: 13px;
}
.suc_1_9_8{
	font-size: 14px;
	color: #999999;
	
}
.suc_1_9_8>span{
	display: inline-block;
	background: #999999;
	width: 4px;
	height: 4px;
	border-radius: 50%;
	vertical-align: middle;
	margin-right: 6px;
	margin-bottom: 6px;
}
.suc_1_10{
	margin-left: 157px;
	margin-top: -20px;
}
.suc_1_10_1{
	font-size: 14px;
	color: #666666;
	margin-bottom: 18px;
}
.suc_1_10_2{
	position: relative;
	overflow: hidden;
	background: rgba(216, 216, 216, .3);
	border-radius: 10px;
	width: 300px;
	height: 189px;
	text-align: center;
	line-height: 189px;
	font-size: 14px;
	color: #333333;
}
.suc_1_10_3{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.suc_1_9_3{
	position: relative;
}
.suc_1_9_3>input{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.suc_1_9_c{
	display: inline-block;
	font-size: 14px;
	color: #666666;
}
.suc_1_9_c1{
	display: inline-block;
	font-size: 14px;
	color: #33B3FF !important;
	cursor: pointer;
	vertical-align: middle;
	margin-left: 33px;
}
.suc_1_9yzm{
	display: inline-block;
	width: 297px;
	vertical-align: middle;
	margin-bottom: 0;
}
.rz_qr{
	
}
.rz_qr .el-checkbox{
	margin-right: 0;
	font-size: 14px;
	color: #666666;
}
.rz_qr>span{
	font-size: 14px;
	color: #333333;
	line-height: 20px;
	margin-left: 6px;
	cursor: pointer;
}
.xhds{
	display: inline-block;
	vertical-align: middle;
	width: 4px;
	height: 4px;
	border-radius: 50%;
	background: #33B3FF;
	margin-left: 10px;
}
.kafysd1{
	display: inline-block;
	font-size: 14px;
	color: #666666;
}
.rz_qr .el-checkbox__inner::after{
	display: none;
}
.ridieodf .el-radio__input.is-checked+.el-radio__label{
	color: #606266;
	
}
.ridieodf .el-radio__input.is-checked .el-radio__inner{
	background: #33B3FF;
	border-color:#33B3FF;
}
.ridieodf .el-radio__inner::after{
	display: none;
}
.ridieodf .el-radio__inner{
	border: 1px solid #E6E6E6;
	border-radius: 3px;
	width: 12px;
	height: 12px;
}
.ridieodf2{
	margin-bottom: 12px;
}
.suc_1_11{
	margin-left: 157px;
}
.setUserBoxs_cent >div.suc_btndf2{
	background: #DFDFDF;
    border-radius: 5px;
    font-size: 16px;
    color: #BBBBBB;
    text-align: center;
    width: 340px;
    height: 40px;
    margin: 60px auto;
    padding: 0;
    line-height: 40px;
    box-shadow: none;
	cursor: pointer;
}
.setUserBoxs_cent >div.ispos{
	background: #33B3FF;
	color: #fff;
}
.el-radio__input.is-checked .el-radio__inner{
	background:  #33B3FF!important;
	color:  #33B3FF!important ;
	border-color:#33B3FF!important;
}
.is-checked  .el-radio__label{
	color:#33B3FF!important;
}
.el-radio__inner:hover{
	border-color: #33B3FF!important;
}
/*.el-button--primary{*/
	/*border: 1px solid #999999;*/
	/*border-radius: 5px;*/
	/*background: transparent!important;*/
	/*width: 100px;*/
	/*height: 40px;*/
	/*font-family: PingFangSC-Regular;*/
	/*font-size: 14px;*/
	/*color: #333333!important;*/
	/*text-align: center;;*/
/*}*/
.el-upload-list{display: none}

/*message*/
.tjsj_2{
	display: inline-block;
	width: 119px;
	font-size: 16px;
	color: #1E1E1E;
}
.tjsj_1{
    text-indent: 0;
    display: inline-block;
    background: #F4523B;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 0;
    min-width: 8px;
    height: 14px;
    border-radius: 9px;
    vertical-align: text-bottom;
    text-align: center;
    line-height: 14px;
    padding: 2px 5px;
	
}

.messgdo{
	min-height: 834px;
}
.comment_1{
	display: inline-block;
	vertical-align: top;
	border-radius: 50%;
	width: 48px;
	height: 48px;
	
}
.comment_2{
	vertical-align: top;
	display: inline-block;
	margin: 0 169px 0 20px;
	width: 486px;
}
.comment_3{
	vertical-align: top;
	display: inline-block;
	border-radius: 5px;
	width: 187px;
	height: 140px;
}

.comment_2_1{
	font-size: 14px;
	color: #bbb;
	margin-bottom: 5px;
}
.comment_2_2{
	color: #999999;
	margin-left: 30px;
}
.comment_2_3{
	font-size: 14px;
	color: #999999;
	line-height: 24px;
	margin-bottom: 11px;
}
.comment_2_4{
	cursor: pointer;
	font-size: 14px;
	color: #33B3FF;
}
.comment_2_5{
	font-size: 14px;
	color: #666;
	line-height: 24px;
	min-height: 33px;
    max-height: 53px;
	margin-bottom: 7px;
	overflow: hidden;
    text-overflow: ellipsis;
}
.comment_2_6{
	display: inline-block;
    width: 18px;
    vertical-align: middle;
}
.comment_2_7{
	margin-left: 22px;
	font-size: 14px;
	color: #33B3FF;
}
.hfdZ_23{
	font-size: 14px;
    color: #999999;
    margin-right: 60px;
}
.xxbox_c{
	
}
.xxbox_c .userBoxd2{
	margin: 0;
}
.xxbox_c .myInput input{
	height: 37px;
	padding: 0 10px;
}
.comment_2_7_1{
	margin-left: 20px;
}
.comment_2_9{
    width: 842px;
    border-top: 1px solid #E6E6E6;
    margin-top: 27px;
    padding-top: 30px;
}
.pagesdddxf{
	margin: 62px auto;
}

.pagesdddxf .el-pager li{
	width: 40px;
	height: 40px;
	box-sizing: border-box;
	line-height: 40px;
}
.pagesdddxf button{
	width: 40px;
	height: 40px;
	box-sizing: border-box;
	line-height: 40px;
}
.pagesdddxf  .el-input__inner{
	height: 40px !important;
	box-sizing: border-box;

}
.el-pagination__sizes{
	width: 100px;
	margin-right: 16px;
}
.el-pagination__sizes .el-input .el-input__inner:hover{
  
    border-color: #DCDFE6;
}
.el-input__inner:hover{
	border-color: #DCDFE6;
}
.el-pagination.is-background .el-pager li:not(.active):hover{
	color: #33B3FF;
}

.svgImgx2{
    display: inline-block;
    vertical-align: sub;
    margin-right: 6px;
	margin-bottom: 2px;
}


.btns{
	display: inline-block;
    border: 1px solid #bbb;
    border-radius: 5px;
    width: 118px;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    color: #666666;
	background: #fff;
    text-align: center;
    margin: 0 10px;
}
.btns_js{
	background: #33B3FF;
    border-color: #33B3FF;
    color: #fff;
}

.el-message{
	background: rgba(255,255,255,1);
    box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.1);
    border-radius: 2px;
    padding: 0 15px;
	
    border-radius: 5px;
    color: #33B3FF;
    text-align: center;
    border: none;
	width: auto !important;
    min-width: auto;
	min-height: auto;
    border: none;
    height: auto;
    min-height: auto;

	
	
	
	z-index: 100001 !important;
}
.el-message .el-icon-info{
	display: none;
}
.el-message--info .el-message__content{
	color: #666;
    width: 100%;
    font-size: 16px;
    padding: 10px 0;
}

/*comt*/
.botnbox{
	text-align: center;
}
.botnbox>span{
	display: inline-block;
	cursor: pointer;
	margin: 0 10px;
    border-radius: 5px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    width: 100px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid rgba(153,153,153,1);
}
.botnbox>span:hover{
	opacity: .7;
}
.botnbox>span.ysHei{
	background: #333333;
	color: #fff;
	border-color: #333333;
}


.bj_cent_1{
	position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
	background: #f4f6f9;
    min-height: 102%;
    padding: 60px 0 150px;
}
.btomShow{
	-webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
}


.yhtop1{
	position: absolute;
    top: 0;
    left: 0;
	width: 100%;
	height: 60px;
	font-size: 16px;
	color: #000;
	text-align: center;
	line-height: 60px;
	background: #fff;
	z-index: 1;
	-webkit-box-shadow: 0 2px 6px 0 rgba(0,0,0,.1);
	box-shadow: 0 2px 6px 0 rgba(0,0,0,.1);
}
.yhtop2{
	position: relative;
	padding-top: 60px;
	height: 80px;
	background: #fff;
	line-height: 80px;
	
}
.yhtop2>div{
	position: relative;
	font-size: 16px;
	color: #333333;
	text-align: left;
	width: 860px;
	margin: 0 auto;
}



/*btns*/
.btn_n{
	display: inline-block;
	font-size:14px;
	line-height:38px;
	cursor: pointer;
	text-align: center;
	width:98px;
	height:38px;	
	border-radius:5px;
	border:1px solid #BBB;

}
.btn_n:hover{
	opacity: .7;
}
.btn_n1{	
	color:#666;
}
.nbt_lef{
	margin-right: 30px;
}
.btn_n2:hover{
	opacity: 1;
}
.btn_n2{
	
	border-color: #DFDFDF;
	color:#BBB;
	background:#DFDFDF;
}
.btn_n3{
	border-color: #33B3FF;	
	color:#fff;
	background:#33B3FF;
}


.newSC_2{
	display: inline-block;
    font-size: 14px;
    color: #666666;
    width: 167px;
}
.newSC{
	height: 40px;
	line-height: 40px;
}
.newSC .inptud{
	height: 40px !important;
}

.suc_1 .inptud{
	height: 40px !important;
}
.suc_1>.newSC>span{
	display: inline-block;
	margin: 0;
	width: 116px;
	text-align: left;
	text-align-last: auto;
}
.suc_1>.newSC>span.newSC_2_1{
	text-align: center;
	margin:0 10px;
}
.setBin_1{
	padding-bottom: 100px;
}
.el-cascader-menus,.el-select-dropdown{
	z-index:100003 !important;
}
.noDatawan{
	color: #33B3FF;
    margin-top: 18px;
	text-align: center;
}

.rz_chk_1{
	display: inline-block;
	vertical-align: top;
	margin-top: 1px;
	position: relative;
	border: 1px solid #DCDFE6;
	border-radius: 2px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	background-color: #FFF;
	width: 14px;
	height: 14px;
}

.rz_chk_check .rz_chk_1{
	background: #33B3FF;
	border-color: #33B3FF;
}
.rz_chk_1_1{
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
	width: 100%;
	height: 100%;
}
.rz_chk_2{
	display: inline-block;
	padding-left: 10px;
	line-height: 19px;
	font-size: 14px;
}
.rz_chk_check .rz_chk_2{
	color: #33B3FF;
}
.worksBox_1n_1{
	color:#666;
}

.seccPr .emptyData,.searUr .emptyData,.seccWr .emptyData{
	background: #fff;
	padding: 40px 0;
}
.emptyData{
	background: #fff;
	padding: 40px 0;
}


.f_a{
	color: #FF9200;
}
.m_c{
	margin: 0 auto;
}
.loading_a{
	display: block;
	width: 25px;
    height: 25px;
    -webkit-animation: circle infinite .75s linear;
    animation: circle infinite .75s linear;
    border: 2px solid #fff;
    border-top-color: transparent;
    border-radius: 100%;
}

@-webkit-keyframes circle{
	0%{-webkit-transform:rotate(0);}
	100%{-webkit-transform:rotate(360deg);}
}
@keyframes circle{
	0%{transform:rotate(0);}
	100%{transform:rotate(360deg);}
}
.btn-lod .loading_a{
	width: 15px;
	height: 15px;
	margin-top: 10px;
}
.closeX_1Hv:hover .closeX_1{
	opacity: 1;
}
.closeX_1{
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	background: rgba(0,0,0,.5);
	width: 100%;
	height: 100%;
}
.closeX_1>img{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
}
.el-select-dropdown{
	border: none !important;
}
.popper__arrow{
	    border-color: transparent;
}
.popper__arrow:after{
	    border-color: transparent;
}
</style>
