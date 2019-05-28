<template>
	<div class="infoBox">
		<div class="infoTile">基本信息</div>
		<div class="info_1">
			<div><span>性别</span><span>{{da.sex==1?'男':'女'}}</span></div>
			<div><span>职业</span><span>{{da.vocation}}</span></div>	
			<div><span>所在地</span><span>{{da.province+'-'+da.city}}</span></div>	
			<div><span>个性签名</span><span>{{da.personal_sign?da.personal_sign:'这个人很懒，什么东西也没写'}}</span></div>	
			<div  v-if="da.home_page"><span>主页链接</span><span>{{da.home_page}}</span></div>	
		</div>
	</div>
</template>

<script>
export default {
	name: 'home',
	data(){
		return {
			da:{}
		}
	},	
	mounted: function () {	
		this.setData();
	}, 
	methods: {
		setImg(ur){
			return 'background-image: url('+ur+');';
		},
		setData(){
			if(!window.oioi){
				setTimeout(()=>{
					this.setData();					
				},200);			
			}
			this.da = window.oioi;
		},	
	},
}
</script>

<style lang="scss">
.infoBox{
	margin: 0 px2rem(20) px2rem(38);
}
.infoTile{
	font-size:px2rem(18);
	font-weight:500;
	color:rgba(30,30,30,1);
	line-height:px2rem(25);
	margin-bottom: px2rem(17);
}
.info_1>div{
	margin-bottom: px2rem(17);
}
.info_1>div>span{
	display: inline-block;
	vertical-align: top;
}
.info_1>div>span:first-child{
	margin-right: px2rem(15);
	width:px2rem(64);
	height:px2rem(22);
	font-size:px2rem(16);
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:px2rem(22);
}
.info_1>div>span:last-child{
	font-size:px2rem(16);
	font-weight:400;
	color:rgba(30,30,30,1);
	line-height:px2rem(22);
	max-width: 10.6rem;
}
</style>
