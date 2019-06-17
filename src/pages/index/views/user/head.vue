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
		</div>
		<div class="u_top2">
			<img class="u_top2_1" :src="userMessage.user_center_banner_pic?userMessage.user_center_banner_pic:userBg" alt="">
			<div class="dwek">
				<div   class="u_top2_2">				
					<div v-if="isMe()" class="u_top2_2_1">
						<div @click="showSetBg">设置背景图</div>
						<div @click="fxclick">分享</div>
					</div>
					<div v-else class="u_top2_2_1">
						<div @click="fxclick">分享</div>
						<div @click="showReport(userMessage.open_id,userMessage.open_id,'user')">举报</div>
					</div>
				</div>
			</div>
			
		</div>
		<div class="u_top3">
			<img class="u_top3_1" :src="userMessage.avatar"></img>
			<div class="u_top3_2">
				<div class="u_top3_2_1">{{userMessage.username?userMessage.username.substring(0,9):''}}</div>
				<div class="u_top3_2_2">{{userMessage.province+'-'+userMessage.city}}</div>
				<div class="u_top3_2_3">{{userMessage.personal_sign?userMessage.personal_sign:'这个人很懒，什么都没说~'}}</div>
			</div>
			<div class="u_top3_3">
				<span  @click="goFans('/followFans',userMessage.open_id)">粉丝<span>{{userMessage.fans_num}}</span></span>
				<span>人气<span>{{userMessage.popular_num}}</span></span>
				<span @click="goFans('/works',userMessage.open_id)">创作<span>{{userMessage.work_num}}</span></span>
			</div>
			<div class="u_top3_4">
				<router-link v-if="isMe()" class="u_top3_4_1" to="/upload">上传作品</router-link>
				<div class="u_top3_4_2" v-else>
					<span @click="gzclick" :class="userMessage.follow_flag==1||userMessage.follow_flag==2?'qgz':''">{{userMessage.follow_flag==1||userMessage.follow_flag==2?'已关注':'关注'}}</span>
					<span @click="gsxd">私信</span>
				</div>
				
			</div>
			
		</div>
		
		<div class="userNavBox">
			<router-link :to="{ path:'/works',query:{ id:qurId}}">作品</router-link>
			<router-link :to="{ path:'/recommend',query:{ id:qurId}}">推荐</router-link>
			<router-link :class="gofn" :to="{ path:'/follow',query:{ id:qurId}}">关注</router-link>
			<router-link :to="{ path:'/info',query:{ id:qurId}}">资料</router-link>
		</div>
		
		<div v-show="isshowd2" class="loginoutBox">
			<div class="loginoutBox1">
				<img @click="hindHb2()" class="loginoutBox2" src="/imge/cj_00.png">
				<div class="loginoutBox3">是否取消关注?</div>
				<div class="loginoutBox4"><span @click="hindHb2()">取消</span><span @click="Follow_del()">确定</span></div>
			</div>
		</div>
		<fxd :shareData="shareData" ref="fxd"></fxd>
		<RPT ref="report"></RPT>
	</div>
</template>

<script>

import {Message} from 'element-ui'
import RPT from '../../components/report'
import fxd from '../../components/share';
export default {
	components:{fxd,RPT},
	name: 'index',
	data(){
		return{
			gofn:'',
			shareData:{},
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
			isshowd2:false,
			follwTyle:0,
			qurId:'',
		}
	},
	mounted: function () {	
	
		this.init();		
	}, 
	created() {			
      this.qurId = this.$route.query.id;
    },
	
	methods: {	

		showReport(id,lid,ad){
			this.$refs.report.showReport(id,lid,ad);
		},
		fxclick(){
			this.$refs.fxd.showShare(true);
		},
		gsxd(){
			let pr = {
				open_id:this.userMessage.user_info.open_id,
				avatar:this.userMessage.user_info.avatar,
				username:this.userMessage.user_info.username,
				city:this.userMessage.user_info.city,
				vocation:this.userMessage.user_info.vocation,
			};
		
			this.$router.push({path:'/chat',query:pr});
		},
		goFans(d,id){
			this.$router.push({path:d,query:{id:id}});
		},
		gzclick(){
			if(this.userMessage.follow_flag==1 || this.userMessage.follow_flag==2){
				this.showHb2();
				return
			}
			this.Follow_add();
		},
		Follow_del(){
			
			if(this.follwTyle==1){
				return
			}
			this.follwTyle=1;
			let pr = {
				access_token:window.userInfo.access_token,
				follow_id:this.userMessage.open_id
			};
			this.api.Follow_del(pr).then((da)=>{
				if(da=='error'){
					this.follwTyle=0;
					return
				}
				this.follwTyle=0;
				this.hindHb2();
				this.userMessage.follow_flag=0;
				this.$router.push({path: this.$route.fullPath+'&p=1'})
				Message({message: '取消关注成功'});
			}).catch(()=>{
				this.follwTyle = 0;		
			});
		},
		Follow_add(){
			if(!window.userInfo){
				this.$router.push({path: '/login'})
				return
			}
			if(this.follwTyle==1){
				return
			}
			this.follwTyle=1;
			let pr = {
				access_token:window.userInfo.access_token,
				follow_id:this.userMessage.open_id
			};
			this.api.Follow_add(pr).then((da)=>{
				if(da=='error'){
					this.follwTyle=0;
					return
				}
				this.follwTyle=0;
				this.userMessage.follow_flag=1;
				this.$router.push({path: this.$route.fullPath+'&p=1'})
				
				
				Message({message: '关注成功'});
			}).catch(()=>{
				this.follwTyle = 0;		
			});
			
		
		},
		hindHb2(){
			this.isshowd2=false;
		},
		showHb2(){
			this.isshowd2=true;
		},
		init(){
		
			if(this.$route.path=='/followFans'){
				this.gofn = 'router-link-active';
			};
			if(!this.$route.query.id){
				this.$router.push({path: '/index'});	
				return
			}
			
			let pr = {
				user_open_id:this.$route.query.id
			};
			if(window.userInfo){
				pr.access_token = window.userInfo.access_token;
			}
			this.api.getUserDetail(pr).then((da)=>{
				if(da=='error'){
					return
				}
				this.userMessage = da;
				this.shareData = {
					url:'http://dev-web-ndesigner.idatachain.cn/aindex.html#/user?id='+this.$route.query.id,
					title:this.userMessage.username+"的主页-狮圈儿创作者平台",
					pics:this.userMessage.avatar,
					desc:'分享类容',
					summary:'的主页-狮圈儿创作者平台',
				};		
				this.$refs.fxd.setUrl(this.shareData);
				
				if(this.$parent.setData){
					this.$parent.setData(this.userMessage);
				}
				
			}).catch(()=>{
				
			});
		},		
		isMe(){
			if(!window.userInfo){
				return false;
			}
			return this.$route.query.id ==  window.userInfo.open_id;
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
				this.opType=1;
				this.$ajax.post(window.basrul+'/File/File/insert', formData)
				.then((da)=>{						
					let ds = da.data;
					if(ds.result==0){						
						let pr = {
							user_center_banner_pic:ds.data.url,
							access_token:window.userInfo.access_token
						};
						this.api.changeUserCenterBanner(pr).then((da)=>{
							if(da=='error'){
						
								this.opType=0;
								return
							}
							Message({message: '保存成功'});
							this.hindSetBg();
							this.userMessage.user_center_banner_pic = ds.data.url;
							this.userBg =  ds.data.url;
							this.opType=0;
						}).catch(()=>{
							this.opType=0;
						});
					
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
			if(file.size>10*1024*1024){
      			Message({message: '文件过大'});
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
	},
	watch: {	
		'$route': function() {
			this.init();
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
.dwek{
	position: absolute;
	top: 0;
	left: 50%;
	-webkit-transform: translateX(-50%);
	transform: translateX(-50%);
	width: 1300px;
}
.u_top2_2{
	background: rgba(0,0,0,.3);
	border-radius: 10px;
	width: 40px;
	height: 20px;
	position: absolute;
	top: 30px;
	right: 0;
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
.u_top2_2:hover>.u_top2_2_1,.u_top2_2:hover>.u_top2_2_2{
	display: block;
}
.u_top2_2_1{
	display: none;
	position: absolute;
    top: 0px;
    right: 0;
    transform: translateY(25%);
    background: #FFFFFF;
    -webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    border-radius: 5px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 109px;
    height: auto;
    padding: 10px 0;
}
.u_top2_2_2{
	display: none;
	position: absolute;
	top: 6px;
	right: 0;
	transform: translateY(25%);
	background: #FFFFFF;
	-webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	width: 109px;
	height: auto;
	padding: 10px 0;
}
.u_top2_2_1>div,.u_top2_2_2>div{
	cursor: pointer;
	font-size: 14px;
	color: #333333;
	line-height: 30px;
	text-align: left;
	text-indent: 20px;
}
.u_top2_2_1>div:hover,.u_top2_2_2>div:hover{
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
.u_top3{
	position: relative;
	margin: -78px auto 0;
	background: #FFFFFF;
	box-shadow: 0 3px 6px 0 rgba(0,0,0,0.10);
	border-radius: 10.16px;
	box-sizing: border-box;
	padding: 30px 40px;
	width: 1300px;
	height: 160px;
	text-align: left;
}
.u_top3_1{
	display: inline-block;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	margin-right: 20px;
	vertical-align: middle;
}
.u_top3_2{
	display: inline-block;
	vertical-align: middle;
}
.u_top3_2_1{
	line-height: 33px;
	font-size: 24px;
	color: #2D2D2D;
}
.u_top3_2_2{
	font-size: 12px;
	color: #999999;
	margin-bottom: 14px;
}
.u_top3_2_3{
	font-size: 14px;
	color: #666666;
}
.u_top3_3{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
	-webkit-transform: translate(-50%,-50%);
}
.u_top3_3>span{
	position: relative;
	display: inline-block;
	width: 181px;
	text-align: center;
	font-size: 14px;
	color: #999999;
}
.u_top3_3>span:after{
	content: "";
	position: absolute;
	top:50%;
	right: 0;
	transform: translateY(-50%);
	width: 1px;
	height: 34px;
	background: #E6E6E6;
}
.u_top3_3>span:last-child:after{
	display: none;
}
.u_top3_3>span>span{
	display: block;
	text-align: center;
	margin-top: 2px;
	font-size: 24px;
	color: #1E1E1E;
}
.u_top3_4{
	
	position: absolute;
	right: 41px;
	top: 50%;
	transform: translateY(-50%);
	
	
}
.u_top3_4_1{
	display: block;
	background: #FF5121;
	border-radius: 5px;
	width: 120px;
	height: 41px;
	line-height: 41px;
	font-size: 16px;
	color: #FFFFFF;
	text-align: center;
}
.u_top3_4_1:hover{
	opacity: .7;
}
.u_top3_4_2>span{
	cursor: pointer;
	display: inline-block;
	border: 1px solid #999999;
	border-radius: 5px;
	width: 118px;
	height: 39px;
	line-height: 39px;
	font-size: 16px;
	color: #333333;
	text-align: center;
	margin-right: 30px;
	
}
.u_top3_4_2>span:last-child{
	margin-right: 0;
}
.u_top3_4_2>.qgz{
	background: #FF5121;
	border-color: #FF5121;
	color: #fff;
}
.userNavBox{
	margin-top: 36px;
	border-bottom: 1px solid #E6E6E6;
	height: 37px;
}
.userNavBox>a{
	display: inline-block;
	height: 100%;
	margin-right: 72px;
	font-size: 16px;
	color: #1E1E1E;

}
.userNavBox>a:hover{
	color: #FF5121;
}
.userNavBox>a:last-child{
	margin-right: 0;
}
.userNavBox>.router-link-active{
	position: relative;
	color: #FF5121;
	font-weight: bold;
}
.userNavBox>.router-link-active:after{
	content: "";
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 94%;
	height: 1px;
	background: #FF5121;
}
.wusj2{
	display: block;
	margin: 0 auto;
	width: 680px;
}

.noData_x_01{
	text-align: center;
    margin: 60px auto;
}
</style>
