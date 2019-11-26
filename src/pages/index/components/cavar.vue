<template>
	<TcBox :config="pz" ref="tcBox">
		<template v-slot:todo="{ todo }">
			<div class="cav_b">
				<div class="cavar_l">
					<div class="cavar_l_1">
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
						:canMoveBox="false"
						:centerBox="true"
						:fixedBox="true"
						:enlarge="2"
						@realTime="realTime"				
						>
						</vueCropper>
					</div>
					<div class="cavar_l_2">
						<div @click="clickIn" class="cavar_l_2_1 pend">重新上传</div>
						<img class="pend" @click="changeScale(1)" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/img/cj_01.png"/>
						<img class="pend" @click="changeScale(-1)" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/img/cj_02.png"/>
						<img class="pend" @click="rotateLeft" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/img/cj_03.png"/>				
					</div>
				</div>
				<div class="cavar_r">
					<div class="cavar_r_1">
						<div :style="previewStyle2">
							<div :style="previews.div" class="preview">
								<img :src="previews.url" :style="previews.img">
							</div>
						 </div>
					</div>
					<div class="cavar_r_2">预览效果</div>
				</div>
			</div>
			<div class="qxBm_btns qxBm_btnsx">
				<div @click="close" class="btns pend">取消</div>		
				<div @click="startCrop" class="btn-lod btns btns_js pend">
					<i v-if="upType" class="loading_a m_c"></i>
					<span v-else>确定</span>
				</div>										
			</div>
			<input type="file" class="hidIn" accept="image/png, image/jpeg, image/jpg" @change="uploadImg" ref="upObj"/>	
		</template>			
	</TcBox>
</template>
<script>
import TcBox from './TcBox';
export default {
	components:{TcBox},
	props:{
		config:Object,
	},
	data(){
		return{
			pz:{title:'上传头像'},
			previewStyle2:{},
			previews:{},
			option:{
				img:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/login/tx.svg',
				outputSize:1,
				outputType:'png',
				autoCrop:true,
				autoCropWidth:'500px',
				autoCropHeight:'400px',
				fixedBox:true,
			},
			upType:''
		}
	},
	mounted: function() {
	
	},
	methods: {
		setImg(i){
			this.option.img = i;
		},
		clickIn(){
			this.$refs.upObj.click();
		},
		show(i){
			if(i){
				this.setImg(i);
			}			
			this.$refs.tcBox.show();
		},
		close(){
			this.$refs.tcBox.close();
		},
		bdscff(a){
			this.bdtj('帐号设置','基本信息-头像弹窗'+a,'--');
		},
		realTime(data) {
			this.previews = data;			
			this.previewStyle2 = {
				width: this.previews.w + "px",
				height: this.previews.h + "px",
				overflow: "hidden",
				margin: "0",
				zoom: 100 / this.previews.w
			};
		},
		startCrop(){
			if(this.upType==1){
				this.$message({message: '正在上传图片请稍后'});
				return
			}
			this.upType = 1;
			this.bdscff('确定');
			let _this = this;
			this.$refs.cropper.getCropData(data => {
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
				formData.append('file',this.mJs.dataURLtoFile(data))
				formData.append('relation_type','user_info')
				formData.append('related_id',window.userInfo.open_id)
				formData.append('classify_1','avatar')
				formData.append('timestamp',times)
				formData.append('need_check',1);		
				_this.$ajax.post(window.basrul+'/File/File/insert', formData)
				.then((response)=>{
			
					_this.upType = '';
					if(response.data.result==0){
						_this.$parent.closeCavar(response.data.data.url);	
						_this.close();
						
					}else{
						_this.$message({message: response.data.data});
					}
				})
				.catch(function (error) {
					_this.upType = '';
					_this.$message({message: '网络故障'});
					
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
				this.$message({message: '图片格式不正确'});
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
.cav_b{
	padding: 40px 100px;
	width: 540px;
}
.cavar_l,.cavar_r{
	display: inline-block;
	vertical-align: top;
}
.cavar_l{
	margin-right: 40px;
}
.cavar_l_1{
	
	margin-bottom: 13px;
	width:400px;
	height:300px;
}
.cavar_l_2{
	height: 20px;
	position: relative;
	text-align: right;
}
.cavar_l_2>img{
	display: inline-block;
	vertical-align: top;
	margin-top: 2.5px;
	margin-left: 30px;
	width: 18px;
}
.cavar_l_2_1{
	position: absolute;
	top: 0;
	left: 0;
	height: 20px;	
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
}
.cavar_r{
	width: 100px;
}
.cavar_r_1{
	display: block;
	border-radius: 50%;
	overflow: hidden;
	border:1px solid #bbb;
	margin: 0 auto 10px;
	box-sizing: border-box;
	width: 100px;
	height: 100px;
}
.cavar_r_2{
	text-align: center;
	font-size:14px;
	color:rgba(187,187,187,1);
	line-height:20px;
}
.qxBm_btnsx>.btns{
	margin-top: 20px;
}

</style>
