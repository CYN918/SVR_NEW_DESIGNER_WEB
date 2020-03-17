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
						<img v-if="" :src="el.cover_img?el.cover_img:el.url">
						<span class="tim_013" v-if="el.play_time">{{el.play_time}}</span>
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
			list:[],
			noGd:'',
			isnoData:'',
			page:1,
					
		}
	},
	mounted: function () {
		this.getList();
		
	}, 		
	methods:{
		checkV(el){
			let pr = {};
			if(el.file_type=='image'){
				pr={
					type: "pic",
					file_url: el.url,
					fid:el.fid,
					start: 0,			
					end: 5,
					long:5,
					maxlong:5,
					cut_start: 0,
					cut_end: 5,
					bgimg:el.url,
				}
			}
			if(el.file_type=='video'){
				pr = {
					type: "video",
					file_url: el.url,
					start: 0,
					end: el.play_time,
					cut_start: 0,
					cut_end: el.play_time,
					long:el.play_time,
					fps_pic:el.fps_pic,
					fps:el.fps,
					fid:el.fid,	
					maxlong:el.play_time,
				};				
			}			
			let ond = this.value.media[this.value.media.length-1];
			if(ond){
				pr.start = ond.end;
				pr.end = +pr.start+(+el.play_time);
			}else{
				this.$parent.setvideo(el.url);
			}
			if(el.file_type=='video' && this.value.bflist.indexOf(el.url)==-1){
				this.value.bflist.push(el.url);
				var a = document.createElement('video');
				a.src=el.url;
			}			
			this.value.maxTime = +pr.long+this.value.maxTime;
			this.value.media.push(pr);		
	
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
				cover_img:'',
				type:'up',
				fps_pic:'',
				fps:'',
				play_time:'',
				fid:'',
			};
			if(fld.type=='video/mp4'){
				formData.append('fps_pic',1);
				let vo = document.createElement('video');
				vo.src=URL.createObjectURL(fld);
				pr.play_time = vo.duration;
			}
			
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
						p.cover_img = da.cover_img;
						p.fps_pic = da.fps_pic;
						p.fid = da.fid;
						p.play_time = da.play_time;
						p.fps = da.fps;
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
		
		getList(){
			let app_secret = '6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY',
			times = (Date.parse(new Date())/1000),
			arr = [
				1001,
				app_secret,
				window.userInfo.open_id,
				times
			],
			params = {
				app_id:1001,
				sign:this.MD5(encodeURIComponent(arr.sort())),
				user:window.userInfo.open_id,
				timestamp:times,
				// file_type:'',
				relation_type:'mobile_show',
				limit:40,
				page:this.page,
			};
			
			this.api.fileList(params).then((da)=>{
				if(da=='error'){
					return
				}
				if(da.data.length==0 || !da){
					this.noGd=1;
				}
				if(da.data.length==0 && this.list.length==0){
					this.isnoData=1;
				}else{
					this.isnoData='';
				}
				this.total = da.total;
				if(this.list.length>0){
					this.list = this.list.concat(da.data);
					return
				}
				this.list =da.data;
				
			}).catch(()=>{
				
			});
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
