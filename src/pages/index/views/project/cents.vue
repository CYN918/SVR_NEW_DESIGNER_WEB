<template>
	<!-- <div class="cengg">
		<div class="cens_01">
			<div class="cens_02">
				<div class="cens_02_1 oijdiv">				
					<img class="cens_02_1_img" :src="deta.banner" alt="">
					<div v-if="deta.extra_reward && deta.extra_reward!='0.00'" class="sjxd" @mouseout="mod()" @mouseover="modx($event,0)">
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
								<div class="icon_ff_1"><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/04.svg"/>预计收益</div>
								<div class="cens_x4_1 f_a">{{deta.expected_profit}}<img @mouseout="mod()" @mouseover="modx($event,1)" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/09.svg" ></div>
							</div>
							<div class="cens_x5">
								<div class="icon_ff_1"><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/08.svg"/>制作周期</div>
								<div  class="cens_x4_1 cens_x4_1_x1" v-html="backZq(deta.production_cycle_d,deta.production_cycle_h)">
									
								</div>
								
							</div>
							
						</div>
						<div v-if="deta.status==1 || deta.status==2">
							<div class="icon_ff_1"><img class="icon_ff_1_x1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/05.svg"><span class="f_a">{{deta.sign_up_num}}</span>人已报名</div>
						</div>
					</div>
			
					<div v-if="deta.template_file_url" @click="dowloadmb(deta)" class="pend pr_down_mb">
						<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/project/icon_download.svg"/>下载附件 ({{deta.template_file_size}})
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
		<component v-bind:is="tcZj"  :datad="tcData" :expected_profit="deta.expected_profit" :settlement="deta.settlement"></component>
		
		
		<topGd v-if="topTyped==1 && deta.status==1" :obj="pzTop" ref="topGd"></topGd>
	</div> -->
	<div class="cengg">
		<div class="cens_01">
			<div class="cents_box">
				<img class="cens_02_1_img" v-if="deta.detail_banner" :src="deta.detail_banner" alt="">
				<img class="cens_02_1_img" v-else :src="deta.banner" alt="">
				<div class="sto_01" v-if="deta.status>=3" style="right: 70px;">
					<img :src="imgPath+'ac_v2/xl.png'"/>
					<div class="sto_02">
						<div v-if="deta.status==3" @click="showTc('Stop')">终止项目</div>
						<div v-if="islog" @click="showTc('Log')">交稿记录</div>
						<div v-if="deta.contract_file && deta.contract_file.length>0" class="worksBox_2_3">
							下载合同 
							<span class="js_0013"></span>
							<div class="worksBox_2_4">
								<div v-for="el in deta.contract_file" @click="dowun(el)">{{el.file_name}}</div>						
							</div>
						</div>
						
					</div>
				</div>
				<div class="cents_box_status">
					<div class="cenDjs_5" v-if="deta.status == '1'">
						<p><img :src="imgSig+'prcent/xm_icon_state.svg'"/><i>当前状态</i></p>
						<p>招募期</p>
					</div>
					<div class="cenDjs_5" v-if="deta.status == '0'">
						<p><img :src="imgSig+'prcent/xm_icon_state.svg'"/><i>当前状态</i></p>
						<p>待发布</p>
					</div>
					<div class="cenDjs_5" v-if="deta.status == '2'">
						<p><img :src="imgSig+'prcent/xm_icon_state.svg'"/><i>当前状态</i></p>
						<p>选标期</p>
					</div>
					<div class="cenDjs_5" v-if="deta.status == '3' && deta.is_rejected != '1' && new Date(Date.parse(deta.delivery_deadline)) >= new Date()">
						<p><img :src="imgSig+'prcent/xm_icon_state.svg'"/><i>当前状态</i></p>
						<p>制作期</p>
					</div>
					<div class="cenDjs_5" v-if="deta.status == '3' && deta.is_rejected != '1' && new Date(Date.parse(deta.delivery_deadline)) < new Date()">
						<p><img :src="imgSig+'prcent/xm_icon_state.svg'"/><i>当前状态</i></p>
						<p>已延期</p>
					</div>
					<div class="cenDjs_5" v-if="deta.status == '3' && deta.is_rejected == '1'">
						<p><img :src="imgSig+'prcent/xm_icon_state.svg'"/><i>当前状态</i></p>
						<p style="color:rgba(255,59,48,1);">未通过</p>
					</div>
					<div class="cenDjs_5" v-if="deta.status == '4'">
						<p><img :src="imgSig+'prcent/xm_icon_state.svg'"/><i>当前状态</i></p>
						<p>待审核</p>
					</div>
					<div class="cenDjs_5" v-if="deta.status == '5'">
						<p><img :src="imgSig+'prcent/xm_icon_state.svg'"/><i>当前状态</i></p>
						<p>已验收</p>
					</div>
					<div class="cenDjs_5" v-if="deta.status == '-1'">
						<p><img :src="imgSig+'prcent/xm_icon_state.svg'"/><i>当前状态</i></p>
						<p>已终止</p>
					</div>
					<div class="jz_time" v-if="djsshow.h || deta.status==1">
						<p><img :src="imgSig+'prcent/xm_icon_time.svg'"/><i>截止报名时间</i></p>
						<detailGd :obj="pzTop" ref="topGd1"></detailGd>
					</div>
					<div class="jz_time" v-if="deta.status==4 || deta.status==3">
						<p v-if="isShow"><img :src="imgSig+'prcent/xm_icon_time.svg'"/><i>截止交稿时间</i></p>
						<p v-else><img :src="imgSig+'prcent/xm_icon_time.svg'"/><i>项目已延期交稿</i></p>
						<p v-html="timeTips"></p>
					</div>
					<div v-if="deta.status==1 || deta.status==2" class="bm_dp">
						<p><img :src="imgSig+'prcent/xm_icon_num.svg'"/><i>报名人数</i></p>
						<p>{{deta.sign_up_num}}</p>
					</div>
					<div class="yj_sy2" v-if="deta.status==5">
						<p v-if="deta.deal_type == '1'"><img :src="imgSig+'prcent/xm_icon_sy.svg'"/><i>成交价格</i></p>
						<p v-if="deta.deal_type == '2'"><img :src="imgSig+'prcent/xm_icon_sy.svg'"/><i>累计分成收益</i></p>
						<p v-if="deta.deal_type == '3'"><img :src="imgSig+'prcent/xm_icon_sy.svg'"/><i>预付金</i></p>
						<p v-if="deta.deal_type == '1'">￥{{deta.income}}</p>
						<p v-if="deta.deal_type == '2'">￥{{deta.income}}</p>
						<p v-if="deta.deal_type == '3'">￥{{deta.advance_payment}}</p>
					</div>
					<div class="jz_time" v-if="deta.status==5 && deta.deal_type == '3'">
						<p><img :src="imgSig+'prcent/xm_icon_sy.svg'"/><i>累计分成收益</i></p>
						<p>￥{{deta.income}}</p>
					</div>
					<div class="yj_sy" v-if="deta.status!=5">
						<p><img :src="imgSig+'prcent/xm_icon_sy.svg'"/><i>预计收益</i></p>
						<p v-if="deta.settlement == '0'">{{deta.expected_profit}}<i style="font-style: normal;color:#282828;font-size:24px;margin-left:5px;margin-right:5px;">或</i>永久分成</p>
						<p v-if="deta.settlement == '1'">{{deta.expected_profit}}</p>
						<p v-if="deta.settlement == '2'">永久分成</p>
					</div>
					
				</div>
				<div class="liucheng" v-if="deta.status == '3' && deta.is_rejected != '1'  && new Date(Date.parse(deta.delivery_deadline)) >= new Date()">
					<div class="element1" style="background: rgba(77,198,0,1);"></div>
					<div class="t-1">制作期</div>
					<div class="t-2"></div>
					<div class="element2"></div>
					<div class="t-3">待审核</div>
					<div class="t-4"></div>
					<div class="element3"></div>
					<div class="t-5">已验收</div>
					<div class="t-6">请在规定时间交付稿件</div>

				</div>
				<div class="liucheng" v-if="deta.status == '3' && deta.is_rejected != '1' && new Date(Date.parse(deta.delivery_deadline)) < new Date()"  :style="'background-image: url(http://zk-img.oss-cn-qingdao.aliyuncs.com/h5/cyn/prcent/bg_red.svg)'">
					<div class="element1" style="background: rgba(77,198,0,1);"></div>
					<div class="t-1">制作期</div>
					<div class="t-2"></div>
					<div class="element2"></div>
					<div class="t-3">待审核</div>
					<div class="t-4"></div>
					<div class="element3"></div>
					<div class="t-5">已验收</div>
					<div class="t-6">你已延期交付稿件，请尽快完成并提交</div>

				</div>
				<div class="liucheng" v-if="deta.status == '3' && deta.is_rejected == '1'" :style="'background-image: url(http://zk-img.oss-cn-qingdao.aliyuncs.com/h5/cyn/prcent/bg_red.svg)'">
					<div class="element1" style="background: rgba(77,198,0,1);"></div>
					<div class="t-1">制作期</div>
					<div class="t-2"></div>
					<div class="element2"></div>
					<div class="t-3">待审核</div>
					<div class="t-4"></div>
					<div class="element3"></div>
					<div class="t-5">已验收</div>
					<div class="t-6">你的稿件未通过，请重新提交</div>

				</div>
				<div class="liucheng" v-if="deta.status == '4'" :style="'background-image: url(http://zk-img.oss-cn-qingdao.aliyuncs.com/h5/cyn/prcent/bg_yellow.svg)'">
					<div class="element1" style="background:rgba(77,198,0,1);"></div>
					<div class="t-1">制作期</div>
					<div class="t-2"></div>
					<div class="element2" style="background:rgba(77,198,0,1);"></div>
					<div class="t-3">待审核</div>
					<div class="t-4"></div>
					<div class="element3"></div>
					<div class="t-5">已验收</div>
					<div class="t-6">稿件已提交，请等待验收审核</div>

				</div>
				<div class="liucheng" v-if="deta.status == '5'" :style="'background-image: url(http://zk-img.oss-cn-qingdao.aliyuncs.com/h5/cyn/prcent/bg_green.svg)'">
					<div class="element1" style="background: rgba(77,198,0,1);"></div>
					<div class="t-1">制作期</div>
					<div class="t-2"></div>
					<div class="element2" style="background: rgba(77,198,0,1);"></div>
					<div class="t-3">待审核</div>
					<div class="t-4"></div>
					<div class="element3" style="background: rgba(77,198,0,1);"></div>
					<div class="t-5">已验收</div>
					<div class="t-6">项目已验收，感谢与你的本次合作</div>

				</div>
			</div>
			<div class="cens_02_1_cent">
				<div class="cens_x0">
					<div class="cens_x1">{{deta.name}}</div>
					
					
				</div>
				<div class="cens_x0_bottom">
					<div class="cens_x5">
						<div class="cens_x2">项目类型：{{deta.classify_name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;制作周期：<span v-html="backZq(deta.production_cycle_d,deta.production_cycle_h)"></span></div>
						<div class="cens_x3"><span v-for="(el,index) in deta.fields" :key="index">{{el}}</span></div>
						
					</div>
					<div class="event_op">
						<div v-if="deta.template_file_url" @click="dowloadmb(deta)" class="pend pr_down_mb">
							<!-- <img :src="imgSig+'prcent/icon_download.svg'"/>下载附件 ({{deta.template_file_size}}) -->
							<img :src="imgSig+'prcent/icon_download.svg'"/>下载附件
						</div>
						<xmDp v-if="deta.status" :obj="deta" ref="xmDp"></xmDp>

					</div>
					
					
					
				</div>
				
				
			</div>
			<div v-for="(el,index) in deta.desc" :key="index" class="cens_02_2 oijdiv">
				<div class="cens_02_2hd">{{el.module_title}}</div>
				<div class="cens_02_2ce" v-html="el.module_content"></div>
			</div>
			<topGd v-if="topTyped==1 && deta.status==1" :obj="pzTop" ref="topGd"></topGd>
			<tipd  :tipCent="csff" :style="sfas" ref="csdf"></tipd>
		    <component v-bind:is="tcZj"  :datad="tcData" :expected_profit="deta.expected_profit" :settlement="deta.settlement"></component>
			<prnavright v-bind:deta="deta"></prnavright>

		</div>
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
import detailGd from './detailGd';
import prnavright from './pr_nav_right'

export default {
	components:{liucen,tipd,xmDp,pr_rz,qxBm,bmXm,shareD,pushGj,qxGj,Log,Stop,question,presentation,topGd,prnavright,detailGd},
	data(){
		return{
			tcZj:'',
			tcData:'',
			shareData:{},
			djsshow:{},
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
			pzTop:{},
			djstimd:{},
			timeTips:'',
			isShow:true,
			islog:'',
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
		dowun(u){
			fetch(u.file_url).then(res => res.blob()).then(blob => {
				const a = document.createElement('a');
				document.body.appendChild(a)
				a.style.display = 'none'
				// 使用获取到的blob对象创建的url
				const url = window.URL.createObjectURL(blob);
				a.href = url;
				// 指定下载的文件名
				a.download = u.file_name;
				a.click();
				document.body.removeChild(a)
				// 移除blob对象的url
				window.URL.revokeObjectURL(url);
			});
		},
		autoS(){
			let t = document.documentElement.scrollTop||document.body.scrollTop;
			if(t==0){
				document.documentElement.scrollTop =1;
				document.body.scrollTop =1;
			}
			if(this.topTyped==''){
				if(t>411){
					this.topTyped=1;
				}
				
			}
			if(t<=411){
				this.topTyped='';
			}
		},
		dowloadmb(obj){
			window.downloadFiles(obj.template_file_url,obj.template_file_name);
		},
		backZq(a,b){
			
			let str = '';
			if(a){
				str+='<span class="f_a">'+a+'</span>天';
			}
			if(b){
				str+='<span class="f_a">'+b+'</span>小时';
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

			if(b){
				this.tcData = b;
				return
			}
			this.tcData = this.deta;
			
		},
		setBm(on){
			this.deta.is_sign_up=on;
			this.$refs.xmDp.setBm(this.deta.is_sign_up);
		},
		setStaus(on){
			this.deta.status= on;
			this.$refs.xmDp.setStuts(on);
		},
		timeF(time){
		
			this.djstimd = time;
			if(this.$refs.topGd){
				this.$refs.topGd.setTim(time);
			}
			if(this.$refs.topGd1){
				this.$refs.topGd1.setTim(time);
			}
			
		},
		getData(){		
			let pr = {
				id : this.$route.query.id
			};
			this.api.pr_detail(pr).then((da)=>{
				if(da=='error'){this.$router.push({path: '/404'});return}
				
				if(da.special_url){
					this.$router.push({path: '/Ac_v2',query:{id:da.id}});
					return
				}
				document.removeEventListener('scroll',this.autoS);	
				if(da.status==1 && da.is_sign_up==0){
					document.addEventListener('scroll',this.autoS,false);	
				}
				this.pzTop = {
					name:da.name,
					classify_name:da.classify_name,
					fields:da.fields,		
					id:da.id,
				};
				this.deta = da;
				
				setTimeout(()=>{
					if(this.$refs.xmDp){
						this.$refs.xmDp.init();
					}
				},200)
			
				document.title=this.deta.name+'-狮圈儿（Zoocreators）';
				if(this.deta.delivery_deadline && !(this.deta.delivery_deadline instanceof Array)){
					var d2 = new Date();
					var d1 = new Date(Date.parse(this.deta.delivery_deadline));
						
					if(d1 > d2){
						this.isShow = true;
						let otim = this.bckdtimed(this.deta.delivery_deadline);
			
						this.timeTips = otim[0]+ '&nbsp;&nbsp;' + otim[1];
						
						
					}else{
						this.isShow = false;
						var d3 = d2 - d1;
						var days = Math.floor(d3/(24*3600*1000));
						var leave1 = d3%(24*3600*1000);
						var hours = Math.floor(leave1/(3600*1000));
						
						this.timeTips = '<span style="color:rgba(255,59,48,1);">'+days+'天'+hours+'小时</span>';
					}
					
					
				
				}
				
			}).catch(()=>{
				
			});
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
		djsfn(da){	
			
			if(da.d==0 && da.h==0 && da.m==0 && da.s==0){
				this.djsshow.s = '00';
				this.xmTypeOn++;
				this.djsshow = '';
				this.da = this.xmType[this.xmTypeOn];	
				this.timeF(this.djsshow);
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
				this.timeF(this.djsshow);
				return
			}
			if(da.m>0){
				da.m--;
				da.s = 59;
				this.timeF(this.djsshow);
				return
			}
			if(da.h>0){
				da.h--;
				da.m= 59;
				da.s = 59;
				this.timeF(this.djsshow);
				return
			}
			if(da.d>0){
				da.d--;
				da.h = 23;
				da.m= 59;
				da.s = 59;
				this.timeF(this.djsshow);
				return
			}
			
			
			
		},
		btime(t){
			return t>9?t:'0'+t
		},
		getPath(){
			this.getData();
		}
		
	},
	watch:{
		'$route':'getPath'
	},
}
</script>

<style scoped="scoped">
/* .cengg{
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
	text-align: initial;
}
.cens_02 li {
    list-style: unset;
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
	width:400px;
	height:232px;

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
	height: 18px;
	font-size:14px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:18px;
	margin: 5px auto;
}
.icon_ff_1>img{
	display: inline-block;
	vertical-align: middle;
	margin-right: 10px;
	margin-top: -3px;
    width: 18px;
    height: 18px;
}
.icon_ff_1>span{
	font-size:14px;

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

	line-height:20px;

}
.cens_x4_1>span{

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
	background:rgba(51, 179, 255, 0.1);
	border-radius:0px 0px 2px 4px;
	font-size:12px;
	text-align: center;
	font-weight:400;
	color:#33B3FF;
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
	background: url(https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/06.svg) no-repeat;
}
.centShar_2{
	background: url(https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/07.svg) no-repeat;
}
.movfx_01,.movfx_02{
	cursor: pointer;
}
.movfx_01:hover>.centShar_1{
	background: url(https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/fx_02.svg) no-repeat;
}
.movfx_02:hover>.centShar_2{
	background: url(https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/kf_02.svg) no-repeat;
}
.icon_ff_1>.icon_ff_1_x1{
	margin-top: -5px;
}
.pr_down_mb{
	position: absolute;
	bottom: 28px;
	left: 705px;
	height:20px;
	font-size:14px;	
	color:rgba(51,179,255,1);
	line-height:20px;
}
.pr_down_mb>img{
	display: inline-block;
	vertical-align: top;
	margin-top: 3px;
	margin-right: 9px;
	width: 20px;
} */
.cengg{
	background:rgba(244,246,249,1);
}
.cens_01{
	padding: 20px 0 60px;
	margin: 0 auto;
	width: 1170px;
}
.cents_box{
	width: 1170px;
	height: 480px;
	position: relative;
}
.cens_02_1_img{
	display: inline-block;
	vertical-align: top;
	margin-right: 20px;
	width:100%;
	height:100%;

}
.cens_02_2{
	width: 1170px;
	background: #fff;
}
.cens_02_1_cent{
	width: 1170px;
	height: 139px;
	background: #fff;
	border-bottom: 1px solid rgba(244,246,249,1);
}
.cens_02_2hd{
	font-size:24px;
	font-weight:400;
	color:rgba(40,40,40,1);
	line-height:33px;
	text-align: center;
	line-height: 93px;
	height: 93px;
	width: 860px;
	margin: 0 auto;
}
.cens_x0{
	padding-top: 15px;
}
.cens_x1{
	width: 860px;
	height: 26px;
	margin: 0 auto;
	line-height: 26px;
	font-size:18px;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:bold;
	color:rgba(40,40,40,1);
	text-align: left;
	padding-left: 10px;
}
.cens_x0_bottom{
	padding-top: 10px;
	width: 860px;
	height: 98px;
	margin: 0 auto;
}
.cens_x2{
	text-align: left;
	padding-left: 6px;
	color: #BBBBBB;
	font-size: 12px;
}
.cens_x2 > span >>> .f_a {
    color: #BBBBBB;
}
.cens_x3{
	text-align: left;
	height: 40px;
	padding-top: 20px;
}
.cens_x3 > span{
	/* width: 40px; */
	height: 22px;
	text-align: center;
	line-height: 22px;
	display: block;
	float: left;
	background:rgba(244,246,249,1);
    border-radius:2px;
	font-size:12px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:bold;
	color:rgba(153,153,153,1);
	margin-left: 6px;
	padding-left: 5px;
    padding-right: 5px;
}
.cens_02_2ce{
	width: 860px;
	margin: 0 auto;
}
.cens_x5{
	/* width: 55%; */
	float: left;
}
.event_op{
	/* width: 45%; */
	float: right;
	padding-right: 10px;
}
.event_op > div{
	height: 38px;
	line-height: 38px;
	float: right;
	cursor: pointer;
}
.pr_down_mb{
	width: 120px;
	text-align: center;
	background:rgba(255,255,255,1);
	color:rgba(102,102,102,1);
	font-size: 14px;
	border-radius:5px;
	border:1px solid rgba(187,187,187,1);
}
.pr_down_mb > img{
	margin-top: 11px;
}
.bm_btn{
	width: 100px;
	text-align: center;
	background: #33B3FF;
	color: #fff;
	font-size: 14px;
	border-radius:5px;
	margin-left: 20px;
}
.cents_box_status{
	position: absolute;
	height: 98px;
	width: 875px;
	bottom: 48px;
    left: 148px;
	text-align: center;
}
.cents_box_status > div{
	height: 98px;
	vertical-align:top;
	display: inline-block;
}
.cents_box_status > div > p > i{
	font-style: normal;
	height:20px;
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:20px;
}
.cents_box_status > div > p:nth-child(1){
	margin-top: 16px;
}
.cents_box_status > div > p:nth-child(2){
	margin-top: 16px;
	font-size: 24px;
}
.cenDjs_5 > p:nth-child(2){
	font-size:24px;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:bold;
	color:rgba(40,40,40,1);
}
.jz_time .f_a{
	font-size:28px;
	font-family:PingFangSC-Semibold,PingFang SC;
	font-weight:600;
	color:rgba(255,146,0,1);
	margin-top: 6px;
    display: inline-block;
}
.cenDjs_2_dy_01{
	font-size:22px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(187,187,187,1);
	margin: 4px 4px 0px 4px;
}
.cents_box_status > div > p:nth-child(1) > img{
	margin: 3px 3px 0px 0px;
}
.cenDjs_5{
	width: 114px;
	background:rgba(255,255,255,1);
	box-shadow:0px 16px 32px 0px rgba(0,0,0,0.2);
	border-radius:10px;
}
.jz_time{
	width:222px;
	background:rgba(255,255,255,1);
	box-shadow:0px 16px 32px 0px rgba(0,0,0,0.2);
	border-radius:10px;
	margin-left: 20px;
}
.bm_dp{
	width:116px;
	background:rgba(255,255,255,1);
	box-shadow:0px 16px 32px 0px rgba(0,0,0,0.2);
	border-radius:10px;
	margin-left: 20px;
}
.yj_sy{
	width:360px;
	background:rgba(255,255,255,1);
	box-shadow:0px 16px 32px 0px rgba(0,0,0,0.2);
	border-radius:10px;
	margin-left: 20px;
}
.yj_sy2{
	padding: 0 20px;
	width:auto;
	background:rgba(255,255,255,1);
	box-shadow:0px 16px 32px 0px rgba(0,0,0,0.2);
	border-radius:10px;
	margin-left: 20px;	
}
.bm_dp > p:nth-child(2){
	font-size:24px;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	color:rgba(40,40,40,1);
}
.yj_sy2> p:nth-child(2){
	font-size:24px;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	color:rgba(255,146,0,1);
	height: 35px;
	overflow: hidden;
}
.yj_sy > p:nth-child(2){
	font-size:24px;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	color:rgba(255,146,0,1);
	width: 360px;
	height: 35px;
	overflow: hidden;
}
.liucheng{
	width: 1170px;
	height: 40px;
	line-height: 40px;
	position: absolute;
	bottom: 0;
	background-image: url(http://zk-img.oss-cn-qingdao.aliyuncs.com/h5/cyn/prcent/bg_bug.svg);
	text-align: center;
	/* opacity:0.7; */
}
.liucheng > div{
	vertical-align: top;
	display: inline-block;
}
.liucheng .element1,.liucheng .element2,.liucheng .element3{
	width: 10px;
	height: 10px;
	border-radius: 50%;
	border: 2px solid #ffffff;
	margin: 13px 5px 13px 0px;
}
.liucheng .t-1,.liucheng .t-3,.liucheng .t-5{
	color: rgba(255,255,255,1);
	font-size: 14px;
	font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
}
.liucheng .t-6{
	color: rgba(255,255,255,1);
	font-size: 14px;
	font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
	margin-left: 62px;
}
.liucheng .t-2,.liucheng .t-4{
	width: 115px;
	height: 1px;
	background: rgba(255,255,255,1);
	margin: 19px 0px 18px 12px;
}
.tg_iocn_2x{
	background-repeat: no-repeat;
	background-image: url(http://zk-img.oss-cn-qingdao.aliyuncs.com/h5/cyn/prcent/icon_more.svg);
}
.tg_iocn_2{
	width: 55px;
    height: 33px !important;
}
.worksBox_2{
	cursor: pointer;
	position: absolute;
    right: -95px;
    top: -300px;
	font-size: 14px;
	color: #666666;
	text-align: center;
	width: 95px;
}

</style>