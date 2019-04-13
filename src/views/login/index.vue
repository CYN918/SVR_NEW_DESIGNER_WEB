<template>
	<div class="loginBox">
		<img class="loginBoxbg" src="/imge/lo1.png" alt="">
		<div class="logindboxd">
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
		return{

		}
	}
}
</script>
<style>


</style>
