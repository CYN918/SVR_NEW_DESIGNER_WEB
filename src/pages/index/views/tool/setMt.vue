<template>
	<div class="setMt">
		<div class="setMt_01">
			媒体库<span>请上传图片、MP4格式（视频大小10MB以内，视频上传后自动处理为无声）</span>
		</div>		
		<ul class="setMt_03">
			<li ref="dwyd">
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
					<div  class="setMt_03_01" v-else>
						<img v-if="" :src="el.cover_img?el.cover_img:el.url">
						<span class="tim_013" v-if="el.play_time">{{el.play_time}}</span>
					</div>
					
					<div @click="checkV(el)" class="tim_xz">+</div>
					<div @click="delt(el,index)" class="tim_xzsx"><img  src="/imge/tools/sc.png"/></div>
					
				</li>
			</span>
		</ul>
		<input class="ycyin" type="file" @change="fileUp" :accept="typexz" multiple="multiple" ref="upnfile"/>
		<div v-if="istype" class="pr_tc_01">
			<div class="pr_tc_02">			
				<div class="pr_tc_04">
					删除确认<img @click="close" class="pr_tc_03 pend" src="/imge/project/cj_00.svg" alt="">
				</div>
				<div class="qxBm_btns_1">是否确定删除?删除后将永久消失</div>	
				<div class="qxBm_btns">
					<div @click="close" class="btns pend">取消</div>		
					<div @click="qdFn" class="btns btns_js pend">确定</div>										
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import t_qr from '../../components/t_qr';
export default{
	components:{t_qr},
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
			deldetType:0,
			istype:'',
			maxwj:0,
		}
	},
	mounted: function () {
		this.getList();
		
	}, 		
	methods:{
		fileTotalSummary(){
			this.api.fileTotalSummary({
				relation_type:'mobile_show'
			}).then((da)=>{
				if(da=='error'){
					return
				}
				this.maxwj = da.sum;
				
			})
		},
		close(){
			this.istype = '';
		},
		delt(el,index){
			
			if(this.deldetType==1){
				this.$message({
					message:'正在删除请稍后'
				})
				return
			}
			this.istype = {data:el,on:index};
		},
		checkV(el){
		
			let pr = {
				x:0,y:0,w:0,h:0,sx:0,sy:0,sw:0,sh:0,
				yw:0,yh:0,
				file_url: el.url,
				fid:el.fid,
				cut_start: 0,
				ischeck:'',
				start:0,
				
			};
			if(el.file_type=='image'){
				var pd = {
					type: "pic",
					end: 5,
					long:5,
					maxlong:5,
					cut_end: 5,
					cover_img:el.url,
				};
				pr = Object.assign(pr,pd);
			}
			if(el.file_type=='video'){
				var pd = {
					type: "video",
					end: el.play_time,
					cut_end: el.play_time,
					long:el.play_time,
					fps_pic:el.fps_pic,
					fps:el.fps,
					maxlong:el.play_time,					
					cover_img:el.cover_img,					
				};
				pr = Object.assign(pr,pd);				
								
			}			
			let ond = this.value.media[this.value.media.length-1];
			if(ond){
				pr.start = +ond.start+(ond.cut_end-ond.cut_start);					
			}
		
			if(el.file_type=='image'){
				var a = document.createElement('img');
				a.src=el.url;
				a.onload = ()=>{
					let wd = a.width,
					hd = a.height;
					
					pr.yw = wd;
					pr.yh =  hd;
					pr.sw = wd;					
					pr.sh = hd;
					
					if(wd>hd){
						pr.w = 391;
						pr.h = (391/wd)*hd;
						pr.y = (695-pr.h)/2
					}else{
						pr.h = 695;
						pr.w = (695/hd)*wd;
						pr.x = (391-pr.w)/2;
					}
									
					this.value.maxTime = +pr.long+this.value.maxTime;
					this.value.media.push(pr);						
					if(!ond){
						this.$parent.drmImgs();
					}
				};
		
			}
			if(el.file_type=='video'){
				var a = document.createElement('video');
				a.src=el.url;
				a.onloadeddata=(e)=>{
					let wd = e.path[0].videoWidth,
					hd = e.path[0].videoHeight;
					pr.yw = wd;
					pr.yh =  hd;
					pr.sw = wd;					
					pr.sh = hd;
					if(wd<hd){
						pr.h = 695;
						pr.w = (695/hd)*wd;
						pr.x = (391-pr.w)/2;
					}else{
						pr.w = 391;
						pr.h = (391/wd)*hd;
						pr.y = (695-pr.h)/2
					}
			
					let maxt = +pr.start+(+pr.long);
					
					if(this.value.maxTime<maxt){
						this.value.maxTime = maxt;
					}	
					
					this.value.media.push(pr);	
					
					if(!ond){
						this.$parent.setvideo(el.url);
					}
				}
			}			
			
		
	
		},
		fileUp(flie){
			for(let i=0,n=flie.target.files.length;i<n;i++){
				this.clPic(flie.target.files[i],i);
			}
			
		},
		qdFn(){
			
			let el = this.istype.data;
			let index = this.istype.on;
		
			
			let times = (Date.parse(new Date())/1000);
			let arr = [
				1001,
				window.userInfo.open_id,
				times
			];
			let formData = new FormData();
			formData.append('app_id',1001);
			formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
			formData.append('user',window.userInfo.open_id)
			formData.append('fid',el.fid)
			formData.append('timestamp',times)
			formData.append('mobile_show',1)
			this.deldetType=1;
			this.$ajax.post(window.basrul+'/File/File/delete', formData)
			.then((da)=>{
				this.deldetType=0;
				if(da.data.result==0){
					this.$message({
						message:'删除成功'
					})
					this.list.splice(index,1);
					this.close();
					return
				
				}
				this.$message({
					message:'删除失败'
				})
			
			})
			.catch(()=>{	
				this.deldetType=0;
				this.$message({
					message:'删除失败'
				})
			});
		},
		clPic(fld,on){
			let max = 5*1024*1024;			
			if(this.maxwj>=max){
				this.$message({
					message:'媒体素材储存量已满（5G）'
				})
				this.$refs.upnfile.value = '';
				return
			}
			if((+fld.size+this.maxwj)>max){
				this.$message({
					message:'视频过大媒体素材储存超过上限（5G）'
				})
				this.$refs.upnfile.value = '';
				return
			}			
			if(fld.type=='video/mp4'){
				if(fld.size>104857600){
					this.$message({
						message:'视频过大请重新选取'
					})
					this.$refs.upnfile.value = '';
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
			if(fld.type=='image/gif'){
				formData.append('set_ini','{"convert":"mp4"}')
				formData.append('fps_pic',1);
			}	
				
			
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
					p.file_type = da.file_type;
					p.fid = da.fid;
					if(da.cover_img){
						p.cover_img = da.cover_img;
						p.fps_pic = da.fps_pic;
						
						p.play_time = da.play_time;
						p.fps = da.fps;						
					}	
					this.$refs.upnfile.value ='';
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
		
			this.$parent.setips(this.$refs.dwyd.getBoundingClientRect());
			this.fileTotalSummary();
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
					this.$parent.showTip();
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

	position: relative;
	display: inline-block;
	vertical-align: top;
	width:180px;
	height:100px;
	overflow: hidden;
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
.tim_xz{
	cursor: pointer;
	display: none;
	position: absolute;
	top: 8px;
	right: 8px;
	background: #33B3FF;
	border-radius: 50%;
	text-align: center;
	line-height: 18px;
	color: #fff;
	font-size: 21px;
	width:18px;
	height:18px;
}
.tim_xzsx{
	cursor: pointer;
	display: none;
	position: absolute;
	top: 8px;
	left: 8px;
	background: rgba(0,0,0,.2);
	border-radius: 50%;
	width: 18px;
	height: 18px;
}
.tim_xzsx>img{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 11px;
}
.setMt_03 li:hover .tim_xz{
	display: block;
}
.setMt_03 li:hover .tim_xzsx{
	display: block;
}
</style>
