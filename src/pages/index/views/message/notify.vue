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
					<div class="poerrsas"><noData v-if="listData.length==0"></noData></div>
					<div v-for="(el,index) in listData" :key="index">
						<img class="comment_1" @click="goUserIn(index)" :src="el.user_info.avatar" alt="">
						<div class="comment_2">
							<div class="comment_2_1" @click="goUserIn(index)">{{(el.op==3 || el.op==4)?el.user_info.username:el.title}}<span class="comment_2_2">{{backtime(el.create_time)}}</span></div>
							<div class="comment_2_5" v-html="el.content"></div>
						</div>						
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
			navdOn:0,
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
		goUserIn(on){
			this.$router.push({path: '/works',query:{id:this.listData[on].user_info.open_id}})	
		},
		handleSizeChange(val) {
			this.limit = val;
			this.getMessgList();
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getMessgList();
		},
		
		backtime(t){		
			let time = new Date(t*1000);
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
		setNavd(on){
			let urld = ['notify','comment','chat'];
			this.$router.push({path: urld[on]});	
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
				type:'notify',
			};
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
		
		getMessgList(type){

			let pr = {
				access_token:window.userInfo.access_token,
				type:'notify',
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
