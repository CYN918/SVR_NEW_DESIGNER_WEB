<template>
	<div class="wk_c">
		<div v-if="isYl" class="ylzp_0">
			<div class="ylzp_1">
				当前页面为预览状态，仅供视觉参考
			</div>
		</div>
		<div class="wk_c_1">
			<pTop :cn="topCn">
				<template v-slot:todo="{ todo }">
					<div class="wk_c_1_1">
						<div class="wk_c_1_1_l">
							<div class="wk_c_1_1_l_1">{{contDat.work_name}}</div>
							<div class="wk_c_1_1_l_2 isno">
								{{contDat.classify_1_name+'-'+contDat.classify_2_name+'-'+contDat.classify_3_name}}
								<span class="wk_c_1_1_l_2Tip">
									©
									<div v-if="contDat.user_info">{{'作品版权由【'+contDat.user_info.username+'】解释，'+contDat.copyright}}</div>
								</span>
							</div>
							<div class="wk_c_1_1_l_3 isno">
								<span>{{backtime(contDat.create_time)}}</span>
								<span><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/see/zs_icon_gk.svg"/>{{contDat.view_num}}</span>
								<span><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/see/zs_icon_xx.svg"/>{{contDat.comment_num}}</span>
								<span><img class="wk_c_1_1_l_3_1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/see/zs_icon_dz.svg"/>{{contDat.like_num}}</span>
							</div>
						</div>
						<div class="wk_c_1_1_r">
							<div @click="fxclick" class="btns pend">
								<img class="is_icon1 isshow" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/works/share.svg"/>分享
							</div><div @click="addLikeNe('顶部栏-推荐','work',contDat.work_id,contDat)" :class="['btns pend',contDat.liked?'':'btns_js']">
								<img class="is_icon2 isshow" 
								
								:src="imgPath+(contDat.liked?'new/works/dz.svg':'new/works/sc_icon_dz-white.svg')"/>{{(contDat.liked?'已推荐':'推荐')}}
							</div>
						</div>
					</div>
				</template>		
			</pTop>		
		</div>
		
		<div class="wk_c2">
			<div class="wk_c2_l">
				<div class="wk_c2_l1">
					<div class="wk_c2_l1_1" v-html="contDat.content"></div>
					<div class="wk_c2_l1_2">
						标签：<span v-for="(el,index) in contDat.labels" :key="index">{{el}}</span>
						<div class="wk_c2_l1_2_1">
							<div class="iconfont pend" @click="showReport(contDat.user_info.open_id,contDat.work_id,'work')">&#xe73c; 举报</div>
							<div v-if="contDat.attachment_id" @click="downFile(contDat.attachment.url)" class="wk_c2_l1_2_1x pend">下载附件（{{contDat.attachment.file_size_format}}）</div>
						</div>
					</div>
				</div>
				
				<div class="wk_c2_l2">
					<div v-if="hfnum==0" class="wk_Pl_1">暂无评论</div>
					<div class="wk_Pl_2">
						<div class="wk_Pl_21">
							<textarea :class="['new_c_3',new_c_3focus]" :style="backHig" @focus="sqfs" @blur="sqjd" v-model="pl" placeholder="说点什么吧" ref="textadf"></textarea>
							<div class="textAmax">{{pl?pl.length:0}}/140</div>
							<div v-if="isYl" class="zdCen"></div>
						</div>
						
						<span :class="['new_c_1',chekcont(pl)==true?'iscsbtn':'']" @click="addCommentNe('发布评论',pl)">评论</span>
					</div>
					
					<p v-if="hfnum==0" class="myplde">
						还没有人评论，快来抢沙发吧~
					</p>
					<div class="pl_01x"  v-if="hfnum>0">共{{hfnum}}条评论</div>
					<div class="wk_Pl_3" v-if="hfnum>0">
						<div class="pl_02" >
							<div v-for="(el,index) in hfData" :key="index">
								<div  class="pl_02_1">
									<img @click="goUser(el.open_id)" :src="el.avatar">
									<div>
										<span @click="goUser(el.open_id)">{{el.username}}</span>
										<span>{{backtime(el.create_time)}}</span>
										<span v-if="!isoutTime(el.create_time,el.open_id)" class="iconfont pend" @click="showHb('删除评论',el.feed_id,el.comment_id,index)">&#xe602;</span>
										<div>{{backComt(el.content)[0]}}</div>
									</div>
									<div class="hfN_01">
										<span class="hfdZ_3" @click="showFhks(el,'评论点击-回复')">回复</span>
										<span v-if="el.sub_comment && el.sub_comment.length>0" :class="['pend',el.isshowsub?'ishowfud':'','hfdZ_4']" @click="showFhd(index)">{{el.isshowsubWZ?el.isshowsubWZ:el.sub_comment.length+'条回复'}}</span>
										
										<div class="hfN_02">
											<span class="iconfont pend hfN_02_2" @click="showReport(el.open_id,el.comment_id,'comment')">&#xe664;<span>举报</span></span>											
											<span class="iconfont pend hfN_02_1">
												<img @click="addLikeNe('点赞评论','comment',el.comment_id,el)" :src="isLick(el.liked)">{{el.like_num}}											
											</span>
										</div>
										
									
										<div  class="hfBox hfBoxd" v-if="el.isshowfh">
											<Input :mblur="xsfn" class="userBoxd2xd" v-model="pl2" :oType="'max'" :max="140" :type="'text'" :placeholder="hfnc" ref="tageds1"></Input>	
											<span  :class="chekcont(pl2)==true?'iscsbtn':''" @click="addCommentNe('评论下发布回复',pl2,index)">回复</span>
											<div class="plyh"></div>
										</div>
									</div>
								</div>
								<div v-if="el.isshowsub" v-for="(el2,index2) in el.sub_comment" :key="index2" class="pl_02_1xxc">
									<div class="pl_02_1">
										<img @click="goUser(el2.open_id)" :src="el2.avatar">
										<div>
											<span @click="goUser(el2.open_id)">{{el2.username}}</span><span>{{backtime(el2.create_time)}}
											</span><span v-if="!isoutTime(el2.create_time,el2.open_id)" @click="showHb('删除回复',el2.feed_id,el2.comment_id,index,index2)" class="iconfont pend">&#xe602;</span>
											<div><span class="atren">{{backComt(el2.content)[0]}}</span>{{backComt(el2.content)[1]}}</div>
										</div>
										<div class="yasfh hfN_01">
											<span class="hfdZ_3" @click="showFhks(el2,'回复点击-回复')">回复</span>
											<div class="hfN_02">
												<span class="iconfont pend hfN_02_2" @click="showReport(el2.open_id,el2.comment_id,'comment')">&#xe664;<span>举报</span></span>											
												<span class="iconfont pend hfN_02_1">
													<img @click="addLikeNe('点赞回复','comment',el2.comment_id,el2)" :src="isLick(el2.liked)">{{el.like_num}}											
												</span>
											</div>
											<div class="hfBox hfBoxd hfBoxd2" v-if="el2.isshowfh==1">
												<Input :mblur="xsfn" class="userBoxd2xd" v-model="pl2" :oType="'max'" :max="140" :type="'text'" :placeholder="hfnc" ref="tageds1"></Input>	
												<span :class="chekcont(pl2)==true?'iscsbtn':''" @click="addCommentNe('评论下发布回复',pl2,index,index2)">回复</span>
												<div class="plyh"></div>
											</div>
										</div>								
									</div>
								</div>
							</div>
						</div>
						<div v-if="hfnum>9" class="addmpl" @click="addmpl"><span class="hfdZ_4">{{ishavepltip}}</span></div>
						
					</div>
					
				</div>
			</div>
			<div class="seed2_2p">
					<div :class="['seed2_2','seed2_2xxxx']">
						<div class="seed2_1_1" v-if="contDat.user_info">
							<div class="seed2_1_1_1">
								<img @click="goUser(contDat.user_info.open_id,'创作者信息-头像')" class="contavatar pend" :src="mJs.Cavars(contDat.user_info.avatar)" alt="">
								<div>
									<div class="pend hft" @click="goUser(contDat.user_info.open_id,'创作者信息-昵称')">{{contDat.user_info.username}}</div>
									<div> {{contDat.user_info.vocation}} | {{contDat.user_info.province}} {{contDat.user_info.city}}</div>
									<div><span v-if="contDat.user_info.is_platform_work"></span></div>
								</div>
							</div>
							<div class="seed2_2_1_2">
								<div class="pend" @click="goFans('/followFans',contDat.user_info.open_id,'创作者信息-粉丝')">粉丝<div>{{contDat.user_info.fans_num}}</div></div>
								<div>人气<div>{{contDat.user_info.popular_num}}</div></div>
								<div class="pend" @click="goFans('/works',contDat.user_info.open_id,'创作者信息-创作数')">创作<div>{{contDat.user_info.work_num}}</div></div>
							</div>
							<div class="seed2_1_1_3">
					
					
								<div @click="goUserzy" v-if="page.open_id==contDat.user_info.open_id"><span>进入主页</span></div>
								<div v-else>
									<span @click="showUnfoolxow" v-if="contDat.user_info.follow_flag>0">已关注</span>
									<span class="jsBtn" @click="Follow_add()" v-else>关注</span>
									<!-- <span class="lastsedd_1 pend" @click="gosx(contDat.user_info)">私信</span> -->
								</div>
								
								
					
							</div>
						</div>
						<div class="seed2_1_2" v-if="contDat.more_work && contDat.more_work.length>0">
							<div class="seed2_1_2_1 pend" @click="goOpen('#/works?id='+contDat.user_info.open_id)">TA的更多作品</div>
							<div class="seed2_1_2_1x1">
							<div  class="seed2_1_2_2" v-for="(el,index) in contDat.more_work" :key="index">
								<box_a :tjData="bdtjdta" :el="el"></box_a>
							</div>
							</div>
							<div v-if="isYl" class="zdCen"></div>
						</div>
						<div class="seed2_1_2xx" v-else>
							你正在浏览TA首次发布的作品<br/>作为老前辈, 送个赞鼓励下吧~
							<span style="margin: 10px 0px 10px 0px;" class="btns pend seed1_2_5xx" @click="addLikeNe('创作者信息-更多作品-推荐','work',contDat.work_id,contDat)"><img class="svgImgx2" :class="contDat.liked?'likeis':''" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/cent/sc_icon_tj.svg"/>{{contDat.liked?'已推荐':'推荐'}}</span>
						</div>
					</div>
				</div>
			</div>
		<RPT ref="report"></RPT>
		<unfollow @sussFn="unfollowSu" @suUnFn="showUnfoolow" ref="unfollow"></unfollow>
		<fxd :shareData="shareData" ref="fxd"></fxd>
		<TcBox :config="outcx"  @qFn="delComment" ref="tcBox"></TcBox>
		<loginDialog ref="logindialog" :config="outc"></loginDialog>
	</div>
</template>

<script>
import Input from '../../components/input'
import {Message} from 'element-ui'
import RPT from '../../components/report'
import fxd from '../../components/share';
import box_a from '../../components/box_a';
import unfollow from '../../components/unfollow';
import TcBox from '../../components/TcBoxQr';

import pTop from '../../components/postionTop';
import loginDialog from '../../components/loginDialog';
export default {
	components:{Input,RPT,fxd,box_a,TcBox,unfollow,pTop,loginDialog},
	data(){
		return{
			topCn:{
				min:110,
			},
			isYl:'',
			
			new_c_3focus:'',
			outcx:{
				title:'删除评论',
				scroll:1,
				cent:'确定删除该条评论?',
			},
			isfix:'',
			shareData:{},
		    isRep:false,
			open_id:'',
            link_id:'',
            position:'',
			pl:'',
			backHig:'height:40px',
			bdtjdta:[['详情页','创作者信息-更多作品-作品'],['详情页','创作者信息-更多作品-创作者']],
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
			userTk:'他人视角-',
			isftype:'',
			outc:{
				num:'',
				scroll:2,
			}
		}
	},
	mounted: function () {
		this.init();
		
	}, 
	methods: {
		isLick(a){
			
			if(a){
				return 'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/see/dz_red.svg'
			}
			return 'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/works/dz.svg';
		},
		
		
		xsfn(){
			if(this.isYl){return}
			if(this.pl2){
				return
			}
			setTimeout(()=>{
				if(this.plType==1){return;}
				
				this.$set(this.onhfObj,'isshowfh','');
				this.pl2='';
			},200)
		},
		sqfs(){
			if(this.isYl){return}
			this.new_c_3focus = 'new_c_3focus';
		},
		sqjd(){
			if(this.isYl){return}
			if(this.zkMyFun.checkWz(this.pl)!=false){
				return
			}
			this.new_c_3focus = '';
		},
		showTc(){
			if(this.isYl){return}
			this.$refs.tcBox.show();
		},
		showUnfoolxow(){
			if(this.isYl){return}
			this.bdtj('作品详情','他人视角-取消关注','--');
			this.$refs.unfollow.setFollowId(this.contDat.user_info.open_id);
		},
		showUnfoolow(){

			this.contDat.user_info.follow_flag=0;
		},
		unfollowSu(){
			if(this.isYl){return}
			this.contDat.user_info.follow_flag=0;
		},

		addCommentNe(a,b,c,d){
			if(this.isYl){return}
			this.bdtj('详情页',a,'--');
			this.addComment(b,c,d);
		},
		addLikeNe(a,b,c,d){
			if(this.isYl){return}
			this.bdtj('详情页',a,'--')
			this.addLike(b,c,d);
		},
		goOpen(ud){
			if(this.isYl){return}
			window.open(ud);
		},
		gopl(){		
			if(this.isYl){return}
			this.bdtj('作品详情','顶部栏-评论icon','--');
			document.documentElement.scrollTop =this.$refs.firstAnchor.offsetTop;
			document.body.scrollTop =this.$refs.firstAnchor.offsetTop;
		},
		goUserzy(){
			if(this.isYl){return}
			this.bdtj('作品详情','自己视角-进入主页','--');
			this.$router.push({path: '/works',query:{id:window.userInfo.open_id}})
		},
		gosx(el){
			if(this.isYl){return}
			if(!window.userInfo){
				this.$refs.logindialog.show();
				this.outc.num = 1;
				return
			}
			this.bdtj('作品详情','他人视角-私信','--');
			let pr = {
				open_id:el.open_id,
				avatar:el.avatar,
				username:el.username,
				city:el.city,
				vocation:el.vocation,
			};
			this.$router.push({path:'/chat',query:pr});
		},
		goFans(d,id,a){
			if(this.isYl){return}
			if(a){
				this.bdtj('作品详情',a,'--');
			}
			this.$router.push({path:d,query:{id:id}});
		},
		fxclick(){
			if(this.isYl){return}
			this.bdtj('详情页','分享','--');
			this.$refs.fxd.showShare(true);
		},
		goUser(id,a){
			if(this.isYl){return}
			if(a){
				this.bdtj('详情页',a,'--');
			}
		
			this.$router.push({path: '/works',query:{id:id}})	
		},
		showReport(id,lid,ad){
			if(this.isYl){return}
			this.bdtj('详情页','举报'+ad,'--');
			this.$refs.report.showReport(id,lid,ad);
		},
		addLike(type,id,obj,wz){
			if(this.isYl){return}
			if(!window.userInfo){
				this.$refs.logindialog.show();
				this.outc.num = 1;
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
				if(da=='error'){
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
			if(this.isYl){return}
			if(this.follwTyle==1){
				return
			}
			this.follwTyle=1;
			let pr = {
				access_token:window.userInfo.access_token,
				follow_id:this.contDat.user_info.open_id
			};
			this.api.Follow_del(pr).then((da)=>{
				if(da=='error'){
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
			if(this.isYl){return}
			this.bdtj('作品详情','他人视角-关注','--');
			if(!window.userInfo){
				this.$refs.logindialog.show();
				this.outc.num = 1;
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
				if(da=='error'){
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
			if(this.isYl){return}
			this.$router.push({path:'/cont',query:{id:id}});
		},
		downFile(flid){
			if(this.isYl){return}
			this.bdtj('详情页','下载附件','--');
			window.open(flid);
		},
		delComment(){
			if(this.isYl){return}
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
				this.$refs.tcBox.close();
			}).catch(()=>{
				this.deletType = 0;		
			});
			

		},
		isoutTime(t,id){	
		
			return (((new Date()).valueOf()- (new Date(t)).valueOf(t))>=(5*60*1000)) || window.userInfo.open_id!=id;	
		},
		showHb(a,fid,cid,on,on2){
			if(this.isYl){return}
			this.bdtj('详情页',a,'--');	
			this.deletData = {
				work_id:this.work_id,
				comment_id:cid,
				feed_id:fid,				
			};
			this.$refs.tcBox.show();
			
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

		addmpl(){
			if(this.isYl){return}
			this.bdtj('作品详情','查看更多评论','--');
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
			this.isYl = this.$route.name=='conts'?'1':'';
			this.hfData = [];			
			this.work_id = this.$route.query.id;
			this.getCommentList();
			window.onscroll = ()=>{
				
				let t = document.documentElement.scrollTop||document.body.scrollTop;
			
				if(this.topTyped==0){
					if(t>188){
						this.topTyped=true;
						this.isfix = 'isfix';
					}
					return
				}
				if(t<=188){
					this.topTyped=false;
					this.isfix = '';
				}

			}
			
			let pr = {
				work_id:this.work_id,
			}
			if(this.$route.query.tmp_token){
				pr.tmp_token = this.$route.query.tmp_token;
			}
			if(window.userInfo){
				this.page.access_token = window.userInfo.access_token;
				this.page.open_id = window.userInfo.open_id;
				this.page.avatar = window.userInfo.avatar;
				this.page.username = window.userInfo.username;
				pr.access_token =this.page.access_token;
			}
			this.api.getWorkDetail(pr).then((da)=>{
				if(da=='error'){return}
				if(da.length==0){
					Message({message: '该作品已删除'});	
					
					this.$router.push({path: '/error'});
					
					return
				}
				da.labels = JSON.parse(da.labels);
			
				da.content = da.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
					let str = capture.split('?')[0];
					let reg2 = /^(\s|\S)+(.jpeg|.JPEG|.jpg|.png|.JPG|.PNG)$/;			
					if (reg2.test(str)) {
					  str+='?x-oss-process=image/resize,w_870';					  
					  match = match.replace(/(src="=?).+(?=")/i,'src="'+str);
					}
				  return match;
				});
				this.contDat = da;
			
				this.shareData = {
					titlec:'作品分享',
					url:location.origin+'/aindex.html#/cont?id='+this.$route.query.id,
					title:this.contDat.work_name+'-狮圈儿创作者平台',
					pics:this.contDat.face_pic,
					desc:'惊现大神快来膜拜',
					summary:this.contDat.work_name+'-狮圈儿创作者平台',
					bdtj:['详情页','分享弹窗-']
				};
				
				document.title=this.contDat.work_name+'-狮圈儿（Zoocreators）';
				this.$refs.fxd.setUrl(this.shareData);
				if(window.userInfo && window.userInfo.open_id==da.user_info.open_id){
					this.userTk = '自己视角';
					this.show= false;
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
				if(da=='error'){return}
				if(da.data.length==0){
					this.ishavepl=1;
					this.ishavepltip='没有更多评论了!';
				}
				this.hfData = this.hfData.concat(da.data);
				this.hfnum = da.total;
		
            });
		},
		addComment(pl,on,on2){
			if(this.isYl){return}
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
					to_open_id:this.contDat.user_info.open_id,
					content:JSON.stringify((!on && on!=0)?[pl]:[(on2 || on2==0)?'@'+this.hfData[on].sub_comment[on2].username:'@'+this.hfData[on].username,pl]),					
				};				
				if(on || on==0){
					pr.feed_id = this.hfData[on].feed_id;
					pr.to_comment_id = this.hfData[on].comment_id;
					pr.to_open_id = this.hfData[on].open_id;
				}
				if(on2 || on2==0){
					pr.feed_id = this.hfData[on].sub_comment[on2].feed_id;
					pr.to_open_id = this.hfData[on].sub_comment[on2].open_id;
				}
				return pr;
			};			
			let pr = backData(on,on2);
			this.plType=1;
			this.api.addComment(pr).then((da)=>{
				this.plType=0;
				if(da=='error'){return}
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
					if(on2 || on2==0){
						this.$set(this.hfData[on].sub_comment[on2+1],'isshowfh','');
						return
					}else{
						this.$set(this.hfData[on],'isshowsub',1);
						this.$set(this.hfData[on],'isshowsubWZ','收起回复');	
					}	
					this.$set(this.hfData[on],'isshowfh','');	
						
					return
				}			
				
				this.pl = '';
				this.$refs.textadf.style.height = '40px';
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
		chekcont(msg){
			return this.zkMyFun.checkWz(msg);
		},
		
		showFhd(on){
			if(this.isYl){return}
			if(!this.hfData[on].isshowsub){
				this.$set(this.hfData[on],'isshowsub',1);
				this.$set(this.hfData[on],'isshowsubWZ','收起回复');
				this.bdtj('详情页','收起回复','--');
				return
			}
			this.bdtj('详情页','展开回复','--');
			this.$set(this.hfData[on],'isshowsub','');
			this.$set(this.hfData[on],'isshowsubWZ',this.hfData[on].sub_comment.length+'条回复');						
		},
		showFhks(on,a){	
			if(this.isYl){return}
			setTimeout(()=>{
				this.pl2='';
				if(this.$refs.tageds1){
					this.$refs.tageds1[0].monfocus();
				}
				if(this.$refs.tageds2){
					this.$refs.tageds2[0].monfocus();
				}
				
			},100)
			this.bdtj('详情页',a,'--');
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
		
	},
	watch: {	
		'$route': function() {
			this.init();
			
		},
		'pl'(o,b){
			if(o.length>140){
				this.pl = b;
			}
			
			let pod = this.$refs.textadf.style.height?this.$refs.textadf.style.height.split('p')[0]:40;
			this.$refs.textadf.style.height = (+pod+ Math.ceil(this.$refs.textadf.scrollTop) )+'px';
		},
	},

}
</script>

<style>
.wk_c_1{
	background:#fff;
	min-width:1300px;
	height:133px;	
}
.wk_c_1_1{
	position: relative;
	margin: 0 auto;
	width: 1300px;
	text-align: left;
}
.wk_c_1_1>div{
	display: inline-block;
	vertical-align: top;
}
.wk_c_1_1_l_1{
	margin-top: 20px;
	height: 33px;
	font-size:24px;
	color:rgba(30,30,30,1);
	line-height:33px;
}
.wk_c_1_1_l_2,.wk_c_1_1_l_3{
	margin-top: 10px;
	height:20px;
	font-size:14px;
	color:rgba(187,187,187,1);
	line-height:20px;
}
.wk_c_1_1_r{
	position: absolute;
	top: 47px;
	right: 55px;
}

.wk_c_1 .p_isTop{
	z-index: 999;
	top: 0;
	left: 0;
	width: 100%;
	min-width: 1300px;
	height:80px;
	background:rgba(255,255,255,1);
	-webkit-box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
	box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
}
.p_isTop .isno{
	display: none;
}
.p_isTop .wk_c_1_1_l_1{
	margin-top: 0;
	line-height: 80px;
}
.p_isTop .wk_c_1_1_r{
	top: 20px;
}
.is_icon1,.is_icon2{
	display: inline-block;
	vertical-align: top;
}
.is_icon1{
	margin: 9.5px 5px 0 0;
	width: 17px;
}
.is_icon2{
	margin: 10px 6px 0 0;
	width: 15.2px;
}
.p_isTop .isshow{
	display: inline-block;
}

.wk_c_1_1_l_2Tip{
	position: relative;
	display: inline-block;   
	vertical-align: top;
    margin-left: 40px;
    cursor: pointer;
}
.wk_c_1_1_l_2Tip>div{
	display: none;
	position: absolute;
	left: 0;
	bottom: 0;
	-webkit-transform: translate(-50%, 115%);
	transform: translate(-24%, 115%);
	padding: 8px 12px;
	font-size: 12px;
	color: #FFFFFF;
	background: #323232;
	border-radius: 6px;
	z-index: 10;
	white-space: nowrap;
}
.wk_c_1_1_l_2Tip>div:after{
    content: "";
    position: absolute;
    top: -3px;
    left: 25%;
    width: 6px;
    height: 6px;
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    z-index: 9;
    background: #323232;
}
.wk_c_1_1_l_2Tip:hover>div{
	display: block;
}
.wk_c_1_1_l_3 img{
	display: inline-block;
	vertical-align: top;
	margin: 4px 9px 0 40px;
}
.wk_c_1_1_l_3 img.wk_c_1_1_l_3_1{
	margin-top: 3px;
}
.wk_c2{
	text-align: left;
	margin: 20px auto 60px;
	width: 1300px;
}
.wk_c2_l,.wk_c2_r{
	display: inline-block;
	vertical-align: top;
}
.wk_c2_l{
	width:950px;
}
.wk_c2_r{
	margin-left: 20px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	
	width: 260px;
	
	padding: 40px 35px;
	
}
.wk_c2_l1{
	padding: 40px;
	width:870px;
	background:rgba(255,255,255,1);
	border-radius:5px;	
}
.wk_c2_l2{
	margin-top: 20px;
	padding:30px 40px;
	width:870px;
	background:rgba(255,255,255,1);
	border-radius:5px;	
}
.wk_c2_l1_1{
	text-align: left;
	margin-bottom: 40px;
}
.wk_c2_l1_1>p{
	margin-bottom: 30px;
}
.wk_c2_l1_1 img{
	max-width: 100% !important;
	height: auto !important;
}

.wk_c2_l1_2{
	position: relative;
	text-align: left;
    height: 40px;
    line-height: 40px;
	font-size:14px;	
	color:rgba(187,187,187,1);
}
.wk_c2_l1_2>span{
    display: inline-block;
	vertical-align: top;
	margin-top: 9px;
    padding: 1px 8px;
    background: rgba(244,246,249,1);
    border-radius: 5px;
    color: #999999;
    margin-right: 10px;
    line-height: 22px;
    font-size: 12px;
}
.wk_c2_l1_2_1>div{
	display: inline-block;
	vertical-align: top;
}
.wk_c2_l1_2_1>div.iconfont{

	border: none;
	margin: 0;
	font-size:14px;
	line-height: 40px;
	color: #bbb;	
}
.wk_c2_l1_2_1>div.wk_c2_l1_2_1x{
	margin-left: 40px;
	background: #fff;
	box-sizing: border-box;
	border:1px solid rgba(187,187,187,1);
	border-radius: 5px;
	margin-right: 10px;
	font-size: 14px;
	color: #666666;
	text-align: center;
	line-height: 38px;
	padding: 0 15px;
	height: 40px;	
}
.wk_c2_l1_2_1{
	position: absolute;
	right: 0;
	top: 0;
}

.wk_Pl_1{
	text-align: left;
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:20px;
	margin-bottom: 17px;
}
.wk_Pl_2{
	text-align: left;
	display: flex;
}
.wk_Pl_21{
	position: relative;
	flex: 1;
   
}
.wk_Pl_21 .textAmax{
	position: absolute;
	top: 0;
	right: 20px;
	color: #bbb;
	line-height: 40px;
	
}
.new_c_3{
	font-family: PingFang SC Regular,Helvetica,Arial,"sans-serif",microsoft yahei;
	outline:none;
	resize:none;
	background: none;
	border: none;
	width: 100%;
	text-align: left;
	overflow: hidden;
	border-radius: 5px;
	background: #F4F6F9;
	min-height: 20px;
	padding: 10px 114px 10px 20px;
    border-radius: 5px;
    line-height: 20px;
	border: 1px solid #F4F6F9;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	
}
.new_c_3focus{
	border: 1px solid #979797;;
	background: none;
}
.wk_Pl_21 input::-webkit-input-placeholder{color:#666;}
.wk_Pl_21 input::-moz-placeholder{color:#666;}

.myplde{
	text-align: center;
	margin: 77px auto 0;
    font-size: 14px;
    color: #666666;
}
.pl_01x{
	text-align: left;
	margin-top: 30px;
	border-top: 1px solid #E6E6E6;
	padding-top: 26px;
	font-size: 14px;
	color: #666666;
	margin-bottom: 7px;
}
.hfN_01{
	position: relative;
}
.hfN_02{
	position: absolute;
	right: 0;
	top: 0;
	line-height: 20px;
}
.hfN_02_1{
	font-size:14px;
	color:rgba(153,153,153,1);
	line-height:20px;
}
.hfN_02_1>img{
	margin-top: 1px;
	margin-right: 3px;
	display: inline-block;
	vertical-align: top;
}
.pl_02_1:hover .hfN_02_2{
	display: inline-block;
	
}
.hfN_02_2{
	display: none;
	vertical-align: top;
    font-size: 18px;
    color: #bbb;
	line-height: 20px;
	margin-right: 40px;
}
.hfN_02_2>span{
	display: inline-block;
	vertical-align: top;
	margin-left: 3px;
	font-size: 14px;
	line-height: 20px;
}
.seed2_2p{
	text-align: center;
}
.ylzp_0{
	background: #fff;
}
.ylzp_1{
	font-size:16px;
	color:#33B3FF;
	line-height:60px;
	background: rgba(255,81,33,.1);
	height: 60px;
	width: 100%;
	text-align: center;
}
.zdCen{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
