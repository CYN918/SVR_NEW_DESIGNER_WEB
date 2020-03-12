<template>
	<div class="setMt">
		<div class="setMt_01">
			媒体库<span>请上传图片、MP4格式（视频大小10MB以内，视频上传后自动处理为无声）</span>
		</div>		
		<ul class="setMt_03">
			<li>
				<span @click="push" class="setMtUp">
					<img src="\imge\new\tools\n/up.svg">
					上传视频/图片
				</span>				
			</li>
			<span v-for="(el,index) in list">
				<li v-if="el.type!='erro'">
					<div v-if="el.type=='up'">
						<div class="jdt_002">
							<el-progress :width="48" :stroke-width="2"  type="circle" :percentage="el.bf"></el-progress>
							<span class="jdt_002x">正在上传</span>
						</div>
						
					</div>
					<div @click="checkV(el)" class="setMt_03_01" v-else>
						<img v-if="" :src="el.img?el.img:el.url">
						<span class="tim_013" v-if="el.video_duration">{{el.video_duration}}</span>
					</div>
				</li>
			</span>
		</ul>
		<input class="ycyin" type="file" @change="fileUp" :accept="typexz" multiple="multiple" ref="upnfile"/>
		
	</div>
</template>

<script>
export default{
	props:{
		value:Object,
	},
	data(){
		return{
			typexz:'image/gif,image/jpeg,image/png,video/mp4',
			imgMax:10,
			videoMax:100,
			list:[
				{
					id: "20200026",
					project_id: null,
					open_id: "e272146897b337433a31",
					title: "差三岁",
					desc: "",
					img: "http://zk-new-designer.oss-cn-beijing.aliyuncs.com/b1a81913ea29b29459545f505241851d.jpg",
					user_video_url: "http://res.shiquaner.zookingsoft.com/b1a81913ea29b29459545f505241851d.mp4",
					user_video_size_format: "2.72 MB",
					fps: "24",
					fps_pic: "http://zk-new-designer.oss-cn-beijing.aliyuncs.com/e6173a7504554b126838db43ce823ff2.png",
					audio_m_id: "atzy_ad_80D75790C833DE8F5569BB40AF7AEF08",
					audio_name: "二姑娘",
					audio_author: "程小溪",
					audio_com_id: "",
					video_start: "0.00",
					video_duration: "10.00",
					audio_start: "91.27",
					audio_duration: "10.00",
					file_url: "http://zk-new-designer.oss-cn-beijing.aliyuncs.com/bce447df4f099a2d7ae3dc1797af75a0.mp4",
					file_size: null,
					file_size_format: "",
					duration: null,
					tag: "扁平,极简",
					classify_id: "meizu_keji",
					classify_name: "科技炫光",
					status: "0",
					compose_times: "0",
					created_at: "2020-02-05 14:42:45",
					update_at: "2020-02-05 14:43:23",
					is_del: "0",
				},
				
				{
					id: "20200026",
					project_id: null,
					open_id: "e272146897b337433a31",
					title: "差三岁",
					desc: "",
					img: "http://zk-new-designer.oss-cn-beijing.aliyuncs.com/62be2dc2728590b29e8f5b435d680d4d.jpg",
					user_video_url: "http://res.shiquaner.zookingsoft.com/b1a81913ea29b29459545f505241851d.mp4",
					user_video_size_format: "2.72 MB",
					fps: "24",
					fps_pic: "http://zk-new-designer.oss-cn-beijing.aliyuncs.com/e6173a7504554b126838db43ce823ff2.png",
					audio_m_id: "atzy_ad_80D75790C833DE8F5569BB40AF7AEF08",
					audio_name: "二姑娘",
					audio_author: "程小溪",
					audio_com_id: "",
					video_start: "0.00",
					video_duration: "10.00",
					audio_start: "91.27",
					audio_duration: "10.00",
					file_url: "http://zk-new-designer.oss-cn-beijing.aliyuncs.com/2c15642849b5a56b9b6930a777cdc243.mp4",
					file_size: null,
					file_size_format: "",
					duration: null,
					tag: "扁平,极简",
					classify_id: "meizu_keji",
					classify_name: "科技炫光",
					status: "0",
					compose_times: "0",
					created_at: "2020-02-05 14:42:45",
					update_at: "2020-02-05 14:43:23",
					is_del: "0",
				},
				
				{type:'up',bf:20,}],				
					
		}
	},
	methods:{
		checkV(el){
			let pr = {
				"type": "video",
				"file_url": el.file_url,
				"start": 0,
				"fps_pic":el.fps_pic,
				fps:el.fps,
				"end": el.video_duration,
			};
			let ond = this.value.videos[this.value.videos.length-1];
			if(ond){
				pr.start = ond.end;
				pr.end = pr.start+el.video_duration;
			}else{
				this.$parent.setvideo(el.file_url);
			}
			if(this.value.bflist.indexOf(el.file_url)==-1){
				this.value.bflist.push(el.file_url);
				var a = document.createElement('video');
				a.src=el.file_url;
			}
			
			this.value.maxTime = +el.video_duration+this.value.maxTime;
			this.value.videos.push(pr);
			console.log(this.value.maxTime);
		},
		fileUp(flie){
			for(let i=0,n=flie.target.files.length;i<n;i++){
				this.clPic(flie.target.files[i],i);
			}
			
		},
		clPic(fld,on){
			
			if(fld.type=='video/mp4'){
				if(fld.size>104857600){
					this.$message({
						message:'视频过大请重新选取'
					})
					return
				}
				this.pushFile(fld);
				return
			}			
			if(['image/gif','image/jpeg','image/png'].indexOf(fld.type)!=-1){
				if(fld.size>10485760){
					this.$message({
						message:'图片过大请重新选取'
					})
					return
				}
				this.pushFile(fld);
				return
			}
			this.$message({
				message:'请上传正确格式的媒体'
			})
			return
		},
		
		
		push(){
			this.$refs.upnfile.click();
		},
		pushFile(fld){
			let app_secret = '6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY';
			let times = (Date.parse(new Date())/1000);
			let arr = [
				1001,
				app_secret,
				window.userInfo.open_id,
				times
			];
			let formData = new FormData();
			formData.append('app_id',1001);
			formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
			formData.append('user',window.userInfo.open_id)
			formData.append('file',fld)
			formData.append('relation_type','mobile_show')
			formData.append('timestamp',times)			
			let xhr = new XMLHttpRequest();
			
			let pr={
				bf:0,
				xhr:xhr,
				url:'',
				img:'',
				type:'up'
			};
			if(fld.type=='video/mp4'){
				let vo = document.createElement('video');
				vo.src=URL.createObjectURL(fld);
				pr.long = vo.duration;
			}
			console.log(pr);
			this.list.unshift(pr);
			let p = this.list[0];
			let uploadProgress = (evt)=>{		
				if(evt.lengthComputable) {
					let percent = Math.round(evt.loaded * 100 / evt.total);
			        percent = percent>98?98:percent;
					p.bf  = Math.floor(percent);
				}
				
				
			};
			let uploadComplete = (data)=>{
				if(data.currentTarget.response){
					let daaa = JSON.parse(data.currentTarget.response);
					if(daaa.result!=0){
						this.$message({message:daaa.data});
						return
					}
					let da = daaa.data;
					p.type='ko';
					p.url = da.url;
					if(da.cover_img){
						p.img = da.cover_img;
					}							
					this.$message({message: '文件上传成功'});
				}				
			};
			let uploadFailed = ()=>{
				this.$refs.upnfile.value ='';
				p.type='erro';
				this.$message({message: '文件上传失败请稍后重试'});
				
			};
			let uploadCanceled = ()=>{
				this.$refs.upnfile.value ='';
				p.type='erro';
				this.$message({message: '取消成功'});
				
			};
			xhr.upload.addEventListener("progress",uploadProgress, false);
			xhr.addEventListener("load",uploadComplete, false);
			xhr.addEventListener("error",uploadFailed, false);
			xhr.addEventListener("abort",uploadCanceled, false);
			xhr.open("POST", window.basrul+"/File/File/insert");
			xhr.send(formData);
		},
	}
}
</script>

<style>
.setMt{
	padding: 24px 24px 0 24px;
}
.setMt_01{
	font-size:16px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:24px;
	margin-bottom: 16px;
}
.setMt_01>span{
	margin-left: 8px;
	font-size:12px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:20px;
}
.setMt_03 li{
	cursor: pointer;
	position: relative;
	display: inline-block;
	vertical-align: top;
	width:180px;
	height:100px;
	background:rgba(40,40,40,1);
	border-radius:10px;
	margin: 0 16px 16px 0;
}

.setMt_03 li:after{
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	border-radius:10px;
	background: rgba(0,0,0,.3);
	width: 100%;
	height: 100%;
}
.setMt_03 li:hover:after{
	display: none;
}
.setMtUp{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	font-size:14px;
	color:#fff;
	line-height:20px;
}
.setMtUp>img{
	display: block;
	margin: 0 auto 5px;
	width: 25px;
}
.ycyin{
	display: none;
}
.jdt_002{
	text-align: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	z-index: 2;
	
}
.setMt_03_01{
	width: 100%;
	height: 100%;
}
.setMt_03_01>img{
	display: block;
	height: 100%;
	width: auto;
	margin: 0 auto;
}
.jdt_002 .el-progress__text{
	color: #fff;
}
.jdt_002x{
	display: block;
	text-align: center;
	color: #fff;
	font-size:12px;
}
.tim_013{
	position: absolute;
	bottom: 3px;
	right: 8px;
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:20px;
}
</style>
