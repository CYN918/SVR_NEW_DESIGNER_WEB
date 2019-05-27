<template>
	<myWorksCom :comType="isType"></myWorksCom>
</template>

<script>
import myWorksCom from './myWorksCom';

export default {
	components:{myWorksCom},
	data(){
		return{
			isType:'2',
		}
	}
}
</script>

<style>
</style>
