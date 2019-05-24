<template>

		<footer class="footerBox">
			<span class="pend" @click="goPu('/text/about')">关于我们</span>
			<span class="pend" @click="goPu('/text/userProtocol')">用户协议</span>
			<span class="pend" @click="goPu('/text/authorization')">授权协议</span>
			<span class="pend" @click="goPu('/text/help')">帮助中心</span>
			<span class="pend" @click="showFdb">意见反馈</span>
			<span>©2019 掌酷</span>
			<span>沪ICP备15021426号</span>
			<feedback v-if="fd"></feedback>
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
			goPu(ud){
				if(!ud){return}
				this.$router.push({path:ud})
			},
	        showFdb(){
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
</style>
