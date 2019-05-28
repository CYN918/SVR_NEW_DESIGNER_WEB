<template>
	<div class="XtopNav" >
		<div v-if="data" class="XtopNavCent">
			<span class="XtopNavTile">{{data.title}}</span>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		data:{
			type:Object,
			default:{}
		}
	},
	data(){
		return{}
	},
	methods: {}
}
</script>

<style>
.XtopNav{
	width: 100%;
	height:80px;
	line-height: 80px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
}
.XtopNavCent{
	margin: 0 auto;
	text-align: left;
	width: 1300px;
	height: 100%;	
}
.XtopNavTile{
	font-size:24px;
	font-weight:500;
	color:rgba(30,30,30,1);
	line-height:33px;
}
</style>
