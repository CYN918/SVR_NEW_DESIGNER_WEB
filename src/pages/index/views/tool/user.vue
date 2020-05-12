<template>
	<div>
		<component v-if="coms.zj" v-bind:is="coms.zj" v-model="coms" ref="vid"></component>
	</div>	
</template>
<script>
import noDshow from './noDshow';
import userList from './userList';
export default{
	components:{noDshow,userList},
	data(){
		return{
			coms:{
				zj:'noDshow',
				type:0,
			},			
		}
	},
	mounted: function () {
		this.init();
	}, 
	methods:{
		init(){
			if(!window.userInfo){
				this.$router.push({path:'/login'});	
			}
			if(window.userInfo.contributor_format_status==2){
				this.coms.zj = 'userList';
			}
		},	
	}
}
</script>

<style>

</style>