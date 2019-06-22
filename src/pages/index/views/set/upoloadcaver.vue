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
				outputType="'jpeg,png'"
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
					<img @click="changeScale(1)" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/cj_01.png" alt="">
					<img @click="changeScale(-1)" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/cj_02.png" alt="">
					<img @click="rotateLeft" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/cj_03.png" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {Message} from 'element-ui'
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
				formData.append('file',dataURLtoFile(data))
				formData.append('relation_type','user_info')
				formData.append('related_id',window.userInfo.open_id)
				formData.append('classify_1','avatar')
				formData.append('timestamp',times)
		
				this.$ajax.post(window.basrul+'/File/File/insert', formData)
				.then((response)=>{
					if(response.data.result==0){
						this.caver = response.data.data.url;
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
				Message({message: '图片格式不正确'});
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

</style>
