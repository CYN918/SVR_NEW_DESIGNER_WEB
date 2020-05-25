<template>
	<div class="searchHaed">
		<div class="sea_1">
			<div>
				<div class="sea_n_2">
					<el-input class="zysdf_1"
						@keyup.enter.native="keydown($event)"
						placeholder="请输入内容"
						v-model="secont">
						<i @click="keydown" slot="prefix" class="el-input__icon el-icon-search"></i>
					</el-input>
					<el-cascader class="zysdf_2"
						:options="clasd"
						v-model="setcti"
						placeholder="全部"
						@change="handleChange">
					</el-cascader>
				</div>				
			</div>
			<div class="sea_n_1box">
				<pTop :cn="topCn">
					<template v-slot:todo="{ todo }">
						<div class="sea_n_1">
							<span v-for="(el,index) in navData" :class="['sea_2 pend',onNav==index?'sea_on':'']" :key="index" @click="goto(el.a)">{{el.b}}</span>
						</div>
					</template>		
				</pTop>		
			</div>
		</div>
	</div>
</template>

<script>
import pTop from '../../components/postionTop';
export default {
	components:{pTop},
	name: 'home',
	data(){
		return{
			secont:'',
			self2:'',
			setcti: [""],
			navData:[
				{a:'searchWorks',b:'作品'},
				{a:'searchUser',b:'创作者'},
				{a:'searchProject',b:'项目'},	
			],
			topCn:{
				min:128,
			},
		}
	},
	methods: {

		goto(on){
			this.mJs.scTop(1)
			this.bdtj('搜索页','tab_'+on);
			this.$router.push({path:on,query:{cont:this.secont}})	
		},
		setCont(cd){
			this.secont = cd;
		},
		sreond(){
		
			this.$parent.sreond(this.setcti);
		},

		keydown(){
			let ud = '/searchWorks';
			if(this.onNav==1){
				ud = 'searchUser';
			}
			if(this.onNav==2){
				ud= 'searchProject';
			}
			this.$router.push({path:ud,query:{cont:this.secont}});
		},
		handleChange(value) {
			
			this.$parent.sreond(this.setcti);
		}
	},	
	props:{
		onNav:{
			String,
			default:1
		},
		clasd:{
			Array,
			default:[]
		},
		pz:{
			Object,
			default:()=>{return{}}
		}
		
	},
	watch: {	
		'setcti': function() {
			// this.sreond();
		},
		'$route': function() {
			this.secont = this.$route.query.cont;
		},
		
	},
	
}
</script>

<style>
.searchHaed{
	background: #FFFFFF;
	width: 100%;
}
.sea_1{
	position: relative;
	margin: 0 auto;
	width: 1300px;
	text-align: left;
	font-size: 16px;
	color: #1E1E1E;
	line-height: 80px;
}
.sea_n_1box{
	width: 100%;
	height: 80px;
	line-height: 80px;
}
.sea_n_1{
	width: 1300px;
	margin: 0 auto;
}
.sea_n_1box>div{
	background: #fff;
}
.sea_n_1>span{
	position: relative;
	display: inline-block;
}
.sea_2{
	margin-right: 64px;
}
.sea_on{
	color: #33B3FF;
}
.sea_on:after{
	position: absolute;
	content: "";
	bottom: 0;
	left: 50%;
	-webkit-transform: translate(-50%,10%);
	transform: translate(-50%,10%);
	background: #33B3FF;
	width: 80%;
	height: 2px;
}
.sea_4{
	position: absolute;
	right: 0;
	top: 20px;
	width: 400px;
	height: 40px;
	line-height: 40px;
	padding: 2px 0;
	border-bottom: 1px solid #C0C4CC;
}
.sea_4 .el-input{

	display: inline-block;
    width: 90%;
}

.sea_4 .el-input__inner{
	border: none;
	border-radius: 0;
}
.sea_4 .el-select{
	width: 30%;
	text-align: right;
}

.sea_n_2{
	position: relative;
	overflow: hidden;
    border-bottom: 1px solid #DCDFE6;
	display: block;
	margin: 0 auto 0;
	width: 712px;
	height: 60px;
}
.sea_n_2 .el-input--suffix .el-input__inner{
	text-align: right;
    padding-right: 32px;
}
.sea_n_2 .el-cascader__label{
	text-align: right;
    padding-right: 32px;
}
.sea_n_2 input{
	border-radius: 0;
	border: none;
}
.sea_n_2 .el-input__prefix{
	top:-1px;
}
.zysdf_2{
    position: absolute;
    bottom: -1px;
    right: 0;
    width: 160px;
}
.zysdf_2 input{
	border: none;
}
.sea_n_1{
	text-align: center;
}
.sea_n_1box .p_isTop{
	z-index: 9999;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	-webkit-box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
	box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
}
</style>