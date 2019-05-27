<template>
	<div class="hfBox">
		<Input class="userBoxd2" v-model="pl2" :oType="'max'" :max="140" :type="'text'" :placeholder="hfnc" ref="tageds1"></Input>	
		<span :class="chekcont(pl2)==true?'iscsbtn':''" @click="addComment(pl2,index,index2)">回复</span>
	</div>
</template>
<script>
</script>

<style>
.hfBox{
	display: flex;
	width: 100%;
	margin: 17px auto 0;
}

.hfBox input{
	padding: 0 10px;
}
.hfBox .tip{
	display: none;
}
.hfBox .nubMax{
	display: none;
}
.hfBox .userBoxd2{
	flex: 1;
	margin-left: 58px;
	margin-bottom: 20px;
	
}
.hfBox .myInput{
	border: 1px solid #979797;
	border-radius: 5px;
	padding: 1px;
}
.hfBox span{
	display: inline-block;
	background: #666666;
	border-radius: 5px;
	width: 102px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 14px;
	color: #fff;
	margin-left: 14px;
}
</style>
