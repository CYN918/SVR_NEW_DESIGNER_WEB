<template>
		<footer class="footerBox">
			<div class="footerBox_1">
				<span class="pend" @click="goPu('/about','关于我们')">关于我们</span>
				<span class="pend" @click="goPu('/userProtocol','用户协议')">用户协议</span>
				<span class="pend" @click="goPu('/authorization','授权协议')">供稿人协议</span>
				<span class="pend" @click="goPu('/help','帮助中心')">帮助中心</span>
				<span class="pend" @click="showFdb">意见反馈</span>
			
				
			</div>
			<div class="footerBox_2">
				<span>© 2015-{{new Date().getFullYear()}} 深圳掌酷软件有限公司</span><a target="_blank" @click="banh" href="http://beian.miit.gov.cn">粤ICP备15039011号</a><a target="_blank" href="http://www.beian.gov.cn"><img class="footer_ga" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/footer_ga.png">粤公网安备 44030502004296号</a>
			</div>
			<feedback ref="feedback"></feedback>
			
			<div @click="goFn('/syPage',['来电秀工具-列表页','侧浮栏[下载app]','--'])" class="tfpifbox">
				<img class="tfpifbox1" :src="setImgU('tools/ip.svg')">
				<div class="tfpifbox2">
					<img class="tfpifbox2_1" :src="setImgU('tools/icon_download.svg')"/>
					<span class="tfpifbox2_2">下载手机端</span>
				</div>
			</div>
			
		</footer>
</template>
<script>
import feedback from '../components/feedback.vue'
export default {
        components:{feedback},
	    data(){
	        return {
	            fd:false,	
			}
		},
		methods:{
			banh(){
				this.bdtj('底部栏','底部栏点击_备案号','--');
			},
			goPu(ud,b){
				
				this.bdtj('底部栏','['+ b +']','--');
				if(!ud){return}
				this.$router.push({path:ud})
			},
	        showFdb(){
				this.bdtj('底部栏','意见反馈','--');
				if(!window.userInfo || !window.userInfo.access_token){
					this.$message({
						message:'请先登录'
					})
					
					this.$router.push({
						path:'/login'
					})
					return
				}
				this.$refs.feedback.show();
			},
			help(){

	            this.$router.push({
					path:'/documentCenter'
				})
			},
		},
	}
</script>
<style>
.tfpifbox{
	cursor: pointer;
    position: fixed;
    bottom: 340px;
    right: 49px;
	
}
.tfpifbox2{
	position: absolute;
	top: 56px;
	left: 0;
	width:84px;
	height:94px;
	background:rgba(255,255,255,1);
	border-radius:4px;
	border:1px solid rgba(0,102,180,1);
}
.tfpifbox2_1{
	display: block;
	width: 26px;
	margin: 16px auto 11px;
}
.tfpifbox2_2{
	display: block;
	text-align: center;
	font-size:12px;
	color:rgba(30,30,30,1);
	line-height:18px;
}
</style>
