<template>
	<div>
		<div class="tols_02">
			<video 
			class="videos" 		
			:src="value.video" 
			ref="yspic1"></video>
		</div>
		<div class="too_ad_01" v-if="!adio.src">
			<div class="pend too_ad_01_1">选择音频</div>
			<div class="too_ad_01_2">视频原声暂不支持使用，仅限选择音频库内的音乐，作为来电秀BGM</div>
		</div>
		
		<div v-else class="tols_03">
			<img @click="bf" class="tols_03_1 pend" :src="imgPath+'new/tools/Upload_icon_video_24.svg'"/>
			<img @click="backbf" class="tols_03_2 pend" :src="imgPath+'new/tools/sc_icon_sctp.svg'"/>
		</div>
		<component v-bind:is="tanData.zj" v-model="tanData" ref="tcZjs"></component>		
	</div>
	
</template>

<script>
import mp3List from './mp3List'
export default{
	components:{
		mp3List
	},
	props:{
		value:Object,
	},
	data(){
		return{
			adio:{
				
			},
			tanData:{
				zj:'mp3List',
				
			}
		}
	}
	
}	
</script>

<style>
.too_ad_01_1{
	margin: 48px auto 15px;
	margin-bottom: 15px;
	width:120px;
	height:40px;
	background:rgba(51,179,255,1);
	border-radius:5px;
	font-size:14px;
	color:rgba(255,255,255,1);
	line-height:40px;
}
.too_ad_01_2{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
}
</style>
