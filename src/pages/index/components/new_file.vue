<template>
	<div class="fixCoBox">
		<div class="fixCoBox1 sharebox">
			<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/cj_00.png" class="fixCoBox2">
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
			
			if(da=='error' || da=='104'){
				return
			}
			this.fxUrl1 = 'http://service.weibo.com/share/share.php?url='+da.url+'&title='+da.title+'&ralateUid=1733083617&appkey=163310332&pic='+da.pic+'#_loginLayer_1557135339222';
			this.fxUrl2 = 'http://connect.qq.com/widget/shareqq/index.html?url=';
			this.fxUrl2+=window.location.href;
			this.fxUrl2+='&title='+da.title+'&pics='+da.pic+'&summary='+da.summary;
			this.fxUrl2+=;
			
			
			this.fxUrl3 = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+da.href+'&title='+da.title+'&pics='+da.pic+'&summary='+da.summary+'&desc=&site=xx';
			
	
		
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
