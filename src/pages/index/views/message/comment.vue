<template>
	<div class="ms_r">	
		<div class="ms_r_1">
			<div class="ms_r_c_1" v-if="listData.length>0">
				<div v-for="(el,index) in listData" :key="index">
					<img class="comment_1" :src="el.comment.avatar" alt="">
						<div class="comment_2">
							<div class="comment_2_1">{{el.comment.username}}<span class="comment_2_2">{{backtime(el.comment.create_time)}}</span></div>
							<div class="comment_2_3" v-if="el.op_cname=='回复'">
								{{el.op_cname}} 你在原创作品 
								<span class="comment_2_4" @click="goWork(el.work.work_id)">{{el.work.work_name}}</span> 
								的评论
							</div>
							<div class="comment_2_3" v-if="el.op_cname=='评论'">
								{{el.op_cname}}  你的作品 
								<span class="comment_2_4" @click="goWork(el.work.work_id)">{{el.work.work_name}}</span>
							</div>
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
							<div class="hfBox xxbox_c" v-if="el.isshowfh" >
								
								<Input :mblur="xsfn" class="userBoxd2" v-model="plon[index]" :oType="'max'" :max="140" :type="'text'" :ref="'myOn'+index"  :placeholder="hfnc"></Input>	
								<span :class="chekcont()==true?'iscsbtn':''" @click="addfu2(index,el.work.work_id,el.comment.comment_id,el.comment.username,el.comment.feed_id)">回复</span>
							
							</div>
							<div v-if="el.op_cname=='回复' && el.isshowsub" class="comment_2_9">
								<img class="comment_1" :src="el.to_comment.avatar" alt="">
								<div class="comment_2">
									<div class="comment_2_1">{{el.to_comment.username}}<span class="comment_2_2">{{backtime(el.to_comment.create_time)}}</span></div>
									<div class="comment_2_5">{{backcont(el.to_comment.content)}}</div>
								</div>							
							</div>
						</div>
						<img @click="goWork(el.work.work_id)" class="comment_3" :src="el.work.face_pic" alt="">
					</div>
			</div>
			<div v-else class="ms_r_2">
				<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/empty_nodata.svg" alt="">
				你的数据去火星了
			</div>
			<el-pagination class="cmmm_1" v-if="total>10"
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
			hfnc:'请输入',
			messgNum:{},
			navDta:[
				{n:'通知',l:''},
				{n:'评论/回复',l:''},
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
			plon:[],
			plOnd:''
		}
	},
	mounted: function () {			
		this.init();
		
	}, 
	methods: {
		xsfn(){
			setTimeout(()=>{
				this.$set(this.listData[this.plOnd],'isshowfh',false);
			},50)
		},
		backTj(n){
			return  n>999?999:n;
		},
		chekcont(){
			return this.zkMyFun.checkWz(this.pl2);
		},
		handleSizeChange(val) {
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
			this.limit = val;
			this.getMessgList();
		},
		handleCurrentChange(val) {
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
			this.page = val;
			this.getMessgList();
		},
		showFhd(on){
			this.$set(this.listData[on],'isshowsub',this.listData[on].isshowsub?false:true);
		},
		showHF(on){
		
			
			this.plOnd = on;
			this.$set(this.listData[on],'isshowfh',this.listData[on].isshowfh?false:true);
			setTimeout(()=>{				
				this.$refs['myOn'+on][0].monfocus();
				if(!this.plon[on]){
					return
				}
				this.$refs['myOn'+on][0].setData(this.plon[on]);
			},50);
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
		        Message({message: '回复为空'});
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
				if(da=='error'){
					return
				}
				Message({message: '回复成功'});							
				this.$refs['myOn'+on].value = '';
				this.plon[on] = '';
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
				if(da=='error'){
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
			window.open('/#/cont?id='+id);
		
		},
		init(){
			this.pushCk();
			this.getMessgNumber();
			this.getMessgList();
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
			
		},
		pushCk(){
	
			let op = {
				access_token:window.userInfo.access_token,
				type:'comment',
			};
			this.api.Messageread(op).then((da)=>{
				if(da=='error'){
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
				if(da=='error'){
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
				if(da=='error'){return}
				this.listData = da.data;
				this.total = da.total;
			});
		},



	}
}
</script>

<style>
.iscsbtn{
	background: #FF5121 !important;
}
.ms_r_c_1>div{
	background: rgba(255,255,255,1);
    border-radius: 5px;
    padding: 30px;
    box-sizing: border-box;
    margin-bottom: 20px;
}
.ms_r_c_1 .comment_2{
	margin-right: 109px;
}
.cmmm_1{
	padding:40px 0 0;
    margin: 0;
}
</style>
