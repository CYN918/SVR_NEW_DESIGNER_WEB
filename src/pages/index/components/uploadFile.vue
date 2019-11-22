<template>
	<input type="file" @change="fileUp" class="myFileBtn"  :accept="cg.accept"  :multiple="cg.multiple" ref="fileDom"/>	
</template>
<script>
import {Message} from 'element-ui'
export default{
	name:'upFile',
	props:{
		cg:{
			type:Object,
			default:{
				multiple:'',
				accept:'',
				type:[],
				max:'',
				isAarr:'',
				userType:'user_info',
			}
		},
		sussFn:{
			type:Function,
			default:(da)=>{}
		},
		setJdt:{
			type:Function,
			default:(da)=>{}
		},		
	},
	data(){
		return{
			objs:[],
			upType:'',			
		}
	},
	mounted: function () {}, 	
	methods: {
		qxclosd(on){
			this.fO[on].abort();
		},
		clPic(fld,on){
			if(!window.userInfo){
				return
			}
			if(this.cg.type && this.cg.type.indexOf(fld.type)==-1){
				Message({message: '文件格式不正确'});
				return
			}
			if(this.cg.max && fld.size>this.cg.max){
				Message({message: '文件过大'});
				return
			}
			let times = (Date.parse(new Date())/1000);
			let arr = [
				1001,
				'6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY',
				window.userInfo.open_id,
				times
			];
			let formData = new FormData();
			formData.append('app_id',1001);
			formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
			formData.append('user',window.userInfo.open_id)
			formData.append('file',fld)
			formData.append('relation_type',this.cg.userType)
			formData.append('timestamp',times)
			formData.append('is_callback',1)
			let xhr = new XMLHttpRequest();
			
			
			this.objs.push({
				xhr:xhr,
				bfb:0,
				size:this.backSize(fld.size),
				name:fld.name,
				fid:'',
				cover_img:'',
			});	
			let p = this.objs[this.objs.length-1];
			let uploadProgress = (evt)=>{		
				if(evt.lengthComputable) {
					let pn = Math.floor(Math.round(evt.loaded * 100 / evt.total));
					if(pn==100){return}
					this.setJdt(pn);
				}
			};
			let uploadComplete = (data)=>{
				this.upType=0;
				this.setJdt(100);
				if(data.currentTarget.response){
					let da = JSON.parse(data.currentTarget.response).data;				
					this.sussFn(da);				
					this.$refs.fileDom.value ='';						
					Message({message: '上传成功'});
				}
			};
			let uploadFailed = ()=>{
				this.upType=0;
				this.$refs.fileDom.value ='';
				Message({message: '文件上传失败请稍后重试'});
				
			};
			let uploadCanceled = ()=>{
				this.upType=0;
				this.$refs.fileDom.value ='';
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
			let sr = 'KB';
			fileSize = (fld * 100)/1024;
			if(fileSize>1024){
				fileSize = fileSize/1024;
				sr = 'MB';
			}
			return (Math.round(fileSize)/100).toString()+sr;
		},	
		fileUp(flie){
			if(!this.cg.isAarr && this.upType==1){
				Message({message: '正在上传请稍后'});
				return
			}
			this.upType=1;
			for(let i=0,n=flie.target.files.length;i<n;i++){
				this.clPic(flie.target.files[i],i);
			}
			
		},
	}
}	
	
</script>

<style>
.myFileBtn{
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
	cursor: pointer;
	width: 100%;
	height: 100%;	
}
</style>
