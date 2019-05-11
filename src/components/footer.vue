<template>

		<footer class="footerBox">
			<span>关于我们</span>
			<span>用户协议</span>
			<span>授权协议</span>
			<span @click = help>帮助中心</span>
			<span @click="showFdb">意见反馈</span>
			<span>©2019 掌酷</span>
			<span>沪ICP备15021426号</span>
			<feedback v-if="fd"></feedback>
		</footer>
</template>
<script>
	import feedback from './feedback.vue'
	export default {
        components:{feedback},
	    data(){
	        return {
	            fd:false,
			}
		},
		methods:{
	        showFdb(){
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
	cursor: pointer;
}
.footerBox>span:last-child{
	margin-right: 0;
}
</style>
