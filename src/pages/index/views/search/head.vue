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
						@change="handleChange">
					</el-cascader>
					
					
					<!-- <el-select class="zysdf_2" v-model="setcti" placeholder="请选择">
						<el-option 
						  v-for="item in clasd"
						  :key="(item.value||item.value==0)?item.value:item.label"
						  :label="item.label"
						  :value="(item.value||item.value==0)?item.value:item.label">
						</el-option>
					</el-select> -->
				</div>
				
			</div>
			<div class="sea_n_1">
				<span @click="goto('searchProject')" :class="['sea_2','pend',onNav==0?'sea_on':'']">项目</span>
				<span @click="goto('searchWorks')" :class="['sea_2','pend',onNav==1?'sea_on':'']">作品</span>
				<span @click="goto('searchUser')" :class="['pend',onNav==2?'sea_on':'']">创作者</span>
			</div>
			
			
		</div>
	</div>
</template>

<script>
export default {

	name: 'home',
	data(){
		return{
			secont:'',

			setcti: [],
		}
	},
	methods: {
		 
		goto(on){
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
			if(this.onNav==2){
				ud = 'searchUser';
			}
			if(this.onNav==0){
				ud= 'searchProject';
			}
			this.$router.push({path:ud,query:{cont:this.secont}});
		},
		handleChange(value) {
			// this.$parent.sreond(this.setcti);
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
		}
		
	},
	watch: {	
		'setcti': function() {
			this.sreond();
		},
		
	},
	
}
</script>

<style>
.searchHaed{
	
	background: #FFFFFF;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
	margin-bottom: 20px;
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
.sea_n_1>span{
	position: relative;
	display: inline-block;
}
.sea_2{
	margin-right: 64px;
}
.sea_on{
	color: #FF5121;
}
.sea_on:after{
	position: absolute;
	content: "";
	bottom: 0;
	left: 50%;
	-webkit-transform: translate(-50%,10%);
	transform: translate(-50%,10%);
	background: #FF5121;
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
	
	display: block;
	margin: 20px auto 0;
	width: 712px;
	height: 60px;
}
.zysdf_1{
	
	
}
.zysdf_1 input{
	border: none;
	border-radius: 0;
	border-bottom:1px solid #eeeeee;
}
.zysdf_2{
    position: absolute;
    bottom: 1px;
    right: 0;
    width: 160px;
}
.zysdf_2 input{
	border: none;
}
.sea_n_1{
	text-align: center;
}
</style>