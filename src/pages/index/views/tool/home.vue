<template>
	<div class="tole_0">
		<div class="tole_00">
			<div class="tole_01">
				<img class="tole_02" src="/imge/new/tools/01.png" />
				<div class="tole_03">
					<div class="tole_04">来电秀剪辑工具</div>
					<div class="tole_05">CALLER SHOW EDITING TOOL</div>
					<div class="tole_06">来电秀是Android手机在拨打或接听电话时的界面个性化展现形式，本质上是[视频+铃声]，欢迎所有有优秀原创视频的小狮子们前来投稿~
				<br/><br/>视频限30秒内，提供优质BGM音源，1分钟剪辑，直接交稿，长期征收！快把你们原创的抖音存货、唯美摄影、街拍航拍内容都拿出来“兑现”吧！</div>
					<div class="tole_07">
						<a @click="got" class="btn_n btn_n3">开始制作</a><a href="/#/index" class="tole_08">我有疑问？</a>
					</div>
				</div>
			</div>
			<div class="tole_09">
				更多赚钱神器，尽情期待！
			</div>
		</div>
	</div>
</template>

<script>
export default{
	methods:{
		got(){
			if(!window.userInfo){
				this.$router.push({path:'/login'});	
				return
			}
			this.$router.push({path:'/tolt/toluser'});	
		}
	}
}
</script>

<style>
.tole_00{
	padding: 40px 0 60px;
}
.tole_01{
	margin: 0 auto;
	padding: 72px 119px;
	text-align: left;
	width:1064px;
	background:#fff;
	border-radius:5px;
	margin-bottom: 42px;
}
.tole_02{
	display: inline-block;
	vertical-align: top;
	margin-right: 54px;
	width: 547px;
}
.tole_03{
	display: inline-block;
	vertical-align: top;
	width: 461px;
}
.tole_04{
	margin: 36px auto 10px;
	font-size:48px;
	font-weight:600;
	color:rgba(40,40,40,1);
	line-height:64px;
}
.tole_05{
	margin-bottom: 54px;
	font-size:24px;
	font-weight:600;
	color:#939393;
	line-height:32px;
	
}

.tole_06{
	margin-bottom: 54px;
	font-size:14px;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:20px;
}
.tole_08{
	cursor: pointer;
	font-size:14px;
	font-weight:400;
	color:rgba(102,102,102,1);
	margin-left: 24px;
}
.tole_08:hover{
	opacity: .7;
}
.tole_09{
	font-size:14px;
	color:rgba(187,187,187,1);
	line-height:20px;
}
</style>
