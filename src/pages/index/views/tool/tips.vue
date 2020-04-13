<template>
	
	<div :class="['tips_m01',on==2?'':'bck']" @click="xyb()">
		<img v-if="on==0" class="tips_m02" src="/imge/tools/tip_1.png">
		<img v-if="on==1"  class="tips_m03" src="/imge/tools/tip_2.png">
		
		<div v-if="on==2">
			<div class="tips_m04_1 bck"></div>
			<div class="tips_m04_2 bck"></div>
			<img class="tips_m04_3" src="/imge/tools/tip_3.png">
		</div>
		<img v-if="on==3"  class="tips_m05" src="/imge/tools/tip_4.png">
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
		xyb(){
			this.on++;
			if(this.on==4){
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

    left: calc(50% + 134px);;
    top: 98px;
}
.bck{
	background: rgba(0,0,0,.6);
}
.tips_m03{
	position: absolute;

    left: calc(50% - 75px);
    top: 120px;	
}
.tips_m04_1{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 48px;
	
}
.tips_m04_2{
	position: absolute;
	top: 48px;
	right: 0;
	width: 50%;
	height: 820px;

}
.tips_m04_3{
	position: absolute;
	top: 670px;
	left: calc(50% + 32px);
}
.tips_m05{
	position: absolute;
	top: 0px;
	right: 0;
}
</style>
