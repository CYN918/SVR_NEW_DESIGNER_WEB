<template>
	<div class="ps_tip_01">
		<div class="ps_tip_02">
			<div class="ps_tip_02_1">投稿必读</div>
			<div class="ps_tip_02_2">“睡后收入”才是最高效的赚钱之道。</div>
			<img @click="close()" class="ps_tip_02_3 pend" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/cj_00.svg">
		</div>
		<div class="ps_tip_03 ">
			<div>
				<img :src="setImgU('push_Zp/1.svg')">
				<div class="ps_tip_04">作品投稿要求</div>
				<div class="ps_tip_05">投稿作品必须是原创作品</div>
				<div class="ps_tip_06">
					作品必须为上传者100%完全独立拥有版权的原创作品，抄袭、非原创作品投稿产生的后果损失，按照
					<a>《供稿人协议》</a>由上传者承担一切责任。
				</div>
				<div class="ps_tip_05">
					作品源文件
				</div>
				<div class="ps_tip_06">需保证作品源文件（首选psd文件）图层结构清晰、元素命名清楚。</div>
			</div>
			<div>
				<img :src="setImgU('push_Zp/2.svg')">
				<div class="ps_tip_04">收益计算规则</div>
				<div class="ps_tip_05">一经验收 永久分成</div>
				<div class="ps_tip_06">
					验收作品素材会应用到多个与狮圈儿合作的投放渠道，产生的收益与作者按照《供稿人协议》规则进行分成结算（月结）。
				</div>
				<div class="ps_tip_05">项目与收益的关系</div>
				<div class="ps_tip_06">
					投稿作品审核通过后，会在 <a href="">[我的项目]</a>生成你的已验收项目记录，你可以通过该项目在
					<a href="">[我的收益]</a>内查询收益记录。详细操作请<a href="">点此查看</a>
				</div>
				<div class="ps_tip_05">收益的不确定性</div>
				<div class="ps_tip_06">
					除了作品本身质量和水准外，与投稿渠道的适配度，市场效果等因素都会对最终收益产生影响。
					狮圈儿无法承诺作者每月获得的收益金额，但会尽可能的为作者争取最大收益。
				</div>
			</div>
			<div>
				<img :src="setImgU('push_Zp/3.svg')">
				<div class="ps_tip_04">其他须知</div>
				<div class="ps_tip_05">作品授权</div>
				<div class="ps_tip_06">
					投稿作品验收后，平台将正式获得作者授权，拥有该作品知识产权的商业使用权利，投稿作品的著作权仍归作者所有。
				</div>
				<div class="ps_tip_05">审核时长：约1周</div>
				<div class="ps_tip_06">
					由于作品投稿数量较多，同时也需要评审多个投放渠道适配度，隐私需1周左右时间审核，敬请见谅。更多疑问请点击联系<a href="">平台运营QQ</a>
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
	height:560px;
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
	height: 490px;
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
	line-height:20px;
	margin-bottom: 20px;
}
.ps_tip_06>a{
	color: #33B3FF;
}
</style>
