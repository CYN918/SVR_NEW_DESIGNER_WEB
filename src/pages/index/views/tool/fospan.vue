<template>
	<div>
		<span 
		v-for="el in List"
		@click="qh(el[keys])"
		:class="[el[keys]==value?'chekd':'']"
		>{{el[v]}}</span>
	</div>
</template>

<script>
export default{
	props:{
		List:Array,
		keys:{
			type:String,
			default:'k',
		},
		v:{
			type:String,
			default:'v',
		},
		value:String
	},
	methods:{
		qh(en){
			if(this.value==en){
				en = '';
				return;
			}
			this.$emit('input',en);
		}
	}
}	
</script>

<style>
</style>
