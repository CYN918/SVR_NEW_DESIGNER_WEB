<template>
	<div>
		<div class="topNavComBox">
			<div class="topNavComBox1">
				<div class="topNavComBox2">上传作品</div>
				<a :class="['pend',chekin?'onchekd':'']" @click="setChekin(true)">编辑作品内容</a>
				<a :class="['pend',!chekin?'onchekd':'']" @click="setChekin(false)">其他信息设置</a>
			</div>
		</div>
		<div v-show="chekin" class="upBoxd">
			<div class="upBoxd1">
				<div class="upBoxd1_1">
					<Input class="userBoxd2" v-model="form.work_name"  :oType="'max'" :max="50"   :type="'text'" :placeholder="'请输入作品标题…'"></Input>	
				</div>
				<div class="upBoxd1_2">
					<vue-ueditor-wrap :config="myConfig" @ready="ready" v-model="form.content"></vue-ueditor-wrap>
				</div>
			</div>
			<div class="upBoxd2">
				<div @click="showUp(0)"><span class="iconfont">&#xe695;</span>上传图片</div>
				<div @click="showUp(1)"><span class="iconfont">&#xe650;</span>上传视频</div>
				<div @click="showUp(2)"><span class="iconfont">&#xe680;</span>上传音频</div>
			</div>
			<UplodImg v-if="isshowd" :configData="upConfig"></UplodImg>
			
		</div>
		<div v-show="!chekin" class="upBoxd">
			<div class="page2_1">
				<div class="page2_1_1">封面图<span class="btRed"></span></div>
				<div class="page2_1_2">
					<img v-if="form.face_pic" :src="form.face_pic" alt="">
					<div @click="showupFm"><div>+</div>上传封面</div>
					
				</div>
				<div class="page2_1_3">上传附件<span>ZIP/RAR，20M以内</span></div>
				<div class="page2_1_4">
					<div class="page2Tbnd1">选择附件</div>
					<input @change="fileUpfj" class="page2_1_4file" ref="upnfile2" type="file">
				</div>
				<div v-if="upfjData.type" class="page2_1_5">{{upfjData.type}}<span><span :style="{transform:'translateX(-'+(100-upfjData.bf)+'%)'}"></span></span>{{upfjData.bf+'%'}}</div>
				<div class="page2_1_6" v-if="upfjData.type">
					<div><div class="page2Tbnd1" >重新上传</div><input @change="fileUpfj" class="page2_1_4file" type="file"></div>
					<span class="iconfont">&#xe621;附件名称<span @click="qxclosd(fileUpfj)" class="iconfont pend">&#xe619;</span></span>
					
				</div>
				<div class="page2_1_7">
					<div>附件内容</div>
					<div class="page2_1_7_r">
						<label>
							<div><div :class="form.attachement_visible==1?'chekdOn':''"></div>
							<input class="page2_1_4file" type="radio" v-model="form.attachement_visible" value="1" name="isme" ></div>
							所有人可见
						</label>
						<label>
							<div><div :class="form.attachement_visible==0?'chekdOn':''"></div>
							<input class="page2_1_4file" type="radio" v-model="form.attachement_visible" value="0" name="isme" ></div>
							仅自己可见
						</label>
					</div>
				</div>
			</div>
			<div class="page2_2">
				<div class="page2_2_1">
					<div class="page2_2_1_1">作品标签<span>标签可以将作品自动推荐给可能感兴趣的人</span></div>
					<div class="page2_2_1_2">
						<div><Input class="userBoxd2" v-model="tags" :keyup="keydown"  :oType="'max'" :max="10"   :type="'text'" :placeholder="'输入标签，回车添加标签'" ref="tageds"></Input>还可添加{{5-form.labels.length}}个标签</div>
						
						
						<div class="page2_2_1_2x">
							<span v-for="(el,index) in form.labels" :key="index">{{el}}<span @click="deletTage(index)" class="iconfont pend">&#xe619;</span></span>
						</div>
					</div>
				</div>
				<div class="page2_2_2">
					<div class="page2_2_2_1">
						<div class="page2_2_2_1_1">作品类型<span class="btRed"></span></div>
						<div class="page2_2_2_1_2">
							<el-cascader 
							:options="page2.classify"
							v-model="selectedOptions"
							>
							</el-cascader>	
						
						</div>
					</div>
					<div class="page2_2_2_2">
						<div class="page2_2_2_2_1">版权说明<span class="btRed"></span></div>
						<div class="page2_2_2_2_2">
							<el-select v-model="form.copyright" placeholder="请选择">
								<el-option
								v-for="item in bqList"
								:key="item.label"
								:label="item.label"
								:value="item.label">
								</el-option>
							</el-select>
							
						</div>
					</div>
				</div>
				<div class="page2_2_3">
					<div class="page2_2_3_1">是否设为平台投稿作品<span class="btRed"></span><span>设置后，若该作品符合平台需求，则平台客服会联系创作者进行商业洽谈</span></div>
					<div class="page2_1_7_r">
						<label>
							<div :class="form.is_platform_work==1?'chekdOn':''"><div></div>
							<input class="page2_1_4file" v-model="form.is_platform_work" value="1" type="radio" name="isme" ></div>是
						</label>
						<label>
							<div :class="form.is_platform_work==0?'chekdOn':''"><div></div>
							<input class="page2_1_4file" v-model="form.is_platform_work" value="0" type="radio" name="isme" ></div>否
						</label>
					</div>
				</div>
			</div>
		</div>
		<div class="UpBtn1">
			<div class="UpBtn1_1" v-if="!chekin" @click="setChekin(true)">上一步</div><div @click="userSave" class="UpBtn1_1">保存</div><div v-if="chekin" :class="['UpBtn1_2',ck2]" @click="setChekin(false)">下一步</div>
			<div class="UpBtn1_1" @click="seeCg" v-if="!chekin">预览</div><div @click="savZp" :class="['UpBtn1_2',ck3]" v-if="!chekin">提交发布</div>
		</div>
		
		<upoloadcaver v-show="isPhto" @close="close" ref="upoloadcaver"></upoloadcaver>
	</div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import UplodImg from './uploadImag'
import Input from '../../components/input'
import upoloadcaver from './uploadFm';
import {Message} from 'element-ui'
export default {
	name: 'index',
	components:{VueUeditorWrap,UplodImg,Input,upoloadcaver},
	data(){
		return{
			bqList:[{label:'禁止匿名转载；禁止商业使用；禁止个人使用。'},{label:'禁止匿名转载；禁止商业使用。'},{label:'不限制用途。'}],
			isPhto:false,
			chekin:true,
			isshowT1:false,
			isshowT2:false,
			ck2:'',
			ck3:'',
			chekusername:()=>{},
			form:{
				attachement_visible:1,
				labels:[],
				copyright:'禁止匿名转载；禁止商业使用；禁止个人使用。',
				is_platform_work:0,
			},
			uD:{},
			upConfig:'',
			myConfig: {
			  autoHeightEnabled: false,
			  initialFrameHeight: 324,
			  initialFrameWidth: '100%',
			  UEDITOR_HOME_URL: '/UEditor/'
			},			
			isshowd:false,
			upList:[
				{
					title:'我的图片素材库',
					title2:'上传文件大小需小于10M，支持JPG、PNG、GIF格式。',					
					btn:'上传图片素材',
					max:10*1024*1024,
					type:['image/gif','image/jpeg','image/png'],
					getType:'image'
				},
				{
					title:'我的视频素材',
					title2:'上传文件大小需小于1.5G，支持主流的视频格式',
					tip:['常见的在线流媒体格式：mp4、Ogg、WebM'],
					btn:'上传视频素材',
					max:1.5*1024*1024*1024,
					type:['video/mp4','video/ogg','video/webm'],
					getType:'video'
				},
				{
					title:'我的音频素材',
					title2:'格式支持mp3、Ogg、Wav，文件大小不超过50M',
					btn:'上传音频素材',
					max:50*1024*1024,
					type:['audio/ogg','audio/mp3','audio/wav'],
					getType:'audio'
				}
				
			],
			autoSave:{
				time:'',
				obj:'',
				saveData:'',
			},
			upfjData:{
				
			},
			tags:'',
			page2:{
				classify:[],
				classify_1:0,
				classify_2:0,
				classify_3:0,
			},
			selectedOptions:[],
		}  
	},
	watch: {		
		'form.work_name'(val,oldval) {				
			this.checkPage1();			
		},
		'form.content'() {
			this.checkPage1();
		},
		
		
		'form.face_pic'() {
			this.checkPage2();
			this.setAutoSave();
		},
		'selectedOptions'() {
			if(this.selectedOptions.length==0){
				return
			}
			this.form.classify_1 = this.selectedOptions[0];
			this.form.classify_2 = this.selectedOptions[1];
			this.form.classify_3 = this.selectedOptions[2];
			this.checkPage2();
			this.setAutoSave();
		},
		'form.copyright'() {
			this.checkPage2();
			this.setAutoSave();
		},
		'form.labels'() {
			this.setAutoSave();
		},
		'form.attachment_id'() {
			this.setAutoSave();
		},
		'form.attachement_visible'() {
			this.setAutoSave();
		},
		'form.is_platform_work'() {
			this.setAutoSave();
		},
	},
	mounted: function () {	
		this.init();
		this.getClassify();
	}, 
	methods: {
		/*page2*/
		seletClassify(name,on){
			this.page2[name] = on;
		},
		backTyped(){
			if(this.form.classify_1){
				
				return this.form.classify_1+'-'+this.form.classify_2+'-'+this.form.classify_3
			}
			return '选择作品类型';
		},
		keydown(){
			if(!this.tags){
				return
			}
			if(this.form.labels.indexOf(this.tags)!=-1){
				Message({message: '该标签已添加'});
				return
			}
			if(this.form.labels.length===5){
				Message({message: '最多填写5个标签'});
				return
			}
			this.form.labels.push(this.tags);
			this.tags = '';
			this.$refs.tageds.clearValue();
		},
		
		deletTage(on){
			this.form.labels.splice(on,1);
		},
		seletB1(on){
			this.form.copyright1 = on;
			this.closeTd('isshowT2');
		},
		seletBq(on){
			this.form.copyright = on;
			this.closeTd('isshowT2');
		},
		showupFm(){
			this.isPhto = true;
		},
		close(img){
			this.isPhto = false;
			if(img){
				this.form.face_pic = img;
			}			
		},
		showTd(on){
			this[on] = true;
		},
		closeTd(on){
			window.event? window.event.cancelBubble = true : e.stopPropagation();
			this[on] = false;
		},
		setAutoSave(){
			clearTimeout(this.autoSave.obj);
			this.autoSave.obj = setTimeout(()=>{
				this.checkAutoSave();
			},30000);
		},
		checkAutoSave(){
			if(!this.form.work_name){
				return
			}
			if(!this.form.content){
				return
			}	
			let dat = this.setSaveData(0);
			let da = JSON.stringify(dat);
			/*内容相同不保存*/			
			if(this.autoSave.saveData==da){
				return
			}
			/*内容不同开始保存*/
			this.autoSave.saveData = da;
			this.saveData(dat,'自动保存成功');
		},
		init(O){
			if(O){
				this.getData();
				return
			}
			this.getWorkId();
		},
		saved(){
			this.saveData(0,'保存成功');			
		},
		setChekin(type){
			if(!this.form.work_name){
				Message({message: '请先填写标题'});
				return
			}
			if(!this.form.content){
				Message({message: '请先填写内容'});
				return
			}
			this.chekin = type;
		},
		ready (editorInstance) {
			this.uD = editorInstance;
		},
		closed(){
			this.isshowd=false;
		},
		showUp(on){
			this.upConfig = this.upList[on];
			this.isshowd = true;
		},
		inImg(list){
			let str = '';
			if(this.upConfig.type[0]=='image/gif'){
				list.map((el,index,va)=>{
					str+='<p style="max-width:100%;height:auto;"><img style="max-width:100%;height:auto" src="'+el+'"/></p>';
				});
				this.uD.execCommand('insertHtml', str);
				return
			}
			
			if(this.upConfig.type[0]=='video/mp4'){
				list.map((el,index,va)=>{
					str+='<p style="box-shadow: 0 5px 10px 0 rgba(0,0,0,0.10);border-radius: 12.55px;overflow: hidden;margin: 40px auto;width: 600px;height: 338px;"><video style="width: 100%;height:100%" controls="controls" src="'+el+'"></video></p>';
					
				});
				this.uD.execCommand('insertHtml', str);
				return
			}
			if(this.upConfig.type[0]=='audio/ogg'){
				list.map((el,index,va)=>{					
					str+='<p style="background: #FFFFFF;box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10);border-radius: 5px;margin: 40px auto;width: 600px;height:90px;" ><audio style="width: 86%;margin: 18px;" id="xx" src="'+el+'" controls="controls"></audio></p>';
				});
				this.uD.execCommand('insertHtml', str);
				return
			}
			
			
		},
		getWorkId(){
			let p = localStorage.getItem('userT');
			if(!p){
				Message({message: '登录过期请先登录'});
				setTimeout(()=>{				
					this.$router.push({path:'/login'})
				},2000);
				return
			}			
			let params = {
				access_token:JSON.parse(p).access_token
			};
			this.api.getWorkId(params).then((da)=>{
				this.form.work_id = da.work_id;
			});
		},
		getData(){
			
		},
		seeCg(){
			if(!this.form.work_name){Message({message: '请先填写标题'});return}
			if(!this.form.content){Message({message: '请先填内容'});return}
			if(!this.form.face_pic){Message({message: '请先上传封面'});return}
			if(!this.form.classify_1){Message({message: '请先选择作品类型'});return}
		
			this.checkAutoSave();
			setTimeout(()=>{
				window.open('#/conts?id='+this.form.work_id)
			
			},1000)			
		},
		savZp(){
			if(!this.form.work_name){Message({message: '请先填写标题'});return}
			if(!this.form.content){Message({message: '请先填内容'});return}
			if(!this.form.face_pic){Message({message: '请先上传封面'});return}
			if(!this.form.classify_1){Message({message: '请先选择作品类型'});return}			
			this.saveData(this.setSaveData(1,1),'上传成功',()=>{setTimeout(()=>{this.$router.push({path:'/'})},1000)});
		},
		userSave(){
			if(!this.form.work_name){Message({message: '请先填写标题'});return}
			if(!this.form.content){Message({message: '请先填内容'});return}
			this.saveData(this.setSaveData(0,0),'草稿保存成功');
				
		},
		setSaveData(type,step){
			let p = localStorage.getItem('userT');
			if(!p){
				Message({message: '登录过期请先登录'});
				setTimeout(()=>{
					this.$router.push({path:'/login'})
				},1000);
				return
			}	
			let pr = this.form;
			pr.is_publish = type || 0;
			pr.step = step||0;
			pr.access_token = JSON.parse(p).access_token;		
			return pr;
		},
		saveData(data,messg,fn){	
			let pr = JSON.stringify(data);
			pr = JSON.parse(pr);
			
			pr.labels = JSON.stringify(pr.labels);
			this.api.saveWorks(pr).then(()=>{
				Message({message:messg});
				if(fn){
					fn();
				}
				
			});
		},
		checkPage1(){
			this.ck2 = "";
			if(!this.form.work_name){return false}
			if(!this.form.content){return false}
			this.ck2 = "onck2";
			this.setAutoSave();
			return true
		},
		checkPage2(){
			this.ck3 = "";
			if(!this.form.face_pic){
				return false
			}
			if(!this.form.classify_1){
				return false
			}
			this.ck3 = "onck2";
			return true
		},
		fileUpfj(flie){
			let fld = flie.target.files[0];   
			if(['application/x-zip-compressed'].indexOf(fld.type)==-1){
				Message({message: '格式不正确'});
				return
			}
			if(fld.size>20*1024*1024){
				Message({message: '文件过大'});
				return
			}
		           
				
			let app_secret = '6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY';
			let token = JSON.parse(localStorage.getItem('userT'));
			let times = (Date.parse(new Date())/1000);
			let arr = [
				1001,
				app_secret,
				token.open_id,
				times
			];
			
			let formData = new FormData();
			formData.append('app_id',1001);
			formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
			formData.append('user',token.open_id)
			formData.append('file',fld)
			formData.append('relation_type','work')
			formData.append('timestamp',times)
			let xhr = new XMLHttpRequest();
			this.upfjData = {
				file_name:fld.name,
				bf:0,
				xhr:xhr,
				type:'上传中'
			};
			let uploadProgress = (evt)=>{		
				if(evt.lengthComputable) {
					let percent = Math.round(evt.loaded * 100 / evt.total);
					this.upfjData.bf  = Math.floor(percent); 
				}
			};
			let uploadComplete = (data)=>{
				if(data.currentTarget.response){
					let da = JSON.parse(data.currentTarget.response).data;
					this.upfjData.fid=da.fid;
					this.upfjData.type='上传成功';
					this.$refs.upnfile2.value ='';		
					this.form.attachment_id = da.fid;	
					Message({message: '文件上传成功'});
				}
				
			};
			let uploadFailed = ()=>{
				// delete p;
				p.type="none";
				this.$refs.upnfile2.value ='';
				this.this.upfjData = {};
				Message({message: '文件上传失败请稍后重试'});
				
			};
			let uploadCanceled = ()=>{
				p.type="none";
				this.$refs.upnfile2.value ='';
				this.this.upfjData = {};
				Message({message: '取消成功'});
				
			};
			xhr.upload.addEventListener("progress",uploadProgress, false);
			xhr.addEventListener("load",uploadComplete, false);
			xhr.addEventListener("error",uploadFailed, false);
			xhr.addEventListener("abort",uploadCanceled, false);
			xhr.open("POST", "http://139.129.221.123/File/File/insert");
			xhr.send(formData);
		},
		qxclosd(obj){
			console.log(obj.xhr);
			if(obj.xhr){
				obj.xhr.abort();
				return
			}
			
			this.upfjData = {};
		},
		getClassify(){
			let token = localStorage.getItem('userT');
			if(!token){
				Message({message: '登录过期请先登录'});
				setTimeout(()=>{
					this.$router.push({path:'/login'})
				},1000);
				return
			}
			let pr ={
				access_token:JSON.parse(token).access_token,
			};
			
			this.api.getClassify(pr).then((da)=>{
				
				let p = JSON.stringify(da);
				p = p.replace(/classify_name/g,"label");
				p = p.replace(/id/g,"value");
				p = p.replace(/sub_data/g,"children");
	
				this.page2.classify = JSON.parse(p);
				console.log(p)
			})
		},
	}
}
</script>
<style>
.topNavComBox{
	min-width: 1300px;
	height: 80px;
	background: #FFFFFF;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);	
	margin-bottom: 20px;
}
.topNavComBox1{
	width: 1300px;
	margin: 0 auto;
	text-align: left;
	
}
.topNavComBox2{
	display: inline-block;
	font-size: 24px;
	color: #1E1E1E;
	line-height: 80px;
	margin-right: 124px;
}
.topNavComBox1>a{
	display: inline-block;
	position: relative;
	font-size: 16px;
	line-height: 74px;
	color: #1E1E1E;
	margin-right: 59px;
}
.topNavComBox1>a:after{
	content: "";
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 58px;
	height: 2px;
}
.onchekd:after{
	background: #FF5121;
}
.upBoxd>div{
	display: inline-block;
}
.upBoxd1{
	
}
.upBoxd2,.upBoxd1_1{
	background: #FFFFFF;
	
	border-radius: 5px;
}
.upBoxd1_2>.edui-default{
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	border: none;
}
.edui-default .edui-editor{
	border: none !important;
}
.edui-default .edui-editor-bottomContainer{
	display: none;
}
.upBoxd1_1{
	width: 1080px;
	height: 80px;
	margin-bottom: 17px;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	box-sizing: border-box;
    padding: 24px 30px;
	font-size: 24px;

}
.upBoxd1_1 .myInput{
	border: none;
}
.upBoxd1_1 input{
	font-size: 24px;
}
.upBoxd2{
	margin-left: 20px;
	width: 200px;
	height: 210px;
	vertical-align: top;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
}
.upBoxd2{
	font-size: 24px;
	color: #1E1E1E;
}
.upBoxd2>div{
	text-align: center;
	margin-top: 30px;
	cursor: pointer;
}
.upBoxd2>div:hover{
	opacity: .7;
}
.upBoxd2>div>span{
	font-size: 24px;
	color: #1E1E1E;
	margin-right: 20px;
}
.upBoxd1_2{
	width: 1080px;
	margin-bottom: 60px;
	
}
.edui-default .edui-editor-toolbarboxouter{
	border: none !important;
	background: none !important;
	text-align: left;
	padding-left: 35.2px;
}
.edui-editor-toolbarboxinner>div{
	margin: 20px 0;
}
.upBoxd{
	height: 597px;
}
.UpBtn1{display: block !important;}
.UpBtn1>div{
	display: inline-block;
	border: 1px solid #999999;
	border-radius: 5px;
	width: 138px;
	height: 38px;
	text-align: center;
	line-height: 38px;
	font-size: 16px;
	color: #999;
	cursor: pointer;
	margin-right: 20px;
}
.UpBtn1>div:hover{
	opacity: .7;
}
.UpBtn1>.UpBtn1_2{
	
	border-color:#666;
	background: #666;
	color: #fff;
}
.UpBtn1>div:last-child{
	margin-right: 0;
}
.UpBtn1_2.onck2 {
    background: #FF5121;
    border-color: #FF5121;
}
.page2_1{
	box-sizing: border-box;
	vertical-align: top;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	margin-right: 20px;
	width: 310px;
	height: 561px;
	padding: 30px;
}
.page2_2{
	width: 960px;
}
.page2_2>div{
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	margin-bottom: 20px;
	width: 100%;
}
.page2_2_1{
	height: 177px;
}
.page2_2_2{
	height: 137px;
}
.page2_2_3{
	height: 110px;
}
.page2_1_1{
	font-size: 14px;
	color: #333333;
	text-align: left;
	margin-bottom: 17px;
}
.btRed{
	display: inline-block;
	vertical-align: middle;
	width: 4px;
	height: 4px;
	background: red;
	border-radius: 50%;
	margin-left: 10px;
}
.page2_1_2{
	position: relative;
	background: #E6E6E6;
	border-radius: 5px;
	margin:  0 auto 57px;
	overflow: hidden;
	width: 260px;
	height: 195px;
	cursor: pointer;
}
.page2_1_2:hover{
	opacity: .7;
}
.page2_1_2:hover>img{
	opacity: 0;
}
.page2_1_2>img{
	position: absolute;
	top: 0;
	left: 0;
	display: block;
	width: 100%;
	height: 100%;
	pointer-events: none;
}
.page2_1_2>div{	
	background: #E6E6E6;
	border-radius: 5px;
	width: 100%;
	height: 100%;
	font-size: 14px;
	color: #333333;
}
.page2_1_2>div>div{
	width: 22.9px;
	height: 22.9px;
	border-radius: 50%;
	font-size: 21px;
	text-align: center;
	line-height: 22.9px;
	background: #FF5121;
	color:  #E6E6E6;
	margin: 84px auto 11px;
}
.page2_1_2>input{
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	
}
.page2_1_3{
	text-align: left;
	font-size: 14px;
	color: #333333;
	margin-bottom: 12px;
}
.page2_1_3>span{
	color: #999999;
	margin-left: 30px;
}
.page2Tbnd1{
	display: inline-block;
	box-sizing: border-box;
	border: 1px solid #979797;
	border-radius: 15px;
	width: 90px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	font-size: 14px;
	color: #333333;
	cursor: pointer;
}
.page2_1_4{
	text-align: left;
	position: relative;
	margin-bottom: 27px;
}
.page2_1_4file{
	cursor: pointer;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.page2_1_5{
	text-align: left;
	font-size: 14px;
	color: #333333;
	margin-bottom: 7px;
}
.page2_1_5>span{
	position: relative;
    display: inline-block;
    background: #D8D8D8;
    border-radius: 4px;
    margin: 0 8px 0 20px;
    width: 127px;
    height: 4px;
	overflow: hidden;
}
.page2_1_5>span>span{

	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #FF5121;
	-webkit-transform: translateX(-100%);
	transform: translateX(-100%);
}
.page2_1_6{
	text-align: left;
	position: relative;
	margin-bottom: 27px;
}
.page2_1_6>div{
	position: relative;
	display: inline-block;
	margin-right: 32px;
}
.page2_1_6>div:hover{
	opacity: .7;
}
.page2_1_6>span{
	font-size: 14px;
	color: #333333;
}
.page2_1_6>span>span{
	margin-left: 9px;
	color: #999;
}
.page2_1_7>div{
	text-align: left;
	font-size: 14px;
	color: #333333;
}
.page2_1_7>div:first-child{
	margin-bottom: 9px;
}
.page2_1_7_r>label>div{
	display: inline-block;
	position: relative;
	margin-right: 10px;
}
.page2_1_7_r>label>div>div{
	vertical-align: middle;
	box-sizing: border-box;
	border: 1px solid #999999;
	border-radius: 2px;
	width: 8px;
	height: 8px;
}
.page2_1_7_r>label{
	cursor: pointer;
}
.page2_1_7_r>label:hover{
	opacity: .7;
}
.page2_1_7_r>label:first-child{
	margin-right: 34px;
}
.page2_2>div{
	box-sizing: border-box;
	padding: 30px;
}
.page2_2_1_1{
	text-align: left;
	font-size: 14px;
	color: #333333;
	margin-bottom: 17px;
}
.page2_2_1_1>span{
	margin-left: 29px;
	color: #999;
}
.page2_2_1_2{
	text-align: left;
	font-size: 14px;
	color: #333333;
}
.page2_2_1_2 .inptud{
	display: inline-block;
	width: 311px;
	margin-right: 10px;
	vertical-align: middle;
	margin-bottom: 0;
	
}
.page2_2_1_2 .myInput{
	box-sizing: border-box;
    border: 1px solid #979797;
    border-radius: 5px;
    
    height: 44px;
    padding: 1px 20px;
}
.page2_2_1_2x>span{
	box-sizing: border-box;
	display: inline-block;
	background: #333333;
	border-radius: 5px;
	padding: 0 10px;
	height: 27px;
    line-height: 27px;
	font-size: 14px;
	color: #999;
	margin-right: 20px;
}
.page2_2_1_2x>span>span{
	font-size: 12px;
	text-align: center;
	margin-left: 12px;
}
.page2_2_1_2>div{
	margin-bottom: 12px;
}
.page2_2_2{
	text-align: left;
}
.page2_2_2>div{
	display: inline-block;
	font-size: 14px;
	color: #333333;
	vertical-align: middle;
}
.xzInput{
	position: relative;
	border: 1px solid #979797;
	border-radius: 5px;
	box-sizing: border-box;
	width: 100%;
	height: 40px;
	padding: 10px;
	cursor: pointer;
}

.xzInput:after{
    content: "";
    position: absolute;
    top: 15px;
    right: 16px;
    width: 0;
    height: 0;
    border-width: 7px;
    border-style: solid;
    border-color: #999 transparent transparent transparent;
    border-radius: 4px;
}
.xzInput>div{
	position: absolute;
	bottom: 0;
	left: 0;
	background: #FFFFFF;
	box-shadow: 0 3px 6px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	-webkit-transform: translateY(117%);
	transform: translateY(101%);
	overflow: hidden;
	width: 100%;
}
.xzInput2>div{
	
	width: 50%;
}
.xzInput2>div:nth-child(2){
	transform: translate(100%,101%);
}
.xzInput2>div:nth-child(3){
	transform: translate(200%,101%);
}
.xzInput3>div>div{
	width: 100%;
	height: 30px;
	font-size: 14px;
	line-height: 30px;
	text-align: left;
	font-size: 14px;
	color: #333333;
	text-indent: 20px;
}
.xzInput2>div>div{
	width: 100%;
	height: 30px;
	font-size: 14px;
	line-height: 30px;
	text-align: left;
	font-size: 14px;
	color: #333333;
	text-indent: 20px;
}
/* .xzInput>div>div{
	text-indent: 20px;
	overflow: hidden;
} */
.sertcheck{
	color: #666666;
	background: #999999;
	opacity: .3;
}

.page2_2_2_1{
	width: 150px;
	margin-right: 221px;
}
.page2_2_2_1_1,.page2_2_2_2_1{
	margin-bottom: 17px;
}
.page2_2_2_2{
	width: 357px;
}
.page2_2_3_1{
	text-align: left;
	font-size: 14px;
	color: #333333;
	margin-bottom: 13px;
}
.page2_2_3_1>span:last-child{
	font-size: 14px;
	color: #999999;
	margin-left: 30px;
	
}

.page2_2_3 .page2_1_7_r{
	text-align: left;
	font-size: 14px;
	color: #333333;
}
.chekdOn{
	background: #FF5121;
	border-color: #FF5121 !important;
}
</style>
