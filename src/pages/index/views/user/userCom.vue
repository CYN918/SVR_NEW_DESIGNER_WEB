<template>
	<div>
		<div class="new_usecm_1">
		<div v-show="isUpbg" class="u_top1">
			<div class="upBg">
				<vueCropper
				ref="cropper"
				:info="false"
				:img="option.img"
				:outputSize="option.size"
				:fixed="true"
				:full="false"
				:checkCrossOrigin="false"
				:fixedNumber = [1,.177]
				:outputType="option.outputType"
				:autoCropWidth="option.autoCropWidth"
				:autoCropHeight="option.autoCropHeight"
				:autoCrop="true"
				:fixedBox="true"
				:canMoveBox="false"
				:centerBox="true"				
				:enlarge="2"							
				>
				</vueCropper>
			</div>
			<div class="upBg2">
				<span class="upBg2_1">建议尺寸 1920*260px</span>
				<div class="upBg2_2">
					<img @click="changeScale(1)" :src="imU+'cj_01.png'" alt="">
					<img @click="changeScale(-1)" :src="imU+'cj_02.png'" alt="">
					<img @click="rotateLeft" :src="imU+'cj_03.png'" alt="">
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
			<img  class="u_top2_1" :src="mJs.Cavars(userMessage.user_center_banner_pic)"/>
			<div class="dwek">
				<div   class="u_top2_2">				
					<div v-if="userTped" class="u_top2_2_1">
						<div @click="showSetBg('设置背景图')">设置背景图</div>
						<div @click="fxclick('分享')">分享</div>
					</div>
					<div v-else class="u_top2_2_1">
						<div @click="fxclick('分享')">分享</div>
						<div @click="showReport(userMessage.open_id,userMessage.open_id,'user')">举报</div>
					</div>
				</div>
			</div>
			
		</div>
		<div class="u_top3">
			<img class="u_top3_1" :src="mJs.Cavars(userMessage.avatar)"></img>
			<div class="u_top3_2">
				<div class="u_top3_2_1">{{backnAM(userMessage.username)}}</div>
				<div class="u_top3_2_2">{{userMessage.province+'-'+userMessage.city}}</div>
				<div class="u_top3_2_3">{{userMessage.personal_sign?userMessage.personal_sign:'这个人很懒，什么都没说~'}}</div>
			</div>
			<div class="u_top3_3">
				<span class="pend"  @click="goFans('/followFans',userMessage.open_id,'粉丝数')">粉丝<span>{{userMessage.fans_num}}</span></span>
				<span>人气<span>{{userMessage.popular_num}}</span></span>
				<span class="pend" @click="goFans('/works',userMessage.open_id,'创作')">创作<span>{{userMessage.work_num}}</span></span>
			</div>
			<div class="u_top3_4">
				<router-link v-if="isMe()" class="u_top3_4_1" to="/upload">上传作品</router-link>
				<div class="u_top3_4_2" v-else>
					<span @click="gzclick" :class="userMessage.follow_flag==1||userMessage.follow_flag==2?'qgz':''">{{userMessage.follow_flag==1||userMessage.follow_flag==2?'已关注':'关注'}}</span>
					<span @click="gsxd">私信</span>
				</div>
				
			</div>
			
		</div>
		
		<div class="userNavBoxXz">
			<div class="userNavBoxXz_1">
				<a :class="['pend',ison=='/works'?'router-link-active':'']" @click="goZP('/works','tag_作品')">作品</a>
				<a :class="['pend',ison=='/recommend'?'router-link-active':'']" @click="goZP('/recommend','tag_推荐')">推荐</a>
				<a :class="['pend',ison=='/follow' || gofn?'router-link-active':'']" @click="goZP('/follow','tag_关注')">关注</a>
				<a :class="['pend',ison=='/info'?'router-link-active':'']" @click="goZP('/info','tag_资料')">资料</a>
			</div>			
		</div>
		</div>

		<unfollow @suUnFn="followUnSu" @suAdFn="followAdSu" ref="unfollow"></unfollow>
		<fxd :shareData="shareData" ref="fxd"></fxd>
		<RPT ref="report"></RPT>
		<router-view/>
	</div>
</template>

<script>

import {Message} from 'element-ui'
import RPT from '../../components/report'
import fxd from '../../components/share';
import unfollow from '../../components/unfollow';
export default {
	components:{fxd,RPT,unfollow},
	name: 'index',
	data(){
		return{
			gofn:'',
			outc:{
				title:'删除评论确认',
				scroll:1,
				cent:'确定删除该条评论?',
			},
			shareData:{},
			userBg:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/grzx_bg.svg',
			previewStyle2:{},
			previews:{},
			option:{
				img:'',
				outputSize:1,
				outputType:'png',
				autoCrop:true,
				autoCropWidth:1300,
				autoCropHeight:267,
				fixedBox:true,
			},
			isUpbg:false,
			opType:0,
			userMessage:'',

			follwTyle:0,
			qurId:'',
			userTped:'',
			ison:'',
		}
	},
	mounted: function () {	
		this.init();		
	}, 
	created() {
      this.qurId = this.$route.query.id;
    },
	
	methods: {	
		goZP(a,b){
			this.bdtjCom(b);
			this.$router.push({path: a,query:{id:this.qurId}})			
		},
		backnAM(str){

			if(!str){
				return '';
			}
			let l = str.length;
			var len = 0;  
			for (var i=0; i<l; i++) {  
				if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {  
					len++;  
				} 
				if(len>17){
					l = i-1;
					break;
				} 
				len ++; 
				if(len>17){
					l = i-1;
					break;
				}
			}  
			return str.substring(0,l);  

			
		},
		imgTrick(src) {
			const img = new Image()
			img.src = src
			img.crossOrigin = 'anonymous'
			return img
		},
		showReport(id,lid,ad){
			this.bdtjCom('举报');
			this.$refs.report.showReport(id,lid,ad);
		},
		fxclick(a){
			this.bdtjCom(a);
			this.$refs.fxd.showShare(true);
		},
		gsxd(){
			let pr = {
				open_id:this.userMessage.open_id,
				avatar:this.userMessage.avatar,
				username:this.userMessage.username,
				city:this.userMessage.city,
				vocation:this.userMessage.vocation,
			};
					
			this.$router.push({path:'/chat',query:pr});
			
		},
		bdtjCom(a){
			let b = this.userTped?'自己视角-':'他人视角-';		
			this.bdtj('个人主页',b+a,'--');
		},
		goFans(d,id,c){
			if(c){
				this.bdtjCom(c);
			}
			this.$router.push({path:d,query:{id:id}});
		},
		gzclick(){			
			if(this.userMessage.follow_flag>0){
				this.Follow_un(this.userMessage.open_id);	
				return
			}
			this.Follow_add(this.userMessage.open_id)					
		},
		Follow_un(id){
			this.$refs.unfollow.setFollowId(id);
		},
		Follow_add(id){
			this.$refs.unfollow.Follow_add(id);
		},
		followUnSu(){
			
			this.$router.push({path: this.$route.fullPath})
		},
		followAdSu(da){
			this.$router.push({path: this.$route.fullPath})	
		},

		init(){
			
			this.ison = this.$route.path;
			if(this.isMe()==true){this.userTped=1}
			this.qurId = this.$route.query.id;
			this.gofn = '';
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
			this.api.getUserDetail(pr).then((da)=>{
				if(da=='error'){
					return
				}
				this.userMessage = da;
				// this.userBg = da.user_center_banner_pic;
				document.title=this.userMessage.username+'-狮圈儿（Zoocreators）';
				this.shareData = {
					titlec:'创作者分享',
					url:location.origin+'/aindex.html#/user?id='+this.$route.query.id,
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
		showSetBg(a){
			this.bdtjCom(a);
			this.option.img = this.userMessage.user_center_banner_pic?this.userMessage.user_center_banner_pic:this.userBg;
			this.isUpbg=true;
		},
		hindSetBg(){
			this.isUpbg=false;
		},
		startCrop(){
			
			this.bdtjCom('设置封面图-保存');
			if(!this.option.img){
				Message({message: '请先上传图片'});
				return
			}
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
			let p = '放大';
			if(num==1){
				p = '缩小';
			}
			this.bdtjCom('设置封面图-'+p);
			this.$refs.cropper.changeScale(num); 
		},
		rotateLeft(){	
			this.bdtjCom('设置封面图-旋转');
			this.$refs.cropper.rotateLeft()
		},
		uploadImg(e){
			this.bdtjCom('设置封面图-上传图片');
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
.new_usecm_1{
	background: #fff;
}
.u_top1{
	height: 384px;
	border-bottom: 1px solid #E6E6E6;
	margin-bottom: 39px;
}
.upBg{
	background: #fff;
	padding: 20px 0 17px;
	width: 1300px;
	margin: 0 auto;
	height: 230px;
}
.u_top2{
	position: relative;
	height: 260px;
	overflow: hidden;
	background: #282828;
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
	background: #33B3FF;
	border-color: #33B3FF;
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
	background: #33B3FF;
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
	background: #33B3FF;
	border-color: #33B3FF;
	color: #fff;
}
.userNavBoxXz{
	margin-top: 36px;
	border:none;
	height: 37px;
}
.userNavBoxXz_1{
	width: 100%;
	height: 37px;
	background: #fff;
}
.userNavBoxXz_1>a{
	display: inline-block;
	height: 100%;
	margin-right: 72px;
	font-size: 16px;
	color: #1E1E1E;

}
.userNavBoxXz_1>a:hover{
	color: #33B3FF;
}
.userNavBoxXz_1>a:last-child{
	margin-right: 0;
}
.userNavBoxXz_1>.router-link-active{
	position: relative;
	color: #33B3FF;
	font-weight: bold;
}
.userNavBoxXz_1>.router-link-active:after{
	content: "";
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 94%;
	height: 1px;
	background: #33B3FF;
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
.csBoxNx1{
	min-height: 500px;
}
</style>
