<template>
	<div class="texar_01">
		<textarea :placeholder="placeholder" v-model="input" ></textarea>
		<span>{{input?input.length:0}}/140</span>
	</div>
</template>

<script>
export default{
	props:{value:String,placeholder:String,max:Number},
	watch:{
		'value'(){
			this.input = this.value;			
		},
		'input'(val,oldeval) {			
			if(this.max>0 && val.length>this.max){				
				this.input = oldeval;				
				return
			}
			this.$emit('input', this.input); 			
		},
	},
	data(){
		return{
			input:''
		}
	}
}
</script>

<style>
.texar_01{
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	position: relative;
	background:rgba(255,255,255,1);
	border-radius:5px;
	border:1px solid rgba(0,0,0,0.15);
	padding: 10px;
}
.texar_01>textarea{
	border: none;
	width: 100%;
	height: 100%;
}
.texar_01>span{
	position: absolute;
	right: 14px;
	bottom: 10px;
	font-size:14px;
	color:rgba(187,187,187,1);
	line-height:20px;
}
</style>
