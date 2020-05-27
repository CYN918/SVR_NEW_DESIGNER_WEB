<template>
	<TcBox :config="outc" ref="tcBox">
		<template v-slot:todo="{ todo }">
			<div class="qxBm_btns_1">确定退出登录?</div>	
			<div class="qxBm_btns">
				<div @click="close" class="btns pend">取消</div>
				<div @click="logout" class="btns btns_js pend">确定</div>				
			</div>
		</template>			
	</TcBox>
</template>
<script>
import TcBox from './TcBox';
export default {
	inject:['reload'],
	components:{TcBox},
	data(){
		return{
			outc:{
				title:'退出确认',
				scroll:1,
			}
		}
	},
	methods: {			
		logout(){
			if(!window.userInfo){return}			
			this.api.logout({}).then((da)=>{
				if(da=='error' || da=='104'){
					return
				}
				this.close();
				localStorage.setItem('pass','');			
				localStorage.setItem('userT','');
				window.userInfo='';
				window.passIn = '';		
				this.reload();	
				this.$router.push({path: '/index'})	
			});
		},
		show(){

			this.$refs.tcBox.show();
		},
		close(){
			this.$refs.tcBox.close();
		},
	}
}		
	
</script>

<style>

</style>
