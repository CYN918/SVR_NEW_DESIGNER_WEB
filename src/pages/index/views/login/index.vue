<template>
	<div class="loginBox">		
		<div class="logindboxd" style="padding: 0;">
		<div class="login_1">
			<div class="login_2">
				<router-view/>
			</div>
		</div>
		</div>
		<Footer class="loginfooter"></Footer>
	</div>
</template>
<script>
import Footer from '../../components/footer';
export default {
	name: 'login',
	components:{Footer},
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
.logindboxd{
	min-height: 100% !important;
}
.loginBox{
	background: url(https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/lo1.jpg) no-repeat 0 0/cover;
}
.loginfooter{
	background: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 100%);
}
</style>
