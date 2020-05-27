<template>
    <div>
        <div class="uploadContainer">
            <el-row>
                <el-col :span="24">
                    <el-card class="commonCard">
                        <div slot="header">
                            <span>作品信息</span>
                        </div>
                        <el-form>
                            <el-form-item>
                                <el-row>
                                    <el-col :span="19">
                                        <el-input v-model="form.work_name" placeholder="请输入作品标题" maxlength="50" show-word-limit @blur="checkValue('title')"></el-input>
                                        <span class="btBlue"></span>
                                    </el-col>
                                    <el-col v-show="nameNull" :span="5" class="notice"><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/warning-circle.svg" alt="" />请输入作品标题</el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item>
                                <el-row>
                                    <el-col :span="5">
                                        <el-cascader 
                                            :options="page2.classify"
                                            v-model="selectedOptions"
                                            placeholder="选择作品类型"
                                            style="width: 100%"
                                            @blur="checkValue('type')"
                                        >
                                        </el-cascader>
                                        <span class="btBlue"></span>
                                    </el-col>
                                    <el-col :offset="2" :span="10">
                                        <el-select v-model="form.copyright" style="width: 100%">
                                            <el-option
                                                v-for="item in bqList"
                                                :key="item.label"
                                                :label="item.label"
                                                :value="item.label"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col v-show="typeNull" :offset="2" :span="5" class="notice"><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/warning-circle.svg" alt="" />请选择作品类型</el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item>
                                <el-row>
                                    <el-col :span="24" ref="asdsss">
                                        <vue-ueditor-wrap :config="myConfig" @ready="ready" v-model="form.content" ></vue-ueditor-wrap>
                                        <div class="uploadBtn">
                                            <span>
												<img class="svgImg1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/sc_icon_sctp.svg" alt="" />上传图片
												<input @change="(file) => showUp(0,'上传图片', file, 'upnfileimg')" class="uploadBoxd2_2_2_1" ref="upnfileimg" :accept="upList[0].typexz"  multiple="multiple" type="file" />
											</span>
                                            <span>
												<img class="svgImg1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/sc_icon_scsp.svg" alt="" />上传视频
												<input @change="(file) => showUp(1,'上传视频', file, 'upnfilevdo')" class="uploadBoxd2_2_2_2" ref="upnfilevdo" :accept="upList[1].typexz"  multiple="multiple" type="file" />
											</span>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-card class="commonCard" style="height: 380px">
                        <div slot="header">
                            <span>上传作品封面</span>
                        </div>
                        <div :class="['page2_1_2', !form.face_pic?'noUp':'']">
                            <img v-if="form.face_pic" :src="form.face_pic" alt="">
                            <div @click="showupFm" v-if="!form.face_pic" class="page2_1_2_1"><div>+</div>上传封面</div>
							<div @click="showupFm" v-else class="page2_1_2_2">替换封面</div>
                        </div>
						<span class="btBlue" style="top: 130px;left: 310px;"></span>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="commonCard" style="height: 380px">
                        <div slot="header">
                            <span>添加作品标签</span>
                        </div>
                        <div class="tagWrapper">
							<div class="input-tag-container" v-if="inputVisible">
								<input
									class="input-new-tag" type="text"
									placeholder="请输入文字，enter结束输入"
									v-model="tags"
									ref="saveTagInput"
									@keyup.enter="keydown"
									@blur="keydown">
								<i class="el-icon-plus" style="color:#33B3FF"></i>
							</div>
                            <span v-else class="button-new-tag" @click="showInput">+ 标签</span>
                            <div class="leftTagNum">还可添加{{5-form.labels.length}}个标签</div>
                            <div class="tagContainer">
								<span class="custom_tag" v-for="(el, index) in form.labels" :key="index">{{el}}<i @click="deletTage(index)">x</i></span>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="commonCard" style="height: 210px">
                        <div slot="header">
                            <span>上传附件 <span class="description">1GB以内</span></span>
                        </div>
                        <div :class="['page2_1_4',isUpd?'isUpd':'']">
                            <div class="page2Tbnd1">{{fjtext}}</div>
                            <input v-if="!isUpd" @change="fileUpfj" class="page2_1_4file" ref="upnfile2" type="file">
							<div class="page2_1_6" v-if="upfjData.type">
								
								<span class="iconfont" :title="upfjData.file_name">&#xe621;<span style="padding-left: 10px">{{upfjData.file_name?upfjData.file_name.substring(0,10):''}}</span></span>
								<span @click="qxclosd(fileUpfj)" class="iconfont pend" style="float: right;">&#xe619;</span>
								
							</div>
							<div v-if="upfjData.type && isUpd" class="page2_1_5"><span><span :style="{transform:'translateX(-'+(100-upfjData.bf)+'%)'}"></span></span></div>
                        </div>
						<div class="radio-group">
							<label for="attachment1">
								<span :class="[form.attachment_visible=='0'?'_chosed':'']">
									<i class="el-icon-check"></i>
								</span>
								<input id="attachment1" type="radio" value="0" v-model="form.attachment_visible">仅自己可见
							</label>
							<label for="attachment2">
								<span :class="[form.attachment_visible=='1'?'_chosed':'']">
									<i class="el-icon-check"></i>
								</span>
								<input id="attachment2" type="radio" value="1" v-model="form.attachment_visible">所有人可见
							</label>
						</div>
                    </el-card>
                    <el-card class="commonCard" style="height: 148px">
                        <div slot="header" style="position: relative">
                            <span>设为投稿作品 <span class="description" style="margin-left:10px">若作品符合需求，平台会联系你沟通收录细节</span></span>
							<span class="btBlue" style="left: 100px"></span>
                        </div>
						<div class="radio-group" v-if="checkisptggr()">
							<label for="platform1">
								<span :class="[form.is_platform_work=='1'?'_chosed':'']">
									<i class="el-icon-check"></i>
								</span>
								<input id="platform1" type="radio" value="1" v-model="form.is_platform_work">是
							</label>
							<label for="platform2">
								<span :class="[form.is_platform_work=='0'?'_chosed':'']">
									<i class="el-icon-check"></i>
								</span>
								<input id="platform2" type="radio" value="0" v-model="form.is_platform_work">否
							</label>
						</div>
						<div class="certification" v-else>你还不是供稿人，现在<span @click="goZP">立即认证</span>，享受你的作品收益</div>
                    </el-card>
                </el-col>
            </el-row>

            <div class="handleContainer">
                <el-button v-if="form.status != 2" @click="userSave">保存</el-button>
                <el-button v-if="form.status != 2" @click="seeCg">预览</el-button>
                <el-button @click="savZp" type="primary" :disabled="!ck3">提交发布</el-button>
            </div>
        </div>
		<div class="top_to_down">
			<div class="el-icon-arrow-up toTop"  @click="scrollToTop"></div>
			<div class="el-icon-arrow-down toDown" @click="scrollToBottom"></div>
		</div>
        <TcBox :config="outc" ref="tcBox">
			<template v-slot:todo="{ todo }">
				<component v-bind:is="tcZj"  :datad="tcData"></component>
			</template>
		</TcBox>
        <UplodImg v-if="isshowd" :configData="upConfig"></UplodImg>
    </div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import UplodImg from './uploadImag'
// import Input from '../../components/input'
import uploadFm from './uploadFm';
import {Message} from 'element-ui'
import { Loading } from 'element-ui';
import TcBox from '../../components/TcBox'
import UploadImagMixin from './uploadImag'
export default {
    name: 'index',
	components: { VueUeditorWrap,  UplodImg, uploadFm, TcBox},
	mixins: [UploadImagMixin],
    data(){
        return {
            inputVisible: false,
            nameNull: false,
            typeNull: false,
			tanData:{},
			outc: {
				title: '上传封面',
			},
			tcZj:'',
			tcData:{},
			isUpd:'',
			ifBjType:0,
			bqList:[{label:'禁止匿名转载；禁止商业使用；禁止个人使用。'},{label:'禁止匿名转载；禁止商业使用。'},{label:'不限制用途。'}],
			isPhto:true,
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
				autoHeightEnabled: true,
				initialFrameHeight: 500,
				initialFrameWidth: '100%',
				UEDITOR_HOME_URL: '/UEditor/',
				elementPathEnabled: false,
				wordCount: false,
				autoFloatEnabled: false,
				toolbars: [ ['undo', 'redo', '|', 'combox', 'link', 'justifyleft', 'justifycenter', 'justifyright'] ]
			},			
			isshowd:false,
			upList:[
				{
					title:'我的图片素材库',
					title2:'上传文件大小需小于10M，支持JPG、PNG、GIF格式。',					
					btn:'上传图片素材',
					max:10*1024*1024,
					type:['image/gif','image/jpeg','image/png'],
					getType:'image',
					typexz:'image/*,image/jpeg,image/png,image/gif'
				},
				{
					title:'我的视频素材',
					title2:'上传文件大小需小于1.5G，支持主流的视频格式',
					tip:['常见的在线流媒体格式：mp4、Ogg、WebM'],
					btn:'上传视频素材',
					max:1.5*1024*1024*1024,
					type:['video/mp4','video/ogg','video/webm'],
					getType:'video',
					typexz:'video/*,video/mp4'
				},
				{
					title:'我的音频素材',
					title2:'格式支持mp3、Ogg、Wav，文件大小不超过50M',
					btn:'上传音频素材',
					max:50*1024*1024,
					type:['audio/ogg','audio/mp3','audio/wav','audio/mpeg'],
					getType:'audio',
					typexz:'audio/ogg,audio/mp3,audio/wav,audio/mpeg'
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
			isYl:'',
			loading:'',
		}  
	},
	beforeDestroy:function(){
		if(this.loading){
			this.loading.close();
		}
		
	},
	watch: {	
		'form.work_name'() {				
			this.checkPage1();
            if (this.form.work_name) this.nameNull = false
            else this.nameNull = true			
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
                this.typeNull = true
				return
            }
            this.typeNull = false
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
			this.checkPage2();
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
		let right = (document.body.clientWidth - 1300) / 2 - 50
		let dom = document.querySelector('.top_to_down')
		if (dom) dom.style.right = right + 'px'
	}, 
	methods: {
		scrollToTop() {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			})
		},
		scrollToBottom() {
			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: 'smooth'
			})
		},
		goZP() {
			this.$router.push({ path: '/setRz' })
		},
        checkValue(type) {
            if (type == 'title') {
                if (this.form.work_name == '') this.nameNull = true
                else this.nameNull = false
            }
            if (type == 'type') {
                if (this.selectedOptions.length == 0) this.typeNull = true
                else this.typeNull = false
            }
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.focus();
            });
        },
		showTc() {
            console.log(123)
			this.$refs.tcBox.show();
		},
		closeTc() {
			this.$refs.tcBox.close();
		},
		getUserDetail(){
			if(!window.userInfo){
				this.$router.push({path:'/login'})
				return
			}	
			let pr={};
			this.api.getSelfInfo(pr).then((da)=>{
				if(da=='error' || da=='104'){return}
			
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
                this.inputVisible = false;
				return
			}
			if(!this.tags){
                this.inputVisible = false;
				return
			}
			if(this.form.labels.indexOf(this.tags)!=-1){
                Message({message: '该标签已添加'});
				this.inputVisible = false;
				this.tags = ''
				return
			}
			if(this.form.labels.length===5){
                Message({message: '最多填写5个标签'});
				this.inputVisible = false;
				this.tags = ''
				return
			}
            this.form.labels.push(this.tags);
            this.inputVisible = false;
			this.tags = '';
			// this.$refs.tageds.clearValue();
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
			this.tcData = {
				avatar:window.userInfo.avatar,
				work_name:this.form.work_name,
				face_pic:this.form.face_pic,
				work_id:this.form.work_id,
				cl1:'原创',
				cl2:'作品类型',
				cl3:'',
			};
			let p1 = this.setCls(this.page2.classify,'value',this.form.classify_1);
			if(p1){
				this.tcData.cl1 = p1.a;
				let p2Ob = this.page2.classify[p1.b].children;						
				let p2 = this.setCls(p2Ob,'value',this.form.classify_2);						
				this.tcData.cl2 = p2.a
				let p3 = this.setCls(p2Ob[p2.b].children,'value',this.form.classify_3);
				this.tcData.cl3 = p3.a
			}
			
			
			
			
			
			this.tcZj = 'uploadFm';
			this.showTc();
			// this.bdtj('上传作品-其他信息设置','上传封面','--');
			// this.isPhto = true;
			// this.showupFm();
			// this.$refs.upoloadcaver.setImgd(this.form.face_pic,this.form.work_id);
		},
		setCls(ob,key,val){
			let str;
			for(let i=0,n=ob.length;i<n;i++){
				if(ob[i][key]==val){
					str =  {a:ob[i].label,b:i};
					break;
				}
			}
			return str;
			
		},
		close(img,fmid){
			
			this.closeTc();
			if(img){
				this.$set(this.form,'face_pic',img)

			}	
			
			this.zk_wrokids[0] = fmid;	
		},
		showTd(on){
			this[on] = true;
		},
		closeTd(on){
			window.event? window.event.cancelBubble = true : window.event.stopPropagation();
			this[on] = false;
		},
		setAutoSave(){
			if (this.form.status == 2) return
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
		
				if(this.isYl){
					this.isYl='';
					window.open('#/conts?id='+this.form.work_id);
				}
				
				return
			}
			/*内容不同开始保存*/
			this.autoSave.saveData = da;
			if(this.$route.name!='upload'){
				/*已离开不再保存*/
				return 
			}
			
			this.saveData(dat,'自动保存成功');
		},
		init(){
			if(!window.userInfo){
				this.$router.push({path:'/login'})
				return
			}	
			this.loading = Loading.service({target:this.$refs.asdsss, fullscreen: true });
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
			if(!window.userInfo){
				Message({message: '请先登录'});
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
		// setChekin(type,b){
		// 	let p = '上传作品-编辑作品类容';
		// 	if(this.chekin==false){
		// 		p = '上传作品-其他信息设置';
		// 	}
		// 	if(b){
		// 		this.bdtj(p,b,'--');
		// 	}
			
		// 	if(!this.form.work_name||this.form.work_name.split(" ").join("").length == 0){
			
		// 		if(b){
		// 			this.bdtj(p,b+'失败','--');
		// 		}
		// 		Message({message: '请先填写标题'});
		// 		return
		// 	}
		// 	if(!this.form.content || this.ifBjType==0){
		// 		if(b){
		// 			this.bdtj(p,b+'失败','--');
		// 		}
		// 		Message({message: '请先填写内容'});
		// 		return
		// 	}
			
		// 	if(b && b!='其他信息设置'){
		// 		this.bdtj(p,b+'成功','--');
		// 	}
		// 	this.chekin = type;
		// 	document.documentElement.scrollTop =1;
		// 	document.body.scrollTop =1;
		// 	let regex = /<img.*?src="(.*?)"/;
			
		// 	let src = regex.exec(this.form.content);
		// 	if(!src){
		// 		return
		// 	}
		// 	src = src[1];			
			
			
		// },
		ready (editorInstance) {
			this.loading.close();
			this.uD = editorInstance;
			
			editorInstance.addListener('focus',()=>{				
					if(this.ifBjType==0){
						this.form.content = '';
						this.ifBjType=1;				
					}
			});
			editorInstance.addListener('blur',()=>{
				if(this.ifBjType==1 && this.form.content==''){			
					this.form.content = '<p style="color:#999">从这里开始编辑作品内容...</p>';
					this.ifBjType=0;
				}	
			});
			
		},
		closed(cr){
			
			this.tanData = {};
			this.isshowd=false;
			if(cr){
				return
			}
			if(this.ifBjType==1 && this.form.content==''){			
				this.form.content = '<p style="color:#999">从这里开始编辑作品内容...</p>';
				this.ifBjType=0;
			}
		},
		showUp(on,a,file,ref){
			// this.bdtj('上传作品-编辑作品类容',a,'--');
			
			this.configData = this.upList[on];
			// this.initUploadConfig()
			// console.log(this.typexz)
			if(this.ifBjType == 0){
				this.ifBjType = 1;
				this.form.content = '';
			}
			this.fileUp(file, ref)

			return
			
			this.tanData = {
				zj:'UplodImg'
			};
			
			this.isshowd = true;
			if(this.ifBjType == 0){
				this.ifBjType = 1;
				this.form.content = '';
			}
			
		},
		inImg(list,ids){
			let range = this.uD.selection.getRange().cloneContents();
			let htmls = range && range.children, str = '';
			if (htmls && htmls.length) {
				for (let i in htmls) {
					if (Object.prototype.toString.call(htmls[i]).indexOf('HTML') > -1)
					str += htmls[i].outerHTML
				}
			}
			if(this.configData.type[0]=='image/gif'){
				list.map((el,index)=>{
					str+='<p style="max-width:100%;height:auto;"><img zk_workid="'+ids[index]+'" style="max-width:100%;height:auto" src="'+el+'"/></p>';
				});								
				this.uD.execCommand('insertHtml', str);	
				this.uD.execCommand( 'insertparagraph' )
				// this.uD.focus()
				return
				
			}
			
			if(this.configData.type[0]=='video/mp4'){
				list.map((el,index)=>{
					str+='<p style="display:none">1</p><p style="box-shadow: 0 5px 10px 0 rgba(0,0,0,0.10);border-radius: 12.55px;overflow: hidden;margin: 40px auto;width: 600px;height: 338px;"><video zk_workid="'+ids[index]+'" style="width: 100%;height:100%" controls="controls" src="'+el+'"></video></p>';					
				});
				this.uD.execCommand( 'insertparagraph' );
				this.uD.execCommand('insertHtml', str);
				
				
				return
			}
			if(this.configData.type[0]=='audio/ogg'){
				list.map((el,index)=>{					
					str+='<p style="display:none">1</p><p style="background: #FFFFFF;box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10);border-radius: 5px;margin: 40px auto;width: 600px;height:90px;" ><audio zk_workid="'+ids[index]+'" style="width: 86%;margin: 18px;" id="xx" src="'+el+'" controls="controls"></audio></p>';
				});
				this.uD.execCommand( 'insertparagraph' )
				this.uD.execCommand('insertHtml', str);
				
				return
			}
			
			
		},
		getWorkId(){
			this.checkLo({
				api:'getWorkId',
				pr:{},
				su:(da)=>{this.form.work_id = da.work_id;}
			})
		},
		getData(id){			
			this.checkLo({
				api:'getWorkDetail',
				pr:{				
					work_id:id,
					is_draft:1
				},
				su:(da)=>{
		
					this.form = da;		
					this.csz = da.work_name;				
					try{this.form.labels = JSON.parse(this.form.labels);}catch(e){console.log(1)}
					this.selectedOptions = [+this.form.classify_1,+this.form.classify_2,+this.form.classify_3];
					if(this.form.attachment){
						this.upfjData.fid=this.form.attachment_id;
						this.upfjData.type='上传成功';
						this.$refs.upnfile2.value ='';		
						this.form.attachment_id = da.attachment_id;	
						this.upfjData.bf = 100;
						this.upfjData.file_name = this.form.attachment.file_name;
					}
					this.ifBjType=1;
					this.checkPage2()
				}
			})
		},
		seeCg(){
			this.bdtj('上传作品-其他信息设置','预览','--');
			
			if(!this.form.work_name||this.form.work_name.split(" ").join("").length == 0){Message({message: '请先填写标题'});return}
			if(!this.form.content){Message({message: '请先填内容'});return}
			if(!this.form.face_pic){Message({message: '请先上传封面'});return}
			if(!this.form.classify_1){Message({message: '请先选择作品类型'});return}
			this.isYl =1;
			this.checkAutoSave();
				
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
			if(!this.form.is_platform_work && this.form.is_platform_work != 0){Message({message: '请勾选是否为投稿作品'});return}
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
			this.saveData(
				dp,
				'上传成功',
				()=>{this.bdtj('上传作品-其他信息设置','提交发布成功','--');setTimeout(()=>{this.$router.push({path:'/myAll'})},1000)},
				()=>{this.bdtj('上传作品-其他信息设置','提交发布失败','--');},
			);
		},
		userSave(){
			let p = '上传作品-编辑作品类容';
			// if(this.chekin==false){
			// 	p = '上传作品-其他信息设置';
			// }
			this.bdtj(p,'保存','--');
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
		saveData(data,messg,fn,fn2){	
			let pr = JSON.stringify(data);
			pr = JSON.parse(pr);
			this.saveTyped=1
			pr.labels = JSON.stringify(pr.labels);
			this.api.saveWorks(pr).then((da)=>{
				if(da=='error' || da=='104'){
					if(fn2){
						fn2();
					}
					return
				}
				this.saveTyped='';
				Message({message:messg});
				if(fn){
					fn();
				}
				
				if(this.isYl){
					this.isYl='';
					window.open('#/conts?id='+this.form.work_id);
				}

			}).catch(()=>{
				this.saveTyped='';
				if(fn2){
					fn2();
				}
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
			if(!this.form.is_platform_work && this.form.is_platform_work != 0){
				return false
			}
			this.ck3 = "onck2";
			return true
		},
		fileUpfj(flie){		
			this.bdtj('上传作品-其他信息设置','上传附件','--');
			if(this.fjtext== '上传中'){
				return
			}
			if(this.upfjData.type && this.upfjData.type!='上传成功'){
				Message({message: '正在上传中请稍后'});
				return
			}		
			let fld = flie.target.files[0];			
            if(['application/x-zip-compressed','application/zip'].indexOf(fld.type)==-1){
				Message({message: '格式不正确，请上传压缩包格式文件'});
				this.$refs.upnfile2.value = ''
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
		qxclosd(){
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
			this.api.getClassify({}).then((da)=>{
				if(da=='error' || da=='104'){
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
.edui-default iframe .view{
	background: #EAF7FF;
}
.custom_tag{
	display: inline-block;
	padding: 5px 16px;
	border-radius: 5px;
	border: 1px solid #BBBBBB;
	margin-right: 10px;
	margin-bottom: 10px;
	padding-right: 40px;
	position: relative;
	color: #666666;
}
.custom_tag i{
	width: 14px;
	height: 14px;
	line-height: 12px;
	display: block;
	font-style: normal;
	position: absolute;
	right: 5px;top: 50%;
	margin-top: -7px;
	font-size: 14px;
	color: #E9E9E9;
	cursor: pointer;
	border-radius: 50%;
}
.custom_tag:hover {
	background: #33B3FF;
	color: #fff;
	border: 1px solid transparent;
}
.custom_tag:hover i{
	color: #fff;
}
.radio-group label{
	margin-right: 24px;
}
.radio-group input[type='radio']{
	display: none;
}
.radio-group span{
	display: inline-block;
	width: 14px;height: 14px;
	line-height: 14px;
	border: 1px solid #999;
	vertical-align: text-bottom;
	margin-right: 8px;
	border-radius: 3px;
	text-align: center;
}
.radio-group span i{
	color: #fff;
	position: relative;
	font-size: 12px;
}
.radio-group span._chosed{
	border: 1px solid #33B3FF;
	background: #33B3FF;
}
.top_to_down{
	width: 48px;
	position: fixed;
	right: 50px;bottom: 180px;
	z-index: 99;
}
.top_to_down>div{
	width: 48px;
	height: 48px;
	border-radius: 50%;
	margin-top: 40px;
	background: #AAABAD;
	/* background: #666; */
	color: #fff;
	font-size: 24px;
	line-height: 48px;
	cursor: pointer;
}
.top_to_down>div:hover{
	opacity: .7;
}
.el-input--suffix .el-input__inner{
	padding-left: 10px;
}
.page2_1_6,.page2_1_5{
	position: absolute;
	right: 0;top: 0;
	width: 250px;
}
.page2_1_5{
	top: 18px;
}
.page2_1_6 .iconfont{
	font-size: 14px;
	color: #666;
}
.uploadContainer{
    text-align: left;
    width: 1300px;
    margin: 0 auto;
}
.uploadContainer .el-card__body{
	padding: 35.5px 20px;
}
.uploadContainer .commonCard{
    margin-top: 20px;
}
.uploadContainer .el-col{
    position: relative;
    padding: 0 15px;
}
.notice{
    color: #f56c6c;
    text-align: right;
}
.notice img{
	vertical-align: middle;
	margin-right: 8px;
}
.btBlue{
    display: inline-block;
    vertical-align: middle;
    width: 4px;height: 4px;
    background: #1989fa;
    border-radius: 50%;
    position: absolute;
    right: -5px;top: 50%;
    margin-top: -2px;
}
.uploadBtn{
    position: absolute;
    right: 30px;top: 5px;
    z-index: 9997;
}
.uploadBtn span:hover{
    opacity: .7;
}
.uploadBtn span{
    margin-left: 20px;
    cursor: pointer;
}
.uploadBtn img{
    vertical-align: middle;
    margin-right: 8px;
}
.uploadBtn input {
	position: absolute;
    width: 86px;
    height: 16px;
    opacity: 0;
    top: 50%;
    margin-top: -8px;
	z-index: 9998;
}
.uploadBoxd2_2_2_1{
	left: 20px;
}
.uploadBoxd2_2_2_2{
	right: 0px;
}
.page2_1_2_2{
	width: 100px;
	height: 40px;
	line-height: 40px;
	font-size: 14px;
	color: #666;
	text-align: center;
	background: #fff;
	position: absolute;
	top: 50%;left: 50%;
	margin-top: -20px;
	margin-left: -50px;
	border-radius:5px;
	border:1px solid rgba(187,187,187,1);
	visibility: hidden;
}
.page2_1_2{
	position: relative;
	background: #F4F6F9;
	border-radius: 5px;
	margin-bottom: 57px;
	overflow: hidden;
	width: 260px;
	height: 195px;
	cursor: pointer;
    text-align: center;
}
.page2_1_2.noUp:hover{
	opacity: .7;
}
.page2_1_2:hover .page2_1_2_2{
	visibility: visible;
}
/* .page2_1_2:hover>img{
	opacity: 0.2;
} */
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
.page2_1_2 .page2_1_2_1{	
	background: #F4F6F9;
	border-radius: 5px;
	width: 100%;
	height: 100%;
	font-size: 14px;
	color: #333333;
}
.page2_1_2 .page2_1_2_1>div{
	width: 22.9px;
	height: 22.9px;
	border-radius: 50%;
	font-size: 21px;
	text-align: center;
	line-height: 22.9px;
	background: #33B3FF;
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
.page2_1_4{
	text-align: left;
	position: relative;
	margin-bottom: 30px;
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
    width: 90%;
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
	background: #33B3FF;
	-webkit-transform: translateX(-100%);
	transform: translateX(-100%);
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

.isUpd>.page2Tbnd1{
	color: #999;
    border-color: #999;
	cursor: context-menu;
}
.tagWrapper{
    min-height: 252px;
}
.button-new-tag {
	display: inline-block;
	width: 78px;
    height: 32px;
    line-height: 32px;
    padding-top: 0;
    padding-bottom: 0;
	border: 1px solid #33B3FF;
	color: #33B3FF;
	text-align: center;
	cursor: pointer;
	box-sizing: border-box;
	border-radius: 5px;
}
.input-tag-container{
	position: relative;
	width: 220px;
}
.input-tag-container i{
	position: absolute;
	top: 8px;left: 8px;
}
.input-new-tag {
    vertical-align: bottom;
	background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #33B3FF;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 32px;
    line-height: 32px;
    outline: none;
    padding: 0 15px;
	padding-left: 30px;
	font-size: 14px;
	
}
.tagContainer{
    margin: 20px 0;
}
.tagContainer .el-tag{
    margin-right: 15px;
	margin-top: 10px;
}
.leftTagNum{
    font-size: 12px;
    color: #999;
    margin: 20px 0;
}
.description{
    font-size: 12px;
    color: #999;
}
.certification{
	color: #999;
	font-size: 14px;
	line-height: 20px;
}
.certification span{
	color: #33B3FF;
	cursor: pointer;
}
.handleContainer{
    margin: 30px 0;
    text-align: center;
}
.handleContainer .el-button{
    min-width: 120px;
}

/* 编辑器样式 */
.edui-default .edui-editor-toolbarboxouter{
	background: #fff!important;
}
div.edui-box{
	vertical-align: middle!important;
}
.edui-default .edui-list .edui-state-hover{
	border: none!important;
	background: none!important;
	color: #33B3FF!important;
	padding: 1px!important;
}
.edui-default .edui-toolbar .edui-combox .edui-combox-body{
	border: none!important;
}
.edui-default .edui-toolbar .edui-state-hover .edui-combox-body{
	background-color: #fff!important;
}
.edui-default .edui-toolbar .edui-button, .edui-default .edui-toolbar .edui-splitbutton, .edui-default .edui-toolbar .edui-menubutton, .edui-default .edui-toolbar .edui-combox{
	margin: 0 8px!important;
}
.edui-default .edui-toolbar .edui-combox-body .edui-splitborder{
	display: none!important;
}
.edui-default .edui-toolbar .edui-combox-body .edui-arrow{
	border: none!important;
}
.edui-default .edui-toolbar .edui-combox-body .edui-button-body{
	width: 40px!important;
	line-height: 20px!important;
}
.edui-default .edui-toolbar .edui-button .edui-state-checked .edui-button-wrap{
	background-color: rgba(55, 104, 133, 0.1)!important;
	border: none!important;
	padding: 8px!important;
}
div.edui-box{
	line-height: 1!important;
}
</style>
