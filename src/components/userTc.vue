<template>
	<div class="usertc_6">
		<div class="usertc_0">
			<img class="usertc_1" :src="tcData.user_info.avatar" alt="">
			<div class="usertc_2">{{tcData.user_info.username}}</div>
			<div class="usertc_3">{{tcData.user_info.city+' | '+tcData.user_info.vocation}}</div>
			<div class="usertc_4">
				<span>
					粉丝<div>{{tcData.user_info.fans_num}}</div>				
				</span>
				<span>
					人气<div>{{tcData.user_info.follow_num}}</div>				
				</span>
				<span>
					创作<div>{{tcData.user_info.work_num}}</div>				
				</span>
			</div>
			<div class="usertc_5">
				<span class="csys">关注</span><span @click="gosx">私信</span>
			</div>
		</div>
	
	</div>
</template>

<script>
export default {
	name: 'myInput',
	data(){
		return{
		}
	},
	props: {
		tcData:Object,
		default:{
			img:'/imge/nav_tx.png',
			name:'未知的',
			ad:'未知',
			zy:'',
			fs:0,
			rq:0,
			cz:0,
			
		}
	},
	methods: {
		gosx(){
			this.$router.push({path:'/chat',query:{id:this.tcData.user_info.open_id}});
		},
	}
}
</script>

<style>
.usertc_0{
	display: none;
    position: absolute;
    bottom: 27px;
    left: 0;
    background: #FFFFFF;
    -webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    border-radius: 5px 5px 5px 1px 1px 1px 5px;
    width: 310px;
    height: 275px;
}
.usertc_0:after{
    content: "";
    position: absolute;
    left: 16px;
    bottom: -5px;
    width: 8px;
    height: 8px;
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    -webkit-transform: rotate(45deg);
    transform: rotate(-135deg);
    z-index: 9;
    background: #fff;
}
.usertc_1{
	display: block;
	margin: 12px auto 7px;
	border-radius: 50%;
	width: 88px;
	height: 88px;
}
.usertc_2{
	font-size: 16px;
	color: #1E1E1E;
	text-align: center;
	line-height: 22px;
	margin-bottom: 4px;
}
.usertc_3{
	font-size: 14px;
	color: #999999;
	text-align: center;
	margin-bottom: 14px;
}
.usertc_4{
	text-align: center;
	margin-bottom: 10px;
}
.usertc_4>span{
	display: inline-block;
	font-size: 14px;
	color: #999999;
	text-align: center;
	width: 90px;
}
.usertc_4>span>div{

	margin: 2px auto 0;
	display: block;
	font-size: 14px;
	line-height: 20px;
	color: #1E1E1E;
	text-align: center;
}
.usertc_5{
	text-align: center;
}
.usertc_5>span{
	display: inline-block;
	border: 1px solid #999999;
	border-radius: 5px;
	font-size: 14px;
	color: #333333;
	text-align: center;
	line-height: 38px;
	width: 98px;
	height: 38px;
	margin: 0 15px;
}
.usertc_5>span.csys{
	border-color: #FF5121;
	background: #FF5121;
	color: #fff;
}
.usertc_6{
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 54px;
    height: 29px;
}
.usertc_6:hover>.usertc_0{
	display: block;
}
</style>
