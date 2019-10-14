<template>
	<div class="csBoxNx1">
		<div class="worksBox csBox">
			<div class="worksBox_1 worksBox_1n_1">
				共{{ total+'位粉丝'}}
				<div class="worksBox_2__x_1">
					{{sxData[sxOn][sxtj].name}}
					<div class="worksBox_2__x_1_1x_c">
						<div @click="sxFn(index)" :class="sxtj==index?'oncdf':''" v-for="(el,index) in sxData[sxOn]">{{el.name}}</div>
					</div>
				</div>
			</div>
			<list :config="data" ref="listDom">
				<template v-slot:todo="{ todo }">
					<div class="follwfsm">
						<img @click="goUser(todo.open_id,'头像')" class="follwfs_1" :src="todo.avatar">
						<div @click="goUser(todo.open_id,'昵称')" class="follwfs_2">{{todo.username}}</div>
						<div class="follwfs_3">{{todo.province}} | {{todo.city}}</div>
						<div class="follwfs_4">
							<span @click="goFans('/followFans',todo.open_id)"><span>粉丝</span>{{todo.fans_num}}</span>
							<span><span>人气</span>{{todo.popular_num}}</span>
							<span @click="goFans('/works',todo.open_id)"><span>创作</span>{{todo.work_num}}</span>
						</div>
						<div class="follwfs_5" v-if="!isMe(todo.open_id)">
							<span @click="gosx(todo,'私信')">私信</span>
							<span @click="FollowClick(todo)">{{todo.follow_flag | followType}}</span>										
						</div>
						<div class="follwfs_5" v-else>
							<span @click="goHome">进入主页</span>							
						</div>
					</div>
				</template>			
			</list>	
		</div>
		

	</div>
</template>

<script>

import {Message} from 'element-ui'
import { Loading } from 'element-ui';
import list from '../../components/list';
export default {
	name: 'works',
	components:{list},
	data(){
		return {
			data:{
				ajax:{
					url:'fansList',					
				},
				pr:{}

			},	
			total:0,
			sxOn:0,
			sxtj:1,
			sxData:[
				[{name:'我关注的人',key:1},{name:'我的粉丝',key:1}],
				[{name:'TA关注的人',key:1},{name:'TA的粉丝',key:1}]
			],		
			tjZt:'他人视角-',
		}
	},
	
	watch: {	
		'$route': function() {
			this.init();
			this.$refs.listDom.getData();
		},
	},
	created(){
		this.init();
	},	
	methods: {	
		FollowClick(on){
			if(on.follow_flag==0){
				this.bdtjCom('关注');
				this.$parent.Follow_add(on.open_id);
				return
			}			
			this.bdtjCom('已关注');
			this.$parent.Follow_un(on.open_id);
		},
		bdtjCom(a){
			this.bdtj('个人主页',this.tjZt+'tag_粉丝-'+a,'--');
		},
		init(){			
			if(!this.$route.query.id){
				this.$router.push({path:'/index'})	
				return 
			}
			this.sxOn = 1;
			if(window.userInfo && this.$route.query.id==window.userInfo.open_id){
				this.sxOn = 0;
				this.tjZt = '自己视角-';
			}

			this.data.pr.user_open_id = this.$route.query.id;
		},
		settotal(n){
			this.total = n;
		},
		gosx(da,a){
			this.bdtjCom(a);
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
		sxFn(on){
			if(on==1){
				return
			}
			this.$router.push({path: '/follow',query:{id:this.$route.query.id}})	
		},
		goUser(on,a){
			this.bdtjCom(a);
			this.$router.push({path: '/works',query:{id:on}})	
		},

		getData(){
			this.$refs.listDom.getData();
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

.follwfsm{
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
	background: #33B3FF;
	border-color: #33B3FF;
	color: #fff;
}
</style>
