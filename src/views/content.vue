<template>
	<div class="seed">
		<div class="seed1box" ref="topNav">
			<div class="seed1">
			<div class="seed11">
				<div class="seed1_1">
					{{contDat.work_name}}
				</div>
				<div class="seed1_2">
					<span class="seed1_2_1">{{backtime(contDat.create_time)}}</span>					
				</div>
				<div class="seed1_3">
					{{contDat.classify_1_name+'-'+contDat.classify_2_name+'-'+contDat.classify_3_name}}
					<span  class="iconfont seed1_3_1">&#xe654;
					<div>
						<div v-if="contDat.user_info">{{'作品版权由【'+contDat.user_info.username+'】解释，'+contDat.copyright}}</div>
					</div>
					</span>			
				</div>
			</div>
			<div class="seed12">
				<span class="seed1_2_2" @click="gopl"><img src="/imge/icon/zs_icon_xx.png">{{hfnum}}</span>
				<span class="seed1_2_3"><span @click="addLike('work',contDat.work_id,contDat)" :class="['iconfont',contDat.liked?'likeis':'']">&#xe672;</span>{{contDat.like_num}}</span>
				<span class="seed1_2_4" @click="fxclick"><span class="iconfont">&#xe64c;</span>分享</span>
				<span class="seed1_2_5" @click="addLike('work',contDat.work_id,contDat,'推荐')"><span  :class="['iconfont',contDat.liked?'likeis':'']">&#xe652;</span>推荐</span>
			</div>
			</div>
		</div>
		<div v-if="topTyped==true" class="topNav_x_1">
			<div class="topNav_x_2">
			<div class="topNav_x_1_1">
				{{contDat.work_name}}
			</div>
			<div class="topNav_x_1_2">
				<span class="seed1_2_4" @click="fxclick"><span class="iconfont">&#xe64c;</span>分享</span>
				<span class="seed1_2_5" @click="addLike('work',contDat.work_id,contDat,'推荐')"><span  :class="['iconfont',contDat.liked?'likeis':'']">&#xe652;</span>推荐</span>
			</div>
			</div>
		</div>
		
		<div class="seed2">
			<div class="seed2_1">
				<div class="seed2_1_1" >
					<div class="seed2_1_1_1x" v-html="contDat.content"></div>
					<div class="seed2_1_1_2">
						标签<span v-for="(el,index) in contDat.labels" :key="index">{{el}}</span>
						<span class="iconfont" @click="showReport(contDat.user_info.open_id,contDat.work_id,'work')">&#xe73c;</span>
						<div  v-if="contDat.attachment_id" @click="downFile(contDat.attachment.url)">下载附件（{{contDat.attachment.file_size_format}}）</div>
					</div>
				</div>
				<div class="plBoxd" ref="firstAnchor">
					<div class="seed2_1_2_1">
						<Input class="userBoxd2" v-model="pl"  :keyup.enter="keydown" :oType="'max'" :max="140"   :type="'text'" :placeholder="'说点什么吧'" ref="tageds"></Input>	
						<span :class="chekcont(pl)==true?'iscsbtn':''" @click="addComment(pl)">评论</span>
						<p class="myplde" v-if="hfnum==0">
							还没有人评论，快来抢沙发吧~
						</p>
					</div>
					<div class="pl_01" v-if="hfnum>0">共{{hfnum}}条评论</div>
					<div class="pl_02" v-if="hfnum>0">
						<div v-for="(el,index) in hfData" :key="index">
							<div  class="pl_02_1">
								<img @click="goUser(el.open_id)" :src="el.avatar">
								<div>
									<span @click="goUser(el.open_id)">{{el.username}}</span><span>{{backtime(el.create_time)}}</span><span v-if="!isoutTime(el.create_time,el.open_id)" class="iconfont pend" @click="showHb(el.feed_id,el.comment_id,index)">&#xe602;</span>
									<div>{{backComt(el.content)[0]}}</div>
								</div>
								<div>
									<span class="hfdZ_3" @click="showFhks(el)">回复</span><span v-if="el.sub_comment && el.sub_comment.length>0" :class="[el.isshowsub?'ishowfud':'','hfdZ_4']" @click="showFhd(index)">{{el.isshowsubWZ?el.isshowsubWZ:'展开共'+el.sub_comment.length+'条回复'}}</span><span class="iconfont pend hfdZ_1"><span @click="addLike('comment',el.comment_id,el)" :class="['iconfont',el.liked?'likeis':'']">&#xe672;</span>{{el.like_num}}</span><span class="iconfont pend hfdZ_2" @click="showReport(el.open_id,el.comment_id,'comment')">&#xe664;</span>
									<div class="hfBox" v-if="el.isshowfh">
										<Input :keyup.enter="keydown2" class="userBoxd2" v-model="pl2" :oType="'max'" :max="140" :type="'text'" :placeholder="hfnc" ref="tageds1"></Input>	
										<span  :class="chekcont(pl2)==true?'iscsbtn':''" @click="addComment(pl2,index)">回复</span>
									</div>
								</div>
							</div>
							<div v-if="el.isshowsub" v-for="(el2,index2) in el.sub_comment" :key="index2" class="pl_02_1xxc">
								<div class="pl_02_1">
									<img @click="goUser(el2.open_id)" :src="el2.avatar">
									<div>
										<span @click="goUser(el2.open_id)">{{el2.username}}</span><span>{{backtime(el2.create_time)}}</span><span v-if="!isoutTime(el2.create_time,el2.open_id)" @click="showHb(el2.feed_id,el2.comment_id,index,index2)" class="iconfont pend">&#xe602;</span>
										<div><span class="atren">{{backComt(el2.content)[0]}}</span>{{backComt(el2.content)[1]}}</div>
									</div>
									<div class="yasfh">
										<span class="hfdZ_3" @click="showFhks(el2)">回复</span><span class="iconfont pend hfdZ_1"><span @click="addLike('comment',el2.comment_id,el2)" :class="['iconfont',el2.liked?'likeis':'']">&#xe672;</span>{{el2.like_num}}</span><span class="iconfont pend hfdZ_2" @click="showReport(el2.open_id,el2.comment_id,'comment')">&#xe664;</span>
										<div class="hfBox" v-if="el2.isshowfh==1">
											<Input :keyup.enter="keydown2" class="userBoxd2" v-model="pl2" :oType="'max'" :max="140" :type="'text'" :placeholder="hfnc" ref="tageds2"></Input>	
											<span :class="chekcont(pl2)==true?'iscsbtn':''" @click="addComment(index,index2)">回复</span>
										</div>
									</div>								
								</div>
							</div>
						</div>
					</div>
					<div v-if="hfnum>9" class="addmpl" @click="addmpl"><span class="hfdZ_4">{{ishavepltip}}</span></div>
					<RPT ref="report"></RPT>
				</div>

			</div>
			<div class="seed2_2">
				<div class="seed2_1_1" v-if="contDat.user_info">
					<div class="seed2_1_1_1">
						<img @click="goUser(contDat.user_info.open_id)" class="contavatar" :src="contDat.user_info.avatar" alt="">
						<div>
							<div @click="goUser(contDat.user_info.open_id)">{{contDat.user_info.username}}</div>
							<div> {{contDat.user_info.vocation}} | {{contDat.user_info.province}} {{contDat.user_info.city}}</div>
							<div><span v-if="contDat.user_info.is_platform_work">xx</span></div>
						</div>
					</div>
					<div class="seed2_2_1_2">
						<div @click="goFans('/followFans',contDat.user_info.open_id)">粉丝<div>{{contDat.user_info.fans_num}}</div></div>
						<div>人气<div>{{contDat.user_info.popular_num}}</div></div>
						<div @click="goFans('/works',contDat.user_info.open_id)">创作<div>{{contDat.user_info.work_num}}</div></div>
					</div>
					<div class="seed2_1_1_3">


						<div @click="goUserzy" v-if="page.open_id==contDat.user_info.open_id"><span>进入主页</span></div>
						<div v-else>
							<span @click="showHb2" v-if="contDat.user_info.follow_flag>0">已关注</span>
							<span @click="Follow_add()" v-else>关注</span>
							<span class="lastsedd_1" @click="gosx(contDat)">私信</span>
						</div>
						
						

					</div>
				</div>
				<div class="seed2_1_2" v-if="contDat.more_work && contDat.more_work.length>0">
					<div class="seed2_1_2_1 pend" @click="goUser(contDat.user_info.open_id)">TA的更多作品</div>
					<div class="seed2_1_2_1x1">
					<div  class="seed2_1_2_2" v-for="(el,index) in contDat.more_work" :key="index">
						<div class="i_listd1x2" @click="seeWorks(el.work_id)"><img :src="el.face_pic" alt="" class="i_listd1"></div>
						<div class="i_listd2">
							<div class="i_listd2_1">
								<span @click="seeWorks(el.work_id)">{{el.work_name}}</span>
								<img v-if="el.is_recommend==1" src="/imge/zs_icon_tj.png" alt="">
							</div>
							<div class="i_listd2_2">
								<span>{{el.classify_1_name+'-'+el.classify_2_name}}</span>
								<span>{{backtime(el.create_time)}}</span>
							</div>
							
							<div class="i_listd2_3">
								<span><img @click="goUser(el.user_info.open_id)" :src="el.user_info.avatar" alt=""></span>
								
								<div class="i_listd2_3x1" @click="openxq(index)">
									<span class="pend"><img src="/imge/icon/zs_icon_gk.png">{{el.view_num}}</span>
									<span class="pend"><img src="/imge/icon/zs_icon_dz.png">{{el.like_num}}</span>
									<span class="pend"><img src="/imge/icon/zs_icon_xx.png">{{el.comment_num}}</span>
								</div>
							</div>
						</div>
					</div>
					</div>
					
					
				</div>
				<div class="seed2_1_2xx" v-else>
					你正在浏览TA首次发布的作品<br/>作为老前辈, 送个赞鼓励下吧~
					<span :class="['iconfont','seed1_2_5','seed1_2_5xx',contDat.liked?'likeis':'']" class="" @click="addLike('work',contDat.work_id,contDat,'推荐')"><span>&#xe652;</span>推荐</span>
				</div>
			</div>
		</div>
		
		<div v-show="isshowd" class="loginoutBox">
			<div class="loginoutBox1">
				<img @click="hindHb()" class="loginoutBox2" src="/imge/cj_00.png">

				<div class="loginoutBox3">确定删除该条评论?</div>

				<div class="loginoutBox4"><span @click="hindHb()">取消</span><span @click="delComment()">确定</span></div>
			</div>
		</div>
		<div v-show="isshowd2" class="loginoutBox">
			<div class="loginoutBox1">
				<img @click="hindHb2()" class="loginoutBox2" src="/imge/cj_00.png">
				<div class="loginoutBox3">是否取消关注?</div>
				<div class="loginoutBox4"><span @click="hindHb2()">取消</span><span @click="Follow_del()">确定</span></div>
			</div>
		</div>
		<fxd :shareData="shareData" ref="fxd"></fxd>
	</div>
</template>

<script>
import Input from '../components/input'
import {Message} from 'element-ui'
import RPT from '../components/report'
import fxd from '../components/share';
export default {
	components:{Input,RPT,fxd},
	data(){
		return{
			shareData:{},
		    isRep:false,
			open_id:'',
            link_id:'',
            position:'',
			pl:'',
			data:{
				username:"xxxx",
				xx:'禁止匿名转载；禁止商业使用。临摹作品，同人作品原型版归原作者所有。',
			},
			show:true,
			isshowd:false,
			isshowd2:false,
			
			hfnum:0,
			contDat:{},
			page:{
				limit:10,
				page:1,
				access_token:'',
			},
			hfnc:'',
			hfData:[],
			pl2:'',
			onPl:{
				fj:-1,
				zj:-1,
			},
			plType:0,
			plfsOn:-1,
			ishavepl:0,
			ishavepltip:'查看更多评论',
			deletData:{
				
			},
			deletType:0,
			deletOn:[],
			follwTyle:0,
			addLink:0,
			topTyped:false,
			work_id:'',
			onhfObj:'',
		}
	},
	mounted: function () {
		this.init();
		
	}, 
	methods: {
		keydown(){
			
		
		},
		keydown2(){

		
		},
		gopl(){			
			document.documentElement.scrollTop =this.$refs.firstAnchor.offsetTop;
			document.body.scrollTop =this.$refs.firstAnchor.offsetTop;
		},
		goUserzy(){
			this.$router.push({path: '/works',query:{id:window.userInfo.open_id}})
		},
		gosx(el){
			this.$router.push({path:'/chat',query:{openid:el.user_info.open_id,avatar:el.user_info.avatar,username:el.user_info.username}});
		},
		goFans(d,id){
			this.$router.push({path:d,query:{id:id}});
		},
		fxclick(){
			this.$refs.fxd.showShare(true);
		},
		goUser(id){
			this.$router.push({path: '/works',query:{id:id}})	
		},
		showReport(id,lid,ad){
			this.$refs.report.showReport(id,lid,ad);
		},
		addLike(type,id,obj,wz){
			
			if(!window.userInfo){
				this.$router.push({path: '/login'})
				return
			}
			let msg1 = '正在点赞',
			apiname = 'addLike',
			msg2 = '点赞成功',
			numd=1,
			td = true;
			if(wz){
				msg2 = '推荐成功';
			}
			if(obj.liked==true){
				msg1 = '正在取消';
				apiname = 'delLike';
				msg2 = '取消成功';
				td = false;
				numd=-1;
			}
			if(this.addLink==1){
				Message({message: msg1});
				return 
			}
			this.addLink=1;
			let pr = {
				access_token:window.userInfo.access_token,
				like_type:type,
				id:id
			};
			
			this.api[apiname](pr).then((da)=>{
				if(!da){
					this.addLink=0;
					return
				}
				obj.liked=td;
				obj.like_num+=numd;
				Message({message: msg2});
				this.addLink=0;					
			}).catch(()=>{
				this.addLink=0;	
			});
		},
		
		Follow_del(){
			
			if(this.follwTyle==1){
				return
			}
			this.follwTyle=1;
			let pr = {
				access_token:window.userInfo.access_token,
				follow_id:this.contDat.user_info.open_id
			};
			this.api.Follow_del(pr).then((da)=>{
				if(!da){
					this.follwTyle=0;
					return
				}
				this.follwTyle=0;
				this.hindHb2();
				this.contDat.user_info.follow_flag=0;
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
				follow_id:this.contDat.user_info.open_id
			};
			this.api.Follow_add(pr).then((da)=>{
				if(!da){
					this.follwTyle=0;
					return
				}
				this.follwTyle=0;
				this.contDat.user_info.follow_flag=1;
				Message({message: '关注成功'});
			}).catch(()=>{
				this.follwTyle = 0;		
			});
			

		},
		seeWorks(id){
			this.$router.push({path:'/cont',query:{id:id}});
		},
		downFile(flid){
			window.open(flid);
		},
		delComment(){
			if(this.deletType==1){
				Message({message: '正在删除评论请稍后'});
				return
			}			
			this.deletType = 1;
			this.api.delComment(this.deletData).then(()=>{
				this.deletType = 0;	
				if(this.deletOn.length>1){
					this.hfData[this.deletOn[0]].sub_comment.splice(this.deletOn[1],1);
				}else{
					this.hfData.splice(this.deletOn[0],1);
				}	
				Message({message: '删除评论成功'});			
				this.hindHb();
			}).catch(()=>{
				this.deletType = 0;		
			});
			

		},
		isoutTime(t,id){	
		
			return (((new Date()).valueOf()- (new Date(t)).valueOf(t))>=(5*60*1000)) || window.userInfo.open_id!=id;	
		},
		showHb(fid,cid,on,on2){
			this.isshowd = true;	
			this.deletData = {
				access_token:window.userInfo.access_token,
				work_id:this.work_id,
				comment_id:cid,
				feed_id:fid,				
			};
			this.deletOn = [on];
			if(!on2 && on2!=0){
				return
			}
			this.deletOn.push(on2);
		},
		hindHb(){
			this.isshowd = false;
		},
		hindHb2(){
			this.isshowd2 = false;
		},
		showHb2(){
			this.isshowd2 = true;
		},
		addmpl(){
			if(this.ishavepl==1){
				this.ishavepltip='没有更多评论了!';
				return
			}
			this.page.page++;
			this.getCommentList();
		},
		backtime(time){
			return window.getTimes(time)
		},
		init(){		
			this.hfData = [];
			
			this.work_id = this.$route.query.id;
			this.getCommentList();
			window.onscroll = ()=>{
				let t = document.documentElement.scrollTop||document.body.scrollTop;
				if(this.topTyped==0){
					if(t>188){
						this.topTyped=true;
					}
					return
				}
				if(t<=188){
					this.topTyped=false;
				}

			}
			
			let pr = {
				work_id:this.work_id,
			}
			
			if(window.userInfo){
				this.page.access_token = window.userInfo.access_token;
				this.page.open_id = window.userInfo.open_id;
				this.page.avatar = window.userInfo.avatar;
				this.page.username = window.userInfo.username;
				pr.access_token =this.page.access_token;
			}
			this.api.getWorkDetail(pr).then((da)=>{
				da.labels = JSON.parse(da.labels)
				this.contDat = da;
				
				this.shareData = {
					url:window.location.href,
					title:this.contDat.work_name+'-狮圈儿创作者平台',
					pics:this.contDat.face_pic,
					desc:'惊现大神快来膜拜',
					summary:this.contDat.work_name+'-狮圈儿创作者平台',
				};
				this.$refs.fxd.setUrl(this.shareData);
				if(window.userInfo.open_id==da.user_info.open_id){
				    this.show= false;
				}else {
                    this.show= true;
				}
				
			});
		},
		backComt(data){
			try{
				data = JSON.parse(data);			
			}catch(e){
				data = ['',data];
			}
			return data;
		},
		backType(){
		
		},
		getCommentList(a,b){
			let pr = {
				work_id:this.work_id,
				page:this.page.page,
				limit:this.page.limit,
			};
			if(this.page.access_token){
				pr.access_token = this.page.access_token;
			}
			this.api.getCommentList(pr).then((da)=>{
				if(da.data.length==0){
					this.ishavepl=1;
					this.ishavepltip='没有更多评论了!';
				}
				this.hfData = this.hfData.concat(da.data);
				this.hfnum = da.total;
            });
		},
		addComment(pl,on,on2){
			if(this.checkLogin()==false){
				return;
			}
			if(this.plType==1){
				Message({message: '正在上传评论请稍后'});
				return
			}
			if(this.zkMyFun.checkWz(pl)==false){				
				return
			}
			
			let backData = (on,on2)=>{
				let pr = {
					access_token:window.userInfo.access_token,
					work_id:this.work_id,
					content:JSON.stringify((!on && on!=0)?[pl]:[(on2 || on2==0)?'@'+this.hfData[on].username:'@'+this.hfData[on].sub_comment[on2].username,pl]),					
				};
				if(on || on==0){
					pr.to_comment_id = this.hfData[on].to_comment_id;
				}
				if(on2 || on2==0){
					pr.feed_id = this.hfData[on].sub_comment[on2].feed_id;
				}
				return pr;
			};			
			let pr = backData(on,on2);
			this.plType=1;
			this.api.addComment(pr).then((da)=>{
				this.plType=0;
				if(!da){return}
				Message({message: '评论成功'});	
				if(on || on==0){
					if(!this.hfData[on].sub_comment){
						this.$set(this.hfData[on],'sub_comment',[]);						
					}
					this.hfData[on].sub_comment.unshift({
						content: pr.content,
						create_time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
						feed_id: this.hfData[on].comment_id,
						like_num: 0,
						comment_id:da.comment_id,
						avatar: window.userInfo.avatar,
						open_id: window.userInfo.open_id,
						username:window.userInfo.username,
					});		
					return
				}			
				
				this.$refs.tageds.clearValue();
				this.hfData.unshift({
					feed_id:da.comment_id,
					comment_id:da.comment_id,
					content: pr.content,
					create_time: new Date().Format("yyyy-MM-dd HH:mm:ss"),						
					like_num: 0,
					avatar: window.userInfo.avatar,
					open_id: window.userInfo.open_id,
					username:window.userInfo.username,
					sub_comment:[]
				});
				this.hfnum+=1;				
			}).catch(()=>{
				this.plType=0;
			});
			
		},
		initFu(on, on2){
            this.plType=0;
            if(on >= 0){
                this.$set(this.hfData[on],'isshowfh','');
			}
			
			if(on2 >= 0){
			
                this.$set(this.hfData[on].sub_comment[on2],'isshowfh','');
					console.log(this.hfData[on].sub_comment[on2]);
			}
            if(on2 >= 0){
                this.$refs.tageds2.value = '';
            }else{
                this.$refs.tageds1.value = '';
			}
            this.pl2 = '';
		},
		chekcont(msg){
			return this.zkMyFun.checkWz(msg);
		},
		addfu2(fid,name,on,on2,comId){
            if(!this.page.access_token){
                Message({message: '请先登录'});
                return
            }
		    if(this.plType==1){
				Message({message: '正在回复中'});
				console.log(this.plType);
				return
			}
			
			if(this.chekcont(this.pl2)==false){
                Message({message: '评论为空'});
	  			return
      		}
            this.plType=1;
			let cond = ['@'+name,this.pl2];
			let pr = {
				work_id:this.work_id,
				content	:JSON.stringify(cond),
				to_comment_id:comId,
			};
			if(fid){
				pr.feed_id = fid;
			}
			pr.access_token = this.page.access_token;
			this.api.addComment(pr).then((da)=>{
				if(!da){
					return
				}				
				if(on2){
					if(!this.hfData[on].sub_comment){
						this.$set(this.hfData[on],'sub_comment',[]);						
					}
					this.hfData[on].sub_comment.unshift({
						avatar: this.page.avatar,
						content: pr.content,
						create_time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
						feed_id: this.hfData[on].comment_id,
						like_num: 0,
						comment_id:da.comment_id,
						open_id: this.page.open_id,
						username:window.userInfo.username,
					});					
				}
				this.initFu(on, on2);				
				Message({message: '评论成功'});              
			}).catch(()=>{
				this.plType=0;
			});	
		},
			
		showFhd(on){
			if(!this.hfData[on].isshowsub){
				this.$set(this.hfData[on],'isshowsub',1);
				this.$set(this.hfData[on],'isshowsubWZ','收起回复');
				return
			}
			this.$set(this.hfData[on],'isshowsub','');
			this.$set(this.hfData[on],'isshowsubWZ','展开共'+this.hfData[on].sub_comment.length+'条回复');						
		},
		// checkisLogin(){
		// 	if(!window.userInfo){
		// 		this.$router.push({path: '/login'})
		// 		return false;
		// 	}
		// },
		showFhks(on){			
			if(this.checkLogin()==false){
				return;
			}
			if(!on){
				return
			}
			if(this.onhfObj){
				this.$set(this.onhfObj,'isshowfh','');
			}
			if(on.isshowfh!=1){
		
				this.$set(on,'isshowfh',1);
				this.hfnc = '回复：'+on.username;
				this.onhfObj = on;
				return
			}
			this.onhfObj = on;
			this.$set(on,'isshowfh','');
				
		},
		showFhk(on,on2){		
			if(!window.userInfo){
				this.$router.push({path: '/login'})
				return
			}
			if(this.onPl.zj!=-1){
				this.$set(this.hfData[this.onPl.fj].sub_comment[this.onPl.zj],'isshowfh','');
			}
			if(this.onPl.zj==-1 && this.onPl.fj!=-1){
				this.$set(this.hfData[this.onPl.fj],'isshowfh','');
			}			
			this.onPl = {
				fj:on===undefined?-1:on,
				zj:on2===undefined?-1:on2,
			};
			if(on2>=0){
				if(this.hfData[on].sub_comment[on2].isshowfh){
					this.$set(this.hfData[on].sub_comment[on2],'isshowfh','');
					return
				}
				this.hfnc = '回复：'+this.hfData[on].sub_comment[on2].username;
				this.$set(this.hfData[on].sub_comment[on2],'isshowfh',1);	
				return
			}
			if(this.hfData[on].isshowfh){
				this.$set(this.hfData[on],'isshowfh','');
				return
			}
			this.hfnc = '回复：'+this.hfData[on].username;
			this.$set(this.hfData[on],'isshowfh',1);				
		},
	},
	watch: {	
		'$route': function() {
			this.init();
			
		}
	},

}
</script>

<style>
.iconfont{cursor: pointer}
.iscsbtn{
	background: #FF5121 !important;
}
.seed1_2_5xx{
	background: #333333;
	color: #fff;
	margin: 40px auto;
}
</style>
