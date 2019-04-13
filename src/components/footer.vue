<template>
	<footer class="footerBox">
		<span>关于我们</span>
		<span>用户协议</span>
		<span>授权协议</span>
		<span>帮助中心</span>
		<span>意见反馈</span>
		<span>©2019 掌酷</span>
		<span>沪ICP备15021426号</span>
	</footer>
</template>

<script>
</script>

<style>
.footerBox{
	/*position: fixed;*/
    bottom: 0;
    left: 0;
    width: 100%;
	min-width: 1300px;
    height: 75px;
    background: #2e2f30;
	font-size: 16px;
	color: #FFFFFF;
	line-height: 75px;
	z-index: 100000;
}
.footerBox>span{
	margin-right: 72px;
}
.footerBox>span:last-child{
	margin-right: 0;
}
</style>
