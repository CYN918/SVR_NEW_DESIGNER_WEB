<template>
	<div class="tole_00">
		<div class="tole_01">来电秀短视频</div>
		<div class="tole_02">SHORT VIDEO OF THE CALLER SHOW</div>
		<div class="tole_03">来电秀是一款可以改变来电显示的视频铃音产品，以动效视频和铃声的方式给来去电增添趣味性！欢迎随时投稿热门短视频、唯美摄影、街拍航拍、二次元插画、逗比表情等优质高清视频作品，我们助你出圈！</div>
		<div class="tole_04">
			<span v-if="pdn()">供稿人申请已提交，请等待审核</span><span @click="go('/setPersonal')" class="tole_04t" v-else>立即认证供稿人</span>
		</div>
		<img class="tole_05" src="/imge/tools/ldx.png">
		<div class="tole_06">1分钟完成剪辑，永久获取作品收益。<router-link :to="{path:'/help'}" class="tole_08">了解详情</router-link></div>
	</div>
</template>

<script>
export default{
	props:{
		value:Object,
	},
	methods:{
		go(p){
			this.$router.push({path:p});	
		},
		pdn(){
			return window.userInfo.contributor_format_status==1
		}
	}
}
</script>

<style>
.tole_00{
	
	margin: 40px auto;
	width:1170px;
	height:790px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	text-align: center;
	
}
.tole_01{
	font-size:36px;
	font-family:PingFangSC-Semibold,PingFang SC;
	font-weight:600;
	color:rgba(40,40,40,1);
	line-height:50px;
	
	padding-top: 60px;
}
.tole_02{
	margin-top: 4px;
	font-size:12px;
	color:rgba(40,40,40,1);
	line-height:17px;
}
.tole_03{

	font-size:14px;
	width: 656px;
	margin: 24px auto 0;
	color:rgba(102,102,102,1);
	line-height:24px;
}
.tole_04{
	margin-top: 24px;
	
	margin: 0 auto;
	
	
}
.tole_04>span{
	display: inline-block;
	margin-top: 20px;
	height:40px;
	background:rgba(51,179,255,1);
	border-radius:5px;
	font-size:14px;
	color:rgba(255,255,255,1);
	line-height:40px;
	padding: 0 11px;
}
.tole_04t{
	cursor: pointer;
	
}
.tole_05{
	margin: 6px auto 0;
	display: block;
	width: 767px;
}
.tole_06{
	font-size:16px;
	margin-top: -36px;
	color:rgba(51,51,51,1);
	line-height:22px;
}
.tole_08{
	color: #33B3FF;
}
</style>
