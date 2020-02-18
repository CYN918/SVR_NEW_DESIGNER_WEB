<template>
		<div class="toAdi" ref="boxW">
			<div class="bfyp"></div>
			<div @mousedown="dragS" class="toAdi_1" >
				<div 
				:style="'width:'+lft+'px;'"
				class="toAdi_1_1"></div>
				<div 
				:style="'left:'+lft+'px;right:'+(rft-lft)+'px;'"
				class="toAdi_1_3" ref="boxd">
					<div class="toAdi_1_3_1">{{bact(lft)}}</div>
					<div class="toAdi_1_3_2">{{bact(lft+(1300-rft))}}</div>
					<div class="setv01_2" :style="leftt">
						<span>{{bT(bfT)}}</span>
					</div>
				</div>
				<div :style="'width: '+(rft-lft)+'px;'"
				class="toAdi_1_2"></div>
				
			</div>
		</div>
	
</template>

<script>

export default{
	props:{
		value:Object,		
	},
	data(){
		return{
			audioEnd:0,
			videoEnd:0,
			mov:0,
			lft:0,
			rft:0,
			bfT:0,
			leftt:0,
			tstop:'',
		}
	},
	mounted: function () {
		this.init();
	}, 
	methods:{
		init(){
			if(!this.value.audio_max){
				setTimeout(()=>{
					this.init();
				},100)
				return
			}
	
			this.audioEnd = this.value.audio_max;
			this.videoEnd = (this.value.video_endT-this.value.video_starT);	
			
			
			this.rft = 1300-(this.videoEnd/this.audioEnd)*1300;
			
			this.lft =  (this.value.audio_starT/this.audioEnd)*1300;
			
			
		},
		clTime2(dz){
			let tm = Math.ceil(dz/this.value.video_fps);
			let mt = tm;
			let fn = '00';
			let ms = mt%60;
			if(mt>60){
				fn = mt-ms;
				if(fn<10){
					fn = '0'+fn;
				}
			}
			if(ms<10){
				ms = '0'+ms;
			}
			
			return fn+':'+ms;
		},
		stopPao(){
			clearTimeout(this.tstop);
		},

		pao(b){
			
			let zxpl = 1000/60;
			let tys= zxpl/1000;
			let domData = this.$refs.boxd.getBoundingClientRect();
			let leng = domData.width-3;
			let star =  parseInt(this.value.audio_starT);
			let bftm = parseInt(this.value.audio_endT); 
			let cst = star;
			let timlen =bftm-star;

			if(!b && this.bfT!=0 && this.bfT<=bftm){
				star = this.bfT;
			}
			
			this.bfT = star;
			this.leftt = '';
			var fnsd = ()=>{
				if(this.bfT<=bftm){
					star = star+tys;
					this.bfT = star;				
					this.leftt = 'left:'+(((star-cst)/timlen)*leng)+'px;';
					this.tstop = setTimeout(fnsd,zxpl)
					return
				}
		
				
				
			};
			fnsd();
			
			
									
		},
		bact(n){
			let t = (n/1300)*this.audioEnd;
			return this.bT(t);
		},
		bT(t){
			let st1 = '',st2='';
			st2 = Math.ceil(t%60);
			if(st2<10){
				st2 = '0'+st2;
			}
			st1 = parseInt(t/60);
			if(st1<10){
				st1 = '0'+st1;
			}
			return st1+':'+st2;
		},
		dragS(e){			
			this.star = e.pageX;
			this.mov = this.lft;
			let max = this.rft;
			let min = 0;
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				let on = e.pageX-this.star+this.mov;
				if(on<0){
					on = 0;
				}
				if(on>max){
					on = max;
				}
				this.lft =  on;
				this.$parent.setEnd((on/1300)*this.audioEnd);
			}
			
			document.onmouseup =  ()=>{
				// this.$parent.$refs.aido.play();
				// this.$parent.$parent.$refs.yaz.play();
			    document.onmousemove = document.onmouseup = null;
			}
		},
		
	}
}
</script>

<style>
.toAdi{
	position: relative;
	margin: 0 auto;
	width: 1300px;
	height: 118px;
	border-radius: 5px;
	
}
.toAdi_1{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 114px;
	background: url(https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/tools/ybo.png) 0 center/auto 100% repeat-x;
	
}
.toAdi_1_2,.toAdi_1_1{
	position: absolute;
	top: 2px;
	background: rgba(0,0,0,.3);
	width: 0;
	height: 114px;
}
.toAdi_1_1{
	left: 0;
}
.toAdi_1_2{
	right: 0;
}
.toAdi_1_3{
	position: absolute;
	left: 0;
	right: 0;
	box-sizing: border-box;
	border:2px solid rgba(51,179,255,1);
	border-radius: 5px;
	height: 118px;
}
.toAdi_1_3>div{
	position: absolute;
}
.toAdi_1_3_1{
	left: -20px;
	top: 126px;
	font-size:12px;
	color:rgba(51,179,255,1);
	line-height:18px;
}
.toAdi_1_3_2{
	right: -20px;
	top: 126px;
	font-size:12px;
	color:rgba(51,179,255,1);
	line-height:18px;
}
</style>
