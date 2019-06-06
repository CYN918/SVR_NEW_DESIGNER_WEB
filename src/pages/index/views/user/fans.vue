<template>
	<div>
		<tophead></tophead>
		<div class="worksBox csBox">
			<div class="worksBox_1">
				共{{ total+'位粉丝'}}
				<div class="worksBox_2">
					{{sxData[sxOn][sxtj].name}}
					<div class="worksBox_2_1">
						<div @click="sxFn(index)" :class="sxtj==index?'oncdf':''" v-for="(el,index) in sxData[sxOn]">{{el.name}}</div>
					</div>
				</div>
			</div>
			<list :config="data" ref="listDom">
				<template v-slot:todo="{ todo }">
					<div class="follwfs">
						<img @click="goUser(todo.open_id)" class="follwfs_1" :src="todo.avatar">
						<div @click="goUser(todo.open_id)" class="follwfs_2">{{todo.username}}</div>
						<div class="follwfs_3">{{todo.province}} | {{todo.city}}</div>
						<div class="follwfs_4">
							<span @click="goFans('/followFans',todo.open_id)"><span>粉丝</span>{{todo.fans_num}}</span>
							<span><span>人气</span>{{todo.popular_num}}</span>
							<span @click="goFans('/works',todo.open_id)"><span>创作</span>{{todo.work_num}}</span>
						</div>
						<div class="follwfs_5" v-if="!isMe(todo.open_id)">
							<span @click="gosx(todo)">私信</span>
							<span @click="showFpllwodel(todo)" v-if="todo.follow_flag==2">互相关注</span>
							<span @click="showFpllwodel(todo)" v-else-if="todo.follow_flag==1">已关注</span>
							<span @click="Follow_add(todo)" v-else>关注</span>						
						</div>
						<div class="follwfs_5" v-else>
							<span @click="goHome">进入主页</span>							
						</div>
					</div>
				</template>			
			</list>	
		</div>
		
		<div v-show="isshowd2" class="loginoutBox">
			<div class="loginoutBox1">
				<img @click="hindHb2()" class="loginoutBox2" src="/imge/cj_00.png">
				<div class="loginoutBox3">是否取消关注?</div>
				<div class="loginoutBox4"><span @click="hindHb2()">取消</span><span @click="Follow_del()">确定</span></div>
			</div>
		</div>
	</div>
</template>

<script>
import tophead from './head';
import {Message} from 'element-ui'
import { Loading } from 'element-ui';
import list from '../../components/list';
export default {
	name: 'works',
	components:{tophead,list},
	data(){
		return {
			data:{
				ajax:{
					url:'fansList',					
				},
				pr:{}

			},	
			isshowd2:false,
			banners:[],
			List:[],
			banOn:0,
			page:1,
			limit:40,
			total:0,
			loading: '',
			sxOn:0,
			sxtj:1,
			sxData:[
				[{name:'我关注的人',key:1},{name:'我的粉丝',key:1}],
				[{name:'TA关注的人',key:1},{name:'TA的粉丝',key:1}]
			],		
			follwTyle:0,
			openOns:'',
		}
	},
	
	watch: {	
		'$route': function() {
			this.followList();
		},
	},
	created(){
		this.init();
	},	
	methods: {
		init(){			
			if(!this.$route.query.id){
				this.$router.push({path:'/index'})	
				return 
			}
			if(!window.userInfo){
				this.sxOn = 1;
			}else
			if(this.$route.query.id!=window.userInfo.open_id){
				this.sxOn = 1;
			}
			this.data.pr.user_open_id = this.$route.query.id;
		},
		settotal(n){
			this.total = n;
		},
		gosx(da){
			let pr = {
				open_id:da.open_id,
				avatar:da.avatar,
				username:da.username,
				city:da.city,
				vocation:da.vocation,
			};
			this.$router.push({path:'/chat',query:pr});			
		},
		goFans(d,id){
			this.$router.push({path:d,query:{id:id}});
		},
		goHome(){
			this.$router.push({path:'/works',query:{id:window.userInfo.open_id}});			
		},
		isMe(id){
			if(!window.userInfo){
				return false
			}
			
			return id==window.userInfo.open_id;
		},
		showFpllwodel(on){
			this.isshowd2 = true;
			this.openOns = on;
		},
		Follow_del(){
			if(!this.openOns){
				return
			}
			
			if(this.follwTyle==1){
				return
			}
			this.follwTyle=1;
			let pr = {
				access_token:window.userInfo.access_token,
				follow_id:this.openOns.open_id
			};
			this.api.Follow_del(pr).then((da)=>{
				if(!da){
					this.follwTyle=0;
					return
				}
				this.follwTyle=0;
				this.hindHb2();
				Message({message: '取消关注成功'});
				this.openOns.follow_flag = 0;
				
			}).catch(()=>{
				this.follwTyle = 0;		
			});
		},
		Follow_add(on){
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
				follow_id:on.open_id
			};
			this.api.Follow_add(pr).then((da)=>{
				if(!da){
					this.follwTyle=0;
					return
				}
				on.follow_flag = da.follow_flag;
				this.follwTyle=0;
				Message({message: '关注成功'});
			}).catch(()=>{
				this.follwTyle = 0;		
			});
			
		
		},
		hindHb2(){
			this.isshowd2 = false;
			this.openIdd = '';
		},
		sxFn(on){
			if(on==1){
				return
			}
			this.$router.push({path: '/follow',query:{id:this.$route.query.id}})	
		},
		goUser(){
			this.$router.push({path: '/works',query:{id:on}})	
		},
		backtime(time){
		
			return	window.getTimes(time);
		},	
	
		openxq(on){
			
			window.open('#/cont?id='+on)
		},
		
		followList(){
			let pr = {
				
				user_open_id:this.$route.query.id,
				page:this.page,
				limit:this.limit
			};
			if(!window.userInfo){
				this.sxOn = 1;
			}
			if(window.userInfo){
				pr.access_token = window.userInfo.access_token;
				if(this.$route.query.id!=window.userInfo.open_id){
					this.sxOn = 1;					
				}
			}
	
			this.api.fansList(pr).then((da)=>{
				if(!da){
					return
				}
				this.List = da.data;
				this.total = da.total;
				document.documentElement.scrollTop =0;
				document.body.scrollTop =0;
				
			})
		},
		
		
		handleSizeChange(val) {
			this.limit = val;
			this.followList();
		},
		handleCurrentChange(val) {
			this.page = val;
			this.followList();
		}
	}
}
</script>

<style>
.worksBox{
	margin: 17px auto 0;
}
.worksBox_1{
	position: relative;
	width: 1300px;
	margin: 0 auto 17px;
	text-align: left;
	
}
.worksBox_2{
	cursor: pointer;
	position: absolute;
	right: 0;
	top: 0;
	font-size: 14px;
	color: #666666;
	text-align: center;
	width: 95px;
}
.worksBox_2:after{
	content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    border: 1px solid #666;
    border-bottom: 0;
    border-right: 0;
	margin-left: 8px;
    transform: rotate(-135deg);
    transform-origin: 70% 20%;
}
.worksBox_2:hover>.worksBox_2_1{
	display: block;
}
.worksBox_2_1{
	display: none;
	position: absolute;
	top: 19px;
	right: 0;
	z-index: 9;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 95px;
	padding: 10px 0;
	
}
.worksBox_2_1>div{
	line-height: 30px;
	font-size: 14px;
	color: #333333;
}
.worksBox_2_1>.oncdf{
	color: #FF5121;
}
.worksBox_2_1>div:hover{
	background: #E6E6E6;
}

.follwfs{
	display: inline-block;
	text-align: center;
	padding-top: 50px;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 310px;
	height: 300px;
	margin: 0 20px 20px 0;
}
.follwfs_1{
	cursor: pointer;
	display: block;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	margin: 0 auto 16px;
}
.follwfs_2{
	text-align: center;
	font-size: 16px;
	color: #1E1E1E;
	margin-bottom: 2px;
}
.follwfs_3{
	text-align: center;
	font-size: 12px;
	color: #999999;
	margin-bottom: 25.2px;
}
.follwfs_4>span{
	cursor: pointer;
	width: 33%;
	display: inline-block;
	font-size: 16px;
	color: #1E1E1E;
	text-align: center;
}
.follwfs_4>span:nth-child(2){
	cursor: initial;
}
.follwfs_4>span>span{
	display: block;
	font-size: 12px;
	color: #999999;
	margin-bottom: 1.5px;
}
.follwfs_4{
	margin-bottom: 25.3px;
}
.follwfs_5>span{
	display: inline-block;
	border: 1px solid #979797;
	border-radius: 5px;
	width: 118px;
	height: 38px;
	line-height: 38px;
	font-size: 14px;
	color: #666666;
	text-align: center;
	margin:0 10px;
	cursor: pointer;
}
.follwfs_5>span:last-child{
	background: #FF5121;
	border-color: #FF5121;
	color: #fff;
}
</style>
