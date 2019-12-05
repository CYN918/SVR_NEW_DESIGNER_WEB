<template>
	<div class="loginBox">	
		<img class="lg_bg lg_bg_01" src="/imge/sign_up_bg_right_top.svg"/>
		<img class="lg_bg lg_bg_02" src="/imge/sign_up_bg_right_down.svg"/>
		<img class="lg_bg lg_bg_03" src="/imge/sign_up_bg_left.svg"/>
		
		<div class="lg-wz">
			<div class="lg-wz2">
				<span>© 2015-2019 深圳掌酷软件有限公司</span>
				<i class="lg-fg"></i>
				<span>沪ICP备15021426号</span>
				<i class="lg-fg"></i>
				<span><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/footer_ga.png" class="lg-fg_ga">粤公网安备 44030502004296号</span>
			</div>
		</div>
		<div class="logindboxd" style="padding: 0;">
		<div class="login_1">
			<div class="login_2">
				<router-view/>
			</div>
		</div>
		</div>
		
	</div>
</template>
<script>

export default {
	name: 'login',

	data(){
		return{}
	},
	mounted: function () {
		this.isLogin();
	}, 
	methods: {
		isLogin(){
			if(window.userInfo){
				this.$router.push({path: '/index'});		
			}
		}
	}
}
</script>
<style>
.header_1{
	position: absolute;
	top: 16px;
	left: 100px;   
    width: 134px;
}
#app > div > div.logindboxd{
	background: none;
}
.logindboxd{
	min-height: 100% !important;
}
.loginBox{
	/* background: url(/imge/signup_bg.svg) no-repeat top right/1920px 1080px; */
}
.loginfooter{
	background: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 100%);
}
.ssetTx{
	position: relative;
	display: inline-block;
	vertical-align: middle;
	border-radius: 50%;
	overflow: hidden;
	width: 100px;
	height: 100px;
}
.ssetTx>img{
	display:block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
.ssetTx:hover>div{
	display: block;
}
.ssetTx>div{
	display: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    text-align: center;
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
    line-height: 100px;
}
.lg_bg{
	position: fixed;
}
.lg_bg_01{
    right: 0;
    top: 0;
    width: 6%;
}
.lg_bg_02{
    right: 0;
    bottom: 0;
    width: 14%;
}
.lg_bg_03{
	left:0;
	top:0;
	width: 56%;
}
#app > div > div.lg-wz{
	position: fixed;
	padding: 0;
	bottom: 4%;
	left: 0;
	width: 100%;
	text-align: center;
	min-height: 0;
	background: inherit;
	height: auto;
}
.lg-wz1{
	margin-bottom: 19px;
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.lg-wz2>span{
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:24px;
}
.lg-fg{
	display: inline-block;
	vertical-align: top;
	margin: 0 24px;
	width:1px;
	height:24px;
	background:rgba(244,246,249,1);
	box-shadow:0px 1px 2px 0px rgba(0,0,0,0.5);
}
.lg-fg_ga{
	display: inline-block;
	vertical-align: top;
	margin-top: 2px;
	margin-right: 4px;
	width: 20px;
}
</style>
