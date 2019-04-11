<template>
	<div class="seed">
		<div class="seed1box">
			<div class="seed1">
				<div class="seed1_1">
					{{contDat.work_name}}
				</div>
				<div class="seed1_2">
					<span class="seed1_2_1">{{backtime(contDat.create_time)}}</span>
					<span class="seed1_2_2"><span class="iconfont">&#xe616;</span>{{hfnum}}</span>
					<span class="seed1_2_3"><span @click="addLike('work',contDat.work_id,contDat)" :class="['iconfont',contDat.liked?'likeis':'']">&#xe672;</span>{{contDat.like_num}}</span>
					<span class="seed1_2_4"><span class="iconfont">&#xe64c;</span>分享</span>
					<span class="seed1_2_5" @click="addLike('work',contDat.work_id,contDat)"><span  :class="['iconfont',contDat.liked?'likeis':'']">&#xe652;</span>推荐</span>
				</div>
				<div class="seed1_3">
					{{contDat.classify_1+'-'+contDat.classify_2+'-'+contDat.classify_3}}
					<span  class="iconfont seed1_3_1">&#xe654;
					<div>
						<div>{{'作品版权由【'+contDat.user_info.username+'】解释，'+contDat.copyright}}</div>
					</div>
					</span>			
				</div>
			</div>
		</div>
		<div class="seed2">
			<div class="seed2_1">
				<div class="seed2_1_1" >
					<div class="seed2_1_1_1x" v-html="contDat.content"></div>
					<div class="seed2_1_1_2">
						标签<span v-for="(el,index) in contDat.labels" :key="index">{{el}}</span>
						<span class="iconfont">&#xe73c;</span>
						<div  v-if="contDat.attachment_id" @click="downFile(contDat.attachment.url)">下载附件（{{contDat.attachment.file_size_format}}）</div>
					</div>
				</div>
				<div class="seed2_1_2">
					<div class="seed2_1_2_1">
						<Input class="userBoxd2" v-model="pl"  :oType="'max'" :max="140"   :type="'text'" :placeholder="'说点什么吧'" ref="tageds"></Input>	
						<span @click="addComment()">评论</span>
						<p class="myplde" v-if="hfnum==0">
							还没有人评论，快来抢沙发吧~
						</p>
					</div>
					<div class="pl_01" v-if="hfnum>0">共{{hfnum}}条评论</div>
					<div class="pl_02" v-if="hfnum>0">
						<div v-for="(el,index) in hfData" :key="index">
							
						
							<div  class="pl_02_1">
								<img :src="el.avatar">
								<div>
									<span>{{el.username}}</span><span>{{backtime(el.create_time)}}</span><span v-if="!isoutTime(el.create_time,el.open_id)" class="iconfont pend" @click="showHb(el.feed_id,el.comment_id,index)">&#xe602;</span>
									<div>{{backComt(el.content)[0]}}</div>
								</div>
								<div>
									<span class="hfdZ_3" @click="showFhk(index)">回复</span><span v-if="el.sub_comment && el.sub_comment.length>0" :class="[el.isshowsub?'ishowfud':'','hfdZ_4']" @click="showFhd(index)">{{el.isshowsubWZ?el.isshowsubWZ:'展开共'+el.sub_comment.length+'条回复'}}</span><span class="iconfont pend hfdZ_1"><span @click="addLike('comment',el.comment_id,el)" :class="['iconfont',el.liked?'likeis':'']">&#xe672;</span>{{el.like_num}}</span><span class="iconfont pend hfdZ_2">&#xe664;</span>
									<div class="hfBox" v-if="el.isshowfh">
										<Input class="userBoxd2" v-model="pl2" :oType="'max'" :max="140" :type="'text'" :placeholder="hfnc" ref="tageds1"></Input>	
										<span @click="addfu2(el.feed_id,el.username)">回复</span>
									</div>
								</div>
							</div>
							<div v-if="el.isshowsub" v-for="(el2,index2) in el.sub_comment" :key="index2" class="pl_02_1xxc">
								<div class="pl_02_1">
									<img :src="el2.avatar">
									<div>
										<span>{{el2.username}}</span><span>{{backtime(el2.create_time)}}</span><span v-if="!isoutTime(el2.create_time,el2.open_id)" @click="showHb(el2.feed_id,el2.comment_id,index,index2)" class="iconfont pend">&#xe602;</span>
										<div><span class="atren">{{backComt(el2.content)[0]}}</span>{{backComt(el2.content)[1]}}</div>
									</div>
									<div class="yasfh">
										<span class="hfdZ_3" @click="showFhk(index,index2)">回复</span><span class="iconfont pend hfdZ_1"><span @click="addLike('comment',el2.comment_id,el2)" :class="['iconfont',el2.liked?'likeis':'']">&#xe672;</span>{{el2.like_num}}</span><span class="iconfont pend hfdZ_2">&#xe664;</span>
										<div class="hfBox" v-if="el2.isshowfh">
											<Input class="userBoxd2" v-model="pl2" :oType="'max'" :max="140" :type="'text'" :placeholder="hfnc" ref="tageds2"></Input>	
											<span @click="addfu2(el2.feed_id,el2.username)">回复</span>
										</div>
									</div>								
								</div>
							</div>	
								
								
						</div>
						
					</div>	
						
					<div v-if="hfnum>0" class="addmpl" @click="addmpl"><span class="hfdZ_4">{{ishavepltip}}</span></div>	
				</div>
			</div>
			<div class="seed2_2">
				<div class="seed2_1_1" v-if="contDat.user_info">
					<div class="seed2_1_1_1">
						<img class="contavatar" :src="contDat.user_info.avatar" alt="">
						<div>
							<div>{{contDat.user_info.username}}</div>
							<div> {{contDat.user_info.vocation}} | {{contDat.user_info.province}} {{contDat.user_info.city}}</div>
							<div><span v-if="contDat.user_info.is_platform_work">xx</span></div>
						</div>
					</div>
					<div class="seed2_2_1_2">
						<div>粉丝<div>{{contDat.user_info.fans_num}}</div></div>
						<div>人气<div>{{contDat.user_info.popular_num}}</div></div>
						<div>创作<div>{{contDat.user_info.work_num}}</div></div>
					</div>
					<div class="seed2_1_1_3">


						<div v-if="page.open_id==contDat.user_info.open_id"><span>进入主页</span></div>
						<div v-else>
							<span @click="showHb2" v-if="contDat.user_info.follow_flag>0">已关注</span>
							<span @click="Follow_add()" v-else>关注</span>
							<span>私信</span>
						</div>
						
						

					</div>
				</div>
				<div class="seed2_1_2">
					<div class="seed2_1_2_1">TA的更多作品</div>
					<div @click="seeWorks(el.work_id)" class="seed2_1_2_2" v-for="(el,index) in contDat.more_work" :key="index">
						<img :src="el.face_pic" alt="" class="i_listd1">
						<div class="i_listd2">
							<div class="i_listd2_1">
								<span>{{el.work_name}}</span>
								<img v-if="el.is_recommend==1" src="/imge/zs_icon_tj.png" alt="">
							</div>
							<div class="i_listd2_2">
								<span>{{el.classify_1+'-'+el.classify_2}}</span>
								<span>{{backtime(el.create_time)}}</span>
							</div>
							<div class="i_listd2_3">
								<span><img :src="el.user_info.avatar" alt=""></span>
								<div>
								<span class="iconfont pend">&#xe6a2; {{el.view_num}}</span>
								<span class="iconfont pend">&#xe672; {{el.like_num}}</span>
								<span class="iconfont pend">&#xe616; {{el.comment_num}}</span>
								</div>
							</div>
						</div>
					</div>
					
					
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
		
		
		<Report></Report>
	</div>
	
</template>

<script>
import Input from '../components/input'
import {Message} from 'element-ui'
import Report from '../components/report'

export default {
	components:{Input,Report},
	data(){
		return{
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
		}
	},
	mounted: function () {	
		this.init();
		this.getCommentList()
	}, 
	methods: {
		
		addLike(type,id,obj){
			
			if(!window.userInfo){
				this.$router.push({path: '/login'})
				return
			}
			let msg1 = '正在点赞',
			apiname = 'addLike',
			msg2 = '点赞成功',
			numd=1,
			td = true;
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
			console.log(id)
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
				work_id:this.$route.query.id,
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
				this.ishavepltip='没有更多评论了！';				
				return
			}
			this.page.page++;
			this.getCommentList();
		},
		backtime(time){
			return window.getTimes(time)
		},
		init(){		
			// let token = localStorage.getItem('userT');
			let pr = {
				work_id:this.$route.query.id,
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
				if(window.userInfo.open_id==da.user_info.open_id){
				    this.show= false;
				}else {
                    this.show= true;
				}
				console.log(window.userInfo.open_id)
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
		getCommentList(){
			let pr = {
				work_id:this.$route.query.id,
				page:this.page.page,
				limit:this.page.limit,
			}
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
		addComment(){
			if(!window.userInfo){
				this.$router.push({path: '/login'})
				return
			}
			if(this.plType==1){
				Message({message: '评论为空'});
				return
			}
			if(this.pl == "" || this.pl == undefined || this.pl == null || (this.pl.length>0 && this.pl.trim().length == 0)){
			    return
			}  
			let cond = [this.pl];
			
			let pr = {
				work_id:this.$route.query.id,
				content	:JSON.stringify(cond),
			
			};
			
			if(!this.page.access_token){
				Message({message: '请先登录'});
                this.$router.push({path: '/login'})
			}
			
			this.plType=1;
		
			pr.access_token = this.page.access_token;
			this.api.addComment(pr).then((da)=>{
				
				this.hfData.unshift({
					avatar: this.page.avatar,
					comment_id:da.comment_id,
					content: pr.content,
					create_time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
					feed_id:da.comment_id,
					like_num: 0,
					open_id: this.page.open_id,
					username:window.userInfo.username,
					sub_comment:[]

				});

				this.hfnum+=1;
				Message({message: '评论成功'});
				this.plType=0;
				this.$refs.tageds.clearValue();
			}).catch(()=>{
				this.plType=0;
			});
			
		},

		addfu2(fid,name){
			if(this.plType==1){
				Message({message: '评论为空'});
				return
			}
			this.plType=1;
			if(this.pl2 == "" || this.pl2 == undefined || this.pl2 == null || (this.pl2.length>0 && this.pl2.trim().length == 0)){
                return
            }  
			
			let cond = ['@'+name,this.pl2];			
			let pr = {
				work_id:this.$route.query.id,
				content	:JSON.stringify(cond),
			
			};
			if(fid){
				pr.feed_id = fid;
			}
			if(!this.page.access_token){
				Message({message: '请先登录'});
				return
			}
			pr.access_token = this.page.access_token;
			this.api.addComment(pr).then((da)=>{
		
				if(!this.onPl.fj){
					this.onPl.fj = 0;
				}
				
				if(!this.hfData[this.onPl.fj].sub_comment){
				
					this.$set(this.hfData,sub_comment,[])
					
				}
				this.hfData[this.onPl.fj].sub_comment.unshift({
					avatar: this.page.avatar,					
					content: pr.content,
					create_time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
					feed_id: this.hfData[this.onPl.fj].comment_id,
					like_num: 0,
					comment_id:da.comment_id,
					open_id: this.page.open_id,
					username:name,
				});
							
				Message({message: '评论成功'});
				this.plType=0;
                this.$refs.tageds1.clearValue();
				this.$refs.tageds2.clearValue();
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
			this.getCommentList()
		}
	},

}
</script>

<style>
.atren{
	font-size: 14px;
	color: #FF5121;
	margin-right: 20px;
}
.seed{
	padding-bottom: 120px;
}
.seed1box{
	min-width: 1300px;
	height: 128px;
	background: #FFFFFF;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);	
	margin-bottom: 20px;
	
}
.seed1{
	width: 1300px;
	margin: 0 auto;
	padding: 15px 0;
	text-align: left;
}
.seed1_1{

	font-size: 24px;
	color: #1E1E1E;
	margin-bottom: 12px;
}
.seed1_2{
	font-size: 14px;
	color: #666666;

	text-align: right;
}
.seed1_2_1{
	float: left;
	padding-top: 8px;
}

.seed1_2_2,.seed1_2_3{
	display: inline-block;
	font-size: 14px;
	color: #999999;
	margin-right: 48px;
}
.seed1_2_2>span,.seed1_2_3>span{
	margin-right: 13px;
}
.seed1_2_4{
	margin-right: 20px;
}
.seed1_2_5,.seed1_2_4{
	cursor: pointer;
	display: inline-block;
	border: 1px solid #979797;
	border-radius: 5px;
	box-sizing: border-box;
	width: 140px;
	height: 38px;
	text-align: center;
	line-height: 38px;
	font-size: 14px;
	color: #1E1E1E;
	box-sizing: border-box;
}
.seed1_2_5>span,.seed1_2_4>span{
	margin-right: 6px;
}
.seed1_2_5{
	margin-right: 50px;
}
.seed1_3{
	font-size: 14px;
	color: #666666;
}
.seed1_3_1{
	display: inline-block;
	position: relative;
	vertical-align: middle;
	margin-left: 45px;
	cursor: pointer;
}
.seed1_3_1>div{
	display: none;
	position: absolute;
    left: 0;
    bottom: 0;
    -webkit-transform: translate(-50%,115%);
    transform: translate(-24%,115%);
    padding: 8px 12px;
    font-size: 12px;
    color: #FFFFFF;
    background: #323232;
    border-radius: 6px;
}
.seed1_3_1>div>div{
	white-space: nowrap;
}
.seed1_3_1>div:before{
	display: none;
	content: "";
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
.seed1_3_1:hover>div:before{
	display: block;
}
.seed1_3_1:hover>div{
	display: block;
}
.seed2{
	width: 1300px;
	margin: 0 auto;
	
}
.seed2>.seed2_2,.seed2>.seed2_1>div{
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;

}

.seed2_1>div:first-child{
	
	padding: 40px;
	margin-bottom: 20px;
}
.seed2_1{
	display: inline-block;
	width: 950px;
	vertical-align: top;
}
.seed2_2{
	display: inline-block;
	width: 330px;
	margin-left: 20px;
	box-sizing: border-box;
	
}
.seed2_1_2{
	padding: 40px;
}
.seed2_1_1_1{
	margin-bottom: 17px;
}
.seed2_1_1_1>img{
	display: inline-block;
	
	
}
.contavatar{
	width: 100px;
	height: 100px;
	border-radius: 50%;
	margin-right: 10px;
	vertical-align: middle;
}
.seed2_1_1_1>div{
	display: inline-block;
	vertical-align: middle;
	text-align: left;
}
.seed2_1_1_1>div>div:nth-child(1){
	font-size: 16px;
	color: #1E1E1E;
	line-height: 35px;
}
.seed2_1_1_1>div>div:nth-child(2){
	font-size: 12px;
	color: #999999;
	margin-bottom: 14px;
}
.seed2_1_1_1>div>div:nth-child(3){
	font-size: 16px;
	color: #1E1E1E;
}
.seed2_2_1_2>div{
	display: inline-block;
	font-size: 12px;
	color: #999999;
	margin-right: 68px;
}
.seed2_2_1_2>div:last-child{
	margin-right: 0;
}
.seed2_2_1_2>div>div{
	margin-top: 7px;
	font-size: 16px;
	color: #1E1E1E;
}
.seed2_2_1_2{
	margin-bottom: 16px;
}
.seed2_1_1_3>div>span{
	cursor: pointer;
	display: inline-block;
	border: 1px solid #979797;
	border-radius: 5px;
	box-sizing: border-box;
	width: 120px;
	height: 40px;
	text-align: center;
	line-height: 40px;
}
.seed2_1_1_3>div>span:hover{
	opacity: .7;
}
.seed2_1_1_3>div>span:first-child{
	background: #FF5121;
	border-color: #FF5121;
	color: #fff;
	margin-right: 20px;
}
.seed2_2>div{
	border-bottom: 1px solid #E6E6E6;
	padding: 41px 30px;
}
.seed2_1_2_1{
	font-size: 16px;
	color: #FF5121;
	margin-bottom: 18px;
}
.seed2_1_2_2{
	background: #F6F6F6;
	border-radius: 5.08px;
	width: 270px;
	margin: 0 auto;
	text-align: left;
}
.seed2_1_2_2>img{
	display: block;
	width: 100%;
	height: 201px;
}
.seed2_1_2_2{
	cursor: pointer;
	margin-bottom: 40px;
}
.seed2_1_2_2:hover{
	opacity: .7;
}
.seed2_1_1_2{
	text-align: left;
}
.seed2_1_1_2>span{
	display: inline-block;
	padding: 2px 5px;
	border: 1px solid #999999;
	border-radius: 5px;
	font-size: 14px;
	color: #999999;
	margin-right: 12px;
}
.seed2_1_1_2>span:first-child{
	margin-left: 18px;
}
.seed2_1_1_2>span.iconfont{
	border: none;
	margin-left: 17px;
	margin-top: 12px;
	float: right;
}
.seed2_1_1_2>div{
	cursor: pointer;
	background: #E6E6E6;
	border-radius: 5px;
	font-size: 14px;
	color: #666666;
	text-align: center;
	line-height: 40px;
	width: 216px;
	height: 40px;

	float: right;
}
.seed2_1_2_1>div{
	position: relative;
	display: inline-block;
	width: 690px;
	height: 40px;
	line-height: 40px;
	text-align: left;
	background: #E6E6E6;
	border-radius: 5px;
	box-sizing: border-box;
	padding: 0 20px;
	font-size: 14px;
	color: #666666;
	
}
.seed2_1_2_1>div>span{
	float: right;
}
.seed2_1_2_1>span{
	cursor: pointer;
	vertical-align: top;
	display: inline-block;
	background: #666666;
	border-radius: 5px;
	width: 160px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	font-size: 14px;
	color: #FFFFFF;
	margin-left: 20px;
}
.seed2_1_2_1 .myInput{
	border:none;
}
.seed2_1_2_1 .myInput input{
	background:none;
}
.seed2_1_2_1 .inptud{
	margin-bottom:0;
}
.pl_01,.pl_02{
	width: 871px;
	margin: 0 auto;
	text-align: left;
}
.pl_01{
	border-top: 1px solid #E6E6E6;
	padding-top: 26px;
	font-size: 14px;
	color: #666666;
	margin-bottom: 7px;
}
.pl_02_1>img{
	display: inline-block;
	width: 44px;
	height: 44px;
	border-radius: 50%;
	margin-right: 15px;
	border-radius: 50%;
}
.pl_02_1>div:nth-child(2){
	display: inline-block;
	font-size: 14px;
	color: #1E1E1E;
	vertical-align: top;

	max-width: 100%;
    word-break: break-all;

    line-height: 21px;
}
.pl_02_1>div:nth-child(2)>span:nth-child(1){
	display: inline-block;
	margin-right: 44px;
	margin-bottom: 12px;
}
.pl_02_1>div:nth-child(2)>span:nth-child(2){
	display: inline-block;
	font-size: 14px;
	color: #999999;
	margin-right: 44px;
}
.pl_02_1>div:nth-child(2)>span:nth-child(3){
	display: inline-block;
	position: relative;
	color: #FF5121;
	
}
.hfdZ_1{
	
}

.pl_02_1>div:nth-child(2)>span:nth-child(4){
	display: block;
	font-size: 14px;
	color: #333333;
	
}

.seed2_1_1_1x img{
	max-width: 100% !important;
	height: auto !important;
}
.pl_02_1>div:nth-child(3){
	margin-top: 31px;
	font-size: 14px;
	color: #1E1E1E;
}
.hfdZ_3{
	margin-right: 32px;
	margin-left: 60px;
	cursor: pointer;
}
.hfdZ_3:hover{
	opacity: .7;
}
.hfdZ_4{
	display: inline-block;
}
.hfdZ_4:after{
content: "";
    display: inline-block;
    width: 8.5px;
    height: 8.5px;
    border: 1px solid #979797;
    border-top: 0;
    border-right: 0;
    margin-left: 15px;
	-webkit-transform: rotate(-45deg) translateY(-5px);
	transform: rotate(-45deg) translateY(-5px);    
    -webkit-transform-origin: 25%;
    transform-origin: 50% 50%;
	
}
.hfdZ_4.ishowfud:after{
	-bwekit-transform: rotate(136deg) translateY(0px) translateX(3px);
	transform: rotate(136deg) translateY(0px) translateX(3px);
}
.hfdZ_1{
	float: right;
	font-size: 14px;
	color: #999999;
	margin-right: 60px;
	
}
.pl_02_1xxc .hfdZ_1{
	margin-right: 0;
}

.hfdZ_1>span{
	margin-right: 12px;
	
}
.hfdZ_2{
    float: right;
    font-size: 17px;
    color: #999999;
    margin: 1px 23px;
	opacity: 0;
}
.pl_02_1:hover .hfdZ_2{
	opacity: 1;
}
.pl_02_1{
	border-bottom: 1px solid #E6E6E6;
	padding: 20px 0;
}
.hfBox{
	display: flex;
	width: 100%;
	margin: 17px auto 0;
}
.hfBox .tip{
	display: none;
}
.hfBox .nubMax{
	display: none;
}
.hfBox .userBoxd2{
	flex: 1;
	margin-left: 58px;
	margin-bottom: 20px;
	
}
.hfBox .myInput{
	border: 1px solid #979797;
	border-radius: 5px;
	padding: 1px;
}
.hfBox span{
	display: inline-block;
	background: #666666;
	border-radius: 5px;
	width: 102px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 14px;
	color: #fff;
	margin-left: 14px;
}
.pl_02_1xxc{
	width: 86%;
	margin: 29px auto;
} 
.addmpl{
	margin-top: 40px;
}
.myplde{
	margin: 77px auto 38px;
	font-size: 14px;
	color: #666666;
}
.likeis{
	color: red !important;
}
</style>
