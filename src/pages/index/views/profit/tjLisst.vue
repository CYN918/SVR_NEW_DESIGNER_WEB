<template>
	<div v-if="list.length>0" class="tjEvent">
		<div class="tjEvent_1">
			推荐项目<a class="tjEvent_2 pend" @click="go('/project')">查看更多</a>
		</div>
		<ul class="tjEvent_3">
			<li @click="goEvent(el.id)" class="pend" v-for="(el,index) in list" :key="index">
				<div class="tjEvent_3_1">
					<img :src="el.banner" alt="">
					
				</div>
				<div class="tjEvent_3_2">
					<div class="tjE_3_2_1">{{el.name}}</div>
					<div class="tjE_3_2_2">
						{{el.classify_name}}
						<span class="tjE_3_2_2_1">|</span>
						<span v-if="el.production_cycle_d>0">{{el.production_cycle_d}}天</span>
						<span v-if="el.production_cycle_h>0">{{el.production_cycle_h}}小时</span>
						制作周期
					</div>
					<div class="tjE_3_2_3">{{el.sign_up_num}} <span class="tjE_3_2_3_1">人已报名</span><span class="tjE_3_2_3_2">{{el.expected_profit}}</span></div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: 'profit',	
	data(){
		return {
			list:[]
		}
	},
	mounted: function () {			
		this.init();
	}, 
	methods: {
		init(){

			this.api.pr_recommend().then((da)=>{
				if(da=='error'){
					return
				}
				
				this.list  = da;
			});
		},
		backtime(d){
			if(!d){return}
			return d.split(" ")[0]
		},
		go(a){
			this.bdtj('我的收益','推荐活动更多','--');
			this.mJs.scTop(1);
			this.$router.push({path:a});
		},
		goEvent(id){
			this.bdtj('我的收益','推荐活动','--');
			this.mJs.scTop(1);
			this.$router.push({path:'/prcent',query:{id:id}});
		},
	},
}
</script>
<style>
.tjEvent{
	margin: 0 auto 60px;
	width: 1300px;
	font-size:16px;
	font-family:PingFangSC-Medium;
	font-weight:500;
	color:rgba(30,30,30,1);
	line-height:22px;
	text-align: left;
}
.tjEvent_2{
	float: right;
	font-size:14px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:#33B3FF;
	line-height:20px;
	
}
.tjEvent_1{
	margin-bottom: 26px;
}
.tjEvent_3{
	display: block;
}
.tjEvent_3>li{
	display: inline-block;
	margin: 0 20px 0 0;
	width:310px;
	height:338px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 10px 0px rgba(0,0,0,0.06);
	border-radius:5px;
}
.tjEvent_3>li:nth-child(4n+4){
	margin-right: 0;
}
.tjEvent_3_1{
	position: relative;
	width:310px;
	height:232px;
	border-radius:5px 5px 0px 0px;
	overflow: hidden;
}
.tjEvent_3_1>img{
	display: inline-block;
	width:310px;
	height:232px;
	border-radius:5px 5px 0px 0px;
}
.tjEvent_3_1>span{
	position: absolute;
	right: 0;
	top: 0;
	width:100px;
	height:40px;
	background:rgba(0,0,0,.5);
	border-radius:0px 5px 0px 5px;
	font-size:14px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(255,255,255,1);
	line-height:40px;
	text-align: center;
}
.tjEvent_3_2{
	margin: 10px 18px 16px;
}
.tjE_3_2_1{
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
	margin-bottom: 7px;
}
.tjE_3_2_2{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
	margin-bottom: 10px;	
}
.tjE_3_2_2_1{
	margin: 0 16px;
}
.tjE_3_2_3{
	border-top: 1px solid rgba(244,246,249,1);
	padding-top: 11px;
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.tjE_3_2_3_1{
	margin-left: 2px;
	font-size:12px;
	color:rgba(187,187,187,1);
}
.tjE_3_2_3_2{
	display: block;
	float: right;
	font-size:14px;
	color:#33B3FF;
	line-height:20px;
}
</style>
