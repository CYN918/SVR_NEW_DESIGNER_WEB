<template>
	<div class="pr_tc_01">
		<div class="pr_tc_02">			
			<div class="pr_tc_04">
				{{title}}<img @click="close" class="pr_tc_03 pend" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/cj_00.svg" alt="">
			</div>
			<slot name="todo"></slot>	
		</div>
	</div>
</template>

<script>
export default {
	props:{
		title:String,
	},
	data(){
		return{}
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
			this.$parent.close();
		},

	}
}	
</script>

<style>
.pr_tc_01{
	position: fixed;
	z-index: 10001;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.3);
}
.pr_tc_02{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    -webkit-box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.1);
    box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;
	background: #fff;
}
.pr_tc_04{
	position: relative;
	padding: 0 44px 0 15px;
	height: 54px;
	text-align: left;
	font-size:14px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:54px;
	border-bottom: 1px solid rgba(244,246,249,1);
}
.pr_tc_03{
	position: absolute;
    top: 19px;
    right: 24px;
    width: 16px;
}

</style>
