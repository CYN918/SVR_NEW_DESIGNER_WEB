<template>
	<div>
		<div class="hot_topbox">
			<img  @click="godd" class="hotBaner" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/hd/banner.svg">
			
		</div>
		<div class="hotCent">
			<div class="hotCent1"><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/hd/5.svg"/><b>加入狮圈儿的理由</b><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/hd/1.svg"/></div>
			<div class="hotCent2">
				<div>
					<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/hd/2.svg" alt="">
					<div class="hotCent2t">需求稳定</div>
					<div class="hotCent2c">
						狮圈儿与头部安卓渠道华为/OPPO/ VIVO /维持长期良好合作关系
					</div>
				</div><div>
					<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/hd/4.svg" alt="">
					<div class="hotCent2t">自选收益类型</div>
					<div class="hotCent2c">
						买断式or分成式 设计师自选作品收益模式 自主性强
					</div>
				</div><div>
					<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/hd/3.svg" alt="">
					<div class="hotCent2t">作品用途清晰</div>
					<div class="hotCent2c">
						作品使用路径&账户收益个人中心公开展示
					</div>
				</div>
				
			</div>
		</div>
	</div>
	
</template>
<script>

export default {
	name: 'tip',
	methods: {
		godd(){
			
			if(!window.userInfo){
				this.$router.push({path: '/login'});
				return
			}
			this.$router.push({path: '/setPersonal'});
		}
	}
}
</script>

<style>
.hot_topbox{
	position: relative;
	margin-bottom: 60px;
}
.hotBaner{
	cursor: pointer;
	display: block;
	width: 100%;
}
.hot_topx{
	position: absolute;	
	top: 50%;
	left: 0;
	margin: 0 auto;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 100%;	
}
.hot_top_1{
	font-size:36px;
	font-weight:500;
	color:rgba(255,255,255,1);
	line-height:50px;
	margin-bottom: 10px;
}
.hot_top_2{
	font-size:16px;
	font-weight:400;
	color:rgba(255,255,255,1);
	line-height:22px;
	margin-bottom: 30px;
}
.hot_top_3{
	margin: 0 auto;
	width:140px;
	height:40px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	font-size:14px;
	text-align: center;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:40px;
}
.hotCent{
	width: 1300px;
	margin: 0 auto 60px;
}
.hotCent1{
	font-size:16px;

	font-weight:500;
	color:rgba(30,30,30,1);
	line-height:22px;
	margin-bottom: 30px;
}
.hotCent1>span{
	display: inline-block;
	transform: rotate(45deg);
	width: 8px;
	height: 8px;
	background: #33B3FF;
	margin: 0 10px;
}
.hotCent2>div{
	display: inline-block;
	vertical-align: top;
	width:280px;
	height:260px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;
	text-align: center;
	margin: 0 25px;
}
.hotCent2>div>img{
	display: block;
	width: 68px;
	height: 68px;
	margin: 35px auto 30px;
}
.hotCent2t{
	font-size:16px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(0,0,0,1);
	line-height:22px;
	margin-bottom: 10px;
}
.hotCent2c{
	width: 186px;
	margin: 0 auto;
	font-size:14px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:20px;
}
.hotCent1>b{
	margin: 0 10px;
}
.hotCent1>img{
	display: inline-block;
	vertical-align: top;
	margin-top: 5px;
}

</style>