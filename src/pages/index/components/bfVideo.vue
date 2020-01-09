<template>
	
	<div class="pr_tc_01">
		<div class="bofcide_1" @click="close"></div>
		<video class="bofcide" controls="controls" :src="value.src" ref="vide"></video>
	</div>
</template>

<script>
export default{
	props:{
		value:Object
	},
	mounted:function(){
		this.palys();
	},
	methods:{
		palys(){
			this.$refs.vide.play();
		},
		close(){
			this.$emit('input',{});
		}
	}
}
</script>

<style>
.bofcide_1{
	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;
}
.bofcide{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 1300px;
	height: 560px;
}

</style>
