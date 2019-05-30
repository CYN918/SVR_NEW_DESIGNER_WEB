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
	mounted: function () {}, 
	methods: {	
		showShare(type){
			this.shareType = type?type:false;
		},
		setUrl(da){
			if(!da){return}
			let ulrd = encodeURIComponent(da.url);
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
