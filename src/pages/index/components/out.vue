<template>
	<tanC :title="'退出确认'">
		<template v-slot:todo="{ todo }">
			<div class="qxBm_btns_1">确定退出登录?</div>	
			<div class="qxBm_btns">
				
				<div @click="logout" class="btns  pend">确定</div>
				<div @click="close" class="btns btns_js pend">取消</div>
			</div>
		</template>			
	</tanC>
</template>
<script>
import tanC from './tanC';
export default {
	components:{tanC},
	methods: {			
		logout(){
			if(!window.userInfo){return}			
			this.api.logout({}).then((da)=>{
				if(da=='error'){
					return
				}
				this.$parent.showHb(false);
				localStorage.setItem('pass','');			
				localStorage.setItem('userT','');
				window.userInfo='';
				window.passIn = '';			
				this.$router.push({path: '/login'})	
			});
		},
		close(){
			this.$parent.close();
		},
	}
}		
	
</script>

<style>
.qxBm_btns_1{
	margin: 30px 84px;
}
.qxBm_btns{
	border-top: 1px solid rgba(244,246,249,1);
	height: 79px;
	line-height: 79px;
}
</style>
