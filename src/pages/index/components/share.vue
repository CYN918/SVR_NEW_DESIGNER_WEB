<template>
	<TcBox :config="config" ref="tcBox">
		<template v-slot:todo="{ todo }">
			<div class="xm_shar_01">
				<div class="xm_shar_01_1">
					<vue-qr class="xm_shar_01_2" :logoSrc="config.logo" :text="config.value" :logoScale="96" :size="200" :margin="0"></vue-qr>
					分享到微信
				</div>
				<div class="xm_shar_01_3">
					
					<a @click="tzld(fxUrl1,'新浪')">
						<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/zc_icon_wb.png" alt="">
						新浪
					</a>
					<a @click="tzld(fxUrl2,'QQ')">
						<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/zc_icon_qq.png" alt="">
						QQ
					</a>
					<a @click="tzld(fxUrl3,'QQ空间')">
						<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/Group 5.png" alt="">
						QQ空间
					</a>
				</div>
				
				<div class="xm_shar_01_4">
					<input v-model="onUrl" type="text" ref="copd"/>
					<span @click="copy" class="btns xm_shar_01_4b pend">复制</span>
				</div>
			</div>
		</template>			
	</TcBox>
</template>
<script>
import TcBox from './TcBox';
import VueQr from 'vue-qr'
export default {
	components:{TcBox,VueQr},
	props:{
		shareData:Object
	},
	data(){
		return{
			config:{
				title: '作品分享',
				scroll:1,
				value: '',
				logo:''
			},
			fxUrl1:'',
			fxUrl2:'',
			fxUrl3:'',
			onUrl:'',
		}
	},
	mounted: function(){

	},
	methods: {	
		copy(){
			this.$refs.copd.select();
			document.execCommand("copy");
			this.$message({message:'复制成功'});
		},
		

		showShare(type){
			if(this.shareData.bdtj){
				this.bdtj(this.shareData.bdtj[0],this.shareData.bdtj[1]+'关闭','--')
			}
			this.$refs.tcBox.show();
		},
		tzld(ur,a){
			if(this.shareData.bdtj){
				this.bdtj(this.shareData.bdtj[0],this.shareData.bdtj[1]+a,'--')
			}			
			window.open(ur);
		},
		setUrl(da){
			if(da=='error'){return}
			let ulrd = encodeURIComponent(da.url);
			this.config.value = da.url;
			this.config.title=da.titlec;
			this.onUrl = window.location.href;
			this.fxUrl1 = 'http://service.weibo.com/share/share.php?appKey=3473072390&title='+da.title+'&url='+ulrd+'&pic='+da.pics+'#_loginLayer_'+(new Date()).valueOf();
			this.fxUrl2 ='https://connect.qq.com/widget/shareqq/index.html?url='+ulrd+'&title='+da.title+'&pics='+da.pics+'&desc=&summary='+da.summary+'&site=wo';			
			this.fxUrl3 = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+ulrd+'&title='+da.title+'&pics='+da.pics+'&summary='+da.summary+'&desc=&site=xx';
		},
		
		
		
	}
}		
	
</script>

<style>
.xm_shar_01{
	width: 560px;
	padding: 30px 0;
}
.xm_shar_01_1{
	display: block;
    margin: 0 auto 7px;
    width: 96px;
	font-size:14px;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.xm_shar_01_2{
	display: block;
    margin: 0 auto 7px;
    width: 96px;
    height: 96px;
}
.xm_shar_01_3{
	margin-bottom: 30px;
}
.xm_shar_01_3>a{
	cursor: pointer;
	display: inline-block;
	font-size: 14px;
	color: #666666;
	text-align: center;
	width: 120px;
}
.xm_shar_01_3>a>img{
	display: block;
	margin:0 auto 8px;
	width: 40px;
	height: 40px;
}
.xm_shar_01_4>input{
	display: inline-block;
	border: 1px solid #BBBBBB;
	padding: 0 10px;
	width:217px;
	height:38px;
	border-radius:5px;
	font-size:14px;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:38px;
}
.xm_shar_01_4b{
	width: 100px;
}
</style>
