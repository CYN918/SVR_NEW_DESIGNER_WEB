<template>
	
	<div :class="['msc_1',isfuse]">

		<input v-model="mode1" placeholder="请选择" @focus="cs" @blur="bfn" autocomplete="off" readonly="readonly" type="text" />
		<i></i>
		<div v-if="isfuse" class="msc_2">
			<div @click="xzz()" class="onca">11111</div>
			
			
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
export default {
	data(){
		return{
			mode1:'',
			isfuse:'isfuse',
		}
	},
	methods: {
		cs(){
			this.isfuse='isfuse';
		},
		bfn(){
			setTimeout(()=>{
				this.isfuse='';
			},200);
			
		},
		xzz(){
			console.log(1111111111);
			this.mode1=1111;
			console.log(this.mode1);
		}
	}
	
	
}
	
	
	
</script>

<style>
.msc_1{
	position: relative;
	box-sizing: border-box;
	width: 120px;
	height: 40px;
	font-size: 14px;
	line-height: 40px;
	border-bottom: 1px solid #bbb;
}	
.msc_1>input{
	position: absolute;
	top: 0;
	left: 0;
	/*-webkit-opacity: 0;
	opacity: 0;*/
	width: 100%;
	height: 100%;
	border: none;
	background: no-repeat;
	
}
.msc_1>input:focus .msc_2{
	display: block;
}	
.msc_2{
	position: absolute;
	top: 50px;
	padding: 10px 0;
	width:300px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;
	font-size:14px;
	line-height:40px;
	color:rgba(51,51,51,1);
}	
.msc_2>div{
	cursor: pointer;
	box-sizing: border-box;
	padding: 0 20px;
	height: 40px;
}

.msc_2>div.onca{
	color: #FF5121;
}
.msc_2>div:hover{
	background:rgba(242,242,242,1);
}

.msc_1>i{
	position: absolute;
	right: 0;
	top: 0;
	width: 10px;
	height: 100%;
}


.msc_1>i:after{
    content: "";
    display: inline-block;
    position: absolute;
    top: 39%;
    right: 17%;
    width: 5px;
    height: 5px;
    border: 1px solid #bbb;
    border-bottom: 0;
    border-right: 0;
	transition: transform .4s;
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
    transform-origin: center;
}
.isfuse>i:after{
	-webkit-transform: rotate(45deg) translate(3px,2px);
    transform: rotate(45deg) translate(3px,2px);
}
</style>