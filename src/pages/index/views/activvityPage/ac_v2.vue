<template>
	<div>
		<div class="ac_v1-1">
			<img class="ac_v1-2" src="/imge/ac_v2/ban.png"/>
			
			<div class="ac_v2">
				<div class="ac_v2-1">
					<span>
						<div>
							<div class="ac_v2-1-1">当前状态</div>
							<div class="ac_v2-1-2">{{xmType[xmTypeOn].t}}</div>
						</div>
						
					</span>
					<i class="fng_01">
						<img src="/imge/ac_v2/bt0.png">
						<img src="/imge/ac_v2/bt0.png">
					</i>
					<span>
						<div>
							<div class="ac_v2-1-1">{{deta.delay_time?'项目已延期交稿':xmType[xmTypeOn].n}}</div>
							<div class="ac_v2-1-2">
								<span v-if="djsshow.d>0">
									{{djsshow.d}}天 {{djsshow.h+':'+djsshow.m+':'+djsshow.s}}
								</span>
								<span v-if="deta.delay_time">
									{{deta.delay_time.d}}天 {{deta.delay_time.h}}小时
								</span>
							</div>
						</div>
					</span>
					<i class="fng_01">
						<img src="/imge/ac_v2/bt0.png">
						<img src="/imge/ac_v2/bt0.png">
					</i>
					<span>
						<div>
							<div class="ac_v2-1-1">报名人数</div>
							<div class="ac_v2-1-2">{{deta.sign_up_num}}</div>
						</div>
					</span>
					<i class="fng_01">
						<img src="/imge/ac_v2/bt0.png">
						<img src="/imge/ac_v2/bt0.png">
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
					<img src="/imge/ac_v2/01.png">
				</div>
				
			</div>
			
			<div class="ac_v1-3">
				<img src="/imge/ac_v2/fx.png"/>
				
				<div @click="shaFn('fxUrl2')" class="ac_v1-3-2x"></div>
				<div @click="shaFn('fxUrl1')" class="ac_v1-3-3"></div>
			</div>
			<component v-bind:is="tanDatazj"  :datad="tanData"></component>
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

export default{
	components:{pr_rz,bmXm,qxBm,pushGj,qxGj,Log,Stop,question,presentation},
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
			options:[{n:'终止项目',cs:'Stop'},{n:'交稿记录',cs:'Log'}],
		}
	},
	mounted: function(){
		this.ckl();
	}, 
	methods:{
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
		clFn(fn){
			
			this[fn]();
		},
		close(){
			this.tanDatazj = '';
			this.tanData = {};
		},
		setBm(){
			
		},
		ckl(){
			if(!this.$route.query.id){
				this.$router.push({path:'/activvity'})	
				return
			}
			
			this.ids = this.$route.query.id
			this.getData();
			
		},
		dowloadmb(obj){
			window.downloadFiles(obj.template_file_url,obj.template_file_name);
		},
		bm(){
			this.api.pr_check({}).then((da)=>{
				if(da=='error'){return}
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
		shaFn(n){
			window.open(this[n]);
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
				if(da=='error'){
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
				if(da=='error'){this.$router.push({path: '/404'});return}			
				this.xmTypeOn = da.status-1;
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
					this.xmType[2].btns[0].n="重新提交";
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
				this.$parent.timeF(this.djsshow);
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
				this.$parent.timeF(this.djsshow);
				return
			}
			if(da.m>0){
				da.m--;
				da.s = 59;
				this.$parent.timeF(this.djsshow);
				return
			}
			if(da.h>0){
				da.h--;
				da.m= 59;
				da.s = 59;
				this.$parent.timeF(this.djsshow);
				return
			}
			if(da.d>0){
				da.d--;
				da.h = 23;
				da.m= 59;
				da.s = 59;
				this.$parent.timeF(this.djsshow);
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
	border: 1px solid #753d28;

	vertical-align: top;
}
.ac_v2-1>span>div{
	padding: 0 20px;
	display: inline-block;
	box-sizing: border-box;
	background: #ffffff;
	border-bottom: 1px solid #753d28;
	margin-left: -1px;
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
	background: url(/imge/ac_v2/bt2.png) 0 0/100% no-repeat;
}
.av_vbt>span.op1{
	background: url(/imge/ac_v2/bt1.png) 0 0/100% no-repeat;
}
.fng_01{
	position: relative;
	display: inline-block;
	vertical-align: top;
	width: 16px;
}
.fng_01>img{
	position: absolute;

	left: -10px;
	display: block;
	width: 35px;
}
.fng_01>img:nth-child(1){
	top: 23px;
}
.fng_01>img:nth-child(2){
	top: 73px;
}
</style>
