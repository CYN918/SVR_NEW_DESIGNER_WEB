<template>
	<div class="ps_tip_01">
		<div class="ps_tip_02">
			<div class="ps_tip_02_1">投稿必读</div>
			<div class="ps_tip_02_2">“睡后收入”才是最高效的赚钱之道。</div>
			<img @click="close()" class="ps_tip_02_3 pend" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/cj_00.svg">
		</div>
		<div class="ps_tip_03 ">
			<div>
				<div class="ps_tip_04">作品供稿须知</div>
				<div class="ps_tip_05">作品要求</div>
				<div class="ps_tip_06">
					我们接收插画、图标、动效、短视频、摄影、字体和矢量图形等供稿作品，提交作品时请同时提交作品源文件（首选PSD文件），文件请注意图层结构清晰、元素命名清楚。
				</div>
				<div class="ps_tip_05">
					供稿作品必须为原创作品
				</div>
				<div class="ps_tip_06">作品必须为上传者100%拥有完整独立版权的原创作品，如涉及抄袭、临摹和盗取他人作品的行为，需按照<a href="/#/authorization" target="_blank">《狮圈儿平台供稿人协议》</a>承担因非原创稿件产生的一切不良后果。</div>
			</div>
			<div>
				<div class="ps_tip_04">作品收益规则</div>
				<div class="ps_tip_05">一经录用，开启作品分成收益</div>
				<div class="ps_tip_06">
					狮圈儿与众多一线移动终端企业密切合作，被录用的作品素材将会分发至多个投放渠道并产生收益，作者可根据<a href="/#/authorization">《供稿人协议》</a>规则获得收益分成（按月结算）。
				</div>
				<div class="ps_tip_05">作品收益记录</div>
				<div class="ps_tip_06">
					供稿作品被录用后，将会在<a href="/#/projectYs" target="_blank">[我的项目]</a>中生成一个已验收项目记录，该作品项目所产生的具体收益记录可以在<a href="/#/profit" target="_blank">[我的收益]</a>中查询。详细操作请点此查看
				</div>
				<div class="ps_tip_05">上传更有竞争力的作品</div>
				<div class="ps_tip_06">
					由于分发渠道的特殊性，适用于手机终端商业使用的作品往往会有更高的录用率和收益金额，请注意观察手机终端渠道的用图需求。请避免上传随意创作的低质量作品。
狮圈儿无法承诺供稿人每月获得的收益金额，但尽可能会为创作者争取最大利益。
				</div>
			</div>
			<div>
				<div class="ps_tip_04">其他须知</div>
				<div class="ps_tip_05">作品授权</div>
				<div class="ps_tip_06">
					作者上传作品即视为同意将该作品的使用权授予平台，狮圈儿将在全球范围内拥有作品的商业使用权力，作品著作所有权仍归属于作者所有。
				</div>
				<div class="ps_tip_05">作品审核</div>
				<div class="ps_tip_06">
					作品审核周期：一般为5至10个工作日；
					<p>由于供稿作品数量较多，同时需要结合不同投放渠道需求的匹配度进行审核，所以请谅解。我们将会收到稿件后尽快进行审核~如有更多疑问请联系<a :href="contactQQ" target="_blank">平台客服</a>。</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	props:{
		value:Object
	},
	data() {
		return {
			qq: '3177059443'
		}
	},
	mounted: function(){
		this.init();
	},		
	beforeDestroy:function(){
		document.body.style = "";
	},
	methods: {	
		init(){
			document.body.style = "overflow: hidden;";
		},
		close(){
			this.$emit('input',{});
		},
	},
	computed: {
		contactQQ() {
			return "http://wpa.qq.com/msgrd?v=3&uin="+ this.qq + "&site=qq&menu=yes";
		}
	}
}
</script>

<style scoped="scoped">
.ps_tip_01{
	position: fixed;
	z-index: 10;
	left: 0;
	bottom: 0;
	width: 100%;
	background:rgba(255,255,255,1);
	box-shadow:0px 8px 32px 0px rgba(0,0,0,0.08);
	border-radius:8px;

}
.ps_tip_02{
	padding-top: 20px;
	position: relative;
	border-bottom: 1px solid rgba(217,217,217,1);
	height: 69px;
	width: 100%;
	text-align: center;
}
.ps_tip_02_1{
	margin: 0 auto 10px;
font-size:20px;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
color:rgba(40,40,40,1);
line-height:22px;
}
.ps_tip_02_2{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
}
.ps_tip_02_3{
	position: absolute;
    top: 37px;
    right: 30px;
    width: 12px;
}
.ps_tip_03{
	
	width: 100%;
	overflow: hidden;
	overflow-y: auto;
}
.ps_tip_03>div{
	display: inline-block;
	vertical-align: top;
	padding: 30px 0;
	width: 360px;
	margin-right: 40px;
	text-align: left;
}
.ps_tip_03>div>img{
	display: block;
	width: 100%;
	margin-bottom: 20px;
}
.ps_tip_03>div:last-child{
	margin-right: 0;
}
.ps_tip_04{
	margin-bottom: 20px;
	font-size:20px;
	font-weight:500;
	color:rgba(40,40,40,1);
	line-height:28px;
}
.ps_tip_05{
	font-size:14px;
	color:rgba(30,30,30,1);
	line-height:20px;
	margin-bottom: 10px;
}
.ps_tip_06{
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:24px;
	margin-bottom: 20px;
}
.ps_tip_06 a{
	color: #33B3FF;
}
</style>
