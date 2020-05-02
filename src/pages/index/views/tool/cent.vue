<template>
	<div class="ldx_l_1x">
		<div @mouseenter="btnchange" @mouseleave="btnchange1" class="ldx_l_1fd2" @mouseover="ybf($event)" @mouseout="stopbf($event)">
			<div class="ldx_l_1_1" :style="'background-image: url('+el.img+');'"></div>
			
			<video @timeupdate="timeupdate" @canplay="setTime()" loop="loop" v-if="el.file_url" class="bof" ref="video" :src="el.file_url"></video>
			<div 
			@mouseover="showT()" @mouseout="hinT()"
			v-if="[2,1,0,-1].indexOf(+el.status)!=-1"
			class="ldxwc_yy">
				<img :class="['ant',Isbf?'paused':'']" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/tools/Upload_icon_music_24.svg" alt="">
				<div :class="['gdwz_001',showTil?'showTil':'']"><span :style="yu_tle">{{backdr()}}</span></div>
			</div>	
			
			
			<div class="ldxdsh_01" v-if="el.status==1">审核中</div>
			<div class="hcsb" v-if="el.status==-10">
				<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/tools/LDXGC_icon_sb.svg">
				<span>合成失败</span>
			</div>
			<div class="hcsb" v-if="el.status==10">
				<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/tools/LDXGC_icon_hcz.svg">
				<span>合成中</span>
			</div>
			
			<div class="hcsb2" v-if="el.file_url">
				<div class="foll"><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/tools/icon_video_caller lis.svg" alt=""></div>
				<div class="fol">{{setTimed(times-cumime)}}</div>
			</div>
			
			
			<div class="ldx_l_1_top" v-if="[0,-10,-1].indexOf(+el.status)!=-1">
				<div class="ldx_l_1_top_btn" @click="changebtn()">···</div>
				<div class="ldx_l_1_top_btn1" v-if="top_btn">
					<div class="ldx_l_1_btn1_1" @click.stop="del(el.id)">
						删除
					</div>
				</div>
			</div>
			<div class="ldx_l_1_btn">
				<div class="ldx_l_1_btn" v-if="el.status==0 && Isbtn">
					<span @click="bjfn(el.id)" class="pendno">编辑</span>
				</div>
				<div class="ldx_l_1_btn2" v-if="el.status==2 && Isbtn">
					<span @click="gojg(el.project_id)" class="ldx_l_1_btn2_a">项目结果</span>
				</div>
				<div class="ldx_l_1_btn3" v-if="el.status==-1 && Isbtn">
					<span class="pendno" @click="bjfn(el.id)">重新编辑</span>
					<span class="pendno ldx_l_1_btn3x" @click="getrejectInfo(el.project_id)">
						查看驳回原因 
						<div class="ldx_l_1_btn3xt" v-if="Ischeck">
							<div class="ldx_l_1_btn3xt_1">驳回理由：</div>
							<div class="ldx_l_1_btn3xt_2">
								{{ checkinfo.check_reason }}
							</div>
							<div v-if="checkinfo.check_comment" class="ldx_l_1_btn3xt_1">驳回详情：</div>
							<div class="ldx_l_1_btn3xt_2">
								{{ checkinfo.check_comment }}
							</div>
						</div>
					
					</span>
					
				</div>
			</div>		
		</div>
		<div class="ldx_l_1x_2">
			{{el.title}}
		</div>
		<div class="ldx_l_1x_3">
			{{backtims(el)}}
		</div>
	</div>
	
</template>

<script>
export default{
	props:{
		el:{
			type:Object,
			default:{},
		},
		pr:Object,
	},
	data(){
		return{
			yu_tle:'',
			top_btn:false,
			Isbtn:false,
			checkinfo:{
				check_reason:"",
				check_comment:""
			},
			Ischeck:false,
			jsons:{},
			isBFdjs:'',
			times:'',
			cumime:0,
			Isbf:true,
			showTil:'',
		}
		
	},
	
	methods:{
		showT(e){
			this.showTil = 1;
		},
		hinT(e){
			this.showTil = '';
		},
		backyo(){
			if(this.$refs.tiles){
				
				return this.$refs.tiles.getBoundingClientRect().width>1?'tian_01':'';
			}
			
		},
		backdr(){
			if(this.jsons.audio && this.jsons.audio[0] && this.jsons.audio[0].author){
				return  this.jsons.audio[0].file_name+'-'+this.jsons.audio[0].author;
			}			
			return '无歌手名';
		},
		timeupdate(){
			this.cumime = this.$refs.video.currentTime;
		},
		setTime(){
			if(!this.$refs.video){
				return
			}
			this.times = this.$refs.video.duration;
		},
		setTimed(t){
			
			var f='00',s;
			if(t>60){
				f = Math.round(t/60);
				if(f<10){
					f='0'+f;
				}
			}
			s = Math.round(t%60);
			if(s<10){
				s = '0'+s;
			}
			return f+':'+s;
		},
		ybf(e){
			if(!this.$refs.video){
				return
			}
			clearTimeout(this.isBFdjs);
			if(!this.$refs.video.paused){
				return
			}
			this.isBFdjs = setTimeout(()=>{
				if(this.$refs.video){
					this.$refs.video.currentTime = 0;
					this.$refs.video.play();
					this.Isbf = false;
				}
			},200)			
		},
		stopbf(e){
			if(!this.$refs.video){
				return
			}
			clearTimeout(this.isBFdjs);
			if(this.$refs.video && !this.$refs.video.paused){
				this.isBFdjs = setTimeout(()=>{
					this.$refs.video.pause();
					this.$refs.video.currentTime = 0;
					this.Isbf = true;
				},200)				
			}			
		},
		init(){
		
			try{
				let op = JSON.parse(this.el.json);
				this.jsons = op?op:{};
				
			}catch(e){
				//TODO handle the exception
			}
			
		},
		backtims(el){
			if(this.pr.sort){
				return this.mJs.getTimes(this.pr.sort =='{"update_at":"DESC"}'?el.update_at:el.created_at)
			}
			
		},
		btnchange(e){
			this.Isbtn = true;
		},
		btnchange1(e){
			this.Isbtn = false;
			this.Ischeck = false
		},
		del(id){
			this.api.mobileshowdel({
				id:id
			}).then(da=>{
				this.$parent.getData();	
				this.changebtn();
			})
		},
		changebtn(){
			this.top_btn=!this.top_btn;
		},
		bjfn(id){
			localStorage.setItem('ldxData',JSON.stringify(this.el));
			this.$router.push({path:'/pushTool',query:{id:id}});
	
		},
		gojg(id){
			
			this.$router.push({path:'/prcent',query:{id:id}});
		},
		getrejectInfo(id){
			if(this.Ischeck){
				this.Ischeck = false;
				return;
			}
			if(id){
				this.api.rejectInfo({
					project_id:id
				}).then(da=>{
					this.checkinfo = da;
					this.Ischeck = !this.Ischeck
				})
			}
			
		}

	},
	mounted() {
		this.init();
		document.addEventListener('click', (e)=> {
			if (e.target.className != 'ldx_l_1_top_btn1' && e.target.className != 'ldx_l_1_top_btn') {
				this.top_btn = false;
			}
		})
	}
}
</script>

<style>
.ldx_l_1{
	position: relative;
	width:193px;
	height:343px;
	background: rgba(244,246,249,1);
	border-radius:5px;
}
.ldx_l_1fd2{
	position: relative;
	width:193px;
	height:343px;
	background: #000;
	border-radius:5px;
}
.ldx_l_1x{
	
	display: inline-block;
	vertical-align: top;
	margin-left: 20px;
	margin-bottom: 20px;
	
}
.ldx_l_1_1{
	width:193px;
	height:343px;
	border-radius:5px;
	background-repeat:no-repeat;
	background-size: cover;
	background-position: center;
	
}
.pendno{
	cursor: pointer;
}
.ldx_l_1x_2{
	margin: 8px 0 4px;
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
}
.ldx_l_1x_3{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
}
.ldx_l_1_btn{
	position: absolute;
	bottom: 20px;
	left: 0;
	width: 100%;
	text-align: center;
}
.ldx_l_1_btn>span{
	display: inline-block;
	vertical-align: top;
	width:68px;
	height:32px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	border:1px solid rgba(187,187,187,1);
	font-size:14px;
	margin: 0 7.5px;
	color:rgba(102,102,102,1);
	line-height:32px;
}
.ldx_l_1_btn>span.ldx_l_1_btn1{
	background:rgba(51,179,255,1);
	color: #fff;
	border-color: rgba(51,179,255,1);
}
.ldx_l_1_btn2>span{
	display: block;
	margin: 0 auto;
	width:153px;
	height:32px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	border:1px solid rgba(187,187,187,1);
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:32px;
	text-align: center;
}
.ldx_l_1_btn3>span{
	display: block;
	margin: 0 auto;
	width:153px;
	height:32px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	border:1px solid rgba(187,187,187,1);
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:32px;
	text-align: center;
}
.ldx_l_1_btn3>span.ldx_l_1_btn3x{
	margin-top: 10px;
	background: #33B3FF;
	border-color: #33B3FF;
	color: #fff;
	position: relative;
}
.ldx_l_1_btn3xt{
	width:200px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:4px;
	position: absolute;
	top: 0;
	left: 157px;
	padding: 16px;
	z-index: 999;
	text-align: left;
}
.ldx_l_1_btn3xt_1{
	color: #333333;
}
.ldx_l_1_btn3xt_2{
	color: #666666;
	line-height: 20px;
}
.ldx_l_1_top{
	position:absolute;
	right: 10px;
	top: 10px;
	z-index: 100;
}
.ldx_l_1x:hover .ldx_l_1_top_btn{
	display: block;
} 
.ldx_l_1_top_btn{
	display: none;
	width:26px;
	height:18px;
	background:rgba(255,255,255,1);
	box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
	border-radius:5px;
	text-align: center;
	line-height: 18px;
	font-size: 16px;
	cursor: pointer;
}
.ldx_l_1_top_btn1{
	width:82px;
	height: 45px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;
	position: absolute;
	margin-top: 2px;
}
.ldx_l_1_btn1_1{
	width:100%;
	height:45px;
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:45px;
	position: absolute;
	text-align: center;
	cursor: pointer;
}
.ldx_l_1_btn2 .ldx_l_1_btn2_a{
	background: #33B3FF;
	border-color: #33B3FF;
	color: #fff;
}
.ldx_l_1_btn2_a{
	cursor: pointer;
}

.ldxwc_yy{
	position: absolute;
	top: 10px;
	left: 10px;
	
}
.ldxwc_yy>img{
	display: inline-block;
	vertical-align: top;
	width: 24px;
}
/* .ldxwc_yy:hover>div{
	display: inline-block;
} */
.ldxwc_yy>div{

	margin-left: 4px;
	width:129px;
	height:24px;
	padding: 0 8px;
	background:rgba(0,0,0,.5);
	border-radius:12px;
	font-size:12px;
	color:rgba(255,255,255,1);
	line-height:24px;
	overflow: hidden;
}
.hcsb{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
}
.hcsb>img{
	display: block;
	margin: 0 auto 16px;
	width: 32px;
}
.hcsb>span{
	display: block;
	text-align: center;
	font-size:14px;
	font-weight:500;
	color:rgba(255,255,255,1);
}
.ldxdsh_01{
	position: absolute;
	top: 12px;
	right: 10px;
	width:54px;
	height:20px;
	background:rgba(255,146,0,.8);
	border-radius:10px;
	font-size:12px;
	text-align: center;
	color:rgba(255,255,255,1);
	line-height:20px;
}
.video_po_01{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.bof{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.hcsb2{
	position: absolute;
	bottom: 10px;
	left: 10px;
	right: 10px;
}
.hcsb2>div{
	display: inline-block;
	vertical-align: top;
	padding: 0 6px;
	height:20px;
	line-height: 20px;
	background:rgba(0,0,0,.5);
	border-radius:10px;
	font-size:12px;

	color:rgba(255,255,255,1);

}

.ant{
	animation: 2500ms xz infinite linear;
}

.paused{
	animation-play-state: paused;
}
@keyframes xz{
	0%{
		transform: rotateZ(0deg);
	}
	25%{
		transform: rotateZ(90deg);
	}
	50%{
		transform: rotateZ(180deg);
	}
	75%{
		transform: rotateZ(270deg);
	}
	100%{
		transform: rotateZ(360deg);
	}
}

.hcsb2>div.foll>img{
	display: inline-block;
	vertical-align: top;
	margin-top: 6px;
}
.hcsb2>div.fol{
	float: right;
}
.gdwz_001{
	display: none;
	position: relative;
	overflow: hidden;
	
}
.gdwz_001>span{
	position: absolute;
	left: 0;
	top: 0;
	padding: 0 10px;
	display: inline-block;
	animation: test 5s linear infinite;
}
@keyframes test{
	from{transform: translateX(0);}
	to{transform: translateX(-100%);}
}
.showTil{
	display: inline-block;
}
</style>
