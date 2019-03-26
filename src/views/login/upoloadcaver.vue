<template>
	<div class="phoshc">
		<div class="phoshc1" @click="close"></div>
		<div class="phoshc2">
			<div class="phoshc3">
				<vueCropper
				ref="cropper"
				:img="option.img"
				:outputSize="option.size"
				:fixed="true"
				:outputType="option.outputType"
				:autoCropWidth="option.autoCropWidth"
				:autoCropHeight="option.autoCropHeight"
				:autoCrop="true"
				@realTime="realTime"				
				>
				</vueCropper>
			</div>
			<div class="phoshc4">
				<div class="phoshc4_1">					
					<div class="show-preview" :style="previewStyle2">
						<div :style="previews.div" class="preview">
							<img :src="previews.url" :style="previews.img">
						</div>
					 </div>
				</div>				
				<div class="phoshc4_2">预览效果</div>
				<div class="phoshc4_3">
					<div @click="close">取消</div>
					<div @click="startCrop">确定</div>
				</div>
			</div>
			<div class="phoshc5">
				<div class="phoshc5_1">
					重新上传
					<input type="file" id="uploads" accept="image/png, image/jpeg, image/jpg" @change="uploadImg">															
				</div>
				<div class="phoshc5_2">
					<img @click="changeScale(1)" src="/imge/cj_01.png" alt="">
					<img @click="changeScale(-1)" src="/imge/cj_02.png" alt="">
					<img @click="rotateLeft" src="/imge/cj_03.png" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'login',	

	data(){		
		return{	
			previewStyle2:{},
			previews:{},
			option:{
				img:'',
				outputSize:1,
				outputType:'png',
				autoCrop:true,
				autoCropWidth:'150px',
				autoCropHeight:'150px',
				fixedBox:true,
			},
		}
	},	
	mounted: function () {	
	}, 
	methods: {
		close(){
			this.$parent.close(''); 		
		},
		setImgd(img){
			this.option.img = img;
		},
		realTime(data) {
			this.previews = data;			
			this.previewStyle2 = {
				width: this.previews.w + "px",
				height: this.previews.h + "px",
				overflow: "hidden",
				margin: "0",
				zoom: 150 / this.previews.w
			};
		},
		startCrop(){
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
				this.$ajax.post('http://139.129.221.123/File/File/insert', formData)
				.then((response)=>{
					if(response.data.result==0){
						this.caver = response.data.data;
						this.$parent.close(this.caver);	
					}else{
						// msg(response.msg);
					}
				})
				.catch(function (error) {
					
					
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
.phoshc{
	position: fixed;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index:9;
}
.phoshc1{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.1);
}
.phoshc2{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	width: 860px;
	height: 460px;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.2);
	border-radius: 10px;
	padding: 20px;
	box-sizing: border-box;
}
.phoshc3{
	width: 560px;
	height: 382px;
	display: inline-block;
	background: rgba(0,0,0,.4);
}
.phoshc4{
	display: inline-block;
	width: 250px;
	vertical-align: top;
}
.phoshc4_1{
	width: 150px;
	height: 150px;
	border-radius: 50%;
	overflow: hidden;
	background: rgba(0, 0, 0, 0.5);
	margin: 0 auto;
}
.phoshc4_1>img{
	display: block;
	width: 100%;
}
.phoshc4_2{
	font-size: 14px;
	color: #333333;
	opacity: .7;
	margin: 16px auto 150px;
}
.phoshc4_3{
	text-align: left;
}
.phoshc4_3>div{
	display: inline-block;
	border: 1px solid #979797;
	border-radius: 25.5px;
	width: 107px;
	height: 42.8px;
	line-height: 42.8px;
	text-align: center;
	font-size: 16px;
	color: #333333;
	margin-left: 16px;
}
.phoshc4_3>div:last-child{
	background: #353232;
	color: #FFFFFF;	
}
.phoshc4_3>div:hover{
	opacity: .7;
	cursor: pointer;
}
.vue-cropper[data-v-6dae58fd]{
	background: none;
}
.phoshc5_1:hover{
	opacity: .7;
	cursor: pointer;
}
.phoshc5{
	width: 566px;
	text-align: right;
}
.phoshc5_1{
	float: left;
	cursor: pointer;
	display: inline-block;
	position: relative;
	width: 80px;
	height: 28px;
	line-height: 28px;
	text-align: center;
	font-size: 20px;
	color: #333333;
}
.phoshc5_1>#uploads{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	opacity: 0;		
}
.phoshc5_2{
	display: inline-block;
	vertical-align: middle;
}
.phoshc5_2>img{
	display: inline-block;
	width: 28px;
	margin-right: 24px;
}
.phoshc5_2>img:last-child{
	margin-right: 0;
}
.phoshc5_2>img:hover{
	cursor: pointer;
	opacity: .7;
}
</style>
