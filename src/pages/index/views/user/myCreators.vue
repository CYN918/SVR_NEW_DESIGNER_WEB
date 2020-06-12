<template>
	<div>
		<tophead></tophead>
		<div class="worksBox worksBox4">
		<list :config="data" ref="listDom">
			<template v-slot:todo="{ todo }">
			<div class="wdczz">
					<img @click="goUser(todo,'点头像')" :src="mJs.Cavars(todo.avatar)">
					<div class="i_listd2_1">
						<div @click="goUser(todo,'点昵称')">{{todo.username}}</div>
						<div>{{todo.province}} | {{todo.city}}</div>
						<div class="i_listd2_d">
							<span @click="goFans('/followFans',todo.open_id)">粉丝<span>{{todo.fans_num}}</span></span>
							<span>人气<span>{{todo.popular_num}}</span></span>
							<span @click="goFans('/works',todo.open_id)">创作<span>{{todo.work_num}}</span></span>
						</div>
						<div>{{todo.personal_sign?todo.personal_sign:'这个人很懒，什么都没说~'}}</div>
						<div class="btns_foll">
							<span @click="showFpllwodel(todo)" v-if="todo.follow_flag==2">互相关注</span>
							<span @click="showFpllwodel(todo)" v-else-if="todo.follow_flag==1">已关注</span>
							<!-- <span @click="gosx(todo)">私信</span> -->
						</div>
					</div>
					<div class="lunbox">
						
						<ul v-if="todo.works.length>0">
							<li v-if="index2<3" v-for="(el2,index2) in todo.works" :key="index2"><img @click="openxq(el2.work_id)" :src="el2.face_pic"></li>							
						</ul>
						
					</div>
			</div>		
		</template>			
		</list>	
			
		</div>		
		<component v-bind:is="tanData.zj" @suFn="followsuFn"  v-model="tanData" ref="unfollow"></component>
	</div>
</template>

<script>
import tophead from './myHead2';
import {Message} from 'element-ui'
import list from '../../components/list';

import follow_new from '../../components/follow_new';
export default {
	name: 'works',
	components:{tophead,list,follow_new},
	data(){
		return {
			tanData:{},
			data:{
				ajax:{
					url:'followList',					
				},
				pr:{}				
			},	
			List:[],
		}
	},
	created(){
		this.init();
	},	
	
	methods: {
		init(){
			this.data.pr.user_open_id = window.userInfo.open_id;
		},
		gosx(el){	
			//this.bdtj('我的关注','创作者列表','--');
			this.$router.push({path:'/chat',query:{
				open_id:el.open_id,
				avatar:el.avatar,
				username:el.username,
				city:el.city,
				vocation:el.vocation,
			}});
		},
		goFans(d,id){
			this.$router.push({path:d,query:{id:id}});
		},
		showFpllwodel(on){
		
			this.bdtj('我的关注','创作者列表','成功取消关注');
			this.tanData = {
				zj:'follow_new',
				type:'del',	
				id:on.open_id,
			};
		},
		followsuFn(){
			this.$refs.listDom.sxfn();	
		},

		goUser(on,a){
			if(a){
				this.bdtj('我的关注','创作者列表','进入Ta的主页');
			}
			this.$router.push({path: '/works',query:{id:on.open_id}})	
		},
		backtime(time){		
			return	window.getTimes(time);
		},	
	
		openxq(on){
			this.bdtj('我的关注','创作者列表','点击作品');
			window.open('#/cont?id='+on)
		},
		


	}
}
</script>

<style scoped="scoped">
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
	color: #33B3FF;
}
.worksBox_2_1>div:hover{
	background: #E6E6E6;
}

.wdczz>img{
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
	width: 783px;
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
	margin: 0 auto;
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
	width: 33%;
	display: inline-block;
	font-size: 16px;
	color: #1E1E1E;
	text-align: center;
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
	background: #33B3FF;
	border-color: #33B3FF;
	color: #fff;
}
.wsjzt{
	min-height: 602px;
}
.wdczz{
	text-align: left;
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-top: 30px;
    background: #fff;

    border-radius: 5px;
    width: 1300px;
    height: 215px;
    margin: 0 auto 20px;
}
</style>