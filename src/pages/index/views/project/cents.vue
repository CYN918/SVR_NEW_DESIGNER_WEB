<template>
	<div class="cengg">
		<div class="cens_01">
			<div class="cens_02">
				<div class="cens_02_1 oijdiv">				
					<img class="cens_02_1_img" :src="deta.banner" alt="">
					<div v-if="deta.extra_reward" class="sjxd" @mouseout="mod()" @mouseover="modx($event,0)">
						额外奖金¥{{deta.extra_reward}}
					</div>
					<div class="cens_02_1_cent">
						<div class="cens_x0">
							<div class="cens_x1">{{deta.name}}</div>
							<div class="cens_x2">项目类型：{{deta.classify_name}}</div>
							<div class="cens_x3">领域范围：<span v-for="(el,index) in deta.fields" :key="index">{{el}}</span></div>
						</div>
						<div>
							<div class="cens_x4">
								<div class="icon_ff_1"><img src="/imge/project/04.svg" alt="">预计收益</div>
								<div class="cens_x4_1">{{deta.expected_profit}}<img @mouseout="mod()" @mouseover="modx($event,1)" src="/imge/project/09.svg" ></div>
							</div>
							<div class="cens_x5">
								<div class="icon_ff_1"><img src="/imge/project/08.svg" alt="">制作周期</div>
								<div  class="cens_x4_1 cens_x4_1_x1" v-html="backZq(deta.production_cycle_d,deta.production_cycle_h)">
									
								</div>
								
							</div>
							
						</div>
						<div v-if="deta.status==1 || deta.status==2">
							<div class="icon_ff_1"><img class="icon_ff_1_x1" src="/imge/project/05.svg" alt=""><span>{{deta.sign_up_num}}</span>人已报名</div>
						</div>
					</div>
				</div>
				
				<div v-for="(el,index) in deta.desc" :key="index" class="cens_02_2 oijdiv">
					<div class="cens_02_2hd">{{el.module_title}}</div>
					<div class="cens_02_2ce" v-html="el.module_content"></div>
				</div>
			</div>
			<div class="cens_03 oijdiv">
				<xmDp v-if="deta.status" :obj="deta" ref="xmDp"></xmDp>
				<div class="centShar botx_01">
					<span class="movfx_01">
						<div @click="sharc" class="centShar_1"></div>						
						分享项目
					</span>
					<span class="movfx_02">
						<a  class="centShar_2" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=363741945&site=qq&menu=yes"></a>
						项目顾问
					</span>
				</div>
				<liucen></liucen>
			</div>
		</div>
		<tipd  :tipCent="csff" :style="sfas" ref="csdf"></tipd>
		<component v-bind:is="tcZj"  :datad="tcData"></component>
		
		
		<topGd v-if="topTyped==1 && deta.status==1"></topGd>
	</div>
	
</template>

<script>
import liucen from './liucen';
import tipd from './cenTip';
import xmDp from './xmDp';
import pr_rz from './pr_rz';
import qxBm from './qxBm';
import bmXm from './bmXm';
import shareD from './share';
import pushGj from './pushGj';
import qxGj from './qxGj';
import Log from './log';
import Stop from './stop';
import question from './question';
import presentation from './presentation';
import topGd from './topGd';

export default {
	components:{liucen,tipd,xmDp,pr_rz,qxBm,bmXm,shareD,pushGj,qxGj,Log,Stop,question,presentation,topGd},
	data(){
		return{
			tcZj:'',
			tcData:'',
			shareData:{},
			sfas:'display:none',
			csff:'项目验收价格，会根据验收稿的质量有所浮动，但只要稿件完成度符合项目需求，则验收价格不会低于“预计收益”的范围区间。',
			tips:[
				'有额外奖金的项目，通常为交稿时间较急、或难度较大，也可能会是平台福利项目，额外奖金将在正常项目验收后计入最终成交价格内。',
				'项目验收价格，会根据验收稿的质量有所浮动，但只要稿件完成度符合项目需求，则验收价格不会低于“预计收益”的范围区间。',
				'点击打开QQ咨询项目顾问'
			],
			xmOn:3,
			xm:[{n:'招标期',cl:'c_zmq'},{n:'选标期',cl:'c_zmq'},{n:'制作期',cl:'c_zmq2'},{n:'待验收',cl:'c_zmq3'},{}],
			
			deta:{},
			djsTime:{},
			savGd:'',
			topTyped:'',
		}
	},
	mounted: function(){
		this.init();
	}, 
	methods: {	
		init(){		
			if(!this.$route.query.id){
				this.$router.push({path:'/project'});
				return
			}
					
			this.getData();			
		},
		autoS(){
			let t = document.documentElement.scrollTop||document.body.scrollTop;
			if(t==0){
				document.documentElement.scrollTop =1;
				document.body.scrollTop =1;
			}
			if(this.topTyped==''){
				if(t>188){
					this.topTyped=1;
				}
				
			}
			if(t<=188){
				this.topTyped='';
			}
		},
		
		
		backZq(a,b){
			let str = '';
			if(a){
				str+='<span>'+a+'</span>天';
			}
			if(b){
				str+='<span>'+b+'</span>小时';
			}
			return str;
		},
		sharc(){
			this.tcZj = 'shareD';
			this.tcData = {
				name:this.deta.name,
				banner:this.deta.banner,
			};
		},
		mod(e){
			this.sfas = 'display:none';
		},
		modx(e,on){
			this.csff = this.tips[on];
			this.setPos(e.clientX,e.clientY);
		},	
		setPos(x,y){
			this.sfas = 'top:'+y+'px;left:'+x+'px';
		},
		close(){
			this.tcZj = '';
		},
		showTc(a,b){
			this.tcZj = a;
			this.tcData = b;
		},
		setBm(on){
			this.deta.is_sign_up=on;
			this.$refs.xmDp.setBm(this.deta.is_sign_up);
		},
		setStaus(on){
			this.deta.status= on;
			this.$refs.xmDp.setStuts(on);
		},
		getData(){
			
			let pr = {
				id : this.$route.query.id
			};
			this.api.pr_detail(pr).then((da)=>{
				if(da=='error'){return}			
				document.removeEventListener('scroll',this.autoS);	
				if(da.status==1 && da.is_sign_up==0){
					document.addEventListener('scroll',this.autoS,false);	
				}
				
				this.deta = da;
			}).catch(()=>{
				
			});
		}
		
	}
}
</script>

<style>
.cengg{
	background:rgba(244,246,249,1);
}
.cens_01{
	padding: 20px 0 60px;
	margin: 0 auto;
	width: 1300px;
}
.oijdiv{
	background:rgba(255,255,255,1);
	border-radius:5px 5px 5px 5px;
}
.cens_02{
	vertical-align: top;
	display: inline-block;
	margin-right: 20px;
	width: 928px;
}
.cens_02>div{
	margin-bottom: 20px;
}
.cens_03{
	vertical-align: top;
	display: inline-block;
	width: 352px;
}
.cens_03>div{
	border-bottom: 1px solid rgba(244,246,249,1);
}

.cens_02_2{
	
}
.cens_02_2hd{
	font-size:24px;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:33px;
	text-align: center;
	line-height: 93px;
	height: 93px;
	border-bottom: 1px solid rgba(244,246,249,1);
}
.cens_02_2ce{
	padding: 30px 0;
	margin: 0 auto;
	width:780px;

}

.centShar>span{
	display: inline-block;
	font-size:14px;
	font-weight:400;
	margin:40px 22px;
	color:rgba(187,187,187,1);
	line-height:20px;	
	
}
.centShar>span>img{
	display: block;
	margin: 0 auto 5px;
	width: 40px;
	height: 40px;
	
}

.cens_02_1{
	position: relative;
	height:272px;
	width: 100%;
	box-sizing: border-box;
	padding: 20px;
	text-align: left;
}
.cens_02_1_img{
	display: inline-block;
	vertical-align: top;
	margin-right: 20px;
	width:310px;
	height:232px;
	box-shadow:0px 5px 15px 0px rgba(0,0,0,0.1);
	border-radius:5px 5px 5px 5px;
}
.cens_02_1_tip{
	position: absolute;
	top: 0;
	nav-right: 0;
}
.cens_02_1_cent{
	display: inline-block;
	vertical-align: top;
}
.cens_x0{
	width:420px;
	border-bottom: 1px solid rgba(244,246,249,1);
	margin-bottom: 20px;
}
.cens_x1{
	margin-bottom: 15px;
	font-size:24px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:33px;
	white-space: nowrap;
	overflow: hidden;
}
.cens_x2{
	margin-bottom: 10px;
	font-size:14px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:20px;
}
.cens_x3{
	font-size:14px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:20px;
	margin-bottom: 20px;
}
.cens_x3>span{
	display: inline-block;
	margin:0 3px;
	padding: 2px 10px;
	background:rgba(244,246,249,1);
	border-radius:5px;
	font-size:12px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:18px;
}
.icon_ff_1{
	height: 28px;
	font-size:14px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:28px;
}
.icon_ff_1>img{
	display: inline-block;
	vertical-align: top;
	margin-top: 2px;
	margin-right: 10px;
    width: 18px;
    height: 18px;
}
.icon_ff_1>span{
	font-size:14px;
	color:rgba(255,81,33,1);
}
.cens_x4{
	display: inline-block;
	vertical-align: top;
	margin-right: 57px;
	margin-bottom: 10px;
}
.cens_x5{
	display: inline-block;
	vertical-align: top;
	
}
.cens_x4_1{
	width: 178px;
	text-align: left;
	margin-left: 27px;
	font-size:14px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:20px;
}
.cens_x4_1>span{
	color:rgba(255,81,33,1);
	margin:0 4px;
}
.cens_x4_1_x1{
	color:rgba(187,187,187,1);
}

.cens_x4_1>img{
	cursor: pointer;
	display: inline-block;
	margin-top: 2px;
	margin-left: 5px;
	vertical-align: top;
	width: 14px;
	height: 14px;
}


.sjxd{
	position: absolute;
	top: 0;
	right: 21px;
	width:65px;
	height:58px;
	background:rgba(255,81,33,.1);
	border-radius:0px 0px 2px 4px;
	font-size:12px;
	text-align: center;
	font-weight:400;
	color:rgba(255,81,33,1);
	line-height:17px;
	box-sizing: border-box;
	padding: 5px;
}
.sjxd:after{
	content: "";
	position: absolute;
	bottom: 0;
	left: 0;
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0;
    border-left: 32.5px solid transparent;
    border-right: 32.5px solid transparent;
    border-bottom: 9px solid #fff;

}
.centShar_1,.centShar_2{
	display: block;
	margin: 0 auto 5px;
    width: 40px;
    height: 40px;
	margin-bottom: 5px;
}
.centShar_1{
	background: url(/imge/project/06.svg) no-repeat;
}
.centShar_2{
	background: url(/imge/project/07.svg) no-repeat;
}
.movfx_01,.movfx_02{
	cursor: pointer;
}
.movfx_01:hover>.centShar_1{
	background: url(/imge/project/fx_02.svg) no-repeat;
}
.movfx_02:hover>.centShar_2{
	background: url(/imge/project/kf_02.svg) no-repeat;
}
.icon_ff_1>.icon_ff_1_x1{
	margin-top: 1px;
}
</style>
