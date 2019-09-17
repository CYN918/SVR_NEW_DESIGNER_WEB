<template>
	<div :class="['cenDjs',da.cl]">
		<div class="cenDjs_1"></div>
		<div class="yu_o9">
			<div class="yu_o9_1bx">
				<div v-if="djsshow.h" class="cenDjs_2">
					<span v-if="djsshow.d>0">{{djsshow.d}}<span class="cenDjs_2_dy_01">天</span></span><span>{{djsshow.h+':'+djsshow.m+':'+djsshow.s}}</span>
				</div>
				<div v-if="obj.delivery_deadline_format && obj.status==3 && obj.is_delay!=1" class="cenDjs_2">
					<span>{{obj.delivery_deadline_format.m}}</span>月<span>{{obj.delivery_deadline_format.d}}</span>号<span>{{obj.delivery_deadline_format.H}}</span>点
				</div>
				
				<div v-if="obj.is_delay" class="cenDjs_2_yq">
					<div class="is_seldf">项目已延期交稿</div>
					<span>{{obj.delay_time.d}}</span>天<span>{{obj.delay_time.h}}</span>时
				</div>
				<div v-else class="cenDjs_3">{{da.n}}<div v-if="obj.status==5" class="cenDjs_zzf">{{'￥'+obj.deal_price}}</div> </div>
				
			</div>
			
			<div class="cenDjs_4">
				<div v-for="(el,index) in da.btns" :key="index" :class="['pend',el.cl]" @click="clickFn(el.tcFn,el.tcFncs)">{{el.n}}</div>
			</div>
			<div class="cenDjs_5">{{da.btn_tip}}</div>
		</div>
		
		<div v-if="da.t" :class="['sjxdpo',da.t.cl]">
			{{da.t.n}}
		</div>

		<div v-if="obj.status==3 || obj.status==4" class="worksBox_2 tg_iocn_2">
			<div class="worksBox_2_1">
				<div @click="showTc(el.cs)" v-for="(el,index) in options">{{el.n}}</div>
				<div v-if="obj.contract_file.length>0" class="worksBox_2_3">下载合同 <span class="js_0013"></span>
					<div class="worksBox_2_4">
						<div v-for="(el,index) in obj.contract_file" :key="index" @click="dowun(el.file_url)">{{el.file_name}}</div>						
					</div>
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
			da:{},			
			djsshow:{},
			xmType:[
				{t:{n:'招募期',cl:'c_zmq'},n:'后截止报名',cl:'cenDjs_x_1',btn_tip:'报名后耐心等待，中标后会有短信通知',Zj:'pr_rz',btns:[{n:'报名项目',tcFn:'showTc1',tcFncs:'pr_rz',cl:'cenDjs_4ys'}]},
				{t:{n:'选标期',cl:'c_zmq'},n:'报名成功，等待平台选标...',cl:'cenDjs_x_2',btn_tip:'报名后耐心等待，中标后会有短信通知',Zj:'qxBm',btns:[{n:'取消报名',tcFn:'showTc',tcFncs:'qxBm'}]},
				{t:{n:'制作期',cl:'c_zmq2'},sle:'1',n:'前截止交稿',cl:'cenDjs_x_1',btn_tip:'请在规定时间交付稿件，加油哦！',yue:'1',btns:[{n:'交付稿件',tcFn:'showTc',tcFncs:'pushGj',cl:'cenDjs_4ys'}]},
				{t:{n:'待验收',cl:'c_zmq3'},sle:'1',n:'项目稿件已提交',cl:'cenDjs_x_2',btn_tip:'稿件已提交，请耐心等待验收审核。',btns:[{n:'稿件撤回',tcFn:'showTc',tcFncs:'qxGj'}]},				
				{t:{n:'已验收',cl:'c_zmq4',icon:'md'},n:'最终成交价格',cl:'cenDjs_x_2',btn_tip:'项目验收完成，感谢与你本次的合作',Zj:'qxGj',btns:[
						
						{n:'项目评价',tcFn:'showTc',tcFncs:'question'},
						{n:'验收报告',tcFn:'goyans',tcFncs:'presentation'},
					],
				},				
			],
			xmTypeOn:0,
			endjg:'',
			options:[{n:'终止项目',cs:'Stop'},{n:'交稿记录',cs:'Log'}],
		}
	},
	mounted: function(){
		this.init();
	}, 
	methods: {

		init(){
			this.xmTypeOn = this.obj.status-1;
			if(this.obj.is_sign_up==1){
				this.xmType[0].btns = [{n:'取消报名',tcFn:'showTc',tcFncs:'qxBm'}];	
			}
			this.da = this.xmType[this.xmTypeOn];	
			if(this.obj.is_evaluated==1){
				this.xmType[4].btns[0].n = '已评价';
				this.xmType[4].btns[0].tcFn = 'ypj';
			}
			
			if(this.obj.left_time &&  this.obj.status==1){
				this.da.djs = this.obj.left_time;
				this.djsfn(this.da.djs);
			}
				
		},
		setBm(on){
			if(on==1){
				this.xmType[0].btns = [{n:'取消报名',tcFn:'showTc',tcFncs:'qxBm'}];	
				return
			}
			this.xmType[0].btns = [{n:'报名项目',tcFn:'showTc1',tcFncs:'pr_rz',cl:'cenDjs_4ys'}];	
		},
		setStuts(on){
			this.xmTypeOn = on-1;
			this.da = this.xmType[this.xmTypeOn];
		},
		ypj(){
			this.$message({message:'你已经评价过了'});
		},
		clickFn(n,b){
			if(n){
				this[n](b);
			}
		
			
		},
		goyans(on){
			this.$router.push({path:on,query:{id:this.obj.id}})	
		},
		gofn(on){
			this.$router.push({path:on})	
		},
		showTc1(o){
			this.api.pr_check({}).then((da)=>{
				if(da=='error'){return}
				if(da.is_complete==true && da.is_contributor==true && da.work_num==3){
					this.$parent.showTc('bmXm',{project_id:this.$parent.deta.id});
					return
				}			
				this.$parent.showTc('bmXm',{project_id:this.$parent.deta.id});	
				// this.$parent.showTc(o,da);				
			}).catch(()=>{
				
			})
		},
		

		showTc(o,data){		
			this.$parent.showTc(o,data);
		},
		djsfn(da){			
			if(da.h==0 && da.m==0 && da.s==0){
				this.djsshow.s = '00';
				this.xmTypeOn++;
				this.djsshow = '';
				this.da = this.xmType[this.xmTypeOn];	
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
			if(da.d>0){
				da.d--;
				da.h = 23;
				da.m= 59;
				da.s = 59;
				return
			}
			
		},
		btime(t){
			return t>9?t:'0'+t
		},
		dowun(u){
			window.open(u);
		}
		
		
		
	}
}
	
</script>

<style>
.cenDjs{
	position: relative;
}
.yu_o9_1bx{
	height: 162px;
}

.cenDjs_x_1 .cenDjs_2{
	padding-top: 60px;
}
.cenDjs_2{

	text-align: center;
	font-size:14px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:20px;
}
.cenDjs_2>span{
	margin: 0 5px 0 10px;
	font-size:28px;
	font-family:PingFangSC;
	font-weight:600;
	color:rgba(255,81,33,1);		
	line-height:40px;
}
.cenDjs_3{
	padding-top: 10px;
	margin-bottom: 30px;
	font-size:16px;
	font-weight:400;
	color:rgba(40,40,40,1);
	line-height:22px;
}
.cenDjs_x_2 .cenDjs_3{
	padding-top: 90px;
}
.cenDjs_4{
	text-align: center;
	margin-bottom: 10px;
}
.cenDjs_4>div{
	display: inline-block;
	margin: 0 7px;
	font-size:14px;
	font-weight:400;
	color:#666;
	line-height:38px;
	text-align: center;
	width:98px;
	height:38px;
	border: 1px solid #BBBBBB;
	border-radius:5px;
}

.cenDjs_4>div.cenDjs_4ys{
	border-color: rgba(255,81,33,1);
	color:rgba(255,255,255,1);
	background:rgba(255,81,33,1);
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
    top: 0;
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
.c_zmq{
	background:rgba(230,247,255,1);
	color: #1890FF;
	border-color: rgba(145,213,255,1);
}
.c_zmq2{
	background:rgba(249,240,255,1);
	color: #722ED1;
	border-color: rgba(211,173,247,1);
}
.c_zmq3{
	background:rgba(255,251,230,1);
	color: #FCAE00;
	border-color: rgba(255,229,143,1);
}

.c_zmq4{
	background:#e2ffcb;
	color: #52C41A;
	border-color: #B7EB8F;
}


.sjxdpo:before{
    content: "";
    position: absolute;
    bottom: 0px;
    left: -2px;
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 9px solid #ff5121;
}
.c_zmq:before{
	border-bottom: 9px solid rgba(145,213,255,1);
}
.c_zmq2:before{
	border-bottom: 9px solid rgba(211,173,247,1);
}
.c_zmq3:before{
	border-bottom: 9px solid rgba(255,229,143,1);
}
.c_zmq4:before{
	border-bottom: 9px solid #B7EB8F;;
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
.tg_iocn_1{
    position: absolute;
	top: 4px;
    right: 2px;
    width: 107px;
}
.cenDjs_zzf{
	margin-top: 5px;
	font-size:28px;
	font-weight:600;
	color:rgba(255,81,33,1);
	line-height:34px;
}

.worksBox_2{
	cursor: pointer;
	position: absolute;
	right: 0;
	top: 0;
	font-size: 14px;
	color: #666666;
	text-align: center;
	width: 95px;
}
.worksBox_2:after{
	content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    border: 1px solid #666;
    border-bottom: 0;
    border-right: 0;
	margin-left: 8px;
    transform: rotate(-135deg);
    transform-origin: 70% 20%;
}
.worksBox_2:hover>.worksBox_2_1{
	display: block;
}
.worksBox_2_1{
	display: none;
	position: absolute;
	top: 19px;
	right: 0;
	z-index: 99;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 95px;
	padding: 10px 0;
	
}
.worksBox_2_1>div{
	line-height: 30px;
	font-size: 14px;
	color: #333333;
}
.worksBox_2_1>.oncdf{
	color: #FF5121;
}
.worksBox_2_1>div:hover{
	background: #E6E6E6;
}
.tg_iocn_2{
	width: 55px;
    height: 26px;
    top: 11px;
}
.is_seldf{
	font-size:16px;
	font-family:PingFangSC;
	font-weight:400;
	color:rgba(40,40,40,1);
	line-height:22px;
	margin-bottom: 10px;
}
.cenDjs_2_yq{
	padding-top: 70px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(187,187,187,1);
    line-height: 20px;
}
.cenDjs_2_yq>span{
	margin: 0 5px 0 10px;
	font-size:28px;
	font-family:PingFangSC-Semibold;
	font-weight:600;
	color:rgba(255,81,33,1);
	line-height:40px;
	
	
	
}
.cenDjs_2_dy_01{
	display: inline-block;
    vertical-align: top;
	font-size:22px;
	font-family:PingFangSC;
	font-weight:400;
	color:rgba(187,187,187,1);
}


.js_0013{    
	position: absolute;
	display: inline-block;
    bottom: 20px;
    width: 5px;
    height: 5px;
    border: 1px solid #666;
    border-bottom: 0;
    border-right: 0;
    margin-left: 5px;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
    -webkit-transform-origin: 70% 20%;
    transform-origin: 70% 20%;}

.worksBox_2_4{
	display: none;
	position: absolute;
	right: 0;
	top: 0;
	background: #FFFFFF;
    -webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    border-radius: 5px;
	box-sizing: border-box;
	left: 100%;
    min-width: 100%;
	min-height: 100%;
    padding: 10px 0;
}
.worksBox_2_3:hover>.worksBox_2_4{
	display: block;
}
.worksBox_2_4>div{
	line-height: 30px;
    font-size: 14px;
    color: #333333;
}
.worksBox_2_4>div:hover{
	background: #E6E6E6;
}
</style>
