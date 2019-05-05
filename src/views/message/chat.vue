<template>
	<div>
		
		<div class="setUserBox messgdo">
			<div class="setUserBoxs">
				<div class="setUserBoxs_nav">
					<div  v-for="(el,index) in navDta" :key="index" @click="setNavd(index)" :class="[index==navdOn?'action':'']"><span class="tjsj_2">{{el.n}}</span><span v-if="el.l" class="tjsj_1">{{el.l}}</span></div>
					
				</div>
				<div class="navDwzc">
					<div :class="['setUserBoxs_nav',topTyped?'fixdon':'']">
						<div  v-for="(el,index) in navDta" :key="index" @click="setNavd(index)" :class="[index==navdOn?'action':'']"><span class="tjsj_2">{{el.n}}</span><span v-if="el.l" class="tjsj_1">{{el.l}}</span></div>
					</div>
				</div>
				
				<div class="sxBodx1">
					<div class="sxBodx2">
						<div class="sxBodx2_1">
							<span @click="checkNav(0)" :class="['sxBodx2_1_n1',sxType==0?'sxBodx2_1_n1x':'']">最近联系</span>
							<span @click="checkNav(1)" :class="['sxBodx2_1_n1',sxType==1?'sxBodx2_1_n1x':'']">我关注的</span>
						</div>
						<div class="sxBodx2_2" ref="listDom">
							<ul v-if="sxType==0" class="sxBodx2_2x">
								<div  v-for="(el,index) in listData">
									<li v-if="!checkInchat(el.chat_id)">
									<img @click="goUser(el.user_info.open_id)" :src="el.user_info.avatar" alt="">
									<div>
										<div @click="cheond(index)" class="sxBodx2_2x_1">{{el.user_info.username}}<span class="sxBodx2_2x_2">{{backtime(el.last_post_time)}}</span></div>
										<div @click="cheond(index)" class="sxBodx2_2x_3">{{el.last_message}}</div>
									</div>
									</li>
								</div>								
							</ul>
							<ul v-if="sxType==1" class="sxBodx2_2x">
								<div v-for="(el,index) in listData">
									<li>
									<img @click="goUser(el.user_info.open_id)" :src="el.user_info.avatar" alt="">
									<div>
										<div @click="cheond(index)" class="sxBodx2_2x_1">{{el.user_info.username}}<span class="sxBodx2_2x_2">{{backtime(el.last_post_time)}}</span></div>
										<div @click="cheond(index)" class="sxBodx2_2x_3">{{el.content}}</div>
									</div>
									</li>
								</div>								
							</ul>
						</div>
						<div class="sxBodx2_3"></div>
					</div>
					
					<div class="sxBodx3">
				
						<div class="sxBodx2_1">
							<div class="sxBodx3_1_1">Harriett Bass<span class="sxBodx3_1_2">与你的对话</span><span class="sxBodx3_1_3 iconfont">&#xe73c;</span></div>
						</div>
						<div class="sxBodx3_2" id="meegBox" ref="messgDom">
							
							<ul>
								
								
								<div v-for="(el,index) in messGlist" :key="index">
									<li v-if="index==0 || el.istimed"><div class="sxBodx3_2x_1">{{backtime(el.create_time)}}</div></li>
									<li>
										<div v-if="!checkisme(el.open_id)" class="jyb_x2">
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
								
								<li>
									<div class="sxBodx3_2x_1">{{backtime(Date.parse(new Date())/1000)}}</div>								
								</li>
							</ul>
						</div>
						<div class="sxBodx2_3 sxBodx2_3xx">
							<div class="hfBox xxbox_c">
								<Input class="userBoxd2" v-model="postMessg" :oType="'max'" :max="200" :type="'text'"  ref="tageds1"></Input>	
								<span @click="addChatMessage()">回复</span>
							</div>
						</div>
					</div>
					
				</div>
			</div>
			
		</div>
		
	</div>
</template>

<script>
import Input from '../../components/input';
import {Message} from 'element-ui'
export default {
	components:{Input},
	name: 'chat',
	data(){
		return {
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
			messGlimit:5,
			messPage:1,
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
		}
	},
	mounted: function () {			
		this.init();
		
	}, 
	methods: {
		checkInchat(id){
			if(id == this.chatid){
				if(this.chatTYD==1 ){
					return true;
				}
				
				this.chatTYD=1;
				return false;
			}			
			return false
			
		},
		goUser(id){
			this.$router.push({path: '/works',query:{id:id}})	
		},
		cheond(on){
			if(this.messgOn==on){
				return
			}
			this.messgOn = on;
			this.getMessageList();
		},
		checkNav(on){
			if(this.sxType==on){
				return
			}
			this.chatType = 'chat';
			this.listData = [];
			if(on==1){
				this.chatType = 'chat_follow';
			}
			this.getMessgList();
			this.sxType=on;
		},
		addChatMessage(){
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
			this.getAjxType3 = 1;
			this.api.addChatMessage(pr).then((da)=>{
				this.getAjxType3 = 0;
				if(!da){
					return
				}
				this.$refs.tageds1.setData('');
				
				Message({message: '发送成功'});
				
			}).catch(()=>{
				this.getAjxType3=0;
			});
		},
		checkisme(id){

			return id==window.userInfo.open_id;
		},
		setNavd(on){
			let urld = ['notify','comment','chat'];
			this.$router.push({path: urld[on]});	
		},
		
		backtime(t){		
			return window.getTimes(t*1000)
		},
		getMessageList(){
	
			let pr = {
				access_token:window.userInfo.access_token,
				chat_id:this.listData[this.messgOn].chat_id,
				to_open_id:this.listData[this.messgOn].user_info.open_id,
				
				limit:this.messGlimit,
			};
			this.api.getMessageList(pr).then((da)=>{
				if(!da){
					return
				}
				this.pushCk();
				this.messGlist = da.reverse();
		
			});
			
		},
		init(){
	
			if(this.$route.query && this.$route.query.id){	
				this.getChatDetail(this.$route.query.id);
			}
		
			this.getMessgNumber();
			this.getMessgList();
			
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
			window.onscroll = ()=>{
				let t = document.documentElement.scrollTop||document.body.scrollTop;
				if(t==0){
					document.documentElement.scrollTop =1;
					document.body.scrollTop =1;
				}
				if(this.topTyped==false){
					if(t>188){
						this.topTyped=true;
					}
					
				}
				if(t<=188){
					this.topTyped=false;
				}
	
				
			};
			this.addEvent2(this.$refs.listDom);
			this.addEvent1(this.$refs.messgDom);
			
		},
		addEvent2(obj){
			
			obj.onscroll = ()=>{
				let t = obj.scrollTop||obj.scrollTop;
				let b = obj.scrollHeight-580;
				if(t==b && this.getAjxType1==0){
					
					let pr = {
						access_token:window.userInfo.access_token,
						type:'chat',
						page:this.page,
						limit:this.limit
					};
					this.getAjxType1=1;
					this.api.getMessgList(pr).then((da)=>{
						this.getAjxType1=0;
						if(!da){return}
						this.page++;
						this.listData = this.listData.concat(da.data);						
						if(da.data.length==0){
							this.getAjxType1=1;
							return
						}	
					}).catch(()=>{
						this.getAjxType1=0;
					});
					
				}
			
			}
		},
		addEvent1(obj){
			obj.scrollTop = obj.scrollHeight-540;
			
			setTimeout(()=>{
				obj.scrollTop = obj.scrollHeight-540;
			},300);	
					
			
			obj.onscroll = ()=>{
				let t = obj.scrollTop||obj.scrollTop;
				if(t==0 && this.getAjxType2==0){
					this.getAjxType2=1;
					let pr = {
						access_token:window.userInfo.access_token,
						chat_id:this.listData[this.messgOn].chat_id,
						to_open_id:this.listData[this.messgOn].user_info.open_id,
						time:this.messGlist[0].create_time,
						limit:this.messGlimit,
					};
					this.api.getMessageList(pr).then((da)=>{
						this.getAjxType2=0;
						if(!da){
							return
						}
						this.messGlist[0].istimed = true;
						this.messGlist = da.reverse().concat(this.messGlist);
						if(da.length==0){
							this.getAjxType2=1;
							return
						}	
						
					}).catch(()=>{
						this.getAjxType2=0;
					});
				}
			
			}
			
		},
		pushCk(){
			let op = {
				access_token:window.userInfo.access_token,
				type:'chat',
			};
			if(!this.listData[this.messgOn].chat_id){
				op.to_open_id = this.listData[this.messgOn].user_info.open_id;
			}else{
				op.chat_id = this.listData[this.messgOn].chat_id;
			}
			
			this.api.Messageread(op).then((da)=>{
				if(!da){
					return
				}
			})
		},
		setScll(top){
			
			if (document.documentElement && document.documentElement.scrollTop) {
			
                document.documentElement.scrollTop = Number(top);
            }
            if (document.body) {			
                document.body.scrollTop = Number(top);				
			}	
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
				this.navDta[0].l = 0;
				this.navDta[1].l = this.messgNum.unread_comment_num;
				this.navDta[2].l = this.messgNum.unread_chat_num;
		
			})
		},
		getChatDetail(id){
			let pr = {
				access_token:window.userInfo.access_token,
				chat_id:id
			};
			this.api.getChatDetail(pr).then((da)=>{
				if(!da){return}
				console.log(da);
				
				
				this.ondfgData = da;
				this.chatid = this.ondfgData.chat_id;
				if(this.listData.length>0){
					this.listData.unshift(da);
					this.onTypedf=1;
				}

				
			});
		},
		getMessgList(type){
			
			let pr = {
				access_token:window.userInfo.access_token,
				type:this.chatType,
				page:this.page,
				limit:this.limit
			};
			
			
			
			this.api.getMessgList(pr).then((da)=>{
				if(!da){return}

				this.listData = da.data;		
				if(this.onTypedf==0){
					this.listData.unshift(this.ondfgData);				
				}
		
				this.getMessageList();
			});
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
	height:580px;
	
}
.sxBodx2_2x>div>li{
	padding: 21px 30px 0;
	display: block;
	width: 100%;
	height: 69px;
	border-bottom: 2px solid rgba(151, 151, 151, .1);
}
.sxBodx2_2x>div>li>img{
	display: inline-block;
	vertical-align: top;
	border-radius: 50%;
	width: 32px;
	height: 32px;
}
.sxBodx2_2x>div>li>div{
	display: inline-block;
	margin-left: 10px;
	width: 207px;
}
.sxBodx2_2x_1{
	font-size: 14px;
	line-height: 20px;
	color: #1E1E1E;
	margin-bottom: 5px;
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
	border-radius: 5px 5px 5px 5px 2px 2px 2px;
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
</style>
