<template>
	<div class="citysbos3_1">
		<label v-for="(el,index) in Data" :class="[gjOn==index?'onchek':'']" :key="index">
			<span></span>
			<input name="gj" @click="checkgj(index)" v-model="input" :value="el.v" type="radio">
			{{el.n}}
		</label>			
	</div>
</template>

<script>
export default {
	props:['Data'],
	data(){
		return{
			gjOn:-1,
			input:'',
		}
	},
	props: {
			Data:Array,
 
			value: { 
	　　　　　	default: '',
	　　　　	},

		},		
	watch: {
	    'input'(val) {
			console.log(this.input)
	    	this.$emit('input', this.input); 	    		      		      	
	    },
	},
	methods: {
		checkgj(on){	
			this.gjOn =on;
		},
	}
}
</script>

<style>
</style>
