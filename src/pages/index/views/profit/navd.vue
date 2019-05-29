<template>
	<div class="proNav2">
		<div class="proNav2_1">
			<router-link class="pend" to="/profit">录用记录</router-link>
			<router-link class="last pend" to="/money">提现记录</router-link>
			
			<div class="pr_seBox">
				<div>
					录用形式：
					<el-select @change="sxFn1" v-model="v1" placeholder="请选择">
						<el-option 
						v-for="item in config.list1"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</div>
				<div>
					录用时间：
					<el-select @change="sxFn2" v-model="v2" placeholder="请选择">
						<el-option 
						v-for="item in config.list2"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
		</div>			
	</div>
</template>
<script>
export default {
	name: 'pr_navd',
	props:{
		config:{
			type:Object,
			default:{
				list1:[],
				list2:[]
			}
		}
	},
	data(){
		return {
			v1:'',
			v2:'',
		}
	},
	mounted: function(){
		this.init();
	}, 
	methods: {
		init(){
			if(this.config.v1 || this.config.v1==0){
				this.v1 = this.config.v1;
			}
			if(this.config.v2 || this.config.v2==0){
				this.v2 = this.config.v2;
			}
			
		},
		sxFn1(){
			console.log(1111111)
		},
		sxFn2(){
			console.log(1111111)
		}
	}
}
</script>
<style>
.proNav2{
	padding-top: 7px;
	border-bottom: 2px solid #E6E6E6;
}
.proNav2_1{
	position: relative;
	text-align: center;
	margin: 0 auto;
	line-height: 48px;
	height: 48px;
	width: 1300px;
}
.proNav2_1>a{
	display: inline-block;
	margin: 0 20px;
	font-size:16px;
	font-weight:400;
	color:rgba(30,30,30,1);
}
.proNav2_1>a.router-link-active{
	font-weight:500;
	color:rgba(255,81,33,1);
}
.proNav2_1>a.router-link-active:after{
	content: "";
	display: block;
	margin: 0 auto;
	background: #FF5121;
	width: 100%;
	height: 2px;
	
}
.pr_seBox{
	position: absolute;
	bottom: 0;
	right: 0;
}
.pr_seBox>div{
	display: inline-block;
	font-size:14px;
	font-weight:400;
	color:rgba(153,153,153,1);
}
.pr_seBox>div:last-child{
	margin-left: 64px;
}
.pr_seBox input{
	border: none;
}
.pr_seBox .el-select{
	width: 85px;
}
</style>
