<template>
	<div class="ms_r">
		<div class="ms_r_1">
			
			<div class="ms_r_3" v-if="listData.length>0">
				<div v-for="(el,index) in listData" :key="index">
						<img class="comment_1" @click="goUserIn(index)" src="/imge/svg/GFMRTX.svg" alt="">
						<div class="comment_2 comment_2xss">
							<div class="comment_2_1" @click="goUserIn(index)">{{(el.op==3 || el.op==4)?el.user_info.username:el.title}}<span class="comment_2_2">{{backtime(el.create_time)}}</span></div>
							<div class="comment_2_5" v-html="backCom(el.content)"></div>
						</div>						
				</div>
				<p class="nn_x1">
					<i v-if="getType" class="loading_a m_c"></i>
					<span v-if="!getType && listData.length<this.total" @click="addL" class="btns pend">查看更多信息</span>
					
					
				</p>				
			</div>
			<div v-if="nodata" class="ms_r_2">
				<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/empty_nodata.svg" alt="">
				你的数据去火星了
			</div>
			
		</div>

	</div>
</template>

<script>
import Input from '../../components/input';
import noData from '../../components/nodata'
import {Message} from 'element-ui'
import { Loading } from 'element-ui';
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
			nodata:'',
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
			loading:'',
			getType:'',
		}
	},
	mounted: function () {			
		this.init();
		
	}, 
	methods: {
		backCom(str){
			str = str.replace(/color:#ff5121/, "color:#33B3FF");	
					
			return	str.replace(/color:red/, "color:#33B3FF");		
		},
		
		backTj(n){
			return  n>999?999:n;
		},
		goUserIn(on){
			this.$router.push({path: '/works',query:{id:this.listData[on].user_info.open_id}})	
		},
		addL(){
			this.page++;
			this.getMessgList('add');
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
				if(da=='error'){
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
				
				if(da=='error'){
					return
				}
				this.messgNum = da;
				this.navDta[0].l = 0;
				this.navDta[1].l = this.messgNum.unread_comment_num;
				this.navDta[2].l = this.messgNum.unread_chat_num;
		
			})
		},
		
		getMessgList(type){
			if(this.getType==1){
				return
			}
			this.getType = 1;
			this.loading = Loading.service({target:'.jloadBox', fullscreen: true,background:'rgba(0,0,0,0)' });
			this.api.getMessgList({
				type:'notify',
				page:this.page,
				limit:this.limit
			}).then((da)=>{
				this.getType = '';
				this.loading.close();
				if(da=='error'){this.setNoData(this.listData);return}
				
				this.setNoData(da.data);
				this.total = da.total;
				
				
			
				if(type=='add'){
					this.listData = this.listData.concat(da.data);
					return
				}
			
				this.listData = da.data;

				
				
			}).catch(()=>{
				this.getType = '';
				this.loading.close();
				this.setNoData(this.listData);
			});
		},
		setNoData(data){
	
			if(data.length==0){
				this.nodata = 1;
				return
			}
			this.nodata = '';
		},


	}
}
</script>

<style>
	
	
	
.comment_2xss{
	margin-right: 0;
    width: 830px;
}
.comment_2xss>.comment_2_5{
	max-height: none;
}
.setUserBoxs_cent2{
	display: inline-block;
    margin-bottom: 60px;
}
.ms_r_3 > div{
	background: #FFFFFF;
    border-radius: 5px;
    width: 910px;
    padding: 20px 30px;
    margin-bottom: 20px;
}
.nn_x1{text-align: center;padding-top: 40px;}
</style>
