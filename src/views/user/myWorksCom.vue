<template>
	<div>
		<tophead></tophead>
		<div class="myAllbox">
			<ul class="myListBox" >
				<li v-for="(el,index) in List" :key="index">
					<div @click="openxq(index)" class="myListBox_1">
						<img class="myListBox_1_1" :src="el.face_pic">
						<div v-if="el.status!=0" :class="['myListBox_1_2',el.status==-2?'wtg':'balck']">{{el.status==0?'待审核':el.status==-2?'未通过':'草稿'}}</div>
					</div>
					<div @click="openxq(index)" class="myListBox_2">
						<span class="myListBox_2_1" :title="el.work_name">{{el.work_name}}</span>
						<img v-if="el.is_recommend==1" class="myListBox_2_2" src="/imge/zs_icon_tj.png">
					</div>
					
					<div @click="openxq(index)" class="myListBox_3">
						<span class="myListBox_3_1">{{el.classify_1+'-'+el.classify_2}}</span>
						<span class="myListBox_3_2">{{backtime(el.create_time)}}</span>
					</div>
					<div class="myListBox_4">
						
						<span class="myListBox_4_1" v-if="el.status!=0">{{el.status==2?'修改设置':'编辑'}}</span>
						<span class="myListBox_4_2" @click="showTopc('delet',index)">删除</span>
					</div>
					
				</li>
			</ul>
			<div class="myWorkNoData"><img v-if="List.length==0" class="wusj2" src="/imge/wsj2.png" alt=""></div>
			<el-pagination v-if="List.length>0" class="myListBox_5"
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
		<div v-show="istopc" class="myListBox_6">
			<div class="myListBox_6_1">
				<img @click="hindTopc" class="myListBox_6_2" src="/imge/cj_00.png" alt="">
				<div v-if="topcType=='set'" class="myListBox_6_3">修改作品设置提交，平台审核通过后即可修改成功</div>
				<div v-if="topcType=='set'" class="myListBox_6_3">确定修改作品设置？</div>
				<div v-if="topcType=='delet'" class="myListBox_6_3">确定删除该作品？</div>
				<div class="myListBox_6_4">
					<span @click="hindTopc">取消</span>
					<span v-if="topcType=='delet'" @click="delWork()" class="myListBox_6_4_2">确定</span>
					<span v-if="topcType=='set'" class="myListBox_6_4_2">确定</span>
				</div>

			</div>
		</div>	
	</div>
</template>

<script>
import tophead from './myHead';
import {Message} from 'element-ui'
import { Loading } from 'element-ui';
export default {
	props:['isType'],
	components:{tophead},
	name: 'myAll',
	data(){
		return {
			istopc:false,
			topcType:'',
			worksType:'',
			banners:[],
			List:[],
			banOn:0,
			page:1,
			limit:40,
			total:0,
			loading: '',
			deletWorkid:'',
			
		}
	},
	mounted: function () {	
		
		this.getHList();
		
	}, 
	methods: {
		showTopc(type,on){
			this.deletWorkon = on;
			this.topcType = type;
			this.istopc = true;
		},
		hindTopc(){
			this.topcType = '';
			this.deletWorkon = '';
			this.istopc = false;
		},
		delWork(){
			if(this.delWorkType==1){
				Message({message: '正在删除请稍候'});
				return
			}
			this.delWorkType=1;
			let pr = {
				access_token:window.userInfo.access_token,
				work_id:this.List[this.deletWorkon].work_id
			};
			this.api.delWork(pr).then((da)=>{
				if(!da){
					this.delWorkType = 0;
					return
				}
				this.List.splice(this.deletWorkon,1)
				Message({message: '删除成功'});
				this.hindTopc();
				this.delWorkType = 0;
			}).catch(()=>{
				this.delWorkType = 0;		
			});
		},
		goUser(on){
			this.$router.push({path: '/works',query:{id:this.List[on].user_info.open_id}})	
		},
		backtime(time){
		
			return	window.getTimes(time);
		},	
		opend(ur){
			if(!ur){return}
			window.open(ur);
		},
		openxq(on){
			window.open('#/cont?id='+this.List[on].work_id)
		},
	
		checkBan(on){
			this.banOn = on;
		},
		checkBan1(){
			if(this.banOn>0){
				this.banOn--;
				return
			}
			this.banOn = this.banners.length-1;
		},
		checkBan2(){
			if(this.banOn<this.banners.length-1){
				this.banOn++;
				return
			}
			this.banOn = 0;
		},
		getHList(){
			console.log(this.$parent.isType)
			
			let params = {
				access_token:window.userInfo.access_token,
				status:this.$parent.isType,
				page:this.page,
				limit:this.limit
			};
			this.loading = Loading.service({ fullscreen: true });
			this.api.getSelfWorkList(params).then((da)=>{
				this.loading.close();
				if(!da){
					return;
				}
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
.myAllbox{
	text-align: left;
	width: 1300px;
	margin: 20px auto 0;
}
.myListBox>li{
	display: inline-block;
	background: #F6F6F6;
	border-radius: 5.08px;
	margin: 0 20.2px 19.7px 0;
	width: 309.8px;
	height: 340.3px;
	overflow: hidden;
}
.myListBox>li:nth-child(4n+4){
	margin-right: 0;
}
.myListBox_1{
	position: relative;
	width: 309.8px;
	height: 231.6px;
	overflow: hidden;
}
.myListBox_1>.myListBox_1_1{
	cursor: pointer;
	width: 309.8px;
	height: 231.6px;
	-webkit-transition: transform .25s linear;
	transition: transform .25s linear;
}
.myListBox_1:hover>.myListBox_1_1{
	-webkit-transform: scale(1.04);
	transform: scale(1.04);
}
.myListBox_1>.myListBox_1_2{
	cursor: pointer;
	position: absolute;
	top: 0;
	right: 0;
	border-radius: 0 5.08px 0 5.08px;
	width: 99.6px;
	height: 39.6px;
	line-height: 39.6px;
	text-align: center;
}
.myListBox_1>.balck{
	background: rgba(0,0,0,.5);
	color: #fff;
}
.myListBox_1>.wtg{
	
	color: #fff;
	background: rgba(255,0,0,.7);
}
.myListBox_2{
	text-align: left;
	margin: 6.4px 10px 3.1px;
}
.myListBox_2>.myListBox_2_1{
	cursor: pointer;
	display: inline-block;
	max-width: 271.89px;
	font-size: 16.25px;
	color: #1E1E1E;
	line-height: 23px;
	text-align: left;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.myListBox_2>.myListBox_2_2{
	float: right;
	margin-top: 4.4px;
	width: 14.2px;
	height: 14.2px;
	
}
.myListBox_3{
	margin: 0 10px 14.9px;
	font-size: 12.19px;
	color: #878787;
	line-height: 17px;
	text-align: left;
}
.myListBox_3_2{
	float: right;
}
.myListBox_4{
	margin: 0 10px 0;
	text-align: left;
}
.myListBox_4>span{
	cursor: pointer;
	display: inline-block;
	margin-right: 16.3px;
	width: 59.9px;
	height: 20px;
	text-align: left;
	line-height: 20px;
	font-size: 14.22px;
	color: #333333;
	
}
.myListBox_4>span:hover{
	color: #FF5121;
}
.myListBox_5{
	margin-top:42px;
	padding-bottom: 135px;
	text-align: center;
}
.myListBox_6{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	min-width: 1300px;
	background: rgba(0,0,0,.5);
}
.myListBox_6_1{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: -webkit-translate(-50%,-50%);
	transform: translate(-50%,-50%);
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	padding: 27px 0 30px;
	
	
	width: 420px;
}
.myListBox_6_2{
	position: absolute;
	top: -26px;
	right: -26.2px;
	width: 26.2px;
	height: 26px;
	cursor: pointer;
}
.myListBox_6_2:hover{
	opacity: .7;
}
.myListBox_6_3{
	line-height: 20px;
	font-size: 14px;
	color: #1E1E1E;
	text-align: center;
	margin-bottom: 4px;
}
.myListBox_6_4{
	margin-top: 27px;
	text-align: center;
}
.myListBox_6_4>span{
	cursor: pointer;
	
	display: inline-block;
	border: 1px solid #999999;
	border-radius: 5px;
	width: 98px;
	height: 38px;
	line-height: 38px;
	font-size: 14px;
	color: #333333;
	text-align: center;
	margin:0 10px;
}
.myListBox_6_4>span:hover{
	opacity: .7;
}
.myListBox_6_4>.myListBox_6_4_2{
	background: #333333;
	color: #fff;
}
.myWorkNoData>img{
	display: block;
	margin: 100px auto;
}
</style>
