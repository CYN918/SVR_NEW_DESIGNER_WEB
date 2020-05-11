import { Message, Loading } from 'element-ui'
export default {
    data () {
        return {
            configData: {},
            list: [],
            typexz: ''
        }
    },
    methods: {
        initUploadConfig(){
			this.typexz  = this.configData.typexz?this.configData.typexz:'';
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
        clPic(fld,on){
            this.uploadSourceLoading = Loading.service({
                target: document.body,
                fullscreen: true,
                text: '上传中...'
            })
    //			if(this.configData.type.indexOf(fld.type)==-1){
    //				Message({message: '该文件格式不支持'});
    //				return
    //			}
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
                    this.uploadSourceLoading.text = `${p.bf}%`
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
                    this.inImg(this.list.map(source => source.url), [p.fid]);
                    this.list = []
                    this.uploadSourceLoading.close()
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
        fileUp(flie){
			this.bdtj(this.configData.title,this.configData.btn,'--');
			for(let i=0,n=flie.target.files.length;i<n;i++){
				this.clPic(flie.target.files[i],i);
			}
      		
      	},
    }
}