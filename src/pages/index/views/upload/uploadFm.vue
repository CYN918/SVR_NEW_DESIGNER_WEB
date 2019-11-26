<template>
	<div>
		<div class="upFm_box">
			<div class="upFm_l">
				<div class="upFm_l_1">封面预览</div>
				<workDom class="upFm_l_2" v-if="moData.work_name" :el="moData"></workDom>
				<div class="fm_dmoBg">
					<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/imge/new/works/log.svg"/>
				</div>
				<div class="ylt_pidf">
					<div :style="previewStyle2">
						<div :style="previews.div" class="preview">
							<img :src="previews.url" :style="previews.img">
						</div>
					</div>
				</div>				
				<div class="upFm_l_3">
					<div class="upFm_l_3_1">图片要求</div>
					<div class="upFm_l_3_2">建议尺寸为800×600px</div>
					<div class="upFm_l_3_3">上传图片支持JPG、PNG，大小不超过10M</div>
				</div>				
			</div>
			<div class="upFm_r">
				<div class="upFm_r_0">{{tips}}</div>
				<div class="upFm_r_1">
					<div v-if="!previews.url" class="upFm_r_1_1">
						<div @click="fild" class="myjsg_01 pend">
							<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/imge/new/works/icon_add.svg"/>
							添加封面
						</div>						
						<div class="upFm_r_1_1_2">
							封面上传建议<br/>
							1、封面图片高清，尺寸不小于800*600；<br/>
							2、裁剪时避免文字出现一半的情况；<br/>
							3、图片主体元素突出。<br/>
							<span>这样的封面才会让狮友更青睐哦！</span>							
						</div>
					</div>
					<div class="upFm_r_1_2">
						<vueCropper
						ref="cropper"
						:img="option.img"
						:outputSize="option.size"
						:fixed="true"
						:full="true"
						:fixedNumber = [1,.75]
						:outputType="option.outputType"
						:autoCropWidth="option.autoCropWidth"
						:autoCropHeight="option.autoCropHeight"
						:autoCrop="true"
						:enlarge="1"
						:canMoveBox="false"
						:centerBox="true"
						:fixedBox="true"									
						@realTime="realTime"				
						>
						</vueCropper>
					</div>
				</div>
				<div class="upFm_r_2">
					<span @click="fild" class="pend">重新上传</span>
					<img class="pend" @click="changeScale(1)" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/upload/yh_zlws_tx_fd.svg" alt="">
					<img class="pend" @click="changeScale(-1)" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/upload/yh_zlws_tx_sx.svg" alt="">
					<img class="pend" @click="rotateLeft" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/upload/yh_zlws_tx_sz.svg" alt="">				
				</div>			
			</div>
		</div>
		<div class="qxBm_btns">
			<span class="btns pend" @click="closeds('取消')">取消</span><span class="btns btns_js pend" @click="startCrop">确定</span>
		</div>
		<input ref="opin" class="nFId" type="file" accept="image/png, image/jpeg, image/jpg" @change="uploadImg">
	</div>
</template>

<script>
import {Message} from 'element-ui';
import workDom from '../../components/box_a'
export default {
	components:{workDom},
    props:{
		datad:Object,
	},
	name: 'login',
	data(){		
		return{
			moData:{},
			previewStyle2:{},
			previews:{ },
			option:{
				img:'',
				outputSize:4,
				outputType:'png',
				autoCrop:true,
				autoCropWidth:577,
				autoCropHeight:433,
				fixedBox:true,
				
			},
			tips:'',
			opType:0,
			isImff:'',
			Zp:'',
			usertx:'',
		}
	},	
	mounted: function () {
		this.init();
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
		fild(){
			this.$refs.opin.click();
		},
		init(){
			this.moData = {	
					work_name:this.datad.work_name,
					face_pic:'',
					is_recommend:1,
					classify_1_name:this.datad.cl1,
					classify_2_name:this.datad.cl2,
					classify_3_name:this.datad.cl3,
					create_time:(new Date()).Format("yyyy-MM-dd "),
					view_num:0,
					like_num:0,
					comment_num:0,
					user_info:{
						avatar:window.userInfo.avatar,
						username:window.userInfo.username,
					}				
			};
			this.option.img = this.datad.face_pic;
			this.Zp = this.datad.work_id;
		},
		closeds(a){
			if(a){
				this.bdtj('封面上传弹窗',a,'--');
			}
			this.$parent.close(''); 		
		},
		setImgd(img,id){
			this.option.img = img;
			this.Zp = id;
			
		},
		realTime(data) {
			this.previews = data;				
			this.previewStyle2 = {
				width: "100%",
				height: this.previews.h + "px",
				overflow: "hidden",
				margin: "0",
				zoom: 310 / this.previews.w
			};
		},
		startCrop(){
			this.bdtj('封面上传弹窗','确定','--');
			if(this.opType==1){
				Message({message: '封面正在上传，请稍后'});
				return
			}
			
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
				formData.append('file',this.mJs.dataURLtoFile(data,this.Zp))
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
						this.$parent.$parent.close(this.caver,ds.data.fid);	
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
			this.bdtj('封面上传弹窗','重新上传','--');
			let file = e.target.files[0];
			if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)||e.target.files.length==0) {
				this.$message({message:'格式不正确'});
				return
			}
			this.tips = '';
			if(file.size<5000){
				this.tips = '你上传的图片太小了，清晰的封面才会让狮友更青睐哦！';
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

.upFm_box{
	padding: 30px 100px;
	width: 917px;
	text-align: left;
}

.upFm_l,.upFm_r{
	display: inline-block;
	vertical-align: top;
}
.upFm_l{
	position: relative;
	margin-right: 30px;
	width: 310px;
}
.upFm_r_0{
	height: 30px;
	font-size: 14px;
    color: rgba(255,146,0,1);
	line-height:30px;
}
.upFm_l_1{
	font-size:14px;
	color:rgba(30,30,30,1);
	line-height:30px;	
}
.upFm_l_2{
	margin-bottom: 30px;
}
.upFm_l_3{
	font-size:14px;
	line-height:20px;
}
.upFm_l_3_1{	
	color:rgba(30,30,30,1);	
	margin-bottom: 10px;
}
.upFm_l_3_2{
	color:rgba(102,102,102,1);
}
.upFm_l_3_3{
	color:rgba(187,187,187,1);
}
.upFm_r{
	width: 577px;
}
.upFm_r_1{
	position: relative;
	margin-bottom: 14px;
	width:577px;
	height:433px;
}
.upFm_r_1_1{
	position: absolute;
	top: 0;
	left: 0;
	width:577px;
	height:433px;
	background:#F4F6F9;
	z-index: 10;
}
.upFm_r_1_2{
	width:577px;
	height:433px;
}
.upFm_r_2{
	text-align: right;
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
}
.upFm_r_2>img{
	display: inline-block;
	vertical-align: top;
	margin-top: 2px;
	margin-left: 28px;
}
.myjsg_01>img{
	display: block;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin: 0 auto 10px;
}
.myjsg_01{
	text-align: center;
	font-size:14px;
	color:rgba(30,30,30,1);
	line-height:20px;
	margin: 122px auto 30px;
}
.upFm_r_1_1_2{
	margin: 0 auto;
	width:260px;
	font-size:14px;
	color:rgba(153,153,153,1);
	line-height:20px;
}
.upFm_r_1_1_2>span{
	margin-top: 20px;
    display: inline-block;
}
.nFId{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 0;
	height: 0;
	opacity: 0;
}
.fm_dmoBg{
	position: absolute;
	top: 30px;
	left: 0;
	width: 310px;
	height: 232px;
	border-radius: 5px 5px 0 0;
	overflow: hidden;
	background:rgba(244,246,249,1);
}
.fm_dmoBg>img{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
}
.ylt_pidf{
	
    position: absolute;
    top: 30px;
    left: 0;
    width: 310px;
    height: 232px;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
}
</style>
