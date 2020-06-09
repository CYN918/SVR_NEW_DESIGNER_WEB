<template>
	<p class="tfbox">
		<img @click="goFn('/syPage')" class="tfbox_bn" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/tools/tip_banner.jpg"/>
		<img @click="checkAd()" class="tfbox_cl" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/tools/Toast_closed.svg"/>
	</p>
</template>
<script>
export default{
	props:{
		value:Object
	},
	methods:{
		checkAd(){
			this.$emit('input',{})
		}
	}
}
</script>
<style>
.tfbox{
	cursor: pointer;
	position: fixed;
	left: 0;
	bottom: 0;
	display: block;
	width: 100%;
	min-width: 1300px;
}
.tfbox_bn{
	display: block;
	width: 100%;
}
.tfbox_cl{	
    position: absolute;
    right: 14%;
    top: 16px;
}
</style>
