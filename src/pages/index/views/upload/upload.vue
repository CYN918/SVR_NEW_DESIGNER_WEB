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
					<Input class="userBoxdC" v-model="form.work_name" :valued="csz"  :oType="'max'" :max="50"   :type="'text'" :placeholder="'请输入作品标题…'"></Input>	
				</div>
				<div class="upBoxd1_2">
					<vue-ueditor-wrap :config="myConfig" @ready="ready" v-model="form.content"></vue-ueditor-wrap>
				</div>
			</div>
			<div class="upBoxd2">
				
				<div @click="showUp(0)"><img class="svgImg1" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/sc_icon_sctp.svg" alt="" />上传图片</div>
				<div @click="showUp(1)"><img class="svgImg1" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/sc_icon_scsp.svg" alt="" />上传视频</div>
				<div @click="showUp(2)"><img class="svgImg1" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/sc_icon_scyp.svg" alt="" />上传音频</div>
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
				<div class="page2_1_3">上传附件<span>ZIP，1G以内</span></div>
				<div :class="['page2_1_4',isUpd?'isUpd':'']">
					<div class="page2Tbnd1">{{fjtext}}</div>
					<input v-if="!isUpd" @change="fileUpfj" class="page2_1_4file" ref="upnfile2" type="file">
				</div>
				<div v-if="upfjData.type" class="page2_1_5">{{upfjData.type}}<span><span :style="{transform:'translateX(-'+(100-upfjData.bf)+'%)'}"></span></span>{{upfjData.bf+'%'}}</div>
				<div class="page2_1_6" v-if="upfjData.type">
					
					<span class="iconfont" :title="upfjData.file_name">&#xe621;{{upfjData.file_name?upfjData.file_name.substring(0,10):''}}<span @click="qxclosd(fileUpfj)" class="iconfont pend">&#xe619;</span></span>
					
				</div>
				<div class="page2_1_7">
					<div>附件内容</div>
					<div class="page2_1_7_r">
						<label>
							<div><div :class="form.attachment_visible==1?'chekdOn':''"></div>
							<input class="page2_1_4file" type="radio" v-model="form.attachment_visible" value="1" name="isme" ></div>
							所有人可见
						</label>
						<label>
							<div><div :class="form.attachment_visible==0?'chekdOn':''"></div>
							<input class="page2_1_4file" type="radio" v-model="form.attachment_visible" value="0" name="isme" ></div>
							仅自己可见
						</label>
					</div>
				</div>
			</div>
			<div class="page2_2">
				<div class="page2_2_1">
					<div class="page2_2_1_1">作品标签<span>标签可以将作品自动推荐给可能感兴趣的人</span></div>
					<div class="page2_2_1_2">
						<div>
							<Input class="userBoxd2" v-model="tags" :keyup="keydown"  :oType="'max'" :max="10"   :type="'text'" :placeholder="'输入标签，回车添加标签'" ref="tageds"></Input>
							<span @click="keydown" :class="['tagBtn',isTageok?'istageok':'']">添加标签</span>还可添加{{5-form.labels.length}}个标签
						</div>
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
				<div v-if="checkisptggr()" class="page2_2_3">
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
		<upoloadcaver v-show="isPhto" @close="close" ref="upoloadcaver" :InputValue="form.work_name" :type="selectedOptions"></upoloadcaver>
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
			isUpd:'',
			ifBjType:0,
			bqList:[{label:'禁止匿名转载；禁止商业使用；禁止个人使用。'},{label:'禁止匿名转载；禁止商业使用。'},{label:'不限制用途。'}],
			isPhto:false,
			chekin:true,
			isshowT1:false,
			isshowT2:false,
			isTageok:'',
			ck2:'',
			ck3:'',
			csz:'',
			fjtext:'选择附件',
			chekusername:()=>{},
			form:{
				work_name:'',
				
				attachment_visible:1,
				labels:[],
				copyright:'禁止匿名转载；禁止商业使用；禁止个人使用。',
				is_platform_work:0,
				content:'<p style="color:#999">从这里开始编辑作品内容...</p>'
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
					type:['audio/ogg','audio/mp3','audio/wav','audio/mpeg'],
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
			dmtData:'',
			zk_wrokids:[],
			saveTyped:'',
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
		'tags'(){
			
			if(this.tags){
				this.isTageok =1;
			}else{
				this.isTageok = '';
			}
		}
	},
	created:function(){
		this.init();
		this.getClassify();
	},
	mounted: function () {	
		this.getUserDetail();
	}, 
	methods: {
		
		getUserDetail(){
			if(!window.userInfo){
				this.$router.push({path:'/login'})
				return
			}	
			let pr={};
			this.api.getSelfInfo(pr).then((da)=>{
				if(da=='error'){return}
			
				let userData = window.userInfo.access_token;
				window.userInfo = da;
				window.userInfo.access_token = userData;
			});
		},
		
		/*page2*/
		checkisptggr(){
			if(!window.userInfo){
				this.$router.push({path:'/login'});
				return '';
			}
			if(window.userInfo.contributor_format_status==2){
				return 1;
			}
			return '';
		},
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
			if(!this.isTageok){
				return
			}
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
			this.$refs.upoloadcaver.setImgd(this.form.face_pic,this.form.work_id);
		},
		close(img,fmid){
			this.isPhto = false;
			if(img){
				this.form.face_pic = img;
			}	
			this.zk_wrokids[0] = fmid;	
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
			if(this.$route.fullPath!='/upload'){
				/*已离开不再保存*/
				return 
			}
			
			this.saveData(dat,'自动保存成功');
		},
		init(O){
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
			if(!window.userInfo){
				Message({message: '请先登录'});
				return
					setTimeout(()=>{				
						this.$router.push({path:'/login'})
					},2000);
				return
			}	
			
			if(this.$route.query.id){
				this.getData(this.$route.query.id);
				return
			}
			this.getWorkId();
		},
		saved(){
			this.saveData(0,'保存成功');			
		},
		setChekin(type){
			if(!this.form.work_name||this.form.work_name.split(" ").join("").length == 0){
				Message({message: '请先填写标题'});
				return
			}
			if(!this.form.content || this.ifBjType==0){
				Message({message: '请先填写内容'});
				return
			}
			
			
			this.chekin = type;
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
			let regex = /<img.*?src="(.*?)"/;
			
			let src = regex.exec(this.form.content);
			if(!src){
				return
			}
			src = src[1];			
			
			
		},
		ready (editorInstance) {
			this.uD = editorInstance;
			editorInstance.addListener('focus',(editor)=>{				
					if(this.ifBjType==0){
						this.form.content = '';
						this.ifBjType=1;				
					}
			});
			editorInstance.addListener('blur',(editor)=>{
				if(this.ifBjType==1 && this.form.content==''){			
					this.form.content = '<p style="color:#999">从这里开始编辑作品内容...</p>';
					this.ifBjType=0;
				}	
			});

		},
		closed(cr){
			this.isshowd=false;
			if(cr){
				return
			}
			if(this.ifBjType==1 && this.form.content==''){			
				this.form.content = '<p style="color:#999">从这里开始编辑作品内容...</p>';
				this.ifBjType=0;
			}
		},
		showUp(on){
			this.upConfig = this.upList[on];
			this.isshowd = true;
			if(this.ifBjType == 0){
				this.ifBjType = 1;
				this.form.content = '';
			}
			
		},
		inImg(list,ids){
		
			let str = '';
			if(this.upConfig.type[0]=='image/gif'){
				list.map((el,index,va)=>{
					str+='<p style="max-width:100%;height:auto;"><img zk_workid="'+ids[index]+'" style="max-width:100%;height:auto" src="'+el+'"/></p>';
				});								
				this.uD.execCommand('insertHtml', str);	
				this.uD.execCommand( 'insertparagraph' )
				return
				
			}
			
			if(this.upConfig.type[0]=='video/mp4'){
				list.map((el,index,va)=>{
					str+='<p style="display:none">1</p><p style="box-shadow: 0 5px 10px 0 rgba(0,0,0,0.10);border-radius: 12.55px;overflow: hidden;margin: 40px auto;width: 600px;height: 338px;"><video zk_workid="'+ids[index]+'" style="width: 100%;height:100%" controls="controls" src="'+el+'"></video></p>';					
				});
				this.uD.execCommand( 'insertparagraph' );
				this.uD.execCommand('insertHtml', str);
				
				
				return
			}
			if(this.upConfig.type[0]=='audio/ogg'){
				list.map((el,index,va)=>{					
					str+='<p style="display:none">1</p><p style="background: #FFFFFF;box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10);border-radius: 5px;margin: 40px auto;width: 600px;height:90px;" ><audio zk_workid="'+ids[index]+'" style="width: 86%;margin: 18px;" id="xx" src="'+el+'" controls="controls"></audio></p>';
				});
				this.uD.execCommand( 'insertparagraph' )
				this.uD.execCommand('insertHtml', str);
				
				return
			}
			
			
		},
		getWorkId(){
					
			let params = {
				access_token:window.userInfo.access_token
			};
			this.api.getWorkId(params).then((da)=>{
				if(da=='error'){
					return
				}
				this.form.work_id = da.work_id;
			});
		},
		getData(id){
			
			let pr = {
				access_token:window.userInfo.access_token,
				work_id:id,
				is_draft:1
			};
			this.api.getWorkDetail(pr).then((da)=>{
				if(da=='error'){
					return
				}
				this.form = da;		
				this.csz = da.work_name;				
				try{
					this.form.labels = JSON.parse(this.form.labels);
				}catch(e){}
				this.selectedOptions = [this.form.classify_1,this.form.classify_2,this.form.classify_3];
				if(this.form.attachment){
					this.upfjData.fid=this.form.attachment_id;
					this.upfjData.type='上传成功';
					this.$refs.upnfile2.value ='';		
					this.form.attachment_id = da.attachment_id;	
					this.upfjData.bf = 100;
					this.upfjData.file_name = this.form.attachment.file_name;
				};
				this.ifBjType=1;
				
			})

		},
		seeCg(){
			if(!this.form.work_name||this.form.work_name.split(" ").join("").length == 0){Message({message: '请先填写标题'});return}
			if(!this.form.content){Message({message: '请先填内容'});return}
			if(!this.form.face_pic){Message({message: '请先上传封面'});return}
			if(!this.form.classify_1){Message({message: '请先选择作品类型'});return}
		
			this.checkAutoSave();
			setTimeout(()=>{
				window.open('#/conts?id='+this.form.work_id)
			
			},1000)			
		},
		savZp(){
			if(this.saveTyped==1){
				Message({message: '正在记录请稍后再试'});
				return
			}
			if(!this.form.work_name||this.form.work_name.split(" ").join("").length == 0){Message({message: '请先填写标题'});return}
			if(!this.form.content){Message({message: '请先填内容'});return}
			if(!this.form.face_pic){Message({message: '请先上传封面'});return}
			if(!this.form.classify_1){Message({message: '请先选择作品类型'});return}
			clearTimeout(this.autoSave.obj);
			let str = this.form.content;
			var matchReg = /zk_workid=".*?(?=")/gi;
			let arr = str.match(matchReg);
			if(arr){
				for(let i=0,n=arr.length;i<n;i++){
					arr[i] = arr[i].split('"')[1];
				}
				this.zk_wrokids = this.zk_wrokids.concat(arr);
			}	
			let dp = this.setSaveData(1,1);
			dp.link_ids = this.zk_wrokids.join(',');
			this.saveData(dp,'上传成功',()=>{setTimeout(()=>{this.$router.push({path:'/'})},1000)});
		},
		userSave(){
			if(this.saveTyped==1){
				Message({message: '正在记录请稍后再试'});
				return
			}
			if(!this.form.work_name||this.form.work_name.split(" ").join("").length == 0){Message({message: '请先填写标题'});return}
            if(!this.form.content){Message({message: '请先填内容'});return}
			clearTimeout(this.autoSave.obj);
			this.saveData(this.setSaveData(0,0),'草稿保存成功');
				
		},
		setSaveData(type,step){
			
			if(!window.userInfo){
				Message({message: '登录过期请先登录'});
				setTimeout(()=>{
					this.$router.push({path:'/login'})
				},1000);
				return
			}	
			let pr = this.form;
			pr.is_publish = type || 0;
			pr.step = step||0;
			pr.access_token = window.userInfo.access_token;		
			return pr;
		},
		saveData(data,messg,fn){	
			let pr = JSON.stringify(data);
			pr = JSON.parse(pr);
			this.saveTyped=1
			pr.labels = JSON.stringify(pr.labels);
			this.api.saveWorks(pr).then(()=>{
				this.saveTyped='';
				Message({message:messg});
				if(fn){
					fn();
				}
				
			}).catch(()=>{
				this.saveTyped='';
			});	
		},
		checkPage1(){
			this.ck2 = "";
			if(!this.form.work_name){return false}
			if(!this.form.content){return false}
			if(this.ifBjType==0){
				return false;
			}
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
			if(this.fjtext== '上传中'){
				return
			}
			if(this.upfjData.type && this.upfjData.type!='上传成功'){
				Message({message: '正在上传中请稍后'});
				return
			}		
			let fld = flie.target.files[0];			
            if(['application/x-zip-compressed','application/zip'].indexOf(fld.type)==-1){
                Message({message: '格式不正确'});
				return
			}
			if(fld.size>1024*1024*1024){
				Message({message: '文件过大'});
				return
			}
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
			this.upfjData = {
				file_name:fld.name,
				bf:0,
				xhr:xhr,
				type:'上传中'
			};
			this.isUpd=1;
			this.fjtext= '上传中';
			let uploadProgress = (evt)=>{		
				if(evt.lengthComputable) {
					let percent = Math.round(evt.loaded * 100 / evt.total);
					let op = Math.floor(percent);
					if(op==100){
						return
					}
					this.upfjData.bf  = op; 
				}
			};
			let uploadComplete = (data)=>{
				this.upfjData.bf  = 100;
				this.isUpd='';
				if(data.currentTarget.response){
					let da = JSON.parse(data.currentTarget.response).data;
					
					this.upfjData.fid=da.fid;					
					this.zk_wrokids[1] = da.fid;
					this.fjtext= '重新上传';
					this.upfjData.type='上传成功';
					
						
					this.form.attachment_id = da.fid;	
					Message({message: '文件上传成功'});

				}
				
			};
			let uploadFailed = ()=>{
				// delete p;
				this.$refs.upnfile2.value ='';
				this.isUpd='';
				this.upfjData = {};
				Message({message: '文件上传失败请稍后重试'});
				
			};
			let uploadCanceled = ()=>{
				this.$refs.upnfile2.value ='';
				this.isUpd='';
				this.upfjData = {};
				Message({message: '取消成功'});
				
			};
			xhr.upload.addEventListener("progress",uploadProgress, false);
			xhr.addEventListener("load",uploadComplete, false);
			xhr.addEventListener("error",uploadFailed, false);
			xhr.addEventListener("abort",uploadCanceled, false);
			xhr.open("POST", window.basrul+"/File/File/insert");
			xhr.send(formData);
		},
		qxclosd(obj){
			this.isUpd='';
			this.fjtext = '选择附件';
			this.form.attachment_id='';
			if(this.upfjData.xhr){
				this.upfjData.xhr.abort();				
			
			}		
			
			this.upfjData = {};
		},
		getClassify(){
			
			if(!window.userInfo){
				Message({message: '登录过期请先登录'});
				setTimeout(()=>{
					this.$router.push({path:'/login'})
				},1000);
				return
			}
			let pr ={
				access_token:window.userInfo.access_token,
			};
			
			this.api.getClassify(pr).then((da)=>{
				if(da=='error'){
					return
				}
				let p = JSON.stringify(da);
				p = p.replace(/classify_name/g,"label");
				p = p.replace(/id/g,"value");
				p = p.replace(/sub_data/g,"children");
				this.page2.classify = JSON.parse(p);
         
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
	
	color: #999999;
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
.topNavComBox1>a.onchekd{
	color: #1E1E1E;
}
.topNavComBox1 .nubMax{
	font-weight: 200;
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
	display: inline-block;
	text-align: center;
	margin-top: 30px;
	line-height: 30px;
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
	min-height: 440px;
	max-height: 600px;
	padding: 1px;
	overflow: hidden;
	margin-bottom: 60px;
	-webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    border-radius: 5px;
}
.edui-default .edui-editor-toolbarboxouter{
	border: none !important;
	background: none !important;
	text-align: left;
	padding-left: 21.2px;
}
.edui-editor-toolbarboxinner>div{
	margin: 20px 0;
}
.upBoxd{
	min-width: 1305px;
	height: 756px;
}
.UpBtn1{display: block !important;margin-bottom: 60px;}
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
	opacity: 0.2;
}
.page2_1_2>img{
	position: absolute;
	top: 0;
	left: 0;
	display: block;
	width: 100%;
	height: 100%;
	pointer-events: none;
	background:#E6E6E6 ;
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
	color: #999;
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
	vertical-align: middle;
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
	vertical-align: middle;
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

.isUpd>.page2Tbnd1{
	color: #999;
    border-color: #999;
	cursor: context-menu;
}
.page2_1_7_r>label>div>div.chekdOn{
	border-color: rgb(255, 81, 33);
	background: rgb(255, 81, 33);
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
	font-size: 12px;
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
.inptud{
	height: 47px!important;
}
.page2_2_1_2 .myInput{
	box-sizing: border-box;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    
    height: 44px;
    padding: 1px 10px;
}
.page2_2_1_2x>span{
	box-sizing: border-box;
	display: inline-block;
	background: #e6e6e6;
	border-radius: 5px;
	padding: 0 10px;
	height: 27px;
    line-height: 27px;
	font-size: 14px;
	color: #666;
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
	font-size: 12px;
	color: #999999;
	margin-left: 30px;
	
}

.page2_2_3 .page2_1_7_r{
	text-align: left;
	font-size: 14px;
	color: #333333;
}
.page2_1_7_r .chekdOn>div{
	background: #FF5121;
	border-color: #FF5121;
}
.el-select{width: 100%}
.upBoxd1_2 iframe{
	padding: 20px 22px;
	box-sizing: border-box;
}
.el-cascader .el-input.is-focus .el-input__inner{
	border-color: #FF5121 !important;
}
.el-input.is-active .el-input__inner, .el-input__inner:focus{
	border-color: #FF5121 !important;
}
.edui-default .edui-editor-toolbarbox{
	position: relative !important; 
	background: #fff;
}
.page2_2_2_2_2 .el-input.is-active .el-input__inner, .el-input__inner:focus{
	border-color: #C0C4CC !important;
}
.svgImg1{
	display: inline-block;
	width: 28px;
	vertical-align: text-bottom;
    margin-right: 12px;
}
.tagBtn{
	cursor: pointer;
	display: inline-block;
	vertical-align: middle;
	text-align: center;
	width:100px;
	height:40px;
	background:rgba(153,153,153,1);
	border-radius:5px;
	font-size:14px;
	font-weight:400;
	color:rgba(255,255,255,1);
	line-height:40px;
	margin-right: 10px;
}
.istageok{
	background: #FF5121;
}
</style>
