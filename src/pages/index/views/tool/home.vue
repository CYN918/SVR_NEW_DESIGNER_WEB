<template>
	<div class="box">
		<div class="hot_topbox">
			<img class="hotBaner" :src="imgSig+'toltImg/ZQ-banner.svg'">
			<button v-if="status!=2" @click="gocis()">{{status == 1?'审核中':'立即加入'}}</button>			
		</div>
		<div class="hotCent">
			<div class="hotCent2">
				<ul>
					<li id="nav_tolt"><img class="hotBaner" :src="imgSig+'toltImg/zq-zptg.svg'"><button class="go_upload" @click="go_to('/project')">去挑选项目</button></li>
					<li id="nav_upload" class="t"><img class="hotBaner" :src="imgSig+'toltImg/zq-cjxm.svg'"><button class="go_upload" @click="goOn('/upload')">上传原创作品</button></li>
					<li id="nav_logo" class="t"><img class="hotBaner" :src="imgSig+'toltImg/zq-dsp.svg'"><button class="go_upload" @click="goOn('/toluser')">前往制作来电秀</button></li>
				</ul>					
			</div>
		</div>
		<loginDialog ref="logindialog" :config="outc"></loginDialog>
	</div>
</template>
<script>
import loginDialog from '../../components/loginDialog'
export default{
	components:{loginDialog},
	data(){
		return {
			status:'',
			outc:{
				num:'',
				scroll:2,
			} 
		}	
	},
	mounted: function () {	
		this.initHead()
	},
	methods:{
		initHead(){	
			this.api.getSelfInfo({}).then((da)=>{
				if(da=='error'){return}		
				this.status = da.contributor_format_status;
			});			
		},
		gocis(){
			if(this.status==1){
				return
			}
			this.goOn('/setPersonal');
		},
		checkLogin(){
			if(!window.userInfo){
				this.$refs.logindialog.show();
				this.outc.num = 1;	
				return false
			}
			return true
		},		
		goOn(url){
			if(!this.checkLogin()){return}
			this.go_to(url)
		},
		go_to(url){
			this.$router.push({path:url});	
		},
	}
}
</script>

<style scoped="scoped">

.hot_topbox{
	position: relative;
	margin-bottom: 0px;
	text-align: center;
	height: 420px;
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
.hotCent{
	margin-top: 39px !important;
	margin-bottom: 59px !important;
}
.box{
	padding: 60px 0px 118px 0px !important;
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
	top: 0px;
}
.hotCent2 > ul > li:hover{
	top: -19px;
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
