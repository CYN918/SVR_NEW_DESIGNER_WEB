<template>
	<div>
		<img class="ac_list_Box_1" :src="'http://zk-web-object.oss-cn-qingdao.aliyuncs.com/d5c2000e818cbbd47bddc7a638e3665e.png'" alt="">
		<div class="ac_list_Box_2">
			<div class="ac_list_Box_4">{{el.activity_name}}</div>
			<div class="ac_list_Box_5"><span>{{el.category_name}}</span>投稿时间：{{el.start_time.split(" ")[0]}} 至 {{el.end_time.split(" ")[0]}}</div>
			<div class="ac_list_Box_3">
				<span v-if="el.left_day" class="ac_list_Box_6">{{el.left_day}}天</span><span v-if="el.left_day" class="ac_list_Box_7">距离截止</span>
				<span v-if="!el.left_day" class="ac_list_Box_8">已结束</span>
			</div>
		</div>	
	</div>			
	
</template>

<script>
export default {

	props:{
		el:{
			type:Object,
			default:{}
		}
	},

}
	
	
	
</script>

<style>
.ac_list_Box_1{

	border-radius: 5px 5px 0 0;
	display: block;
	width: 100%;
	height: 360px;
}
.ac_list_Box_2{
	position: relative;
	padding: 22px 20px 23px;
}
.ac_list_Box_4{
	font-size: 16px;
	color: #1E1E1E;
	margin-bottom: 14px;
}
.ac_list_Box_5{
	font-size: 14px;
	color: #999999;
}
.ac_list_Box_5>span{
    font-size: 12px;
    color: #999999;
    padding: 5px 10px;
    background: #E6E6E6;
    border-radius: 2px;
	margin-right: 10px;
}
.ac_list_Box_3{
	position: absolute;
	bottom: 26px;
	right: 20px;
	text-align:right;
}
.ac_list_Box_6{
	display: block;
	font-size: 16px;
	color: #1D1D1D;
	margin-bottom: 4px;
}
.ac_list_Box_7{
	font-size: 14px;
	color: #999999;
}
.ac_list_Box_8{
	display: inline-block;
	font-size: 16px;
	color: #999999;
	margin-bottom: 12px;
}
.fycen{
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
	text-align: center;
	box-sizing: border-box;

}

</style>
