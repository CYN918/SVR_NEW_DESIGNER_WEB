<template>
	<div v-if="shareType" class="fixCoBox">
		<div class="fixCoBox1 sharebox">
			
			<img src="/imge/cj_00.png" @click="showShare(false)" class="fixCoBox2">
			<div class="sharebox1">
				<vue-qr class="sharebox1_1" :logoSrc="config.logo" :text="config.value" :size="200" :margin="0"></vue-qr>
				分享到微信
			</div>
			<div class="sharebox2">
				<a target="_blank" :href="fxUrl1">
					<img src="/imge/zc_icon_wb.png" alt="">
					新浪
				</a>
				<a target="_blank" :href="fxUrl2">
					<img src="/imge/zc_icon_qq.png" alt="">
					QQ
				</a>
				<a target="_blank" :href="fxUrl3">
					<img src="/imge/Group 5.png" alt="">
					QQ空间
				</a>
			</div>
		</div>
	</div>
</template>
<script>
import VueQr from 'vue-qr'

export default {
	components:{VueQr},
	props:{
		shareData:{
			Object
		}
	},
	data(){
		return {
			fxUrl1:'',
			fxUrl2:'',
			fxUrl3:'',
			shareType:false,
			config:{
				value: '',
				logo:'/imge/llog.png'
			},
		}
	},
	mounted: function () {	

		
	}, 
	methods: {	
		showShare(type){
			this.shareType = type?type:false;
		},
		setUrl(da){

			if(!da){
				return
			}
			let ulrd = encodeURIComponent(da.url);
			
			// this.fxUrl1 = 'http://service.weibo.com/share/share.php?url='+da.url+'&title='+da.title+'&ralateUid=1733083617&appkey=4017051451&pic='+da.pics+'#_loginLayer_1557135339222';
			// this.fxUrl1 = 'http://service.weibo.com/share/share.php?appKey=3473072390&title=%E6%9D%83%E6%B8%B8%E7%AC%AC%E5%85%AB%E5%AD%A3%E7%AC%AC%E4%B8%89%E9%9B%86%E5%90%8E%EF%BC%8C%E9%BE%99%E6%AF%8D%E8%BF%98%E6%9C%89%E5%A4%9A%E5%B0%91%E5%85%B5%E5%8A%9B%EF%BC%9F%20-%20%E5%9B%9E%E7%AD%94%E4%BD%9C%E8%80%85%3A%20%E9%A1%B9%E5%A4%A9%E9%B9%B0%20https%3A%2F%2Fzhihu.com%2Fquestion%2F322293624%2Fanswer%2F672889557%20(%E6%83%B3%E7%9C%8B%E6%9B%B4%E5%A4%9A%EF%BC%9F%E4%B8%8B%E8%BD%BD%20%40%E7%9F%A5%E4%B9%8E%20App%EF%BC%9Ahttp%3A%2F%2Fweibo.com%2Fp%2F100404711598%20)#_loginLayer_'+(new Date()).valueOf();
		
			this.config.value = da.url;
			this.fxUrl1 = 'http://service.weibo.com/share/share.php?appKey=3473072390&title='+da.title+'&url='+ulrd+'&pic='+da.pics+'#_loginLayer_'+(new Date()).valueOf();
			this.fxUrl2 ='https://connect.qq.com/widget/shareqq/index.html?url='+ulrd+'&title='+da.title+'&pics='+da.pics+'&desc=&summary='+da.summary+'&site=wo';
			
			this.fxUrl3 = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+ulrd+'&title='+da.title+'&pics='+da.pics+'&summary='+da.summary+'&desc=&site=xx';
		},
	},
}
	
	
</script>

<style>
.fixCoBox{
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0,0,0,.2);
	width: 100%;
	height: 100%;
	z-index: 10000;
}
.fixCoBox1{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	background: #FFFFFF;
	padding: 27px;
	box-sizing: border-box;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
}
.fixCoBox2 {
    position: absolute;
    top: -45px;
    right: -45px;
    width: 44px;
    height: 44px;
    cursor: pointer;
}
.sharebox{
	width: 420px;
	height: 279px;
}
.sharebox1{
	margin-bottom: 31px;
}
.sharebox1_1{
	display: block !important;
	margin: 0 auto 7px;
	width: 100px;
	height: 100px;
	background: red;
	text-align: center;
	font-size: 14px;
	color: #666666;
}
.sharebox2>a{
	display: inline-block;
	font-size: 14px;
	color: #666666;
	text-align: center;
	width: 120px;
}
.sharebox2>a>img{
	display: block;
	margin:0 auto 8px;
	width: 40px;
	height: 40px;
}
</style>
