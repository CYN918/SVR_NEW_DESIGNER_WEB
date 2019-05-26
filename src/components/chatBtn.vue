<template>
	<span @click="goChat" class="btns">私信</span>
</template>
<script>
export default {
	name: 'chatBtn',
	props: {
		daTSA:Object,
	},
	methods: {
		goChat(){
			this.$router.push({path:'/chat',query:this.daTSA});		
		}
	}
}
</script>

<style>
</style>