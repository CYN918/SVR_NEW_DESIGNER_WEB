<template>
	<div  class="pr_tc_01">
		<div class="pr_tc_02">			
			<div class="pr_tc_04">
				活动报名<img @click="close" class="pr_tc_03 pend" src="/imge/project/cj_00.svg" alt="">
			</div>
			<div v-if="isLc" class="detailtitle">
				<div class="employment">
					<span>
						<span :class="['number',{'numberactive':!Isnextshow}]">1</span>
						<span :class="{'fontactive':!Isnextshow}">报名认证信息</span>
					</span>
					<!-- <span :class="['centerline',{'centerlineactive': Isnextshow}]"></span> -->
					<span class="centerline"></span>
					<span>
						<span :class="['number',{'numberactive':Isnextshow}]">2</span>
						<span :class="{'fontactive': Isnextshow}">选择参与作品</span>
					</span>
				</div>
			</div>
	<div v-show="!Isnextshow" ref="scroll" class="box">
		<p class="textExplains">{{remeber_tips}}</p>
		<div class="demo-ruleForm" style="width: 700px;padding-bottom: 30px;">
			<div v-for="(item,index) in list">		
				<div class="Information InformationUpload">	
					<div style="float: left;width: 100%;height: 95px;" v-if="item.limittype == 'text'">
						<p>{{item.title}}</p>
						<div>		
							<el-input type="text" v-model="datas[index]" :placeholder=item.tigs :maxlength=item.limitnum @input="checkValue(item,index)" @focus="checkFocus(item,index)"></el-input>
						</div>								
					</div>
					<div class="video_box" v-if="item.limittype == 'pic'">
						<p>{{item.title}}<i>{{item.tigs}}</i></p>
						<div class="page2_1_2">
							<div v-if="datas[index]" class="hoverBtn">
								<div class="againUpload" @click="handleUploadImage(index)">重新上传</div>	
								<div class="deleteBtn"><el-button size="small" @click.native="deleteImage(index)">删除</el-button></div>
							</div>
							<div v-else><div>+</div>上传图片</div>
							<input @change="fileUpfj($event,index,item)" type="file" :id="'page'+index" ref="upnfile2">
							<img v-if="datas[index]" :src="datas[index]" alt="" class="uploadImg">							
						</div>
						<!-- <el-progress type="circle" :percentage="progressImage" v-show="isShowimage"></el-progress>	 -->
					</div>
					<div class="video_box" v-if="item.limittype == 'video'">
						<p>{{item.title}}<i>{{item.tigs}}</i></p>
						<div class="page2_1_2">
							<div v-if="datas[index]" class="hoverBtn">
								<div class="againUpload" @click="handleUploadVideo(index)">重新上传</div>
								<div class="deleteBtn"><el-button size="small" @click.native="deleteVideo(index)">删除</el-button></div>
							</div>
							<div v-else><div>+</div>上传视频</div>
							<input @change="fileUpfj($event,index,item)" :id="'page'+index" ref="upnfile2" type="file">	
							<!-- <video v-if="datas[index]" :src="datas[index]" class="uploadImg">您的浏览器不支持 video 标签。</video> -->
							
							<div class="video-box" v-if="datas[index]">
								<video :id="'video'+index" style="width:100%;height:146px" :src="datas[index]">
									Your browser does not support the video tag.
								</video>
								<div class="video-img" @click="videoPlay(index)"><img :id="'videoBtn'+index" src="/imge/videoPlay.png"></div>
							</div>	
						</div>
						<!-- <el-progress type="circle" :percentage="progressVideo" v-show="isShowvideo"></el-progress>	 -->
					</div>
					<div style="float: left;width: 100%;height: 101px;" v-if="item.limittype == 'file'">
						<p>{{item.title}}<i>{{item.tigs}}</i></p>
						<div style="width: 100%;height: 32px;">
							<div class="uploadFile">
								<div v-if="datas[index]" @click="handleUploadFile(index)">重新上传</div>
								<div v-else>上传文件</div>
								<input @change="fileUpfj($event,index,item)" type="file" ref="filElem" :id="'page'+index">				
							</div>
							<div v-if="flieList[index]" class="fileShow">
								<div class="fileIcon">
									<img src="/imge/Project_content_toast_icon.png" alt="">
								</div>
								<div class="fileContent">
									{{flieList[index]}}
									<el-progress :text-inside="true" :stroke-width="4" :percentage="progress" v-show="showp"></el-progress>
									<img @click="deleteFile(index)" class="detelImage" src="/imge/delete_icon.png" alt="">
								</div>
							</div>
						</div>				
					</div>	
				</div>
			</div>
		</div>	
	</div>
	<!-- <div style="padding: 20px 0px 20px 0px;border-top: 1px solid #F4F6F9;">
		<el-button type="primary" v-if="!Isnextshow" @click="next">下一步</el-button>
	</div> -->
	
	
	
	
	<div v-show="Isnextshow" ref="scroll">
		<div class="pushDeletBox4">
			<ul class="zp_box" @scroll="test">
				
				<li @click="checkZp(el.work_id)" :class="(work_id.indexOf(el.work_id)!=-1 || el.is_attend==1)?'chekonzp':''" v-for="(el,index) in zpList" :key="index">
					<img class="zp_box_1" :src="el.face_pic">
					<div class="zp_box_2">
						{{el.work_name.slice(0,10)}}
						<img v-if="el.is_recommend==1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/zs_icon_tj.svg" alt="">
					</div>
					<div class="zp_box_3">
						{{el.classify_1_name+'-'+el.classify_2_name}}
						<span>{{backtime(el.create_time)}}</span>
					</div>
					<div class="zp_box_4">
						<img :src="mJs.Cavars(el.user_info.avatar)" alt="">
						<div>
							<span class="iconfont pend">&#xe6a2; {{el.view_num}}</span>
							<span class="iconfont pend">&#xe672; {{el.like_num}}</span>
							<span class="iconfont pend">&#xe616; {{el.comment_num}}</span>
						</div>
					</div>
				</li>
				<div ref="botmm"></div>
				<div v-if="isnoData">
					<img  class="upImnoData" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/k/empty_nodata@3x.png"/>
					<div class="noDatawan">找不到数据了o(╥﹏╥)o</div>
				</div>
				
			</ul>
		</div>
		
	</div>
	<div class="pushDeletBox5">
		<span @click="clFn(el.fn)" :class="['pend',el.cls]" v-for="el in btns">{{el.n}}</span>			
	</div>
		</div>
	</div>
</template>

<script>
import {Message} from 'element-ui';
import { log } from 'util';
export default {	
	props:{
		value:Object
	},
	data(){	
		return{
			btns:[],
			datas:[],
			flieList: [],
			array: [],
			tcZj:'',
			config:{
				title:'选择参与活动的作品',
			},
			certification:{
				title:'报名活动',
			},
			topCn:{
				min:680,
			},
			shareData:{},
		    show:false,
			ishowWp:'',
			ond:1,
			zpList:[],
			page:1,
			limit:20,
			work_id:[],
			bindType:0,
			ishowzp:false,
			infoData:{},
			isnoData:'',
			wpdz:'',
			
			getType:'',
			noGd:'',
			page2:1,
			total2:0,
			active: 0,
			remeber_tips: '',
			list: [],
			opType:0,	
			Isnextshow: false,	
			showp: false,
			progress: 0,								
			isLc:'',
			// progressImage: 0,
			// isShowimage: false,
			// progressVideo: 0,
			// isShowvideo: false,
			// tan_c: true,
		}
		
	},

	mounted: function () {	
		this.showZp()
	}, 
	methods:{
		close(){
			this.$emit('input',{});
		},
		clFn(fn){
			this[fn]();
		},
		//图片删除
		deleteImage(index){
			this.datas.splice(index,1,'');
			document.getElementById("page"+index).value = '';
			this.progressImage = 0;
		},
		//视频删除
		deleteVideo(index){
			this.datas.splice(index,1,'');
			document.getElementById("page"+index).value = '';
			this.progressVideo = 0;
		},
		//文件删除
		deleteFile(index){
			this.flieList.splice(index,1,'');
			document.getElementById("page"+index).value = '';
			this.progress = 0;
		},
		//图片重新上传
		handleUploadImage(index){
			document.getElementById("page"+index).click();
			this.progressImage = 0;
		},
		//视频重新上传
		handleUploadVideo(index){
			document.getElementById("page"+index).click();
			this.progressVideo = 0;
		},
		//文件重新上传
		handleUploadFile(index){
			document.getElementById("page"+index).click();
			this.progress = 0;
		},
		//点击视频播放
		videoPlay(index){
			var video = document.getElementById("video"+index);
			var videoBtn = document.getElementById("videoBtn"+index).src;
			var filename;
			if(videoBtn.indexOf("/") > 0){
				filename = videoBtn.substring(videoBtn.lastIndexOf("/")+1,videoBtn.length);
			}else{
				filename = videoBtn;
			}
			if (filename == "videoPlay.png") {
				video.play();
				document.getElementById("videoBtn"+index).src = "imge/suspended.png";
			}
			else {
				video.pause();
				document.getElementById("videoBtn"+index).src = "imge/videoPlay.png"
			}
		},
		next() {
			if(this.datas.length == 0){
				Message({message: '请先完善信息'});
				return
			}
			for(var i=0;i<this.datas.length;i++){
				if(this.datas[i] == ''){
					Message({message: '信息不能为空'});
				    return
				}
				let obj = {
					title: this.list[i].title,
					url: this.datas[i],
					limit_type: this.list[i].limittype,
				}
				this.array.push(obj);	
			}
			
			
				this.btns = [
					{n:'上一步',fn:'backgo',cls:''},
					{n:'发布新作品',fn:'gopushzp',cls:''},
					{n:'立即报名',fn:'pushOk',cls:'poxx_01'},
				];
				
				this.Isnextshow = true;
				this.$refs.scroll.scrollTop = 0;
				this.getPersonalWorkList();
			
		},
		checkFocus(item,index){
			for(var i=0;i<this.list.length;i++){
				if(item == this.list[i]){
					if(this.list[i].limittypevalue == '仅限数字'){	
						var reg = /^[0-9]*$/;
						var re = new RegExp(reg);
						if(re.test(this.datas[index])){
							
						}else{
							Message({message: '仅限输入数字'});
							return
						}			
					}
					if(item.limittypevalue == '数字+英文+标点'){
						var reg = /[\x00-\xff]+/g;
						var re = new RegExp(reg);
						if(re.test(this.datas[index])){
							
						}else{
							Message({message: '仅限输入数字、英文、标点符号'});
							return
						}
					}
					if(item.limittypevalue == '不限制'){						
						// Message({message: '不限制输入'});							
					}
				}
			}											
		},
		checkValue(item,index){
			for(var i=0;i<this.list.length;i++){
				if(item == this.list[i]){
					if(this.list[i].limittypevalue == '仅限数字'){	
						var reg = /^[0-9]*$/;
						var re = new RegExp(reg);
						if(re.test(this.datas[index])){
							
						}else{
							Message({message: '仅限输入数字'});
							this.datas.splice(index,1,'');
							return
						}			
					}
					if(item.limittypevalue == '数字+英文+标点'){
						var reg = /[\x00-\xff]+/g;
						var re = new RegExp(reg);
						if(re.test(this.datas[index])){

							
						}else{
							Message({message: '仅限输入数字+英文+标点'});
							this.datas.splice(index,1,'');
							return
						}
					}
					if(item.limittypevalue == '不限制'){						
						// Message({message: '不限制输入'});							
					}
				}
			}											
		},
		backgo(){
			this.btns = [{n:'下一步',fn:'next',cls:'poxx_01'}];
			this.Isnextshow = false;
			
		},
		fileUpfj(flie,index,item){
			this.bdtj('上传弹窗','确定','--');
			if(this.opType==1){
				Message({message: '正在上传，请稍后'});
				return
			}
			let times = (Date.parse(new Date())/1000);
			let arr = [
				1001,
				'6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY',
				window.userInfo.open_id,
				times
			];
			let fld = flie.target.files[0];
			for(var i=0;i<this.list.length;i++){		
				if(item == this.list[i]){
					if(fld != undefined){
						var filename = fld.name;
						var location = filename.lastIndexOf(".");
						var suffix = filename.substr(location+1);
						if(this.list[i].limittype == 'pic'){
							if(this.list[i].limittypevalue != suffix&&this.list[i].limittypevalue.split('/').indexOf(suffix) == -1){
								Message({message: '上传格式有误，请按照要求重新上传'});
								return
							}else if(fld.size/1024 > this.list[i].limitnum){
								Message({message: '图片过大，请按照要求重新上传'});
								return
							}else{
								let formData = new FormData();
								formData.append('app_id',1001);
								formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
								formData.append('user',window.userInfo.open_id)
								formData.append('file',fld)
								formData.append('relation_type','user_info')
								formData.append('related_id',window.userInfo.open_id)
								formData.append('classify_1','avatar')
								formData.append('timestamp',times)
								formData.append('is_callback',1)			
								this.opType=1;
								Message({message: '图片正在上传，请稍后'});
								this.$ajax.post(window.basrul+'/File/File/insert', formData,{
									headers: {
										'Content-Type': 'multipart/form-data',
									},
									onUploadProgress: progressEvent => {
										this.progressImage = (progressEvent.loaded / progressEvent.total * 100 | 0);
									}
								})
								.then((da)=>{	
									this.opType=0;
									let ds = da.data;
									if(ds.result==0){
										this.datas[index] = ds.data.url;
										this.datas.splice(index,1,ds.data.url);						
									}else{
										// msg(ds.data);
										Message({message: ds.data});
									}
								})
								.catch(function () {
									this.opType=0;		
								});
							}	
						}else if(this.list[i].limittype == 'video'){
							// if(this.list[i].limittype != suffix){
							// 	Message({message: '视频格式不对'});
							// }
							if(fld.size/1024/1024 > this.list[i].limitnum){
								Message({message: '视频过大，请按照要求重新上传'});
								return
							}else{
								let formData = new FormData();
								formData.append('app_id',1001);
								formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
								formData.append('user',window.userInfo.open_id)
								formData.append('file',fld)
								formData.append('relation_type','user_info')
								formData.append('related_id',window.userInfo.open_id)
								formData.append('classify_1','avatar')
								formData.append('timestamp',times)
								formData.append('is_callback',1)
								this.opType=1;
								Message({message: '视频正在上传，请稍后'});
								this.$ajax.post(window.basrul+'/File/File/insert', formData,{
									headers: {
										'Content-Type': 'multipart/form-data',
									},
									onUploadProgress: progressEvent => {
										this.progressVideo = (progressEvent.loaded / progressEvent.total * 100 | 0);
									}
								})
								.then((da)=>{	
									this.opType=0;
									let ds = da.data;
									if(ds.result==0){
										this.datas[index] = ds.data.url;
										this.datas.splice(index,1,ds.data.url);						
									}else{
										// msg(ds.data);
										Message({message: ds.data});
									}
								})
								.catch(function () {
									this.opType=0;
									
								});
							}
						}else if(this.list[i].limittype == 'file'){
							if(fld.size/1024/1024 > this.list[i].limitnum){
								Message({message: '文件过大，请按照要求重新上传'});
								return
							}else{
								let formData = new FormData();
								formData.append('app_id',1001);
								formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
								formData.append('user',window.userInfo.open_id)
								formData.append('file',fld)
								formData.append('relation_type','user_info')
								formData.append('related_id',window.userInfo.open_id)
								formData.append('classify_1','avatar')
								formData.append('timestamp',times)
								formData.append('is_callback',1)
								this.opType=1;
								this.showp = true;
								Message({message: '文件正在上传，请稍后'});
								this.$ajax.post(window.basrul+'/File/File/insert', formData,{
									headers: {
										'Content-Type': 'multipart/form-data',
									},
									onUploadProgress: progressEvent => {
										this.progress = (progressEvent.loaded / progressEvent.total * 100 | 0);
									}
								})
								.then((da)=>{	
									this.opType=0;
									let ds = da.data;
									if(ds.result==0){
										this.datas[index] = ds.data.url;
										this.datas.splice(index,1,ds.data.url);	
										this.flieList[index] = ds.data.file_name;
										this.flieList.splice(index,1,ds.data.file_name);					
									}else{
										// msg(ds.data);
										Message({message: ds.data});
									}
								})
								.catch(function () {
									this.opType=0;
									
								});
							}
						}
					}		
							
				}				
			}	
		},
		
		test(){
			let data = this.$refs.botmm.getBoundingClientRect();
			if(data.top<800 && !this.getType && !this.noGd){
				if(this.total2<40){
					this.noGd=1;
					return
				}
				
				this.page2++;
				this.getPersonalWorkList();
			}
		},
	
	
		showZp(){
			if(!window.userInfo){
				Message({message: '未登陆，请先登陆!'});
				this.$router.push({path:'/login'})
				return
			}
			this.api.getPersonalInfo({
				activity_id:this.$route.query.id
			}).then((da)=>{
				if(da=='error'){
					return
				}
				if(da==null){
					this.noGd=1;				
				}
				
				if(da.extra_info == null || da.extra_info == '[]' || da.activity_status == '1'){
					this.Isnextshow = true;
					this.getPersonalWorkList();
					this.btns = [
						{n:'发布新作品',fn:'gopushzp',cls:''},
						{n:'立即报名',fn:'pushOk',cls:'poxx_01'},
					];
					return
				}
				
				this.btns = [{n:'下一步',fn:'next',cls:'poxx_01'}];
				this.isLc = 1;
				this.remeber_tips = da.remeber_tips;
				this.list = JSON.parse(da.extra_info);									
			})			
		},
		
		checkZp(id){
			let on = this.work_id.indexOf(id);
			if(on==-1){
				this.work_id.push(id);
				return
			}
			this.work_id.splice(on,1);
		},
		setOnd(){
			this.tcZj = this.$route.name;
			let a = this.$route.path;
			if(a==='/detailed'){
				this.ond = 1;
				return
			}
			if(a==='/detailed/into'){
				this.ond = 2;
				return
			}
			if(a==='/detailed/admission'){
				this.ond = 3;
				return
			}
		},	
				
		
		bdtjCom(a){
			this.bdtj('活动',a,'--');
		},
		
		getPersonalWorkList(){
			this.isnoData='';
			if(!window.userInfo){return}
			let pr = {
				activity_id:this.$route.query.id,
				page:this.page2,
				limit:40,
			};
			this.api.getPersonalWorkList(pr).then((da)=>{
				
				if(da=='error'){
					return
				}
			
				if(da.data.length==0){
					this.noGd=1;
				}
				if(this.zpList.length>0 && this.page2!=1){
					this.zpList = this.zpList.concat(da.data);
					return
				}
				
				this.zpList = da.data;
				if(this.zpList.length==0){
					this.isnoData=1;
				}
			})
		},
		gopushzp(){
			this.$router.push({path:'/upload'});
		},

		backtime(time){		
			return	window.getTimes(time);
		},
		pushOk(){		
			if(this.bindType==1){
				Message({message: '正在上传中'});
				return
			}
			if(this.work_id.length==0){
				Message({message: '请先选择作品'});
				return
			}
			this.bindType=1;
			let pr = {
				activity_id:this.$route.query.id,
				work_id:this.work_id.join(','),
				append_infos: JSON.stringify(this.array),
			};
			this.api.a_AttendActivity(pr).then((da)=>{
				if(da=='error'){
					this.bindType=0;	
					return
				}
				this.bindType=0;
				Message({message: '报名成功'});
				this.close();
				
			}).catch(()=>{
				this.bindType = 0;
			})
		},
	},
	watch: {	
		'$route': function() {
			this.setOnd();
		}
	},
	
	
}		
</script>


<style scoped="scoped">
.fileShow{
	width: 390px;
	float: left;
	word-wrap:break-word;
	overflow: hidden;
	text-align: left;
	margin-top: 10px;
	position: relative;
	height: 32px;
	margin-left: 20px;
}
.fileShow .fileIcon{
	width: 20px;
	height: 32px;
	float: left;
}
.fileShow .fileContent{
	width: 370px;
	height: 32px;
	float: left;
	position: relative;
}
.fileShow .fileContent .detelImage{
	position: absolute;
    right: 0px;
    top: 0px;
	cursor: pointer;
}
.video-box{
	position: relative;
}
.video-box video{
	display: inline-block;
    vertical-align: baseline;
}
.pr_tc_02{
	overflow-y: hidden;
	max-height: 730px;
}
.box{
	height: 400px;
	-webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: auto;
}
.box::-webkit-scrollbar{
  width:7px;
  height:428px;
  /**/
}
.box::-webkit-scrollbar-track{
  background: #F2F2F2;
  border-radius:2px;
}
.box::-webkit-scrollbar-thumb{
  background: #333;
  border-radius:10px;
}
.box::-webkit-scrollbar-thumb:hover{
  background: #333;
}
.box::-webkit-scrollbar-corner{
  background: #179a16;
}
.zp_box>li{
	width: 223.8px !important;
    height: 250.9px !important;
}
.zp_box_1{
	height: 157.6px !important;
}
.zp_box>li:nth-child(3n+3) {
    margin-right: 17px !important;
}
.page2_1_2{
	position: relative;
    background: #E6E6E6;
    border-radius: 5px;
    float: left;
    margin: 5px 5px 5px 0px;
    overflow: hidden;
    width: 260px;
    height: 146px;
    cursor: pointer;
}
.uploadImg{
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
	z-index: 666;
}
.video-box .video-img{
	position: absolute;
    width: 100%;
	cursor:pointer;
	background: none;
}
.page2_1_2:hover .video-box .video-img{
	top: 5px;
	bottom: 0;
}
.page2_1_2:hover .page2_1_2>div{
	z-index: 22;
}
.page2_1_2:hover .page2_1_2>input,.page2_1_2:hover{
	z-index: 22;
}
.page2_1_2:hover{
	opacity: 1;

}
.page2_1_2:hover .deleteBtn,.page2_1_2:hover .againUpload{
	z-index: 666666;
}
.page2_1_2:hover>img{
	opacity: 1;
}

.page2_1_2:hover .uploadImg{
	z-index: -666;
	
}
.page2_1_2:hover .hoverBtn{
	z-index: 666;
	
}
.hoverBtn{
	width: 100%;
	height: 40px;
	line-height: 40px;
	bottom: 0;
	background: rgba(0,0,0,0.5) !important;
	border-radius: 0px !important;	
}
.page2_1_2>div {
    border-radius: 5px;
    font-size: 14px;
    color: #333;
	position: absolute;
	background: none;
}
.deleteBtn{
	width: 80px;
	height: 32px;
	position: absolute !important;
    bottom: 2px;
	left: 40px;
	
}
.againUpload{
    width: 80px !important;
	height: 31px !important;
	line-height: 31px !important;
	text-align: center !important;
	position: absolute;
	bottom: 4px;
	right: 40px;
	background: #33b3ff !important;
	color: #FFFFFF !important;
	margin: 0 !important;
	border-radius: 2px !important;
	font-size: 12px !important;
}
.page2_1_2>div>div {
    width: 22.9px;
    height: 22.9px;
    border-radius: 50%;
    font-size: 21px;
    text-align: center;
    line-height: 22.9px;
    background: #33b3ff;
    color: #e6e6e6;
    margin: 43px auto 11px;
}
.video_box{
	float: left;
	width: 100%;
	height: 215px;
	position: relative;
}
.video_box >>> .el-progress{
	position: absolute;
    left: 100px;
    top: 75px;
	z-index: 666666666;
}
.video_box >>> .el-progress-circle{
	height: 48px !important;
    width: 48px !important;
}
.video_box >>> .el-progress__text{
	color: #33B3FF;
}
.page2_1_2>input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.uploadFile{
    position: relative;
    background: #FFFFFF;
    border-radius: 5px;
    float: left;
    margin: 5px 5px 5px 0px;
    overflow: hidden;
    width: 100px;
	height: 32px;
	text-align: center;
	line-height: 32px;
    cursor: pointer;
	color: #666666;
	border: 1px solid #BBBBBB;
	float: left;
}
.uploadFile>div{
    width: 100%;
    height: 10px;
}
.uploadFile > input{
	opacity: 0;
	width: 100px;
	height: 32px;
	position: absolute;
    top: 0;
    left: 0;
}
.upImnoData{
	display: block;
	margin: 110px auto 0;   
}
.detail_topBox{
	min-width: 1300px;	
	position: relative;	
}
.box >>> .el-button{
	width: 80px;
	height: 32px;
	line-height: 32px;
	text-align: center;
	padding: 0;
}

.detail_topBox_1{
	
	background-size: cover;
    background-position: 50%,50%;
    width: 100%;
	height: 620px;
}
.detail_topBox_2{
	position: absolute;
	bottom: 30px;
	right:0;
	
}
.detail_topBox_2_2,.detail_topBox_2_1{
	display: inline-block;
	width: 140px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	font-size: 16px;
	color: #FFFFFF;
	border-radius: 5px;
}
.detail_topBox_2_1{
	background: #333333;
	margin-right: 15px;
}
.detail_topBox_2_2{
	cursor: pointer;
	background: rgba(51, 179, 255,1);
}

.detail_topBox_2_2:hover{
	background:rgba(112, 201, 255, 1);
}
.detail_topBox_2_3{
	font-size: 24px;
	color: #FFFFFF;
}
.detail_nav{
	line-height: 40px;
	text-align: left;
	padding: 30px 0;
	width: 1300px;
	margin: 0 auto;
}
.detail_navN_1{
	height: 100px;
}
.detail_navN_1 .p_isTop{
	z-index: 9999;
	position: fixed;
	top: 0;
	left: 0;	
	width: 100%;
	-webkit-animation: bjs .3s linear forwards;
	animation: bjs .3s linear forwards;
	-webkit-box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
	box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);

}
.detail_nav>a{
	display: inline-block;
	font-size: 16px;
	color: #1E1E1E;
	text-align: center;
	margin-right: 40px;
	height: 37px;
	position: relative;
}
.detail_nav>a.router-link-exact-active{
	color: #33B3FF;
}
.detail_nav>a.router-link-exact-active:after{
	content: "";
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 80%;
	height: 2px;
	background: #33B3FF;
} 
.detail_nav_1{
	float: right;
	border: 1px solid #666666;
	border-radius: 20px;
	width: 98px;
	height: 38px;
	line-height: 38px;
	font-size: 14px;
	color: #1E1E1E;
	text-align: center;
}
.pushDeletBox{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.5);
}
.pushDeletBox1{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 1030px;
	height: 572px;
}
.pushDeletBox1_x2{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	padding: 30px;
    text-align: left;
    line-height: 30px;
    width: 450px;
}
.pushDeletBox1_x2_1{
	margin-bottom: 35px;
}
.pushDeletBox2{   
	position: absolute;
    top: -45px;
    right: -45px;
    width: 44px;
    height: 44px;
    cursor: pointer;
}
.pushDeletBox3{
	background: #FFFFFF;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
	font-size: 14px;
	color: #333333;
	line-height: 64px;
	padding: 0 30px;
	text-align: left;
}
.pushDeletBox5{
	background: #FFFFFF;
	box-shadow: 0 0 0 2px rgba(0,0,0,0.05);
	border-radius: 5px 5px 0 0;
	height: 100px;
}
.pushDeletBox5>span{
	display: inline-block;
	margin-top: 30px;
	width: 138px;
	height: 38px;
	font-size: 16px;
	color: #333333;
	text-align: center;
	margin: 30px 10px;
	line-height: 38px;
	border: 1px solid #979797;
	border-radius: 5px;
}
.pushDeletBox5>span.poxx_01{

	background: #33B3FF;
	border-color: #33B3FF;
	color: #fff;
}
	
.pushDeletBox4{
	padding: 20px 30px;
	width: 1030px;
    height: 500px;
    overflow: hidden;
    overflow-y: auto;
	box-sizing: border-box;
	overflow: hidden;
	overflow-y: auto;
}
.pushDeletBox4::-webkit-scrollbar {
    width: 6px;     
    height: 1px;
}
.pushDeletBox4::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;
}
.pushDeletBox4::-webkit-scrollbar-track {
    background: none;
}
.Information{
	width: 75%;
	margin: 0 auto;
}
.Information > div > p{
	width: 100%;
	margin: 5px 0px 5px 0px;
	color: #333333;
	font-size: 14px;
	text-align: left;
}
.Information > div > p > i,.clues > i{
	color: #BBBBBB;
	font-size: 12px;
	font-style: normal;
	margin-left: 10px;
}
.clues{
	position: absolute;
	top: 210px;
    left: 105px;
	height: 20px;
	line-height: 20px;
	color: #333333;
	font-size: 14px;
	text-align: left;
}
.InformationUpload{
	position: relative;
}
.InformationUpload >>> .el-upload--picture-card{
	width: 260px;
	height: 146px;
}
.zp_box{
	overflow: hidden;

	text-align: left;
}
.zp_box>li{
	display: inline-block;
	background: #F6F6F6;
	border-radius: 5.08px;
	width: 309.8px;
	height: 312.9px;
	margin: 0 17px 21px 0;
	border: 1px solid #fff;
	box-sizing: border-box;
	
}
.zp_box>li:nth-child(3n+3){
	margin-right: 0;
}
.zp_box>li.chekonzp{
	border-color: #33B3FF;
}
.zp_box_1{
	display: block;
	width: 100%;
	border-radius: 5.08px 5.08px 0 0;
	height: 231.6px;
}
.zp_box_2{
	font-size: 16.25px;
	color: #1E1E1E;
	margin: 6px 10px;
}
.zp_box_2>img {
    float: right;
    width: 14px;
    height: 14px;
    margin-top: 3px;
}
.zp_box_3{
	font-size: 12.19px;
	color: #999999;
	margin: 0 10px;
}
.zp_box_3>span{
	float: right
}
.zp_box_4{
	margin: 6px 10px;
}
.zp_box_4>img{
	display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
}
.zp_box_4>div{
	float: right;
}
.zp_box_4>div>span{
    margin-right: 13.9px;
    font-size: 12.19px;
    color: #999999;
}
.zp_box_4>div>span:last-child{
	margin-right: 0;
}

.detail_topBoxx_1po{
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, #000000 100%);
}
.detail_topBoxx_1{

	width: 1300px;
	
}
.detail_topBoxx_1{
	position: relative;
	margin: 0 auto;
	width: 1300px;
	height: 100px;
	
}
.detail_topBox_2x{
	position: absolute;
	bottom: 30px;
	text-align: left;
}
.detail_topBox_2x_1{
	font-size: 24px;
	color: #FFFFFF;
	margin-bottom: 7px;
}
.detail_topBox_2x_2{
	font-size: 14px;
	color: #FFFFFF;
}

.detail_topBox_2_2:active{
	background: rgba(112, 201, 255, 1);
}
.detail_topBox_2_1:hover{
	background: #4E4E4E;
}


.Acomd{
	min-height: 500px;
}
.textExplains{
	color: #666666;
	font-size: 14px;
	text-align: left;
	padding: 0px 100px 30px 100px;
}
.textExplains > i{
	font-style: normal;
	color: #33B3FF;
}
.employment {
	margin: 30px auto;
    font-size: 16px;
    color: #BBBBBB;
}
.numberactive {
    background: #ffffff;
    color: #33B3FF;
    border: 1px solid #33B3FF !important;
}
.number {
    display: inline-block;
    width: 27px;
    height: 27px;
    line-height: 27px;
    border: 1px solid #BBBBBB;
    border-radius: 50%;
    margin-right: 10px;
    text-align: center;
}
.fontactive {
    color: #000000;
}
.centerline {
    display: inline-block;
    width: 114px;
    height: 4px;
    border-top: 1px solid #BBBBBB;
    margin: 0 12px;
    margin-top: -5px;
}
</style>

