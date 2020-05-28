<template>
	<div>
		<div class="mask_cus" v-show="selectVisible" @click="selectClose()"></div>
		<div class="proNav2_1x">
			<a :class="['pend',ison=='/profit'?'router-link-active':'']" @click="goZP('/profit','项目订单')">项目订单</a>
			<a :class="['pend',ison=='/divided'?'router-link-active':'']" @click="goZP('/divided','分成收益')">分成收益</a>
			<a :class="['pend',ison=='/qtsy'?'router-link-active':'']" @click="goZP('/qtsy','其他收益')">其他收益</a>
			<a :class="['last pend',ison=='/money'?'router-link-active':'']" @click="goZP('/money','提现记录')">提现记录</a>
			<div class="pr_seBox">
				<div v-if="ison == '/divided'" id="divided_pro">
					<span class="selectedDivided" v-show="work_name">{{work_name}} <i class="el-icon-close" @click="cleanSelect()"></i></span>
					<span class="selectedBtn" @click="selectShow()">筛选 <i class="el-icon-arrow-down"></i></span>
					<div class="selectContainer" v-show="selectVisible">
						<el-input v-model="dividedSearchKey" suffix-icon="el-icon-search" placeholder="输入项目名称"></el-input>
						<div class="optionContainer">
							<div class="pro_divided_search" v-for="(item,index) in dividedRenderOption" :key="index" @click="selectChange(item)">
								<el-row>
									<el-col :span="8"><img :src="item.banner" alt="" style="width: 100%;height: 100%;vertical-align: middel;"></el-col>
									<el-col :span="16" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;padding-left: 15px;">
										<el-tooltip placement="top-end" effect="dark" :content="item.name">
											<span>{{item.name}}</span>
										</el-tooltip>
									</el-col>
								</el-row>
							</div>
						</div>
					</div>
					<!-- <el-select filterable @change="change1" v-model="work_id" placeholder="请选择" class="t-select">
						<el-option
						v-for="(item,index) in config.options"
						:key="index"
						:label="item.name"
						:value="item.name">
						<div class="pro_divided_search">
							<el-row>
								<el-col :span="8"><img :src="item.banner" alt="" style="width: 100%;height: 100%;vertical-align: middel;"></el-col>
								<el-col :span="16" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;padding-left: 15px;">{{item.name}}</el-col>
							</el-row>
						</div>
						</el-option>
					</el-select> -->
				</div>
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
			default:()=>{
				return{
					list1:[],
					list2:[],
				}				
			}
		}
	},
	data(){
		return {
			v1:'',
			v2:'',
			ison:'profit',
			work_id:'',
			work_name: '',
			dividedSearchKey: '',
			selectVisible: false,
			dividedRenderOption: []
		}
	},
	mounted: function(){
		this.init();
	}, 
	watch: {
		'dividedSearchKey': function(newValue, oldValue) {
			if (!this.config.options || this.config.options.length == 0) {
				this.dividedRenderOption = []
				return
			}
			if (newValue == '') {
				this.dividedRenderOption = this.config.options.slice()
			} else {
				this.dividedRenderOption = this.config.options.filter(o => o.name.indexOf(newValue) > -1).slice()
			}
		},
		'config.options': function(newValue, oldValue) {
			this.dividedRenderOption = this.config.options.slice()
		}
	},
	methods: {
		cleanSelect() {
			this.work_id = '';
			this.work_name = '';
			this.change1();
		},
		selectShow() {
			this.selectVisible = true;
		},
		selectClose() {
			this.selectVisible = false;
		},
		selectChange(item) {
			this.work_id = item.name;
			this.work_name = item.name;
			this.selectClose();
			this.change1();
		},
		init(){
			if(this.config.v1 || this.config.v1==0){
				this.v1 = this.config.v1;
			}
			if(this.config.v2 || this.config.v2==0){
				this.v2 = this.config.v2;
			}
			this.ison = this.$route.fullPath;
		},
		change1(){
			this.$parent.setTim1(this.work_id);
		},
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
.mask_cus{
	position: fixed;
	width: 100%;
	height: 100%;
	background: #000;
	opacity: 0;
	top: 0;
	z-index: 98;
}
#divided_pro{
	position: relative;
}
.selectedDivided{
	display: inline-block;
	background: #fff;
	position: relative;
	top: 12px;
	height: 32px;
	width: 200px;
	line-height: 32px;
	padding: 0 30px 0 20px;
	margin-right: 25px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	border: 1px solid #bbb;
	border-radius: 5px;
}
.selectedDivided i{
	position: absolute;
	right: 10px;
	top: 9px;
	cursor: pointer;
	display: block;
	width: 14px;height: 14px;
	border-radius: 50%;
}
.selectedDivided i:hover{
	background: #bbb;
	color: #fff;
}
.selectContainer{
	position: absolute;
	width: 350px;
	max-height: 480px;
	background: #fff;
	top: 50px;
	right: 0;
	padding: 20px;
	z-index: 99;
	border-radius: 5px;
	overflow-y: auto;
	box-shadow:0px 4px 16px 0px rgba(0,0,0,0.1);
}
.selectContainer::-webkit-scrollbar{
	width: 4px;
	height: 4px;
}
#divided_pro .el-input{
	border: 1px solid #bbb;
	border-radius: 5px;
	margin-bottom: 20px;
	line-height: 40px;
}
.pro_divided_search{
	cursor: pointer;
	margin-bottom: 15px;
}
.pro_divided_search:hover{
	color: #33B3FF;
}
.pro_divided_search img{
	border-radius: 5px;
}
/* #divided_pro .el-input .el-input__inner{
	height: 34px;
	line-height: 34px;
} */
</style>
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
	width: 100px;
}
.pr_seBox .t-select{
	width: 185px;
}
</style>
