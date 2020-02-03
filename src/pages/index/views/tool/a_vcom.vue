<template>
		<div class="toAdi" ref="boxW">
			<div class="bfyp"></div>
			<div @mousedown="dragS" class="toAdi_1">
				<div 
				:style="'width:'+lft+'px;'"
				class="toAdi_1_1"></div>
				<div 
				:style="'left:'+lft+'px;right:'+(rft-lft)+'px;'"
				class="toAdi_1_3">
					<div class="toAdi_1_3_1">{{bact(lft)}}</div>
					<div class="toAdi_1_3_2">{{bact(lft+(1300-rft))}}</div>
					<div class="toAdi_1_3_3">
						<span>00:00</span>
					</div>
				</div>
				<div :style="'width: '+(rft-lft)+'px;'"
				class="toAdi_1_2"></div>
			</div>
			<!-- <div class="tols_05_2">
				<div class="setv02" :style="'width:'+eT+'px;'"></div>
				<div class="setv03" :style="'width:'+sT+'px;'"></div>
				<div class="setv01" :style="'right:'+eT+'px;left:'+sT+'px;'" ref="quy">
					<div class="setv01_2" :style="leftt">
						<span>{{clTime(bfz)}}</span>
					</div>				
					<div class="timef time_1">{{clTime(bfb2)}}</div>				
					<div class="timef time_3">{{clTime(bfb)}}</div>				
				</div>
			</div> -->
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
		}
	},
	mounted: function () {
		this.init();
	}, 
	methods:{
		init(){
			this.audioEnd = this.value.audioMax;
			this.videoEnd = this.value.endT-this.value.starT;	
			
			this.value.audioStar
			
			
			
			this.rft = 1300-(this.videoEnd/this.audioEnd)*1300;		
			this.lft =  (this.value.audioStar/this.audioEnd)*1300;
			
			
		},
		
		// pao(t){
		// 	this.bfz = this.bfb2;
		// 	this.leftt = '';
		// 	let tim = t*1000;
		// 	let L = this.bfb-this.bfb2;
		// 	let ot = tim/L;
		// 	let fn = ()=>{
		// 		if(this.bfz>=this.bfb){
		// 			this.bfz = this.bfb;
		// 			return
		// 		}
		// 		this.bfz++;
		// 		setTimeout(()=>{
		// 			fn();
		// 		},ot)
		// 	}
		// 	fn();
		// 	let wdtth = this.$refs.quy.getBoundingClientRect().width-2;
		// 	setTimeout(()=>{		
		// 		this.leftt = 'transition:transform '+t+'s linear;transform: translateX('+wdtth+'px);'
		// 	},25)
		// },
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
