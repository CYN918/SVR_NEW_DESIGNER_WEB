<template>
	<div>
	    <div class="zp_up_01 pend">
			{{fileData.state==2?'重新选择':confg.btnName}}
			<uploadFile :sucss="sucss" v-model="fileData"></uploadFile>
		</div>	  
		<div class="zp_up_02" v-if="fileData.state!=0">
			<div class="zp_up_02_1">
				<span class="iconfont zp_up_02_3">&#xe621;</span>
				{{fileData.file_name?fileData.file_name.substring(0,10):''}}
				<span @click="qxclosd()" class="iconfont pend zp_up_02_4">&#xe619;</span>	
				<div class="zp_up_02_2"><span :style="{transform:'translateX(-'+(100-fileData.bfb)+'%)'}"></span></div>
			</div>			
		</div>
	</div>
</template>
<script>
import uploadFile from '../../components/uploadFileMode'
export default{
	components:{uploadFile},
	props:{
		value:Object,
		confg:Object,
	},
	data(){
		return{
			bfb:0,
			fileData:{
				file_name:'',
				bfb:0,
				state:0,
				userType:'',
			}
		}
	},
	mounted: function () {	
		this.init()
	},

	methods:{
		init(){
			if(this.confg.max){
				this.fileData.max = this.confg.max;
			}
			if(this.confg.accept){
				this.fileData.accept = this.confg.accept;
			}
			if(this.confg.multiple){
				this.fileData.multiple = this.confg.multiple;
			}
			if(this.confg.isAarr){
				this.fileData.isAarr = this.confg.isAarr;
			}
			if(this.confg.type){
				this.fileData.type = this.confg.type;
			}
			if(this.confg.type){
				this.fileData.type = this.confg.type;
			}
			if(this.confg.userType){
				this.fileData.userType = this.confg.userType;
			}
		},
		setJdt1(on){
			this.bfb = on;
		},
		sucss(data){
	
			this.value = data;
			console.log(this.value);
		},
		qxclosd(){
			this.fileData.state = 0;
			this.fileData.bfb = 0;
			this.fileData.file_name = '';
			this.$emit('input',{});
		}
	}
}
</script>

<style>
.zp_up_01{
	position: relative;
	width:88px;
	height:30px;
	background:rgba(255,255,255,1);
	border-radius:16px;
	border:1px solid rgba(151,151,151,1);
	text-align: center;
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:30px;
	margin-bottom: 22px;
}
.zp_up_02_1{
	position: relative;
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:20px;
	padding-left: 22px;
	box-sizing: border-box;
	width: 90%;
}
.zp_up_02_3{
	position: absolute;
	left: 0;
	top: 0;
}
.zp_up_02_4{
	position: absolute;
	right: 0;
	top: 2px;
	color: #979797;
	font-size: 12px;
}
.zp_up_02_2{
	position: relative;
	margin-top: 4px;
	width: 100%;
	height:2px;
	background:rgba(0,0,0,0.04);
	border-radius:32px;
	overflow: hidden;
}
.zp_up_02_2>span{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height:2px;
	background:rgba(51,179,255,1);
	border-radius:32px;
}
</style>
