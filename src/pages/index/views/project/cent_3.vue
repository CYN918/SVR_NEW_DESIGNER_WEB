<template>
	<div class="pr_ml_1">
		<div class="pr_ml_2" :style="setBg">
			<span v-if="deta.status==1 || deta.status==2" class="pr_ml_3">已报名</span>
			<div class="pr_ml_4" v-html="tips"></div>
		</div>
		<div class="pr_ml_5">
			<div class="pr_ml_6">
				<span v-html="setDeal_type"></span>				
				<span class="pr_ml_6_2">{{deta.name}}</span>
			</div>
			<div class="pr_ml_7">
				<span>项目类型：{{deta.classify_name}}</span>
				<span><i></i>制作周期：{{deta.production_cycle_d | NumbUnd}}天</span>
				<span v-if="deta.money && deta.money.advance_payment">
					<i></i>预付金：<span class="fontcl">￥{{deta.money.advance_payment}}</span>
				</span>
			</div>
			<div class="pr_ml_8">
				预计收益：<span class="fontcl">{{deta.expected_profit}}</span>
			</div>
		</div>
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
	filters: {
		NumbUnd: function (n) {
		  return n?n:0;
		},
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
	computed: {
	    setBg: function () {
			return "background-image: url("+(this.deta.banner?this.deta.banner:(this.imgSig+'toltImg/Zoocreators_logo.svg'))+");";
	    },
		setDeal_type(){
			if((!this.deta.deal_type || this.deta.deal_type==0) && !this.deta.settlement){
				return '';
			}
			let str = '<span class="pr_ml_6_1';
			let deal_type = {
				0:'',
				1:'买断',
				2:'分成',
				3:'预付金+分成'
			};
			let settlement = {
				0:'买断/分成',
				1:'买断',
				2:'分成'
			}
			if(this.deta.deal_type && this.deta.deal_type!=0){
				if(this.deta.deal_type==2){
					str +=" pr_ml_6_1x";
				}
				str +='">';
				str +=deal_type[this.deta.deal_type];
			}else if(this.deta.settlement || this.deta.settlement==0){
				if(this.deta.settlement==2){
					str +=" pr_ml_6_1x";
				}
				str +='">';
				str +=settlement[this.deta.settlement];
			}else{
				str +='">';
			}
			str+='</span>';
			return  str;
		}
	},
	methods: {	
		ckd(a,n){
			if(n=='稿件撤回' && this.deta.check_steps==1){
				this.tipMr('项目已在审核中，请勿撤回')				
				return
			}
			
			this.bdtj('我的项目',n,'--')
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
				this.tips = '<div class="pr_ml_8 backdse"><span><span>'+this.deta.left_time.d+'</span>天<span>'+this.deta.left_time.h+'</span>时<span>'+this.deta.left_time.m+'</span>分<span>'+this.deta.left_time.s+'</span>秒</span>后截止报名</div>';
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
					{n:'稿件撤回',fn:'qxGj'},
					{n:'交稿记录',fn:'Log'},					
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
			if(this.deta.id){
				this.bdtj('我的项目','点击进入详情','--')
				window.open('/#/prcent?id='+this.deta.id+'&type=prj')
			}			
		},
		backtims(){			
			let a = this.deta.left_time;
			if(!a || a.length==0){return}
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
.pr_ml_1{
	margin: 0 auto 20px;
	width:1130px;
	height:170px;
	padding: 20px;
	background:rgba(255,255,255,1);
	border-radius:8px;
}
.pr_ml_2{
	position: relative;
	display: inline-block;
	vertical-align: top;
	width:227px;
	height:170px;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	border-radius:5px;
}
.pr_ml_3{
	position: absolute;
	top: 10px;
	left: 10px;
	font-size:12px;
	color:rgba(255,255,255,1);
	line-height:22px;
	padding: 0 8px;
	background:rgba(0,0,0,.5);
	border-radius:3px;
}
.pr_ml_4{
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	background:rgba(0,0,0,.7);
	border-radius:0px 0px 5px 5px;
	line-height: 32px;
	font-size:12px;
	color:rgba(255,255,255,1);
	font-weight: 400;
	text-align: center;
}
.pr_ml_4>span{
	font-size:16px;
	font-weight:500;
	color:rgba(255,255,255,1);
	
}
.pr_ml_5{
	display: inline-block;
	vertical-align: top;
	margin-left: 20px;
}
.pr_ml_6{
	margin: 3px 0 9px;
	
}
.pr_ml_6_1{
	display: inline-block;
	vertical-align: top;
	min-width:74px;
	height:26px;
	background:rgba(77,198,0,0.1);
	border-radius:4px;
	border:1px solid rgba(77,198,0,1);
	font-size:14px;
	text-align: center;
	padding: 0 6px;
	line-height:26px;
	color:rgba(77,198,0,1);
}
.pr_ml_6_2{
	display: inline-block;
	vertical-align: top;
	margin-left: 16px;
	font-size:18px;
	font-weight:500;
	line-height:28px;
	color:rgba(40,40,40,1);	
}
.pr_ml_7{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
	margin-bottom: 8px;
}

.pr_ml_7>span>i{
	display: inline-block;
	vertical-align: top;
	margin: 5px 20px;
	width:1px;
	height:8px;
	background:rgba(187,187,187,1);
}
.fontcl{
	color: #FF9300;
}
.pr_ml_8{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
}
.pr_ml_8>span{
	font-size:14px;
	font-weight:500;
	line-height:22px;
	color: #fff;
}
.pr_ml_6_1x{
	color: #33B3FF;
	background:rgba(51,179,255,0.1);
	border-color: rgba(51,179,255,1);
}
</style>