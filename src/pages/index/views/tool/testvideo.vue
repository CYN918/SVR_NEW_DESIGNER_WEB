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
					<span @click="setvideo">保存</span><span @click="playd" class="noto_bys">制作完成</span>
				</div>
			</div>
			<div class="ntob_cent">
				<div class="ntob_cent_l">
					<canvas id="myCanvas" ref="cavs"></canvas>
					<video @ended="endeds()" @loadeddata="csy"  id="boxf" class="ntob_cent_l_1" :src="video" ref="vids"></video>
					<div class="ntob_cent_l_2">
						<div>预览比例 9:16</div>
						<div>00:00:00:00 / 00:00:30:00</div>
						<div>来电预览</div>
					</div>
				</div>
				<div class="ntob_cent_r">
					<div class="ntob_cent_r_1">
						<span @click="qhNav(index)" v-for="(el,index) in navs" :class="navson==index?'ckin':''"><img v-if="el.icon" :src="'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/tools/n/'+el.icon">{{el.n}}</span>
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
							<div :style="backtop(el,index)" class="imgd" v-for="(el,index) in navcoms.videos">
								<img v-if="el.fps_pic" :src="el.fps_pic">
								
							</div>
						</div>
						<div class="tlo_03"></div>
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
		</div>
	</div>
	
</template>

<script>
import setMt from './setMt';
export default{
	components:{
		setMt
	},
	data(){
		return{
			video:'',
			form:{
				
			},
			navson:0,
			navs:[
				{n:'媒体',icon:'icon_mt_video_pre.svg'},
				{n:'音乐',icon:'icon_yy.svg'}
			],
			navcoms:{
				zj:'setMt',
				videos:[],
				audios:[],
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
			
		}
	},
	mounted: function () {
		this.init();
	}, 

	methods:{
		endeds(){
			let len = this.navcoms.videos.length;

			if(this.bfon<len-1){
				this.bfon++;
				this.setvideo(this.navcoms.videos[this.bfon].file_url,1);
			}else{
				
				this.islast=1;
			}
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
			let str = "width:"+el.long*this.wdk+"px;transform:translateX("+(el.start*this.wdk)+"px);";
			if(el.type=='image'){
				str+='background-image: url('+el.bgimg+');';
			}
			
		
			return str;
		},
		setvideo(vido,a){
			this.video = vido;
		
			if(a){
				this.playd();
			}
		},
		playd(){
			var dom = document.getElementById('boxf');
			
			if(this.islast){
				this.islast='';
				this.bfon=0;
				
			}
			
			this.setvideo(this.navcoms.videos[this.bfon].file_url);
			
			setTimeout(()=>{
				
				dom.play();
			},50)
			
		},
		csy(){
			var dom = document.getElementById('boxf');
			dom.currentTime = 0;
			this.cans.drawImage(dom,0,0,391,695);
			
			setTimeout(()=>{
				this.cans.drawImage(dom,0,0,391,695);
			
			}, 500);
		},
		init(){
			this.$refs.cavs.width = 391;
			this.$refs.cavs.height = 695;
			this.cans = this.$refs.cavs.getContext("2d");
			this.cans.fillStyle="#000";
			this.cans.fillRect(0,0,391,695);
			
			this.$refs.vids.addEventListener('play',()=>{
				this.po =window.setInterval(()=>
			{
				this.cans.drawImage(this.$refs.vids,0,0,391,695)
			},20);},false);
			this.$refs.vids.addEventListener('pause',()=>{window.clearInterval(this.po);},false);
			this.$refs.vids.addEventListener('ended',()=>{clearInterval(this.po);},false);
			
		},
		qhNav(o){
			if(this.navson ==o){return}
			this.navson = o;
		},
		
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
#myCanvas{
	display: block;
	margin: 0 auto;
	width:391px;
	height:695px;		
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
	background: #fff;
	height: 100%;
	background-position: 0;
	background-repeat: repeat-x;
	background-size: auto 100%;

}
</style>
