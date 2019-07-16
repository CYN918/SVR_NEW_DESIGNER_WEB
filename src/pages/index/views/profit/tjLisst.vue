<template>
	<div v-if="list.length>0" class="tjEvent">
		<div class="tjEvent_1">
			推荐活动<a class="tjEvent_2 pend" @click="go('/activvity')">查看更多</a>
		</div>
		<ul class="tjEvent_3">
			<li @click="goEvent(el.id)" class="pend" v-for="(el,index) in list" :key="index">
				<div class="tjEvent_3_1">
					<img :src="el.banner" alt="">
					<span>{{el.status==-1?'已结束':'进行中'}}</span>
				</div>
				<div class="tjEvent_3_2">
					<div class="tjEvent_3_2_1">{{el.activity_name}}</div>
					<div class="tjEvent_3_2_2">{{el.category_name}}<span>{{backtime(el.start_time)}} 至 {{backtime(el.end_time)}}</span></div>
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
			list:[1,2,3,4]
		}
	},
	mounted: function () {			
		this.init();
	}, 
	methods: {
		init(){

			this.api.recommendActivity().then((da)=>{
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
			this.$router.push({path:a});
		},
		goEvent(id){
			this.bdtj('我的收益','推荐活动','--');
			this.$router.push({path:'/detailed',query:{id:id}});
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
	color:rgba(255,81,33,1);
	line-height:20px;
	margin-right: 30px;
	
}
.tjEvent_1{
	margin-bottom: 26px;
}
.tjEvent_3{
	display: block;
}
.tjEvent_3>li{
	display: inline-block;
	vertical-align: top;
	width:310px;
	background:rgba(246,246,246,1);
	border-radius:0px 0px 5px 5px;
	margin-right: 20px;
	margin-bottom: 20px;
}
.tjEvent_3>li:nth-child(4n+4){
	margin-right: 0;
}
.tjEvent_3_1{
	position: relative;
	width:310px;
	height:174px;
	border-radius:5px 5px 0px 0px;
	overflow: hidden;
}
.tjEvent_3_1>img{
	display: inline-block;
	width:310px;
	height:174px;
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
.tjEvent_3_2_1{
	font-size:14px;
	font-family:PingFangSC-Medium;
	font-weight:500;
	color:rgba(30,30,30,1);
	line-height:20px;
}
.tjEvent_3_2_2{
	font-size:12px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:17px;
}
.tjEvent_3_2_2>span{
	display: block;
	float: right;
}
</style>
