<template>
		<footer class="footerBox">
			<div class="footerBox_1">
				<span class="pend" @click="goPu('/about','关于我们')">关于我们</span>
				<span class="pend" @click="goPu('/userProtocol','用户协议')">用户协议</span>
				<span class="pend" @click="goPu('/authorization','授权协议')">授权协议</span>
				<span class="pend" @click="goPu('/help','帮助中心')">帮助中心</span>
				<span class="pend" @click="showFdb">意见反馈</span>
			
				
			</div>
			<div class="footerBox_2">
				<span>© 2015-2019 深圳掌酷软件有限公司</span><a target="_blank" @click="banh" href="http://beian.miit.gov.cn">粤ICP备15039011号</a><a target="_blank" href="http://www.beian.gov.cn"><img class="footer_ga" src="/imge/svg/footer_ga.png">粤公网安备 44030502004296号</a>
			</div>
			<feedback ref="feedback"></feedback>
			
			
			
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
				this.bdtj('通用模块','底部栏点击_备案号','--');
			},
			goPu(ud,b){
				
				this.bdtj('通用模块','底部栏点击_'+b,'--');
				if(!ud){return}
				this.$router.push({path:ud})
			},
	        showFdb(){
				this.bdtj('通用模块','底部栏点击_意见反馈','--');
				if(!window.userInfo || !window.userInfo.access_token){
					this.$message({
						message:'请先登录'
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
.footerBox{
	position: relative;
	margin-top: -150px;
	width: 100%;
	min-width: 1300px;
    height: 150px;
    background: #fff;
	font-size: 14px;
	color: #666;
	line-height: 60px;
}
.footerBox_1{
	line-height: 74px;
	border-bottom: 1px solid rgba(244,246,249,1);
}
.footerBox_1>span{
	margin-right: 72px;
}
.footerBox_1>span:last-child{
	margin-right: 0;
}
.qqKf{
	position: fixed;
	bottom: 120px;
	right: 40px;
}
.footerBox_2>a,.footerBox_2>span{
	
	line-height: 75px;
	font-size:14px;
	font-weight:400;
	color:rgba(102,102,102,1);
	margin: 0 25px;
}
.footerBox_2>a{
	cursor: pointer;
}
.footer_ga{
	display: inline-block;
	vertical-align: top;
    width: 20px;
    margin-top: 26px;
    margin-right: 5px;
}
</style>
