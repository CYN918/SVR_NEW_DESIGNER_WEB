<template>
	<div>
		<tophead></tophead>
		<div class="worksBox">
			<div class="worksBox_1">
				共{{total}}粉丝
				
				<div class="worksBox_2">
					{{sxData[sxtj].name}}
					<div class="worksBox_2_1">
						<div @click="sxFn(index)" :class="sxtj==index?'oncdf':''" v-for="(el,index) in sxData">{{el.name}}</div>
					</div>
				</div>
			</div>
			<ul v-if="List.length>0" class="i_listd2" >
				<li v-for="(el,index) in List" :key="index">
					<img :src="el.avatar">
					<div class="i_listd2_1">
						<div>{{el.username}}</div>
						<div>{{el.province}} | {{el.city}}</div>
						<div class="i_listd2_d">
							<span>粉丝<span>{{el.fans_num}}</span></span>
							<span>人气<span>{{el.popular_num}}</span></span>
							<span>创作<span>{{el.work_num}}</span></span>
						</div>
						<div>{{el.personal_sign?el.personal_sign:'这个人很懒，什么都没说~'}}</div>
						<div class="btns_foll">
							<span v-if="el.follow_flag==2">互相关注</span>
							<span v-else-if="el.follow_flag==1">已关注</span>
							<span v-else>关注</span>
							<span>私信</span>
						</div>
					</div>
					<div class="lunbox">
						<!-- <div class="lunbox_left">
							<img src="/imge/icon/left.png" alt="">
						</div> -->
						<ul v-if="el.works.length>0">
							<li v-if="index2<3" v-for="(el2,index2) in el.works" :key="index2"><img @click="openxq(el2.work_id)" :src="el2.face_pic"></li>							
						</ul>
						<!-- <div class="lunbox_right">
							<img src="/imge/icon/right.png" alt="">
						</div> -->
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
		
	</div>
</template>

<script>
import tophead from './head';
import { Loading } from 'element-ui';
export default {
	name: 'works',
	components:{tophead},
	data(){
		return {
			banners:[],
			List:[],
			banOn:0,
			page:1,
			limit:40,
			total:0,
			loading: '',
			sxtj:0,
			sxData:[
				{name:'我关注的人',key:1},
				{name:'我的粉丝',key:1},
			],
			sxData2:[
				{name:'TA关注的人',key:1},
				{name:'TA的粉丝',key:1},
			],
			onType:'followList',
			
		}
	},
	mounted: function () {			
		this.followList();
		
	}, 
	methods: {
		sxFn(on){
			this.sxtj = on;
			//this.onType = 'fansList';
		},
		goUser(on){
			this.$router.push({path: '/works',query:{id:this.List[on].user_info.open_id}})	
		},
		backtime(time){
		
			return	window.getTimes(time);
		},	
	
		openxq(on){
			
			window.open('#/cont?id='+on)
		},
		
		followList(){
			let pr = {
				access_token:window.userInfo.access_token,
				user_open_id:this.$route.query.id,
				page:this.page,
				limit:this.limit
			};
			this.api[this.onType](pr).then((da)=>{
				if(!da){
					return
				}
				this.List = da.data;
				this.total = da.total;
				console.log(this.List);
				
			})
		},
		
		getHList(){
			let params = {
				
				user_open_id:this.$route.query.id,
				page:this.page,
				limit:this.limit
			};
			if(window.userInfo){
				params.access_token = window.userInfo.access_token;
			}
			this.loading = Loading.service({ fullscreen: true });
			this.api.likeList(params).then((da)=>{
				this.List = da.data;
				this.total = da.total;
				this.loading.close();
			})
		},
		handleSizeChange(val) {
			this.limit = val;
			this.getHList();
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getHList();
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
	background: #E6E6E6;
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
.i_listd2{margin-bottom: 40px;}
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
	height: 154px;
	white-space: nowrap;
	padding: 2px 0 ;
	width: 760px;
	
}
.lunbox>ul>li{
	width: 240px;
	height: 150px;
	border-radius: 3.28px 3.28px 5px 5px;
	margin-right: 13px;
	overflow: hidden;
}
.lunbox>ul>li>img{
	display: block;
	width: 240px;
	height: 150px;
	-webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    
}
.lunbox>ul>li>img:hover{
	-webkit-transition: -webkit-transform .25s linear;
	-webkit-transform: scale(1.4);
	transition: transform .25s linear;
	transform: scale(1.4);
	cursor: pointer;
}

</style>
