<template>
	<div>
		<div class="hot_topbox">
			<img  @click="godd" class="hotBaner" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/hd/banner.svg">
			
		</div>
		<div class="hotCent">
			<div class="hotCent1"><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/hd/5.svg"/><b>加入狮圈儿的理由</b><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/hd/1.svg"/></div>
			<div class="hotCent2">
				<div v-for="el in arr">
					<img :src="'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/hd2/icon_ggr_'+el.i+'.svg'"/>
					<div class="hotCent2t">{{el.t}}</div>
					<div class="hotCent2c">
						{{el.p}}
					</div>
				</div>
				<img class="hotCent3" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/hd2/ip.svg" >
				
			</div>
		</div>
	</div>
	
</template>
<script>

export default {
	name: 'tip',
	data(){
		return {
			arr:[
				{i:'xm',t:'项目足够多',p:'因与华为等企业的业务合作关系，需求量理论上是无限的。'},
				{i:'jd',t:'项目任务简单',p:'我们将产品设计工作进行了细分，最简单的项目完成只需10分钟。'},
				{i:'dpp',t:'项目全是大品牌',p:'项目来自于华为、OPPO、VIVO、魅族等一线移动终端企业。'},
				{i:'wjf',t:'没有甲方修改意见',p:'狮圈儿平台是创作者的唯一项目对接方，拒绝“五彩斑斓的黑”。'},
				{i:'mkh',t:'模板化验收标准',p:'所有项目制作前提供模板文件或案例，按规范制作就能验收过稿。'},
				{i:'mkd',t:'入驻门槛低',p:'由于细分了设计任务，项目简单易懂，初学者也能来赚钱。'},
				{i:'ald',t:'案例分享内容多',p:'不仅是创作者分享的案例，小编们也会定期推荐世界上的优秀案例哦~'},
				{i:'cqxm',t:'长期项目随时可做',p:'部分需求项目长期大量征收，随时有空，随时就能报名制作赚钱。'},
				{i:'wdsy',t:'累计收益越高，接单收益越高',p:'累计收益等级会按百分比加成之后每单的收益，最高+15%哦！'},
			]
		}
	},
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
.hotCent2{
	margin-right: -20px;
	text-align: left;
}
.hotCent2>div{
	display: inline-block;
	vertical-align: top;

	background:rgba(255,255,255,1);
	text-align: center;
	margin-right: 20px;
	margin-bottom: 20px;
	
	width:244px;
	height:260px;
	
	border-radius:5px;
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
	width: 212px;
	text-align: left;
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
.hotCent3{
	display: inline-block;
	vertical-align: top;
	width: 245px;
	height: 260px;
}

</style>