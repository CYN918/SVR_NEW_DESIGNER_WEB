<template>
	<div v-if="is" class="pr_tc_01">
		<div class="pr_tc_02" :style="'background-image: url('+imgSig+'newHome/sign_bg.svg'+')'">
		    <p class="login_p1" v-if="config.num == 1">登陆狮圈儿</p>
			<p class="login_p1" v-if="config.num == 2">注册狮圈儿</p>
			<p class="login_p1" v-if="config.num == 3">寻找狮圈儿</p>
		    <p class="login_p2">让创意更有价值，让生活更加自由</p>			
			<slot name="todo"></slot>	
		</div>
	</div>
</template>
<script>
export default {
	props:{
		config:Object,
	},
	data(){
		return{
			is:'',
		}
	},
	beforeDestroy:function(){
		document.body.style = "";
	},
	created(){
		
	},
	methods: {	
		show(){			
			this.is = 1;
			document.body.style = "overflow: hidden;";
		},

		close(){
			document.body.style = "";
			this.is = '';
			// if(!this.config.closeFn){
			// 	return	
			// }
			// if(this.$parent[this.config.closeFn]){
			
			// 	this.$parent[this.config.closeFn]();
			// 	return
			// }
			// if(this.$parent.$parent[this.config.closeFn]){
				
			// 	this.$parent.$parent[this.config.closeFn]();
			// 	return
			// }
						
		},
	},
	watch:{
		'is'(){
			if(this.is==''){
				document.body.style = "";
			}else{
				document.body.style = "overflow: hidden;";
			}
		}
	}
}	
</script>
<style scoped="scoped">
.pr_tc_01{
	position: fixed;
	z-index: 10000;
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
	box-shadow:none;
	border-radius: 0px;
	min-width: 444px;
	min-height: 675px;
	background: none;
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
.login_p1{
	width:210px;
	height:66px;
	font-size:42px;
	font-family:PingFangSC-Semibold,PingFang SC;
	font-weight:600;
	color:rgba(0,102,180,1);
	line-height:66px;
	position: absolute;
    left: 175px;
    top: 60px;
}
.login_p2{
	height:22px;
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:22px;
	position: absolute;
    left: 175px;
    top: 125px;
}

</style>
