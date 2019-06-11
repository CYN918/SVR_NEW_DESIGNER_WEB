<template>
	<div>		
		<div class="setUserBox messgdo">
			<div class="setUserBoxs">
				<div class="setUserBoxs_nav">
					<div  v-for="(el,index) in navDta" :key="index" @click="setNavd(index)" :class="[index==navdOn?'action':'']"><span class="tjsj_2">{{el.n}}</span><span v-if="el.l" :class="['tjsj_1',el.l>9?'tjsj_1':'']">{{backTj(el.l)}}</span></div>
					
				</div>
				<div class="navDwzc">
					<div :class="['setUserBoxs_nav',topTyped?'fixdon':'']">
						<div  v-for="(el,index) in navDta" :key="index" @click="setNavd(index)" :class="[index==navdOn?'action':'']"><span class="tjsj_2">{{el.n}}</span><span v-if="el.l" :class="['tjsj_1',el.l>9?'tjsj_1':'']">{{backTj(el.l)}}</span></div>
					</div>
				</div>
				
				<div class="sxBodx1">
					<div class="sxBodx2">
						<div class="sxBodx2_1">
							<span @click="checkNav(0)" :class="['sxBodx2_1_n1',sxType==0?'sxBodx2_1_n1x':'']">最近联系</span>
							<span @click="checkNav(1)" :class="['sxBodx2_1_n1',sxType==1?'sxBodx2_1_n1x':'']">我关注的</span>
						</div>
						<div class="sxBodx2_2" ref="listDom">
							<ul class="sxBodx2_2x">
								<div  v-for="(el,index) in listData" :class="index==messgOn?'oncheckx_1':''">
									<li v-if="index==0 || (index>0 && zdOpen_id!=el.user_info.open_id)">
									<img @click="goUser(el.user_info.open_id)" :src="el.user_info.avatar" alt="">
									<div @click="cheond(index)">
										<div class="sxBodx2_2x_1">{{el.user_info.username}}<span class="sxBodx2_2x_2">{{backtime(el.last_post_time)}}</span></div>
										<div class="sxBodx2_2x_3">{{el.last_message?el.last_message:el.user_info.vocation +' | '+el.user_info.city}}</div>
									</div>
									</li>
								</div>
								<noData v-if="listData.length==0"></noData>								
							</ul>
							
						</div>
					
					</div>					
					<div class="sxBodx3">				
						<div class="sxBodx2_1">
							<div class="sxBodx3_1_1"  v-if="listData.length>0">
								{{listData[messgOn]?listData[messgOn].user_info.username:''}}
								<span class="sxBodx3_1_2">与你的对话</span>
								<span class="sxBodx3_1_3 iconfont">&#xe73c;
									<div class="sxBodx3_1_3xzk1">
										<div class="sxBodx3_1_3xzk">
											<div @click="isRepfn">举报</div>
											<div v-if="sxType==0" @click="delChat">删除对话</div>
										</div>
									</div>
								</span>
							</div>
							<div v-if="isxsdh==true" class="zdxs"></div>
						</div>
						<div class="sxBodx3_2" id="meegBox" ref="messgDom">							
							<ul v-if="listData.length>0">
								<div v-for="(el,index) in messGlist" :key="index">
									<li v-if="el.isshowtime"><div class="sxBodx3_2x_1">{{backtimed(el.create_time)}}</div></li>
									<li>
										<div v-if="checkisme(el.open_id)==false" class="jyb_x2">
										<div class="sxBodx3_2xbox sxBodx3_2x_2">
											<img @click="goUser(el.user_info.open_id)" :src="el.user_info.avatar" alt="">
											<div class="sxBodx3_2x_3b sxBodx3_2x_3">{{el.content}}</div>
										</div>
										</div>
										
										<div v-else class="jyb_x1">
										<div class="sxBodx3_2xbox sxBodx3_2x_4">
											
											<div class="sxBodx3_2x_3b sxBodx3_2x_5">{{el.content}}</div>
											<img @click="goUser(el.user_info.open_id)" :src="el.user_info.avatar" alt="">
										</div>
										</div>
									</li>
								</div>
								
							</ul>
							<noData v-if="listData.length==0"></noData>
						</div>
						<div v-if="listData.length>0" class="sxBodx2_3 sxBodx2_3xx">
							<div class="hfBox xxbox_c">
								<Input :keyup="keydown" class="userBoxd2" v-model="postMessg" :oType="'max'" :max="200" :type="'text'"  ref="tageds1"></Input>	
								<span :class="chekcont()==true?'iscsbtn':''" @click="addChatMessage()">发送</span>
							</div>
						</div>
					</div>					
				</div>
			</div>
			
		</div>
		<RPT ref="report"></RPT>
	</div>
</template>

<script>
import Input from '../../components/input'
import {Message} from 'element-ui'
import RPT from '../../components/report'
import noData from '../../components/nodata'
export default {
	components:{Input,RPT,noData},
	name: 'chat',
	data(){
		return {
			isNoData:'',
			isNoData2:'',
			jbopen_id:'',
			jblink_id:'',
			hfnc:'',
			messgNum:{},
			navDta:[
				{n:'通知',l:''},
				{n:'评论/留言',l:''},
				{n:'私信',l:''},	
			],
			topTyped:false,
			navdOn:2,
			limit:10,
			total:0,
			page:1,
			onType:'notify',
			listData:[],
			addLink:0,
			plType:0,
			pl2:'',
			messgOn:0,
			messGlimit:6,
			messGlist:[],
			postMessg:'',
			getAjxType1:0,
			getAjxType2:0,
			getAjxType3:0,
			sxType:0,
			chatType:'chat',
			onTypedf:0,
			ondfgData:'',
			chatid:'',
			chatTYD:0,
			urlOpen:0,
			deletArr:[],
			deletType:0,
			onTimed:'',
			isxsdh:false,
			zdOpen_id:'',
			isNomSSG:0,
			isNouSSG:0,
		}
	},
	mounted: function () {			
		this.init();
		
	}, 
	methods: {
		backTj(n){
			return  n>999?999:n;
		},
		init(){
			if(!window.userInfo){
				this.$router.push({path:'/login'});
			}
			this.addEvent2(this.$refs.listDom);
			this.addEvent1(this.$refs.messgDom);

			this.getUserList();			
		},
		getUserList(){
			if(!window.userInfo){
				this.$router.push({path:'/login'});
				return
			}
			let pr = {
				access_token:window.userInfo.access_token,
				type:this.chatType,
				page:this.page,
				limit:this.limit
			};
			this.getAjxType1=1;
			this.api.getMessgList(pr).then((da)=>{
				this.getAjxType1=0;
				if(da=='error'){return}
				if(this.listData.length>0){
					if(da.data.length==0){
						this.isNouSSG =1;
						return;
					}
					this.listData = this.listData.concat(da.data);
					return;
				}				
				if(this.$route.query && this.$route.query.open_id){				
					this.zdOpen_id = this.$route.query.open_id;
					da.data.unshift({user_info:this.$route.query});
				}		
				this.listData = da.data;
				this.getMessageList();
			}).catch(()=>{
				this.getAjxType1=0;
			});
		},
		getMessageList(){
			if(!window.userInfo){
				this.$router.push({path:'/login'});
				return
			}				
			let pr = {
				access_token:window.userInfo.access_token,
				time:Date.parse(new Date())/1000,
				limit:this.messGlimit,
			};
			if(this.messGlist[0]){
				pr.time = this.messGlist[0].create_time;
			}
			if(this.listData[this.messgOn].chat_id){
				pr.chat_id = this.listData[this.messgOn].chat_id;
			}
			if(this.listData[this.messgOn].user_info.open_id){
				pr.to_open_id = this.listData[this.messgOn].user_info.open_id;
			}
			this.getAjxType1=0;
			this.api.getMessageList(pr).then((da)=>{
				this.getAjxType2=0;
				if(da=='error'){return}
				this.pushCk();				
				let lend = da.length;
				if(lend==0){
					this.isNomSSG=1;
					return;
				}
				
				for(let i=0;i<lend;i++){
					if(i==0){
						if(lend == 1){
							da[i].isshowtime = 1;
							continue
						}
						if(da[0].create_time-da[1].create_time>5*60){
							da[i].isshowtime = 1;
							continue
						}
						continue
					}						
					if(da[i-1].create_time-da[i].create_time>5*60){
						da[i].isshowtime = 1;
						continue
					}					
				}
				if(da[lend-1] && !da[lend-1].isshowtime){
					da[lend-1].isshowtime=1;
				}
				da = da.reverse();				
				if(this.messGlist.length>0){
					this.messGlist = da.concat(this.messGlist);
					return
				}
				this.messGlist = da;
			}).catch(()=>{
				this.getAjxType2=0;
			});			
		},
		keydown(){
			this.addChatMessage();
		},
		chekcont(){
			return this.zkMyFun.checkWz(this.postMessg);
		},
		backtimed(timed){
			let tid = new Date(timed*1000);
		
			let str = '';
			let hos = tid.getHours();
			if(hos<10){
				hos = '0'+hos;
			}
			let fz = tid.getMinutes();
			if(fz<10){
				fz = '0'+fz;
			}
			str += tid.getFullYear();
			let yf = tid.getMonth()+1;
			if(yf<10){
				yf = '0'+yf;
			}
			str +='-'+yf;
			let day = tid.getDate();
			if(day<10){
				day = '0'+day;
			}
			str +='-'+day;
			return str+' '+hos+':'+fz;
		},
		isRepfn(){
			if(!this.listData[this.messgOn] || (!this.listData[this.messgOn].chat_id && !this.listData[this.messgOn].user_info.open_id)){
				Message({message: '数据错误该信息无法举报'});
				return
			}
			this.$refs.report.showReport(this.listData[this.messgOn].user_info.open_id,this.listData[this.messgOn].chat_id,'message');
		},
		delChat(){	
			this.isxsdh=true;
			setTimeout(()=>{
				this.isxsdh=false;
			},200);
			if(this.deletType==1){
				Message({message: '正在删除请稍后'});
				return
			}
			
			let pr = {
				access_token:window.userInfo.access_token,
				
			};	
		
			if(!this.listData[this.messgOn].chat_id){
				this.listData.splice(this.messgOn,1);
				Message({message: '删除成功'});
//				this.$router.push({path:'/chat'});
	
				this.messGlist = [];
		
			}			
			this.deletType==1;			
			pr.chat_id=this.listData[this.messgOn].chat_id;
			this.api.delChat(pr).then((da)=>{
				this.deletType=0;
				if(da=='error'){return}
				this.messGlist = [];
				Message({message: '删除成功'});
				this.messgOn=0;				
				this.getMessgList();
			}).catch(()=>{
				this.deletType=0;
			});
		},
		goUser(id){
			this.$router.push({path: '/works',query:{id:id}})	
		},
		cheond(on){
			if(this.messgOn==on){
				return
			}
			this.isNomSSG = 0; 
			this.messgOn = on;
			this.messgPage
			this.messGlist = [];
			this.getMessageList();
		},
		checkNav(on){
			if(this.sxType==on){
				return
			}
			this.messGlist = [];			
			this.listData = [];
			this.chatType = 'chat';
			if(on==1){
				this.chatType = 'chat_follow';
			}
			this.messgOn = 0;
			this.page=1;
			this.ondfgData = '';
			this.sxType=on;
			this.isNouSSG =0;
			this.getUserList();			
		},
		addChatMessage(){
			if(!window.userInfo){
				this.$router.push({path:'/login'});
				return
			}
			if(!this.listData[this.messgOn]){
				return
			}
			if(this.zkMyFun.checkWz(this.postMessg)==false){
				Message({message: '内容不能为空'});
				return
			}
			if(this.getAjxType3==1){
				Message({message: '正在发送'});
				return
			}
			
			let pr = {
				access_token:window.userInfo.access_token,
				chat_type:'private',
				content_type:'text',
				content:this.postMessg,
				to_id:this.listData[this.messgOn].user_info.open_id,
			};
			let mesd = this.postMessg;
			this.getAjxType3 = 1;
			this.api.addChatMessage(pr).then((da)=>{
				this.getAjxType3 = 0;
				if(da=='error'){return}
				this.$refs.tageds1.setData('');
				let pdata = {
					content:mesd,
					create_time: Date.parse(new Date())/1000,
					is_del:0,
					open_id:window.userInfo.open_id,
					user_info:{
						avatar:window.userInfo.avatar,
						open_id:window.userInfo.open_id,
					}
				};
				let mslen = this.messGlist.length;
			
				if(mslen>0 && pdata.create_time-this.messGlist[mslen-1].create_time>5*60){
					pdata.isshowtime = 1;
				}
				if(mslen==0){
					pdata.isshowtime=1;
				}
				this.messGlist.push(pdata);
				
				this.setMssageSc(this.$refs.messgDom);			
					
				
			
			
			}).catch(()=>{
				this.getAjxType3=0;
			});
		},
		setMssageSc(obj){
			setTimeout(()=>{
				obj.scrollTop = obj.scrollHeight;
			},100);
		},
		checkisme(id){

			return id==window.userInfo.open_id;
		},
		setNavd(on){
			let urld = ['notify','comment','chat'];
			this.$router.push({path: urld[on]});	
		},
		
		backtime(t){	
			if(!t){
				return '';
			}
			return window.getTimes(t*1000)
		},
		addEvent2(obj){				
			obj.onscroll = ()=>{
				if(this.isNouSSG ==1){
					return;
				}
				if(this.getAjxType1==1){
					return
				}
				let t = obj.scrollTop||obj.scrollTop;
				let b = obj.scrollHeight-580;
				if(t!=b){return}
				this.page++;
				this.getUserList();
			}			
		},
		addEvent1(obj){				
			obj.scrollTop = obj.scrollHeight-540;			
			setTimeout(()=>{
				obj.scrollTop = obj.scrollHeight-540;
			},300);						
			obj.onscroll = ()=>{
				if(this.isNomSSG==1){
					return;
				}
				if(this.getAjxType2==1){return}
				let t = obj.scrollTop||obj.scrollTop;
				if(t!=0){return}
				this.getMessageList();
			}
		
			
		},
		pushCk(){
			if(!window.userInfo){
				this.$router.push({path:'/login'})
			}
			let op = {
				access_token:window.userInfo.access_token,
				type:'chat',
			};
			if(this.listData[this.messgOn].chat_id){
				op.chat_id = this.listData[this.messgOn].chat_id;
				
			} 
			if(this.listData[this.messgOn].user_info.open_id){
				op.to_open_id = this.listData[this.messgOn].user_info.open_id;
			}			
			this.api.Messageread(op).then((da)=>{
				if(da=='error'){return}
				this.getMessgNumber();
			})
		},
		getMessgNumber(){
			if(!window.userInfo){
				this.$router.push({path:'/login'})
			}
			let pr = {
				access_token:window.userInfo.access_token
			};
			this.api.getCounter(pr).then((da)=>{
				if(da=='error'){
					return
				}
				this.messgNum = da;
				this.navDta[0].l = 0;
				this.navDta[1].l = this.messgNum.unread_comment_num;
				this.navDta[2].l = this.messgNum.unread_chat_num;		
			})
		},
	


	}
}
</script>

<style>
.sxBodx1{
	display: inline-block;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 970px;
	height: 700px;
}

.sxBodx2{
	position: relative;
	display: inline-block;
	vertical-align: top;
	height: 100%;
	width: 309px;
	border-right:2px solid rgba(151, 151, 151, .1);
}
.sxBodx2_1{
	border-bottom: 2px solid rgba(151, 151, 151, .1);
	height: 59px;
	width: 100%;
}

.sxBodx3{
	position: relative;
	display: inline-block;
	vertical-align: top;
	width: 659px;
	height: 100%;
}
.sxBodx2_3{
	position: absolute;
    bottom: 0;
    left: 0;
    background: #FFFFFF;
    -webkit-box-shadow: 0 -1px 0px 0 rgba(0,0,0,0.05);
    box-shadow: 0 -1px 0px 0 rgba(0,0,0,0.05);
 
    width: 100%;
    height: 60px;
}
.sxBodx2_1_n1{
	position: relative;
	cursor: pointer;
	display: inline-block;
	width: 50%;
	height: 100%;
	text-align: center;
	font-size: 16px;
	color: #1E1E1E;
	line-height: 60px;
}
.sxBodx2_1_n1x{
	color: #FF5121;
}
.sxBodx2_1_n1x:after{
	position: absolute;
	content: "";
	bottom: 0;
	left: 50%;
	-webkit-transform: translate(-50%,50%);
	transform: translate(-50%,50%);
	width: 48px;
	height: 2px;
	background: #FF5121;
}
.sxBodx3_1_1{
	line-height: 60px;
	text-align: center;
	font-size: 14px;
	color: #333333;
}
.sxBodx3_1_2{

	color: #999999;
	margin-left: 8px;
}
.sxBodx2_2{
	overflow: hidden;
	overflow-y: auto;
	width:100%;
	height:640px;
	
}
.sxBodx2_2x>div>li{
	padding: 21px 30px 0;
	display: block;
	width: 100%;
	height: 69px;
	border-bottom: 2px solid rgba(151, 151, 151, .1);
}
.sxBodx2_2x>div>li>img{
	cursor: pointer;
	display: inline-block;
	vertical-align: top;
	border-radius: 50%;
	width: 32px;
	height: 32px;
}
.sxBodx2_2x>div>li>div{
	cursor: pointer;
	display: inline-block;
	margin-left: 10px;
	width: 207px;
	min-height: 57px;
}
.sxBodx2_2x_1{
	font-size: 14px;
	line-height: 20px;
	color: #1E1E1E;
	margin-bottom: 5px;
	width: 136px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.sxBodx2_2x_2{
	float: right;
	font-size: 12px;
	color: #999999;
}
.sxBodx2_2x_3{
	font-size: 14px;
	color: #666666;
	line-height: 24px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
    width: 100%;

}
.sxBodx3_2{
	overflow: hidden;
    overflow-y: auto;
    width: 100%;
    height: 540px;
}
.sxBodx3_2x_1{
	display: block;
	text-align: center;
	font-size: 14px;
	color: #333333;
	margin: 25px auto;
}
.sxBodx3_2 li{
	margin-bottom: 40px;
}
.sxBodx3_2xbox>img{
	display: inline-block;
	vertical-align: top;
	width: 48px;
	height: 48px;
	border-radius: 50%;
}
.sxBodx3_2x_3b{
	position: relative;
	display: inline-block;
	font-size: 14px;
	padding:15px 30px;
	background: #F4F4F4;
	border-radius: 5px;
	max-width: 344px;
}
.sxBodx3_2x_3{
	background: #F4F4F4;
}
.sxBodx3_2x_5{
	text-align: left;
	background: #FF5121;
	color: #fff;
}
.sxBodx3_2x_2{
	margin-left: 31px;

}
.sxBodx3_2x_2>img{
	margin-right: 10px;
}
.sxBodx3_2x_4{
	margin-right: 28px;

}
.sxBodx3_2x_4>img{
	margin-left: 10px;
}
.jyb_x2{
	text-align: left;
}
.jyb_x1{
	text-align: right;
}
.sxBodx3_2x_3b:after{
	content: "";
    position: absolute;
 
    width: 10px;
    height: 10px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    z-index: 9;
   
}

.sxBodx3_2x_3:after{
    top: 19px;
    left: -5px;
    background: #f4f4f4;
}
.sxBodx3_2x_5:after{
    top: 19px;
    right: -5px;
    background: #ff5121;
}
.sxBodx2_3xx{
	height: 100px;
}
.xxbox_c .nubMax{
	display: block;
}
.xxbox_c .myInput {
	padding: 0 10px;
    box-sizing: border-box;
}
.xxbox_c{
	width: 90%;
    margin: 30px 37px 0;
}
.sxBodx3_1_3{
	position: absolute;
    right: 33px;
    top: 0;
}	
.sxBodx3_1_3:hover>.sxBodx3_1_3xzk1{
	display: block;
}
.sxBodx3_1_3xzk1{
	display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 53px;
    height: 60px;
}
.sxBodx3_1_3xzk{
	position: absolute;
    top: 44px;
    right: 2px;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 102px;
	padding: 10px 0;
}
.sxBodx3_1_3xzk>div{
	cursor: pointer;
	font-size: 14px;
	color: #333333;
	line-height: 30px;
}
.sxBodx3_1_3xzk>div:hover{
	background: #E6E6E6;
}
.oncheckx_1{
	background: rgba(244, 244, 244, 0.46);
}
.iscsbtn{
	background: #FF5121 !important;
}
.zdxs{
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 150px;
}
</style>
