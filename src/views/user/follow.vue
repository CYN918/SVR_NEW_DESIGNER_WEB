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
				<li>
					<img src="/imge/nav_tx.png" alt="">
					<div class="i_listd2_1">
						<div>12231</div>
						<div>广东 | 深圳{{List.length}}</div>
						<div class="i_listd2_2">
							<span>粉丝<span>2694</span></span>
							<span>人气<span>2694</span></span>
							<span>创作<span>2694</span></span>
						</div>
						<div>这个人很懒，什么都没说~</div>
						<div>
							<span>互相关注</span>
							<span>私信</span>
						</div>
					</div>
					<div class="lunbox">
						<ul>
							<li><img src="/imge/nav_tx.png" alt=""></li>
							<li><img src="/imge/nav_tx.png" alt=""></li>
							<li><img src="/imge/nav_tx.png" alt=""></li>
							<li><img src="/imge/nav_tx.png" alt=""></li>
						</ul>
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
			
		}
	},
	mounted: function () {			
		//this.getHList();
		
	}, 
	methods: {
		sxFn(on){
			this.sxtj = on;
			
		},
		goUser(on){
			this.$router.push({path: '/works',query:{id:this.List[on].user_info.open_id}})	
		},
		backtime(time){
		
			return	window.getTimes(time);
		},	
	
		openxq(on){
			window.open('#/cont?id='+this.List[on].work_id)
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
}
.i_listd2_1>div:nth-child(2){
	font-size: 12px;
	color: #999999;
}
.i_listd2_1>div:nth-child(3){
	
}
.i_listd2_2>span{
	display: inline-block;
	margin-right: 20px;
	font-size: 14px;
	color: #1E1E1E;
	font-weight: bold;
}
.i_listd2_2>span>span{
	margin-left: 10px;
}
</style>
