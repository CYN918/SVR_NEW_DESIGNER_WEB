<template>
	<div class="setDvs_0" ref="boxs">
		<img :src="value.file_url" class="setDvs_01" ref="imgs"/>
		<div class="hind_012">
			<div  :style="backIm()"  class="setDvs_02x" ref="posd">
				<img :style="cjD()" :src="value.file_url" class="setDvs_01x"/>				
			</div>	
		</div>
		
		<div  :style="backIm()"  class="setDvs_02x setDvs_02x11" ref="posd">
			<div class="setDvs_02x1">
				<p @mousedown="td_01($event,'mv')" class="setDvs_02"></p>
				<div @mousedown="td_01($event,'l')" class="setDvs_03"></div>
				<div @mousedown="td_01($event,'r')" class="setDvs_05"></div>
				<div @mousedown="td_01($event,'b_r')" class="setDvs_06"></div>
				<div @mousedown="td_01($event,'b_l')" class="setDvs_07"></div>
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
				if(!this.$refs.boxs){
					return
				}
				if(!this.$refs.imgs){
					return
				}
				let op = this.$refs.imgs.getBoundingClientRect();
				let posd = this.$refs.boxs.getBoundingClientRect();
				let xs = op.x-posd.x;
				let ys = op.y-posd.y;
				let ws = op.width;
				let hs = op.height;
				if(hs<this.$parent.boxH){
					ys = (this.$parent.boxH-hs)/2+ys;
				}
				if(ws<this.$parent.boxW){
					xs = (this.$parent.boxW-ws)/2+xs;
				}				
				if(!this.value.zskb){
					this.$set(this.value,'zsx',xs);
					this.$set(this.value,'zsy',ys);
					this.$set(this.value,'zsh',op.height);
					this.$set(this.value,'zsw',op.width);
					this.$set(this.value,'zskb',op.width/op.height)
				}
				
			
			}
			
		},
	
		cjD(){
			let str = '';
			console.log(this.value);
			return str;
		},
		backIm(){
			
			return 'width:'+this.value.zsw+'px;height:'+this.value.zsh+'px;transform: translate('+this.value.zsx+'px,'+this.value.zsy+'px);';
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
			disW = this.value.zsx,
			disH = this.value.zsy,
			disWD = this.value.zsw?this.value.zsw:0,
			disHD = this.value.zsh?this.value.zsh:0;
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
					this.value.zsy = y;
					this.value.zsx = x;
					return
				}
				let jdx = Math.abs(ydx);
				let jdy = Math.abs(ydy);
				
				if(tp=='l'){
					
					let wd = disWD-ydx;
					this.value.zsw = wd;
					this.value.zsh = wd/this.value.zskb;
					this.value.zsx = disW-(this.value.zsw-disWD);	
					this.value.zsy = disH-(this.value.zsh-disHD);
					return
					
				}
				if(tp=='r'){
					let wd = disWD+ydx;
					
					this.value.zsw = wd;
					this.value.zsh = wd/this.value.zskb;
					this.value.zsy = disH-(this.value.zsh-disHD);
					
					
					return
				}
				if(tp=='b_l'){
					
					let hd = disHD+ydy;
								
					this.value.zsw = hd*this.value.zskb;
					this.value.zsh = hd;	
									
					this.value.zsx = disW-(this.value.zsw-disWD);			
									
					return
				}
				if(tp=='b_r'){
				
					let hd = disHD+ydy;
				
					this.value.zsw = hd*this.value.zskb;
					this.value.zsh = hd;					
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
.setDvs_02x11{
	z-index: 99;
}
.setDvs_01x{
	display: block;
	width: 100%;
	height: 100%;
}
.isnobhd .setDvs_02x1{
	display: none;
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
.hind_012{
	position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
