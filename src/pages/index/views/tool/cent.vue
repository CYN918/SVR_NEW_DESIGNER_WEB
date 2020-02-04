<template>
	<div class="ldx_l_1" >
		<div @click="bjfn(el.id)" class="ldx_l_1_1" :style="'background-image: url('+el.img+');'"></div>

	<!-- 	<div class="ldx_l_1_1_2"><img :src="imgPath+'new/tools/v_02.svg'" ></div>
		<div class="ldx_l_1_1_3"><img :src="imgPath+'new/tools/v_01.svg'" ></div>
		<div class="ldx_l_1_1_4">这首歌的名称很长-歌手名称</div>
		<div class="ldx_l_1_1_5">00:30</div> -->
		
		
		
	</div>
</template>

<script>
export default{
	props:{
		el:{
			type:Object,
			default:{}
		},
	},
	methods:{
		bjfn(id){
			this.$router.push({path:'/tools',query:{id:id}});
	
		}
	}
}
</script>

<style>
.ldx_l_1{
	position: relative;
	display: inline-block;
	vertical-align: top;
	margin-left: 20px;
	margin-bottom: 20px;
	width:193px;
	height:343px;
	border-radius:5px;
}
.ldx_l_1_1{
	width:193px;
	height:343px;
	border-radius:5px;
	background-repeat:no-repeat;
	background-size: cover;
	background-position: center;
	
}
</style>
