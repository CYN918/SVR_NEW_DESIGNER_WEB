<template>
	<div class="ldx_sav">
		<div class="ldx_sav_1">
			<video
				class="ldx_sav_1_1" 
				:src="value.video_url" 
				ref="yspic1"></video>
				
			<div class="ldx_sav_1_2">
				<img :src="imgPath+'new/tools/v_02.svg'" >
			</div>
			<div class="ldx_sav_1_3"><img :src="imgPath+'new/tools/v_01.svg'" ></div>
			<div class="ldx_sav_1_4">这首歌的名称很长-歌手名称</div>
			<div class="ldx_sav_1_5">00:30</div>
			
			<div v-if="hc" class="ldx_sav_1_6">
				<div class="ldx_sav_1_6_1">
					<i class="loading_a m_c"></i>
					<div class="ldx_sav_1_6_2">来电秀合成中</div>
				</div>
			</div>
		</div>
		
		<div class="ldx_sav_2">
			<div>
				<div class="ldx_sav_2_1">来电秀名称</div>
				<div>
					<inputMax
					v-model="value.title"
					:max="20"
					></inputMax>
				</div>
			</div><div>
				<div class="ldx_sav_2_1">标签</div>
				<div>
					<checks :cfg="tags" v-model="value.tag"></checks>	
				</div>
			</div><div>
				<div class="ldx_sav_2_1">分类</div>
				
				<div class="ldx_sav_2_1x">
					<el-select v-model="value.fls" value-key="classify_id" placeholder="请选择分类">
						<el-option
					      v-for="item in fls"
					      :key="item.classify_id"
					      :label="item.classify_name"
					      :value="item">
					    </el-option>
					</el-select>
				</div>
				<div class="ldx_sav_tip">
					<div>1、提交过后，可前往狮圈儿-<a href="/projectAll">我的项目</a>，了解验收审核进展。</div>
					<div>2、若验收审核通过，可前往狮圈儿-<a href="/profit">我的收益</a>，了解订单结果。</div>
					<div>3、若未验收通过，请了解驳回原因后，在工具重新制作提交。</div>
					
					<p class="ldx_sav_tip_1">
						<span @click="tijF" :class="['pend',istj?'checko':'']">立即交稿</span>
					</p>
					
				</div>
			</div>
		</div>		
	</div>		
</template>
<script>
import btnSc from './togBtn';
import textD from './textD';
import videoSet from './videoSet';
import inputMax from '../../components/inputMax'
import checks from '../../components/checks'
export  default{
	components:{inputMax,checks},
	props:{
		value:Object
	},
	data(){
		return{
			uer:'',
			bfb:10,
			form:{},
			fls:[],
			tags:['极简','扁平','风景'],
			hc:'',
			istj:'',
			ajaxType:'',
		}
	},
	mounted: function () {
		
		this.init();
	},
	watch:{
		'value.title'(){
			this.check()
		},
		'value.tag'(){
			this.check()
		},
		'value.fls'(){
			this.check()
		},
	},
	methods:{
		init(){
		
			if(this.value.tag){
				for(let i=0,n=this.value.tag.length;i<n;i++){
					let pod = this.value.tag[i];
					if(this.tags.indexOf(pod)==-1){
						this.tags.push(pod);
					}
				}
			}
			
			this.check();
			this.sh_classify();
		},
		sh_classify(){
			this.api.sh_classify({}).then((da)=>{
				if(da=='error'){
					return
				}
				this.fls = da;
			})
		},
		starHc(){
			this.hc=1;
		},
		stopHc(a){
			this.hc='';		
		},
		tijF(){
			if(this.ajaxType){
				this.$message({
					message:'正在处理请稍后',
				})
				return
			}
			let pr = this.$parent.saveC(1);		
			this.starHc();
			this.ajaxType = 1;
			this.api.sh_save(pr).then((da)=>{				
				this.stopHc(1);
				if(da=='error'){
					return
				}
				this.$message({
					message:'交稿成功',
				})
				setTimeout(()=>{
					this.$router.push({path:'/tolt/toluser'});	
				},1000)
		
			}).catch(()=>{
				this.stopHc();
				this.ajaxType = '';
			})
			
			
		},
		check(){
			if(!this.value.title){
				return 
			}
			if(!this.value.fls){
				return 
			}
			if(!(this.value.tag && this.value.tag.length>0)){
				return 
			}
			this.istj = 1;
		},
		

	}
}
</script>

<style>
.ldx_sav{
	margin: 103px auto;
	width:1300px;
	padding: 56px 0;
	height:667px;
	background:rgba(255,255,255,1);
}
.ldx_sav>div{
	display: inline-block;
	vertical-align: top;

}
.ldx_sav_1{
	position: relative;
	width:375px;
	height:667px;
	border-radius:5px;
	overflow: hidden;
}
.ldx_sav_1_1{
	width: 100%;
	height: 100%;
	background: red;
	margin-right: 60px;
}
.ldx_sav_1>div{
	position: absolute;	
}
.ldx_sav_1_2{
	top: 20px;
	left: 20px;
	border-radius: 50%;
	background: rgba(0,0,0,.5);
	width:32px;
	height:32px;
}
.ldx_sav_1_2>img{
	display: block;
    width: 17px;
    margin: 7px auto 0;
}
.ldx_sav_1_3{
	bottom: 20px;
	left: 20px;
	width:38px;
	height:24px;
	background:rgba(0,0,0,.5);
	border-radius:12px;

}
.ldx_sav_1_3>img{
	display: block;
    width: 20px;
    margin: 2px auto 0;
}
.ldx_sav_2{

	margin-left: 60px;
	width: 480px;
	text-align: left;
}
.ldx_sav_2>div{
	margin-bottom: 30px;
}
.ldx_sav_2_1{
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
	margin-bottom: 10px;
}

.ldx_sav_2_1x .el-input--suffix .el-input__inner{
	padding-left: 10px;
}
.ldx_sav_tip{
	position: relative;
	margin-top: 30px;
	padding-top: 25px;
	height: 335px;
	border-top: 1px solid #D9D9D9;
}
.ldx_sav_tip>div{
	font-size:14px;

	color:rgba(153,153,153,1);
	line-height:30px;
}
.ldx_sav_tip>div>a{
	color: #33B3FF;
}
.ldx_sav_tip_1{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	text-align: center;
}
.ldx_sav_tip_1>span{
	display: inline-block;
	vertical-align: top;
	width:120px;
	height:40px;
	background:rgba(223,223,223,1);
	border-radius:5px;
	font-size:14px;
	color:rgba(187,187,187,1);
	line-height:40px;
}
.ldx_sav_tip_1>span.checko{
	background: #33B3FF;
	color: #fff;
}
.ldx_sav_1_4{
	top: 20px;
	right: 20px;
	width:263px;
	height:32px;
	text-align: left;
	padding:0 15px;
	background:rgba(0,0,0,.5);
	border-radius:16px;
	font-size:14px;
	color:rgba(255,255,255,1);
	line-height:32px;
}
.ldx_sav_1_5{
	bottom: 20px;
	right: 20px;
	width:54px;
	height:24px;
	background:rgba(0,0,0,.5);
	border-radius:12px;
	font-size:14px;
	color:rgba(255,255,255,1);
	line-height:24px;
}
.ldx_sav_1_6{
	top: 0;
	left: 0;
	background: rgba(0,0,0,.5);
	width: 100%;
	height: 100%;
}
.ldx_sav_1_6_1{
	position: absolute;
	top:50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	width: 126px;
	text-align: center;
}

.ldx_sav_1_6_1 .el-progress--circle .el-progress__text{
	color: #fff;
}
.ldx_sav_1_6_2{
	margin-top: 10px;
	font-size:16px;
	font-weight:500;
	color:rgba(255,255,255,1);
	line-height:22px;
}
</style>
