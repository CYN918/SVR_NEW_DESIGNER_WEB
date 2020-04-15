<template>	
	<div :style="zooms()" class="tips_m01" @click="xyb()">
		<img :class="['tips_m02','tips_m'+on]" :src="'/imge/tools/tip_'+(on+1)+'.svg'">		
	</div>
</template>

<script>
export default{
	props:{
		value:Object
	},
	data(){
		return {
			on:0,
		}
	},
	methods:{
		zooms(){
			return 'zoo:'+document.body.offsetWidth/1920;
		},
		xyb(){
			
			this.on++;
			if(this.on==4){				
				localStorage.setItem('isldxs',1);
				this.$emit('input','');
			}
		},
	}
}
</script>

<style>
.tips_m01{
	position: absolute;
	z-index: 90;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	
}
.tips_m02{
	position: absolute;
	top: 0;
	width: 100%;
	left: 0;
}

</style>
