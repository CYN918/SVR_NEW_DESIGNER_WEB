<template>
	<div class="box">
		<div class="hot_topbox">
			<img class="hotBaner" :src="imgSig+'toltImg/ZQ-banner.svg'">
			<button v-if="status!=2" @click="gocis()">{{status == 1?'审核中':'立即加入'}}</button>			
		</div>
		<div class="hotCent">
			<div class="hotCent2">
				<ul>
					<li v-for="el in list">
						<img class="hotBaner" :src="imgSig+el.img">
						<button class="go_upload" @click="goOn(el.path,el.n)">{{el.n}}</button>
					</li>
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
			status:0,
			list:[
				{path:'/project',n:'去挑选项目',img:'toltImg/zq-zptg.svg'},
				{path:'/upload',n:'上传原创作品',img:'toltImg/zq-cjxm.svg'},
				{path:'/toluser',n:'前往制作来电秀',img:'toltImg/zq-dsp.svg'}
			],
			outc:{
				num:'',
				scroll:2,
			} 
		}	
	},
	mounted: function () {	
		this.init()
	},
	methods:{
		init(){
			if(window.userInfo && window.userInfo.contributor_format_status){
				this.status = window.userInfo.contributor_format_status;
				return
			}
			this.status = 0;
		},
		gocis(){
			if(this.status==1){
				return
			}
			this.bdtj('赚钱页','[供稿人[立即加入]]','--')
			this.goOn('/setPersonal');
		},	
		goOn(url,name){
			this.bdtj('赚钱页','['+ name +']','--')
			if(!window.userInfo){
				this.$refs.logindialog.show();
				this.outc.num = 1;	
				return false
			}
			this.goFn(url,name);
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
.hotCent2 > ul >li{
	margin-left: 20px;
}
.hotCent2 > ul >li:nth-child(1){
	margin-left:0;
}

</style>