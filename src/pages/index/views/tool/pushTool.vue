<template>
	<div>
		<div class="ntob">
			<div class="ntob_head">
				<div @click="backs()" class="noto_back">
					<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/tools/icon_back.svg">
					返回
				</div>
				<div class="noto_title">
					<input
					 @focus="titlon(1)"
					 @blur="titlon('')"
					 v-model="form.title" type="text" placeholder="请输入来电秀名称">
					<span v-if="istitle" class="noto_t1">{{form.title.length}}/20</span>
					<img v-else src="/imge\new\tools\n/icon_bj.svg" />
				</div>
				<div class="noto_btns">
					<span @click="tijF()">保存</span><span @click="zzyz()" class="noto_bys">制作完成</span>
				</div>
			</div>
			<div class="ntob_cent">
				<div class="ntob_cent_l" >
					<div class="ntob_cent_lxbo" ref="vidobox">
					<div class="videoBox" :style="'width:'+boxW+'px;height:'+boxH+'px'">
						<canvas class="videoBox1" ref="cavs"></canvas>
						<video @timeupdate="timeupdatevideo" muted @ended="cksd()" @loadeddata="csy" id="boxf" class="ntob_cent_l_1"
						 :src="video" ref="vids"></video>
						<div class="debox_01">
							<div v-for="(el,index) in navcoms.decorates" :class="playT==1?'setop':''">
								<span v-for="(el2,index2) in el">
									<div
									
									v-if="el2.start<=preview.onTime && backTim(el2)>=preview.onTime"
									>
										<setDevs :class="preview.state==1?'isnobhd':''" v-model="navcoms.decorates[index][index2]"></setDevs>
									</div>					
								</span>
								
							</div>
						</div>
						<div v-if="isld && vdcc2==1" class="show_00x_1" :style="'zoom:'+zoomd">
							
							<img width="100%" height="100%" src="../../../../assets/qd.png" alt="">
						</div>
						<div v-if="isld && vdcc2==0" class="show_00x_1" :style="'zoom:'+zoomd">
							<img width="100%" height="100%" src="../../../../assets/ld.png" alt="">
						</div>
					</div>
					<audio class="ntob_cent_l_1" @timeupdate="timeupdatevideo2" ref="aido"></audio>
					
				</div>
				<div class="ntob_cent_l_2">
					<div class="ntob_cent_l_2_1">
						<img class="ntob_cent_l_2_1x" src="/imge/tools/v_size.svg">预览比例<span class="bl_000" @click="showCc">
							{{cun[vdcc].n}}
						</span>
					</div>
					<div class="ntob_cent_l_2_2">
						<span @click="newplayPreview()" class="an_sx_01">
							<img src="/imge/tools/v_sx.svg" />
						</span><span @click="playd()" class="an_bf_01">
							<img :src="'/imge/tools/'+(preview.state==1?'icon_view_stop_def':'v_play')+'.svg'" />
						
							
						</span>
						<span>{{bckti(parseInt(preview.onTime))}}</span> / <span class="tme_091">{{bckti(parseInt(preview.maxTime))}}</span>
					</div>
					<div class="ntob_cent_l_2_3">
						<span @click="showCc2" class="bl_000">
							{{cun2[vdcc2]}}
							<div class="mx_dsj"></div>
							<div v-if="isCc2" class="bl_001">
								<span @click="qhcc2(index)" v-for="(el,index) in cun2" :class="['cds',index==vdcc2?'cek':'']">{{el}}</span>
							</div>
						</span>
						<el-switch v-model="isld" active-value="1"></el-switch>
					</div>
				</div>
				</div>
				<div class="ntob_cent_r">
					<div class="ntob_cent_r_1">
						<span @click="qhNav(index,el.zj)" v-for="(el,index) in navs" :class="navson==index?'ckin':''">
							<div class="con-right-iocn-img">
								<img class="icon con-right-iocn-img" :src="'/imge/tools/'+el.icon" />
							</div>
							{{el.n}}
						</span>
					</div>
					
					<div class="ntob_cent_r_2">
							
					<keep-alive>
						<component v-bind:is="navcoms.zj" v-model="navcoms" ref="vid"></component>
					</keep-alive>
					</div>
				</div>
			</div>
			
			<div class="ntob_footer">
				<div class="ntob_footer_1">
					<div class="ntob_footer_1_1"></div>
					<div class="ntob_footer_1_2" ref="gd_02">
						<div 
						@click="showZs($event,index)" 
						class="nl_ti1" 
						v-for="(el,index) in navcoms.decorates"
						><img src="/imge/tools/t_zs.svg" />装饰</div>
						
						<div class="nl_ti2"><img src="/imge/tools/t_sp.svg" /> 媒体</div>
						<div class="nl_ti3"><img src="/imge/tools/t_yy.svg" />音频</div>
					</div>
					
				</div>
				<div class="ntob_footer_2" ref="gdbox">
					<div :style="bal()" class="tlo_box" ref="qyBox">
						<div class="ntob_footer_2_1">
							<div @click="kdClick($event)" v-html="backd()" class="kdut"></div>
						</div>
						<div class="necBox" @scroll="gdfn($event)" ref="gd_01">
							<div class="tlo_04" 
							v-for="(el,index) in navcoms.decorates"
							@mouseover="setMos({on:index,n:'decorates'},$event)"
							@mouseout="setMos('')"
							>
							<div 
								:style="backtop(el2,index2)" 
								@contextmenu="contexMs($event,{type:'decorates',on:index2,list:navcoms.decorates[index]})" 
								class="imgd" 
								@click="setCheckOn({type:'decorates',list:navcoms.decorates[index],on:index2})"
								v-for="(el2,index2) in el">
							<div :style="bgtf(el2)" class="setToll0"></div>
							<div class="minzss">{{el2.file_name}}</div>
										<div 
										:class="['setToll',el2.ischeck?'setToll_active':'']">
											<div @mousedown="jl3($event,el2,index2,navcoms.decorates[index],'decorates')" class="setToll1"></div>
											<div @mousedown="jl2($event,el2,index2,navcoms.decorates[index],'decorates')" class="setToll2">
												<div class="setToll2_1">
													<i></i><i></i><i></i>
												</div>
											</div>
											<div @mousedown="jl($event,el2,index2,navcoms.decorates[index],'decorates')" class="setToll3">
												<div class="setToll3_1">
													<i></i><i></i><i></i>
												</div>
											</div>
											<div @click="showcj($event,{type:'decorates',on:index2,list:navcoms.decorates[index]})" class="setToll4">
												<i></i><i></i><i></i>
											</div>
										</div>
										
									</div>
								
							
							</div>
							
							
							<div class="tlo_02" @mouseover="setMos({on:0,n:'media'},$event)" @mouseout="setMos('')">
								<div 
								:style="backtop(el,index)" 
								@contextmenu="contexMs($event,{type:'media',on:index,list:navcoms.media})" 
								@click="setCheckOn({type:'media',list:navcoms.media,on:index})"
								class="imgd" 
								v-for="(el,index) in navcoms.media">
									<div :style="bgtf(el)" class="setToll0"></div>
									<div class="minzss">{{el.file_name}}</div>
									<div 
									:class="['setToll',el.ischeck?'setToll_active':'']">
										<div @mousedown="jl3($event,el,index,navcoms.media,'media')" class="setToll1"></div>
										<div @mousedown="jl2($event,el,index,navcoms.media,'media')" class="setToll2">
											<div class="setToll2_1">
												<i></i><i></i><i></i>
											</div>
										</div>
										<div @mousedown="jl($event,el,index,navcoms.media,'media')" class="setToll3">
											<div class="setToll3_1">
												<i></i><i></i><i></i>
											</div>
										</div>
										<div @click="showcj($event,{type:'media',on:index,list:navcoms.media})" class="setToll4">
											<i></i><i></i><i></i>
										</div>
									</div>
									
								</div>
							</div>

							<div class="tlo_03">
								<div 
								:style="backtop(el,index)" 
								@contextmenu="contexMs($event,{type:'audio',on:index,list:navcoms.audio})" 
								@click="setCheckOn({type:'audio',list:navcoms.audio,on:index})"
								class="imgd" 
								v-for="(el,index) in navcoms.audio">
									<div class="se10hid">
										<img :style="setHidmg(el)" :src="el.type == 'pic' ? el.file_url : el.fps_pic">
									</div>
									
									<div class="minzss">{{el.file_name}}</div>
									<div :class="['setToll',el.ischeck?'setToll_active':'']">
										<div @mousedown="jl3($event,el,index,navcoms.audio,'audio')" class="setToll1"></div>
										<div @mousedown="jl2($event,el,index,navcoms.audio,'audio')" class="setToll2">
											<div class="setToll2_1" style="top:6px;height: 14px;">
												<i></i><i></i>
											</div>
											
										</div>
										<div @mousedown="jl($event,el,index,navcoms.audio,'audio')" class="setToll3">
											<div class="setToll3_1" style="top:6px;height: 14px;">
												<i></i><i></i>
											</div>
										</div>
										<div @click="showcj($event,{type:'audio',on:index,list:navcoms.audio})" class="setToll4">
											<i></i><i></i><i></i>
										</div>
									</div>
									
								</div>
							</div>
							<div @mousedown="todTime($event)" :class="['bf_o1',isbf?'gdAm':'']" :style="backbft()">
								<div class="bf_o1_1"></div>
								<img src="/imge/tools/GD_icon_sjz.svg"/>
							</div>
						</div>						
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
				<span v-if="checkOn.type=='media'" @click="cats()">裁剪</span>
				<span v-if="checkOn.type=='media' || checkOn.type=='decorates'" @click="pastes()">复制</span>
				<span @click="delt()">删除</span>
			</div>
			
			<div :style="zsys" class="zs_box">
				<span @click="adddevd()">
					<span class="zs_box1"><img src="/imge/tools/icon_gd_smile.svg"/></span><span>添加装饰轨</span>					
				</span>
				<span @click="delevd()">
					<span class="zs_box1"><img src="/imge/tools/gd_toast_icon_delete.svg"/></span><span>删除装饰轨</span>
				</span>
			</div>
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
			<component v-bind:is="tanc.zj" v-model="tanc" ref="tanbox"></component>
			<div>
				<span v-for="el in navcoms.media">
					<video v-if="el.type=='video'"  class="ntob_cent_l_1" :src="el.file_url"></video>
				</span>
			</div>
			
			
			<audio 
			class="ntob_cent_l_1" 
			@timeupdate="setAdioLad" 
			@ended="setendAudio()" 
			ref="setAdios"
			></audio>
			
		</div>
	</div>
</template>

<script>
	import setMt from './setMt';
	import mp3List from './setAdio';
	import saves from './saves';
	import cat from './cat';
	import tips from './tips';
	import setDevs from './setDevs';
	export default {
		components: {
			setMt,
			mp3List,
			saves,
			cat,
			tips,
			setDevs
		},
		data() {
			return {
				zsys:'',
				zoomd:1,
				boxW:0,
				boxH:0,
				spgd: 0,
				istype: '',
				isbf:'',
				cun: [{
						n: '9:16',
						x: 0
					},
					{
						n: '6:13',
						x: 48
					}
				],
				cun2: [
					'来电预览',
					'去电预览'
				],
				sczz: '',
				isld: '',
				issuspend:'',
				vdcc: 0,
				vdcc2: 0,
				isCc: '',
				tanc: {
					zj: '',
					title: '',
					data: {},
				},
				csad: '',
				video: '',
				form: {
					title:''
				},
				navson: 0,
				navs: [{
						n: '媒体',
						icon: 'nav_sp_ac.svg',
						zj: 'setMt'
					},
					{
						n: '音乐',
						icon: 'nav_yy.svg',
						zj: 'mp3List'
					}
				],
				navcoms: {
					zj: 'setMt',
					title: '',
					media: [],
					audio: [],
					imgs: [],
					maxTime: 0,
					bflist: [],
					decorates: [
						[],
					]
				},
				checkOn: {},
				crtc:{},
				kd: [1],
				fd_lave: 0,
				cans: '',
				isinit: 0,
				po: '',
				sfjb: 10,
				bof: 0,
				page: 1,
				wdk: 21,
				formData: {
					title: '',
					media: [],
				},
				tdStar: 0,
				onck: -1,
				cjzb: {
					x: 0,
					y: 0,
					w: 391,
					h: 695,
				},
			
				isCc2: '',
	
				tdjl: 0,
				fd: [{
						s: 1,
						jg: .1
					},
					{
						s: 2,
						jg: .2
					},
					{
						s: 10,
						jg: 1
					},
					{
						s: 60,
						jg: 60
					},
					{
						s: 120,
						jg: 120
					},
				],
				fdjb: 10,
				tipszb: {
					x: 0,
					y: 0
				},
				bl: 1,
				ht: '',
				isdra: '',
				Mos: '',
				ajaxType: '',
				issvd: '',
				zsgd: {},
				bfTime: 0,
				isgdon: 0,
				imgPftime:0,
				istitle:'',
				
				playT:0,
				adiT:0,
				isk:0,
				valObj:'',
				valTime:0,
				bfObj:'',
				psd:'',
				IsShowStyle:false,
				indexstyle:0,
				bfMax:0,
				
				previewSatae:0,
				/*预览对象*/
				preview:{
					/*state 0停止；1播放中；2暂停*/
					state:0,
					previewObj:{},
					maxTime:0,
					onTime:0,
					duration:0,
				},
				xstd:''
			}
		},
		mounted: function() {
			this.init();
		},
		beforeDestroy:function(){
			/*清除事件监听*/
			window.removeEventListener('resize',this.setVwh);			
			document.removeEventListener('keydown',this.LineKey);
			window.removeEventListener('click',this.clickfns);		
			this.$refs.gdbox.removeEventListener('mousewheel',this.LineWheel);
			this.$refs.vids.removeEventListener('play',this.LinePlay);
			this.$refs.vids.removeEventListener('pause',this.LineClerDrm);
			this.$refs.vids.removeEventListener('ended',this.LineClerDrm);
			this.puandFn();
		},
		watch: {
			fdjb() {
				this.bl = this.fdjb / 10;
			},
			'form.title'(a){
				if(a.length>20){
					this.form.title = a.substring(0,20);				
				}
			},
			bfTime(a){
				if(a<0){
					this.preview.onTime = 0;
				}
			},
			'preview.state'(newD,oldeD){
			
				switch(newD) {
				     case 1:
						this.playPreview();
						break;
				     case 2:
				        this.puandFn();
						break;
				} 
				
			},
		},
		methods: {
			clickfns(e){
				if(this.checkOn.list){
					if(!this.checkOn.ison){
						this.checkOn.ison = 1;
						return
					}
					this.checkOn.list[this.checkOn.on].ischeck='';
					this.checkOn = {};
				}
				
				
			},
			setHidmg(el){
				return "width:" + (el.long / this.bl) * this.wdk + "px;transform:translateX(" + -((el.cut_start /
					this.bl) * this.wdk) + "px);";
				 
			},
			setPreviewState(n){
				this.preview.state = n;
			},
			setPreviewData(n,v){
				this.preview[n] = v;
			},
			newplayPreview(){
				this.preview.onTime = 0;
				this.preview.state = 2;
				setTimeout(()=>{
					this.preview.state = 1;
				},20)
			},
			playd(){
				if(this.preview.state==0 && this.preview.onTime>=this.preview.maxTime){
					this.preview.onTime = 0;
				}
				if(this.preview.state==1){
					this.preview.state = 2;
				}else{
					this.preview.state = 1;
				}
			},

			playPreview(a){
			
				if(this.navcoms.media.length==0){
					this.$message({
						message:'请先添加内容'
					})
					return
				}
				if(this.$refs.setAdios){
					this.$refs.setAdios.pause();
				}
				
				if(this.$refs.vid && this.$refs.vid.setRun){
					this.$refs.vid.setRun();
				}
				
				if(a){
					this.preview.state = 2;
					this.puandFn();
					return 
				}
				this.preview.state = 1;
				this.setPreviewObj();
				let bfObj = this.preview.previewObj;
				this.preview.state=1;
							
				if(bfObj.type=='null'){
					this.drmNull(bfObj);
					return
				}
				if(bfObj.type=='pic'){
					this.drmImg(bfObj);
					return
				}				
				if(!this.$refs.vids){
					return
				}
			
				if(this.$refs.vids.src!=bfObj.file_url){
					
					this.$refs.vids.src=bfObj.file_url;	
				}
				
				let onto = (this.preview.onTime - bfObj.start)+bfObj.cut_start;
				
				if(this.$refs.vids.currentTime!=onto){
				
					this.$refs.vids.currentTime = onto;
				}
				this.$refs.vids.pause();
				setTimeout(()=>{
					this.$refs.vids.play();
				},10)
					
				
				
						
			},
			puandFn(){
			
				if(this.preview.state==1){
					this.preview.state=2;
					return
				}
				this.stopDr();
				if(this.$refs.vids && !this.$refs.vids.paused){
					this.$refs.vids.pause();					
				}
				if(this.$refs.aido && !this.$refs.aido.paused){
					this.$refs.aido.pause();
				}
			
			},	
			setPreviewTimes(el,type,isdur){
				if(this.preview.state==1){
					this.setPreviewState(2);
				}			
				let maxt = 0;
				if(el){
					maxt = this.backTim(el);
					if(maxt>this.preview.maxTime){
						if(type!='audio'){
							this.preview.maxTime = maxt;
						}												
					}
					if(isdur && maxt>this.preview.duration){
						this.preview.duration = maxt;
					}					
					return
				}
				let time = 0;				
				if(type=='media' || type=='del'){
					let mediaArry = this.navcoms.media,
					len1 = mediaArry.length;
					if(len1>0){
						time = this.backTim(mediaArry[len1-1]);
					}
					
				}
				if(type=='decorates' || type=='del'){
					let decoratesArry = this.navcoms.decorates;
					for(let i =0,n=decoratesArry.length;i<n;i++){
						let nd = decoratesArry[i];
						for(let i2=0,n2=nd.length;i2<n2;i2++){
							let tim = this.backTim(nd[i2]);
							if(tim>time){
								time = tim;
							}
						}
					}					
				}
				this.preview.maxTime = time;
				if((type=='audio' || type=='del') && isdur){
				
					let audioArry = this.navcoms.audio,
					len2 = audioArry.length;
					if(len2>0){
						let tim = this.backTim(audioArry[len2-1]);
						if(tim>time){
							time = tim;
						}
					}					
				}
				if(isdur){
					this.preview.duration = time;
				}
				
			},			
			setPreviewObj(){
				
				let pd = this.navcoms.media,on=0,len = pd.length,	
				obj = {};
				var fn = ()=>{
					let onT = this.preview.onTime;
					if(!pd[on]){
						obj = {type:'null',end:this.preview.maxTime};
						return
					}
					if(onT<pd[on].start){
						obj = {type:'null',end:pd[on].start};
						return
					}
					let end = this.backTim(pd[on]);
					if(this.preview.onTime<end){
						obj = pd[on];
						return 
					}
					on++;
					fn();			
				}
				fn();
				this.preview.previewObj = obj;		
			},			
			setCheckOn(obj){
				if(this.checkOn.list){
					this.checkOn.list[this.checkOn.on].ischeck='';
				}
				this.checkOn = obj;
				this.checkOn.list[this.checkOn.on].ischeck=1;
			},
			settoll(e){
				e.preventDefault();
				e.currentTarget.className = 'setToll setToll_active'
			},
			settoll1(e){
				e.preventDefault();
				e.currentTarget.className = 'setToll'
			},
			drmvideo(a){
				this.drmBg();
				this.cans.drawImage(this.$refs.vids,a.sx,a.sy,a.sw,a.sh,a.x,a.y,a.w,a.h);
			},
			drmOn(){
				this.setPreviewObj();
			
				let obd = this.preview.previewObj;
			
				if(!obd || obd.type=='null'){
					this.drmBg();
					return
				}
				if(obd.type=='video'){
					
					clearTimeout(this.valObj);
					this.$refs.vids.src=obd.file_url;	
					this.$refs.vids.currentTime = this.backto((this.preview.onTime - obd.start)+obd.cut_start);
				
					let fns = ()=>{
						this.drmvideo(obd);
						removeEventListener('loadeddata',fns);
					};
					this.$refs.vids.addEventListener('loadeddata',fns);
				
					return
				}
				if(obd.type=='pic'){
					this.drmBg();
					let a = document.createElement('img');
					a.src = obd.file_url;
					a.onload = () => {
						this.drmBg();
						this.cans.drawImage(a,obd.sx,obd.sy,obd.sw,obd.sh,obd.x,obd.y,obd.w,obd.h);
					}
					return
				}
				
				
			},			
			/*暂停播放*/
			kdClick(e){
				this.puandFn2()
				e.preventDefault();			
				this.preview.onTime = this.getMousTime(e);
				this.drmOn()
			},	
			getMousTime(e){		
				let dd =(e.x-120)/ (this.wdk / this.bl);				
				if(dd<0){dd=0}
				return dd;
			},		
			todTime(e) {
				e.preventDefault();
				let tdStar = e.pageX;
				let cs = this.preview.onTime;
				this.puandFn2()
				document.onmousemove = document.onmouseup = null;
				document.onmousemove = (e) => {
					e.preventDefault();
					let on = -(tdStar - e.pageX) / (this.wdk / this.bl);			
					let dd = +cs + on;
					if(dd<0){dd=0}
					this.preview.onTime = dd;
					
				}
				document.onmouseup = (e) => {
					e.preventDefault();
					this.drmOn()
					document.onmousemove = document.onmouseup = null;
				}
			},
			newPlay(){
				if(this.navcoms.media.length==0){
					this.$message({
						message:'请先添加内容'
					})
					return
				}
				if(this.$refs.setAdios){
					this.$refs.setAdios.pause();
				}
				
				if(this.$refs.vid && this.$refs.vid.setRun){
					this.$refs.vid.setRun();
				}
				this.bfMax = this.getSc();
				this.puandFn();
				this.preview.onTime = 0;
				this.playT = 0;
				this.playVideo();
			},
			stopDr(){
				clearInterval(this.valObj);
			},			
		
			puandFn2(){
				this.puandFn();
				
			},
			/*播放相关*/
								
			backPlayVideo(){
				let pd = this.navcoms.media;
				let on=0;			
				let len = pd.length;
				let obj = {type:'null',end:this.bfMax};
				if(len==0){
					return obj;
				}
				var fn = ()=>{
					let end = this.backTim(pd[on]);
					
					if(this.preview.onTime>=pd[on].start && this.preview.onTime<end){
						obj = pd[on];
						return 
					}
					
					
					on++;
					if(!pd[on]){						 
						return ;
					}
					if(this.preview.onTime<pd[on].start){
						obj = {type:'null',end:pd[on].start};
						return
					}
					fn();			
				}
				fn();
				return obj;
			},		
			/*播放视频*/
			playVideo(){
				let len = this.navcoms.media.length;
				if(len==0){
					this.puandFn();
					this.drmBg();					
					this.playT = 0;
					return;
				}
				this.bfObj = this.backPlayVideo();
			
				if(!this.bfObj){
					return
				}
				this.playT = 1;
				if(this.bfObj.type=='null'){
					this.drmNull(this.bfObj);
					return
				}
				if(this.bfObj.type=='pic'){
					this.drmImg(this.bfObj);
					return
				}				
				if(!this.$refs.vids){
					return
				}
				if(this.$refs.vids.src!=this.bfObj.file_url){
					this.$refs.vids.src=this.bfObj.file_url;	
				}
				this.$refs.vids.currentTime = (this.preview.onTime - this.bfObj.start)+this.bfObj.cut_start;
				
				this.$refs.vids.play();
			},
			drmNull(onBj){
				if(!onBj){return}
				let ontim = this.preview.onTime;
				let vtime = 0;
				this.videoPn();
				this.drmBg();	
				this.valObj = setInterval(() => {
					this.checkAdio();
					vtime+=.05;
																					
					this.preview.onTime = ontim+vtime;
					if (this.preview.onTime >= onBj.end) {
						this.preview.onTime = onBj.end;
							clearTimeout(this.valObj);					
							this.endeds();					
						}
				}, 50);
			},
			videoPn(){
				clearInterval(this.valObj);
				if(this.$refs.vids){
					this.$refs.vids.pause();
				}
			},
			/*检测是否是图片*/
			drmImg(onBj) {
				let a = document.createElement('img'),			
				ontim = this.preview.onTime,
				vtime = 0;
				a.src = onBj.file_url;	
				let end = this.backTim(onBj);
				a.onload = () => {
					this.drmBg();
					this.cans.drawImage(a,onBj.sx,onBj.sy,onBj.sw,onBj.sh,onBj.x,onBj.y,onBj.w,onBj.h);
					this.valObj = setInterval(() => {					
						vtime = vtime + .05;			
						this.preview.onTime = ontim+vtime;
						this.checkAdio();
						if (this.preview.onTime>=end){
							clearTimeout(this.valObj);	
							this.preview.onTime = end;
							this.endeds();						
						}
					}, 50);
				}
			},
			
			playAdio_d(){
				let onBj = this.navcoms.audio[0];
				if(!onBj){
					return
				}		
				if(!this.$refs.aido){
					return
				}
				if(this.$refs.aido.src!=onBj.file_url){
					this.$refs.aido.src=onBj.file_url;
				}
				if(!this.$refs.aido.paused){
					return
				}	
				
				this.$refs.aido.currentTime =this.preview.onTime-onBj.start+onBj.cut_start;
				this.$refs.aido.play();
			},
			/*检测是否播放音乐*/
			checkAdio(){
				if(this.preview.state!=1){
					return
				}
				let ado = this.navcoms.audio[0];
				if(!ado){
					return
				}
				let end = this.backTim(ado);
				
				if(this.preview.onTime<ado.start || this.preview.onTime>end){
					return
				}
			
				this.playAdio_d();						
			},
	
			/*绘制黑色背景*/
			drmBg(){
				this.cans.fillStyle = "#000";
				this.cans.fillRect(0,0,this.boxW,this.boxH);						
			},
			
			endeds() {
				
				if(this.preview.onTime<this.preview.maxTime){
					
					this.playPreview();
					return
				}
				this.setPreviewState(0);				
			},
			playSc(){
				let ontim = this.preview.onTime;
				let vtime = 0;
				this.puandFn();
				this.playT=1;
				this.drmBg();	
				this.valObj = setInterval(() => {
					
					this.checkAdio();
					vtime+=.05;
					this.preview.onTime = ontim+vtime;
					if (this.preview.onTime >= this.bfMax) {
						this.preview.onTime = this.bfMax;
							clearTimeout(this.valObj);					
							this.endeds();					
						}
				}, 50);				
			},
			getSc(){
				let len1 = this.navcoms.media.length;
				let maxTime =0;
				if(len1>0){
					maxTime = this.backTim(this.navcoms.media[len1-1]);
				}
				for(let i=0,n=this.navcoms.decorates.length;i<n;i++){
					let ob = this.navcoms.decorates[i];
					for(let i2=0,n2=ob.length;i2<n2;i2++){
						let maxd =  this.backTim(ob[i2]);
						if(maxd>maxTime){
							maxTime = maxd;
						}
					}
					
				}
				
				return maxTime;
			},
			timeupdatevideo() {
				this.checkAdio();
				// let onT = this.$refs.vids.currentTime;						
				// onT = onT?onT:0;
				
				// if (onT >= this.preview.previewObj.cut_end) {
				// 	this.endeds();
					
				// }
			},
			timeupdatevideo2(){
				let objd = this.navcoms.audio[0],
				adioTim = this.backTim(objd),
				ontime = this.$refs.aido.currentTime;				
				let sjTim = ontime - objd.cut_start+objd.start;
				if(ontime>=objd.cut_end){
					this.$refs.aido.pause();
					return
				}				
				if (sjTim >= this.preview.maxTime){
					this.$refs.aido.pause();					
				}
			},

			playAdio(t){
				if(t.url){
					this.$refs.setAdios.src = t.url;
				}
				if(!this.$refs.setAdios.src){
					return
				}
				if(t.time){
					this.$refs.setAdios.currentTime = t.time;
				}
				
				
				this[t.type](this.$refs.setAdios)
			},
			
			playFn(obj){
				if(this.preview.state==1){
					this.setPreviewState(2);
				}
				if(obj){
					obj.play();					
				}
				
				
			},
			pauseFn(obj){
				if(obj){
					obj.pause();
				}
				
				if(this.$refs.vid && this.$refs.vid.setRun){
					this.$refs.vid.setRun();
				}
				
			},
			setcurrentTime(t){
				this.$refs.setAdios.currentTime = t;
			},
			setAdioLad(){
				if(this.$refs.vid && this.$refs.vid.setTime){
					this.$refs.vid.setTime(this.$refs.setAdios.currentTime);
				}
			},
			setendAudio(){
				if(this.$refs.vid && this.$refs.vid.ended){
					this.$refs.vid.ended();
				}
			},
			backbft(){
				return 'transform: translateX('+((this.preview.onTime/this.bl) * this.wdk)+'px);';
			},
			LineKey(e){
				let ctrlKey = e.ctrlKey || e.metaKey,
				shiftKey = e.shiftKey;				
				if(ctrlKey && e.keyCode==67){
					e.preventDefault();						
				}			
				if(ctrlKey && e.keyCode==86){
					e.preventDefault();
				}
				if(this.checkOn.list && e.keyCode === 8) {
					e.preventDefault();
					this.delt()
				
					return
				}
				if (e.keyCode == 32) {
					e.preventDefault()
					this.playd();
					return
				}
			},
			LineWheel(e){
				e = e || window.event;
				let ctrlKey = e.ctrlKey || e.metaKey,
				shiftKey = e.shiftKey;
				if(!ctrlKey && !shiftKey){
					return
				}
				e.preventDefault();
				
				
				let pd = 0;
				let maxd = this.$refs.qyBox.offsetWidth;
				let len = this.$refs.gund_01x.offsetWidth;
				let bl = len / maxd;
				pd = (maxd - len) * bl;
				var kd = e.wheelDelta ? e.wheelDelta : e.detail;
				if (kd > 0) {	
					if (ctrlKey && this.fdjb > 1) {							
						
						this.fdjb--;						
					}
					if (shiftKey) {
						let ond = this.tdjl-30;				
						this.tdjl = ond<0?0:ond;
					
					}
				}
				if (kd < 0) {
					if (ctrlKey && this.fdjb < 120) {
						this.fdjb++;	
					
					}
					if (shiftKey) {		
						let ond = this.tdjl+30;												
						if(ond>pd){
							ond = pd;
						}
						this.tdjl = ond;	
					
					}
				}
			},
			
			LineClerDrm(){
				window.clearInterval(this.po);
			},
			titlon(on){
				this.istitle = on;
			},
			
			gdfn(ev) {
				this.$refs.gd_02.scrollTop = ev.target.scrollTop;
			},
			bckti(t) {

				var f = '00',
					s;
				if (t >= 60) {
					f = parseInt(t / 60);
					if (f < 10) {
						f = '0' + f;
					}
				}
				s = parseInt(t % 60);
				if (s < 10) {
					s = '0' + s;
				}
				return f + ':' + s;
			},
			showDevs(on, on1) {
				this.zsgd = this.navcoms.decorates[on][on1];

			},
			delevd(){
				if(this.navcoms.decorates.length==1){
					return
				}				
				this.zsgd = this.navcoms.decorates.splice(this.zsOn,1);
			},
			adddevd() {
				this.navcoms.decorates.push([]);		
			},
			savsout() {
				return
				clearTimeout(this.issvd);
				this.issvd = setTimeout(() => {
					if (this.$route.path != '/pushTool') {
						return
					}
					this.tijF(1);
					this.savsout();
				}, 60000);
			},
			showZs(e,b){
				let dom = e.target.getBoundingClientRect();
				this.zsys = 'display:block;top:' + (e.y - 5) + 'px;left:' + (e.x - 22) + 'px';
				this.zsOn = b;
				let fn = () => {
					setTimeout(() => {
						this.zsys = '';
					}, 100)
				};
				this.clerClick(fn)
			},
			contexMs(e, b) {
			
				if (e.button == "2") {
					e.preventDefault();
					let dom = e.target.getBoundingClientRect();

					if (b) {
						this.setCheckOn(b)						
					}

					this.csad = 'display:block;top:' + (e.y - 5) + 'px;left:' + (e.x - 22) + 'px';
					let fn = () => {
						setTimeout(() => {
							this.csad = '';
						}, 100)
					};
					this.clerClick(fn)
				}
			},
			setMos(on,e) {
				if(e){
					on.y = e.target.getBoundingClientRect().y;
				}
				
				this.Mos = on;
				
			},
			tochs() {
				this.isdra = 1;

			},
			toche() {
				this.isdra = '';
			},
			backs() {
				this.$router.push({
					path: '/toluser'
				});
			},
			bgtf(el,a) {
				if (!el) {
					return
				}
				let url = el.type == 'pic' ? el.file_url : el.fps_pic;
				let xd = -(el.cut_start/this.bl*this.wdk);
				
				
				return "background:url(" + url + ") "+xd+"px 0/auto 100% repeat-x";
				
			},
			baclsf() {
				let max = 64;
				return "transform: translateX(" + (this.fdjb / 120) * max + "px);";
			},
			showTip() {
				this.tanc = {
					zj: 'tips'
				}
			},
			addms() {
				if (this.fdjb < 120) {
					this.fdjb++;
				}
			},
			jms() {
				if (this.fdjb > 1) {
					this.fdjb--;
				}
			},
			tdfn() {
				if (!this.$refs.gund_01x) {
					return
				}
				let maxd = Math.ceil(this.preview.maxTime / this.fdjb) * 210;
				let len = this.$refs.gund_01x.offsetWidth;
				let bl = len / maxd;


				let pd = len / maxd;

				if (pd > 1) {
					pd = 1;
				}
				pd = pd * 100;

				return "width:" + pd + "%;transform: translate(" + this.tdjl + "px,-50%);";
			},
			bal() {
				if (!this.$refs.gund_01x) {
					return
				}
				let maxd = Math.ceil(this.preview.maxTime / this.fdjb) * 210;
				let len = this.$refs.gund_01x.offsetWidth;
				let pd = maxd / len;

				return "transform: translateX(" + -(this.tdjl * pd) + "px);";
			},
			qhcc2(on) {
				this.vdcc2 = on;
				setTimeout(() => {
					this.isCc2 = '';
				}, 50)

			},
			clickfn(fn) {
				if (!this[fn]) {
					return
				}
				this[fn]();
			},
			showCc(e) {
				if (e && e.stopPropagation()) {
					e.stopPropagation();
				} else {
					e.cancelBubble = false;
				}
				if (this.isCc == 1) {
					return
				}
				this.isCc = 1;
				document.onclick = () => {
					this.isCc = '';
					document.onclick = null;
				}
			},
			showCc2(e) {
				if (e && e.stopPropagation()) {
					e.stopPropagation();
				} else {
					e.cancelBubble = false;
				}
				if (this.isCc2 == 1) {
					return
				}
				this.isCc2 = 1;
				document.onclick = () => {
					this.isCc2 = '';
					document.onclick = null;
				}
			},
			close() {
				this.istype = '';
			},
			
			jlx2(e) {
				e.preventDefault();

				let tdStar = e.pageX;
				let mv = this.fdjb;
				document.onmousemove = document.onmouseup = null;
				document.onmousemove = (e) => {
					e.preventDefault();
					let on = Math.round((e.pageX - tdStar) * 100) / 100 + mv;
					if (on < 1) {
						on = 1;
					}
					if (on > 120) {
						on = 120;
					}

					this.fdjb = on;
				}
				document.onmouseup = () => {
					document.onmousemove = document.onmouseup = null;
				}
			},
			jlx(e, el, index, list) {
				e.preventDefault();
				if (!this.$refs.gund_01x) {
					return
				}
				let tdStar = e.pageX;				
				let maxd = this.$refs.qyBox.offsetWidth;
				let len = this.$refs.gund_01x.offsetWidth;
				let bl = len / maxd;
				let pd = (maxd - len) * bl;
				let mv = this.tdjl;
				document.onmousemove = document.onmouseup = null;
				document.onmousemove = (e) => {
					e.preventDefault();
					let on = Math.round((e.pageX - tdStar) * 100) / 100 + mv;
					if (on > pd) {
						on = pd;
					}
					if (on < 0) {
						on = 0;
					}
					this.tdjl = on;
				}
				document.onmouseup = () => {
					document.onmousemove = document.onmouseup = null;
				}
			},

			jl(e, el, index, list, n) {
				e.preventDefault();

				this.setCheckOn({
					type: n,
					on: index,
					list:list,
				})
					
				let startX = e.pageX,
				oldCut_end = el.cut_end,
				max = el.type == 'pic'?999999:el.long,
				min = el.cut_start + .1;	
				document.onmousemove = document.onmouseup = null;
				document.onmousemove = (e) => {
					e.preventDefault();
					let on = -(startX - e.pageX) / (this.wdk / this.bl);

					let pn = +oldCut_end + on;
					if (+pn > max) {
						pn = max;
					}
					if (pn < min) {
						pn = min;
					}
					el.cut_end = pn;
					this.setHm(index, el, list);
				}
				document.onmouseup = () => {
					document.onmousemove = document.onmouseup = null;
					this.puandFn();
					this.setPreviewTimes('','del');				
					this.drmOn();
				}
			},
			setHm(on, el, list) {
				for (let i = on, n = list.length; i < n; i++) {
					let ond = this.backTim(list[i]);
					if (list[i+1] && list[i+1].start<ond) {
						list[i+1].start = ond;
					}

				}

			},
			jl3(e, el, onc, list, n) {
				e.preventDefault();
				this.IsShowStyle = true;
				this.setCheckOn({
					type: n,
					on: onc,
					list:list,
				})				
				let tdStar = e.pageX;
				let cs = el.start;
				let wid = el.long * this.wdk;
				let ond = onc - 1;
				let ondn = onc + 1;
				let tms = el.cut_end - el.cut_start;				
				let prEnd, prStar, nxEnd, nxStar;
				let prd = list[ond];
				if (prd) {
					prEnd = +prd.start + (prd.cut_end - prd.cut_start);
					prStar = prd.start;
				}
				let nxd = list[ondn];
				if (nxd) {
					nxEnd = +nxd.start + (nxd.cut_end - nxd.cut_start);
					nxStar = nxd.start;
				}
				document.onmousemove = document.onmouseup = null;
				document.onmousemove = (e) => {
					e.preventDefault();
					let on = -(tdStar - e.pageX) / (this.wdk / this.bl);
					let dd = +cs + on;					
					if (prd && dd < prEnd) {
						dd = prEnd;
					}
					if (nxd && (dd + tms) > nxStar) {
						dd = nxStar - tms;
					}
					if (dd < 0) {
						dd = 0;
					}
					el.start = dd;
				}
				document.onmouseup = (e) => {
					e.preventDefault();
					document.onmousemove = document.onmouseup = null;
					let xs = tdStar - e.pageX;
					if(xs<20 && xs>-20){
						return
					}
					
					this.checkOn.list[this.checkOn.on].ischeck = '';
					let ont = this.getMousTime(e);
	
					if (prStar || prStar == 0) {
						if (ont <= (prStar+(prEnd-prStar)/2)) {
							list[onc].start = list[ond].start;
							list[ond].start = this.backTim(list[onc]);
							list.splice(ond,2,list[onc], list[ond]);
							this.checkOn.on = ond;
						}
					}
					if (nxStar || nxStar == 0) {
						if (ont >= nxStar+((nxEnd-nxStar)/2)) {
							list[ondn].start = list[onc].start;
							list[onc].start = this.backTim(list[ondn]);
							list.splice(onc, 2, list[ondn], list[onc]);						
							this.checkOn.on = ondn;							
						}						
					}					
					this.checkOn.list[this.checkOn.on].ischeck = 1;
					this.puandFn();
					this.setPreviewTimes('','del');				
					this.drmOn();
					this.IsShowStyle = false;					
				}
			},
			jl2(e, el, index, list, n) {
				e.preventDefault();
				this.setCheckOn({
					type: n,
					on: index,
					list:list,
				})			
				let startX = e.pageX,
				oldStart = el.start,
				oldCut_start = el.cut_start,
				max = el.cut_end-.1,
				min = 0;	
				if(list[index-1]){
					let po2 =  this.backTim(list[index-1]); 
					let po3 = oldStart-po2;
					if(po3<oldCut_start){
						min = oldCut_start-po3;
					}
				}
				document.onmousemove = document.onmouseup = null;
				document.onmousemove = (e) => {
					e.preventDefault();
					let on = -(startX - e.pageX) / (this.wdk / this.bl);
					let pn = (+oldCut_start + on);
					if (+pn < min) {
						pn = min;
					}
					if (+pn > max) {
						pn = max;
					}

					el.cut_start = pn;
					el.start = oldStart + (pn-oldCut_start);
				}
				document.onmouseup = () => {
					document.onmousemove = document.onmouseup = null;
					this.puandFn();
					this.setPreviewTimes('','del');					
					this.drmOn();				
				}
			},
			setDomStar(x){							
				return ((x-120)/this.wdk)*this.bl;				
			},
			zzyz() {
			
				if (this.navcoms.media.length == 0) {
					this.$message({
						message: '请先上传并添加媒体素材至轨道'
					})
					return
				}
				if (this.navcoms.audio.length == 0) {
					this.$message({
						message: '请先选择音乐'
					})
					return
				}
				let len = this.navcoms.media[this.navcoms.media.length - 1];
				let ent = +len.start + (+len.cut_end - len.cut_start);
				let firs = this.navcoms.media[0].start;

				if (firs != 0) {
					this.$message({
						message: '你的开头部分没有填充媒体是素材，请确保视频从00:00开始播放'
					})
					return
				}
				
				let len1 = this.navcoms.media.length;
				let len2 = this.navcoms.decorates.length;
				let maxTime =0;
				if(len1>0){
					maxTime = this.backTim(this.navcoms.media[len1-1]);
				}
				if(len2>0){
					let len3 = this.navcoms.decorates[len2-1].length;
					let onbj = this.navcoms.decorates[len2-1][len3-1];
					if(onbj){
						let zst = this.backTim(onbj);						
						maxTime = zst>maxTime?zst:maxTime;
					}	
				}
				if(maxTime>120){
					this.$message({
						message:"来电秀内容的媒体剪辑时长不得超过120秒"
					})
					return;
				}
				
				let ant = this.navcoms.audio[this.navcoms.audio.length - 1];
				let ant_t = +ant.start + (+ant.cut_end - ant.cut_start);
					
				if (ent != ant_t) {
					this.istype = {
						t: '提示',
						c1: '当前音频与视频时长不一致',
						c2: '来电秀时长以视频剪辑时长为准，建议将音乐与视频的时长裁剪一致，以保证效果',
						btnn: '直接提交',
						btnfn: 'zzwc',
					}

					return
				}
				
				
				
				if(this.checkOn.list){
					this.checkOn.list[this.checkOn.on].ischeck='';
				}
				
				this.checkOn = {};
				this.zzwc();
			},
			zzwc() {
				this.istype = '';
				this.tanc.zj = 'saves';
				this.tanc.title = this.form.title;
				if (this.form.id) {
					this.tanc.id = this.form.id;
				}
				this.tanc.json = {
					media: this.navcoms.media,
					audio: this.navcoms.audio,
					decorates: this.navcoms.decorates
				};

				this.tanc.maxTime = this.preview.maxTime;
			},
			pastes() {
				if(!this.checkOn.list){
					return
				}			
				let doms = JSON.parse(JSON.stringify(this.checkOn.list[this.checkOn.on]));
				let ends = this.checkOn.list[this.checkOn.list.length - 1];
				let sta = +ends.start + (ends.cut_end - ends.cut_start);
				doms.start = sta;
				doms.ischeck = '';
				this.checkOn.list.push(doms);
				if(this.playT==1 || this.playT==2){
					this.puandFn2()
				}
				this.setPreviewTimes('','del',1);
				this.drmOn();
			},
			cats() {
				if (!this.checkOn.list) {
					return
				}
				this.puandFn2();
				this.tanc = {
					zj: 'cat',
					title: '',
					data: this.checkOn.list[this.checkOn.on]
				};
			},
			delt() {
			
				if(this.tanc.zj == 'saves'){
					return
				}
				
				if (!this.checkOn.list) {
					return
				}	
				let onsd = this.checkOn.list[this.checkOn.on];
				if(!onsd){
					return
				}
				this.puandFn2();
				let maxt = this.backTim(onsd);
				if(this.preview.onTime>=onsd.start && this.preview.onTime<maxt){
					this.drmBg();
				}			
				this.checkOn.list.splice(this.checkOn.on,1);				
				this.checkOn = {};	
				this.setPreviewTimes('','del',1);
				if(this.navcoms.media.length==0){
					this.preview.onTime = 0;
				}
			},
			setMaxTime(el,jq) {
				let maxt = 0;
				let times = 0;
				if(el){
					maxt = this.backTim(el);
				}else{
					let len1 = this.navcoms.media.length,
					len2 = this.navcoms.audio.length,
					len3 = this.navcoms.decorates.length;
					
					if(len1>0){
						times = this.backTim(this.navcoms.media[len1-1]);
					}
					if(len2>0){
						let tim = this.backTim(this.navcoms.audio[len2-1]);
						times = tim>times?tim:times;
					}
					if(len3>0){
						for(let i=0;i<len3;i++){
							let obj = this.navcoms.decorates[i];
							for(let i2=0,n=obj.length;i2<n;i2++){
								let tim = this.backTim(obj[i2]);
								times = tim>times?tim:times;
							}							
						}
						
					}
				}
				maxt = times>maxt?times:maxt;
				
				if(maxt>this.preview.maxTime){
					this.preview.maxTime = maxt;
				}	
							
				if(jq){
					this.preview.maxTime = maxt;
				}			
			},
			backTim(ob) {
				return (ob.cut_end - ob.cut_start) + ob.start;
			},
			backd() {
				let str = '<span class="kd_02"><span>00:00:00:00</span></span>';
				let tins = this.preview.maxTime;
				if (tins < 120) {
					tins = 120;
				}
				let nd = Math.ceil(tins / this.fdjb)+1;
				if(nd<13){
					nd = 13;
				}
				for (let i = 0, n = nd; i < n; i++) {
					str += '<div class="kdut_1">';
					for (let i2 = 0; i2 < 9; i2++) {
						str += '<span></span>';
					}
					str += '<span class="kd_02"><span>' + this.tutime(this.fdjb * (i + 1)) + '</span></span>';
					str += '</div>';
				}
				return str;
			},
			tutime(t) {
				var h = 0,
					m = 0,
					s = 0,
					om = 0;
				s = t % 60;
				if (t >= 60) {
					m = (t - s) / 60;
					om = m % 60;
				}
				if (m >= 60) {
					h = (m - om) / 60;
				}
				return this.optu(h) + ':' + this.optu(om) + ':' + this.optu(s);
			},
			optu(n) {
				return n > 9 ? n : '0' + n;
			},
			backtop(el) {

				let str = "width:" + ((el.cut_end - el.cut_start) / this.bl) * this.wdk + "px;transform:translateX(" + ((el.start /
					this.bl) * this.wdk) + "px);";
				if (el.ischeck) {
					str += 'z-index:2;';
				}
				return str;
			},
			setvideo(fi) {
				this.$refs.vids.src = fi;
			},
			csy() {
				
			},
			
			LinePlay(){
			
				clearTimeout(this.valObj);
				let ontime = this.preview.onTime;
				let toTim = 0;
				let endt = this.backTim(this.preview.previewObj);
				this.valObj = window.setInterval(() => {
					
					if(this.preview.previewObj.type!='video'){
						window.clearInterval(this.valObj);
					}	
					this.checkAdio();
					toTim+=.05;		
					let ob = this.preview.previewObj;
					this.drmvideo(ob);
					let po = this.cun[this.vdcc].x;
					if (po) {
						this.cans.fillRect(0, 0, po, this.boxH);
						this.cans.fillRect(this.boxW - po, 0, po, this.boxH);
					}
					this.preview.onTime = ontime + toTim;
						
					let onT = this.$refs.vids.currentTime;
					
					onT = onT?onT:0;				
					
					if (this.preview.onTime >= endt) {
						clearTimeout(this.valObj);
						
						this.endeds()
					}	
						
				}, 50);
			

			},
			setVwh(){
				let domd = this.$refs.vidobox.getBoundingClientRect();							
				this.boxH = parseInt(domd.height);
				this.boxW = parseInt((domd.height/16)*9);
			},
			init() {
				if(!window.userInfo || window.userInfo.contributor_format_status != 2){
					this.$router.push({path: '/'})					
					return
				}
				
				this.setVwh();
				window.addEventListener('resize',this.setVwh,false);
				window.addEventListener('click',this.clickfns,false);
				
				this.zoomd = this.boxW/391;
				
				this.$refs.cavs.width = this.boxW;
				this.$refs.cavs.height = this.boxH;
				this.cans = this.$refs.cavs.getContext("2d");
				this.cans.fillStyle = "#000";
				this.cans.fillRect(0, 0, this.boxW, this.boxH);
				if (this.$route.query.id) {
					let op = JSON.parse(localStorage.getItem('ldxData'));
					if(!op){
						this.$router.push({path: '/'})	
						return
					}					
					this.form.title = op.title;
					if(op.json){
						let json = JSON.parse(op.json);
						let arr = [];
						for(let i =0,n=json.media.length;i<n;i++){
							if(json.media[i].type!="blank"){
								arr.push(json.media[i])
							}
						}
						this.navcoms.media = arr;
						let len = json.audio.length;
						if(len>1){
							json.audio = [json.audio[len-1]];
						}
						this.navcoms.audio = json.audio;
						if(json.decoration && json.decoration.length > 0) {
							let arr1 = [];
							for (let i = 0, n = json.decoration.length; i < n; i++) {
								if (!arr1[json.decoration[i].ond]) {
									arr1[json.decoration[i].ond] = [];
								}
								arr1[json.decoration[i].ond].push(json.decoration[i]);
							}
							this.navcoms.decorates = arr1;
						}
						
						if(this.navcoms.audio.length>0){
							this.sh_audioUrld(this.navcoms.audio[0]);
						}
					}
					this.form.id = op.id;
					this.setPreviewTimes('','del',1);
					this.drmOn();
				}
				this.savsout();				
				document.addEventListener('keydown',this.LineKey, false);
				this.$refs.gdbox.addEventListener('mousewheel', this.LineWheel, false)				
				this.$refs.vids.addEventListener('play',this.LinePlay, false);
				this.$refs.vids.addEventListener('pause',this.LineClerDrm, false);
				this.$refs.vids.addEventListener('ended',this.LineClerDrm, false);
				if (this.navcoms.media[0]) {
					this.setvideo(this.navcoms.media[0].file_url);
				}
			},
			cksd(){
			
			},
			qhNav(o, zj) {
				if (this.navson == o) {
					return
				}
				this.navson = o;
				this.navcoms.zj = zj;
			},
			showcj(e,b) {
				if (b) {
					this.checkOn = b;
					this.checkOn.list[this.checkOn.on].ischeck=1;
				}
		
				this.csad = 'display:block;top:' + (e.y - 5) + 'px;left:' + (e.x - 22) + 'px';
				let fn = () => {
					setTimeout(() => {
						this.csad = '';
					}, 100)
				};
				this.clerClick(fn)
			},
			clerClick(fn) {
				document.onclick = null;
				setTimeout(() => {
					document.onclick = () => {
						if (fn) {
							fn()
						}
						document.onclick = null;
					}
				}, 50)

			},
			sh_audioUrld(el){
				this.api.sh_audioUrl({
					m_id:el.fid
				}).then((da)=>{
					this.aaa='';
					if(da=='error'){return}			
					el.file_url = da.file_url;				
				})
			},
			cldevs(on) {
				let arr = [];
				let wdb = 1080 / this.boxW;
				let hy = 1920 / this.boxH;
				for (let i = 0, n = on.length; i < n; i++) {
					let ar = on[i];

					for (let i2 = 0, n2 = ar.length; i2 < n2; i2++) {
						ar[i2].ond = i;
						ar[i2].end = ar[i2].start + (ar[i2].cut_end - ar[i2].cut_start);
						if(ar[i2].zsx){
							ar[i2].x = this.backto(ar[i2].zsx * wdb);
						}
						if(this.backto(ar[i2].zsy * hy)){
							ar[i2].y = this.backto(ar[i2].zsy * hy);
						}
						
						
						ar[i2].resize = this.backto(ar[i2].zsw * wdb) + ':' + this.backto(ar[i2].zsh * hy);
						arr.push(ar[i2]);
					}
				}
				return arr;
			},
			backto(num) {
				return Math.round(num * 100) / 100
			},
			tijF(a) {
				if(!this.form.title){
					this.$message({
						message: '请填写来电秀名称',
					})
					return
				}
				if (this.preview.maxTime==0) {
					if (a) {
						return
					}
					this.$message({
						message: '请先添加内容',
					})
					return
				}
				if (this.ajaxType) {
					this.$message({
						message: '正在处理请稍后',
					})
					return
				}
				if(this.checkOn.list){
					this.checkOn.list[this.checkOn.on].ischeck = '';
				}
				
				let pr = {
					title: this.form.title,
					json: {
						media: this.navcoms.media,
						audio: this.navcoms.audio,						
					},
					
				};
				let sd = this.cldevs(this.navcoms.decorates);
				if (sd.length > 0) {
					pr.json.decoration = sd;
				}				
				this.cl_video(pr);
				this.cl_audio(pr);
				pr.json = JSON.stringify(pr.json);
				if (this.form.id) {
					pr.id = this.form.id;
				}
				this.ajaxType = 1;
				this.api.sh_save(pr).then((da) => {
					this.ajaxType = '';
					if (da == 'error') {
						return
					}
					this.form.id = da.id;
					pr.id = da.id;
					localStorage.setItem('ldxData', JSON.stringify(pr))
					this.$router.push({
						path: '/pushTool',
						query: {
							id: da.id
						}
					});
					if(a){return}
					this.$message({
						message: '保存成功',
					})
				}).catch(() => {
					this.ajaxType = '';
				})
			},
			cl_audio(el) {
				let pd = el.json.audio;
				let tims = 0;
				for (let i = 0, n = pd.length; i < n; i++) {
					let t = pd[i].cut_end - pd[i].cut_start;

					let ner = tims + t;
					if (ner > el.maxTime) {
						pd[i].cut_end = pd[i].cut_start + (el.maxTime - tims);
						break
					}
					pd[i].end = pd[i].start + (pd[i].cut_end - pd[i].cut_start);

				}
			},

			cl_video(el) {
				let pd = el.json.media;
				for (let i = 0, n = pd.length; i < n; i++) {
					pd[i].end = pd[i].start + (pd[i].cut_end - pd[i].cut_start);
					if (pd[i].sw != pd[i].yw || pd[i].sh != pd[i].yh || pd[i].sx != 0 || pd[i].sy != 0) {
						pd[i].crop = pd[i].sw + ':' + pd[i].sh + ':' + pd[i].x + ':' + pd[i].sy;
					}
				}
			},
		}
	}
</script>

<style>
	#app>div>div.ntob {
		padding: 0;
		min-height: 100%;
		overflow-y: hidden;
	}

	.ntob_head {
		position: absolute;
		min-width: 1300px;
		top: 0;
		left: 0;
		text-align: center;
		background: #fff;
		height: 48px;
		width: 100%;
		-webkit-box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
		box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
		z-index: 3;
	}

	.ntob_cent {
		position: absolute;
		min-width: 1300px;
		top: 48px;
		bottom: 264px;
		left: 0;
		right: 0;
		z-index: 2;
		box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
	}

	.ntob_cent>div {
		position: relative;
		display: inline-block;
		vertical-align: top;
		width: 50%;
		height: 100%;

	}
	.ntob_cent>div.ntob_cent_l{
		width: 50.5%;
	}
	.ntob_cent>div.ntob_cent_r{
		width: 49.5%;
	}
	.noto_back {
		text-align: left;
		cursor: pointer;
		position: absolute;
		left: 0;

		font-size: 14px;

		color: rgba(102, 102, 102, 1);
		line-height: 48px;
	}

	.noto_back>img {
		display: inline-block;
		vertical-align: top;
		margin: 17px 5px 0 24px;
	}

	.noto_title {
		display: inline-block;
		margin-top: 14px;
		line-height: 20px;
	}

	.noto_title>input {
		text-align: right;
		display: inline-block;
		vertical-align: top;
		border: none;
		background: none;
		font-size: 14px;
		color: rgba(30, 30, 30, 1);
		line-height: 20px;
	}

	.noto_btns {
		position: absolute;
		right: 20px;
		top: 8px;
	}

	.noto_btns>span {
		display: inline-block;
		vertical-align: top;
		cursor: pointer;
		width: 78px;
		height: 30px;
		background: rgba(255, 255, 255, 1);
		border-radius: 5px;
		border: 1px solid rgba(187, 187, 187, 1);
		font-size: 14px;
		text-align: center;
		color: rgba(102, 102, 102, 1);
		line-height: 30px;
		margin-left: 15px;
	}

	.noto_btns>span:hover {
		opacity: .7;
	}

	.noto_btns>.noto_bys {
		background: #33B3FF;
		border-color: #33B3FF;
		color: #fff;
	}

	.ntob_cent_r {
		background: #fff;
	}

	.videoBox {
		position: relative;
		display: block;
		margin: 0 auto;
		overflow: hidden;
	}

	.videoBox1 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.ntob_cent_l_1 {
		position: absolute;
		bottom: 0;
		left: 0;

		display: none;
	}

	.ntob_cent_r {
		position: relative;
		height: 769px;
		text-align: left;
	}

	.ntob_cent_r_2 {
		margin-left: 121px;
		height: 100%;
		overflow-x: hidden;
	}

	.ntob_cent_r_1 {
		position: absolute;
		top: 0;
		left: 0;
		border-right: 1px solid #F0F0F0;
		width: 120px;
		height: 100%;
	}

	.ntob_cent_r_1>span {
		cursor: pointer;
		position: relative;
		display: block;
		text-align: center;
		font-size: 18px;
		margin-top: 24px;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		line-height: 42px;
		overflow: hidden;
	}

	.ntob_cent_r_1>span.ckin,
	.ntob_cent_r_1>span:hover {
		background: rgba(51, 179, 255, .1);
	}

	.ntob_cent_r_1>span.ckin {
		font-size: 18px;
		font-weight: 500;
		color: rgba(51, 179, 255, 1);
	}

	.ntob_cent_r_1>span.ckin:after {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		background: #33B3FF;
		width: 2px;
		height: 100%;
	}

	.ntob_cent_r_1>span>img {
		display: inline-block;
		vertical-align: middle;
		margin-right: 5px;
	}

	.ntob_footer {
		position: absolute;
		bottom: 0;
		left: 0;
		min-width: 1300px;
		width: 100%;
		height: 264px;
		
	}

	.ntob_footer_1 {
		position: absolute;
		left: 0;
		top: 0;
		width: 120px;
		height: 100%;
		overflow: hidden;
		background: #fff;
		z-index: 1;
	}

	.ntob_footer_2 {
		position: absolute;
		right: 0;
		left: 120px;
		overflow: hidden;
		height: 100%;
		background: #fff;
	}

	.ntob_footer_2_1,
	.ntob_footer_1_1 {

		min-width: 100%;
		height: 52px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
	}

	.ntob_footer_2_1 {
		position: relative;
		text-align: left;

	}

	.kdut {
		margin-top: 32px;
		display: inline-block;
		border-bottom: 1px solid #DEE1E9;
		white-space: nowrap;
	}

	.kdut>span {
		display: inline-block;
		vertical-align: bottom;
		width: 1px;
		height: 8px;
		background: rgba(96, 98, 102, 1);

	}

	.kdut_1 {
		display: inline-block;
		vertical-align: bottom;
		margin-left: 10px;
	}

	.kdut_1>span {
		display: inline-block;
		vertical-align: bottom;
		width: 1px;
		height: 4px;
		background: rgba(222, 225, 233, 1);
		margin: 0 10px;
	}

	.kdut_1>span.kd_02 {
		width: 1px;
		height: 8px;
		background: rgba(96, 98, 102, 1);
	}

	.kdut_1>span:last-child {
		margin-right: 0;
	}

	.kd_02 {
		position: relative;
	}

	.kd_02>span {
		position: absolute;
		font-size: 14px;
		color: rgba(51, 51, 51, 1);
		line-height: 20px;
		bottom: 8px;
		left: 0;
	}

	.tlo_box {
		min-width: 100%;
		display: inline-block;
		position: relative;
	}

	.tlo_02 {
		position: relative;
		height: 72px;
		background: #F4F6F9;
		margin-bottom: 3px;
	}

	.tlo_03 {
		position: relative;
		height: 32px;
		background: #F4F6F9;
		margin-bottom: 3px;
	}

	.tlo_04 {
		position: relative;
		height: 72px;
		background: #F4F6F9;
		margin-bottom: 3px;
	}

	.gund_01 {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 153px;

		height: 24px;
		background: #E3E3E3;
	}

	.fdsx_01 {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 152px;
		height: 24px;
		background: #E3E3E3;
	}

	.gund_02 {
		cursor: pointer;
		position: absolute;
		top: 50%;
		left: 0;
		width: 20px;
		height: 8px;
		background: rgba(187, 187, 187, 1);
		border-radius: 4px;
		transform: translate(0, -50%);
	}

	.fdsx_01 {
		text-align: center;
	}

	.fdsx_01>span {
		display: inline-block;
		vertical-align: middle;
	}

	.fdsx_02 {
		cursor: pointer;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: rgba(96, 97, 101, 1);
		color: #E3E3E3;
		line-height: 12px;
	}

	.fdsx_03 {
		position: relative;
		width: 72px;
		height: 2px;
		background: rgba(187, 187, 187, 1);
		border-radius: 1px;
		margin: 0 4px;
	}

	.fdsx_06 {
		cursor: pointer;
		position: absolute;
		top: -3.5px;
		left: 0;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgba(51, 179, 255, 1);
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
	}

	.imgd {
		position: absolute;
		top: 0;
		left: 0;
		background: #839aba;
		height: 100%;
		background-position: 0;
		background-repeat: repeat-x;
		background-size: auto 100%;

	}
	.imgd:hover .setToll{
		border-color: rgba(51, 179, 255, 1);
		background-color: rgba(0, 0, 0, 0.3);
	}
	.imgd:hover .setToll2_1{
		visibility: visible;
	}
	.imgd:hover .setToll3_1{
		visibility: visible;
	}

	.setToll0>img {
		display: block;
		height: 100%;
		
	}
	.se10hid{
		position: relative;
		width: 100%;
		overflow: hidden;
		height: 100%;
	}
	.se10hid>img {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		height: 100%;
	}
	.setTollxx2 {
		cursor: pointer;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.setToll0 {
		width: 100%;
		height: 100%;
	
	}

	.setToll {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: 2px solid transparent;
	}

	/* .setToll:hover {
		border-color: rgba(51, 179, 255, 1);
		background-color: rgba(0, 0, 0, 0.3);
	}

	.setToll:hover .setToll4 {
		display: block;
	}

	.setToll:hover .setToll3_1 {
		visibility: visible;
	}

	.setToll:hover .setToll2_1 {
		visibility: visible;
	} */
	
	.setToll_active{
		border-color: rgba(51, 179, 255, 1);
		background-color: rgba(0, 0, 0, 0.3);
	}
	
	.setToll_active .setToll4 {
		display: block;
	}
	
	.setToll_active .setToll3_1 {
		visibility: visible;
	}
	
	.setToll_active .setToll2_1 {
		visibility: visible;
	}

	.ntob_cent_l_2 {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 74px;
		background: #fff;
	}

	.ntob_cent_l_2_1 {
		position: absolute;
		left: 23px;
		top: 25px;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 20px;
	}

	.ntob_cent_l_2_2 {
		text-align: center;
		font-size: 16px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 22px;
		padding-top: 24px;
	}

	.ntob_cent_l_2_3 {
		position: absolute;
		right: 16px;
		top: 25px;
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 20px;
	}

	.ntob_cent_l_2_2>span {
		display: inline-block;
		vertical-align: top;
	}

	.an_sx_01 {
		width: 22px;
		height: 22px;

		margin-right: 16px;
	}

	.an_sx_01>img,
	.an_bf_01>img {
		cursor: pointer;
		display: block;
		width: 18px;
	}

	.an_bf_01 {
		margin-right: 16px;
		width: 22px;
		height: 22px;
	}

	.tme_091 {
		font-size: 16px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(143, 147, 153, 1);
		line-height: 22px;
	}

	.setToll1 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		cursor: move;
	}

	.setToll2 {
		position: absolute;
		top: 0;
		left: 0px;
		width: 10px;
		height: 100%;
		cursor: col-resize;
	}

	.setToll2_1 {
		width: 6px;
		height: 24px;
		background: rgba(51, 179, 255, 1);
		box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		position: absolute;
		left: -4px;
		top: 22px;
		visibility: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.setToll3 {
		position: absolute;
		top: 0;
		right: 0px;
		width: 10px;
		height: 100%;
		cursor: col-resize;
	}

	.setToll3_1 {
		width: 6px;
		height: 24px;
		background: rgba(51, 179, 255, 1);
		box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
		border-radius: 10px;
		position: absolute;
		right: -4px;
		top: 22px;
		visibility: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.setToll2_1>i,
	.setToll3_1>i {
		width: 3px;
		height: 3px;
		background: white;
		border-radius: 50%;
		display: block;
		margin: 1px 0;
	}

	.setToll4 {
		display: none;
		cursor: pointer;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		width: 36px;
		height: 20px;
		background: rgba(255, 255, 255, 1);
		border-radius: 6px;
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
	}

	.setToll4>i {

		display: inline-block;
		vertical-align: top;
		width: 4px;
		height: 4px;
		background: #000;
		border-radius: 50%;
		margin: 8px 2px;
	}

	.setToll4_1 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}

	.setToll4_2 {
		z-index: 10;
		display: none;
		position: fixed;
		left: 0;
		width: 82px;
		transform: translateY(-100%);
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
		padding: 8px 0;
		border-radius: 5px;
	}

	.setToll4_2>span {
		cursor: pointer;
		display: block;
		line-height: 34px;
		text-align: center;
		font-size: 14px;
	}
	.zs_box{
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		width:124px;
		height:72px;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
		border-radius:5px;
		padding: 8px 0;
	}
	.zs_box>span{
		cursor: pointer;
		display: block;
		text-align: center;
		font-size:14px;
		color:rgba(51,51,51,1);
		line-height:36px;
		overflow: hidden;
	}
	.zs_box>span:hover{
		color: #33B3FF;
		background: rgba(51,179,255,.1);;
	}
	.zs_box>span:hover>span{
		-webkit-transform: translateX(-120px);
		transform: translateX(-120px);
	}
	
	.zs_box>span>span>img{
		display: inline-block;
		vertical-align: top;
		margin: 10px 6px 0 0;
	}
	.zs_box>span:hover>span>img{
	    position: relative;
	    left: 0;
	    color: rgba(51, 179, 255, 1);
	    -webkit-filter: drop-shadow(95px 0);
	    filter: drop-shadow(120px 0);
	    border-right: 34px solid transparent;
	}
	.zs_box1{
		display: inline-block;
		vertical-align: top;
		height: 100%;
		
		width: 16px;
		margin-right: 6px;

	}
	.setop .setDvs_02x1{
		display: none;
	}
	.setToll4_2>span:hover {
		background-color: #f5f7fa;
	}

	.bl_000 {
		position: relative;
		cursor: pointer;
		padding-right: 26px;
	}

	.bl_001 {
		position: absolute;
		top: 23px;
		z-index: 9;
		left: -6px;
		min-width: 59px;
		padding: 8px 0;
		text-align: center;
		height: 72px;
		border-radius: 5px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
	}

	.bl_001>span {
		cursor: pointer;
		display: block;
		width: 100%;
		height: 36px;
		font-size: 14px;
		color: rgba(51, 51, 51, 1);
		line-height: 36px;
	}

	.bl_001>span.cds {
		width: 77px;
	}

	.bl_001>span.cek {
		background: rgba(51, 179, 255, .1);
		color: #33B3FF;
	}

	.issczz {
		border-left: 21.75px solid #000;
		border-right: 21.75px solid #000;
		box-sizing: border-box;
	}

	.cgyi {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.bf_o1 {
		cursor: pointer;
		position: absolute;
		top: 52px;
		left: 0;
		width:2px;
		height:214px;
		background: #33B3FF;
	}
	.bf_o1>img{
		position: absolute;
		top: -20px;
		left: 50%;
		width: 20px;
		transform: translateX(-50%);
	}
	.newds_012 {
		margin: 28px 84px;
		font-size: 14px;
		text-align: center;
		color: rgba(102, 102, 102, 1);
		line-height: 20px;
	}

	.newds_013 {

		margin: 8px auto 0;
		text-align: center;
		font-size: 12px;
		width: 240px;
		color: rgba(187, 187, 187, 1);
		line-height: 18px
	}

	
	

	.ntob_footer_1_2::-webkit-scrollbar {
		width: 0;
	}

	.ntob_footer_1_2 {
		overflow-y: auto;
		height: 187px;
	}

	.ntob_footer_1_2>div {
		margin-bottom: 3px;
		font-size: 14px;
		color: rgba(51, 51, 51, 1);
		cursor: pointer;
	}

	.ntob_footer_1_2>div>img {
		display: inline-block;
		vertical-align: top;
		margin-right: 8px;
		width: 18px;
	}

	.ntob_footer_1_2>div.nl_ti2,.ntob_footer_1_2>div.nl_ti1{
		line-height: 72px;

	}

	.ntob_footer_1_2>div.nl_ti2>img {
		margin-top: 27px;
	}

	.ntob_footer_1_2>div.nl_ti3{
		line-height: 32px;
	}


	.ntob_footer_1_2>div.nl_ti1 {
		line-height: 72px;
	}

	.ntob_footer_1_2>div.nl_ti1>img {
		margin-top: 27px;
	}
	.ntob_footer_1_2>div.nl_ti3>img {
		margin-top: 7px;
	}
	.con-right-iocn-img {
		display: inline-block;
		vertical-align: initial;
		width: 18px;
		margin-right: 8px;
	}

	.con-right-iocn-text {
		height: 100%;
	}

	.con-right-iocn-img>.icon {
		position: relative;
		left: 0;
		top: 2px;
		color: rgba(51, 179, 255, 1);
		-webkit-filter: drop-shadow(95px 0);
		filter: drop-shadow(95px 0);
		border-right: 34px solid transparent;
	}

	.ckin>div {
		transform: translateX(-95px);
	}

	.mx_dsj {
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 6px solid #BBBBBB;
		position: absolute;
		top: 8px;
		right: 9px;
		border-radius: 2px;
	}

	.ntob_cent_l_2_1x {
		display: inline-block;
		vertical-align: top;
		margin: 2px 2px 0 0;
		width: 16px;
	}
	.show_00x_1{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.necBox {
		overflow: hidden;
		overflow-y: auto;
		height: 187px;
	}
	.necBox::-webkit-scrollbar {
		width: 0;
	}
	.debox_01 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.noto_t1{
		margin-left: 10px;
		line-height: 22px;
		font-size: 14px;
		color: rgba(187,187,187,1);
	}
	.ntob_cent_lxbo{
		
		position: absolute;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 75px;

	}
	.gdAm{
		transition: transform .5s;
	}
	.minzss{
		pointer-events: none;
		position: absolute;
		max-width: 90%;
		overflow: hidden;
		top: 50%;
		left: 0;
		text-indent: 10px;
		color: #fff;
		white-space: nowrap;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
		font-size: 12px;
	}
	.setToll0xs{
		background-repeat: no-repeat !important; 
		background-size: 100% 100% !important;
	}
</style>
