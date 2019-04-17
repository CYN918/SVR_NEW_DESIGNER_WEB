<template>
	<div>
		<tophead></tophead>
		<div class="setUserBox">
			<div class="setUserBoxs">
				<div class="setUserBoxs_nav">
					<div class="action">个人资料</div>
					<div>教育背景</div>
					<div>联系方式</div>
					<div>个人链接</div>
				</div>
				<div class="setUserBoxs_cent">
					<div class="suc_1">
						<div class="suc_title">个人资料</div>
					</div>
					<div class="suc_2">
						<div class="suc_title">教育背景</div>
					</div>
					<div class="suc_3">
						<div class="suc_title">联系方式</div>
					</div>
					<div class="suc_4">
						<div class="suc_title">个人链接</div>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
import tophead from './myHead2';
import {Message} from 'element-ui'
export default {
	name: 'works',
	components:{tophead},
	data(){
		return {
		}
	},
	mounted: function () {			
		
		
	}, 
	methods: {
		
	}
}
</script>

<style>
.setUserBox{
	min-height: 754px;
}
.setUserBoxs{
	padding-top: 20px;
	width: 1300px;
	margin: 0 auto;
	text-align: left;
}
.setUserBoxs_nav{
	margin-right: 20px;
	vertical-align: top;
	display: inline-block;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 310px;
	height: 206px;
}
.setUserBoxs_nav>div{
	position: relative;
	line-height: 50px;
	font-size: 16px;
	color: #1E1E1E;
	border-bottom: 1px solid #E6E6E6;
	text-indent: 30px;
	cursor: pointer;
}
.setUserBoxs_nav>div:last-child{
	border-bottom: 0;
}
.setUserBoxs_nav>div.action{
	color: #FF5121;
}
.setUserBoxs_nav>div.action:after{
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	background: #FF5121;
	width: 3px;
	height: 100%;
	
}
.setUserBoxs_cent{
	display: inline-block;
}
.setUserBoxs_cent>div{
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 910px;
	padding: 27px 30px;
	margin-bottom: 20px;
}
</style>
