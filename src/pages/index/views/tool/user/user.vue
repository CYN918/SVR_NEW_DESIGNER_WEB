<template>
	<div>
		<component v-bind:is="compData.zj" v-model="compData"></component>
	</div>	
</template>
<script>
import noDshow from './noDshow';
import userList from './userList';
export default{
	components:{noDshow,userList},
	data(){
		return{
			compData:{
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
				this.goFn('/login');	
			}
			if(window.userInfo.contributor_format_status==2){
				this.compData.zj = 'userList';
			}
		},	
	}
}
</script>
<style>
</style>