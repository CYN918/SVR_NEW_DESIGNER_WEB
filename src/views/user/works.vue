<template>
	<div>
		<tophead></tophead>
		<div class="worksBox">
			<div class="worksBox_1">
				共发布{{total}}个作品 
				<div class="worksBox_2">
					{{sxData[sxtj].name}}
					<div class="worksBox_2_1">
						<div @click="sxFn(index)" :class="sxtj==index?'oncdf':''" v-for="(el,index) in sxData">{{el.name}}</div>
					</div>
				</div>
			</div>
			
			<ul v-if="List.length>0" class="i_listd" >
				<li  v-for="(el,index) in List" :key="index">
					<img @click="openxq(index)"  class="i_listd1" :src="el.face_pic" alt="">
					<div class="i_listd2">
						<div @click="openxq(index)" class="i_listd2_1"><span :title="el.work_name">{{el.work_name.slice(0,10)}}</span> <img v-if="el.is_recommend==1" src="/imge/zs_icon_tj.png" alt=""></div>
						<div @click="openxq(index)" class="i_listd2_2"><span>{{el.classify_1_name+'-'+el.classify_2_name}}</span><span>{{backtime(el.create_time)}}</span></div>
						<div class="i_listd2_3">
							<span><img @click="goUser(index)" :src="el.user_info.avatar" alt=""></span>
							
							<div @click="openxq(index)">
								<span class="iconfont pend">&#xe6a2; {{el.view_num}}</span>
								<span class="iconfont pend">&#xe672; {{el.like_num}}</span>
								<span class="iconfont pend">&#xe616; {{el.comment_num}}</span>
							</div>
						</div>
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
				{name:'时间最新',key:1},
				{name:'推荐最多',key:2},
				{name:'评论最多',key:3}
			],
			
		}
	},
	mounted: function () {			
		this.getHList();
		
	}, 
	methods: {
		sxFn(on){
			this.sxtj = on;
			console.log(this.sxtj)
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
			this.api.getUserWorkList(params).then((da)=>{
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
</style>
