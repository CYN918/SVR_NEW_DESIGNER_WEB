<template>
	<div class="loginBox">		
		<div class="logindboxd" style="padding: 0;">
		<div class="login_1">
			<div class="login_2">
				<router-view/>
			</div>
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
.loginBox{
	background: url(/imge/lo1.png) no-repeat 0 0/cover;
}

</style>
