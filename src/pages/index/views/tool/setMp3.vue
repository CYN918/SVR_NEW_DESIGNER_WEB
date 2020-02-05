<template>
	<div>
		<div class="too_ad_01" v-if="!value.audio_url">
			<div @click="seletAdio" class="pend too_ad_01_1">选择音频</div>
			<div class="too_ad_01_2">视频原声暂不支持使用，仅限选择音频库内的音乐，作为来电秀BGM</div>
		</div>
		<div class="tols_04x">
			<div class="tols_04">
				<spck
				v-model="type"
				class="tols_04_1 tobtn"
				:List="tab"
				></spck>
			</div>
			<div class="tols_05">	
				<a_vcom 
				v-if="value.audio_url"
				v-model="value"
				ref="setjs"
				></a_vcom>				
			</div>
			
		</div>
		
		<component 
		v-bind:is="tanData.zj" 
		v-model="tanData" 
		ref="tcZjs"></component>
		<audio 
		@timeupdate="timeupdate1" 
		class="ycYo" 
		:src="value.audio_url" 
		ref="aido"></audio>
	</div>
	
</template>

<script>
import mp3List from './mp3List'
import a_vcom from './a_vcom'
import spck from './fospan'

export default{
	components:{
		
		mp3List,
		a_vcom,
		spck
	},
	props:{
		value:Object,
	},
	data(){
		return{
			audio:{
				url:'',
			},
			setData:{},
			tanData:{},
			type:'setMp3',
			tab:[
				{v:'视频',k:'set_Video'},
				{v:'音频',k:'setMp3'}
			],
			starT:0,
			bfT:{
				star:0,				
			}
		}
	},
	watch:{
		'starT'(){		
			this.$refs.aido.pause()
		},
		'type'(){
			this.value.zj = this.type;
		},
	},
	mounted: function () {
		this.init();
	}, 
	methods:{
		init(){
			if(this.value.audio_m_id){
				this.sh_audioUrl(this.value.audio_m_id);
			}
		},
		sh_audioUrl(id){
			this.api.sh_audioUrl({
				m_id:id
			}).then((da)=>{
				if(da=='error'){return}
				this.value.audio_url = da
				this.video_len = this.value.video_endT-this.value.video_starT;
				this.value.audio_endT = this.video_len;
				this.value.audio_max = this.$refs.aido.duration;
				
			})
		},
		
		
		setEnd(t){
			this.value.audio_starT = t;	
			this.value.audio_endT = +t+this.video_len;
			
		},
		setAdio(u,t){
			this.value.audio_url = u;
			this.value.audio_max = t.duration;
			this.video_len = this.value.video_endT-this.value.video_starT;
			this.value.audio_endT = this.video_len;
			this.value.audio_m_id=t.m_id;
			this.value.audio_name=t.name;
			this.value.audio_author=t.author;
			
			
		
		},
		seletAdio(){
			this.tanData = {zj:'mp3List'};
		},
		bf(){
			let t = this.$refs.aido.currentTime;
			if(t>=(this.value.audio_starT+this.video_len) || t<this.value.audio_starT){
				this.$refs.aido.currentTime = this.value.audio_starT;
			}
			
			this.$refs.aido.play();
		},
		backbf(){
			this.$refs.aido.currentTime = this.value.audio_starT;
			this.$refs.aido.play();
		},
		timeupdate1(){
			let t = this.$refs.aido.currentTime;	
	
			if(t>=(this.value.audio_starT+this.video_len)){
				this.$refs.aido.pause();
			};			
		},
		
		
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
