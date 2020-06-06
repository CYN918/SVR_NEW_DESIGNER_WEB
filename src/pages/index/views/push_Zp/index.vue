<template>
	<div>
		<div class="ps_zb_box">
			<div class="ps_zp_02">
				作品投稿<span>一经验收，永久分成</span>
				<div class="ps_zp_03">
					<span class="check_d">使用预览图提交</span><span>使用预览图提交</span>
				</div>			
			</div>			
		</div>
		<component v-bind:is="tanc.zj" v-model="tanc" ref="tanbox"></component>
		<div class="ps_zb_box">
			<div class="ps_zp_05">
				<span class="ps_zp_06"><i class="ps_zp_06x"></i>源文件上传</span><span class="ps_zp_08">建议压缩后上传，1GB以内</span>
			</div>	
			<div class="ps_zp_07">
				
			</div>
			
		</div>
	</div>
</template>

<script>
import pic from './pic';
export default{
	components: {pic},
	data(){
		return{
			tanc:{
				zj:'pic'
			}
		}
	}
}
</script>

<style>
.ps_zp_01{
	

	
}
.ps_zb_box{
	text-align: left;
	margin: 0 auto 20px;

	width:1170px;
	background:rgba(255,255,255,1);
	border-radius:5px;
}
.ps_zp_02{
	margin-top: 20px;
	position: relative;
	padding: 20px 30px;
	font-size:20px;
	color:rgba(40,40,40,1);
	line-height:28px;
}
.ps_zp_02>span{
	margin-left: 16px;
	font-size:14px;
	color:rgba(187,187,187,1);
}
.ps_zp_03{
	position: absolute;
	top: 22px;
	left: 50%;
	transform: translateX(-50%);
}
.ps_zp_03>span{
	cursor: pointer;
	position: relative;
	display: inline-block;
	vertical-align: top;
	font-size:14px;
	color:rgba(30,30,30,1);
	line-height:28px;
	margin: 0 41px;
}
.ps_zp_03>span:hover{
	opacity: .7;
}
.ps_zp_03>span.check_d{
	color: #33B3FF;
}
.ps_zp_03>span.check_d:after{
	content: "";
	position: absolute;
	bottom: -20px;
	left: 0;
	background: #33B3FF;
	width:100%;
	height:1px;
}

.ps_zp_05{
	padding: 0 30px;
	line-height: 68px;
	border-bottom: 1px solid rgba(0,0,0,0.1);
	font-size:16px;
	color:rgba(40,40,40,1);

}
.ps_zp_06{
	position: relative;
	display: inline-block;
	vertical-align: top;
}
.ps_zp_07{
	padding: 30px;
}
.ps_zp_08{
	margin-left: 16px;
	font-size:12px;
	color:rgba(187,187,187,1)
}
.ps_zp_06x{
	position: absolute;
	top: 50%;
	left: -14px;
	transform: translateY(-50%);
	border-radius: 50%;
	width:6px;
	height:6px;
	background:rgba(255,59,48,1);
}
</style>
