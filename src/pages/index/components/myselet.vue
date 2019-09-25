<template>
	
	<div class="msc_1">
		<input type="text" />
		<div class="msc_2">
			
			
		</div>
	</div>
	
	
	<!--<div class="worksBox_2 tg_iocn_2">
			<div class="worksBox_2_1">
				<div v-if="obj.status==3" @click="showTc('Stop')">终止项目</div>
				<div @click="showTc('Log')">交稿记录</div>
				<div v-if="obj.contract_file.length>0" class="worksBox_2_3">下载合同 <span class="js_0013"></span>
					<div class="worksBox_2_4">
						<div v-for="(el,index) in obj.contract_file" :key="index" @click="dowun(el.file_url)">{{el.file_name}}</div>						
					</div>
				</div>
			</div>
	</div>		-->
</template>

<script>
</script>

<style>
.worksBox_2{
	cursor: pointer;
	position: absolute;
	right: 0;
	top: 0;
	font-size: 14px;
	color: #666666;
	text-align: center;
	width: 95px;
}
.worksBox_2:after{
	content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    border: 1px solid #666;
    border-bottom: 0;
    border-right: 0;
	margin-left: 8px;
    transform: rotate(-135deg);
    transform-origin: 70% 20%;
}
.worksBox_2:hover>.worksBox_2_1{
	display: block;
}
.worksBox_2_1{
	display: none;
	position: absolute;
	top: 19px;
	right: 0;
	z-index: 99;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 95px;
	padding: 10px 0;
	
}
.worksBox_2_1>div{
	line-height: 30px;
	font-size: 14px;
	color: #333333;
}
.worksBox_2_1>.oncdf{
	color: #FF5121;
}
.worksBox_2_1>div:hover{
	background: #E6E6E6;
}
</style>