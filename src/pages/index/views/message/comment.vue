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
				
				<div class="setUserBoxs_cent">
					<div class="poerrsas" v-if="listData.length==0"><noData ></noData></div>
					
					<div v-for="(el,index) in listData" :key="index">
						<img class="comment_1" :src="el.comment.avatar" alt="">
						<div class="comment_2">
							<div class="comment_2_1">{{el.comment.username}}<span class="comment_2_2">{{backtime(el.comment.create_time)}}</span></div>
							<div class="comment_2_3" v-if="el.op_cname=='回复'">{{el.op_cname}} 你在原创作品 <span class="comment_2_4" @click="goWork(el.work.work_id)">{{el.work.work_name}}</span> 的评论</div>
							<div class="comment_2_3" v-if="el.op_cname=='评论'">{{el.op_cname}}  你的作品 <span class="comment_2_4" @click="goWork(el.work.work_id)">{{el.work.work_name}}</span></div>
							<div class="comment_2_5">{{backcont(el.comment.content)}}</div>
							<div>
								<span class="iconfont pend hfdZ_23">
									<span @click="addLike('comment',el.comment.comment_id,el)" :class="['iconfont',el.comment.liked?'likeis':'']">
										&#xe672;
									</span>
									<span class="comment_2_7" @click="showHF(index)">回复</span>
									<span v-if="el.op_cname=='回复'" :class="[el.isshowsub?'ishowfud':'','hfdZ_4 comment_2_7_1']" @click="showFhd(index)">对话记录</span>
								</span>
							</div>
							<div class="hfBox xxbox_c" v-if="el.isshowfh">
								<Input class="userBoxd2" v-model="pl2" :oType="'max'" :max="140" :type="'text'" :placeholder="hfnc" ref="tageds1"></Input>	
								<span @click="addfu2(index,el.work.work_id,el.comment.comment_id,el.comment.username,el.comment.feed_id)">回复</span>
							</div>
							
							<div v-if="el.op_cname=='回复' && el.isshowsub" class="comment_2_9">
								<img class="comment_1" :src="el.comment.avatar" alt="">
								<div class="comment_2">
									<div class="comment_2_1">{{el.comment.username}}<span class="comment_2_2">{{backtime(el.comment.create_time)}}</span></div>
									<div class="comment_2_5">{{backcont(el.comment.content)}}</div>
								</div>							
							</div>
						</div>
						<img @click="goWork(el.work.work_id)" class="comment_3" :src="el.work.face_pic" alt="">
					</div>
					
					
				</div>
			</div>
			
		</div>
		<el-pagination class="pagesdddxf" v-if="total>40"
		background
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page="page"
		:page-sizes="[10, 20, 40, 60]"
		:page-size="limit"
		layout="prev,pager, next,sizes, jumper"
		:total="total">   
		</el-pagination>
	</div>
</template>

<script>
import Input from '../../components/input';
import noData from '../../components/nodata'
import {Message} from 'element-ui'
export default {
	components:{Input,noData},
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
			navdOn:1,
			limit:10,
			total:0,
			page:1,
			onType:'notify',
			listData:[],
			addLink:0,
			plType:0,
			pl2:'',
		}
	},
	mounted: function () {			
		this.init();
		
	}, 
	methods: {
		handleSizeChange(val) {
			this.limit = val;
			this.getMessgList();
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getMessgList();
		},
		showFhd(on){
			this.$set(this.listData[on],'isshowsub',this.listData[on].isshowsub?false:true);
		},
		showHF(on){
			
			this.$set(this.listData[on],'isshowfh',this.listData[on].isshowfh?false:true);
		},
		addfu2(on,work_id,comId,name,fid){
			if(!work_id){
				return
			}
			if(!comId){
				return
			}
			if(!name){
				return
			}
			if(this.plType==1){
				Message({message: '正在回复中'});
				return
			}
			if(this.pl2 == "" 
				|| this.pl2 == undefined 
				|| this.pl2 == null 
				|| (this.pl2.length>0 && this.pl2.trim().length == 0)){
		        Message({message: '评论为空'});
			  	return
		    }
		    this.plType=1;
			let cond = ['@'+name,this.pl2];
			let pr = {
				work_id:work_id,
				content	:JSON.stringify(cond),
				to_comment_id:comId,
			};
			if(fid){
				pr.feed_id = fid;
			}
			pr.access_token = window.userInfo.access_token;
			this.api.addComment(pr).then((da)=>{
				this.plType=0;
				if(!da){
					return
				}
				Message({message: '评论成功'});
				this.showHF(on);
				this.$refs.tageds2.value = '';
				this.pl2 = '';  
			}).catch((err)=>{
				this.plType=0;
						
			});	
		},
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
			if(obj.comment.liked==true){
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
				obj.comment.liked=td;
				
				Message({message: msg2});
				this.addLink=0;					
			}).catch(()=>{
				this.addLink=0;	
			});
		},
		backcont(da){
			let pd = JSON.parse(da);
			if(pd.length>1){
				return pd[1];
			}
			return pd[0];
		},
		backtime(t){
			let time = new Date(t);		
			let ym = time.getMonth()+1;
			let dm = time.getDate();
			if(ym<10){
				ym = '0'+ym;
			}
			if(dm<10){
				dm = '0'+dm;
			}
			return time.getFullYear()+'-'+ym+'-'+dm;
		},
		goWork(id){
			console.log(id);
			this.$router.push({path:'/cont',query:{id:id}});
		},
		init(){
			this.pushCk();
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
	
				
			}
		},
		pushCk(){
	
			let op = {
				access_token:window.userInfo.access_token,
				type:'comment',
			};
			this.api.Messageread(op).then((da)=>{
				if(!da){
					return
				}
			})
		},
		setNavd(on){
			let urld = ['notify','comment','chat'];
			this.$router.push({path: urld[on]});	
		},

		setScll(top){
			
			if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
			
                document.documentElement.scrollTop = Number(top);
            }
            if (document.body) {// all other Explorers
			
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
				this.navDta[0].l = this.messgNum.unread_notify_num;
				this.navDta[1].l = 0;
				this.navDta[2].l = this.messgNum.unread_chat_num;
		
			})
		},
		
		getMessgList(type){

			let pr = {
				access_token:window.userInfo.access_token,
				type:'comment',
				page:this.page,
				limit:this.limit
			};
			this.api.getMessgList(pr).then((da)=>{
				if(!da){return}
				this.listData = da.data;
				this.total = da.total;
			});
		},



	}
}
</script>

<style>

</style>
