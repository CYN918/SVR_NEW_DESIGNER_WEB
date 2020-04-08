<template>
	<!-- <div class="tole_0">
		<div class="tole_00">
			<div class="tole_01">
				<img class="tole_02" src="/imge/new/tools/01.png" />
				<div class="tole_03">
					<div class="tole_04">来电秀剪辑工具</div>
					<div class="tole_05">CALLER SHOW EDITING TOOL</div>
					<div class="tole_06">来电秀是Android手机在拨打或接听电话时的界面个性化展现形式，本质上是[视频+铃声]，欢迎所有有优秀原创视频的小狮子们前来投稿~
				<br/><br/>视频限30秒内，提供优质BGM音源，1分钟剪辑，直接交稿，长期征收！快把你们原创的抖音存货、唯美摄影、街拍航拍内容都拿出来“兑现”吧！</div>
					<div class="tole_07">
						<a @click="got" class="btn_n btn_n3">开始制作</a>
						<router-link :to="{path:'/help'}" class="tole_08">我有疑问？</router-link>
					</div>
				</div>
			</div>
			<div class="tole_09">
				更多赚钱神器，尽情期待！
			</div>
		</div>
	</div> -->
	<div>
		<div class="hot_topbox">
			<img class="hotBaner" :src="imgSig+'toltImg/ZQ-banner.svg'">
			<button @click="godd" v-if="userMssge.contributor_format_status == 0 || userMssge == ''">立即加入</button>
			
		</div>
		<div class="hotCent">
			<div class="hotCent2">
				<ul>
					<li><img class="hotBaner" :src="imgSig+'toltImg/zq-zptg.svg'"><button class="go_upload" @click="go_project()">去挑选项目</button></li>
					<li class="t"><img class="hotBaner" :src="imgSig+'toltImg/zq-cjxm.svg'"><button class="go_upload" @click="go_upload()">上传原创作品</button></li>
					<li class="t"><img class="hotBaner" :src="imgSig+'toltImg/zq-dsp.svg'"><button class="go_upload" @click="go_show()">前往制作来电秀</button></li>
				</ul>
					
			</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return {
			userMssge:''
		}	
	},
	mounted: function () {	
		this.initHead()
	},
	methods:{
		// got(){
		// 	if(!window.userInfo){
		// 		this.$router.push({path:'/login'});	
		// 		return
		// 	}
		// 	this.$router.push({path:'/tolt/toluser'});	
		// },
		initHead(){	
			if(window.userInfo){
				this.userMssge = window.userInfo;
			}
			console.log(this.userMssge)
		},
		godd(){
			
			if(!window.userInfo){
				this.$router.push({path: '/login'});
				return
			}
			this.$router.push({path: '/setPersonal'});
		},
		go_project(){
			this.$router.push({path: '/project'});
		},
		go_upload(){
			if(!window.userInfo){
				this.$router.push({path: '/login'});
				return
			}
			this.$router.push({path: '/upload'});
		},
		go_show(){
			if(!window.userInfo){
				this.$router.push({path: '/login'});
				return
			}
			this.$router.push({path:'/tolt/toluser'});
		}
	}
}
</script>

<style>
/* .tole_00{
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
} */
.hot_topbox{
	position: relative;
	margin-bottom: 0px;
	text-align: center;
}
.hot_topbox > button{
	position: relative;
	bottom: 120px;
	width: 196px;
	height: 48px;
	border: none;
	background: #33B3FF;
	color: #ffffff;
	font-size: 18px;
	outline: none;
	border-radius: 5px;
	cursor: pointer;
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
	margin-top: 39px;
}
.hotCent2{
	width: 1300px;
	margin: 0 auto;
}
.hotCent2 > ul > li{
	width: 420px;
	height: 430px;
	display: inline-block;
	position: relative;
	text-align: center;
}
.hotCent2 > ul > li > button{
	position: relative;
	bottom: 65px;
	width: 120px;
	height: 40px;
	outline: none;
	font-size: 14px;
	border-radius: 5px;
	border: none;
	cursor: pointer;
}
.hotCent2 > ul > li .go_project{
	border: 1px solid #BBBBBB;
	color: #666666;
	background: #FFFFFF;
}
.hotCent2 > ul > li .go_upload{
	background: #33B3FF;
	color: #ffffff;
}
.hotCent2 > ul > li:hover{
	box-shadow:0px 16px 32px 0px rgba(0,0,0,0.1);
}
.hotCent2 > ul .t{
	margin-left: 20px;
}

</style>
