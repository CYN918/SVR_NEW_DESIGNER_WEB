<template>
	<myWorksCom :comType="isType"></myWorksCom>
</template>

<script>
import myWorksCom from './myWorksCom';

export default {
	components:{myWorksCom},
	data(){
		return{
			isType:'0',
		}
	}
}
</script>

<style>
</style>
