<template>
	<div :class="['cenDjs',xm[xmOn].cl]">
		<div class="cenDjs_1"></div>
		
		<div>
			<div v-if="djsshow.h" class="cenDjs_2">
				<span>{{djsshow.h}}</span>h<span>{{djsshow.m}}</span>m<span>{{djsshow.s}}</span>s
			</div>
			<div v-if="da.yue" class="cenDjs_2">
				<span>27</span>月<span>02</span>号<span>27</span>点
			</div>
			
			
			<div  class="cenDjs_3">{{da.n}}</div>
			<div class="cenDjs_4 pend">{{da.btn_n}}</div>
			<div class="cenDjs_5">{{da.btn_tip}}</div>
		</div>

		<div class="sjxdpo">
			{{xm[xmOn].n}}
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			da:{},
			mr:[
				{n:'后截止报名',btn_n:'报名项目',btn_tip:'报名等待中标通知，中标前不用制作',djs:{h:27,m:2,s:27}},
				{n:'报名已截止，等待平台选标...',btn_n:'取消报名',btn_tip:'报名等待中标通知，中标前不用制作'},
				{n:'前截止交稿',btn_n:'交付稿件',btn_tip:'请在规定时间交付稿件，加油哦！'},
				{n:'项目已延期交稿',btn_n:'交付稿件',btn_tip:'您的项目已延期，请尽快交稿哦！'},
				{n:'项目稿件已提交',btn_n:'稿件撤回',btn_tip:'稿件已提交，请耐心等待验收审核。'},
			
			],
			djsshow:{},
			xmOn:3,
			xm:[{n:'招标期',cl:'c_zmq'},{n:'选标期',cl:'c_zmq'},{n:'制作期',cl:'c_zmq2'},{n:'待验收',cl:'c_zmq3'},{}]
		}
	},
	mounted: function(){
		this.init();
	}, 
	methods: {
		init(){
			this.da = this.mr[0];	
			if(this.da.djs){			
				this.djsfn(this.da.djs);
			}
		},
		djsfn(da){			
			if(da.h==0 && da.m==0 && da.s==0){
				return
			}	
			setTimeout(()=>{
				this.djsfn(da);
			},1000);
			let p ={};
			for(let el in da){				
				p[el] = this.btime(da[el]);
			}
			this.djsshow = p;
			if(da.s>0){
				da.s--;
				return
			}
			if(da.m>0){
				da.m--;
				da.s = 59;
				return
			}
			if(da.h>0){
				da.h--;
				da.m= 59;
				da.s = 59;
				return
			}
		},
		btime(t){
			return t>9?t:'0'+t
		}
	}
}
	
</script>

<style>
.cenDjs{
	position: relative;
}
.cenDjs_2{
	margin: 60px auto 10px;
	text-align: center;
	font-size:14px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:20px;
}
.cenDjs_2>span{
	margin: 0 5px 0 10px;
	font-size:28px;
	font-family:PingFangSC-Semibold;
	font-weight:600;
	color:rgba(255,81,33,1);
	line-height:40px;
}
.cenDjs_3{
	margin-bottom: 30px;
	font-size:16px;
	font-weight:400;
	color:rgba(40,40,40,1);
	line-height:22px;
}
.cenDjs_4{
	margin: 0 auto 10px;
	font-size:14px;
	font-weight:400;
	color:rgba(255,255,255,1);
	line-height:40px;
	text-align: center;
	width:100px;
	height:40px;
	background:rgba(255,81,33,1);
	border-radius:5px;
}
.cenDjs_5{
	margin-bottom: 40px;
	font-size:14px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:20px;
}	
	
.sjxdpo{
    position: absolute;
    top: -60px;
    left: 14px;
    width: 58px;
    height: 53px;
    background: rgba(255,81,33,.1);
    font-size: 12px;
    text-align: center;
    font-weight: 400;
    color: rgba(255,81,33,1);
    line-height: 34px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 5px;
    border: 1px solid;
    border-bottom: 0;
    overflow: hidden;
}
.c_zmq .sjxdpo{
	background:rgba(230,247,255,1);
	color: #1890FF;
	border-color: rgba(145,213,255,1);
}
.c_zmq2 .sjxdpo{
	background:rgba(249,240,255,1);
	color: #722ED1;
	border-color: rgba(211,173,247,1);
}
.c_zmq3 .sjxdpo{
	background:rgba(255,251,230,1);
	color: #FCAE00;
	border-color: rgba(255,229,143,1);
}
.sjxdpo:before{
    content: "";
    position: absolute;
    bottom: 0px;
    left: -2.5px;
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 9px solid #ff5121;
}
.c_zmq .sjxdpo:before{
	border-bottom: 9px solid rgba(145,213,255,1);
}
.c_zmq2 .sjxdpo:before{
	border-bottom: 9px solid rgba(211,173,247,1);
}
.c_zmq3 .sjxdpo:before{
	border-bottom: 9px solid rgba(255,229,143,1);
}
.sjxdpo:after{
    content: "";
    position: absolute;
    bottom: -1px;
    left: -2px;
    width: 0;
    height: 0;
    border-left: 30.5px solid transparent;
    border-right: 30.5px solid transparent;
    border-bottom: 9px solid #fff;
}
</style>
