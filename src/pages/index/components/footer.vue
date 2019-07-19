<template>

		<footer class="footerBox">
			<span class="pend" @click="goPu('/text/about','关于我们')">关于我们</span>
			<span class="pend" @click="goPu('/text/userProtocol','用户协议')">用户协议</span>
			<span class="pend" @click="goPu('/text/authorization','授权协议')">授权协议</span>
			<span class="pend" @click="goPu('/text/help','帮助中心')">帮助中心</span>
			<span class="pend" @click="showFdb">意见反馈</span>
			<span>©2019 掌酷</span>
			<span @click="banh">粤ICP备15039011号</span>
			<feedback v-if="fd"></feedback>
			
			<a class="qqKf" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=363741945&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:363741945:51" alt="在线咨询" title="在线咨询"/></a>
			
			
		</footer>
</template>
<script>
import {Message} from 'element-ui'
import feedback from './feedback.vue'
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
					Message('请先登录');
					return
				}
	            this.fd = true;
			},
			heid(){
	            this.fd = false
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
	margin-top: -60px;
	width: 100%;
	min-width: 1300px;
    height: 60px;
    background: #2e2f30;
	font-size: 14px;
	color: #FFFFFF;
	line-height: 60px;
	z-index: 100000;
}
.footerBox>span{
	margin-right: 72px;
}
.footerBox>span:last-child{
	margin-right: 0;
}
.qqKf{
	position: fixed;
	bottom: 120px;
	right: 40px;
}
</style>
