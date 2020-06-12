<template>
	<div>
		<div class="tc_sucd_1">
			<Input v-model="da.email" :type="'text'" :oType="'text'" :chekFn="chekemail" :placeholder="'请输入邮箱'"></Input>
			<div class="emailyzm">
				<el-input v-model="da.pic_verify" placeholder="请输入验证码"></el-input>
				<div class="emailyzm2"><img @click="Verifycodeget" :src="da.pic_verifyimg" alt=""></div>
			</div>
		</div>
		<div v-if="tAncType==4" class="tc_sucd_1">
			<img class="tAncType4_1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/email01.png"/>
			<div class="tAncType4_2">
				激活邮件已发送到你的邮箱中，邮件有效期为24小时。<br/> 请及时登录邮箱，点击邮件中的链接激活账户。
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'myInput',
	data(){
		return{
			da:{},
		}
	},
	mounted: function() {
		this.init();
	},
	methods: {
		init(){
			this.Verifycodeget();
		},
		Verifycodeget() {
			this.$set(this.tancData,'pic_verifyimg',window.basrul+'/Passport/Verifycode/get?client_id='+window.userInfo.open_id+'&t='+(new Date()).valueOf())
		}
	}
	
}
</script>

<style>
</style>