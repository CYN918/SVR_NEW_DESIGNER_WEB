<template>
	<header class="header">
		<img class="header_1 pend" :src="imgPath+'new/header/logo.svg'" @click="jump">
		
		<div class="header_2">
			<a 
			v-for="(el,index) in topNData" 
			:key="index" 
			:class="['pend',ison==el.path?'router-link-active':'']"
			@click="goZP(el.path,el.n)"
			>{{el.n}}
			
			<img v-if="el.t=='NEW'" class="hed_new" :src="imgPath+'new/tools/02.svg'" />
			</a>
		</div>
		
		<div class="header_3">
			<span :class="['searcBox',searchType?'issearch':'']">
				<span @click="showsearch()" class="pdxf iconfont pend">
					<img class="head_top1" :src="imgPath+'svg/head/top1.svg'"/>
				</span>
				
				<el-input v-if="searchType" class="searcBox4"  @keyup.enter.native="keydown($event)" @blur="hind" ref="serll" v-model="searcCont" placeholder="请输入搜索内容"></el-input>
				<div v-if="searchType" class="searcBox5">
					<div v-if="!searcCont||searcCont.split(' ').join('').length == 0">
						<div class="searcBox5_3" v-if="data1.length>0">
							<div class="searcBox5_1">最近搜索</div>
							<div class="searcBox5_2" @click="gosearch(el)" v-for="(el,index) in data1">{{el}}</div>
						</div>
						<div v-if="data2.length>0">
							<div class="searcBox5_1">热门搜索</div>
							<div class="searcBox5_2" @click="gosearch(el)" v-for="(el,index) in data2">{{el.words}}</div>
						</div>
					</div>
					<div v-else>
						<div class="searcBox5_3 searcBox5_2xv" v-if="data1.length>0">							
							<div class="searcBox5_2 " @click="gosearch(el)" v-for="(el,index) in data1">{{el.work_name}}</div>
						</div>
						<div v-if="data2.length>0">
							<div class="searcBox5_1">创作者</div>
							<div class="searcBox5_2" @click="gouser(el.open_id)" v-for="(el,index) in data2"><img class="searcBox5_2imf" :src="mJs.Cavars(el.avatar)" alt="">{{el.username}}</div>
						</div>
					</div>
					
				</div>
				<img v-if="searchType" class="searcBox6 pend" :src="imgPath+'project/cj_00.svg'">
			</span>

			<span class="iconfont  messgeH1">
				<span class="pend" @click="showisXXNav">
					<img class="head_top2" :src="imgPath+'svg/head/top2.svg'"/>
				<div @click="showisXXNav" v-if="messgNum && messgNum.unread_total_num>0" :class="['messgeH2',messgNum.unread_total_num>9?'messgeH2x':'']">{{backXXnUM(messgNum.unread_total_num)}}</div></span>
				
				<div v-if="isXXNav" @click="hidisXXNav" class="messgeH3Boxf1"></div>
				<div v-if="isXXNav" class="messgeH3">
					<div class="messgeH3_1">
						<span @click="getNotice('notify')" :class="[messgNum.unread_notify_num>0?'onckf':'']">
						<img :class="navType=='notify'?'onds_01':''" :src="backnav('notify',1)"/></span>
						<span @click="getNotice('comment')" :class="[messgNum.unread_comment_num>0?'onckf':'']">
						<img :class="navType=='comment'?'onds_01':''" :src="backnav('comment',2)"/></span>
						<span @click="getNotice('chat')" :class="[messgNum.unread_chat_num>0?'onckf':'']">
						<img :class="navType=='chat'?'onds_01':''" :src="backnav('chat',3)"/></span></div>
					<div class="messgeH3_2">
						<div class="messgeH3_2_x1">
							<ul class="xxBox_1">
								<li v-for="(el,index) in mData" :key="index">
									<div @click="goMssg(index)">{{el.title}}</div>								
								</li>							
							</ul>
							
							<div v-if="mData.length==0" class="messgeH3_2_1"><img  src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/wxx.png" alt="">暂无新的消息</div>
						</div>
						
						
					</div>
					
				
					<div @click="goMssg()" class="messgeH3_3 pend">查看全部</div>
				</div>
				
			</span>

			<span class="iconfont pend" @click="goUpload">
				<img class="head_top3" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/head/top3.svg"/>
			</span>
			<span class="header_4" v-if="userMssge">
				<div @click="goUser('头像')"><img :src="mJs.Cavars(userMssge.avatar)"/></div>
				<div  class="userBpx">
					<a @click="goUser('昵称')">{{backnAM(userMssge.username)}}</a>
					<ul> 
						<a @click="goZP('/projectAll','我的项目')"><li><img class="svgImg2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/head/home_grxx_tk_icon_wdxm.svg" alt="" />我的项目</li></a>						
						<a @click="goZP('/myAll','我的创作')"><li><img class="svgImg2 svgImg2_1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/head/home_grxx_tk_icon_wdcz.svg" alt="" />我的创作</li></a>
						<a @click="goZP('/myDynamic','我的关注')"><li><img class="svgImg2 svgImg2_1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/head/home_grxx_tk_icon_wdgz.svg" alt="" />我的关注</li></a>
						<a @click="goZP('/profit','我的收益')"><li><img class="svgImg2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/head/home_grxx_tk_icon_sy.svg" alt="" />我的收益</li></a>
						<a @click="goZP('/setUser','账号设置')"><li><img class="svgImg2 svgImg2_2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/head/home_grxx_tk_icon_zhsz.svg" alt="" />账号设置</li></a>
						<a @click="showHb()"><li><img class="svgImg2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/head/home_grxx_tk_icon_tcdl.svg" alt="" />退出登录</li></a>
					</ul>
				</div>
			</span>	
			<span class="header_4" v-else>
				<a class="pend" @click="goZP('/login','登录')">登录</a><span>|</span><a class="pend" @click="goZP('/register','注册')">注册</a></span>				
		</div>
		<out ref="out"></out>
	</header>
</template>
<script>
import out from '../components/out';
export default {
	components:{out},
	name: 'home',	 
	data(){	
		return{
			userMssge:'',
			isshowd:'',
			
			searchType:false,
			searcCont:'',

			messgNum:{},
			messgType:0,
			messgMessGd0:'',
			messgMessGd1:'',
			messgMessGd2:'',
			mData:[],
			navType:'',
			isXXNav:false,
			data1:[],
			data2:[],
			sccy:0,
			isggr:'',
			ison:'/index',
			topNData:[
				{path:'/index',n:'首页'},
				{path:'/project',n:'项目'},
				{path:'/Work_i',n:'作品'},
				{path:'/activvity',n:'活动'},
				// {path:'/tolt',n:'去赚钱',t:'NEW'},
				
				
			]
		}		
	},
	mounted: function () {	
		this.initHead()
		
	}, 
	methods:{
		close(){
			this.isshowd= '';
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
		backXXnUM(n){
			if(n>999){
				return 999;
			}
			return n;
		},
		goMssg(on){
			if(!window.userInfo){
				this.$router.push({path:'/login'});	
				return
			}
			setTimeout(()=>{
				this.getMessgNumber();
			},500);
			if(on || on==0){				
				this.$router.push({path:this.navType,query:{id:this.mData[on].chat_id}})	
				return
			}			
			this.$router.push({path:this.navType})	
		},
		keydown(){
			this.hind();
			this.gosearch(this.searcCont);
		},
		gouser(id){
			this.$router.push({path: '/works',query:{id:id}})	
		},
		gosearch(name){
			this.bdtj('通用模块','顶部栏—输入后搜索','--');
			let na = name.words || name.work_name || name.username || name;
			let hotc = localStorage.getItem("scrllhot");
			let on = -1;
			let len = 0;
			if(hotc){
				hotc = 
				hotc = JSON.parse(hotc);
				on = hotc.indexOf(na);
				len = hotc.length;
			}else{
				hotc = [];
			}
			if(on!=-1){
				hotc.splice(on,1);			
				hotc.unshift(na);
			}
			if(on==-1){
				if(len==5){
					hotc.splice(on,1);
				}
				hotc.unshift(na);
			}
			localStorage.setItem('scrllhot',JSON.stringify(hotc));
			this.searcCont = '';
			this.$router.push({path:'/searchWorks',query:{cont:na}});
		},
		hind(){
			
			setTimeout(()=>{
				this.searchType=false;
				this.searcCont='';
			},200);
		},
		showsearch(){
			this.bdtj('通用模块','顶部栏点击_搜索','--');
			if(this.searchType==true){
				if(!this.searcCont){
					return
				}
				this.$router.push({path:'/searchWorks',query:{cont:this.searcCont}});
				return
			}
			this.searchType = true;
			setTimeout(()=>{
				this.$refs.serll.focus();
			},300);
			
		},
		backnav(on,on2){
			// https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img
			let str = 'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/xx_'+on2;
			if(this.navType!=on){
				str+=on2+'.svg';
			}else{
				str+='.svg';
			}
			return str;
		},
		showisXXNav(){
			this.bdtj('通用模块','顶部栏点击_消息','--');
			this.isXXNav = true;
			this.getNotice();
		},
		hidisXXNav(){
			this.isXXNav = false;

		},
        jump(){
			this.bdtj('通用模块','顶部栏-点击logo','--');
            this.$router.push({
                path:'/index'
            })
        },
		goZP(a,b){
			this.bdtj('通用模块','顶部栏点击_'+b,'--');
			this.$router.push({path: a})			
		},
		
		initHead(){	
		
			this.ison = '/'+this.$route.fullPath.split('/')[1];
			
			this.hidisXXNav();
			this.getMessgNumber();
			this.getHotWords();
			this.userMssge = '';
			
			
			let last = this.topNData[this.topNData.length-1].n;
			if(window.userInfo){
				this.userMssge = window.userInfo;	
				if(!window.userInfo.contributor_format_status && last!='供稿人'){
					this.topNData.push({path:'/tip',n:'供稿人'});
				}
				return
			}
			if(last!='供稿人'){
				this.topNData.push({path:'/tip',n:'供稿人'});
			}
			
		
			
		},
		goUpload(){
			if(!this.userMssge){this.$router.push({path:'/login'}); return}
			this.$router.push({path:'/upload'})			
		},
		goUser(a){
			this.bdtj('通用模块','顶部栏点击_'+a,'--');
			this.$router.push({path: '/works',query:{id:window.userInfo.open_id}})	
		},
		
		showHb(is){
			if(is==1){
				this.bdtj('通用模块','顶部栏点击_退出','--');
			}
			this.$refs.out.show();
			
		},
		
		getMessgNumber(){
			if(!window.userInfo){
				return
			}
			this.api.getCounter().then((da)=>{
				if(da=='error'){
					return
				}
				this.messgNum = da;
		
			})
		},
		getNotice(type){	
			if(!window.userInfo){
				return
			}
			this.navType = type?type:'notify';
			let pr = {
				access_token:window.userInfo.access_token,
				type:this.navType,
			};
			this.api.getNotice(pr).then((da)=>{
				if(da=='error'){return}

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
					if(da=='error'){
						return
					}
				})
				
			});
		},
		getHotWords(){
			this.checkLo({
				api:'getHotWords',
				pr:{},
				su:(da)=>{
					let hotc = localStorage.getItem("scrllhot");
					if(hotc){
						this.data1 = JSON.parse(hotc);
					}
					
					this.data2 = da;
				}
				
			})

		},
		Searchsug(n){
			let pr = {
				query:n
			};
			this.api.Searchsug(pr).then((da)=>{
				if(da=='error'){
					return
				}
				if(!this.searcCont||this.searcCont.split(" ").join("").length == 0){
					return
				}
				this.data1 = da.works;
				this.data2 = da.user;
		
			});
		}
	},
	watch: {	
		'$route': function() {
			this.initHead();
		},
		'searcCont':function(el,old){			
			if(el==old){
				return
			}
			this.data1 = [];
			this.data2 = [];
			if(!this.searcCont||this.searcCont.split(" ").join("").length == 0){
				this.getHotWords();
			}
			
			this.Searchsug(this.searcCont);
		},
		
	},
	
	
}
</script>

<style>
.header{
	position: absolute;
	top: 0;
	left: 0;
	z-index: 9999;
	width: 100%;
    height: 60px;
    background: #fff;
    -webkit-box-shadow:0px 2px 6px 0px rgba(0,0,0,0.1);
	box-shadow:0px 2px 6px 0px rgba(0,0,0,0.1);
}
.header_1{
	position: absolute;
	top: 16px;
	left: 100px;   
    width: 134px;
}
.header_2{
	text-align: left;
	margin-left: 310px;
}
.header_2>a{
	position: relative;
	display: inline-block;
	margin: 0 42.5px;
	font-size: 14px;
	color: #666;
	line-height: 60px;
}
.header_2>a.router-link-active{
    color: #33B3FF;
}
.hed_new{
	position: absolute;
    bottom: 38px;
    right: -14px;
    width: 20px;
}

.header_3{
	position: absolute;
	right: 0;
	top: 0;	
	color: #666;
	margin-right: 100px;
}
.header_3>span{
	display: inline-block;
	line-height: 60px;
	margin-right: 31px;
}

@media screen and (max-width: 1440px) {
    .header_1 {
        left: 60px !important;; 
    }
	.header_2{
		margin-left: 274px !important;;
	}
	.header_2>a{
		margin: 0 30px !important;;
	}
	.header_3{
		margin-right: 60px !important;
	}
}
.header_4{
    margin-right: 0 !important;
	cursor: pointer;
}
.header_4>a{
	color: #666;
	
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
	margin-right: 0;
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
    height: 310px;
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
	background: #F2F2F2;
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
	display: inline-block;
    width: 20px;
	vertical-align: bottom;
	margin-right: 10px;
	font-size: 21px;
}

.userBpx>ul>a>li:hover{
	background: #F2F2F2;
	cursor: pointer;
}
.userBpx>ul>a:last-child>li{
	border-top: 1px solid #F2F2F2;
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
    top: -32px;
    right: -32px;
    width: 32px;
    height: 32px;
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

.searcBox{
	position: relative;
	z-index: 9;
	-webkit-transition: -webkit-transform .3s;
	transition: transform .3s;
}
.issearch{
	-webkit-transform: translateX(-235px);
	transform: translateX(-235px);
}

.searcBox3{
	position: absolute;
    top: 20px;
    left: 0;
    width: 20px;
    height: 35%;
}
.searcBox4{
	opacity: 0;
    position: absolute;
    background: none;
    width: 240px;
    border: none;
    top: 0;
    left: 12px;
    -webkit-animation: xs .5s .3s forwards;
    animation: xs .5s .3s forwards;
}
.searcBox4 .el-input__inner{
	background: none;
	border: none;
	color: #666;
}
.searcBox5{
	opacity: 0;
    position: absolute;
	max-height: 340px;
    overflow: hidden;
    overflow-y: auto;
    top: 55px;
    left: 0;
	background: #FFFFFF;
	box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
    width: 240px;
    z-index: 1001;

    -webkit-animation: xs .5s .3s forwards;
    animation: xs .5s .3s forwards;
}
@-webkit-keyframes xs{
	from{opacity: 0;}
	to{opacity: 1;}
}
@keyframes xs{
	from{opacity: 0;}
	to{opacity: 1;}
}
.searcBox5_1{
	font-size: 12px;
	line-height: 17px;
	color: #999999;

	margin:8px 0 18px 24px;
	text-align: left;
}
.searcBox5_2{
    font-size: 14px;
    color: #333333;
    line-height: 40px;
    text-align: left;
	padding-left: 24px;
    box-sizing: border-box;
	cursor: pointer;
    width: 220px;
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;	
}
.searcBox5_2:hover{
	background: #F2F2F2;
}
.searcBox5_3{
	margin-bottom: 7px;
}
.messgeH1{
	position: relative;
}
.messgeH2{
	display: block;
	position: absolute;
	top: 7px;
	left: 7px;
	background: #F4523B;
	min-width: 18px;
	height: 18px;
	line-height: 18px;
	font-size: 12px;
	color: #fff;
	letter-spacing: 0;
	text-align: center;
	
	border-radius: 9px;
}
.messgeH3{
    position: absolute;
    top: 60px;
    left: -245px;
    background: #FFFFFF;
    -webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    border-radius: 5px;
    width: 269px;
    height: 320px;
	z-index: 999;
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
	margin: 6px auto;
	width: 19px;
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
	margin: 30px auto 0;
}
.messgeH3_3{
	background: #FFFFFF;
	box-shadow: 2px 0 4px 0 rgba(0,0,0,0.05);
	border-radius:0 0 5px 5px;
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
	z-index: 997;

}
.searcBox5_2imf{
	display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: top;
	margin-top: 10px;
    margin-right: 4px;
    border-radius: 50%;
}
.searcBox5_2xv>div:first-child{
	margin-top: 8px;
}
.pdxf{
	display: inline-block;
}
.svgImg2{
	display: inline-block;
	vertical-align: top;
    margin-right: 10px;
    margin-top: 10px;
    width: 16px;
}
.svgImg2_1{
	margin-top: 12px;
	width: 17px;
}
.svgImg2_2{
	margin-top: 12px;
	width: 18px;
}
.ts_svg_img{
	margin-top: 11px;
}
.messgeH2x{
	padding:0 5px;
}
.head_top1{
	width: 20px;
  	margin-top: 20px;
}
.head_top2{
	width: 16px;
    margin-top: 20px;
}
.head_top3{
	width: 24px;
    margin-top: 20px;
}
.searcBox6{
	opacity: 0;
	position: absolute;
	top: 24px;
	right: -218px;
	width: 10px;
	
	-webkit-animation: xs .5s .3s forwards;
	animation: xs .5s .3s forwards;
}
</style>
