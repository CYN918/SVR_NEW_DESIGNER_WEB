<template>
	<tanC :title="'交付稿件'">
		<template v-slot:todo="{ todo }">
			<div class="pushGj_01">
				<div class="pushGj_02">
					<el-upload
					  class="upload-demo"
					  drag
					  http-request="myup"
					  :file-list="filelist"
					  :limit="1" 
					  :auto-upload="true" 
					  :http-request="uploadFile"
					  :show-file-list='true'
					  accept='.zip,.tar'
					  action="customize"
					 
					  >
					  <i class="el-icon-upload"><img src="/imge/project/pus.svg"></i>
					  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					  <div class="el-upload__tip" slot="tip">文件大小为1GB以内</div>
					</el-upload>
					
					<div class="lid">
						<li v-for="(el,key) in fileList3" :key="key">
							<div class="lid_1"><img src="/imge/project/pus1.svg">{{el.file_name}}<img src="/imge/project/cj_00.svg" @click="clodfile(el,key)" class="closeX pend"/></div>
							<div class="lid_2"><span :style="{transform:'translateX('+-(100-el.bf)+'%)'}"></span></div>
						</li>
						
					</div>
				</div>
				
				<div class="pushGj_03">
					<div class="pushGj_03_1">备注说明</div>
					<textarea placeholder="请输入备注说明…" v-model="eell" class="pushGj_03_2"></textarea>
				</div>
			</div>
			<div class="bmXm_01Btn">
				<div @click="pushfiled"  class="btns btns_js pend">提交</div>
			</div>
		</template>			
	</tanC>
</template>
<script>
import tanC from '../../components/tanC';
export default {
	components:{tanC},
	props:{
		data:Object
	},
	data(){
		return{
			eell:'',
			customize:'',
			fileList3:[],
		
			filelist:[],
		}
	},
	mounted: function(){
		this.init();
	},
	methods: {	
		init(){
			this.customize = window.basrul+'/File/File/delete';
		},

		close(){			
			this.$parent.close();
		},
		clodfile(el,on){
			el.xhr.abort();
			this.fileList3.splice(on,1);
			this.filelist.splice(on,1);
		},
		pushfiled(){
			if(!this.fileList3[0]){
				this.$message({message: '请先上传文件'});
				return
			}
			if(!this.fileList3[0].url){
				this.$message({message: '正在上传文件请耐心等候'});
				return
			}
			this.api.pr_delivery({
				project_id:this.$parent.deta.id,
				file_name:this.fileList3[0].file_name,
				file_url:this.fileList3[0].url,
				file_size:this.fileList3[0].size,
				remark:this.eell,
			}).then((da)=>{
				if(da=='error'){return}
				this.$parent.setStaus('4');
				this.$message({message:"交稿成功请耐心等待验收"});
				this.$parent.getData();
				this.close();
			}).catch(()=>{
				
			});

		},
		uploadFile(params) {
			
			const _file = params.file;
			const isLt2M = _file.size / 1024 / 1024/1024 < 1;
			if (!isLt2M) {
				this.$message.error("请上传1G以下的文件");
				return false;
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
			formData.append('file',_file)
		
			formData.append('timestamp',times)
			
			let xhr = new XMLHttpRequest();
			this.ond--
			this.fileList3.unshift({type:'up',file_name:_file.name,bf:0,xhr:xhr})
			
			
			let p = this.fileList3[0];
			let uploadProgress = (evt)=>{		
				if(evt.lengthComputable) {
					let percent = Math.round(evt.loaded * 100 / evt.total);
			        percent = percent>98?98:percent;
					p.bf  = Math.floor(percent);
				}
			};
			let uploadComplete = (data)=>{
				p.bf  = 100;
				if(data.currentTarget.response){
					let da = JSON.parse(data.currentTarget.response).data;
					p.file_name = da.file_name;
					p.size = da.file_size;	
					p.fid=da.fid;
					p.url = da.url;
					this.$message({message: '文件上传成功'});
				}
				
			};
			let uploadFailed = ()=>{
				
				this.$message({message: '文件上传失败请稍后重试'});
				
			};
			let uploadCanceled = ()=>{
				
				this.$message({message: '取消成功'});
				
			};
			xhr.upload.addEventListener("progress",uploadProgress, false);
			xhr.addEventListener("load",uploadComplete, false);
			xhr.addEventListener("error",uploadFailed, false);
			xhr.addEventListener("abort",uploadCanceled, false);
			xhr.open("POST", window.basrul+"/File/File/insert");
			xhr.send(formData);
		}

	
	}
}		
	
</script>

<style>
.pushGj_01{
	padding: 30px 100px;
	height: 424px;
	overflow: hidden;
	overflow-y: auto;
}
.pushGj_02{
	margin-bottom: 25px;
}
.pushGj_02 .upload-demo{
	margin-bottom: 22px;
}
.pushGj_02 .el-upload-dragger{
	width:500px;
	height:160px;
	background:rgba(244,246,249,0.5);
	border-radius:4px;
}
.pushGj_02 .el-upload-dragger .el-upload__text{
	font-size:16px;
	font-weight:400;
	color:rgba(40,40,40,1);
	line-height:22px;
}
.pushGj_02 .el-upload-dragger .el-upload__text em{
	color: #FF5121;
}
.pushGj_02 .el-upload-dragger .el-icon-upload{
	margin: 39px auto 12px;
}
.pushGj_02 .el-icon-upload:before{
	content: '';
}
.pushGj_02 .el-upload__tip{
	text-align: left;
	font-size:14px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:20px;
}

.pushGj_03_1{
	font-size:14px;
	text-align: left;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:20px;
	margin-bottom: 10px;
}
.pushGj_03_2{
	width:458px;
	height:118px;
	padding: 15px 20px;
	border-radius:5px;
	border:1px solid rgba(187,187,187,1);
	font-size:14px;
	font-weight:400;
	
	line-height:20px;
}
.bmXm_01Btn{
	text-align: center;
	border-top: 1px solid rgba(244,246,249,1);
	height: 79px;
	line-height: 79px;
}
.lid>li{
	margin-bottom: 40px;
}
.lid_1{
	display: block;
	position: relative;
	text-align: left;
	height:20px;
	font-size:14px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:20px;
	margin-bottom: 4px;
}
.lid_1>img{
	display: inline-block;
	vertical-align: middle;
	margin-right: 8px;
	width: 14px;
	height: 14px;
}
.closeX{
	position: absolute;
	right: 0;
	top: 3px;
	width: 14px;
	height: 14px;
}
.lid_2{
	position: relative;
	margin-left: 22px;
	height:2px;
	background:rgba(0,0,0,0.04);
	border-radius:32px;
	overflow: hidden;
}
.lid_2>span{
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	background:#FF5121;
	border-radius:32px;
	-webkit-transform: translateX(-100%);
    transform: translateX(-100%);
	height: 100%;
	width: 100%;
}
.el-upload-list{
	/* display: block !important; */
	text-align: left;
}
</style>
