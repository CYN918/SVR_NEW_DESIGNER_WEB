<template>
	<div class="uploadBoxd">
		<div class="uploadBoxd1"></div>
		<div class="uploadBoxd2">
			<img class="uploadBoxd2_1" src="/imge/cj_00.png"/>
			<div class="uploadBoxd2_2">
				<div class="uploadBoxd2_2_1">
					<div>我的图片素材库</div>
					<div>上传文件大小需小于10M，支持JPG、PNG、GIF格式。</div>
				</div>
				<div class="uploadBoxd2_2_2">上传图片素材<input @change="fileUp" class="uploadBoxd2_2_2_1" accept="image/gif,image/jpeg,image/png" type="file" /></div>				
			</div>
			<ul class="uploadBoxd2_3" ref="imgd">
				
				<li v-for="(el,index) in list" :key="index">
					<div v-if="el.type">
						<div class="loadingsd">
							<div class="circleProgress_wrapper">
						        <div class="wrapper right">
						            <div class="circleProgress rightcircle"></div>
						        </div>
						        <div class="wrapper left">
						            <div class="circleProgress leftcircle"></div>
						        </div>
						 	</div>
							<div class="loadingsdsd" :style="">{{el.bf}}</div>
						</div>
						<div>{{el.n}}<span>{{el.s}}</span></div>
					</div>
					<div v-else="">
						<img :src="el.url"/>
						<div>{{el.n}}<span>{{el.s}}</span></div>
					</div>
					
				</li>
				
			</ul>
			<div class="uploadBoxd2_4">
				<div class="uploadBoxd2_4_1">已选一项，最多可选50项</div>
				<div>取消</div>
				<div>删除</div>
				<div class="uploadBoxd2_4_2">插入</div>
			</div>
		</div>	
	</div>
</template>

<script>
import {Message} from 'element-ui'
export default {
    data() {
      	return {
        	dialogImageUrl: '',
        	dialogVisible: false,
        	list:[
        		{url:'',n:'概念机甲设计',s:'3.0M'},
        		{url:'',n:'概念机甲设计',s:'3.0M'},
        		{url:'',n:'概念机甲设计',s:'3.0M'},
        		{url:'',n:'概念机甲设计',s:'3.0M'},
        		{url:'',n:'概念机甲设计',s:'3.0M'},
        		{url:'',n:'概念机甲设计',s:'3.0M'}
        	],
      	};
    },
    methods: {
      	handleRemove(file, fileList) {
        	console.log(file, fileList);
      	},
      	handlePictureCardPreview(file) {
        	this.dialogImageUrl = file.url;
        	this.dialogVisible = true;
      	},
      	fileUp(flie){
      		
      		let fld = flie.target.files[0];
      		
      		if(['image/gif','image/jpeg','image/png'].indexOf(fld.type)==-1){
      			Message({message: '图片格式不正确'});
      			return
      		}
      		if(fld.size>10*1024*1024){
      			Message({message: '图片过大'});
      			return
      		}
      		let fileSize = 0;
      		if(fld.size > 1024 * 1024){
      		 	fileSize = (Math.round(fld.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
      		}else{
      			fileSize = (Math.round(fld.size * 100 / 1024) / 100).toString() + 'KB';
      		}
                
      		var fd = new FormData();
//        	fd.append("file", fd);
//       	var xhr = new XMLHttpRequest();
//       	xhr.upload.addEventListener("progress", this.uploadProgress, false);
//       	xhr.addEventListener("load", this.uploadComplete, false);
//       	xhr.addEventListener("error", this.uploadFailed, false);
//        	xhr.addEventListener("abort", this.uploadCanceled, false);
//        	xhr.open("POST", "${pageContext.request.contextPath }/upload");//修改成自己的接口
//        	xhr.send(fd);
      		this.list.unshift({type:'up',n:fld.name,s:fileSize,bf:'0%'})
      	},
      	uploadProgress(){
      		if(evt.lengthComputable) {
                let percent = Math.round(evt.loaded * 100 / evt.total);                 
                document.getElementById('progress').innerHTML = percent.toFixed(2) + '%';
                document.getElementById('progress').style.width = percent.toFixed(2) + '%';
            }else{
                document.getElementById('progress').innerHTML = 'unable to compute';
            }
      	},
      	uploadComplete(){
//    		document.getElementById('result').innerHTML = evt.target.responseText;
      	},
      	uploadFailed(){
      		alert("There was an error attempting to upload the file.");
      	},
      	uploadCanceled(){
      		alert("The upload has been canceled by the user or the browser dropped the connection.");
      	}
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
	
	z-index: 999;
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
	top: -45px;
	right: -45px;
	width: 44px;
	height: 44px;
	cursor: pointer;
	
}
.uploadBoxd2_1:hover{
	opacity: .7;
}
.uploadBoxd2_2{
	display: flex;
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
	background: #FF5121;
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
    margin: 9px 22px 9px 30px;
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
    background: #535353;
}
.uploadBoxd2_3::-webkit-scrollbar-track {
    background: none;
}
.uploadBoxd2_3>li{
	display: inline-block;
	width: 239px;
	margin: 0 20px 17px 0;

}
.uploadBoxd2_3>li:nth-child(3n+3){
	margin-right: 0;
}
.uploadBoxd2_3>li>div>img{
	display: block;
	width: 100%;
	height: 135px;
	border-radius: 5px;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
	margin-bottom: 6px;
}
.uploadBoxd2_3>li>div>div{
	text-align: left;
	font-size: 14px;
	color: #666666;
}
.uploadBoxd2_3>li>div>div>span{
	display: inline-block;
	float: right;
	line-height: 20px;
	
}
.uploadBoxd2_4{
	position: relative;
	background: #FFFFFF;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
	border-radius: 5px 5px 0 0;
	width: 818px;
	height: 88px;
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
	top: 20px;
	left: 28px;
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
    border:3px solid rgb(232, 232, 12);
    border-radius: 50%;
    position: absolute;
    top:0;
    -webkit-transform: rotate(45deg);
}
.rightcircle{
    border-top:3px solid green;
    border-right:3px solid green;
    right:0;
    -webkit-animation: circleProgressLoad_right 5s linear infinite;
}
.leftcircle{
    border-bottom:3px solid green;
    border-left:3px solid green;
    left:0;
    -webkit-animation: circleProgressLoad_left 5s linear infinite;
}
@-webkit-keyframes circleProgressLoad_right{
	0%{
        border-top:3px solid #ED1A1A;
        border-right:3px solid #ED1A1A;
        -webkit-transform: rotate(45deg);
            }
            50%{
                border-top:3px solid rgb(232, 232, 12);
                border-right:3px solid rgb(232, 232, 12);
                border-left:3px solid rgb(81, 197, 81);
                border-bottom:3px solid rgb(81, 197, 81);
                -webkit-transform: rotate(225deg);
            }
            100%{
                border-left:3px solid green;
                border-bottom:3px solid green;
                -webkit-transform: rotate(225deg);
            }
        }            
        @-webkit-keyframes circleProgressLoad_left{
            0%{
                border-bottom:3px solid #ED1A1A;
                border-left:3px solid #ED1A1A;
                -webkit-transform: rotate(45deg);
            }
            50%{
                border-bottom:3px solid rgb(232, 232, 12);
                border-left:3px solid rgb(232, 232, 12);
                border-top:3px solid rgb(81, 197, 81);
                border-right:3px solid rgb(81, 197, 81);
                -webkit-transform: rotate(45deg);
            }
            100%{
                border-top:3px solid green;
                border-right:3px solid green;
                border-bottom:3px solid green;
                border-left:3px solid green;
                -webkit-transform: rotate(225deg);
            }
        }
</style>