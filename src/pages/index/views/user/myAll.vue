<template>
	<myWorksCom :comType="isType"></myWorksCom>
</template>

<script>
import myWorksCom from './myWorksCom';

export default {
	components:{myWorksCom},
	data(){
		return{
			isType:'all',
		}
	}
}
</script>

<style>
</style>
