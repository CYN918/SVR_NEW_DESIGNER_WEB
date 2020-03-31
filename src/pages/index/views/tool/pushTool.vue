<template>
	<div>
		<div class="ntob">
			<div class="ntob_head">
				<div class="noto_back">
					<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/tools/icon_back.svg">
					返回
				</div>
				<div class="noto_title">
					<input v-model="form.title" type="text" placeholder="请输入来电秀名称">
					<img src="/imge\new\tools\n/icon_bj.svg"/>
				</div>				
				<div class="noto_btns">
					<span >保存</span><span @click="zzyz()"  class="noto_bys">制作完成</span>
				</div>
			</div>
			<div class="ntob_cent">
				<div class="ntob_cent_l">					
					<div class="videoBox">
						<canvas class="videoBox1" ref="cavs"></canvas>
						<video @timeupdate="timeupdatevideo" muted @ended="endeds()" @loadeddata="csy"  id="boxf" class="ntob_cent_l_1" :src="video" ref="vids"></video>					
					
						<div v-if="isld && vdcc2==0" class="show_00x_1">
							<div class="show_00x_1_1">138-888-888</div>
							<div class="show_00x_1_2">正在拨号…</div>
							<div class="show_00x_1_3">
								<span><img class="xx_01x" src="/imge/tools/d_04.png">静音</span>
								<span><img class="xx_02x" src="/imge/tools/d_05.png">拨号键盘</span>
								<span><img class="xx_03x" src="/imge/tools/d_06.png">免提</span>
								<span><img class="xx_04x" src="/imge/tools/d_07.png">添加通话</span>
								<span><img class="xx_05x" src="/imge/tools/d_08.png">保持</span>
								<span><img class="xx_06x" src="/imge/tools/d_09.png">录音</span>
							</div>
							<img class="show_00x_1_4" src="/imge/tools/d_02.png">
						</div>
						<div v-if="isld && vdcc2==1" class="show_00x_2">
							<img class="show_00x_2_1" src="/imge/tools/d_03.png"/>
							<div class="show_00x_2_2">来电秀</div>
							<div class="show_00x_2_3">156-0202-0101</div>
							<img class="show_00x_2_4" src="/imge/tools/d_02.png"/>
							<img class="show_00x_2_5" src="/imge/tools/d_01.png"/>
						</div>
					</div>
					<audio 
					class="ntob_cent_l_1" 
					@ended="endAudio()"					
					ref="aido"></audio>
					<div class="ntob_cent_l_2">
						<div class="ntob_cent_l_2_1">
							预览比例<span class="bl_000" @click="showCc">
								{{cun[vdcc].n}}
								<div v-if="isCc" class="bl_001">
									<span @click="qhcc(index)" v-for="(el,index) in cun" :class="index==vdcc?'cek':''">{{el.n}}</span>									
								</div>
							</span>							
						</div>
						<div class="ntob_cent_l_2_2">
							<span @click="playsx" class="an_sx_01">
								<img src="/imge/tools/v_sx.svg"/>
							</span><span @click="playAll" class="an_bf_01">
								<img src="/imge/tools/v_play.svg"/>
							</span>
							<span>00:00:00:00</span> / <span class="tme_091">00:00:30:00</span>							
						</div>
						<div class="ntob_cent_l_2_3">
							<span @click="showCc2" class="bl_000" >
								{{cun2[vdcc2]}}
								<div v-if="isCc2" class="bl_001">
									<span @click="qhcc2(index)" v-for="(el,index) in cun2" :class="index==vdcc2?'cek':''">{{el}}</span>									
								</div>
							</span>	
							<el-switch
							  v-model="isld"
							  
							  active-value="1">
							</el-switch>	
						</div>
					</div>
				</div>
				<div class="ntob_cent_r">
					<div class="ntob_cent_r_1">
						<span @click="qhNav(index,el.zj)" v-for="(el,index) in navs" :class="navson==index?'ckin':''">
							<div class="con-right-iocn-img">
								　　<img class="icon con-right-iocn-img" :src="'/imge/tools/'+el.icon"/>
								</div>{{el.n}}</span>
					</div>
					<div class="ntob_cent_r_2">
						<component v-bind:is="navcoms.zj" v-model="navcoms" ref="vid"></component>						
					</div>
				</div>
			</div>
			<div class="ntob_footer">
				<div class="ntob_footer_1">
					<div class="ntob_footer_1_1"></div>
					<div class="ntob_footer_1_2">
						<div><img src="/imge/tools/t_sp.svg"/> 媒体</div>
						<div><img src="/imge/tools/t_yy.svg"/>音频</div>
						<div><img src="/imge/tools/t_zs.svg"/>装饰</div>
					</div>
				</div>
				<div class="ntob_footer_2" ref="gdbox">
					<div :style="bal()" class="tlo_box">
						<div class="ntob_footer_2_1">
							<div v-html="backd()" class="kdut"></div>
						</div>
						
						<div class="tlo_02">
							<div :style="backtop(el,index)" class="imgd" v-for="(el,index) in navcoms.media">
								<div :style="bgtf(el)" @click="checkDOm($event,el,index,'media')" class="setToll0">
									
								</div>
								
								<div  v-if="el.ischeck" class="setToll">
									<div @mousedown="jl3($event,el,index,navcoms.media)" class="setToll1"></div>
									<div @mousedown="jl2($event,el,index,navcoms.media)"  class="setToll2"></div>
									<div @mousedown="jl($event,el,index,navcoms.media)" class="setToll3"></div>
									<div class="setToll4">
										<i></i><i></i><i></i>
										<input @blur="csb" @focus="csa($event,{n:'media',o:index})" class="setToll4_1" type="text">
									</div>
								</div>							
								
							</div>
						</div>
						<div class="tlo_03">
							<div  :style="backtop(el,index)" class="imgd" v-for="(el,index) in navcoms.audio">
								<div @click="checkDOm($event,el,index,'audio')" class="setToll0"></div>
								<div  v-if="el.ischeck" class="setToll">
									<div @mousedown="jl3($event,el,index,navcoms.audio)" class="setToll1"></div>
									<div @mousedown="jl2($event,el,index,navcoms.audio)"  class="setToll2"></div>
									<div @mousedown="jl($event,el,index,navcoms.audio)" class="setToll3"></div>
									<div class="setToll4">
										<i></i><i></i><i></i>
										<input @blur="csb" @focus="csa($event,{n:'audio',o:index})" class="setToll4_1" type="text">
									</div>
								</div>			
							
							</div>
						</div>
						<div class="tlo_04"></div>
					</div>
					<div class="bf_o1">
						<div class="bf_o1_1"></div>
					</div>
					<div class="gund_01" ref="gund_01x">
						<div @mousedown="jlx($event)" :style="tdfn()" class="gund_02"></div>
					</div>
					<div class="fdsx_01">
						<span @click="jms()" class="fdsx_02">-</span>
						<span class="fdsx_03">
							<div @mousedown="jlx2($event)" :style="baclsf()" class="fdsx_06"></div>
						</span>
						<span @click="addms()" class="fdsx_02">+</span>
						
					</div>
					
				</div>
			</div>
			<div :style="csad" class="setToll4_2">
				<span @click="cats()">裁剪</span>
				<span>复制</span>
				<span @click="delt()">删除</span>
			</div>
			<component v-bind:is="tanc.zj" v-model="tanc" ref="tanbox"></component>
			<div v-if="istype" class="pr_tc_01">
				<div class="pr_tc_02">			
					<div class="pr_tc_04">
						{{istype.t}}<img @click="close" class="pr_tc_03 pend" src="/imge/project/cj_00.svg" alt="">
					</div>
					<div class="newds_012">
						{{istype.c1}}
						<div class="newds_013">{{istype.c2}}</div>
					</div>	
					
					<div class="qxBm_btns">
						<div @click="close" class="btns pend">取消</div>		
						<div @click="clickfn(istype.btnfn)" class="btns btns_js pend">{{istype.btnn}}</div>										
					</div>
				</div>
			</div>
			
		</div>
		
		
		
		
	</div>
	
</template>

<script>
import setMt from './setMt';
import mp3List from './setAdio';
import saves from './saves';
import cat from './cat';
import tips from './tips';
export default{
	components:{
		setMt,
		mp3List,
		saves,
		cat,
		tips
	},
	data(){
		return{
			istype:'',
			cun:[
				{n:'9:16',x:0},
				{n:'6:13',x:48}			
			],
			cun2:[
				'来电预览',
				'去电预览'		
			],
			sczz:'',
			isld:'',
			vdcc:0,
			vdcc2:0,
			isCc:'',
			tanc:{
				zj:'',
				title:'',
				data:{},
			},
			csad:'',
			video:'',
			form:{
				
			},
			navson:0,
			navs:[
				{n:'媒体',icon:'nav_sp_ac.svg',zj:'setMt'},
				{n:'音乐',icon:'nav_yy.svg',zj:'mp3List'}
			],
			navcoms:{
				zj:'setMt',
				title:'',
				media:[],
				audio:[],
				imgs:[],
				maxTime:0,
				bflist:[],
			},
			kd:[1],
			fd_lave:0,
			cans:'',
			isinit:0,
			po:'',
			sfjb:10,
			bof:0,
			bfon:0,
			islast:'',
			page:1,
			wdk:21,
			audiosOn:0,
			xzData:'',
			formData:{
				title:'',
				media:[],
			},
			tdStar:0,
			onck:-1,
			cjzb:{
				x:0,
				y:0,
				w:391,
				h:695,
			},
			ispaused:'',
			isCc2:'',
			checkDOmx:'',
			tdjl:0,
			fd:[
				{s:1,jg:.1},
				{s:2,jg:.2},
				{s:10,jg:1},
				{s:60,jg:60},
				{s:120,jg:120},
			],
			fdjb:10,
			tipszb:{
				x:0,
				y:0
			},
			bl:1,
			ht:'',
		}
	},
	mounted: function () {
		this.init();
	}, 
	watch:{
		fdjb(){
			this.bl = this.fdjb/10;
		}
	},
	methods:{	
		bgtf(el){
			if(!el){return}
			let url = el.type=='pic'?el.file_url:el.fps_pic;
			return "background:url("+url+") 0 0/auto 100% repeat-x;";
		},
		baclsf(){
			let max = 64;
			return "transform: translateX("+(this.fdjb/120)*max+"px);";			
		},
		showTip(){
			this.tanc = {
				zj:'tips'
			}
		},
		addms(){
			if(this.fdjb<120){
				this.fdjb++;
			}
		},
		jms(){
			if(this.fdjb>1){
				this.fdjb--;
			}
		},
		tdfn(){
			if(!this.$refs.gund_01x){return}
			let maxd =  Math.ceil(this.navcoms.maxTime/this.fdjb)*210;
			let len = this.$refs.gund_01x.offsetWidth;
			let bl = len/maxd;
			
			
			let pd = len/maxd;
		
			if(pd>1){
				pd = 1;
			}
			pd = pd*100;
			    
			return "width:"+pd+"%;transform: translate("+this.tdjl+"px,-50%);";			
		},
		bal(){
			if(!this.$refs.gund_01x){return}
			let maxd =  Math.ceil(this.navcoms.maxTime/this.fdjb)*210;
			let len = this.$refs.gund_01x.offsetWidth;
			let pd = maxd/len;

			return "transform: translateX("+-(this.tdjl*pd)+"px);";	
		},
		qhcc2(on){
			this.vdcc2 = on;
			setTimeout(()=>{
				this.isCc2='';
			},50)
			this.isld = 1;
		},
		clickfn(fn){
			if(!this[fn]){
				return
			}
			this[fn]();
		},
		showCc(e){
			if(e && e.stopPropagation()) {
				e.stopPropagation();
			} else {
				e.cancelBubble = false;
			}
			if(this.isCc==1){
				return
			}
			this.isCc = 1;
			document.onclick = ()=>{
				this.isCc='';
				document.onclick = null;
			}
		},
		showCc2(e){
			if(e && e.stopPropagation()) {
				e.stopPropagation();
			} else {
				e.cancelBubble = false;
			}
			if(this.isCc2==1){
				return
			}
			this.isCc2 = 1;
			document.onclick = ()=>{
				this.isCc2='';
				document.onclick = null;
			}
		},
		close(){
			this.istype = '';
		},
		qhcc(on){
			this.vdcc = on;
			if(on==0){
				this.cjzb.x =0;				
			}
			if(on==1){
				this.cjzb.x =21.75;
				this.cjzb.w = 347.5;
				this.sczz = 'issczz';						 
			}
			this.drm();
			setTimeout(()=>{
				this.isCc='';
			},50)
			
		},
		checkDOm(e,el,on,dom){
			if(e && e.stopPropagation()) {
				e.stopPropagation();
			} else {
				e.cancelBubble = false;
			}
			if(this.checkDOmx){
				if(el.fid+on!=this.checkDOmx.fid){
					this.checkDOmx.ischeck = '';
				}
			}

			if(el.ischeck==1){
				return
			}			
			el.ischeck = 1;		
			this.checkDOmx = el;		
			this.checkDOmx.fid = this.checkDOmx.fid+on;

		},
		jlx2(e){
			e.preventDefault();
			
			let tdStar = e.pageX;						
			let mv = this.fdjb;
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				e.preventDefault();
				let on = Math.round((e.pageX-tdStar)*100)/100+mv;
				if(on<1){
					on=1;
				}
				if(on>120){
					on=120;
				}
				
				this.fdjb = on;
			}			 
			document.onmouseup =  ()=>{
				document.onmousemove = document.onmouseup = null;
			}
		},
		jlx(e,el,index,list){
			e.preventDefault();
			if(!this.$refs.gund_01x){return}
			let tdStar = e.pageX;			
			let maxd =  Math.ceil(this.navcoms.maxTime/this.fdjb)*210;
			let len = this.$refs.gund_01x.offsetWidth;
			let bl = len/maxd;
			let pd = (maxd-len)*bl;
			let mv = this.tdjl;
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				e.preventDefault();
				let on = Math.round((e.pageX-tdStar)*100)/100+mv;
				
				if(on<0){
					on=0;
				}
				if(on>pd){
					on=pd;
				}
				this.tdjl = on;
			}			 
			document.onmouseup =  ()=>{
				document.onmousemove = document.onmouseup = null;
			}
		},
		jl(e,el,index,list){
			e.preventDefault();
			this.tdStar = e.pageX;			
			let wid = el.long*this.wdk;	
			let mv = ((el.long-el.cut_end)/el.long)*wid;
			
			let max = +el.long;	
			if(el.type=='pic'){
				max = 999999;
			}		
			let min = el.cut_start+1;
			let prEnd,prStar,nxEnd,nxStar;
			let doml = list[index-1];
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				e.preventDefault();
				let on = +(((e.pageX-this.tdStar-mv)/wid)*el.long).toFixed(3);
				let pn = +el.long+on;
				if(+pn>max){
					pn = max;
				}				
				if(pn<min){
					pn = min;
				}			
				el.cut_end = Math.round((pn*100)/100);
				this.setHm(index,el,list);		
			}			 
			document.onmouseup =  ()=>{
				document.onmousemove = document.onmouseup = null;
			}
		},
		setHm(on,el,list){
	
			let ond = el.start+(el.cut_end-el.cut_start);
			for(let i=on,n=list.length;i<n;i++){
				if(list[i+1]){
					list[i+1].start = list[i].start+(list[i].cut_end-list[i].cut_start);
				}
				
			}

		},
		// setQm(on,el,list){			
		// 	let ond = el.start+(el.cut_end-el.cut_start);
		// 	for(let i=on,n=list.length;i<n;i++){
		// 		if(list[i+1]){
		// 			list[i+1].start = list[i].start+(list[i].cut_end-list[i].cut_start);
		// 		}
				
		// 	}		
		// },
		jl3(e,el,onc,list){
			e.preventDefault();
		
			this.tdStar = e.pageX;	
			let cs = el.start;
			let wid = el.long*this.wdk;
			let ond = onc-1;
			let ondn = onc+1;
			let tms = el.cut_end-el.cut_start;
			
			let prEnd,prStar,nxEnd,nxStar;
			let prd = list[ond];
			if(prd){
				
				prEnd = +prd.start +(prd.cut_end-prd.cut_start);
				prStar = prd.start;
			}
			let nxd = list[ondn];
			if(nxd){
				nxEnd = +nxd.start+(nxd.cut_end-nxd.cut_start);
				nxStar = nxd.start;
			}
		
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				e.preventDefault();
				let on = +(((e.pageX-this.tdStar)/wid)*el.long).toFixed(3);
			
				let dd = Math.round(((+cs+(on))*100)/100);
				if(prd && dd<prEnd){
					dd = prEnd;					
				}
				if(nxd && (dd+tms)>nxStar){
					dd = nxStar-tms;
				}
				if(dd<0){
					dd = 0;
				}
				el.start =  dd;
			}			 
			document.onmouseup =  (e)=>{
				e.preventDefault();
				let on = +(((e.pageX-this.tdStar)/wid)*el.long).toFixed(3);
				let dd = Math.round(((+cs+(on))*100)/100);				
				if(prStar || prStar==0){					
					if(dd<=prEnd-((prEnd-prStar)/2)){					
						list[onc].start = list[ond].start;
						list[ond].start = list[onc].start+(list[onc].cut_end-list[onc].cut_start);
						list.splice(ond,2,list[onc],list[ond]);
					}
				}			
				if(nxStar || nxStar==0){					
					if(dd>=nxStar+((nxEnd-nxStar)/2)){				
						list[ondn].start = list[onc].start;
						list[onc].start = list[ondn].start+(list[ondn].cut_end-list[ondn].cut_start);
						list.splice(onc,2,list[ondn],list[onc]);
					}
					
				}
				
				document.onmousemove = document.onmouseup = null;
			}
		},
		jl2(e,el,index,list){
			e.preventDefault();
			this.tdStar = e.pageX;
			let wid = el.long*this.wdk;	
			let mv = ((el.long-el.cut_start)/el.long)*wid;
			let max = +el.cut_end-1;
			let osta = el.start;
			let stad = el.start-el.cut_start;
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				e.preventDefault();
				let on = +(((this.tdStar-e.pageX+mv)/wid)*el.long).toFixed(3);			
				let pn = +el.long-on;	
				if(+pn<0){
					pn = 0;
				}			
				if(+pn>max){
					pn = max;
				}
				let opd = Math.round((pn*100)/100);
				let pnmin = stad+opd;
				let ond = list[index-1];
				if(ond){
					let maxd = ond.start+(ond.cut_end-ond.cut_start);
					if(pnmin<maxd){
						el.cut_start = maxd-stad;												
						el.start = maxd;						
						return
					}
					
				}
				
				el.cut_start = opd;
				el.start = 	stad+el.cut_start;					
			}									 
			document.onmouseup =  ()=>{
				document.onmousemove = document.onmouseup = null;
			}
		},
		zzyz(){
			if(this.navcoms.media.length==0){
				this.$message({
					message:'请先上传并添加媒体素材至轨道'
				})
				return
			}
			if(this.navcoms.audio.length==0){
				this.$message({
					message:'请先选择音乐'
				})
				return
			}
			let len = this.navcoms.media[this.navcoms.media.length-1];
			let ent = +len.star+(len.cut_end-len.cut_start);
			let firs = this.navcoms.media[0].start;
			
			if(firs!=0){
				this.$message({
					message:'你的开头部分没有填充媒体是素材，请确保视频从00:00开始播放'
				})
			}
			if(ent>120){
				this.$message({
					message:'来电秀内容的媒体剪辑时长不得超过120秒'
				})
				return
			}
			
			let ant = this.navcoms.audio[this.navcoms.audio.length-1];
			let ant_t = +ant.star+(ant.cut_end-ant.cut_start);
		
			if(ent!=ant_t){
				this.istype = {
					t:'提示',
					c1:'当前音频与视频时长不一致',
					c2:'来电秀时长以视频剪辑时长为准，建议将音乐与视频的时长裁剪一致，以保证效果',
					btnn:'直接提交',
					btnfn:'zzwc',
				}
				
				return
			}
			this.zzwc();			
		},
		zzwc(){		
			this.istype = '';
			this.tanc.zj = 'saves';
			this.tanc.title = this.form.title;
			this.tanc.json = {
				media:this.navcoms.media,
				audio:this.navcoms.audio
			};
			this.tanc.maxTime = this.navcoms.maxTime;
		},
		cats(){
			if(!this.xzData){return}
			this.tanc ={
				zj:'cat',
				title:'',
				data:this.navcoms[this.xzData.n][this.xzData.o]
			};			
		},
		delt(){			
			if(!this.xzData){return}
			this.navcoms[this.xzData.n].splice(this.xzData.o,1);
			this.xzData='';			
		},
		endeds(){
			let len = this.navcoms.media.length;
			if(this.bfon<len-1){
				this.bfon++;
				if(this.navcoms.media[this.bfon].type=='pic'){
					this.drmImg();
					return
				}
				this.playVid();
				return
			}
			this.islast=1;			
		},	
		timeupdatevideo(){
			if(this.$refs.vids.currentTime>=this.navcoms.media[this.bfon].cut_end){
				this.$refs.vids.pause();
				this.endeds();
			}			
		},
		endAudio(){
			let len = this.navcoms.audio.length;
			if(this.audiosOn<len-1){
				this.audiosOn++;
				this.playAio();
			}
			this.audioLast=1;			
		},
		backd(){
			let str='<span class="kd_02"><span>00:00:00:00</span></span>';
			for(let i=0,n=Math.ceil(this.navcoms.maxTime/10);i<n;i++){
				str+='<div class="kdut_1">';
				for(let i2=0;i2<9;i2++){
					str+='<span></span>';
				}
				
				str+='<span class="kd_02"><span>'+this.tutime(this.fdjb*(i+1))+'</span></span>';
				str+='</div>';
			}
			return str;				
		},
		tutime(t){
			var h=0,m=0,s=0,om=0;
			s = t%60;
			if(t>=60){
				m = (t-s)/60;
				om = m%60;
			}
			if(m>=60){
				h = (m-om)/60;
			}
		    return this.optu(h)+':'+this.optu(om)+':'+this.optu(s);
		},
		optu(n){
			return n>9?n:'0'+n;
		},
		backtop(el,index){
		
			let str = "width:"+((el.cut_end-el.cut_start)/this.bl)*this.wdk+"px;transform:translateX("+((el.start/this.bl)*this.wdk)+"px);";			
			if(el.ischeck){
				str+='z-index:2;';
			}		
			return str;
		},
		setvideo(fi){
			this.$refs.vids.src=fi;
		},
		csy(){		
			this.$refs.vids.currentTime = 0;
			this.drm();			
			setTimeout(()=>{
				this.drm();			
			}, 500);				
		},
		drm(){
			let ob = this.navcoms.media[this.bfon];
			this.cans.fillStyle="#000";
			this.cans.fillRect(0,0,391,695);
			this.cans.drawImage(this.$refs.vids,ob.sx,ob.sy,ob.sw,ob.sh,ob.x,ob.y,ob.w,ob.h);			
			let po = this.cun[this.vdcc].x;
			if(po){
				this.cans.fillRect(0,0,po,695);
				this.cans.fillRect(391-po,0,po,695);
			}
			
		},
		drmImgs(){
			let ob = this.navcoms.media[this.bfon];
			this.cans.fillStyle="#000";
			this.cans.fillRect(0,0,391,695);
			
			var a = document.createElement('img');
			a.src=ob.file_url;
			a.onload = ()=>{
				this.cans.drawImage(a,ob.sx,ob.sy,ob.sw,ob.sh,ob.x,ob.y,ob.w,ob.h);				
			}			
		},
		drmImg(){
			let ob = this.navcoms.media[this.bfon];
			this.cans.fillStyle="#000";
			this.cans.fillRect(0,0,391,695);
			
			var a = document.createElement('img');
			a.src=ob.file_url;
			a.onload = ()=>{
				this.cans.drawImage(a,ob.sx,ob.sy,ob.sw,ob.sh,ob.x,ob.y,ob.w,ob.h);				
			}
			clearTimeout(this.ht);
			this.ht = setTimeout(()=>{
				this.endeds();
			},5000)
			
		},
		playsx(){
			if(this.navcoms.media.length==0){
				return			
			}
			this.islast='';
			this.audioLast='';
			this.audiosOn=0;
			this.bfon=0;
			if(this.navcoms.media[this.bfon].type=='pic'){
				this.drmImg();
				return
			}						
			this.playVid('sx');			
			this.playAio('sx');
		},
		playVid(a){
			if(this.navcoms.media.length==0){
				return			
			}
			if(this.$refs.vids.src!=this.navcoms.media[this.bfon].file_url){
				this.$refs.vids.src=this.navcoms.media[this.bfon].file_url;
			}	
			setTimeout(()=>{
				if(a=='sx'){
					this.$refs.vids.currentTime=0;
				}
				if(this.$refs.vids.currentTime<this.navcoms.media[this.bfon].cut_start){
					
					this.$refs.vids.currentTime=this.navcoms.media[this.bfon].cut_start;
				}
				
				this.$refs.vids.play();		
				
			},50)
		},
		playAio(a){
			if(this.navcoms.audio.length==0){
				return
			}
			if(this.$refs.aido.src!=this.navcoms.audio[this.audiosOn].file_url){
				this.$refs.aido.src=this.navcoms.audio[this.audiosOn].file_url;
			}			
			setTimeout(()=>{
				if(a=='sx'){
					this.$refs.aido.currentTime=0;
				}
				this.$refs.aido.play();				
			},50)
		},
		
		playAll(){
			if(this.islast){
				this.islast='';
				this.bfon=0;
				this.audioLast='';
				this.audiosOn=0;
			}
			if(this.navcoms.media[this.bfon].type=='pic'){
				this.drmImg();
				return
			}
			if(this.$refs.vids.paused){
				
				this.playAio();
				this.playVid();
				return
			}
			
			if(this.$refs.vids){
				this.$refs.vids.pause();
			}
			if(this.$refs.aido){
				this.$refs.aido.pause();
			}
			
		},
		init(){
			let onk = '';
			document.addEventListener('keydown',(e)=>{					
				var ctrlKey = e.ctrlKey || e.metaKey;	
				
				var shiftKey = e.shiftKey;
				if(shiftKey && shiftKey){
					onk = '';
				}
				if(ctrlKey) {
				    onk = 1;
				}
				if(shiftKey){
					onk = 2;
				}
				if(this.checkDOmx && e.keyCode === 8){
					e.preventDefault();
					console.log('回退');
					this.delt();
				}
				
				
			},false);
			document.addEventListener('keyup',(e)=>{
				onk = '';
			},false);
			this.$refs.gdbox.addEventListener('mousewheel',(e)=>{
				if(!onk){
					return
				}
				e = e || window.event;
				e.preventDefault();
				var kd = e.wheelDelta?e.wheelDelta:e.detail;
				
				
				if(kd>0){
					// alert("滑轮向上滚动");
					if(onk==1  &&  this.fdjb<120){
						this.fdjb++;
					}
					if(onk==2 ){
						this.tdjl++;
					}
				}
				if(kd<0){
					if(onk==1 && this.fdjb>1){
						this.fdjb--;
					}
					if(onk==2 && this.tdjl>0){
						this.tdjl--;
					}
				}
				
				
			},false)
			
			
			this.$refs.cavs.width = 391;
			this.$refs.cavs.height = 695;
			this.cans = this.$refs.cavs.getContext("2d");
			this.cans.fillStyle="#000";
			this.cans.fillRect(0,0,391,695);
			this.$refs.vids.addEventListener('play',()=>{
				this.po =window.setInterval(()=>{
					let ob = this.navcoms.media[this.bfon];
					this.cans.drawImage(this.$refs.vids,ob.sx,ob.sy,ob.sw,ob.sh,ob.x,ob.y,ob.w,ob.h);
				},20);
			},false);
			this.$refs.vids.addEventListener('pause',()=>{window.clearInterval(this.po);},false);
			this.$refs.vids.addEventListener('ended',()=>{clearInterval(this.po);},false);	
		},
		qhNav(o,zj){
			if(this.navson ==o){return}
			this.navson = o;
			this.navcoms.zj=zj;
		},
		csa(e,b){
			let dom =  e.target.getBoundingClientRect();
			if(b){
				this.xzData = b;
			}
			
			this.csad = 'display:block;top:'+(dom.y-5)+'px;left:'+(dom.x-22)+'px';
		},
		csb(e){
			setTimeout(()=>{
				this.csad = '';
			},200)
			
		},
		setips(n){
			this.tipszb = {
				x:n.x,
				y:n.y
			};
			
			
			
			
		}
	}
}
</script>

<style>
#app>div>div.ntob{
	padding: 0;
}
.ntob_head{
	position: relative;
	text-align: center;
	background: #fff;
	height: 48px;
	width: 100%;
	-webkit-box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
	box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
	z-index: 2;
}
.ntob_cent{

}
.ntob_cent>div{
	display: inline-block;
	vertical-align: top;
	width: 50%;

}

.noto_back{
	text-align: left;
	cursor: pointer;
	position: absolute;
	left: 0;

	font-size:14px;

	color:rgba(102,102,102,1);
	line-height:48px;
}
.noto_back>img{
	display: inline-block;
	vertical-align: top;
	margin: 17px 5px 0 24px;
}
.noto_title{
	display: inline-block;
	margin-top: 14px;
	line-height:20px;
}
.noto_title>input{
	text-align: right;
	display: inline-block;
	vertical-align: top;
	border: none;
	background: none;
	font-size:14px;
	color:rgba(30,30,30,1);
	line-height:20px;
}
.noto_btns{
	position: absolute;
	right: 20px;
	top: 8px;
}
.noto_btns>span{
	display: inline-block;
	vertical-align: top;
	cursor: pointer;
	width:78px;
	height:30px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	border:1px solid rgba(187,187,187,1);
	font-size:14px;
	text-align: center;
	color:rgba(102,102,102,1);
	line-height:30px;
	margin-left: 15px;
}
.noto_btns>span:hover{
	opacity: .7;
}
.noto_btns>.noto_bys{
	background: #33B3FF;
	border-color: #33B3FF;
	color: #fff;
}
.ntob_cent_r{
	background: #fff;
}
.videoBox{
	position: relative;
	display: block;
	margin: 0 auto;
	width:391px;
	height:695px;	
	overflow: hidden;
}
.videoBox1{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.ntob_cent_l_1{
	position: absolute;
	bottom: 0;
	left: 0;
	width:391px;
	height:695px;	
	display: none;
}
.ntob_cent_r{
	position: relative;
	height: 769px;
	text-align: left;
}
.ntob_cent_r_2{
margin-left: 121px;
}
.ntob_cent_r_1{
	position: absolute;
	top: 0;
	left: 0;	
	border-right: 1px solid #F0F0F0;
	width: 120px;
	height: 100%;
}
.ntob_cent_r_1>span{
	cursor: pointer;
	position: relative;
	display: block;
	text-align: center;
	font-size:14px;
	margin-top: 24px;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:42px;
	overflow: hidden;
}
.ntob_cent_r_1>span.ckin,.ntob_cent_r_1>span:hover{
	background: rgba(51,179,255,.1);
}
.ntob_cent_r_1>span.ckin{
	font-size:18px;
	font-weight:500;
	color:rgba(51,179,255,1);
}
.ntob_cent_r_1>span.ckin:after{
	content: "";
	position: absolute;
	left: 0;
	top: 0;
	background: #33B3FF;
	width: 2px;
	height: 100%;
}

.ntob_cent_r_1>span>img{
	display: inline-block;
	vertical-align: middle;
	margin-right: 5px;
}
.ntob_footer{
	position: relative;
	width: 100%;
	height: 264px;
}
.ntob_footer_1{
	position: absolute;
	left: 0;
	top: 0;
	width: 120px;
	height: 100%;
	overflow: hidden;
	background: #fff;
	z-index: 1;
}
.ntob_footer_2{
	position: absolute;
	right: 0;
	left: 120px;
	overflow: hidden;
	height: 100%;
	background: #fff;
}
.ntob_footer_2_1,.ntob_footer_1_1{
	
	min-width: 100%;
	height:52px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
}
.ntob_footer_2_1{
	position: relative;
	text-align: left;

}
.kdut{
	position: absolute;
	bottom: 2px;
	left: 0;
	display: inline-block;
	border-bottom: 1px solid #DEE1E9;
	white-space: nowrap;
}
.kdut>span{
	display: inline-block;
	vertical-align: bottom;
	width:1px;
	height:8px;
	background:rgba(96,98,102,1);

}
.kdut_1{
	display: inline-block;
	vertical-align: bottom;
	margin-left: 10px;
}
.kdut_1>span{
	display: inline-block;
	vertical-align: bottom;
	width:1px;
	height:4px;
	background:rgba(222,225,233,1);
	margin:0 10px;
}
.kdut_1>span.kd_02{
	width:1px;
	height:8px;
	background:rgba(96,98,102,1);
}
.kdut_1>span:last-child{
	margin-right: 0;
}
.kd_02{
	position: relative;
}
.kd_02>span{
	position: absolute;
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
	bottom: 8px;
	left: 0;
}
.tlo_box{
	min-width: 100%;
	position: relative;
}
.tlo_02{
	position: relative;
	height: 72px;
	background: #F4F6F9;
	margin-bottom: 3px;
}
.tlo_03{
	position: relative;
	height: 32px;
	background: #F4F6F9;
	margin-bottom: 3px;
}
.tlo_04{
	height: 72px;
	background: #F4F6F9;
	margin-bottom: 3px;
}
.gund_01{
	position: absolute;
	bottom: 0;
	left: 0;
	right: 153px;
	
	height: 24px;
	background: #E3E3E3;
}
.fdsx_01{
	position: absolute;
	bottom: 0;
	right: 0;
	width: 152px;
	height: 24px;
	background: #E3E3E3;
}
.gund_02{
	cursor: pointer;
	position: absolute;
	top: 50%;
	left: 0;
	width: 20px;
	height: 8px;
	background:rgba(187,187,187,1);
	border-radius:4px;
	transform: translate(0,-50%);
}
.fdsx_01{
	text-align: center;
}
.fdsx_01>span{
	display: inline-block;
	vertical-align: middle;
}
.fdsx_02{
	cursor: pointer;
	width:12px;
	height:12px;
	border-radius: 50%;
	background:rgba(96,97,101,1);
	color: #E3E3E3;
	line-height: 12px;
}
.fdsx_03{
	position: relative;
	width:72px;
	height:2px;
	background:rgba(187,187,187,1);
	border-radius:1px;
	margin: 0 4px;
}
.fdsx_06{
	cursor: pointer;
	position: absolute;
	top: -3.5px;
	left: 0;
	width:8px;
	height:8px;
	border-radius: 50%;
	background:rgba(51,179,255,1);
	box-shadow:0px 2px 4px 0px rgba(0,0,0,0.2);
}
.imgd{
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
	background: #839aba;
	height: 100%;
	background-position: 0;
	background-repeat: repeat-x;
	background-size: auto 100%;

}
.setToll0>img{
	display: block;
	height: 100%;
}
.setTollxx2{
	cursor: pointer;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.setToll0{
	width: 100%;
	height: 100%;
}
.setToll{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	border:2px solid rgba(51,179,255,1);
}
.ntob_cent_l_2{
	position: relative;
	height: 74px;
	background: #fff;
}
.ntob_cent_l_2_1{
	position: absolute;
	left: 23px;
	top: 25px;
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.ntob_cent_l_2_2{
	text-align: center;
	font-size:16px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:22px;
	padding-top: 24px;
}
.ntob_cent_l_2_3{
	position: absolute;
	right: 16px;
	top: 25px;
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.ntob_cent_l_2_2>span{
	display: inline-block;
	vertical-align: top;
}
.an_sx_01{
	width:22px;
	height:22px;

	margin-right: 16px;
}
.an_sx_01>img,.an_bf_01>img{
	cursor: pointer;
	display: block;
	width: 18px;
}
.an_bf_01{
	margin-right: 16px;
	width:22px;
	height:22px;
}
.tme_091{
	font-size:16px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(143,147,153,1);
	line-height:22px;
}
.setToll1{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	cursor: move;
}
.setToll2{
	position: absolute;
	top: 0;
	left: 0px;
	width: 10px;
	height: 100%;
	cursor: col-resize;
}
.setToll3{
	position: absolute;
	top: 0;
	right: 0px;
	width: 10px;
	height: 100%;
	cursor: col-resize;
}
.setToll4{
	
	cursor: pointer;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	
	width:36px;
	height:20px;
	background:rgba(255,255,255,1);
	border-radius: 6px;
	box-shadow:0px 2px 4px 0px rgba(0,0,0,0.1);
}
.setToll4>i{
	
	display: inline-block;
    vertical-align: top;
    width: 4px;
    height: 4px;
    background: #000;
    border-radius: 50%;
    margin: 8px 2px;
}
.setToll4_1{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
	cursor: pointer;
}
.setToll4_2{
	z-index: 10;
	display: none;
	position: fixed;
	left: 0;
	width:82px;
	transform: translateY(-100%);
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	padding: 8px 0;
    border-radius: 5px;
}
.setToll4_2>span{
	cursor: pointer;
	display: block;
	line-height: 34px;
	text-align: center;
	font-size: 14px;
}
.setToll4_2>span:hover{
	background-color: #f5f7fa;
}
.bl_000{
	position: relative;
	cursor: pointer;
}
.bl_001{
    position: absolute;
    bottom: 23px;
    left: -6px;
	width:59px;
	padding: 8px 0;
	text-align: center;
	height:72px;
	border-radius: 5px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
}
.bl_001>span{
	cursor: pointer;
	display: block;
	width:100%;
	height:36px;
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:36px;
}
.bl_001>span.cek{
	background:rgba(51,179,255,.1);
	color: #33B3FF;
}
.issczz{
	border-left: 21.75px solid #000;
	border-right: 21.75px solid #000;
	box-sizing: border-box;
}
.cgyi{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;	
}
.bf_o1{
	position: absolute;
	top: 0;
	left: 0;
	width: 1px;
	height: 100%;
	background: #0000FE;
}
.newds_012{
	margin: 28px 84px;
	font-size:14px;
	text-align: center;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.newds_013{
	
	margin: 8px auto 0;
	text-align: center;
	font-size:12px;
	width: 240px;
	color:rgba(187,187,187,1);
	line-height:18px
}
.show_00x_1{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	text-align: center;
}
.show_00x_1_1{
	font-size:35px;
	margin: 176px auto 20px;
	color:rgba(255,255,255,1);
	line-height:50px;
}
.show_00x_1_2{
	font-size:16px;
	font-weight:500;
	color:rgba(255,255,255,1);
	line-height:22px;
}
.show_00x_1_3>span{
	display: inline-block;
	width: 75px;
	font-size:16px;
	font-weight:500;
	color:rgba(255,255,255,1);
	line-height:22px;
	margin-top: 50px;
}
.show_00x_1_3>span>img{
	display: block;
	margin: 0 auto 10px;
}
.show_00x_1_3>span:nth-child(3n+2){
	margin: 50px 60px 0;
}
.xx_01x{
	width: 25px;
}
.xx_02x{
	width: 25px;
}
.xx_03x{
	width: 31px;
}
.xx_04x{
	width: 33px;
}
.xx_05x{
	width: 19px;
}
.xx_06x{
	width: 31px;
}
.show_00x_1_4{
	display: block;
	width: 61px;
	margin: 60px auto 0;
}
.show_00x_2{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.show_00x_2_1{
	display: block;
	margin: 177px auto 13px;
	width: 67px;
}
.show_00x_2_2{
	font-size:16px;
	color:rgba(255,255,255,1);
	line-height:22px;
	margin-bottom: 10px;
}
.show_00x_2_3{
	font-size:25px;
	color:rgba(255,255,255,1);
	line-height:30px;
}
.show_00x_2_4{
	position: absolute;
	width: 62px;
	bottom: 133px;
	left: 53px;
}
.show_00x_2_5{
	position: absolute;
	width: 62px;
	bottom: 133px;
	right: 53px;
}
.ntob_footer_1_2>div{
	margin-bottom: 3px;
	font-size:14px;
	color:rgba(51,51,51,1);
	
}
.ntob_footer_1_2>div>img{
	display: inline-block;
	vertical-align: top;
	margin-right: 8px;
	width: 18px;
}
.ntob_footer_1_2>div:nth-child(1){
	line-height: 72px;
	
}
.ntob_footer_1_2>div:nth-child(1)>img{
	margin-top: 27px;
}
.ntob_footer_1_2>div:nth-child(2){
	line-height: 32px;
}
.ntob_footer_1_2>div:nth-child(2)>img{
	margin-top: 7px;
}
.ntob_footer_1_2>div:nth-child(3){
	line-height: 72px;
}
.ntob_footer_1_2>div:nth-child(3)>img{
	margin-top: 27px;
}

.con-right-iocn-img {
	display: inline-block;
	vertical-align: initial;
	width: 18px;
	margin-right: 8px;
}
.con-right-iocn-img > .icon {
	position: relative;
	left: 0;
	color: rgba(51,179,255,1);
	-webkit-filter: drop-shadow(89px 0);
	filter: drop-shadow(89px 0);
	border-right: 34px solid transparent;
}
.ckin>div{
	transform: translateX(-85px);
}
</style>
