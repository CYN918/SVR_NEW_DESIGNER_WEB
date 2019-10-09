<template>
	<div>
		<div class="new_usecm_1">
		<Topbk v-if="isUpbg" @closeTopBk="closeTopBk" @setSuss="setSuss" :img="userMessage.user_center_banner_pic"></Topbk>
		<div class="u_top2">
			<img  class="u_top2_1" :src="userMessage.user_center_banner_pic" alt="">
			<div class="dwek">
				<div class="u_top2_2">				
					<div class="u_top2_2_1">
						<div v-for="(el,key) in topBtns" :key="key" @click="clickFn(el.fn)">{{el.n}}</div>				
					</div>
				</div>
			</div>			
		</div>
		<div class="u_top3">
			<img class="u_top3_1" :src="userMessage.avatar+'?x-oss-process=image/resize,w_128'"></img>
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
				<router-link v-if="userTped==1" class="u_top3_4_1" to="/upload">上传作品</router-link>
				<div class="u_top3_4_2" v-else>
					<span @click="gzclick" :class="userMessage.follow_flag>0?'qgz':''">{{userMessage.follow_flag | followType}}</span>
					<span @click="gsxd">私信</span>
				</div>
				
			</div>
			
		</div>
		<div class="userNavBoxXz">
			<pTop class="userNavBoxXz2" :cn="topCn">
				<template v-slot:todo="{ todo }">
					<a v-for="(el,key) in centBtns" :key="key" :class="['pend',ison==el.a?'router-link-active':'']" @click="goZP(el.a,el.b,todo)">{{el.b}}</a>					
				</template>		
			</pTop>			
		</div>	
		
		
		
		</div>

		<unfollow @suUnFn="followUnSu" @suAdFn="followAdSu" ref="unfollow"></unfollow>
		<fxd :shareData="shareData" ref="fxd"></fxd>
		<RPT ref="report"></RPT>
		<component v-bind:is="tcZj" ref="tcZjs"></component>	
	</div>
</template>

<script>

import Topbk from './topBk';
import pe_works from './works';
import pe_recommend from './recommend';
import pe_follow from './follow';
import pe_fans from './fans';
import pe_info from './info';

import RPT from '../../components/report'
import fxd from '../../components/share';
import unfollow from '../../components/unfollow';
import pTop from '../../components/postionTop';
export default {
	components:{Topbk,pe_works,pe_recommend,pe_follow,pe_fans,pe_info,fxd,RPT,unfollow,pTop},
	name: 'index',
	data(){
		return{
			topCn:{
				min:400,
			},
			topBtns:[],
			centBtns:[
				{a:'/works',b:'作品'},
				{a:'/recommend',b:'推荐'},
				{a:'/follow',b:'关注'},
				{a:'/info',b:'资料'},
			],
			tcZj:'',

			outc:{
				title:'删除评论确认',
				scroll:1,
				cent:'确定删除该条评论?',
			},
			shareData:{},
			userBg:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/grzx_bg.svg',
			previewStyle2:{},
			previews:{},
			
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
		this.mJs.scTop(1);
		this.init();		
	}, 
	
	
	methods: {	
		clickFn(n){
			this[n]();
		},
			
		goZP(a,b,c){
			if(c){
				this.mJs.scTop(400);
			}
			this.bdtjCom('tag_'+b);
			this.$router.push({path: a,query:{id:this.qurId}})			
		},
		backnAM(str){
			if(!str){return ''}
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
		showReport(){
			this.bdtjCom('举报');
			this.$refs.report.showReport(this.userMessage.open_id,this.userMessage.open_id,'user');
		},
		fxclick(){
			this.bdtjCom('分享');			
			this.shareData = {
					titlec:'创作者分享',
					url:location.origin+'/aindex.html#/user?id='+this.$route.query.id,
					title:this.userMessage.username+"的主页-狮圈儿创作者平台",
					pics:this.userMessage.avatar,
					desc:'分享类容',
					summary:'的主页-狮圈儿创作者平台',
			};		
			this.$refs.fxd.setUrl(this.shareData);					
			this.$refs.fxd.showShare(true);
		},
		gsxd(){	
			this.$router.push({path:'/chat',query:{
				open_id:this.userMessage.open_id,
				avatar:this.userMessage.avatar,
				username:this.userMessage.username,
				city:this.userMessage.city,
				vocation:this.userMessage.vocation,
			}});			
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
			if(this.$refs.tcZjs.getData){
				this.$refs.tcZjs.getData();
			}
			
			this.getUserDetail();

		},
		followAdSu(da){
			if(this.$refs.tcZjs.getData){
				this.$refs.tcZjs.getData();
			}
			this.getUserDetail();
		
		},
		getUserDetail(){
			let pr = {
				user_open_id:this.$route.query.id
			};
			this.api.getUserDetail(pr).then((da)=>{
				if(da=='error'){return}
				if(!da.user_center_banner_pic || da.user_center_banner_pic==null){
					da.user_center_banner_pic = this.userBg;
				}
				this.userMessage = da;
				document.title=this.userMessage.username+'-狮圈儿（Zoocreators）';
										
			}).catch(()=>{				
				this.$router.push({path: '/404'});
			});
		},
		init(){
			if(!this.$route.query.id){
				this.$router.push({path: '/index'});	
				return
			}			
			this.ison = this.$route.path;
			this.tcZj = this.$route.name;
			if(this.$route.path=='/followFans'){
				this.ison = '/follow';
			};
			let unType = '';
			let btn = [
				{fn:'showReport',n:'举报'},
				{fn:'fxclick',n:'分享'}		
			];			
			if(this.isMe()==true){
				this.unType=1;
				btn = [
					{fn:'showTopBk',n:'设置背景图'},
					{fn:'fxclick',n:'分享'}				
				];				
			};
			this.userTped = unType;
			this.topBtns = btn;
			this.qurId = this.$route.query.id;
			this.getUserDetail();
		},		
		isMe(){
			if(!window.userInfo){
				return false;
			}
			return this.$route.query.id ==  window.userInfo.open_id;
		},
		showTopBk(){
			this.bdtjCom('设置背景图');		
			this.isUpbg=true;
		},
		closeTopBk(){
			this.isUpbg=false;
		},
		setSuss(val){
			this.userMessage.user_center_banner_pic = val;
			this.closeTopBk();
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
.userNavBoxXz{
    border: none;
    height: 75px;
    line-height: 80px;
}
.userNavBoxXz2{
	width: 100%;
	min-width: 1300px;
	height: 75px;
	background: #fff;
}
.userNavBoxXz .p_isTop{
	z-index: 9999;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
}

.userNavBoxXz2>a{
	display: inline-block;
	height: 100%;
	margin-right: 72px;
	font-size: 16px;
	color: #1E1E1E;

}
.userNavBoxXz2>a:hover{
	color: #FF5121;
}
.userNavBoxXz2>a:last-child{
	margin-right: 0;
}
.userNavBoxXz2>.router-link-active{
	position: relative;
	color: #FF5121;
	font-weight: bold;
}
.userNavBoxXz2>.router-link-active:after{
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
.csBoxNx1{
	min-height: 500px;
}
</style>
