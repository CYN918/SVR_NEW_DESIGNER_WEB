<template>
	<footer class="footerBox">
		<div @click="goTop" class="backTop"></div>
		<img class="footerlog" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/header/logo.svg"/>
		<div class="footer_1">让创意更有价值，让生活更加自在</div>
		<div class="footer_2">Copyright @2019 SHIQUANER</div>
		<div class="footer_3">PC登录狮圈儿，寻找更多好作品</div>
	
	</footer>
</template>
<script>

export default {
     
	    data(){
	        return {
	         	
			}
		},
		methods:{
			goTop(){
				document.documentElement.scrollTop =1;
				document.body.scrollTop =1;
			}
		},
	}
</script>

<style>
.footerBox{
	position: relative;
    width: 100%;
    height: 8.1rem;
	text-align: center;
	color: #fff;
	box-sizing: border-box;
    background: url(/imge/svg/bottom_bg.svg) no-repeat 0/100%;
}
.footerlog{	
	display: inline-block;
	vertical-align: middle;
	width: 4.4rem;
	margin: 1.1rem 0 .7rem 0;
}
.footer_1{font-size: .51rem;
    margin-bottom: .7rem;
    color: #282828;}
.footer_2{font-size: .35rem;margin-bottom: .9rem;color: #282828;}
.footer_3{
    width: 14.3rem;
    height: 1.8rem;
    background: #33B3FF;
    margin: 0 auto;
	border-radius: .2rem;
    font-size: .776rem;
    line-height: 1.8rem;

}
.backTop{
	position: absolute;
    top: -2.3rem;
    right: .5rem;
    width: 2rem;
    height: 2rem;
    background: rgba(0,0,0,.2);
    border-radius: 50%;
}
.backTop:after{
	content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 25%;
    height: 25%;
    border-top: .1rem solid #fff;
    border-left: .1rem solid #fff;
    transform: translate(-45%,-25%) rotate(45deg);
}
</style>
