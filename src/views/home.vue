<template>
	<div>
		<div class="banner">
			<div class="banner1">
				<img v-for="(el,index) in banners" @click="opend(el.jump_url)" :class="[banOn==index?'action':'']" :src="el.banner_pic" alt="">
			</div>
			<div class="banner_nav1">
				<span v-for="(el,index) in banners" @click="checkBan(index)" :class="[banOn==index?'action':'']"></span>
			</div>
			<div class="banner_jt pend banner_jt1" @click="checkBan1()"></div>
			<div class="banner_jt pend banner_jt2" @click="checkBan2()"></div>
		</div>
		<ul class="i_listd" >
			<li v-for="(el,index) in List" :key="index">
				<img class="i_listd1" :src="el.face_pic" alt="">
				<div class="i_listd2">
					<div class="i_listd2_1"><span>{{el.work_name}}</span> <img v-if="el.is_recommend==1" src="/imge/zs_icon_tj.png" alt=""></div>
					<div class="i_listd2_2"><span>{{el.classify_1+'-'+el.classify_2}}</span><span>{{el.create_time}}</span></div>
					<div class="i_listd2_3">
						<span><img :src="el.face_pic" alt=""></span>
						
						<div>
							<span class="iconfont pend">&#xe6a2; {{el.view_num}}</span>
							<span class="iconfont pend">&#xe672; {{el.like_num}}</span>
							<span class="iconfont pend">&#xe616; {{el.comment_num}}</span>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<el-pagination class="pagesddd"
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
</template>

<script>
import { Loading } from 'element-ui';
export default {
	name: 'home',
	data(){
		return {
			banners:[],
			List:[],
			banOn:0,
			page:1,
			limit:40,
			total:0,
			loading: '',
			
		}
	},
	mounted: function () {	
		this.getBanner();
		this.getHList();
		
	}, 
	methods: {
		opend(ur){
			if(!ur){return}
			window.open(ur);
		},
		getBanner(){
			this.api.getBanner().then((da)=>{
				this.banners = da;
				setInterval(()=>{
					this.checkBan2();
				},5000);
			});
			
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
			let params = {
				page:this.page,
				limit:this.limit
			}
			this.loading = Loading.service({ fullscreen: true });
			this.api.getHList(params).then((da)=>{
				this.List = da.data;
				this.total = da.total;
				this.loading.close();
				console.log(da);
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
.banner{
	position: relative;
	margin: 20px auto;
	width: 1300px;
	height: 328px;
	-webkit-box-shadow: 0 0 8px 0 rgba(0,0,0,.2);
	box-shadow: 0 0 8px 0 rgba(0,0,0,.2);
    border-radius: 8px;
	/* background: red; */
}
.banner_jt{
	position: absolute;
	top: 144px;
	width: 36px;
	height: 36px;
	opacity: 0.2;
	background: #000000;
	border-radius: 5.62px;
}
.banner_jt:after{
    content: "";
    position: absolute;
	
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border: 2px solid #fff;
    border-right: 0;
    border-bottom: 0;
    -webkit-transform: translate(-35%,-50%) rotate(-45deg);
    transform: translate(-35%,-50%) rotate(-45deg);
}
.banner_jt1{	
    left: 44px;
}
.banner_jt2{	
    right: 44px;
    -webkit-transform: rotate(180deg);
	transform: rotate(180deg);
}
.banner_nav1{
	position: absolute;
	bottom: 15px;
	width: 100%;
	text-align: center;
}
.banner_nav1>span{
	width: 8px;
	height: 8px;
	display: inline-block;
	background: #D8D8D8;
	border-radius: 2px;
	margin-right: 5px;
}
.banner_nav1>span:last-child{
	margin-right: 0;
}
.banner_nav1>span.action{
	background: #FF5121;
}
.banner_nav1>span:hover{
	cursor: pointer;

}
.i_listd{
	width: 1300px;
	margin: 0 auto;
	text-align: left;
}
.i_listd>li{
	display: inline-block;
	overflow: hidden;
	width: 309.8px;
	height: 312.9px;
	background: #F6F6F6;
	border-radius: 5.08px;
	margin-right: 20.2px;
	margin-bottom: 21.0px;
}
.i_listd>li:nth-child(4n+4){
	margin-right: 0;
}

.banner1{
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100%;
}
.banner1>img{
	display: block;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: none;
}
.banner1>img.action{
	display: block;
}
.i_listd1{
	display: block;
	width: 309.8px;
	height: 231.9px;
}
.i_listd2{
	padding: 5px 10px;
}
.i_listd2_1{
	font-size: 16.25px;
	text-align: left;
	color: #1E1E1E;	
	margin-bottom: 3px;
}
.i_listd2_1>img{
	float: right;
	width: 14px;
	height: 14px;
	margin-top: 3px;
}
.i_listd2_2{
	font-size: 12.19px;
	color: #878787;
	text-align: left;
	margin-bottom: 5px;
}
.i_listd2_3{
	font-size: 12.19px;
	color: #999999;
	text-align: left;
}
.i_listd2_3>div{
	display: inline-block;
}
.i_listd2_2>span:last-child{
	float: right;
	
}
.i_listd2_3>span{
	display: inline-block;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	overflow: hidden;
}
.i_listd2_3>span>img{
	display: block;
	width: 100%;
	height: 100%;
}
.i_listd2_3>div{
	float: right;
}
.i_listd2_3>div>span{
	margin-right: 13.9px;
	font-size: 12.19px;
	color: #999999;
}
.i_listd2_3>div>span:last-child{
	margin-right: 0;
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    margin: 0 5px;
    background-color: initial;
    color: #606266;
    min-width: 30px;
    border-radius: 2px;
	border:1px solid #eee;
	
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #FF5121;
    color: #FFF;
	border-color: #FF5121;
}
.i_listd{
	margin-bottom: 62.1px;
}
.pagesddd{
	padding-bottom: 135px;
}
</style>
