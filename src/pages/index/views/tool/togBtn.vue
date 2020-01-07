<template>
	<div
	:style="'transform: translateX('+py_cs+'px);width:'+con.width+'%;'" 				
	draggable="true" 
	@dragstart="dragS" 
	@drag="dragD" 
	@dragend="dragE" 
	class="ks"  
	ref="ks"></div>
</template>

<script>
export  default{
	props:{
		con:Object,
		value:Number,
	},
	data(){
		return{
			starX:0,
			py_cs:0,
			time:0,
		}
	},
	methods:{
	
		dragS(e){
			console.log('star');
		},
		dragE(e){
			let x = e.x;		
			if(x>1000){x = 1000;}
			if(x<0){x = 0;}
			this.py_cs = x;		
			let on = (this.py_cs/1000).toFixed(4)*this.con.leng;
			this.$emit('input',on);	
		},
		dragD(e){
			let x = e.x;
			if(x>1000){x = 1000;}
			if(x<0){x = 0;}
			this.py_cs = x;
			let on = (this.py_cs/1000).toFixed(4)*this.con.leng;
			this.$emit('input',on);	
		}
	}
}
</script>

<style>
.ks{
	position: absolute;
	top:0;
	left: 0;
	background: red;
	width: 10px;
	height: 100%;
}
</style>
