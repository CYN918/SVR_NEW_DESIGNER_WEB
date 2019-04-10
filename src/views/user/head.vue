<template>
	<div>
		<div v-show="isUpbg" class="u_top1">
			<div class="upBg">
				<vueCropper
				ref="cropper"
				:img="option.img"
				:outputSize="option.size"
				:fixed="true"
				:full="false"
				:fixedNumber = [1,.177]
				:outputType="option.outputType"
				:autoCropWidth="option.autoCropWidth"
				:autoCropHeight="option.autoCropHeight"
				:autoCrop="true"							
				>
				</vueCropper>
			</div>
			<div class="upBg2">
				<span class="upBg2_1">建议尺寸 1300*230px</span>
				<div class="upBg2_2">
					<img @click="changeScale(1)" src="/imge/cj_01.png" alt="">
					<img @click="changeScale(-1)" src="/imge/cj_02.png" alt="">
					<img @click="rotateLeft" src="/imge/cj_03.png" alt="">
				</div>
			</div>
			<div class="upBg3">
				<span @click="hindSetBg">取消</span>
				<span @click="startCrop" class="upBg3_1">保存</span>
				<span class="upBg3_2">
					上传图片
					<input type="file" id="uploads" accept="image/png, image/jpeg, image/jpg" @change="uploadImg">	
				</span>
			</div>
			<div class="upFm_yb_2">
				
																		
			</div>
			
		</div>
		<div class="u_top2">
			<img class="u_top2_1" :src="userBg" alt="">
			<div v-if="userMessage && user"  class="u_top2_2">				
				<div class="u_top2_2_1">
					<div @click="showSetBg">设置背景图</div>
					<div>分享</div>
				</div>
			</div>
		</div>
		<div class="u_top3"></div>
	</div>
</template>

<script>

import {Message} from 'element-ui'
export default {
	name: 'index',
	data(){
		return{
			userBg:'/imge/grzx_bg.png',
			previewStyle2:{},
			previews:{},
			option:{
				img:'',
				outputSize:1,
				outputType:'png',
				autoCrop:true,
				autoCropWidth:827,
				autoCropHeight:147,
				fixedBox:true,
			},
			isUpbg:false,
			opType:0,
			userMessage:'',
		}
	},
	mounted: function () {	
		this.init();		
	}, 
	methods: {	
		init(){
			if(!this.$route.query.id){
				this.$router.push({path: '/index'});	
				return
			}
			this.userMessage = window.userInfo;
			let pr = {
				user_open_id:this.$route.query.id
			};
			if(window.userInfo){
				pr.access_token = window.userInfo.access_token;
			}
			this.api.getUserDetail(pr).then((da)=>{
				if(!da){
					return
				}
				
			}).catch(()=>{
				
			});
		},		
		showSetBg(){
			this.option.img = this.userBg;
			this.isUpbg=true;
		},
		hindSetBg(){
			this.isUpbg=false;
		},
		startCrop(){
			if(this.opType==1){
				Message({message: '正在上传请稍后'});
				return
			}
			
			this.$refs.cropper.getCropData(data => {
				
				function dataURLtoFile(dataurl) {
					  var arr = dataurl.split(',');
					  var mime = arr[0].match(/:(.*?);/)[1];
					  var bstr = atob(arr[1]);
					  var n = bstr.length; 
					  var u8arr = new Uint8Array(n);
					  while(n--){
						  u8arr[n] = bstr.charCodeAt(n);
					  }
					  //转换成file对象
					  return new File([u8arr], 'xxxxxxxxxf.png', {type:mime});
					  //转换成成blob对象
					  //return new Blob([u8arr],{type:mime});
				}
				let app_secret = '6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY';
				let token = localStorage.getItem('userT');
				let times = (Date.parse(new Date())/1000);
				let arr = [
					1001,
					'6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY',
					token,
					times
				];
				let formData = new FormData();
				formData.append('app_id',1001);
				formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
				formData.append('user',token)
				formData.append('file',dataURLtoFile(data))
				formData.append('relation_type','user_info')
				formData.append('related_id',token)
				formData.append('classify_1','avatar')
				formData.append('timestamp',times)
				this.opType=1;
				this.$ajax.post('http://139.129.221.123/File/File/insert', formData)
				.then((da)=>{	
					this.opType=0;
					let ds = da.data;
					if(ds.result==0){
						this.userBg = ds.data.url;
					
					}else{
						// msg(response.msg);
					}
				})
				.catch(()=>{
					this.opType=0;
					
				});
			})
		},
		changeScale(num){			
			this.$refs.cropper.changeScale(num); 
		},
		rotateLeft(){			
			this.$refs.cropper.rotateLeft()
		},
		uploadImg(e){
			let file = e.target.files[0];
			if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)||e.target.files.length==0) {
				return
			}
			let reader = new FileReader()
			reader.onload =(e)=> {
		
			let data;
			data = e.target.result;
			if (typeof e.target.result === 'object') {
				data = window.URL.createObjectURL(new Blob([e.target.result]))
			} 					
			this.option.img = data;
			}
			reader.readAsArrayBuffer(file);
		},
	}
}	
</script>

<style>
.u_top1{
	height: 384px;
	border-bottom: 1px solid #E6E6E6;
	margin-bottom: 39px;
}
.upBg{
	margin: 20px auto 17px;
	width: 1300px;
	height: 230px;
}
.u_top2{
	position: relative;
}
.u_top2>img{
	display: block;
	width: 100%;
}
.u_top2_2{
	background: rgba(0,0,0,.3);
	border-radius: 10px;
	width: 40px;
	height: 20px;
	position: absolute;
	top: 30px;
	right: 310px;
	cursor: pointer;
}
.u_top2_2:after{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    content: "";
    width: 6px;
    height: 6px;
    border: 1px solid #fff;
    border-bottom: 0;
    border-right: 0;
    transform: rotate(227deg);
    transform-origin: 45% 35%;
}
.u_top2_2:hover>.u_top2_2_1{
	display: block;
}
.u_top2_2_1{
	display: none;
	position: absolute;
    top: 0;
    right: 0;
    transform: translateY(25%);
    background: #FFFFFF;
    -webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    border-radius: 5px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 109px;
    height: 80px;
    padding: 10px 0;
}
.u_top2_2_1>div{
	cursor: pointer;
	font-size: 14px;
	color: #333333;
	line-height: 30px;
	text-align: left;
	text-indent: 20px;
}
.u_top2_2_1>div:hover{
	background: #E6E6E6;
}
.upBg2{
	width: 1300px;
	margin: 0 auto;
	text-align: left;
}
.upBg2_1{
	font-size: 14px;
	color: #333333;
}
.upBg2_2{
	float: right;
}
.upBg2_2>img{
	display: inline-block;
	width: 24px;
	margin-left: 44px;
	cursor: pointer;
}
.upBg2_2>img:hover{
	opacity: .7;
}
.upBg3{
	width: 1300px;
	margin: 18px auto 0;
}
.upBg3>span{
	display: inline-block;
	border: 1px solid #999999;
	border-radius: 5px;
	width: 138px;
	height: 38px;
	text-align: center;
	line-height: 38px;
	font-size: 16px;
	color: #333333;
	cursor: pointer;
	
}
.upBg3>span:hover{
	opacity: .7;
}
.upBg3>span.upBg3_1{
	margin: 0 20px;
	background: #FF5121;
	border-color: #FF5121;
	color: #fff;
}
.upBg3>span.upBg3_2{
	position: relative;
}
.upBg3>span.upBg3_2>input{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
	cursor: pointer;
}
</style>
