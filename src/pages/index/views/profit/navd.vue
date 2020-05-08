<template>
	<div>
		<div class="proNav2_1x">
			<a :class="['pend',ison=='/profit'?'router-link-active':'']" @click="goZP('/profit','项目订单')">项目订单</a>
			<a :class="['pend',ison=='/divided'?'router-link-active':'']" @click="goZP('/divided','分成收益')">分成收益</a>
			<a :class="['pend',ison=='/qtsy'?'router-link-active':'']" @click="goZP('/qtsy','其他收益')">其他收益</a>
			<a :class="['last pend',ison=='/money'?'router-link-active':'']" @click="goZP('/money','提现记录')">提现记录</a>
			<div class="pr_seBox">
				<!-- <div v-if="ison == '/divided'">
					<el-input
						placeholder="请输入项目名称"
						v-model="input"
						@input="change1"
						clearable>
					</el-input>
				</div> -->
				<div v-if="ison == '/profit'">
					筛选：
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
				list2:[],
			}
		}
	},
	data(){
		return {
			v1:'',
			v2:'',
			ison:'profit',
			input:''
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
			this.ison = this.$route.fullPath;
		},
		// change1(){
		// 	this.$parent.setTim1(this.input);

		// },
		sxFn1(){
			this.$parent.setType(this.v1);
		},
		sxFn2(){
			this.$parent.setTim(this.v2);
			
		},
		goZP(a,b){
			this.bdtj('我的收益','tab_'+b,'--');
			this.$router.push({path: a})			
		},
	}
}
</script>
<style>
.proNav2{
	padding-top: 7px;
	border-bottom: 2px solid #E6E6E6;
}
.proNav2_1x{
	position: relative;
	text-align: left;
	margin: 0 auto;
	line-height: 48px;
	height: 48px;
	width: 1300px;
}
.proNav2_1x>a{
	display: inline-block;
	margin: 0 20px;
	font-size:16px;
	font-weight:400;
	color:rgba(30,30,30,1);
}
.proNav2_1x>a.router-link-active{
	font-weight:500;
	color:#33B3FF;
}
.proNav2_1x>a.router-link-active:after{
	content: "";
	display: block;
	margin: 0 auto;
	background: #33B3FF;
	width: 100%;
	height: 2px;
	
}
.proNav2_1x .el-select input{
	background: none;
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
