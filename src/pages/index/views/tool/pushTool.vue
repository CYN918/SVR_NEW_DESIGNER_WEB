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
					<span >保存</span><span @click="zzwc"  class="noto_bys">制作完成</span>
				</div>
			</div>
			<div class="ntob_cent">
				<div class="ntob_cent_l">
					
					<div class="videoBox">
						<video :style="bacys()" muted @ended="endeds()" id="boxf" class="videoBox1"  ref="vids"></video>
						<div :class="['videoBox2',sczz]"></div>
					</div>
					
					
					<audio 
					class="ntob_cent_l_1" 
					@ended="endAudio()"					
					ref="aido"></audio>
					<div class="ntob_cent_l_2">
						<div class="ntob_cent_l_2_1">
							预览比例<span class="bl_000" @click="showCc">
								{{cun[vdcc]}}
								<div v-if="isCc" class="bl_001">
									<span @click="qhcc(index)" v-for="(el,index) in cun" :class="index==vdcc?'cek':''">{{el}}</span>
									
								</div>
							</span>
							
						</div>
						<div class="ntob_cent_l_2_2">
							<span @click="playsx" class="an_sx_01"></span><span @click="playAll" class="an_bf_01"></span>
							<span>00:00:00:00</span> / <span class="tme_091">00:00:30:00</span>							
						</div>
						<div class="ntob_cent_l_2_3">来电预览</div>
					</div>
				</div>
				<div class="ntob_cent_r">
					<div class="ntob_cent_r_1">
						<span @click="qhNav(index,el.zj)" v-for="(el,index) in navs" :class="navson==index?'ckin':''"><img v-if="el.icon" :src="'/imge/new/tools/n/'+el.icon">{{el.n}}</span>
					</div>
					<div class="ntob_cent_r_2">
						<component v-bind:is="navcoms.zj" v-model="navcoms" ref="vid"></component>						
					</div>
				</div>
			</div>
			<div class="ntob_footer">
				<div class="ntob_footer_1">
					<div class="ntob_footer_1_1"></div>
				</div>
				<div class="ntob_footer_2">
					<div class="tlo_box">
						<div class="ntob_footer_2_1">
							<div v-html="backd()" class="kdut"></div>
						</div>
						
						<div class="tlo_02">
							<div @click="checkDOm($event,el,index,'media')" :style="backtop(el,index)" class="imgd" v-for="(el,index) in navcoms.media">
								
								<img v-if="el.fps_pic" :src="el.fps_pic">	
								<div  v-if="el.ischeck" class="setToll">
									<div @mousedown="jl3($event,el)" class="setToll1"></div>
									<div @mousedown="jl2($event,el)"  class="setToll2"></div>
									<div @mousedown="jl($event,el)" class="setToll3"></div>
									<div class="setToll4">
										<i></i><i></i><i></i>
										<input @blur="csb" @focus="csa($event,{n:'media',o:index})" class="setToll4_1" type="text">
									</div>
								</div>							
								
							</div>
						</div>
						<div class="tlo_03">
							<div @click="checkDOm($event,el,index,'audio')" :style="backtop(el,index)" class="imgd" v-for="(el,index) in navcoms.audio">
							
								<div  v-if="el.ischeck" class="setToll">
									<div @mousedown="jl3($event,el)" class="setToll1"></div>
									<div @mousedown="jl2($event,el)"  class="setToll2"></div>
									<div @mousedown="jl($event,el)" class="setToll3"></div>
									<div class="setToll4">
										<i></i><i></i><i></i>
										<input @blur="csb" @focus="csa($event,{n:'audio',o:index})" class="setToll4_1" type="text">
									</div>
								</div>			
							
							</div>
						</div>
						<div class="tlo_04"></div>
					</div>
					<div class="gund_01">
						<div class="gund_02"></div>
					</div>
					<div class="fdsx_01">
						<span class="fdsx_02">-</span>
						<span class="fdsx_03">
							<div class="fdsx_06"></div>
						</span>
						<span class="fdsx_02">+</span>
						
					</div>
					
				</div>
			</div>
			<div :style="csad" class="setToll4_2">
				<span @click="cats()">裁剪</span>
				<span>复制</span>
				<span @click="delt()">删除</span>
			</div>
			<component v-bind:is="tanc.zj" v-model="tanc" ref="tanbox"></component>
		
		</div>
		
		
		
	</div>
	
</template>

<script>
import setMt from './setMt';
import mp3List from './setAdio';
import saves from './saves';
import cat from './cat';
export default{
	components:{
		setMt,
		mp3List,
		saves,
		cat
	},
	data(){
		return{
			cun:[
				'9:16',
				'9:18'				
			],
			sczz:'',
			vdcc:0,
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
				{n:'媒体',icon:'icon_mt_video_pre.svg',zj:'setMt'},
				{n:'音乐',icon:'icon_yy.svg',zj:'mp3List'}
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
		}
	},
	mounted: function () {
		this.init();
	}, 

	methods:{
		bacys(){
			if(!this.navcoms.media[this.bfon]){
				return
			}
			
			
			return	'transform: scale('+this.navcoms.media[this.bfon].fd+');'
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
			document.onclick =  ()=>{
				this.isCc='';
				document.onclick = null;
			}
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
			if(el.ischeck==1){
				return
			}
			
			el.ischeck = 1;
			
			if(this.onck!=-1){
				this.navcoms[dom][this.onck].ischeck='';
			}
			this.onck = on;
			document.onclick =  ()=>{
				this.closed(el,on,dom);
				document.onclick = null;
			}
		
		},
		closed(el,on,dom){
			el.ischeck = '';
			this.onck = -1;
		},
		jl(e,el){
			this.tdStar = e.pageX;			
			let wid = el.long*this.wdk;	
			let mv = ((el.long-el.cut_end)/el.long)*wid;
			let max = +el.long;
			let min = el.cut_start+1;
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				let on = +(((e.pageX-this.tdStar-mv)/wid)*el.long).toFixed(3);
				let pn = +el.long+on;
				if(+pn>max){
					pn = max;
				}				
				if(pn<min){
					pn = min;
				}			
				el.cut_end = Math.round((pn*100)/100);
				
			}			 
			document.onmouseup =  ()=>{
				document.onmousemove = document.onmouseup = null;
			}
		},
		jl3(e,el){
			this.tdStar = e.pageX;	
			let cs = el.start;
			let wid = el.long*this.wdk;	
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				let on = +(((e.pageX-this.tdStar)/wid)*el.long).toFixed(3);
				let pn = +el.long+on;
				el.start =  Math.round(((+cs+(on))*100)/100);
				
				
			}			 
			document.onmouseup =  ()=>{
				document.onmousemove = document.onmouseup = null;
			}
		},
		jl2(e,el){
			this.tdStar = e.pageX;
			let wid = el.long*this.wdk;	
			let mv = ((el.long-el.cut_start)/el.long)*wid;
			let max = +el.cut_end-1;
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				let on = +(((this.tdStar-e.pageX+mv)/wid)*el.long).toFixed(3);			
				let pn = +el.long-on;	
				if(+pn<0){
					pn = 0;
				}			
				if(+pn>max){
					pn = max;
				}			
				el.cut_start = Math.round((pn*100)/100);					
			}									 
			document.onmouseup =  ()=>{
				document.onmousemove = document.onmouseup = null;
			}
		},
		scVideo(){
			this.formData.media = this.navcoms.media;
		},
		scAduios(){
			this.formData.media = this.navcoms.audio;
		},
		pushData(){

		},
		zzwc(){
			if(this.navcoms.media.length==0){
				return
			}
			if(this.navcoms.audio.length==0){
				return
			}
			this.tanc.zj = 'saves';
			this.tanc.json = {
				media:this.navcoms.media,
				audio:this.navcoms.audio
			};
			this.tanc.maxTime = this.navcoms.maxTime;
			
			
		},
		
		
		savePus(){
			
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
				this.playVid();
				return
			}
			this.islast=1;			
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
				str+='<span class="kd_02"><span>'+this.tutime(10*(i+1))+'</span></span>';
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
			let str = "width:"+(el.cut_end-el.cut_start)*this.wdk+"px;transform:translateX("+((el.start+el.cut_start)*this.wdk)+"px);";
			if(el.type=='image'){
				str+='background-image: url('+el.bgimg+');';
			}
			if(el.ischeck){
				str+='z-index:2;';
			}
		
			return str;
		},
		setvideo(fi){
			this.$refs.vids.src=fi;
		},
		playsx(){
			if(this.navcoms.media.length==0){
				return			
			}			
			this.islast='';
			this.audioLast='';
			this.audiosOn=0;
			this.bfon=0;
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
			if(this.$refs.vids.paused){
				if(this.islast){
					this.islast='';
					this.bfon=0;
					this.audioLast='';
					this.audiosOn=0;
				}
			
				
				
				
				this.playAio();
				this.playVid();
				return
			}
			this.$refs.vids.pause();
			this.$refs.aido.pause();
		},
		init(){},
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
	background: #000;
	overflow: hidden;
}
.videoBox1{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.videoBox2{
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
	
	width: 100%;
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
	width: 100%;
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
.imgd>img{
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
	background: #282828;
	margin-right: 16px;
}
.an_bf_01{
	margin-right: 16px;
	width:22px;
	height:22px;
	background: #282828;
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

</style>
