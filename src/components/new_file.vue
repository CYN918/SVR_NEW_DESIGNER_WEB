<template>
	<div class="fixCoBox">
		<div class="fixCoBox1 sharebox">
			<img src="/imge/cj_00.png" class="fixCoBox2">
			<div class="sharebox1"></div>
			<div class="sharebox2">
				<a :href="fxUrl1">新浪</a>
				<a :href="fxUrl2">QQ</a>
				<a :href="fxUrl3">QQ空间</a>
			</div>
		</div>
	</div>
</template>
<script>
export default {
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
		}
	},
	mounted: function () {	
		this.init();
		
	}, 
	methods: {	
		init(){
			
			


		},
		showShare(type){
			this.shareType = type?type:false;
		},
		setUrl(da){
			console.log(da)
			if(!da){
				return
			}
			this.fxUrl1 = 'http://service.weibo.com/share/share.php?url=';
			this.fxUrl1+=window.location.href;
			this.fxUrl1+='&sharesource=weibo&title='+da.title;			
			this.fxUrl1+='&pic='+da.pic+'&appkey=2706825840&sudaref=zixuephp.net&display=0&retcode=6102#_loginLayer_1528860698455';
			
			this.fxUrl2 = 'http://connect.qq.com/widget/shareqq/index.html?url=';
			this.fxUrl2+=window.location.href;
			this.fxUrl2+='&title='+da.title+'&desc='+da.desc+'&summary='+da.summary;
			this.fxUrl2+='&pic='+da.pic;
			
			this.fxUrl3 = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=';
			this.fxUrl3+=window.location.href+'?sharesource=qzone';
			this.fxUrl3+='&title='+da.title+'&pic='+da.pic+'&summary='+da.summary;
	
		
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

</style>
