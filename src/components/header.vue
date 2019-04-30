<template>
	<header class="header">
		<img class="header_1 pend" src="/imge/log.png" @click="jump">
		<span class="header_2">
			<router-link class="pend" to="/index">首页</router-link>
			<router-link class="last pend" to="/activvity">活动</router-link>
		</span>
		<div class="header_3">
			<span class="iconfont pend">&#xe609;</span>
			<span class="iconfont pend messgeH1"><span @click="showisXXNav">&#xe65b;</span>
				<div @click="showisXXNav" v-if="messgNum.unread_total_num>0" class="messgeH2">{{messgNum.unread_total_num}}</div>
				<div v-if="isXXNav" @click="hidisXXNav" class="messgeH3Boxf1"></div>
				<div v-if="isXXNav" class="messgeH3">
					<div class="messgeH3_1">
						<span @click="getNotice('notify')" :class="[messgNum.unread_notify_num>0?'onckf':'']"><img :src="backnav('notify',1)" alt=""></span>
						<span @click="getNotice('comment')" :class="[messgNum.unread_comment_num>0?'onckf':'']"><img :src="backnav('comment',2)" alt=""></span>
						<span @click="getNotice('chat')" :class="[messgNum.unread_chat_num>0?'onckf':'']"><img :src="backnav('chat',3)" alt=""></span></div>
					<div class="messgeH3_2">
						<div class="messgeH3_2_x1">
							<ul class="xxBox_1">
								<li v-for="(el,index) in mData" :key="index">
									<div>{{el.title}}</div>								
								</li>							
							</ul>
							
							<div v-if="mData.length==0" class="messgeH3_2_1"><img  src="/imge/wxx.png" alt="">暂无新的消息</div>
						</div>
						
						
					</div>
					
				
					<div class="messgeH3_3">查看全部</div>
				</div>
				
			</span>
			<span class="iconfont pend" @click="goUpload">&#xe61e;</span>
			<span class="header_4" v-if="userMssge">
				<div @click="goUser"><img :src="userMssge.avatar" alt=""></div>
				<div  class="userBpx">
					<a @click="goUser">{{userMssge.username.substring(0,9)}}</a>
					<ul> 
						<router-link  to="/myAll"><li><span class="iconfont">&#xe620;</span>我的创作</li></router-link>
						<router-link  to="/myDynamic"><li><span class="iconfont">&#xe624;</span>我的关注</li></router-link>
						<router-link  to="/activvity"><li><span class="iconfont">&#xe62d;</span>我的收益</li></router-link>
						<router-link  to="/setUser"><li><span class="iconfont">&#xe63d;</span>账号设置</li></router-link>
						<a @click="showHb(true)"><li><span class="iconfont">&#xe622;</span>退出登录</li></a>
					</ul>
				</div>
			</span>	
			<span class="header_4" v-else><router-link class="pend" to="/login">登录</router-link><span>|</span><router-link class="pend" to="/register">注册</router-link></span>			
					
					
		</div>
		<div v-show="isshowd" class="loginoutBox">
			<div class="loginoutBox1">
				<img @click="showHb(false)" class="loginoutBox2" src="/imge/cj_00.png">
				<div class="loginoutBox3">确定退出登录?</div>
				<div class="loginoutBox4"><span @click="showHb(false)">取消</span><span @click="logout()">确定</span></div>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: 'home',	 
	data(){	
		return{
			userMssge:'',
			isshowd:false,
			messgNum:{},
			messgType:0,
			messgMessGd0:'',
			messgMessGd1:'',
			messgMessGd2:'',
			mData:[],
			navType:'',
			isXXNav:false,
		}		
	},
	mounted: function () {	
		this.initHead()
		
	}, 
	methods:{
		backnav(on,on2){
			let str = '/imge/xx_'+on2;
			if(this.navType!=on){
				str+=on2;
			}
			return str+'.png';
		},
		showisXXNav(){
			this.isXXNav = true;
			this.getNotice();
		},
		hidisXXNav(){
			this.isXXNav = false;
		},
        jump(){
            this.$router.push({
                path:'/index'
            })
        },
		initHead(){	
			this.getMessgNumber();
			this.userMssge = '';
			if(window.userInfo){
				this.userMssge = window.userInfo;			
			}
		},
		goUpload(){
			if(!this.userMssge){this.$router.push({path:'/login'}); return}
			this.$router.push({path:'/upload'})			
		},
		goUser(){
			this.$router.push({path: '/works',query:{id:window.userInfo.open_id}})	
		},
		
		logout(){
			let p = {
				access_token:this.userMssge.access_token
			};
			this.api.logout(p).then((da)=>{
				if(!da){
					return
				}
				this.showHb(false);
				localStorage.setItem('pass','');			
				localStorage.setItem('userT','');
				window.userInfo='';
				window.passIn = '';
				this.$router.push({path: '/login'})	
			});
		},
		showHb(is){
			this.isshowd = is;
		},
		
		getMessgNumber(){
			let pr = {
				access_token:window.userInfo.access_token
			};
			this.api.getCounter(pr).then((da)=>{
				if(!da){
					return
				}
				this.messgNum = da;
		
			})
		},
		getNotice(type){	
			this.navType = type?type:'notify';
			let pr = {
				access_token:window.userInfo.access_token,
				type:this.navType,
			};
			this.api.getNotice(pr).then((da)=>{
				if(!da){return}

				this.mData= da;
				this.getMessgNumber();
				if(this.mData.length==0){
					return
				}
				if(this.navType!='notify'){
					return
				}
				let ids = '';
				for(let i=0,n=this.mData.length;i<n;i++){
					ids+=','+this.mData[i].op_open_id;
				}
				ids = ids.slice(1);
				let op = {
					access_token:window.userInfo.access_token,
					type:'notify',
					read_ids:ids,
				};
				this.api.Messageread(op).then((da)=>{
					if(!da){
						return
					}
				})
				
			});
		},
	},
	watch: {	
		'$route': function() {
			this.hidisXXNav();
			this.initHead();
			this.getMessgNumber();
		}
	},
	
	
	
}
</script>

<style>
.header{
	width: 100%;
	display: flex;
    height: 60px;
    background: #323232;
}
.header_1{
    margin: 13px 97px 0 60px;
    width: 135px; 
	height: 36px;
}
.header>span{
	flex: 1;
}
.header>span>a{
	position: relative;
	display: inline-block;
	font-size: 16px;
	color: #FFFFFF;
	line-height: 60px;
}
.header .last{
	margin-left: 100px;
}
.header>span>a.router-link-active:after{
    content: "";
    position: absolute;
    bottom: 12px;
    left: 5px;
    width: 76%;
    height: 2px;
    background: #FCFCFC;
}
.header_3{
	width: 234px;
	color: #fff;
	margin-right: 100px;
}
.header_3>span{
	line-height: 60px;
	margin-right: 31px;
}
.header_4{
    margin-right: 0 !important;
	cursor: pointer;
}
.header_4>a{
	color: #fff;
	
}
.header_4>span{
	margin: 0 10px;
}
.header_4>div{
	display: inline-block;
	vertical-align: middle;
	width: 32px;
	height: 32px;
	overflow: hidden;
	margin-right: 12px;
	overflow: hidden;
}
.header_4>div>img{
	display: block;
	width: 100%;
	border-radius: 50%;
}
.header_4{
	position: relative;
	display: inline-block;
}
.header_4>.userBpx{
	display: none;
	position: absolute;
    bottom: 0;
    right: 0;
    background: #FFFFFF;
    -webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    border-radius: 5px;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    width: 170px;
    height: 264px;
    z-index: 9999;
    margin-right: 0;
}
.header_4:hover>.userBpx{
	display: block;
}
.userBpx>a{
	display: block;
    font-size: 14px;
    color: #1E1E1E;
	font-weight: bold;
    border-bottom: 1px solid #E6E6E6;
    width: 170px;
    text-align: left;
	padding-left: 25px;
    line-height: 53px;
	margin: 0;
	/*padding: 0;*/
}
.userBpx>a:hover{
	background: #E6E6E6;
	cursor: pointer;
}
.userBpx>ul>a>li{
	font-size: 14px;
	color: #1E1E1E;
	text-align: left;
	padding-left: 25px;
	line-height: 40px;
}
.userBpx>ul>a:first-child>li{
	margin-top: 4px;
}
.userBpx>ul>a:last-child>li>span{
	font-size: 17px;
}
.userBpx>ul>a:nth-child(2)>li>span{
	font-size: 17px;
}
.userBpx>ul>a>li>span{
	vertical-align: bottom;
	margin-right: 10px;
	font-size: 21px;
}

.userBpx>ul>a>li:hover{
	background: #E6E6E6;
	cursor: pointer;
}
.userBpx>ul>a:last-child>li{
	border-top: 1px solid #E6E6E6;
}
.loginoutBox{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.4);
	z-index: 9999;
}
.loginoutBox1{
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	margin:  auto;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 420px;
	height: 143px;

}
.loginoutBox2{
	position: absolute;
    top: -45px;
    right: -45px;
    width: 44px;
    height: 44px;
    cursor: pointer;
}
.loginoutBox3{
	font-size: 14px;
	color: #1D1E1F;
	margin: 26px auto 27px;
}
.loginoutBox4>span{
	display: inline-block;
	border: 1px solid #999999;
	border-radius: 5px;
	width: 100px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	box-sizing: border-box;
	font-size: 14px;
	color: #333333;
	cursor: pointer;
}
.loginoutBox4>span:hover{
	opacity: .7;
}
.loginoutBox4>span:last-child{
	background: #333333;
	border-color: #333;
	color: #fff;
	margin-left: 30px;
}
.messgeH1{
	position: relative;
}
.messgeH2{
	display: block;
	position: absolute;
	top: -7px;
	left: 7px;
	background: #F4523B;
	width: 18px;
	height: 18px;
	line-height: 18px;
	font-size: 12px;
	color: #FFFFFF;
	letter-spacing: 0;
	text-align: center;
	
	border-radius: 50%;
}
.messgeH3{
    position: absolute;
    top: 39px;
    left: -245px;
    background: #FFFFFF;
    -webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    border-radius: 5px;
    width: 269px;
    height: 320px;
	z-index: 99;
}
.messgeH3_1{
	background: #FFFFFF;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
	border-radius: 5px 5px 0 0;
	line-height: 60px;
	width: 100%;
	height: 60px;
}
.messgeH3_1>span.onckf:before{
	content: "";
	position: absolute;
	right: 30px;
	top: 0;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: #F4523B;
}
.messgeH3_1>span{
	position: relative;
	margin-top: 16px;
	display: inline-block;
	width: 88px;
	height: 28px;
	border-right:1px solid rgba(0, 0, 0, 0.05);
}
.messgeH3_1>span:last-child{
	border: none;
}
.messgeH3_1>span>img{
	display: block;
	margin: 0 auto;
	width: 28px;
}
.messgeH3_2{
	width: 100%;
	height: 210px;
	overflow: hidden;
	overflow-y: auto;
}
.messgeH3_2_1{
	position: absolute;
	top: 50%;
	left: 50%;
	font-size: 14px;
	color: #999999;
	text-align: center;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
}
.messgeH3_2_1>img{
	display: block;
	width: 100px;
	margin-bottom: 13px;
}
.messgeH3_3{
	background: #FFFFFF;
	box-shadow: 2px 0 4px 0 rgba(0,0,0,0.05);
	border-radius: 5px 5px 0 0;
	font-size: 14px;
	color: #1E1E1E;
	line-height: 50px;
	text-align: center;
	width: 100%;
	height: 50px;
}
.xxBox_1>li{
	position: relative;
	border: 1px solid #E6E6E6;
	width: 100%;
	height: 73px;
	font-size: 14px;
	color: #1E1E1E;
}
.xxBox_1>li>div{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	width: 211px;
	line-height: 18px;
    text-align: left;
}
.xxBox_1>li:last-child{
	border: none;
}
.messgeH3_2_x1{
	overflow: hidden;
	overflow-y: auto;
}
.messgeH3Boxf1{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 98;
}
</style>
