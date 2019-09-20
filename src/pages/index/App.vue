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
.iconfont{
	font-family:"iconfont" !important;
	font-size:16px;font-style:normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}
#app{
	font-family: 'PingFang SC Regular','Avenir', Helvetica, Arial, sans-serif;
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
	outline-color: #FF5121 !important;
    outline-color: rgba(51, 153, 255, 0.75);
}
.crop-point[data-v-6dae58fd]{
	background: #FF5121 !important;
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
    background-color: #FF5121;
    color: #FFF;
	border-color: #FF5121;
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
	margin:  0 0 0 29px;
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
	font-size: 16px;
	margin-top: 17px;
	margin-bottom: 22px;
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
	color: #FF5121;
}
.lgoin_s5>span:nth-child(1){
	text-align: left;
}
.lgoin_s5>span:nth-child(2){
	text-align: right;
}
.lgoin_s5>span>a{
	color: #FF5121;
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
    width: 110px;
	line-height: 40px;
    vertical-align: middle;
    color: #FF5121;
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
.seed2_2xxxx{
	min-height: 800px;
}
.seed2_1_1_1x{
	text-align: left;
}
.seed2_1_1_1x>p{
	margin-bottom: 30px;
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
	max-height: 481px;
    overflow: hidden;
	overflow-y: auto;
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
.lastsedd_1{
	margin-left: 20px;
}
.seed2_1_1_3>div>span:hover{
	opacity: .7;
}

.jsBtn{
	background: #FF5121 !important;
	border-color: #FF5121 !important;
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
	color: #FF5121;
	margin-bottom: 18px;
}
.seed2_1_2_2{
	position: relative;
	background: #F6F6F6;
	border-radius: 5.08px;
	width: 310px;
	margin: 0 auto 30px;
	box-sizing: border-box;
	border: 1px solid #f6f6f6;
	text-align: left;
}
.seed2_1_2_2>img{
	display: block;
	width: 100%;
	height: 201px;
}


.seed2_1_1_2{
	text-align: left;
    height: 40px;
    line-height: 40px;
}
.seed2_1_1_2>span{
	display: inline-block;
	padding: 2px 5px;
	border: 1px solid #999999;
	border-radius: 5px;
	font-size: 14px;
	color: #999999;
	margin-right: 12px;
	line-height: 20px;
}
.seed2_1_1_2>span:first-child{
	margin-left: 18px;
}
.seed2_1_1_2>span.iconfont{
	border: none;
	margin: 0;
	margin-top: 6px;
	float: right;
}
.seed2_1_1_2>div{
	cursor: pointer;
	background: #E6E6E6;
	border-radius: 5px;
	margin-right: 10px;
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
.new_c_1{
	cursor: pointer;
	display: inline-block;
    vertical-align: top;
    
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
.seed2_1_2_1_new1{
	margin-bottom: 18px;
}
.seed2_1_2_1_new1 .inptud{
	height: 40px!important;
}


.new_c_2{
	position: relative;
    display: inline-block;
	width: 650px;
   
}
.new_c_2 .textAmax{
	position: absolute;
	top: 0;
	right: 20px;
	color: #bbb;
	line-height: 40px;
}
.new_c_3{
	outline:none;resize:none;
	background: none;
	border: none;
	width: 650px;
	text-align: left;
	overflow: hidden;
	border-radius: 5px;
	background: #e6e6e6;
	min-height: 20px;
	padding: 10px 114px 10px 20px;
    border-radius: 5px;
    background: #e6e6e6;
    line-height: 20px;
	border: 1px solid #e6e6e6;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	
}
.new_c_3:focus{
	border: 1px solid #000;
	background: none;
}
.new_c_2 input::-webkit-input-placeholder{color:#666;}
.new_c_2 input::-moz-placeholder{color:#666;}

.myplde{
	margin: 18px auto 0;
    font-size: 14px;
    color: #666666;
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
.pl_02 .pl_02_1:last-child{
	border-bottom: 0;
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
	color:#FF5121!important;
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
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
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
	color: #FF5121;
}
.setUserBoxs_nav>div.action:after{
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	background: #FF5121;
	width: 3px;
	height: 100%;
	
}
.setUserBoxs_cent{
	display: inline-block;
	width: 910px;
	margin-bottom: 40px;
}
.setUserBoxs_cent>div{
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
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
	display: inline-block;
	vertical-align: middle;
}
.xgnamed>span{
	float: right;
	font-size: 14px;
	color: #FF5121;
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
	background:  #FF5121;

	border:1px solid  #FF5121;
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
	background: #FF5121;
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
}
.tc_sucd_1_1{
	margin-bottom: 40px;
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
	color: #FF5121;
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
	background: #FF5121;
	color: #fff;
	border-color: #FF5121;
}
.tc_spasswodr_1{
	margin-bottom: 40px;
}
.tc_spasswodr_1>span{
	cursor: pointer;
    display: inline-block;
    width: 50%;
    line-height: 40px;
    border-bottom: 1px solid #E6E6E6;
}
.tc_sucd_1_2{
	margin-bottom: 30px;
}
.tc_spasswodr_1>.checkd{
	border-color: #FF5121;
	color: #FF5121;
}

.suc_1>.suc_1_4>span{

	width: 62px;
	margin-right: 54px;
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
}
.bindwxd_2>span{
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
}
.suc_1_9_4:hover>.suc_1_9_5{
	display: block;
}
.suc_1_9_5{
	display: none;
	position: absolute;
	background: #FFFFFF;
	box-shadow: 0 3px 6px 0 rgba(0,0,0,0.10);
	border-radius: 5px 5px 5px 5px 1px 1px 1px;
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
	color: #FF5121 !important;
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
	background: #FF5121;
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
	background: #ff5121;
	border-color:#ff5121;
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
	background: #999999;
    border-radius: 5px;
    font-size: 16px;
    color: #FFFFFF;
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
	background: #FF5121;
	color: #fff;
}
.el-radio__input.is-checked .el-radio__inner{
	background:  #ff5121!important;
	color:  #ff5121!important ;
	border-color:#ff5121!important;
}
.is-checked  .el-radio__label{
	color:#ff5121!important;
}
.el-radio__inner:hover{
	border-color: #FF5121!important;
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
	color: #1E1E1E;
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
	color: #FF5121;
}
.comment_2_5{
	font-size: 14px;
	color: #1E1E1E;
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
	color: #FF5121;
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
.el-pagination__sizes .el-input .el-input__inner:hover{
  
    border-color: #DCDFE6;
}
.el-input__inner:hover{
	border-color: #DCDFE6;
}
.el-pagination.is-background .el-pager li:not(.active):hover{
	color: #FF5121;
}

.svgImgx2{
    display: inline-block;
    vertical-align: sub;
    margin-right: 6px;
	margin-bottom: 2px;
}


.btns{
	display: inline-block;
    border: 1px solid #979797;
    border-radius: 5px;
    width: 118px;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    color: #666666;
    text-align: center;
    margin: 0 10px;
}
.btns_js{
	background: #FF5121;
    border-color: #FF5121;
    color: #fff;
}

.el-message{
    background: #FFEDE8;
    border-radius: 5px;
    color: #FF5121;
    text-align: center;
    border: none;
	width: auto !important;
    min-width: auto;
	min-height: auto;
    padding: 0;
    border: none;
    height: auto;
    min-height: auto;
    padding: 19px 42px;
	
	
	
	z-index: 100001 !important;
}
.el-message .el-icon-info{
	display: none;
}
.el-message--info .el-message__content{
	color: #FF5121;
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
</style>
