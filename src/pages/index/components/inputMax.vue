<template>
	<div class="input_max">
		<input :placeholder="placeholder" type="text" v-model="input" name="" id="">
		<span>{{input.length}}/{{max}}</span>
	</div>
</template>

<script>
export default{
	props:{
		value:{
			type:String,
			default:''
		},
		max:{
			default:0,
			type:Number
		},
		placeholder:{
			default:'',
			type:String
		}
	},

	watch: {
		'input'(a,b){
			if(a.length>this.max){
				this.input = a.substring(0,this.max);				
			}
			this.$emit('input',this.input)
			
		},


	},
	data(){
		return{
			input:''
		}
	},
	mounted: function () {
		this.init();
	},
	methods:{
		init(){
			this.input = this.value;
		}
	}
}	
</script>

<style>
.input_max{
	position: relative;
	width: 100%;
	
	height:38px;
	background:rgba(255,255,255,1);
	border-radius:4px;
	border:1px solid rgba(0,0,0,0.15);
}
.input_max>input{
	display: block;
	height: 100%;
	border: none;
	background: none;
	padding: 0 30px 0 20px;
	line-height: 38px;
	width: 100%;
}
.input_max>span{
	position: absolute;
	top:9px;
	right:13px;
	display: inline-block;
	vertical-align: top;
	font-size:16px;
	color:rgba(191,191,191,1);
	line-height:22px;
}
</style>
