<template>
	<div class="ldx_l_1x">
		<div class="ldx_l_1" >
			<div class="ldx_l_1_1" :style="'background-image: url('+el.img+');'"></div>
		
		<!-- 	<div class="ldx_l_1_1_2"><img :src="imgPath+'new/tools/v_02.svg'" ></div>
			<div class="ldx_l_1_1_3"><img :src="imgPath+'new/tools/v_01.svg'" ></div>
			<div class="ldx_l_1_1_4">这首歌的名称很长-歌手名称</div>
			<div class="ldx_l_1_1_5">00:30</div> -->
			
			<div class="ldx_l_1_btn">
				<span @click="bjfn(el.id)" class="pend">编辑</span>
				<span class="pend ldx_l_1_btn1">交稿</span>
			</div>
			
		</div>
		<div class="ldx_l_1x_2">
			{{el.title}}
		</div>
		<div class="ldx_l_1x_3">
			{{mJs.getTimes(el.update_at) }}
		</div>
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
			localStorage.setItem('ldxData',JSON.stringify(this.el));
			this.$router.push({path:'/tools',query:{id:id}});
	
		}
	}
}
</script>

<style>
.ldx_l_1{
	position: relative;
	width:193px;
	height:343px;
	background: rgba(244,246,249,1);
	border-radius:5px;
}
.ldx_l_1x{
	
	display: inline-block;
	vertical-align: top;
	margin-left: 20px;
	margin-bottom: 20px;
	
}
.ldx_l_1_1{
	width:193px;
	height:343px;
	border-radius:5px;
	background-repeat:no-repeat;
	background-size: cover;
	background-position: center;
	
}
.ldx_l_1x_2{
	margin: 8px 0 4px;
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
}
.ldx_l_1x_3{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
}
.ldx_l_1_btn{
	position: absolute;
	bottom: 20px;
	left: 0;
	width: 100%;
	text-align: center;
}
.ldx_l_1_btn>span{
	display: inline-block;
	vertical-align: top;
	width:68px;
	height:32px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	border:1px solid rgba(187,187,187,1);
	font-size:14px;
	margin: 0 7.5px;
	color:rgba(102,102,102,1);
	line-height:32px;
}
.ldx_l_1_btn>span.ldx_l_1_btn1{
	background:rgba(51,179,255,1);
	color: #fff;
	border-color: rgba(51,179,255,1);
}
</style>
