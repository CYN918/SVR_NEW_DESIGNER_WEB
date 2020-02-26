<template>
	<div class="uploadBoxd">
		<div class="uploadBoxd1" ></div>
		<div class="uploadBoxd2">
			<img class="uploadBoxd2_1" @click="closedxf('关闭')" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/cj_00.png"/>
			<div class="uploadBoxd2_2">
				<div class="uploadBoxd2_2_1">
					<div>{{configData.title}}</div>
					<div>{{configData.title2}}
						<span v-if="configData.tip" class="iconfont uploadBoxd2_2_3">&#xe636;
							<div><div v-for="(el,index) in configData.tip" :key="index">{{el}}</div></div>
						</span>					
					</div>
				</div>
				<div class="uploadBoxd2_2_2">{{configData.btn}}<input @change="fileUp" class="uploadBoxd2_2_2_1" ref="upnfile" :accept="typexz"  multiple="multiple" type="file" /></div>				
			</div>
			<ul class="uploadBoxd2_3" ref="imgd" @scroll="test">
				<li v-for="(el,index) in list" :key="index" v-if="el.type!='none'">
					<div v-if="el.type=='up'">
						<div class="loadingsd">
							<div class="circleProgress_wrapper">
							    <div class="wrapper right">
							        <div class="circleProgress rightcircle" :style="{transform:'rotate('+backLift(el.bf)+'deg)'}"></div>
							    </div>
							    <div class="wrapper left">
							        <div class="circleProgress leftcircle" :style="{transform:'rotate('+backRigh(el.bf)+'deg)'}"></div>
							    </div>								
							</div>
							<div class="loadingsdsd">{{el.bf+'%'}}</div>
							<div class="qxclos" @click="qxclosd(el)">取消上传</div>
						</div>
						<div><span>{{el.file_name.split('.')[0]}}</span><span>{{el.s}}</span></div>
					</div>
					<div v-else class="zzched" @click="onxz(el,index)">
						<div class="imgxzd" :style="Imgbj(el.url,el.cover_img)"></div>
						<div class="imgxzd2"><span>{{el.file_name}}</span><span>{{el.file_size_format}}</span></div>
						<div :class="['zzched_1',checkin.indexOf(el.fid)!=-1?'zzched2':'']"></div>
					</div>					
				</li>	
				<div ref="botmm"></div>
				<img v-if="isnoData" class="upImnoData" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/k/empty_nodata@3x.png"/>
				
			</ul>
			<div class="uploadBoxd2_4">
				<div class="uploadBoxd2_4_1">已选{{this.checkin.length}}项，最多可选50项</div>
				<div @click="closedxf('取消')">取消</div>
				<div @click="deleteFile">删除</div>
				<div class="uploadBoxd2_4_2" @click="InImg">插入</div>
			</div>
		</div>	
	</div>
</template>

<script>
import {Message} from 'element-ui'
export default {
	props:{
		configData:Object,
	},
    data() {
      	return {
      	    bf:0,
        	dialogImageUrl: '',
        	dialogVisible: false,
        	list:[],
			loadList:[],
			leftRo:225,
			rightRo:225,
			checkin:[],
			deletObj:[],
			checIurl:[],
			deldetType:0,
			typexz:'',
			deletOn:[],
			isnoData:'',
			getType:'',
			noGd:'',
			page:1,
			total:0,
      	};
    },
	beforeDestroy:function(){
		document.body.style = "";
	},
	mounted: function () {	
		this.init();
		
	}, 	
    methods: {
		init(){
			document.body.style = "overflow: hidden;";
			this.typexz  = this.configData.typexz?this.configData.typexz:'';
			this.getList();
		},
		test(){
			let data = this.$refs.botmm.getBoundingClientRect();
			if(data.top<800 && !this.getType && !this.noGd){
				if(this.total<40){
					this.noGd=1;
					return
				}
				this.page++;
				
				this.getList();
			}
		},
		Imgbj(a,b){
			
			let p = "background-image: url(";
			switch (this.configData.getType){
				case 'image': p+=a;
					break;
				case 'video': p+=b;
					break;
				case 'audio': p+='/imge/m.jpg';
					break;	
			}
			return p+");";
			
		},
		InImg(){
			this.bdtj(this.configData.title,'插入','--');
			if(this.checIurl.length==0){
				Message({message: '请先选择素材'});
				return
			}
			this.$parent.inImg(this.checIurl,this.checkin);
			this.closed(1);
		},
		deleteFile(){	
			if(this.deldetType==1){
				Message({message: '正在删除'});
				return
			}
			if(this.checkin.length==0){return}
	
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
			formData.append('fid',this.checkin)
			formData.append('timestamp',times)
			this.deldetType=1;
			this.$ajax.post(window.basrul+'/File/File/delete', formData)
			.then((da)=>{
				this.deldetType=0;
				if(da.data.result==0){
					Message({message: '删除成功'});
					let pn = 0;
					for(let i=0,n=this.deletOn.length;i<n;i++){
						this.list.splice(this.deletOn[i]-pn,1);
						pn++;				
					}
					this.deletOn = [];
					this.checkin = [];
					this.checIurl = [];
					this.deletObj = [];
					
				}else{
					Message({message: '删除失败'});	
				}
				
			})
			.catch(()=>{	
				this.deldetType=0;
				Message({message: '删除失败'});	
			});
		},
		closed(on){
		
			this.$parent.closed(on);
		},
		closedxf(a){
			this.bdtj(this.configData.title,a,'--');
			this.$parent.closed();
		},		
		onxz(obj,on){
			let lend = this.checkin.indexOf(obj.fid);
			if(lend==-1){
				this.checkin.push(obj.fid);
				this.checIurl.push(obj.url);
				this.deletObj.push(obj);
				this.deletOn.push(on);
				return
			}
			this.deletObj.splice(lend,1);
			this.checIurl.splice(lend,1);
			this.checkin.splice(lend,1);
			this.deletOn.splice(lend,1);
		},
		getList(){
			if(this.configData){
				for(let i=0,n=this.configData.length;i<n;i++){
					this.typexz+=','+this.configData.type;
				}
				this.typexz = this.typexz.substring(1);
			}
			
			
			let app_secret = '6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY';
	
			let times = (Date.parse(new Date())/1000);
			let arr = [
				1001,
				app_secret,
				window.userInfo.open_id,
				times
			];
			let params = {
				app_id:1001,
				sign:this.MD5(encodeURIComponent(arr.sort())),
				user:window.userInfo.open_id,
				timestamp:times,
				file_type:this.configData.getType,
				relation_type:'work',
				limit:40,
				page:this.page,
			};
			this.getType=1;
			this.api.getFList(params).then((da)=>{
				this.getType='';
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
				this.getType='';
			});
		},
		backRigh(on){
			if(on<=50){
				return 225;
			}
			if(on>100){
				return 405;
			}
			return 45+on*3.6;
		},
		backLift(on){
			if(on>50){
				return 405;
			}
			if(on<0){
				return 225;
			}
			return 225+on*3.6;
		},
		qxUpload(on){
			this.loadList[on].show='';
		},
		qxclosd(obj){
			this.bdtj(this.configData.title,'取消上传','--');
			obj.xhr.abort();
		},
		clPic(fld,on){
			if(this.configData.type.indexOf(fld.type)==-1){
				Message({message: '该文件格式不支持'});
				return
			}
			if(fld.size>this.configData.max){
				Message({message: '文件过大'});
				return
			}
			let fileSize = this.backSize(fld.size);
			              
			
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
			formData.append('relation_type','work')
			formData.append('timestamp',times)
			formData.append('is_callback',1)
			let xhr = new XMLHttpRequest();
			this.list.unshift({type:'up',file_name:fld.name,file_size_format:fileSize,bf:0,xhr:xhr,show:1});
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
						p.type="none";
						this.$message({message:daaa.data});
						return
					}
					let da = daaa.data;
					
					
					p.type="img";
					p.url = da.url;
					p.file_name = da.file_name;
					p.file_size_format = da.file_size;	
					p.fid=da.fid;
					if(da.cover_img){
						this.$set(p,'cover_img',da.cover_img);
					}
					this.$refs.upnfile.value ='';			
					Message({message: '文件上传成功'});
				}
				
			};
			let uploadFailed = ()=>{
				// delete p;
				p.type="none";
				this.$refs.upnfile.value ='';
				Message({message: '文件上传失败请稍后重试'});
				
			};
			let uploadCanceled = ()=>{
				p.type="none";
				this.$refs.upnfile.value ='';
				Message({message: '取消成功'});
				
			};
			xhr.upload.addEventListener("progress",uploadProgress, false);
			xhr.addEventListener("load",uploadComplete, false);
			xhr.addEventListener("error",uploadFailed, false);
			xhr.addEventListener("abort",uploadCanceled, false);
			xhr.open("POST", window.basrul+"/File/File/insert");
			xhr.send(formData);
		},
		backSize(fld){
			let fileSize = 0;
			if(fld > 1024 * 1024){
			 	fileSize = (Math.round(fld * 100 / (1024 * 1024)) / 100).toString() + 'MB';
			}else{
				fileSize = (Math.round(fld * 100 / 1024) / 100).toString() + 'KB';
			} 
			return fileSize;
		},	
      	fileUp(flie){
			this.bdtj(this.configData.title,this.configData.btn,'--');
			for(let i=0,n=flie.target.files.length;i<n;i++){
				this.clPic(flie.target.files[i],i);
			}
      		
      	},
    }
}
</script>

<style>
.uploadBoxd{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
}
.uploadBoxd1{
	background: rgba(0,0,0,.3);
	width: 100%;
	height: 100%;
}
.uploadBoxd2{
	width: 818px;
	height: 560px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
}
.uploadBoxd2_1{
	position: absolute;
	top: -36px;
	right: -36px;
	width: 36px;
	height: 36px;
	cursor: pointer;
	
}
.uploadBoxd2_2_3{
	position: relative;
	cursor: pointer;
}

.uploadBoxd2_2_3:hover:before{
	display: block;
}
.uploadBoxd2_2_3:hover>div{
	display: block;
	z-index: 9;
}
.uploadBoxd2_2_3:before{
	display: none;
	content: "";
    position: absolute;
    top: 19px;
    left: 25%;
    width: 10px;
    height: 10px;
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    transform: rotate(45deg);
    z-index: 9;
    background: #fff;
}
.uploadBoxd2_2_3>div{
	display: none;
	position: absolute;
	left: 50%;
	bottom: 0;
    transform: translate(-50%,115%);
	padding: 20px;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px 1px 1px 1px 5px 5px 5px;
}

.uploadBoxd2_2_3>div>div{
	white-space: nowrap;
}
    
.uploadBoxd2_1:hover{
	opacity: .7;
}
.uploadBoxd2_2{
	display: flex;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
}
.uploadBoxd2_2_1{
	flex: 1;
	text-align: left;
	margin: 27px 0 0 30px;
}
.uploadBoxd2_2_1>div{
	font-size: 14px;
	color: #999999;
}
.uploadBoxd2_2_1>div:nth-child(1){
	font-size: 14px;
	color: #333333;
	margin-bottom: 3px;
}
.uploadBoxd2_2_2{
	position: relative;
	width: 120px;
	height: 40px;
	background: #33B3FF;
	border-radius: 5px;
	font-size: 14px;
	color: #FFFFFF;
	text-align: center;
	line-height: 40px;
	margin: 28px 30px 18px 0;
	cursor: pointer;
	
}
.uploadBoxd2_2_2_1{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.uploadBoxd2_2_2:hover{
	opacity: .7;
}
.uploadBoxd2_2{
	margin-bottom: 20px;
}
.uploadBoxd2_3{
    margin: 9px 0px 9px 25px;
    height: 377px;
    text-align: left;
    overflow: hidden;
    overflow-y: auto;

}
.uploadBoxd2_3::-webkit-scrollbar {
    width: 6px;     
    height: 1px;
}
.uploadBoxd2_3::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #e6e6e6;
}
.uploadBoxd2_3::-webkit-scrollbar-track {
    background: none;
}
.uploadBoxd2_3>li{
    display: inline-block;
    width: 236px;
    margin: 0 10px 17px;
    vertical-align: top;
	box-sizing: border-box;
	border-radius: 5px;
	border: 1px solid #f6f6f6;
	overflow: hidden;
}


.uploadBoxd2_3>li>div>div{
	text-align: left;
	font-size: 14px;
	color: #666666;
}
.uploadBoxd2_3>li>div>div>span{
	display: inline-block;
	line-height: 20px;
	
}
.uploadBoxd2_3>li>div>div>span:first-child{
    width: 63%;
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.uploadBoxd2_3>li>div>div>span:last-child{
    float: right;
    padding: 0 5px 0 0;
    width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.uploadBoxd2_4{
	position: relative;
	background: #FFFFFF;
	border-top: 1px solid rgba(0,0,0,0.03);
	width: 818px;
	height: 88px;
	border-radius: 0 0 5px 5px;
}
.uploadBoxd2_4>div{
	display: inline-block;
	
	border: 1px solid #979797;
	border-radius: 5px;
	box-sizing: border-box;
	width: 100px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 14px;
	color: #333333;
	margin-top: 20px;
	margin-right: 20px;
	cursor: pointer;
}
.uploadBoxd2_4>div:last-child{
	margin-right: 0;
}
.uploadBoxd2_4>.uploadBoxd2_4_1{
	position: absolute;
	top: 12px;
	left: 28px;
	font-size: 12px;
	border: none;
	width: auto;
}
.uploadBoxd2_4>div:hover{
	opacity: .7;
}
.uploadBoxd2_4>.uploadBoxd2_4_1:hover{
	opacity: 1;
}
.uploadBoxd2_4>.uploadBoxd2_4_2{
	background: #333;
	border-color: #333;
	color: #fff ;
}
.loadingsd{
	position: relative;
	width: 100%;
	height: 135px;
	margin-bottom: 6px;

}
.qxclos{
	cursor: pointer;
    font-size: 14px;
    color: #33B3FF;
    position: absolute;
    bottom: 15px;
    text-align: center;
    width: 100%;
}
.qxclos:hover{
	opacity: .7;
}
.loadingsdsd{
	position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
	font-size: 14px;
	color: #666666;
}


.circleProgress_wrapper{
   	width: 60px;
    height: 60px;
    margin: 0 auto;
    position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	border-radius: 50%;
}
.wrapper{
    width: 50%;
    height: 100%;
    position: absolute;
    top:0;
    overflow: hidden;
}
.right{
    right:0;
}
.left{
    left:0;
}
.circleProgress{
    width: 54px;
    height:54px;
    border:3px solid #E6E6E6;
    border-radius: 50%;
    position: absolute;
    top:0;
    -webkit-transform: rotate(225deg);
	transform: rotate(225deg);
}
.rightcircle{
    border-top:3px solid #33B3FF;
    border-right:3px solid #33B3FF;
    right:0;
	-webkit-transition: -webkit-transform .1s linear;
	transition: transform .1s linear;
}
.leftcircle{
    border-bottom:3px solid #33B3FF;
    border-left:3px solid #33B3FF;
    left:0;
	-webkit-transition: -webkit-transform .1s linear;
	transition: transform .1s linear;
} 
.zzched{
	position: relative;
	cursor: pointer;
	width: 239px;

	
}
.zzched:hover:after{
	background: rgba(225,225,225,.3);
}
.zzched:after{
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height:173px;
	
}
.zzched_1{
	position: absolute;
	top: 10px;
	right: 10px;
	width: 10px;
	height:10px;
	border: 1px solid #979797;
	border-radius: 2px;
}
.zzched2{
	border-color: #33B3FF;
	background: #33B3FF;
}
.imgxzd{
	position: relative;
	width: 100%;
	height: 135px;
	overflow: hidden;
	background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
}

.imgxzd2{
	width: 100%;
	box-sizing: border-box;
	padding: 5px;
}

.upImnoData{
	display: block;
	margin: 110px auto 0;   
}
</style>