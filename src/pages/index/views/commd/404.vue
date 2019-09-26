<template>
	<div>
		<div class="mynoerr">
			<div class="kBg_01x">
			<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/empty_404.svg" alt="">
			
			<div>抱歉，您访问的页面不存在</div>
			<a href="/#/" class="errBT pend">返回首页</a>
			</div>
		</div>
		
	</div>

</template>

<script>
</script>

<style>
#app > div > div.mynoerr{position: relative;background: #fff;box-sizing: border-box;    min-height: 100%;
    padding: 0;}

.kBg_01x{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	width: 100%;		
    text-align: center;
 
    font-size:14px;
	color:#FF5121;
	line-height:24px;   
	 
}
.kBg_01x>img{
	display: block;
	width: 100%;
	margin-bottom: 15px;
	
}	
.errBT{
	cursor: pointer;
	margin-top: 40px;
	display: inline-block;
	color: #fff;
	font-size: 14px;
	text-align: center;
	line-height: 40px;
	width:140px;
	height:40px;
	background:rgba(255,81,33,1);
	border-radius:20px;
}
</style>

