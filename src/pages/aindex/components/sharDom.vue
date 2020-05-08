<template>
	<div class="sharBox">
		<img class="sharBox_1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/webapp/qdt.png">
		<div class="sharBox_2">
			<div class="sharBox_3">请复制链接分享给好友</div>
			<div @click="close" class="sharBox_4">知道了</div>
		</div>
	</div>
</template>

<script>
export default{
	methods:{
		close(){
			this.$emit('input',{});
		},
	}
}
</script>

<style>
.sharBox{
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0,0,0,.5);
	width: 100%;
	height: 100%;
}
.sharBox_1{
	position: absolute;
	right: 1rem;
	top: 1rem;
	width: 4rem;
}
.sharBox_2{
	position: absolute;
    top: 9rem;
    text-align: center;
    color: #fff;
    width: 100%;
    left: 0;
    font-size: 1rem;
}
.sharBox_4{
	width: 4rem;
    border: .05rem solid #fff;
    border-radius: .2rem;
    margin: 4rem auto;
    line-height: 1.6rem;
    font-size: .8rem;
}
</style>
