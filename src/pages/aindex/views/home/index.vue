<template>
	<div>
		<div class="homeNav">
			<router-link to="/index">首页推荐</router-link>
			<router-link to="/activvity">最新活动</router-link>		
		</div>		
		<router-view/>
	</div>
	
</template>

<script>

export default {
	
	name: 'home',
	data(){
		return {
			data:{},
		}
	},
	
	mounted: function () {	
	
	}, 
	methods: {
	}
}
</script>

<style>
.homeNav{
	height: 2.5rem;
	line-height: 2.3rem;

	text-align: center;
	box-shadow:0px 2px 4px 0px rgba(0,0,0,0.05);
}
.homeNav>a{
	position: relative;
    display: inline-block;
    font-size: .79rem;
    color: #000;
    margin: 0 1.3rem;
}
.homeNav>a.router-link-active{
	color: #ff5121;
}
.homeNav>a.router-link-active:after{
    content: "";
    position: absolute;
    bottom: -.1rem;
    width: 70%;
    left: 50%;
    height: .12rem;
    background: #ff5121;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
}
</style>
