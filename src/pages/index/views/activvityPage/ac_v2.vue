<template>
	<div>
		<Header ref="topZj"></Header>
		<div class="ac_v1-1">
			<img class="ac_v1-2" :src="imgPath+'ac_v2/ban.png'"/>
			<div class="sto_01" v-if="deta.status>=3">
				<img :src="imgPath+'ac_v2/xl.png'"/>
				<div class="sto_02">
					<div v-if="deta.status==3" @click="Stop()">终止项目</div>
					<div v-if="islog" @click="Log()">交稿记录</div>
					<div v-if="deta.contract_file && deta.contract_file.length>0" class="worksBox_2_3">
						下载合同 
						<span class="js_0013"></span>
						<div class="worksBox_2_4">
							<div v-for="el in deta.contract_file" @click="dowun(el.file_url)">{{el.file_name}}</div>						
						</div>
					</div>
					
				</div>
			</div>
			<div class="ac_v2">
				<div class="ac_v2-1">
					<span>
						<div>
							<div class="ac_v2-1-1">当前状态</div>
							<div class="ac_v2-1-2">{{xmType[xmTypeOn].t}}</div>
						</div>
						
					</span>
					<i class="fng_01" v-if="deta.status==1 || deta.status==3">
						<img :src="imgPath+'ac_v2/bt0.png'">
						<img :src="imgPath+'ac_v2/bt0.png'">
					</i>
					<span v-if="deta.status==1 || deta.status==3">
						<div>
							<div class="ac_v2-1-1">{{deta.delay_time?'项目已延期交稿':xmType[xmTypeOn].n}}</div>
							
							
							<div class="ac_v2-1-2">
								<span v-if="djsshow.d || djsshow.d==0">
									{{djsshow.d}}天 {{djsshow.h+':'+djsshow.m+':'+djsshow.s}}
								</span>
								<span v-if="deta.delay_time">
									{{deta.delay_time.d}}天 {{deta.delay_time.h}}小时
								</span>
								<span v-if="deta.delivery_deadline">
									{{deta.delivery_deadline}}
								</span>
								
								
							</div>
						</div>
					</span>
					<i v-if="deta.status<3" class="fng_01">
						<img :src="imgPath+'ac_v2/bt0.png'">
						<img :src="imgPath+'ac_v2/bt0.png'">
					</i>
					<span v-if="deta.status<3">
						<div>
							<div class="ac_v2-1-1">报名人数</div>
							<div class="ac_v2-1-2">{{deta.sign_up_num}}</div>
						</div>
					</span>
					<i class="fng_01">
						<img :src="imgPath+'ac_v2/bt0.png'">
						<img :src="imgPath+'ac_v2/bt0.png'">
					</i>
					<span>
						<div>
							<div class="ac_v2-1-1">金额</div>
							<div class="ac_v2-1-2">{{deta.expected_profit}}</div>
						</div>
					</span>
				</div>
				
				
				<div class="av_vbt">
					<span class="op" @click="clFn(el.tcFn)" v-for="el in xmType[xmTypeOn].btns">{{el.n}}</span>
					<span class="op1" v-if="deta.template_file_url" @click="dowloadmb(deta)">下载资料</span>
				</div>
			</div>
			<!-- <div class="ac_v1-4">
				<div class="ac_v1-4x">
					<span @click="navCl(el)" :class="el.p==navOn?'checkO':''" v-for="el in arr">{{el.n}}</span>
				</div>
			</div> -->
			
			
			<div class="ac_v1-5">
				<div class="ac_v1-5-1">
					<img :src="imgPath+'ac_v2/01.png'">
					<div class="botn_av2"><span @click="goBz(el)" v-for="el in btnsa"></span></div>
					<div class="botn_av3"><span @click="goBz(el)" v-for="el in btnsb"></span></div>
				</div>				
			</div>			
			<div class="ac_v1-3">
				<img :src="imgPath+'ac_v2/fx.png'"/>				
				<div @click="shaFn('fxUrl2')" class="ac_v1-3-2x"></div>
				<div class="ac_v1-3-3 ac_v1-3-3x">
					<img :src="imgPath+'ac_v2/fx1.png'"/>
				</div>
			</div>
			<component v-bind:is="tanDatazj"  :datad="tanData"  :settlement="deta.settlement" :expected_profit="deta.expected_profit"></component>
		</div>
		
	</div>
</template>

<script>
import pr_rz from '../project/pr_rz';
import bmXm from '../project/bmX';
import qxBm from '../project/qxBm';
import pushGj from '../project/pushGj';
import qxGj from '../project/qxGj';
import Log from '../project/log';
import Stop from '../project/stop';
import question from '../project/question';
import presentation from '../project/presentation';
import Header from '../header';
export default{
	components:{pr_rz,bmXm,qxBm,pushGj,qxGj,Log,Stop,question,presentation,Header},
	data(){
		return{
			tanDatazj:'',
			tanData:{},
			da:{},
			deta:{},
			djsshow:{},
			xmType:[
				{t:'招募期',n:'截止报名时间',btns:[
					{n:'报名项目',tcFn:'bm'},
				]},
				{t:'选标期',n:'选标期',btns:[
					{n:'取消报名',tcFn:'qxBm'},
				]},
				{t:'制作期',n:'截止交稿时间',btns:[
					{n:'交付稿件',tcFn:'pushGj'}
				]},
				{t:'待验收',n:'验收中',btns:[
						{n:'稿件撤回',tcFn:'qxGj'},
						{n:'交稿记录',tcFn:'Log'},
				]},
				{t:'已验收',n:'已完成',btns:[
					{n:'项目评价',tcFn:'question'},
					{n:'验收报告',tcFn:'presentation'},
				]},				
			],
			xmTypeOn:0,
			endjg:'',
			options:[{n:'终止项目',tcFn:'Stop'},{n:'交稿记录',tcFn:'Log'}],
			btnsa:[
				'4-02',
				'4-07',
				'4-05',
				'4-04',
				'4-08',
				'4-09',
			],
			btnsb:[
				'4-10',
				'4-12',
				'4-13',
				'4-11',
				'4-14',
				'4-15',
			],
			islog:'',
			pagename:'项目详情页'
		}
	},
	mounted: function(){
		this.ckl();
	}, 
	methods:{
		pr_deliveryList(){
			this.api.pr_deliveryList({
				project_id:this.ids,
			}).then((da)=>{
				if(da=='error' || da=='104'){return}
				if(da.length>0){
					this.islog = 1;
				}
		
			})
		},
		getstate(){
			return this.xmType[this.xmTypeOn].t;
		},
		navCl(el){
			if(el.p==this.navOn){
				return
			}
			if(el.p==4){
				this.downMoble(this.infoData);
				return
			}

			this.navOn = el.p;
			
			
		},
		goBz(el){
			this.$router.push({path:'/help',query:{on:el}})
		},
		clFn(fn){
			
			this[fn]();
		},
		close(){
			this.tanDatazj = '';
			this.tanData = {};
		},
		setBm(){
			
		},
		dowun(u){
			
			window.open(u);
		},
		ckl(){
			if(!this.$route.query.id){
				this.$router.push({path:'/activvity'})	
				return
			}
			this.ids = this.$route.query.id;
			this.pr_deliveryList();
			
			this.getData();
			
		},
		dowloadmb(obj){
			console.log('项目详情页',this.xmType[this.xmTypeOn].t,'[下载附件]')
			this.bdtj('项目详情页',this.xmType[this.xmTypeOn].t,'[下载附件]')
			window.downloadFiles(obj.template_file_url,obj.template_file_name);
		},
		bm(){
			this.api.pr_check({}).then((da)=>{
				if(da=='error' || da=='104'){return}
				if(da.is_complete!=true || da.is_contributor!=true || da.work_num<3){

					this.tanDatazj = 'pr_rz';
					this.tanData = da;
					return
				}
				this.tanDatazj = 'bmXm';
				this.tanData.project_id = this.deta.id;	
			}).catch(()=>{
				
			})
			
		},
		qxBm(){
			this.tanDatazj = 'qxBm';
			this.tanData = this.deta;		
		},
		pushGj(){
			this.tanDatazj = 'pushGj';
			this.tanData = this.deta;	
		},
		qxGj(){
			this.tanDatazj = 'qxGj';
			this.tanData = this.deta;
		},
		question(){
			this.tanDatazj = 'question';
			this.tanData = this.deta;
		},
		presentation(){
			this.$router.push({path:'presentation',query:{id:this.deta.id}})	
		},
		ypj(){
			this.$message({message:'你已经评价过了'});
		},
		Log(){
			this.tanDatazj = 'Log';
			this.tanData = this.deta;
		},
		Stop(){
			this.tanDatazj = 'Stop';
			this.tanData = this.deta;
		},
		shaFn(n){
			
			
			window.open('http://wpa.qq.com/msgrd?v=3&uin=363741945&site=qq&menu=yes');
		},
		shar(da){
		
			let ulrd = encodeURIComponent(da.url);
			this.fxUrl1 = 'http://service.weibo.com/share/share.php?appKey=3473072390&title='+da.title+'&url='+ulrd+'&pic='+da.pics+'#_loginLayer_'+(new Date()).valueOf();
			this.fxUrl2 ='https://connect.qq.com/widget/shareqq/index.html?url='+ulrd+'&title='+da.title+'&pics='+da.pics+'&desc=&summary='+da.summary+'&site=wo';			
			
		},
		timeO(a){
			this.px = a;
			this.page=1;
			this.limit=20;
			this.a_getWork();
		},
		downMoble(d){
			if(d.template_file_type==1){
				window.downloadFiles(d.template_url,d.template_file_name);
				return
			}
			this.tanData = {
				zj:'com_wp',
				info:online_disk_info
			};
		},
		a_getWork(){
			let pr = {
				activity_id:this.ids,
				page:this.page,
				limit:this.limit,
			};
			if(this.px){
				pr['sort'] = this.px;
			}
			this.api.a_getWork(pr).then((da)=>{
				if(da=='error' || da=='104'){
					return
				}
				
				this.total = da.total;
				this.workList = da.data;
				if(!this.isnav){
					this.arr.push({n:'全部作品',p:2})
					this.isnav =1;
				}
				
				
			}).catch(()=>{
				
			})
		},
		getData(){
		
			this.api.pr_detail({
				id:this.ids
			}).then((da)=>{
				if(da=='error' || da=='104'){this.$router.push({path: '/404'});return}			
				this.shar({
					titlec:'项目分享',
					url:window.location.href,
					title:da.name+'-狮圈儿创作者平台',
					pics:da.banner,
					desc:'惊现大神快来膜拜',
					summary:da.name+'-狮圈儿创作者平台',				
				});
				this.deta = da;
				this.xmTypeOn = da.status-1;
				if(da.is_sign_up==1){
					this.xmType[0].btns = [{n:'取消报名',tcFn:'qxBm'}];	
				}else{
					this.xmType[0].btns = [{n:'立即报名',tcFn:'bm'}];	
				}
				
				this.da = this.xmType[this.xmTypeOn];	
				if(da.is_evaluated==1){
					this.xmType[4].btns[0].n = '已评价';
					this.xmType[4].btns[0].tcFn = 'ypj';
				}
				
				if(da.left_time &&  da.status==1){
					this.da.djs = da.left_time;
					this.djsfn(this.da.djs);
				}
				if(da.is_rejected==1){
					this.xmType[2].btns[0].n="重新交稿";
					this.xmType[2].btns[1] = {n:'交稿记录',tcFn:'Log'};
				}
				
			
			}).catch(()=>{
				
			});
			
		},	
		djsfn(da){
			if(da.d==0 && da.h==0 && da.m==0 && da.s==0){
				this.djsshow.s = '00';
				this.xmTypeOn++;
				this.djsshow = '';
				this.da = this.xmType[this.xmTypeOn];	
				// this.$parent.timeF(this.djsshow);
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
				// this.$parent.timeF(this.djsshow);
				return
			}
			if(da.m>0){
				da.m--;
				da.s = 59;
				// this.$parent.timeF(this.djsshow);
				return
			}
			if(da.h>0){
				da.h--;
				da.m= 59;
				da.s = 59;
				// this.$parent.timeF(this.djsshow);
				return
			}
			if(da.d>0){
				da.d--;
				da.h = 23;
				da.m= 59;
				da.s = 59;
				// this.$parent.timeF(this.djsshow);
				return
			}
			
			
			
		},
		btime(t){
			return t>9?t:'0'+t
		},
	}
}	
</script>

<style>

.ac_v1-3-2x{
    position: absolute;
    top: 74px;
    left: 10px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.ac_v2{
	position: absolute;
	top: 0;
	left: 50%;	
	padding-top: 20%;
	transform: translateX(-50%);
	white-space: nowrap;
}
.ac_v2-1{
	margin-bottom: 130px;
}
.ac_v2-1>span{
	display: inline-block;
	min-width: 192px;
	height: 142px;
	border-radius: 8px;
	background: #d3e0e5;
	box-sizing: border-box;
	border: 2px solid #753d28;

	vertical-align: top;
}
.ac_v2-1>span>div{
	padding: 0 20px;
	display: inline-block;
	box-sizing: border-box;
	background: #ffffff;
	border: 2px solid #753d28;
	margin: -2px;
	border-radius: 8px;
	min-width: 192px;
	height: 130px;
}
.ac_v2-1-1{
	color: #733b25;
	margin: 24px 0 10px;
	font-size: 16px;
	line-height: 30px;
}
.ac_v2-1-2{
	font-family: PingFang SC medium;
	font-size: 24px;
	line-height: 44px;
	color: #733b25;
}
.av_vbt>span{
	cursor: pointer;
	display: inline-block;
	color: #733b25;
	margin: 0 12px;
	line-height: 100px;
	font-size: 28px;
	font-weight: bold;
	text-align: center;
	width: 282px;
	height: 108px;
}
.av_vbt>span:hover{
	opacity: .97;
}
.av_vbt>span.op{
	background: url('https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/ac_v2/bt2.png') 0 0/100% no-repeat;
}
.av_vbt>span.op1{
	background: url('https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/ac_v2/bt1.png') 0 0/100% no-repeat;
}
.fng_01{
	position: relative;
	display: inline-block;
	vertical-align: top;
	width: 31px;
}
.fng_01>img{
	position: absolute;

	left: -2px;
	display: block;
	width: 35px;
}
.fng_01>img:nth-child(1){
	top: 23px;
}
.fng_01>img:nth-child(2){
	top: 73px;
}
.sto_01{
	position: absolute;
	top: 85px;
	right: 310px;
	z-index: 9;

}

.sto_02{
	display: none;
    position: absolute;
    top: 32px;
    right: 0;
    z-index: 99;
    background: #FFFFFF;
    -webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    border-radius: 5px;
    width: 95px;
    padding: 10px 0;
}
.sto_01:hover .sto_02{
	display: block;
}
.sto_02>div{
	cursor: pointer;
	line-height: 30px;
    font-size: 14px;
    color: #333333;
}
.sto_02>div:hover {
    background: #E6E6E6;
}
.ac_v1-3-3x>img{
	display: none;
	position: absolute;
	right: 53px;
	top: -46px;
}
.ac_v1-3-3x:hover>img{
	display: block;
}

.botn_av2{
    position: absolute;
    left: 20%;
    bottom: 0;
    width: 62%;
    padding-bottom: 23%;
}
.botn_av2>span{
	display: inline-block;
    vertical-align: top;
    width: 30%;
    margin-right: 1%;
    padding-bottom: 3%;
	cursor: pointer;
    margin-bottom: 1%;
}
.botn_av3{
    position: absolute;
    left: 20%;
    bottom: 0;
    width: 62%;
    padding-bottom: 15%;
}
.botn_av3>span{
	display: inline-block;
    vertical-align: top;
    width: 30%;
    margin-right: 1%;
    padding-bottom: 3%;
    cursor: pointer;
    margin-bottom: 1%;
}
</style>
