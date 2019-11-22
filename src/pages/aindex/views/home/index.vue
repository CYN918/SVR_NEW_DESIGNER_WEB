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
	color: #33B3FF;
}
.homeNav>a.router-link-active:after{
    content: "";
    position: absolute;
    bottom: -.1rem;
    width: 70%;
    left: 50%;
    height: .12rem;
    background: #33B3FF;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
}

.homeList{
	width: 14.3rem;
	margin: 0 auto 1.7rem;
	
}
.homeList_1{
    width: 100%;
    height: 9.4rem;
    border-radius: .4rem;
	background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-repeat: no-repeat;
	margin-bottom: .6rem;
}
.nox{
	padding: 0 .5rem;
}
.homeList_2{
    font-size: .74rem;
    margin-bottom: .4rem;
    height: .7rem;
    line-height: .7rem;
}
.rigto{    
	float: right;
    font-size: .46rem;

}
</style>
