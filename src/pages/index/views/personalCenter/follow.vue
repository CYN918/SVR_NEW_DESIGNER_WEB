<template>
	<div class="csBoxNx1">
		<div class="worksBox">
			<div class="worksBox_1 worksBox_1n_1">
				共关注{{ total+'位创作者'}}
				<div class="worksBox_2__x_1">
					{{sxData[sxOn][sxtj].name}}
					<div class="worksBox_2__x_1_1x_c">
						<div @click="sxFn(index)" :class="sxtj==index?'oncdf':''" v-for="(el,index) in sxData[sxOn]">{{el.name}}</div>
					</div>
				</div>
			</div>
			<list :config="data" ref="listDom">
				<template v-slot:todo="{ todo }">
					<div class="box_2d">
						<img @click="goUser(todo.open_id,'头像')" :src="mJs.Cavars(todo.avatar)">
						<div class="i_listd2_1">
							<div @click="goUser(todo.open_id,'昵称')">{{todo.username}}</div>
							<div>{{todo.province}} | {{todo.city}}</div>
							<div class="i_listd2_d">
								<span  @click="goFans('/followFans',todo.open_id,'')">粉丝<span>{{todo.fans_num}}</span></span>
								<span>人气<span>{{todo.popular_num}}</span></span>
								<span @click="goFans('/works',todo.open_id)">创作<span>{{todo.work_num}}</span></span>
							</div>
							<div>{{todo.personal_sign?todo.personal_sign:'这个人很懒，什么都没说~'}}</div>
							<div class="btns_foll" v-if="!isMe(todo.open_id)">
								<span @click="FollowClick(todo)">
									{{todo.follow_flag | followType}}
								</span>
								
								
								<!-- <span @click="gosx(todo,'私信')">私信</span> -->
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
		<loginDialog ref="logindialog" :config="outc"></loginDialog>

	</div>
</template>

<script>

import {Message} from 'element-ui'
import { Loading } from 'element-ui';
import list from '../../components/list';
import loginDialog from '../../components/loginDialog';
export default {
	name: 'works',
	components:{list,loginDialog},
	data(){
		return {
			data:{
				ajax:{
					url:'followList',					
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
			sxtj:0,
			sxData:[
				[
				{name:'我关注的人',key:1},
				{name:'我的粉丝',key:1},
				],
				[
					{name:'TA关注的人',key:1},
					{name:'TA的粉丝',key:1},
				]
			],
		
			onType:'followList',
			follwTyle:0,
			openOns:'',
			tjZt:'他人视角-',
			outc:{
				num:'',
				scroll:2,
			}
		}
	},
	watch: {	
		'$route': function() {
			this.init();
			this.getData();
		},
	},
	created(){	
		this.init();
	},		
	methods: {
		getData(){
			this.$refs.listDom.getData();
		},
		init(){			
			if(!this.$route.query.id){
				this.$router.push({path:'/index'})	
				return 
			}
			this.sxOn = 1;
			
			if(window.userInfo && this.$route.query.id==window.userInfo.open_id){
				this.sxOn = 0;
				this.tjZt='自己视角-';
			}
			this.data.pr.user_open_id = this.$route.query.id;
		},
		bdtjCom(a){
			this.bdtj('个人主页',this.tjZt+'tag_关注-'+a,'--');
		},
		settotal(n){
			this.total = n;
		},
		gosx(el,a){
			if(!window.userInfo){
				this.$refs.logindialog.show();
				this.outc.num = 1;
				return
			}
			this.bdtjCom(a);
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
		isMe(id){
			if(!window.userInfo){
				return false
			}
			
			return id==window.userInfo.open_id;
		},
		FollowClick(on){
			if(on.follow_flag==0){
				//this.bdtjCom('关注');
				this.bdtj('个人主页','关注Tab页','点击[关注]')
				this.$parent.Follow_add(on.open_id);
				return
			}
			
			//this.bdtjCom('已关注');
			this.$parent.Follow_un(on.open_id);
		},

		sxFn(on){
			if(on==0){
				return
			}
			this.$router.push({path:'/followFans',query:{id:this.$route.query.id}})							
		},
		goUser(on,a){
			//this.bdtjCom(a);
			this.bdtj('个人主页','关注Tab页','进入个人主页')
			this.$router.push({path: '/works',query:{id:on}})	
		},
		backtime(time){		
			return	window.getTimes(time);
		},		
		openxq(on){			
			window.open('#/cont?id='+on)
		},		
		
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
.worksBox_2__x_1{
	cursor: pointer;
	position: absolute;
	right: 0;
	top: 0;
	font-size: 14px;
	color: #444;
	text-align: center;
	width: 95px;
}
.worksBox_2__x_1:after{
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
.worksBox_2__x_1:hover>.worksBox_2__x_1_1x_c{
	display: block;
}
.worksBox_2__x_1_1x_c{
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
.worksBox_2__x_1_1x_c>div{
	line-height: 30px;
	font-size: 14px;
	color: #333333;
}
.worksBox_2__x_1_1x_c>.oncdf{
	color: #33B3FF;
}
.worksBox_2__x_1_1x_c>div:hover{
	background: #E6E6E6;
}

.i_listd2{margin-bottom: 120px;}
.box_2d{
	text-align: left;
	display: block;
	box-sizing: border-box;
	padding-top: 30px;
	background: #FFFFFF;

	border-radius: 5px;
	width: 1300px;
	height: 215px;
	margin: 0 auto 20px;
}
.box_2d>img{
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
</style>
