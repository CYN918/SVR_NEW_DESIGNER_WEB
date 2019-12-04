<template>
	<div class="loginBox">		
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
	background: url(/imge/signup_bg.svg) no-repeat top right/1920px 1080px;
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
</style>
