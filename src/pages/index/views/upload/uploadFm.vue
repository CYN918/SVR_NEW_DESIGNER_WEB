<template>
	<div class="upFm">
		<div class="upFm_bg" ></div>
		<div class="upFm_box">
			<img @click="close" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/upload/yh_zlws_tx_gb.svg" class="uploadBoxd2_1">
			<div class="upFm_yl">
				<div class="upFm_yl_1">
					<div class="upFm_yl_1_1" >
						
						<div class="upFm_yl_1_1x2">
						<div :style="previewStyle2">
						<div :style="previews.div" class="preview">
							<img :src="previews.url" :style="previews.img">
						</div>
						</div>
						</div>
						
					</div>				
					<div class="upFm_yl_1_2">
						<div class="upFm_yl_1_2_1">
							<span class="maxwz1">{{InputValue}}</span>
							<img src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/zs_icon_tj.png" alt="">
						</div>
						<div class="upFm_yl_1_2_2">
							<span>原创-平面</span>
							<span>{{(new Date()).Format("yyyy-MM-dd ")}}</span>
						</div>
						<div class="upFm_yl_1_2_3">
							<span><img src="https://img.zcool.cn/community/01e9b65c986887a801214168d67106.jpg@260w_195h_1c_1e_1o_100sh.jpg" alt=""></span>
							<div>
								<span class="iconfont pend">&#xe6a2; 9</span>
								<span class="iconfont pend">&#xe672; 0</span>
								<span class="iconfont pend">&#xe616; 0</span>
							</div>
						</div>
					</div>
				</div>
				
			</div>

			<div class="upFm_yr">
				<vueCropper
				ref="cropper"
				:img="option.img"
				:outputSize="option.size"
				:fixed="true"
				:full="false"
				:fixedNumber = [1,.683]
				:outputType="option.outputType"
				:autoCropWidth="option.autoCropWidth"
				:autoCropHeight="option.autoCropHeight"
				:autoCrop="true"
				@realTime="realTime"				
				>
				</vueCropper>
				<div v-if="!isImff" class="upFm_yl_1_1x">+</div>
				<input v-if="!isImff" class="fileinpd" type="file" id="uploads" accept="image/png, image/jpeg, image/jpg" @change="uploadImg">	
			</div>
			
			<div class="upFm_yb">
				<div class="upFm_yb_1">
					效果预览
					<div>上传图片支持JPG、PNG、GIF，大小<10M<br/>建议尺寸为800×600 px</div>
				</div>
				<div class="upFm_yb_2">重新上传<input class="fileinpd" type="file" accept="image/png, image/jpeg, image/jpg" @change="uploadImg"></div>
				<div class="upFm_yb_3">
					
					<img class="pend" @click="changeScale(1)" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/upload/yh_zlws_tx_fd.svg" alt="">
					<img class="pend" @click="changeScale(-1)" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/upload/yh_zlws_tx_sx.svg" alt="">
					<img class="pend" @click="rotateLeft" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/upload/yh_zlws_tx_sz.svg" alt="">
				</div>
			</div>
			
			
			<div class="upFm_ybt">
				<div @click="close">取消</div>
				<div @click="startCrop">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
import {Message} from 'element-ui';
export default {
    props:{
		InputValue:'',
        type:'',
	},
	name: 'login',
	data(){		
		return{
			previewStyle2:{},
			previews:{ },
			option:{
				img:'',
				outputSize:1,
				outputType:'png',
				autoCrop:true,
				autoCropWidth:300,
				fixedBox:true,
			},
			opType:0,
			isImff:'',
		}
	},	
	mounted: function () {

	}, 
	watch: {
		'option.img'() {			
			this.isImff = '';
			if(this.option.img){
				this.isImff = 1;
			}
		},
	
	},
	
	
	methods: {
		
		close(){
			this.$parent.close(''); 		
		},
		setImgd(img){

		},
		realTime(data) {
			this.previews = data;	
			this.previewStyle2 = {
				width: this.previews.w + "px",
				height: this.previews.h + "px",
				overflow: "hidden",
				margin: "0",
				zoom: 300 / this.previews.w
			};
		},
		startCrop(){
			if(this.opType==1){
				Message({message: '封面正在上传，请稍后'});
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
				formData.append('is_callback',1)
				
				
				this.opType=1;
				Message({message: '封面正在上传，请稍后'});
				this.$ajax.post(window.basrul+'/File/File/insert', formData)
				.then((da)=>{	
					this.opType=0;
					let ds = da.data;
					if(ds.result==0){
						this.caver = ds.data.url;
						this.$parent.close(this.caver,ds.data.fid);	
					}else{
						// msg(response.msg);
					}
				})
				.catch(function () {
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
			if (!/\.(jpg|jpeg|png|JPG|PNG|GIF)$/.test(e.target.value)||e.target.files.length==0) {
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
.upFm{
	position: fixed;
	top:0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index:9999;
}
.upFm_bg{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.1);
}
.upFm_box{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.2);
	border-radius: 10px;
	box-sizing: border-box;
	padding: 50px;
	width: 818px;
	height: 527px;
}
.upFm_box>div{
	display: inline-block;
}
.upFm_box>div.upFm_yl{
	width: 297.9px;
	vertical-align: top;
	margin-right: 20.1px;
}
.upFm_box>div.upFm_yr{
	position: relative;
	width: 400px;
	height: 300px;
	background: rgba(0,0,0,.4);
	margin-bottom: 10px;
}
.upFm_yl_1{
	background: #F6F6F6;
	border-radius: 5.08px;
	width: 297.9px;
	height: 297.9px;
}
.upFm_yl_1_1{
	position: relative;
	width: 297.9px;
	height: 207.3px;
	overflow: hidden;
}
.upFm_yl_1_1:hover>.upFm_yl_1_1x{
	z-index: 9;
	background: red;
}

.upFm_yl_1_1x{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	width: 22.9px;
    height: 22.9px;
    border-radius: 50%;
    font-size: 21px;
    text-align: center;
    line-height: 22.9px;
    background: #FF5121;
    color: #E6E6E6;

}
.upFm_yl_1_1 img {
	display: inline-block;
	width: 100%;
}
.upFm_yl_1_2{
	padding:0 9.6px 9.6px 9.6px;

	text-align: left;
}
.upFm_yl_1_2_1{
	font-size: 16.25px;
	color: #1E1E1E;
	margin-bottom: 3px;
}
.upFm_yl_1_2_1>img{
	float: right;
	width: 14px;
	height: 14px;
	margin-top: 3px;
}

.upFm_yl_1_2_2{
	line-height: 30px;
	font-size: 12.19px;
	color: #878787;
	text-align: left;
	margin-bottom: 5px;
}
.upFm_yl_1_2_3{
	font-size: 12.19px;
	color: #999999;
	text-align: left;
}
.upFm_yl_1_2_3>div{
	display: inline-block;
}
.upFm_yl_1_2_2>span:last-child{
	float: right;
}
.upFm_yl_1_2_3>span{
	display: inline-block;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	overflow: hidden;
}
.upFm_yl_1_2_3>span>img{
	display: block;
	width: 100%;
	height: 100%;
}
.upFm_yl_1_2_3>div{
	float: right;
}
.upFm_yl_1_2_3>div>span{
	margin-right: 30px;
	font-size: 12.19px;
	color: #999999;
}
.upFm_yl_1_2_3>div>span:last-child{
	margin-right: 0;
}
.upFm_yb{
	display: block !important;
	text-align: left;
	font-size: 14px;
	color: #333333;
}
.upFm_yb>div{
	display: inline-block;
}
.upFm_yb_1{
	width: 297.1px;
	margin-right: 20.1px;
}
.upFm_yb_1>div{
	margin-top: 11px;
	font-size: 12px;
	color: #999999;
}
.upFm_yb_2{
	position: relative;
	vertical-align: top;
	
}
.upFm_yb_2>input{
	cursor: pointer;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.upFm_yb_3{
	vertical-align: top;
	float: right;
}
.upFm_yb_3>img{
	margin-right: 33px;
}
.upFm_yb_3>img:hover{
	opacity: .7;
}
.upFm_yb_3>img:last-child{
	margin-right: 0;
	
}
.upFm_ybt{
	display: block !important;
	text-align: right;
}
.upFm_ybt>div{
	cursor: pointer;
	display: inline-block;
	width: 100px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	font-size: 14px;
	color: #333333;
	border: 1px solid #979797;
	border-radius: 25.5px;
}
.upFm_ybt>div:hover{
	opacity: .7;
}
.upFm_ybt>div:last-child{
	border-color:  #353232;
	background: #353232;
	color: #fff;
	margin-left: 38px;
}
.fileinpd{
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}
.upFm_yl_1_1x2{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}	
.maxwz1{
	max-width: 186px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
