<template>
	<div class="setMt">
		<div class="setMt_01">
			媒体库<span>请上传图片、MP4格式（视频大小10MB以内，视频上传后自动处理为无声）</span>
		</div>
		<div class="setMt_03box">
		<ul class="setMt_03">
			<li ref="dwyd" @click="push" class="rsc_002">
				<span  class="setMtUp">
					<img src="\imge\new\tools\n/up.svg">
					上传视频/图片
				</span>				
			</li>
			<span v-for="(el,index) in list">
				<li  v-if="el.type!='erro'">
					<div v-if="el.type=='up'">
						<div class="jdt_002">
							<el-progress :width="48" :stroke-width="2"  type="circle" :percentage="el.bf"></el-progress>
							<span class="jdt_002x">正在上传</span>
						</div>
						
					</div>
					<div @mousedown="starD($event,el)" @mouseover="ybf(index,el)" class="setMt_03_01" v-else>
						<img :src="el.cover_img?el.cover_img:el.url">
						<video muted class="video" ref="video" :src="el.url"></video>
						<span class="tim_013" v-if="el.play_time">{{backtio(el.play_time)}}</span>
						<span class="tim_014" v-if="IsSelect(el.fid)">
							<img width="19px" src="../../../../assets/icon_mt_usemt.png" alt="">
						</span>
					</div>
					
					<div @click="checkV(el)" class="tim_xz"><img width="100%" src="../../../../assets/icon_add_small.png" alt=""></div>
					<div @click="delt(el,index)" class="tim_xzsx"><img width="100%" src="../../../../assets/sc_icon_delete.png"/></div>
					
				</li>
			</span>
		</ul>
		</div>
		<input class="ycyin" type="file" @change="fileUp" :accept="typexz" multiple="multiple" ref="upnfile"/>
		<div v-if="istype" class="pr_tc_01">
			<div class="pr_tc_02">			
				<div class="pr_tc_04">
					删除确认<img @click="close" class="pr_tc_03 pend" src="/imge/project/cj_00.svg" alt="">
				</div>
				<div class="qxBm_btns_1 qxBm_btns_1x2">是否确定删除?删除后将永久消失</div>	
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
			Isvideo:false,
			num:0
		}
	},
	mounted: function () {
		this.getList();
		
	}, 		
	methods:{
		IsSelect(el){
			let id = false;
			//console.log(el);
			this.$parent.navcoms.media.forEach(item=>{
				if(el == item.fid){
					id = true;
				}
			})
			//console.log(id)
			return id;
		},
		ybf(i,el){
			if(el.file_type == 'video'){
				let v = this.$refs.video[i];
				v.currentTime=0;
				v.play();
				let t;
				clearTimeout(t);
				t=setTimeout(function(){
					v.pause();
				}, 3000);
			}
			
		},
		starD(e,el){
			e.preventDefault();
			let tdStar = e.pageX;	
			let wdStar = e.pageY;

			let dom = document.createElement('div');
		
			let url = el.file_type=='image'?el.url:el.fps_pic;
			let tim = el.file_type=='image'?5:el.play_time;
			
			let str = 'z-index:999;background:url('+url+') 0 0/auto 100% repeat-x;width:'+(21*tim)+'px;';
			let ony = 0;
			dom.className = 'testd';
			let brdr = '';
			dom.style.cssText = str+'left:'+e.x+'px;top:'+e.y+'px;';
			document.body.appendChild(dom);
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				e.preventDefault();
				brdr = '';
				let x = e.x;
				let y = e.y;
				if(this.$parent.Mos){
					if((this.$parent.Mos.n=='decorates' && el.file_type=='image') || this.$parent.Mos.n=='media'){
						y = this.$parent.Mos.y;
						brdr = 'border-color:rgba(51,179,255,1)';
					}
					
					
				}
			
				dom.style.cssText = str+'left:'+(x+10)+'px;top:'+y+'px;'+brdr;
				
			}			 
			document.onmouseup =  (e)=>{
		
				if(this.$parent.Mos){
					if(this.$parent.Mos.n=='decorates'){
						// this.setDecorates(el,e.x+10);
						this.setDecorates(el);
						
					}else{
						this.checkV(el,e.x+10);
						// this.checkV(el);
					}
					
				}
				document.body.removeChild(dom);
				document.onmousemove = document.onmouseup = null;
			}
		},
		setDecorates(el,x){
			if(el.file_type!='image'){
				return
			}
			let pr = {
				x:0,y:0,w:0,h:0,sx:0,sy:0,sw:0,sh:0,
				yw:0,yh:0,
				file_url: el.url,
				fid:el.fid,
				file_name:el.file_name,
				cut_start: 0,
				ischeck:'',
				start:0,				
			};
			var pd = {
					type: "pic",
					end: 5,
					long:5,
					maxlong:5,
					cut_end: 5,
					cover_img:el.url,
			};
			pr = Object.assign(pr,pd);
			
			let opb = this.value.decorates[this.$parent.Mos.on];		
			let ond = opb[opb.length-1];
			if(ond){
				pr.start = +ond.start+(ond.cut_end-ond.cut_start);	
				
			}		
			if(x){
				let time = this.$parent.setDomStar(x);
				pr.start = time;
			
			}
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
						pr.w = this.$parent.boxW;
						pr.h = (this.$parent.boxW/wd)*hd;
						pr.y = (this.$parent.boxH-pr.h)/2
					}else{
						pr.h = this.$parent.boxH;
						pr.w = (this.$parent.boxH/hd)*wd;
						pr.x = (this.$parent.boxW-pr.w)/2;
					}
					this.value.decorates[this.$parent.Mos.on].push(pr);
					this.$parent.setPreviewTimes(pr,'decorates',1);
				
					// this.$parent.showDevs(this.$parent.Mos.on,this.value.decorates[this.$parent.Mos.on].length-1);
				};
		},
		backtio(t){
			var f='00',s;
			if(t>60){
				f = Math.round(t/60);
				if(f<10){
					f='0'+f;
				}
			}
			s = Math.round(t%60);
			if(s<10){
				s = '0'+s;
			}
		return f+':'+s;
		},
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
		checkV(el,x){
			let pr = {
				x:0,y:0,w:0,h:0,sx:0,sy:0,sw:0,sh:0,
				yw:0,yh:0,
				file_url: el.url,
				fid:el.fid,
				file_name:el.file_name,
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
				
			// if(x){
			// 	let time = this.$parent.setDomStar(x);
			// 	pr.start = time;
			// 	for(let i=0,n=this.value.media.length;i<n;i++){
			// 		let ob = this.value.media[i];
			// 		let end = this.backEnd(ob);
			// 		let en2 = this.backEnd(pr);
					
			// 		if(en2>=time){
			// 			// break;
			// 		}
					
			// 		if(time>)
					
					
					
			// 	}
			// 	let pn = this.value.media;
			// 	let on = 0;
				
			// 	let clFn = ()=>{
			// 		if(!pn[on]){return}
					
			// 		let end = this.backEnd(pn[on]);
			// 		if(time>pn[on].start && time<)
			// 	};
			// }
			
			
			
			
			
			
			var sumTime = (obj)=>{
				return obj.start+(obj.cut_end-obj.cut_start);
			};
			
			
			
			
			var fn = (obj)=>{
				let n = obj.length;
				if(n==0){
					return
				}
				for(let i=0;i<n;i++){
					let end = sumTime(obj[i]);
					let star = obj[i].start;
					if(pr.start<end){
						break
					}
				}
				
			};
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
						pr.w = this.$parent.boxW;
						pr.h = (this.$parent.boxW/wd)*hd;
						pr.y = (this.$parent.boxH-pr.h)/2
					}else{
						pr.h = this.$parent.boxH;
						pr.w = (this.$parent.boxH/hd)*wd;
						pr.x = (this.$parent.boxW-pr.w)/2;
					}
					
					this.value.media.push(pr);	
					this.$parent.setPreviewTimes(pr,'media',1);	
					this.$parent.drmOn();								
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
						pr.h = this.$parent.boxH;
						pr.w = (this.$parent.boxH/hd)*wd;
						pr.x = (this.$parent.boxW-pr.w)/2;
					}else{
						pr.w = this.$parent.boxW;
						pr.h = (this.$parent.boxW/wd)*hd;
						pr.y = (this.$parent.boxH-pr.h)/2
					}
					this.value.media.push(pr);	
					this.$parent.setPreviewTimes(pr,'media',1);
					this.$parent.drmOn();
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
			let max = 5*1024*1024*1024;	
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
		backEnd(ob){			
			return  +ob.start+ob.cut_end-ob.cut_start;
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
				timestamp:new Date().getTime(),
				
			};
			if(fld.type=='video/mp4'){
				formData.append('fps_pic',1);
				let vo = document.createElement('video');
				vo.src=URL.createObjectURL(fld);
				pr.play_time = vo.duration;
			}
			
			this.list.unshift(pr);
			let p = this.list[0];
			let deletFn = ()=>{
				for(let i=0,n=this.list.length;i<n;i++){
					if(this.list[i].timestamp==p.timestamp){
						this.list.splice(i,1);
						break;
					}							
				}				
			};
			
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
						deletFn();
						return
					}
					let da = daaa.data;
					p.type='ko';
					p.url = da.url;
					p.file_type = da.file_type;
					p.fid = da.fid;
					p.file_name = da.file_name;
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
				deletFn();
				this.$message({message: '文件上传失败请稍后重试'});
				
			};
			let uploadCanceled = ()=>{
				this.$refs.upnfile.value ='';
				deletFn();
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
					
				}
				if(da.data.length==0 && this.list.length==0){
					this.isnoData=1;
					
					if(!this.getCookie('isldxs')){
						this.showTip();
						this.setCookie('isldxs',1,365*24*60*60)
					}
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
		getCookie(name) {
		    var nameEQ = name + "=";
		    var ca = document.cookie.split(';');
		    for (var i = 0; i < ca.length; i++) {
		        var c = ca[i];
		        while (c.charAt(0) == ' ') {
		            c = c.substring(1, c.length)
		        }
		        if (c.indexOf(nameEQ) == 0) {
		            return unescape(c.substring(nameEQ.length, c.length))
		        }
		    }
		    return false
		},
		setCookie(name, value, seconds) {
		    seconds = seconds || 0;
		    var expires = "";
		    if (seconds != 0) {
		        var date = new Date();
		        date.setTime(date.getTime() + (seconds * 1000));
		        expires = "; expires=" + date.toGMTString();
		    }
		    document.cookie = name + "=" + escape(value) + expires + "; path=/";
		}
	}
}
</script>

<style>
.setMt{
	position: relative;
	box-sizing: border-box;
	padding: 24px 0 0 24px;
	height: 100%;
	min-width: 641px;
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
	border:2px solid transparent;
}
.qxBm_btns_1x2{
	text-align: center;
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

.setMt_03 li:hover .video{
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 888;
	width: 100%;
}

.setMt_03 li:hover{
	border-color: rgba(51,179,255,1);
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
	position: relative;
}
.setMt_03_01>img{
	display: block;
	height: 100%;
	width: auto;
	margin: 0 auto;
}

.setMt_03_01> .video{
	display: none;
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
	z-index: 999;
}
.tim_014{
	position: absolute;
	bottom: -1px;
	left: 8px;
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:20px;
	z-index: 999;
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
	z-index: 1000;
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
	z-index: 1000;
}
.tim_xzsx>img{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 100%;
}
.setMt_03 li:hover .tim_xz{
	display: block;
}
.setMt_03 li:hover .tim_xzsx{
	display: block;
}
.rsc_002{
	cursor: pointer;
}
.testd{
	position: fixed;
	border: 2px solid #F0F0F0;
	height: 72px;
	
}
.setMt_03box{
	overflow: hidden;
    overflow-y: auto;
    position: absolute;
    top: 64px;
    bottom: 0;
    left: 24px;
    right: 0;
}
</style>
