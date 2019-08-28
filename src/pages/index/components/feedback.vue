<template>
	<tanC :title="'意见反馈'">
		<template v-slot:todo="{ todo }">
			<div class="upfdb_content_1">
				<div class="upfdb_name ">
				    <span>问题类型</span>
				    <select v-model="classify">
				        <option v-for="(item,index) in typeList" :value="index">{{item.classify_name}}</option>
				    </select>
				</div>
				<div class="upfdb_name">
				    <span>问题描述</span>
				    <div class="upfdb_txt">
				        <el-input
				                type="textarea"
				                resize="none"
				                :rows="7"
				                placeholder="请输入问题描述.."
				                v-model="detail"
				               >
				        </el-input>
				    </div>
				</div>
				<div class="upfdb_name " >
				    <span>相关图片</span>
				    <div class="upfdb_name_x1">
				        <div class="upImg pend">
				            <span>上传图片</span>
							<input type="file" class="input_img" ref="upload" @change="fileUp"/>
				        </div>
				        
				        <span class="ts">最多上传3张,格式jpeg、jpg、png,大小不超过2M</span>
				        <div class="block" >
				            <div class="picURl" v-for="(item,index) in imgList">
				                <i class="right" @click="del(index)">X</i>
				                <img :src="item"/>
				            </div>
				        </div>
				    </div>
				</div>
				<div class="upfdb_name">
				    <span>联系方式</span>
				    <div class="upfdb_name_x1">
				        <select v-model="link_type">
				            <option value="手机" selected>手机号码</option>
				            <option value="QQ">QQ号码</option>
				        </select>
				        <input type="text" placeholder="请输入联系方式" v-model="link">
				    </div>
				</div>
			</div>	
			<div class="qxBm_btns">				
				<div @click="addFdb" class="btns  pend">确定</div>
				<div @click="close('取消')" class="btns btns_js pend">取消</div>
			</div>
		</template>			
	</tanC>
</template>
<script>
import tanC from './tanC';
export default {
	components:{tanC},
	name: "feedback",
	data(){
	    return {
	        link:'',
	        detail:'',
	        classify:0,
	        aaa:0,
	        imgList:[],
	        box:false,
	        list:[],
	        typeList:[],
	        link_type:'手机',
	        relation_type:"user_info",
	        app_id:'1001',
	        imgType:['image/gif','image/jpeg','image/png'],
	    }
	},
	mounted(){
	    this.getType();
	},
	methods:{
		close(a){
			if(a){
				this.bdtj('意见反馈弹窗',a,'--');
			}
			this.$parent.heid();
		},
	    getType(){
	        let params =window.userInfo.access_token;
	        this.api.Feedback_getClassify({access_token:params}).then((res)=>{
	            this.typeList = res;
	        })
	    },

	    addFdb(){
			this.bdtj('意见反馈弹窗','提交意见','--');
	        if(!this.detail){
				this.bdtj('意见反馈弹窗','提交意见失败','--');
	            Message('请输入问题描述');
	            return
	        }
	        if(!this.imgList){
				this.bdtj('意见反馈弹窗','提交意见失败','--');
	            Message('请上传截图');
	            return
	        }
	        if(!this.link_type){
				this.bdtj('意见反馈弹窗','提交意见失败','--');
	            Message('联系方式不能为空');
	            return
	        }
	        if(!this.link){
				this.bdtj('意见反馈弹窗','提交意见失败','--');
	            Message('联系方式不能为空');
	            return
	        }
	        let params={access_token:window.userInfo.access_token,classify_id:this.typeList[this.classify].id,classify_name:this.typeList[this.classify].classify_name,detail:this.detail,pic:JSON.stringify(this.imgList),link_type:this.link_type,link:this.link}
	        this.api.Feedback_add(params).then((res)=>{
				if(!res){this.bdtj('意见反馈弹窗','提交意见失败','--');return}
				this.bdtj('意见反馈弹窗','提交意见成功','--');
				Message('提交成功');
				this.qx();
	        })
	    },
	    del(index){
	        this.imgList.splice(index,1)
	    },
	    fileUp(flie){
			this.bdtj('意见反馈弹窗','上次图片','--');
	        let fld = flie.target.files[0];
	       
	        if(this.imgType.indexOf(fld.type)==-1){
	            Message({message: '格式不正确'});
	            return
	        }
	        if(fld.size/ 1024 / 1024 > 2){
	            Message({message: '文件过大'});
	            return
	        }
	        let fileSize = 0;
	        if(fld.size > 1024 * 1024){
	            fileSize = (Math.round(fld.size * 20 / (1024 * 1024)) / 100).toString() + 'MB';
	        }else{
	            fileSize = (Math.round(fld.size * 20 / 1024) / 100).toString() + 'KB';
	        }
	
	        let app_secret = '6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY';
	      
	        let times = (Date.parse(new Date())/1000);
	        let arr = [
	            1001,
	            app_secret,
	            window.userInfo.open_id,
	            times
	        ];
	        this.box= true;
	        let formData = new FormData();
	        formData.append('app_id',1001);
	        formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
	        formData.append('user',window.userInfo.open_id)
	        formData.append('file',fld)
	        formData.append('relation_type','user_info')
	        formData.append('timestamp',times)
	        let xhr = new XMLHttpRequest();
	        this.list.unshift({type:'up',file_name:fld.name,s:fileSize,bf:0,xhr:xhr,show:1});
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
	                let da = JSON.parse(data.currentTarget.response).data;
	                p.type="img";
	                p.url = da.url;
	                p.file_name = da.file_name;
	                p.s = da.file_size;
	                p.fid=da.fid
	                // this.$refs.upnfile.value ='';
	                this.imgList.unshift(da.url);
	                if(this.imgList.length>3){
	                    this.imgList = this.imgList.slice(0,3);
	                    Message('最多上传3张')
	                }
	            
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
	},
}		
	
</script>

<style>
.upfdb{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
}
.upfdb_bg{
    background: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
}
.usdsgsga{
	width:794px;
	max-height:680px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	
}
.upfdb_name select{
	width: 100px;
    height: 29px;
    border: 0;
    border-bottom: 1px solid #DDDDDD;
    margin-right: 20px;
    display: inline-block;
    vertical-align: top;
}
.upfdb_name input{
	display: inline-block;
	vertical-align: top;
	width: 220px;
    height: 24px;
    border: 0;
    border-bottom: 1px solid #ddd;
    padding: 3px 5px;
}
.upfdb_content{
    width: 100%;
	width:794px;
	max-height:680px;
	overflow: hidden;
	overflow-y: auto;	
}

.upfdb_img{
    position: absolute;
    top: -45px;
    right: -45px;
    width: 44px;
    height: 44px;
    cursor: pointer;
}
.upfdb_title{
    width:100%;
    height: 50px;
    border-bottom:1px solid #E6E6E6 ;
    text-align: left;
    margin-bottom: 27px;
}
.upfdb_title>span{
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #1E1E1E;
    font-weight: bold;
    line-height: 50px;
    margin-left: 29px;
}
.upfdb_content_1{
    text-align: left;
    padding: 0 114px;
	line-height: 0;
	width: 567px;
    height: 578px;
    overflow: hidden;
    overflow-y: auto;
}
.upfdb_content_1 span{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999999;
    margin-right: 60px;
	display: inline-block;
    line-height: 30px;
    vertical-align: top;
}
.upfdb_name{
    margin: 30px auto;
}


.top{
    vertical-align: top;
    padding-top:15px;
}
.upfdb_txt{
	display: inline-block;vertical-align: top;
    width: 450px;
}

.el-upload__tip{
    display: block!important;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999999;
    margin-top: 7px;
}
.block{
    display: block;
 
    width: 133px;
    max-height: 100px;
}
.block>div{
	margin-top: 18px;
}
.picURl{
	position: relative;
    border: 1px solid #ddd;
    width: 133px;
    max-height: 100px;
    border-radius: 5px;
    margin-right: 20px;
}
.picURl>img{
	position: relative;
	
    width: 133px;
    height: 100px;

    top:0;
	left: 0;
}
.right{
    position: absolute;
    right:0;
    color: #fff;
    z-index: 9999;
    cursor: pointer;
}
.upImg{
	position: relative;
    border: 1px solid #999999;
    border-radius: 5px;
    width: 100px;
    height: 40px;
    text-align: center;
}

.upImg>span{
    display: block;
    line-height: 40px;
    margin-right: 0!important;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    text-align: center;

}
.input_img{

    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;    
    opacity: 0;
}
.ts{
    display: block;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999999;
}
.upRpt_btn{
    margin-bottom: 10px;
    text-align: center;
}
.upRpt_btn>span{
    width:140px;
    height: 40px;
    display:inline-block;
    border-radius: 5px;
    cursor: pointer;
    font-family: PingFangSC-Regular;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
}
.qx{
    border: 1px solid #979797;
    color: #333333;
    margin-right: 25px;
}
.tj{
    background: #FF5121;
    color: #FFFFFF;
}
.input_img[data-v-91b125d6]{
	cursor: pointer;
}
.qxBm_btns{
	border-top: 1px solid rgba(244,246,249,1);
	height: 79px;
	line-height: 79px;
}
.upfdb_name_x1{
	display: inline-block;
	vertical-align: top;
}
</style>
