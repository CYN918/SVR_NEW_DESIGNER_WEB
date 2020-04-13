<template>
	<div class="setDvs_0" ref="boxs">
		<img :src="value.file_url" class="setDvs_01" ref="imgs"/>
	
		
		<div  :style="backIm()"  class="setDvs_02x" ref="posd">
			<img :src="value.file_url" class="setDvs_01x"/>
			<div class="setDvs_02x1">
				<p @mousedown="td_01($event,'mv')" class="setDvs_02"></p>
				<div @mousedown="td_01($event,'l')" class="setDvs_03"></div>
				<div @mousedown="td_01($event,'r')" class="setDvs_05"></div>
				<div @mousedown="td_01($event,'b_r')" class="setDvs_06"></div>
				<div @mousedown="td_01($event,'b_l')" class="setDvs_07"></div>
				<!-- <div @mousedown="td_01($event,'t')" class="setDvs_04"></div>
				
				
				
				<div @mousedown="td_01($event,'t_r')" class="setDvs_08"></div>
				<div @mousedown="td_01($event,'b_l')" class="setDvs_09"></div>
				<div @mousedown="td_01($event,'b_r')" class="setDvs_10"></div>	 -->
			</div>
			
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
			cjk:{},
			pic:{},
			
		}
	},
	mounted: function () {
		this.init();
	}, 
	methods:{
		init(){
			this.$refs.imgs.onload=()=>{
				let op = this.$refs.imgs.getBoundingClientRect();
				let posd = this.$refs.boxs.getBoundingClientRect();
				let xs = op.x-posd.x;
				let ys = op.y-posd.y;
				let ws = op.width;
				let hs = op.height;
				if(hs<695){
					ys = (695-hs)/2+ys;
				}
				if(ws<391){
					xs = (391-xs)/2+xs;
				}
				if(!this.value.kb){
					this.value.x = xs;
					this.value.y = ys;
					this.value.w = op.width;
					this.value.h = op.height;
					this.value.kb = op.width/op.height;
				}
				
			
			}
			
		},
	
	
		backIm(){
		
			return 'width:'+this.value.w+'px;height:'+this.value.h+'px;transform: translate('+this.value.x+'px,'+this.value.y+'px);';
		},
	
		td_01(e,tp){
			if(e && e.stopPropagation()) {
				e.stopPropagation();
			} else {
				e.cancelBubble = false;
			}
			e.preventDefault()
			let ev = e || window.event,
			disX = ev.clientX,
			disY = ev.clientY,
			disW = this.value.x,
			disH = this.value.y,
			disWD = this.value.w?this.value.w:0,
			disHD = this.value.h?this.value.h:0;
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (ev)=>{
				var ev = ev || window.event;
				if(ev && ev.stopPropagation()) {
					ev.stopPropagation();
				} else {
					ev.cancelBubble = false;
				}
				ev.preventDefault()
				var ydx = ev.clientX - disX;
				var ydy = ev.clientY - disY;
				var x = ydx+disW;
				var y = ydy+disH;
				
				if(tp=='mv'){
					this.value.y = y;
					this.value.x = x;
					return
				}
				let jdx = Math.abs(ydx);
				let jdy = Math.abs(ydy);
				
				if(tp=='l'){
					
					let wd = disWD-ydx;
					this.value.w = wd;
					this.value.h = wd/this.value.kb;
					
					return
					
				}
				if(tp=='r'){
					let wd = disWD+ydx;
					
					this.value.w = wd;
					this.value.h = wd/this.value.kb;
					return
				}
				if(tp=='b_l'){
					
					let hd = disHD+ydy;
								
					this.value.w = hd*this.value.kb;
					this.value.h = hd;					
					return
				}
				if(tp=='b_r'){
				
					let hd = disHD+ydy;
				
					this.value.w = hd*this.value.kb;
					this.value.h = hd;					
					return
				}
				
			}			 
			document.onmouseup =  ()=>{
				document.onmousemove = document.onmouseup = null;
			}
		},
	}
}
</script>

<style>
.setDvs_0{

}
.setDvs_01{
	position: absolute;
	top: 0;
	left: 0;
	max-width: 100%;
	max-height: 100%;
	opacity: 0;
}
.setDvs_02x{
	position: absolute;
}
.setDvs_01x{
	display: block;
	width: 100%;
	height: 100%;
}
.setDvs_02x1{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border:1px solid #33B3FF;
}
.setDvs_02x1>div{
	position: absolute;
	width: 8px;
	height: 8px;
	background: #33B3FF;
}
.setDvs_02{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.setDvs_03{	
	top: 0;
	left: 0;
}
.setDvs_04{	
	top: 0;
	right: 0;
}
.setDvs_05{	
	top: 0;
	right: 0;
}
.setDvs_06{	
	bottom: 0;
	right: 0;
}
.setDvs_07{	
	bottom: 0;
	left: 0;
}
</style>
