<template>
	<div class="ps_tip_01">
		<div class="ps_tip_02">
			<div class="ps_tip_02_1">多次投稿注意事项</div>
			<img @click="close()" class="ps_tip_02_3 pend" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/cj_00.svg">
		</div>
		<div class="ps_tip_03 ">
			<div>
				<div class="ps_tip_04">关于项目多次交稿</div>
				<div class="ps_tip_06">
					对于已经在狮圈儿平台完成某一设计项目交付，并再次或持续有同一设计项目交稿需求的设计师，可以通过此交稿通道快速提交稿件，免去重新报名审核的流程。
				</div>
			</div>
			<div>
				<div class="ps_tip_04">交稿项目选择</div>
				<div class="ps_tip_06">
					目前，多次交稿仅支持已完成上次作品交付，且仍处于征集期的设计项目；新项目投稿请从<a href="/#/project" target="_blank">[项目列表]</a>处报名，并等待确认设计能力后分派项目。
				</div>
				
			</div>
			<div>
				<div class="ps_tip_04">项目收益</div>
				<div class="ps_tip_06">
					多次交稿项目的结算方式（买断或永久分成）与首次投稿的项目一致；提交稿件后，可以在<a href="/#/projectZz" target="_blank">[我的项目]</a>中查看此稿件的审核状态。完成审核后，可以在<a href="/#/profit" target="_blank">[收益中心]</a>查询到该项目的收益情况。
				</div>	
			</div>
			<div>
				<div class="ps_tip_04">次数限制</div>
				<div class="ps_tip_06">
					项目多次交稿，每日默认限制次数为10次。
				</div>
				<div class="ps_tip_06">
					如有狮圈儿合作方、长期合作设计师或其他特殊情况需要更多提交作品的次数，请点击联系<a :href="contactQQ" target="_blank">平台运营</a>处理。
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
		}
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
	line-height:24px;
	margin-bottom: 20px;
}
.ps_tip_06>a{
	color: #33B3FF;
}
</style>
