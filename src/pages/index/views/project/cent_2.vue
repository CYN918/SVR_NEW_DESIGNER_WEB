<template>
	<div class="pr_cent2_1">
		<div @click="openCent()" class="pr_cent2_2">
			<img  class="pr_cent2_3" :src="deta.banner"/>
			<img  class="pr_cent2_3" v-if="deta.banner == ''" :src="imgSig+'toltImg/Zoocreators_logo.svg'"/>
			<div class="pr_cent2_rs" v-if="deta.status==1 || deta.status==2">{{deta.sign_up_num}}人已报名</div>
			<div class="pr_cent2_r2" v-html="tips"></div>
			<div v-if="this.$route.path == '/projectAll'">
			    <div class="pr_cent2_status" style="background:rgba(241,251,255,1);border:1px solid rgba(51,179,255,1);color:#33B3FF;" v-if="deta.status==1">招募期</div>
				<div class="pr_cent2_status" style="background:rgba(255,251,230,1);border:1px solid rgba(255,229,143,1);color:#FCAE00;" v-if="deta.status==0">待发布</div>
				<div class="pr_cent2_status" style="background:rgba(255,241,240,1);border:1px solid rgba(255,163,158,1);color:#F5222D;" v-if="deta.status==2">选标期</div>
				<div class="pr_cent2_status" style="background:rgba(249,240,255,1);border:1px solid rgba(211,173,247,1);color:#722ED1;"  v-if="deta.status==3">制作期</div>
				<div class="pr_cent2_status" style="background:rgba(255,251,230,1);border:1px solid rgba(255,229,143,1);color:#FCAE00;" v-if="deta.status==4">待验收</div>
				<div class="pr_cent2_status" style="background:rgba(246,255,237,1);border:1px solid rgba(183,235,143,1);color:#52C41A;" v-if="deta.status==5">已验收</div>
				<div class="pr_cent2_status" style="background:rgba(255,241,240,1);border:1px solid rgba(255,163,158,1);color:#F5222D;" v-if="deta.status==-1">已终止</div>
			</div>
		</div>
		<div class="pr_cent2_4">
			<div @click="openCent()" class="pr_cent2_5">
				<div class="pr_cent2_6">{{deta.name}}</div>
				<div class="pr_cent2_7" v-if="deta.deal_type == '3'">项目类型：{{deta.classify_name}}<i></i>制作周期：<span>{{deta.production_cycle_d}}天{{deta.production_cycle_h}}时</span><i></i>预付金：<span style="color:rgba(255,147,0,1);">￥{{deta.money.advance_payment}}</span></div>
				<div class="pr_cent2_7" v-else>项目类型：{{deta.classify_name}}<i></i>制作周期：<span>{{deta.production_cycle_d}}天{{deta.production_cycle_h}}时</span></div>
				<div class="pr_cent2_10" v-html="tip1" v-if="this.$route.path == '/projectYs'"></div>
				<div class="pr_cent2_10" v-html="tip" v-else></div>
				<!-- <div class="pr_cent2_8">领域范围：<span v-for="(ed,index) in deta.fields">{{ed}}</span></div>	 -->
			</div>
			<div class="pr_cent2_9">
				<div style="width:100%;height:50px;" v-if="this.$route.path == '/projectYs'">
					<div v-if="deta.deal_type == '1'" class="md">买断</div>	
				    <div v-if="deta.deal_type == '2'" class="fc">分成</div>	
					<div v-if="deta.deal_type == '3'" class="fc" style="width: 120px;">预付金+分成</div>
				</div>
				<div style="width:100%;height:50px;" v-else>
					<div v-if="deta.settlement == '1'" class="md">买断</div>	
				    <div v-if="deta.settlement == '2'" class="fc">分成</div>	
				</div>			
				<div class="pr_cent2_11">
					<ul>
						<li v-for="(els,index) in btns" @click="ckd(els.fn)" :class="['btns pend',els.cls]">{{els.n}}</li>
					</ul>
				</div>				
			</div>
		</div>
		<component v-bind:is="tcZj"  :datad="tcData"></component>
	</div>
	
</template>

<script>


import pushGj from './pushGj';
import qxGj from './qxGj';

import question from './question';
import Log from './log';
import presentation from './presentation';

export default {
	components:{pushGj,qxGj,question,presentation,Log},
	props:{
		elm:{
			type:Object,
			default:{}
		},	
	
	},
	data(){
		return{
			tcZj:'',
			tcData:{},
			djtime:'',
			tips:'',
			tip:'',
			tip1:'',
			btns:'',
			deta:{},
		}
	},
	mounted: function(){
		this.init();
		this.backtims();
		
	}, 
	watch: {		
		'elm': function() {
			this.init();
		},
	},
	methods: {	
		ckd(a){
			console.log(a)
			if(a=='ypj'){this.$message({message:'你已经评价过了'});}
			if(a=='presentation'){
				this.$router.push({path:'/presentation',query:{id:this.deta.id}})	
				return
			}
			this.tcZj = a;
			this.tcData = this.deta;
		},
		close(){
			this.tcZj = '';
		},
		setStaus(on){
			
			this.deta.status = on;
			this.clsfn();
		},
		getData(){
			this.$parent.getData();
		},
		init(){
			this.deta = this.elm;
			this.clsfn();
		},
		clsfn(){
			this.btns = [];
			if(this.$route.path == '/projectBm' || this.$route.path == '/projectZz'){
				if(this.deta.settlement == '0'){
					this.tip = '预计收益：<span>'+ '[买断]'+this.deta.expected_profit+'<i style="font-style: normal;color:#282828;font-size:14px;margin-left:5px;margin-right:5px;">或</i>永久分成</span>';
				}
				if(this.deta.settlement == '1'){
					this.tip = '预计收益：<span>'+ '[买断]' +this.deta.expected_profit+'</span>';
				}
				if(this.deta.settlement == '2'){
					this.tip = '预计收益：<span>永久分成</span>';
				}
			}
			if(this.$route.path == '/projectYs'){
				if(this.deta.deal_type == '1'){
					if(this.deta.money.length == '0'){
						this.tip1 = '成交价格：暂无成交价格';	
					}else{
						this.tip1 = '成交价格：<span class="csyaswz_01">'+'￥'+this.deta.money.income+'</span>';	
					}
				}
				if(this.deta.deal_type == '2'){
					if(this.deta.money.length == '0'){
						this.tip1 = '累计分成收益：暂无累计分成收益';
					}else{
						this.tip1 = '累计分成收益：<span class="csyaswz_01">'+'￥'+this.deta.money.income+'</span>';
					}		
				}
				if(this.deta.deal_type == '3'){
					if(this.deta.money.length == '0'){
						this.tip1 = '累计分成收益：暂无累计分成收益';
					}else{
						this.tip1 = '累计分成收益：<span class="csyaswz_01">'+'￥'+this.deta.money.income+'</span>';
					}
				}
			}
			
			
			if(this.deta.status==1){
				this.tips = '<div class="pr_cent2_r2_1 backdse"><span><span>'+this.deta.left_time.d+'</span>天<span>'+this.deta.left_time.h+'</span>时<span>'+this.deta.left_time.m+'</span>分<span>'+this.deta.left_time.s+'</span>秒</span>后截止报名</div>';
				return
			}
			if(this.deta.status==2){
				this.tips = '<div class="backdse pr_cent2_r2_2">报名已截止，等待平台选标</div>';
				return
			}
			if(this.deta.status==3){

				let be = [{n:'提交稿件',fn:'pushGj',cls:'btns_js'}];
				if(this.deta.is_rejected==1){
					be[0].n = "重新交稿";
					be[1] = {n:'交稿记录',fn:'Log'};
				}
				this.btns = be;
				
				
				if(this.deta.is_de){
					this.tips = '<div class="backdse pr_cent2_r2_4">你已延期'+this.deta.delay_time.d+'天'+this.deta.delay_time.h+'小时，请尽快完成</div>';
					return
				}
		
				if(this.deta.delivery_deadline && !(this.deta.delivery_deadline instanceof Array)){
					if(this.deta.is_rejected==1){
						this.tips = '<div class="backdse pr_cent2_r2_4">你的稿件未通过，请重新提交</div>';
					}else{
						var d2 = new Date();
						var d1 = new Date(Date.parse(this.deta.delivery_deadline));
						 
						if(d1 > d2){
							let otim = this.bckdtimed(this.deta.delivery_deadline);
			
					        this.tips = '<div class="pr_cent2_r2_1 backdse"><span>截稿时间：<span>'+otim[0]+'</span></span><span><span>'+otim[1]+'前</span></span></div>';
							
						}else{
							var d3 = d2 - d1;
							var days = Math.floor(d3/(24*3600*1000));
							var leave1 = d3%(24*3600*1000);
                            var hours = Math.floor(leave1/(3600*1000));
							
                            this.tips = '<div class="backdse pr_cent2_r2_4">你已延期<span>'+days+'天'+hours+'小时</span>，请尽快完成</div>';
						}  
						

					}
					
				
				}
				return
			}
			
			if(this.deta.status==4){
				this.btns = [
					{n:'稿件撤回',fn:'qxGj'}
				];
				this.tips = '<div class="backdse pr_cent2_r2_3">稿件已提交，请等待验收审核</div>';
				return
			}
			if(this.deta.status==5){
				let bd = [
					{n:'验收报告',fn:'presentation'},
					{n:'项目评价',fn:'question'},
				];
				
				if(this.deta.is_evaluated==1){
					bd[1].n = '已评价';
					bd[1].fn = 'ypj';
				}
				this.btns = bd;
				
				this.tips = '<div class="backdse pr_cent2_r2_2">项目已验收，感谢与你的本次合作</div>';
			}
				
		},
		bckdtimed(t){
		
			let times =new Date(t.replace(/-/g,'/')),
			Y = times.getFullYear(),
			M = times.getMonth()+1,
			D = times.getDate(),
			h = times.getHours(),
			m = times.getMinutes();
			return [(Y+'/'+this.bNus(M)+'/'+this.bNus(D)),(this.bNus(h)+':'+this.bNus(m))];
		},
		bNus(n){ 
			return n<10?'0'+n:n;		
		},
		openCent(){
			console.log(this.deta);
			if(this.deta.id){
				window.open('/#/prcent?id='+this.deta.id)
			}
			
		},
		backtims(){
			
			let a = this.deta.left_time;
			if(!a || a.length==0){return}
			let str = '';
			if(a.s>0){
				a.s--;				
			}else
			
			if(a.m>0){
				a.s = 59;
				a.m--;
			}else
			if(a.h>0){
				a.s = 59;
				a.m = 59;
				a.h--;
				
			}else
			if(a.d>0){
				a.s = 59;
				a.m = 59;
				a.h = 23;
				a.d--;
				
			}else{
				this.$parent.getData();
				return
			}
			this.djtime = '<span><span class="pr_hs">'+a.d+'</span>d<span class="pr_hs">'+(a.h>9?a.h:'0'+a.h)+'</span>h<span class="pr_hs">'+(a.m>9?a.m:'0'+a.m)+'</span>m<span class="pr_hs">'+(a.s>9?a.s:'0'+a.s)+'</span>s</span>';	
		
		}
	}
}
</script>

<style>
/* .pr_cent2_1{
	position: relative;
	width:600px;
	height:212px;
	padding: 20px;
	background:rgba(255,255,255,1);
	border-radius:5px;
}
.pr_cent2_2{
	cursor: pointer;
	position: relative;
	display: inline-block;
	vertical-align: top;
	margin-right: 20px;
	overflow: hidden;
	width:283px;
	height:212px;
	box-shadow:0px 5px 15px 0px rgba(0,0,0,0.1);
	border-radius:5px 5px 5px 5px;
}
.pr_cent2_3{
	display: block;
	width: 100%;
	height: 100%;
}
.pr_cent2_4{
	display: inline-block;
	vertical-align: top;
	width:290px;
}
.pr_cent2_5{
	cursor: pointer;
	width:290px;
	border-bottom: 1px solid rgba(216,216,216,.3);

}
.pr_cent2_6{
	font-size:16px;
	color:rgba(40,40,40,1);
	line-height:22px;
	margin-bottom: 10px;
	width: 220px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.pr_cent2_7,.pr_cent2_8{
	font-size:12px;
	color:rgba(187,187,187,1);
	
}
.pr_cent2_7{
	margin-bottom: 4px;
	line-height:18px;
}
.pr_cent2_8{margin-bottom: 20px;line-height:22px;}
.pr_cent2_8>span{
	display: inline-block;vertical-align: top;
	margin-right: 5px;
	margin-bottom: 5px;
	padding: 0 8px;
	height: 22px;
	background:rgba(244,246,249,1);
	border-radius:5px;
}
.pr_cent2_rs{
	position: absolute;
    right: 5px;
    top: 5px;
    padding: 1px 8px;
	background:rgba(0,0,0,.5);
	border-radius:3px;
	font-size:12px;
	color:rgba(255,255,255,1);
	line-height:20px;
}
.pr_cent2_r2{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height:32px;
	
	
}
.pr_cent2_r2>div{
	border-radius:0px 0px 5px 5px;
	text-align: center;	
	line-height:32px;
	height: 100%;
	width: 100%;
}

.backdse{
	background:rgba(0,0,0,.7);
}
.pr_cent2_r2_1{		
	font-size:12px;
	color:rgba(255,255,255,.7);		
}
.pr_cent2_r2_1>span{
	margin-right: 4px;
}
.pr_cent2_r2_1>span>span{
	font-family: PingFang SC Medium;
	font-size: 16px;
	margin:0 1px;
	color:rgba(255,255,255,1);
}
.pr_cent2_r2_2{
	font-size:14px;
	color:rgba(255,255,255,1);
}
.pr_cent2_js{
	position: absolute;
    bottom: 80px;
    right: 5px;
    width: 98px;
	
}
.pr_cent2_10{
	margin: 14px 0 20px;
	height:18px;
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:22px;
}
.pr_cent2_10>span{
	font-size:14px;
	color:rgba(51,51,51,1);
}
.pr_cent2_10>span.csyaswz_01{
	font-size:16px;
	color: #33B3FF;
}
.pr_cent2_11>div{
	margin: 0;
	margin-right: 10px;
} */
.pr_cent2_1{
	position: relative;
	width:640px;
	height:354px;
	background:rgba(255,255,255,1);
	border-radius:5px;
}
.pr_cent2_2{
	cursor: pointer;
	position: relative;
	display: inline-block;
	vertical-align: top;
	overflow: hidden;
	width:640px;
	height:240px;
	border-radius:5px 5px 5px 5px;
}
.pr_cent2_3{
	display: block;
	width: 100%;
	height: 100%;
}
.pr_cent2_4{
	display: inline-block;
	vertical-align: top;
	width:640px;
}
.pr_cent2_5{
	cursor: pointer;
	width:66%;
	float: left;

}
.pr_cent2_6{
	font-size:16px;
	color:rgba(40,40,40,1);
	line-height:22px;
	margin-bottom: 10px;
	width: 220px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	padding-left: 10px;
	margin-top: 15px;
}
.pr_cent2_7,.pr_cent2_8{
	font-size:12px;
	color:rgba(187,187,187,1);
	padding-left: 10px;
	
}
.pr_cent2_7{
	margin-bottom: 4px;
	line-height:18px;
}
.pr_cent2_7>i {
    display: inline-block;
    vertical-align: top;
    margin: 3px 20px;
    width: 1px;
    height: 12px;
    background: rgba(216,216,216,.3);
}
.pr_cent2_8{margin-bottom: 20px;line-height:22px;}
.pr_cent2_8>span{
	display: inline-block;vertical-align: top;
	margin-right: 5px;
	margin-bottom: 5px;
	padding: 0 8px;
	height: 22px;
	background:rgba(244,246,249,1);
	border-radius:5px;
}
.pr_cent2_rs{
	position: absolute;
    right: 5px;
    top: 5px;
    padding: 1px 8px;
	background:rgba(0,0,0,.5);
	border-radius:3px;
	font-size:12px;
	color:rgba(255,255,255,1);
	line-height:20px;
}
.pr_cent2_r2{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height:32px;
	
	
}
.pr_cent2_r2>div{
	border-radius:0px 0px 5px 5px;
	text-align: center;	
	line-height:32px;
	height: 100%;
	width: 100%;
}

.backdse{
	background:rgba(0,0,0,.7);
}
.pr_cent2_r2_1{		
	font-size:12px;
	color:rgba(255,255,255,.7);		
	background: #33B3FF;
}
.pr_cent2_r2_1>span{
	margin-right: 4px;
}
.pr_cent2_r2_1>span>span{
	font-family: PingFang SC Medium;
	font-size: 16px;
	margin:0 1px;
	color:rgba(255,255,255,1);
}
.pr_cent2_r2_2{
	font-size:14px;
	color:rgba(255,255,255,1);
}
.pr_cent2_r2_3{
	font-size:14px;
	color:rgba(255,255,255,1);
	background: #FF9200;
}
.pr_cent2_r2_4{
	font-size:14px;
	color:rgba(255,255,255,1);
	background: #FF3B30;
}
.pr_cent2_js{
	position: absolute;
    bottom: 80px;
    right: 5px;
    width: 98px;
	
}
.pr_cent2_10{
	height:18px;
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:22px;
	padding-left: 10px;
	margin-top: 15px;
}
.pr_cent2_10>span{
	font-size:14px;
	color:#FF9300;
}
.pr_cent2_10>span.csyaswz_01{
	font-size:16px;
	color: rgba(255,59,48,1);
}
.pr_cent2_11>div{
	margin: 0;
	margin-right: 10px;
}
.pr_cent2_9{
	width: 34%;
	float: right;
}
.pr_cent2_11{
	margin-top: 15px;
}
.fc{
	width: 80px;
	height: 32px;
	line-height: 32px;
	text-align: center;
	background:#efffe5;
    border-radius:16px;
	color: #4DC600;
	font-size: 14px;
	margin-top: 15px;
    float: right;
    margin-right: 15px;
}
.md{
	width: 80px;
	height: 32px;
	line-height: 32px;
	text-align: center;
	background:#e5f5ff;
    border-radius:16px;
	color: #33B3FF;
	font-size: 14px;
	margin-top: 15px;
    float: right;
    margin-right: 15px;
}
.pr_cent2_11 > ul > li{
	float: right;
	width: 85px;
}
.pr_cent2_status{
	position: absolute;
    top: 10px;
	left: 10px;
    width: 80px;
    height: 40px;
    text-align: center;
    line-height: 40px;
	border-radius: 5px;
	font-weight:600;
	font-size: 16px;
}
.pr_cent2_r2_4 > span{
	font-size: 16px;
	margin-left: 5px;
}
</style>