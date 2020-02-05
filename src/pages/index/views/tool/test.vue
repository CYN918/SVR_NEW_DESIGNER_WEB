<template>
	<div class="box_01x">
		<div>
			<div class="tols_01">
				<span @click="go('/tolt/toluser')" class="tols_01_1 pend" >
					<img :src="imgPath+'new/tools/icon_back.svg'" />返回
				</span>
				<div class="tols_01_2">
					<div :class="onType==inx?'oncke':''" v-for="(el,inx) in topNav">
						<span>{{inx+1}}</span>{{el.n}}
					</div>
				</div>
				<div class="tols_01_4">
					<span v-if="onType>0" @click="Previous" class="pend btn_n">上一步</span>
					<span @click="sh_save" class="pend btn_n">保存</span>
					<span v-if="onType<topNav.length-1" @click="next" class="pend btn_n btn_n3">下一步</span>
				</div>
				
			</div>
			<div v-if="onType!=2" class="tols_02">
				<video 
				muted
				class="videos" 
				v-if="form.video_url" 
				:src="form.video_url" 
				@timeupdate="timeupdate"
				ref="yspic1"></video>
				<div v-else-if="onload" class="tols_02_x_1">
					<el-progress  type="circle" :percentage="bfb"></el-progress>
				</div>
				
				<div v-else class="tols_02_1" @click="upfile">
					<img class="tols_02_2" :src="imgPath+'new/tools/icon_add_small.svg'"/>
					<div class="tols_02_3">上传视频</div>
					<div class="tols_02_4">
						来电秀视频需裁剪至30秒内，限上传mp4格式，最小不低于720（宽）
					</div>
				</div>
			</div>
			
			<div v-if="onType!=2 && form.video_url" class="tols_03">
				<img @click="bf" class="tols_03_1 pend" :src="imgPath+'new/tools/Upload_icon_video_24.svg'"/>
				<img @click="backbf" class="tols_03_2 pend" :src="imgPath+'new/tools/sc_icon_sctp.svg'"/>
			</div>
			<component v-if="form.video_url"  v-bind:is="topNav[onType].t" v-model="form" ref="vid"></component>
		</div>				
		<input class="fileipd" @change="sup" type="file" ref="upfile"/>
		
		<video @canplay="yzfn" class="ycYo" :src="yaz" ref="yaz"></video>
		
	</div>
	
	

</template>

<script>
import btnSc from './togBtn';
import textD from './textD';
import setVideo from './set_Video';
import setAdio from './setMp3';
import setSave from './setSave';

export  default{

	components:{btnSc,textD,setVideo,setAdio,setSave},
	data(){
		return{
			topNav:[
				{n:'选取视频',t:'setVideo',ckFn:'checkA',prFn:'saveA'},
				{n:'选取音频',t:'setAdio',ckFn:'checkB',prFn:'saveB'},
				{n:'保存提交',t:'setSave',ckFn:'checkC',prFn:'saveC'},
			],
			onType:0,
			form:{
				zj:'setVideo',
				video_starT:0,
				video_endT:0,
				video_len:0,
				video_url:'',
				video_max:'',
				video_fps:0,
				video_sd:'1.0',
				video_cover_img:'',
				video_fps_pic:'',
				video_file_size_format:0,
				audio_url:'',
				audio_starT:0,
				audio_endT:0,
				audio_max:0,				
			},
			
			Id:'',

			videoObj:'',
			onload:'',
			bfb:0,
			yaz:'',
			ajaxType:'',
		}
	},
	mounted: function () {
		this.init();
	}, 
	methods:{
		Previous(){
			if(this.onType>0){
				if(this.onType==2 && this.ajaxType){
					this.$message({
						message:'正在制作请稍后'
					})
					
					return
				}
				this.onType--;
				return
			}
		},
		next(){
			if(this.onType==2 && this.ajaxType){
				this.$message({
					message:'正在制作请稍后'
				})
				
				return
			}
			let len = this.topNav.length;		
			if(this.onType<len){
				if(this[this.topNav[this.onType].ckFn]()){
					return
				}
				this.onType++;
				return
			}
		},
		go(to){
			this.$router.push({path:to});	
		},
		checkA(){
			if(!this.form.video_url){
				this.$message({
					message:'请先上传视频'
				})
				return true
			}
			return false
		},
		checkB(){
			if(!this.form.audio_m_id){
				this.$message({
					message:'请先选择音频'
				})
				return true
			}
			return false
		},
		checkC(){
			
			return false
		},
		saveA(){
			return {
				img:this.form.video_cover_img,
				user_video_url:this.form.video_url,
				user_video_size_format:this.form.video_file_size_format,
				fps:this.form.video_fps,
				fps_pic:this.form.video_fps_pic,
				video_start:this.form.video_starT.toFixed(2),
				video_duration:(this.form.video_endT-this.form.video_starT).toFixed(2),	
			}
		},
		saveB(){
			let pr = this.saveA(),
			pb = {
				audio_m_id:this.form.audio_m_id,
				audio_name:this.form.audio_name,
				audio_author:this.form.audio_author,
				audio_start:this.form.audio_starT.toFixed(2),
				audio_duration:(this.form.video_endT-this.form.video_starT).toFixed(2),
			};
			Object.assign(pr,pb);
			return pr;
		},
		saveC(hc){
			let pr = this.saveB(),
			pb = {
				title:this.form.title,
				classify_id:this.form.fls.classify_id,
				classify_name:this.form.fls.classify_name,
			
				tag:this.form.tag.join(),				
			};
			Object.assign(pr,pb);
			if(hc){
				pr.compose = 1;
				pr.submit = 1;
			}
			return pr;
		},

		sh_save(){
			
			if(this[this.topNav[this.onType].ckFn]()){
				return
			}
			
			let pr = this[this.topNav[this.onType].prFn]();
			if(this.form.id){
				pr.id = this.form.id;
			}
			this.ajaxType =1;
			if(this.onType==2){
				this.$refs.vid.starHc();
			}
			
			this.api.sh_save(pr).then((da)=>{
				
				
				this.ajaxType = '';
				if(da=='error'){
					if(this.onType==2){
						this.$refs.vid.stopHc();
					}
					return
				}
				if(this.onType==2){
					this.$refs.vid.stopHc(1);
				}
				this.$message({
					message:'保存成功',
				})
				this.form.id = da.id;

			}).catch(()=>{
				if(this.onType==2){
					this.$refs.vid.stopHc();
				}
				this.ajaxType = '';
			})
		},
		init(){
			
			if(this.$route.query.id){
				let op = JSON.parse(localStorage.getItem('ldxData'));
				
				this.form = {
					id:op.id,
					title:op.title,
					zj:'setVideo',
					video_starT:+op.video_start,
					video_endT:(+op.video_start+op.video_duration),
					video_len:0,
					video_url:op.user_video_url,
					video_max:'',
					video_fps:op.fps,
					video_sd:'1.0',
					video_cover_img:op.img,
					video_fps_pic:op.fps_pic,
					video_file_size_format:op.user_video_size_format,
					audio_url:'',
					audio_starT:+op.audio_start,
					audio_endT:(+op.audio_start+op.audio_duration),
					audio_max:0,	
					audio_m_id:op.audio_m_id,
					audio_name:op.audio_name,
					audio_author:op.audio_author,
					tag:op.tag.split(','),
					fls:{
						classify_id:op.classify_id,
						classify_name:op.classify_name,
					},	
				}
			}	
			// 
				
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
	
			let time = this.$refs.yaz.duration,
			wid = this.$refs.yaz.videoWidth;
			if(time>600){
				this.$message({
					message:'视频太长了请上传10分钟以内的视频'
				})
				this.clerI();
				return
			}			
			// if(wid<720){
			// 	this.$message({
			// 		message:'视频尺寸太小了请上传至少宽度720'
			// 	})
			// 	this.clerI();
			// 	return
			// }
			this.form.video_max = time;
			let t = 30;
			if(time<30){
				t = time;
			}
			this.form.video_endT = t;

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
			
			this.onload =1;
			this.$ajax.post(window.basrul+'/File/File/insert',formData,{
				headers: {'Content-Type': 'multipart/form-data'},
				onUploadProgress: progressEvent => {
					this.bfb = (progressEvent.loaded / progressEvent.total * 100 | 0);
				}
			}).then((da)=>{	
				this.onload ='';
				let ds = da.data;
				if(ds.result==0){
					this.form.video_url = ds.data.url;
					this.form.video_fps = ds.data.fps;
					this.form.video_cover_img = ds.data.cover_img;
					this.form.video_fps_pic = ds.data.fps_pic;
					this.form.video_file_size_format = ds.data.file_size_format;
					return
				}
			}).catch(()=>{
				this.onload ='';
			})
		},
		timeupdate(){
			let t = this.$refs.yspic1.currentTime;
			
			if(t>=this.form.video_endT){
				this.$refs.yspic1.pause();
			};			
		},
		bf(){
			let t = this.$refs.yspic1.currentTime;
			if(t<this.form.video_starT || t>=this.form.video_endT){
				this.$refs.yspic1.currentTime = this.form.video_starT;
			}
			this.$refs.yspic1.play();
			if(this.$refs.vid.pao){
				this.$refs.vid.pao();
			}
			
			if(this.$refs.vid.bf){
				this.$refs.vid.bf();
			}
			
		},
		backbf(){
			this.setcurrentTime(this.form.video_starT);
			this.bf();	
			if(this.$refs.vid.backbf){
				this.$refs.vid.backbf();
			}		
		},
		pause(){
			this.$refs.yspic1.pause();
			// this.$refs.vid.stop();
		},
		setcurrentTime(t){
			this.$refs.yspic1.currentTime = t;
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
.tols_01_2>div{
	display: inline-block;
	vertical-align: top;
	font-size:14px;
	color:rgba(187,187,187,1);

}
.tols_01_2>div>span{
	display: inline-block;
	vertical-align: top;
	margin: 12px 8px 0 0;
	font-size:14px;
	color:rgba(0,0,0,0.25);
	line-height:23px;
	text-align: center;
	border-radius: 50%;
	width:22px;
	height:22px;
	border:1px solid rgba(0,0,0,0.15);
}
.tols_01_2>div:after{
	content: "";
	display: inline-block;
	vertical-align: top;
	margin: 24px 8px 0;
	width:48px;
	height:1px;
	background:rgba(0,0,0,0.15);
}
.tols_01_2>div:last-child:after{
	display: none;
}
.tols_01_2>div.oncke{
	color: #000;
}
.tols_01_2>div.oncke>span{
	border-color: #33B3FF;
	color: #33B3FF;
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
.tols_01_4>span{
	margin-left:15px;
}

.tols_02{
	position: relative;
	margin: 60px auto 0;
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

.tols_02_x_1{
	position: absolute;
	top:50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
}
</style>
