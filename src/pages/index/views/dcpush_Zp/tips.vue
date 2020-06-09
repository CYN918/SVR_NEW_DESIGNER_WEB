<template>
	<div class="ps_tip_01">
		<div class="ps_tip_02">
			<div class="ps_tip_02_1">多次交稿 注意事项</div>
			<img @click="close()" class="ps_tip_02_3 pend" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/cj_00.svg">
		</div>
		<div class="ps_tip_03 ">
			<div>
				<img :src="setImgU('push_Dc/1.svg')">
				<div class="ps_tip_04">功能使用场景</div>
				<div class="ps_tip_06">
					多次交稿功能，主要是针对已经被平台分派过项目的设计师，如果同一个项目需求你有多个可交稿的作品稿件，即可在这里完成交稿。
				</div>
			</div>
			<div>
				<img :src="setImgU('push_Dc/2.svg')">
				<div class="ps_tip_04">交稿的项目选择</div>
				<div class="ps_tip_06">
					多次交稿，仅支持选择已报名通过的未下架长期项目进行交稿；新的项目需求请先从[项目列表]处报名，等待平台运营确认能力后分派项目。
				</div>
				
			</div>
			<div>
				<img :src="setImgU('push_Dc/3.svg')">
				<div class="ps_tip_04">收益结算</div>
				<div class="ps_tip_06">
					交稿提交后，你可以在[我的项目]内查看到此次投稿生成的“待审核”项目，结算方式（买断或永久分成）与首次投稿的项目规则一致。
				</div>	
				<div class="ps_tip_06">
					验收通过后，你可以在[收益中心]内查询到该项目收益情况。
				</div>	
			</div>
			<div>
				<img :src="setImgU('push_Dc/3.svg')">
				<div class="ps_tip_04">多次交稿的次数限制</div>
				<div class="ps_tip_06">
					项目多次交稿，默认每日限10次。
				</div>
				<div class="ps_tip_06">
					长期合作设计师、狮圈儿合作方，或其他特殊情况，若有多个数量作品的交稿需求，请点击联系平台运营QQ单独申请。
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
	height:460px;
	background:rgba(255,255,255,1);
	box-shadow:0px 8px 32px 0px rgba(0,0,0,0.08);
	border-radius:8px;

}
.ps_tip_02{
	position: relative;
	border-bottom: 1px solid rgba(217,217,217,1);
	height: 62px;
	width: 100%;
	text-align: center;
}
.ps_tip_02_1{

font-size:20px;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
color:rgba(40,40,40,1);
line-height:60px;
}
.ps_tip_02_2{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
}
.ps_tip_02_3{
	position: absolute;
    top: 25px;
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
	width: 260px;
	margin-right: 37px;
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
