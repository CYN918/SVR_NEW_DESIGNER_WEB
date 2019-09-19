<template>
	<div class="topGd_01">
		<div class="topGd_02">
			<div class="topGd_03">
				<div class="topGd_03_1">{{obj.name}}</div>
				<div class="topGd_03_2">项目类型：{{obj.classify_name}}</div>
				<div class="topGd_03_2 topGd_03_3">领域范围：<span v-for="(el,index) in obj.fields" :key="index">{{el}}</span></div>
			</div>
			<div class="topGd_04">
				<div v-if="djsshow.d" class="topGd_04_1">
					<span >{{djsshow.d}}<span>天</span></span><span>{{djsshow.h+':'+djsshow.m+':'+djsshow.s}}</span>后截止报名
				</div>
				<div @click="bm('pr_rz')" class="topGd_04_2 btns btns_js pend">
					报名项目
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		obj:Object,	
	},
	data(){
		return{
			djsshow:{}
		}
	},
	mounted: function(){
		this.init();
	},
	methods: {
		init(){
			this.djsshow = this.$parent.djstimd;
		},
		setTim(t){
			this.djsshow = t;
		},
		bm(o){
			this.api.pr_check({}).then((da)=>{
				if(da=='error'){return}
				if(da.is_complete==true && da.is_contributor==true && da.work_num==3){
					this.$parent.showTc('bmXm',{project_id:this.$parent.deta.id});
					return
				}							
				this.$parent.showTc(o,da);				
			}).catch(()=>{
				
			})
		},
	}
}
</script>

<style>
.topGd_01{
	position: fixed;
	z-index: 10000;
	top: 0;
	left: 0;
	background:rgba(255,255,255,1);
	-webkit-box-shadow:0px 2px 6px 0px rgba(0,0,0,0.1);
	box-shadow:0px 2px 6px 0px rgba(0,0,0,0.1);
	padding:20px 0;
	width: 100%;
	height:100px;
}
.topGd_02{
	margin: 0 auto;
	text-align: left;
	width: 1300px;
}
.topGd_02>div{
	display: inline-block;
	vertical-align: top;
}
.topGd_03{
	
}
.topGd_03>div{
	margin-bottom: 10px;
}
.topGd_03_1{
	font-size:24px;
	font-weight:400;
	color:rgba(30,30,30,1);
	line-height:33px;
}
.topGd_03_2{
	font-size:14px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:20px;
}
.topGd_03_3>span{
	display: inline-block;
	vertical-align: top;
	padding: 0 10px;
	background:rgba(244,246,249,1);
	border-radius:5px;
	font-size:12px;
	font-weight:400;
	color:rgba(187,187,187,1);
	height: 22px;
	line-height:22px;
	margin-right: 5px;
}
.topGd_04{
	float: right;
	width: 352px;
	text-align: center;
}
.topGd_04_1{
	font-size:14px;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:43px;
	margin-bottom: 17px;
}
.topGd_04_1>span{
	display: inline-block;
	vertical-align: top;
    height: 40px;
    line-height: 40px;
	font-size:28px;
	font-family:PingFang SC Semibold;
	font-weight:600;
	color:rgba(255,81,33,1);
	margin-right: 16px;
}
.topGd_04_1>span>span{
	display: inline-block;
	vertical-align: top;
    height: 40px;
    line-height: 40px;
	font-size:22px;
	font-weight:400;
	font-family: PingFang SC Regular;
	color:rgba(187,187,187,1);
}
</style>
