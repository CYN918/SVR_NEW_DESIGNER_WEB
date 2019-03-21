<template>
	<div>
		<div class="banner">
			<div class="banner_nav1">
				<span></span>
				<span></span>
				<span class="action"></span>
				<span></span>
			</div>
			<div class="banner_jt pend banner_jt1"></div>
			<div class="banner_jt pend banner_jt2"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'home',
	data(){
		return {
			
		}
	},
	methods: {
		
	}
}
</script>

<style>
.banner{
	position: relative;
	margin: 20px auto;
	width: 1300px;
	height: 328px;
	-webkit-box-shadow: 0 0 8px 0 rgba(0,0,0,.2);
	box-shadow: 0 0 8px 0 rgba(0,0,0,.2);
    border-radius: 8px;
	/* background: red; */
}
.banner_jt{
	position: absolute;
	top: 144px;
	width: 36px;
	height: 36px;
	opacity: 0.2;
	background: #000000;
	border-radius: 5.62px;
}
.banner_jt:after{
    content: "";
    position: absolute;
	
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border: 2px solid #fff;
    border-right: 0;
    border-bottom: 0;
    -webkit-transform: translate(-35%,-50%) rotate(-45deg);
    transform: translate(-35%,-50%) rotate(-45deg);
}
.banner_jt1{	
    left: 44px;
}
.banner_jt2{	
    right: 44px;
    -webkit-transform: rotate(180deg);
	transform: rotate(180deg);
}
.banner_nav1{
	position: absolute;
	bottom: 15px;
	width: 100%;
	text-align: center;
}
.banner_nav1>span{
	width: 8px;
	height: 8px;
	display: inline-block;
	background: #D8D8D8;
	border-radius: 2px;
	margin-right: 5px;
}
.banner_nav1>span:last-child{
	margin-right: 0;
}
.banner_nav1>span.action{
	background: #FF5121;
}
.banner_nav1>span:hover{
	cursor: pointer;

}
</style>
