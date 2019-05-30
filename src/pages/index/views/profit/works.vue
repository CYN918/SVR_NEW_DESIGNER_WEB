<template>
	<div>
		<navd :config="sxConfig"></navd>
		<div class="pr_title">
			<span v-for="(el,index) in title" :key="index">{{el}}</span>
			
		</div>
		<list class="prList" :config="data">
			<template v-slot:todo="{ todo }">
				<div class="prList1">
					<div class="prList1_1" style="background-image: url(http://zk-new-designer.oss-cn-beijing.aliyuncs.com/058ffd3ada2d7b0d799c2097e7c6a11f.png);"></div>
				
					<div class="prList1_2">
						<div class="prList1_3">小魔熊-设计品牌IP形象</div>
						<div class="prList1_4">原创-平面-海报</div>
						<div class="prList1_5">2019/02/13 18:00:00</div>
					</div>
				</div>
				<div class="prList1">
					<div class="prList1_1" style="background-image: url(http://zk-new-designer.oss-cn-beijing.aliyuncs.com/058ffd3ada2d7b0d799c2097e7c6a11f.png);"></div>
					<div class="prList1_2">
						<div class="prList1_3">小魔熊-设计品牌IP形象</div>
						<div class="prList1_4">原创-平面-海报</div>
						<div class="prList1_5">2019/02/13 18:00:00</div>
					</div>
				</div>
				<div class="prList2">￥50，000.00</div>
				<div class="prList3"><span :class="todo.id=='711'?'type1':todo.id=='709'?'type2':'type3'"></span>1 条投放中</div>
				<div class="prList4"><span @click="show(todo)" class="prList4_1 pend">查看详情</span></div>
			</template>			
		</list>
		<div class="tancBox" v-if="isxq">
			
			<div class="tanc1 pr_tc">
				<div class="pr_tc_1">
					录用 / 分成式 / 查看详情
				</div>
				<div class="pr_tc_2">
					<div class="pr_tc_2_1">
						<div class="prList1_1" style="background-image: url(http://zk-new-designer.oss-cn-beijing.aliyuncs.com/058ffd3ada2d7b0d799c2097e7c6a11f.png);"></div>
						<div class="prList1_2">
							<div class="prList1_3">小魔熊-设计品牌IP形象</div>
							<div class="prList1_4">原创-平面-海报</div>
							<div class="prList1_5">2019/02/13 18:00:00</div>
						</div>
					</div>					
				</div>
				<!-- <div class="pr_tc_2_1 pr_no_1">
					<img src="/imge/pro/3.png">
					<p>暂无投放渠道，预计投放渠道为：酷派锁屏主题、酷派锁屏主题</p>
				</div> -->
				
				<ul class="pr_tc3">
					<li>
						<span class="pr_tcicon">投放中</span>
						<div class="pr_tc3_1"><span>投放渠道</span><span>酷派动态锁屏主题展...</span></div>
						<div class="pr_tc3_1"><span>分成指标</span><span>酷派动态锁屏主题展...</span></div>
						<div class="pr_tc3_1">
							<span>分成单价</span>	
							<span>
								￥2.00/千次曝光 
								
							</span>		
							<div @mouseover="setshow('1')" @mouseout="setHid" class="whd iconfont">&#xe65c;</div>					
						</div>
						<div class="pr_tc3_1"><span>展示量</span><span>酷派动态锁屏主题展...</span></div>
						<div class="pr_tc3_1"><span>结算收益</span><span>酷派动态锁屏主题展...</span></div>
						<div class="pr_tc3_1"><span>更新时间</span><span>酷派动态锁屏主题展...</span></div>
					</li>
					<li>
						<span class="pr_tcicon">投放中</span>
						<div class="pr_tc3_1"><span>投放渠道</span><span>酷派动态锁屏主题展...</span></div>
						<div class="pr_tc3_1"><span>分成指标</span><span>酷派动态锁屏主题展...</span></div>
						<div class="pr_tc3_1">
							<span>分成单价</span>
							<span></span>
							<div  @mouseover="setshow('1')" @mouseout="setHid" class="whd pend iconfont">&#xe65c;</div>
						</div>
						<div class="pr_tc3_1"><span>展示量</span><span>酷派动态锁屏主题展...</span></div>
						<div class="pr_tc3_1"><span>结算收益</span><span>酷派动态锁屏主题展...</span></div>
						<div class="pr_tc3_1"><span>更新时间</span><span>酷派动态锁屏主题展...</span></div>
					</li>
					<li>
						<span class="pr_tcicon">投放中</span>
						<div class="pr_tc3_1"><span>投放渠道</span><span>酷派动态锁屏主题展...</span></div>
						<div class="pr_tc3_1"><span>分成指标</span><span>酷派动态锁屏主题展...</span></div>
						<div class="pr_tc3_1">
							<span>分成单价</span>
							<span></span>
							<div @mouseover="setshow('1')" @mouseout="setHid" class="whd iconfont">&#xe65c;</div>
						</div>
						<div class="pr_tc3_1"><span>展示量</span><span>酷派动态锁屏主题展...</span></div>
						<div class="pr_tc3_1"><span>结算收益</span><span>酷派动态锁屏主题展...</span></div>
						<div class="pr_tc3_1"><span>更新时间</span><span>酷派动态锁屏主题展...</span></div>
					</li>
					<li>
						<span class="pr_tcicon">投放中</span>
						<div class="pr_tc3_1"><span>投放渠道</span><span>酷派动态锁屏主题展...</span></div>
						<div class="pr_tc3_1"><span>分成指标</span><span>酷派动态锁屏主题展...</span></div>
						<div class="pr_tc3_1">
							<span>分成单价</span>							
						</div>
						<div class="pr_tc3_1"><span>展示量</span><span>酷派动态锁屏主题展...</span></div>
						<div class="pr_tc3_1"><span>结算收益</span><span>酷派动态锁屏主题展...</span></div>
						<div class="pr_tc3_1"><span>更新时间</span><span>酷派动态锁屏主题展...</span></div>
					</li>
					
				</ul>
				
				<img @click="close" src="/imge/cj_00.png" class="pr_tc_1x pend">
			</div>
		</div>
		
		
		
		<div @mouseover="onRl" @mouseout="outRl" :style="bzdsd" class="pr_tc3_x_1">
			<div class="pr_tc3_x_1e">
				<div class="pr_tc3_x_1d">渠道信息</div>
				<div class="pr_tc3_x_2d">
					<div class="pr_tc3_1"><span>投放渠道</span><span>酷派动态锁屏主题展...</span></div>
					<div class="pr_tc3_1"><span>分成指标</span><span>酷派动态锁屏主题展...</span></div>
					<div class="pr_tc3_1"><span>分成单价</span><span>酷派动态锁屏主题展...</span></div>
					<div class="pr_tc3_x_2d_1">个人分成单价 = 渠道分成单价 * 个人评级价格(买断价格) /总评级价格</div>
				</div>
			</div>
			<div class="hxlll"></div>
			<ul class="hxlll_1">
				<li>
					<div class="prList1_1 prList1_1f" style="background-image: url(http://zk-new-designer.oss-cn-beijing.aliyuncs.com/058ffd3ada2d7b0d799c2097e7c6a11f.png);"></div>
					<div class="hxlll_2">
						<div class="hxlll_4">
							交易形式：买断式<br/>
							买断价格：￥2000.00 <br/>
							贡献占比：25%
						</div>
						<div class="hxlll_3">
							<img src="http://zk-new-designer.oss-cn-beijing.aliyuncs.com/587e34d86a23a3839ee93a8ff992df70.png" alt="">
							<span>asfas</span>
						</div>
					</div>
				</li>
				<li>
					<div class="prList1_1 prList1_1f" style="background-image: url(http://zk-new-designer.oss-cn-beijing.aliyuncs.com/058ffd3ada2d7b0d799c2097e7c6a11f.png);"></div>
					<div class="hxlll_2">
						<div class="hxlll_4">
							交易形式：买断式<br/>
							买断价格：￥2000.00 <br/>
							贡献占比：25%
						</div>
						<div class="hxlll_3">
							<img src="http://zk-new-designer.oss-cn-beijing.aliyuncs.com/587e34d86a23a3839ee93a8ff992df70.png" alt="">
							<span>asfas</span>
						</div>
					</div>
				</li>
				<li>
					<div class="prList1_1 prList1_1f" style="background-image: url(http://zk-new-designer.oss-cn-beijing.aliyuncs.com/058ffd3ada2d7b0d799c2097e7c6a11f.png);"></div>
					<div class="hxlll_2">
						<div class="hxlll_4">
							交易形式：买断式<br/>
							买断价格：￥2000.00 <br/>
							贡献占比：25%
						</div>
						<div class="hxlll_3">
							<img src="http://zk-new-designer.oss-cn-beijing.aliyuncs.com/587e34d86a23a3839ee93a8ff992df70.png" alt="">
							<span>asfas</span>
						</div>
					</div>
				</li>
			</ul>
			
			
			<div  class="tcxjts">
				<span></span>
			</div>
		</div>
		
		
	</div>
</template>

<script>
import navd from './navd';
import list from '../../components/list';
export default {
	components:{navd,list},
	name: 'pr_works',
	data(){
		return {
			sxConfig:{
				list1:[
					{label:'全部记录',value:0},
					{label:'买断式',value:1},
					{label:'分成式',value:2}
				],
				v1:0,
				list2:[
					{label:'全部记录',value:0},
					{label:'近一周',value:1},
					{label:'近一个月',value:2},
					{label:'近一半年',value:3},
					{label:'近一年',value:4}
				],
				v2:2
			},
			data:{
				type:'box_a',
				ajax:{
					url:'getHList',
				}
			},	
			title:['录用作品信息','所属活动信息','总结算收益','订单状态','操作'],
			isxq:'',
			bzdsd:'',
			isOnc:'',
			ykan:''
		}
	},
	mounted: function(){}, 
	methods: {
		show(o){
			this.isxq = 1;
			document.body.style.overflow="hidden";
		},
		close(){
			document.body.style.overflow="";
			this.isxq = '';
		},
		setshow(a){		
			clearTimeout(this.ykan);
			let zb = event.toElement.getBoundingClientRect();
			this.bzdsd = 'display:block;top:'+zb.y+'px;left:'+(zb.x+30)+'px;';
		},
		setHid(){
			clearTimeout(this.ykan);
			this.ykan = setTimeout(()=>{
				this.bzdsd = '';
			},50);			
		},
		onRl(){
			clearTimeout(this.ykan);
		},
		outRl(){
			clearTimeout(this.ykan);
			this.ykan = setTimeout(()=>{
				this.bzdsd = '';
			},50);
		}
	}
}
</script>

<style>
.prList{
	box-sizing: border-box;
    display: block;
    margin: 0 auto;
    width: 1300px;
    padding: 0 0 160px;
}
.prList>li{
	box-sizing: border-box;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;
	padding: 30px;
	width: 100%;
}
.pr_title{
	text-align: left;
	box-sizing: border-box;
	margin: 20px auto;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;
	padding: 20px 30px;
	font-size:14px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:20px;
	width: 1300px;
}
.pr_title>span{
	display: inline-block;
	text-align: left;
	margin-right: 112px;
}
.pr_title>span:nth-child(1){
	width: 280px;
}
.pr_title>span:nth-child(2){
	width: 280px;
}
.pr_title>span:nth-child(3){
	width: 91px;
}
.pr_title>span:nth-child(4){
	width: 60px;
}
.pr_title>span:nth-child(5){
	width: 56px;
	margin-right: 0;
}

.prList>li>div{
	display: inline-block;
	vertical-align: top;
	margin-right: 105px;
	height: 75px;
	line-height: 75px;
}
.prList>li>div:last-child{
	margin-right: 0;
}
.prList1{
	display: inline-block;
	width: 280px;
}
.prList1_1{
	display: inline-block;
	vertical-align: top;
	margin-right: 10px;
	background-size: cover;
	width:100px;
	height:75px;
	border-radius:5px;
}
.prList1_2{
	display: inline-block;
	vertical-align: top;
}
.prList1_3{
	margin-bottom: 4px;
	font-size:16px;
	font-weight:500;
	width: 165px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
	color:rgba(19,19,19,1);
	line-height:22px;	
}
.prList1_4{
	margin-bottom: 12px;
	font-size:14px;
	font-weight:400;
	color:rgba(19,19,19,1);
	line-height:20px;
}
.prList1_5{
	font-size:12px;
	font-weight:400;
	color:rgba(19,19,19,1);
	line-height:17px;
}
.prList2{
	font-size:14px;
	font-weight:500;
	color:rgba(30,30,30,1);
	margin-right: 5px !important;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 195px;
	height: 75px;
	line-height: 75px;
}
.prList4_1{
	color: #FF5121;
}
.prList3>span{
	display: inline-block;
	vertical-align: middle;
	border-radius: 50%;
	margin-right: 10px;
	width:6px;
	height:6px;
	
}
.type1{
	background:rgba(255,153,1,1);
}
.type2{
	background:rgba(103,194,57,1);
}
.type3{
	background:rgba(255,153,1,1);
}
.pr_tc{
	max-width: 650px;
    height: 620px;
 

}
.pr_tc_1{
    width: 650px;
    height: 74px;
    line-height: 74px;
    border-bottom: 2px solid #E6E6E6;
    font-size: 16px;
    font-weight: 500;
    color: rgba(30,30,30,1);
    text-align: left;
    text-indent: 30px;
}
.pr_tc_2{
	text-align: left;
	border-bottom: 2px solid #E6E6E6;
}
.pr_tc_2_1{
	padding: 30px;
}
.pr_no_1>img{
	display: block;
	width: 210px;
	margin: 8px auto 32px;
}
.pr_no_1>p{
	margin-bottom: 42px;
	font-size:16px;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:22px;
}
.pr_tc_1x{
	position: absolute;
	right: -41px;
	top: -41px;
	width: 36px;
	height: 36px;
}

.pr_tc3{
	padding: 30px 30px 10px;
	text-align: left;
	height: 350px;
    overflow: hidden;
    overflow-y: auto;
}
.pr_tc3>li{
	position: relative;
	display: inline-block;
	vertical-align: top;
	margin: 0 20px 20px 0;
	box-sizing: border-box;
	padding: 56px 20px 20px;
	width:271px;
	height:257px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 6px 0px rgba(0,0,0,0.1);
	border-radius:5px;
}
.pr_tc3>li:nth-child(2n+2){
	margin-right: 0;
}
.pr_tcicon{
	position: absolute;
	top: 0;
	left: 0;
	width:100px;
	height:30px;
	background:rgba(81,197,20,1);
	border-radius:5px 0px 5px 0px;
	font-size:14px;
	text-align: center;
	font-weight:400;
	color:rgba(255,255,255,1);
	line-height:30px;
}
.pr_tc3_1{
	position: relative;
	margin-bottom: 13px;
}
.pr_tc3_1>span{
	display: inline-block;
	vertical-align: top;
}
.pr_tc3_1>span:nth-child(1){
	width: 56px;
	margin-right: 30px;
	font-size:14px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:20px;
}
.pr_tc3_1>span:nth-child(2){
	position: relative;
	font-size:14px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(30,30,30,1);
	line-height:20px;
	width: 145px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.whd{
	position: absolute;
	right: 0;
	top: 0;
	
}
.pr_tc3_x_1{
	z-index: 10000;
	display: none;
	position: absolute;
	top: 0;
	left: 0;
	transform: translateY(-50%);
	width: 320px;
	height:560px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;
	
    text-align: left;
	
}
.pr_tc3_x_1e{
	box-sizing: border-box;
	padding: 26px 30px;
}
.tcxjts{
	position: absolute;
	top: 50%;
	left: -20px;
	transform: translateY(-50%);
	width: 30px;
	height: 30px;
}
.tcxjts>span{
	display: block;
	border: 1px solid #fff;
	width: 10px;
	height: 10px;
	border-left: 1px solid rgba(0,0,0,.08);
	border-top: 1px solid rgba(0,0,0,.08);
	-webkit-transform:rotate(-45deg) translate(-22%,172%);
	transform: rotate(-45deg) translate(-22%,172%);
    background: #fff;
	
}
.pr_tc3_x_1d{
	margin-bottom: 14px;
	font-size:16px;
	font-weight:500;
	color:rgba(30,30,30,1);
	line-height:22px;
}
.pr_tc3_x_2d_1{
	font-size:14px;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:20px;
}
.hxlll{
	width: 100%;
	height: 2px;
	background: #E6E6E6;
}
.hxlll_1{
    padding: 24px 27px;
    height: 252px;
    overflow: hidden;
    overflow-y: auto;
}
.hxlll_2{
	display: inline-block;
	vertical-align: top;
}
.hxlll_4{
	font-size: 12px;
    font-weight: 400;
    color: rgba(153,153,153,1);
    line-height: 17px;
    display: inline-block;
	margin-bottom: 17px;
}
.hxlll_3>img{
	display: inline-block;
	margin-right: 10px;
	vertical-align: middle;
	width: 20px;
    height: 20px;
    border-radius: 50%;
}
.hxlll_3>span{
	font-size:14px;
	font-weight:400;
	color:rgba(30,30,30,1);
	line-height:20px;
}
.prList1_1f{
	width: 120px;
	height: 90px;
}
.hxlll_1>li{
	margin-bottom: 20px;
}
</style>
