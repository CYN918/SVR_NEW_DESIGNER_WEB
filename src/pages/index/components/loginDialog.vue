<template>
	<TcBox :config="config" ref="tcBox">
		<template v-slot:todo="{ todo }">
			<Login v-if="config.num == 1" @funcRegister="getData"></Login>
			<Register v-if="config.num == 2" @func="getMsgFormSon"></Register>
			<ModifyPassword v-if="config.num == 3" @func="getMsgFormSon"></ModifyPassword>
		</template>			
	</TcBox>
</template>
<script>
import TcBox from './TcBox1';
import Login from '../../index/views/login/dialogLogin';
import Register from '../../index/views/login/dialogRegister';
import ModifyPassword from '../../index/views/login/dialogModifyPassword';
export default {
	components:{TcBox,Login,Register,ModifyPassword},
	props:{
		config:Object,
	},
	data(){
		return{
			
		}
	},
	methods: {
		getMsgFormSon(data){
			this.config.num = data.num;
		},
		getData(data){
			this.config.num = data.num;
		},	
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
				this.$router.push({path: '/login'})	
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
