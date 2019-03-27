<template>
	<div class="citysbos3_a">
		<label v-for="(el,index) in Data" :class="[input.indexOf(el.v)!=-1?'onchek':'']" :key="index">
			<span></span>
			<input v-model="input" :value="el.v"  type="checkbox">
			{{el.n}}
		</label>			
	</div>
</template>

<script>
export default {
	props:['Data'],
	data(){
		return{
			opType:'',			
			gjOn:0,
			input:[],
		}
	},
	mounted: function () {	
	
	}, 
	watch: {
	    'input'(val) {
			this.input = val;
	    	this.$emit('input', this.input); 	    		      		      	
	    },
	},

}
</script>

<style>
.citysbos3_a>label{
	position: relative;
}
.citysbos3_a>label>span{
	display: inline-block;
	width: 15px;
	height: 15px;
	border: 1px solid #EEEEEE;
	border-radius: 3.43px;
}
</style>