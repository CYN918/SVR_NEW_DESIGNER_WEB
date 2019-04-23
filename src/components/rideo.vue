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
			valued:{
				default: '',
			}
		},	
	mounted: function () {	
		this.input =  this.valued;
		this.gjOn = this.valued-1;
	
	}, 
	watch: {
	    'input'(val) {
	    	this.$emit('input', this.input); 	    		      		      	
	    },
		'valued'(){
			this.input = this.valued;
			this.gjOn = this.valued-1;
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
