<template>
	<div class="box_01x">
		<div>
			<div class="tols_01">
				<span class="tols_01_1 pend" >
					<img :src="imgPath+'new/tools/icon_back.svg'" />返回
				</span>
				
				<div class="tols_01_2">
				
					<span class="tols_01_3">
						<span>{{title}}</span>
						<input v-model="title" type="text">
					</span>
					
					<img :src="imgPath+'new/tools/icon_bj.svg'" >
				</div>
				
				
				<div class="tols_01_4">
					<span class="pend btn_n">保存</span><span class="btn_n btn_n3">下一步</span>
				</div>
				
			</div>
			
			
			<div class="tols_02">
				<!-- <div class="videos2" :style="videos" v-if="!form.video.url">
					
				</div> -->
				<video 
				class="videos" 
				v-if="video.url" 
				:src="video.url" 
				@timeupdate="timeupdate"
				ref="yspic1"></video>
				
				<el-progress v-else-if="onload" type="circle" :percentage="bfb"></el-progress>
				<div v-else class="tols_02_1" @click="upfile">
					<img class="tols_02_2" :src="imgPath+'new/tools/icon_add_small.svg'"/>
					<div class="tols_02_3">上传视频</div>
					<div class="tols_02_4">
						来电秀视频需裁剪至30秒内，限上传mp4格式，最小不低于720（宽）
					</div>
				</div>
			
			</div>
			
			<div class="tols_03">
				<img @click="bf" class="tols_03_1 pend" :src="imgPath+'new/tools/Upload_icon_video_24.svg'"/>
				<img @click="backbf" class="tols_03_2 pend" :src="imgPath+'new/tools/sc_icon_sctp.svg'"/>
			</div>
			
			<div class="tols_04x">
				<div class="tols_04">
					<div class="tols_04_1 tobtn">
						<span class="chekd">视频</span>
					</div>
					<div class="tols_04_2 tobtn">
						<span 
						@click="sdbq(el)"
						v-for="el in sd_01"
						:class="['pend',video.sd==el?'chekd':'']"
						>{{el}}x</span>
					</div>
				</div>
				
				
				<div class="tols_05">
					
					
					<videoSet v-model="video" ref="vid"></videoSet>
					
				</div>
				
			</div>
			
			
		</div>
		
		
		<input class="fileipd" @change="sup" type="file" ref="upfile"/>
		
		<video @canplay="yzfn" class="ycYo" :src="yaz" ref="yaz"></video>
		
	</div>
	
	

</template>

<script>
import btnSc from './togBtn';
import textD from './textD';
import videoSet from './videoSet';
export  default{

	components:{btnSc,textD,videoSet},
	data(){
		return{
			title:'来电秀模板',
			sd_01:[
				'2.25',
				'0.5',
				'1.0',
				'1.25',
				'1.5'
			],
			video:{
				starT:0,
				endT:0,
				url:'',
				max:'',
				fps:0,
				sd:'1.0',
				cover_img:'',
			},
			videoObj:'',
			onload:'',
			bfb:0,
			yaz:''
		}
	},
	mounted: function () {
		this.init();
	}, 
	methods:{
		init(){
				
		},
		upfile(){
			this.$refs.upfile.click();
		},		
		sup(e){
			if(!e.target.files[0]){
				return
			}
			let video = e.target.files[0];
			this.videoObj = video;
			if(video.name.split('.')[1]!=='mp4'){
				this.$refs.upfile.value = '';
				this.videoObj = '';
				this.$message({
					message:'格式不正确请上传MP4'
				})
				return
			}	
			let vi = URL.createObjectURL(video);
			this.yaz = vi;		
		},
		clerI(){
			this.$refs.upfile.value = '';
			this.videoObj = '';
			this.yaz = '';
		},
		yzfn(){
			console.log(this.$refs.yaz);
			let time = this.$refs.yaz.duration,
			wid = this.$refs.yaz.videoWidth;
			if(time>600){
				this.$message({
					message:'视频太长了请上传10分钟以内的视频'
				})
				this.clerI();
				return
			}			
			if(wid<720){
				this.$message({
					message:'视频尺寸太小了请上传至少宽度720'
				})
				this.clerI();
				return
			}
			this.video.max = time;
			let t = 30;
			if(time<30){
				t = time;
			}
			this.video.endT = t;
			this.pushVideo();					
		},
		
		pushVideo(a){
			let times = (Date.parse(new Date())/1000),
			arr = [1001,window.userInfo.open_id,times],
			formData = new FormData();
			formData.append('app_id',1001);
			formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
			formData.append('user',window.userInfo.open_id)
			formData.append('file',this.videoObj)
			formData.append('relation_type','work')
			formData.append('related_id',window.userInfo.open_id)
			formData.append('timestamp',times)
			formData.append('fps_pic',1)
			
			
			this.$ajax.post(window.basrul+'/File/File/insert',formData,{
				headers: {'Content-Type': 'multipart/form-data'},
				onUploadProgress: progressEvent => {
					this.bfb = (progressEvent.loaded / progressEvent.total * 100 | 0);
				}
			}).then((da)=>{	
				let ds = da.data;
				if(ds.result==0){
					this.video.url = ds.data.url;
					this.video.fps = ds.data.fps;
					this.video.cover_img = ds.data.fps_pic;
					
					
					return
				}
			})
		},
		timeupdate(){
			let t = this.$refs.yspic1.currentTime;
			
			if(t>=this.endT){
				this.$refs.yspic1.pause();
			};			
		},
		bf(){
			this.$refs.yspic1.currentTime = this.starT;
			this.$refs.yspic1.play();
			this.$refs.vid.pao(this.endT-this.starT);
		},
		backbf(){
			this.setcurrentTime(this.form.star);
			this.bf();			
		},
		setEnd(t){
			this.endT = t;
		},
		setStar(t){
			this.starT = t;
		},		
		setcurrentTime(t){
			this.$refs.yspic1.currentTime = t;
		},
		sdbq(on){
			this.video.sd = on;
		},
	}
}
</script>

<style>
#app > div.box_01x{
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
	background: #F4F6F9;
}
#app>div.box_01x>div{
	position: relative;
	box-sizing: border-box;
	min-height: 0;
	padding: 0;
	background: #F4F6F9;
	padding-bottom: 60px;
}
.tols_01{
	position: relative;
	text-align: left;
	height: 48px;
	line-height:48px;
	background:rgba(255,255,255,1);

}
.tols_01_1{
	cursor: pointer;
	position: absolute;
	top: 14px;
	left: 24px;
	font-size:14px;
	color:rgba(187,187,187,1);
	line-height:20px;
}

.tols_01_1>img{
	display: inline-block;
	vertical-align: top;
	margin: 3.5px 9px 0 0;
	width: 7px;
}
.tols_01_2{
	text-align: center;
}
.tols_01_2>input{
	min-width: 40px;
	border: none;
	background: none;
}
.tols_01_2>img{
	display: inline-block;
	vertical-align: top;
	margin: 18px 0 0 10px;
	width: 13px;
}
.tols_01_3{
	position: relative;
	margin-top: 14px;
	display: inline-block;
	vertical-align: top;
	font-size:14px;

	color:rgba(30,30,30,1);
	line-height:20px;
	
}
.tols_01_3>span{
	opacity: 0;
}
.tols_01_3>input{
	
	position: absolute;
	top: 0;
	left: 0;
	border: none;
	background: none;
	width: 100%;
	font-size:14px;
	
	color:rgba(30,30,30,1);
	line-height:20px;
}
.tols_01_4>span{
	display: inline-block;
	
	vertical-align: top;
	line-height: 30px;	    
	width: 78px;
	height: 30px;	
}
.tols_01_4{
	position: absolute;
	top: 8px;
	right: 20px;
	
}
.tols_01_4>span.btn_n3{
	margin-left: 15px;
}

.tols_02{
	position: relative;
	margin: 159px auto 0;
	width:375px;
	height:667px;
	background:rgba(255,255,255,1);
	border-radius:5px;

}
.tols_02>.videos{
	display: block;
	width: 100%;
	height: 100%;
	
}
.tols_02>.videos2{
	display: block;
	width: 100%;
	height: 100%;
	background-position:0 0;
	background-size:auto 100%;
	background-repeat: no-repeat;
}
.tols_02_1{
	cursor: pointer;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
}
.tols_02_2{
	display: block;
	margin: 0 auto 10px;
	width: 24px;
}
.tols_02_3{
	font-size:14px;
	color:rgba(30,30,30,1);
	line-height:20px;
	margin-bottom: 23px;
}
.tols_02_4{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
}
.fileipd,.rdVideo{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 0;
	height: 0;
	border: none;
	background: none;
}
.tols_03{
	margin-top: 28px;
}
.tols_03>img{
	display: inline-block;
	vertical-align: top;
}
.tols_03_1{
	width: 20px;
	margin-right: 30px;
}
.tols_03_2{
	width: 16px;
}
.tols_04x{
	margin: 0 auto;
	width: 1300px;
}
.tols_04{
	position: relative;
	line-height: 32px;
	text-align: left;
	margin-bottom: 34px;
}
.tols_04>div,
.tols_04_1>span,.tols_04_2>span{
	display: inline-block;
	vertical-align: top;
}
.tols_04_1>span{
	width:78px;
	height:30px;
	margin-right: 10px;
}

.tols_04_2{
	position: absolute;
	right: 0;
	top: 0;
	
}

.tobtn>span{

	text-align: center;
	line-height: 30px;
	background:rgba(255,255,255,1);
	border:1px solid rgba(217,217,217,1);
	
}
.tobtn>span.chekd{
	background: #33B3FF;
	border-color: #33B3FF;
	color:#fff;
}
.tols_04_2>span{
	width:58px;
	height:30px;
	margin-left: 10px;
}


</style>
