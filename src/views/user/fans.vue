<template>
	<div>
		<tophead></tophead>
		<div class="worksBox">
			<div class="worksBox_1">
				共{{ total+'位粉丝'}}
				<div class="worksBox_2">
					{{sxData[sxOn][sxtj].name}}
					<div class="worksBox_2_1">
						<div @click="sxFn(index)" :class="sxtj==index?'oncdf':''" v-for="(el,index) in sxData[sxOn]">{{el.name}}</div>
					</div>
				</div>
			</div>
			<ul v-if="List.length>0" class="follwfs">
				<li v-for="(el,index) in List" :key="index">
					<img @click="goUser(index)" class="follwfs_1" :src="el.avatar">
					<div @click="goUser(index)" class="follwfs_2">{{el.username}}</div>
					<div class="follwfs_3">{{el.province}} | {{el.city}}</div>
					<div class="follwfs_4">
						<span @click="goFans('/followFans',el.open_id)"><span>粉丝</span>{{el.fans_num}}</span>
						<span><span>人气</span>{{el.popular_num}}</span>
						<span @click="goFans('/works',el.open_id)"><span>创作</span>{{el.work_num}}</span>
					</div>
					<div class="follwfs_5" v-if="!isMe(el.open_id)">
						<span>私信</span>
						<span @click="showFpllwodel(index)" v-if="el.follow_flag==2">互相关注</span>
						<span @click="showFpllwodel(index)" v-else-if="el.follow_flag==1">已关注</span>
						<span @click="Follow_add(index)" v-else>关注</span>						
					</div>
					<div class="follwfs_5" v-else>
						<span @click="goHome">进入主页</span>							
					</div>
				</li>
				
			</ul>
			<div class="pagesddd"><img v-if="List.length==0" class="wusj2" src="/imge/wsj2.png" alt=""></div>
			<el-pagination v-if="List.length>0" class="pagesddd"
			background
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="page"
			:page-sizes="[40, 80, 120, 160]"
			:page-size="limit"
			layout="prev,pager, next,sizes, jumper"
			:total="total">   
			</el-pagination>
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
export default {
	name: 'works',
	components:{tophead},
	data(){
		return {
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
	mounted: function () {			
		this.followList();
		
	}, 
	watch: {	
		'$route': function() {
			this.followList();
		},
	},
	methods: {
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
			if(!this.openOns && this.openOns!=0){
				return
			}
			
			if(this.follwTyle==1){
				return
			}
			this.follwTyle=1;
			let pr = {
				access_token:window.userInfo.access_token,
				follow_id:this.List[this.openOns].open_id
			};
			this.api.Follow_del(pr).then((da)=>{
				if(!da){
					this.follwTyle=0;
					return
				}
				this.follwTyle=0;
				this.hindHb2();
				Message({message: '取消关注成功'});
				if(this.sxtj==0){
				
					this.List.splice(this.openOns,1);
				
					return
				}
				this.List[this.openOns].follow_flag = 0;
				
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
				follow_id:this.List[on].open_id
			};
			this.api.Follow_add(pr).then((da)=>{
				if(!da){
					this.follwTyle=0;
					return
				}
				this.List[on].follow_flag = da.follow_flag;
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
		goUser(on){
			this.$router.push({path: '/works',query:{id:this.List[on].open_id}})	
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
.i_listd2>li{
	text-align: left;
	display: block;
	box-sizing: border-box;
	padding-top: 30px;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 1300px;
	height: 215px;
	margin: 0 auto 20px;
}
.i_listd2{margin-bottom:120px;}
.i_listd2>li>img{
	display: inline-block;
	margin: 0 20px 0 30px;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	
}
.i_listd2_1{
	display: inline-block;
	vertical-align: top;
}
.i_listd2_1>div:nth-child(1){
	margin-top: 10px;
	font-size: 16px;	
	color: #2D2D2D;
	margin-bottom: 2px;
}
.i_listd2_1>div:nth-child(2){
	font-size: 12px;
	color: #999999;
	margin-bottom: 14px;
}
.i_listd2_1>div:nth-child(3){
	margin-bottom: 3px;
}
.i_listd2_1>div:nth-child(4){
	font-size: 12px;
	color: #999999;
	margin-bottom: 17px;
}
.btns_foll>span{
	cursor: pointer;
	display: inline-block;
	border: 1px solid #999999;
	border-radius: 5px;
	width: 98px;
	height: 38px;
	text-align: center;
	line-height: 38px;
	font-size: 14px;
	color: #333333;
	margin-right: 20px;
}
.btns_foll>span:last-child{
	margin-right: 0;
}
.i_listd2_d>span{
	display: inline-block;
	margin-right: 20px;
	font-size: 14px;
	color: #1E1E1E;
	font-weight: bold;
}
.i_listd2_d>span>span{
	margin-left: 10px;
}
.lunbox>ul>li{
	display: inline-block;
}
.lunbox{
	position: relative;
    float: right;
    display: inline-block;
   
    height: 154px;
    overflow: hidden;
	padding: 2px 0;
   

}

.lunbox:hover>.lunbox_left,.lunbox:hover>.lunbox_right{
	display: block;
}

.lunbox_left,.lunbox_right{
	cursor: pointer;
	display: none;
	position: absolute;
	top: 3px;
	background: rgba(0,0,0,.3);
	width: 40px;
	height: 152px;
	z-index: 9;
}

.lunbox_left{
	left: 0;
}
.lunbox_left>img,.lunbox_right>img{
    display: block;
    margin: 61px auto 0;
    width: 28px;
}
.lunbox_right{
	right: 0;
}
.lunbox>ul{
	overflow: hidden;
	height: 186px;
	white-space: nowrap;
	

	
}
.lunbox>ul>li{
	
	width: 248px;
	height: 186px;
	border-radius: 3.28px 3.28px 5px 5px;
	margin-right: 13px;
	overflow: hidden;
}
.lunbox>ul>li>img{
	display: block;
	width: 248px;
	height: 186px;
	-webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    
}
.lunbox>ul>li>img:hover{
	-webkit-transition: -webkit-transform .1s linear;
	-webkit-transform: scale(1.1);
	transition: transform .1s linear;
	transform: scale(1.1);
	cursor: pointer;
}
.follwfs{
	width: 1300px;
	margin: 0 auto 120px;
	text-align: left;
}
.follwfs>li{
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
.follwfs>li:nth-child(4n+4){
	margin-right: 0;
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
