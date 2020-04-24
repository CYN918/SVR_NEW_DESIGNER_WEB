<template>
	<div class="pr_qpx" >
		<div class="mp3_01x2">
			<div class="mp3_01x_1">
				<span class="a">视频剪辑</span><img @click="close()" class="pend b" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/cj_00.svg">
			</div>
			<div class="pcat_01">
				<img :style="imgs" class="pcat_02" :src="value.data.cover_img" ref="bgh"/>
				
				<div class="pcat_03"></div>
				<div class="pcat_04" :style="backys()">
					<img :style="backIm()" class="pcat_05" :src="value.data.cover_img"/>	
									
					<div class="tzk_01">
						<div @mousedown="td_01($event,'m')" class="tzk_02"></div>
						<!-- <div @mousedown="td_01($event,'l')" class="tzk_03"></div> -->
						<!-- <div @mousedown="td_01($event,'t')" class="tzk_04"></div> -->
						<!-- <div @mousedown="td_01($event,'r')" class="tzk_05"></div> -->
						<!-- <div @mousedown="td_01($event,'b')" class="tzk_06"></div> -->
						<div @mousedown="td_01($event,'t_l')" class="tzk_07"></div>
						<div @mousedown="td_01($event,'t_r')" class="tzk_08"></div>
						<div @mousedown="td_01($event,'b_l')" class="tzk_09"></div>
						<div @mousedown="td_01($event,'b_r')" class="tzk_10"></div>
					</div>
				</div>				
			</div>
			
			<div class="pcat_bt">
				<label @click="chcc(index)" v-for="(el,index) in bl" class="pend">
					<span :class="ccun==index?'chek':''"></span>{{el.n}}
				</label>
				<div class="pcat_bt_0x">
					<span @click="cz" class="pend">重置</span><span @click="catd" class="pend pcat_bt_0x1">确定</span>
				</div>
			</div>
		</div>		
	</div>
</template>

<script>
import inputMax from '../../components/inputMax'
import checks from '../../components/checks'
export default{
	components:{inputMax,checks},
	props:{
		value:Object
	},
	data(){
		return{
			ysd:'',
			vido:'',
			bl:[
				{n:'9:16',x:9,y:16},
				// {n:'自由裁剪',x:9,y:16},
				// {n:'6:13',x:6,y:13}
			],
			max:{
				w:0,
				h:0
			},
			pic:{
				w:0,
				h:0,
				x:0,
				y:0
			},
			imgs:'',
			cjk:{
				x:0,
				y:0,
				w:0,
				h:0
			},
			ccun:0,
		}
	},
	
	beforeDestroy:function(){		
		document.body.style = "";
	},
	watch:{},
	mounted: function () {
		this.init();
	}, 
	methods:{
		chcc(on){
			this.ccun = on;
			this.cjkset(this.pic);
		},
		init(){
			setTimeout(()=>{
				this.ccun = 0;
				this.cz();								
			},50)
			document.body.style = "overflow: hidden;";
		},
		catd(){		
			let w = this.$parent.boxW,h = this.$parent.boxH;
			let x = 0,y=0;
			let sx =0,sy=0,sw=0,sh=0;			
			let kdb = this.value.data.yw/this.pic.w;
			let gdb = this.value.data.yh/this.pic.h;
			sw = kdb*this.cjk.w;
			sh = gdb*this.cjk.h;
			sx = kdb*(this.cjk.x-this.pic.x);
			sy = gdb*(this.cjk.y-this.pic.y)
			this.setcs('x',x);
			this.setcs('y',y);
			this.setcs('w',w);
			this.setcs('h',h);
			this.setcs('sx',sx);
			this.setcs('sy',sy);
			this.setcs('sw',sw);
			this.setcs('sh',sh);
			
			this.$parent.drmOn();
			
			this.close();
		},
		setcs(n,v){
			this.$set(this.value.data,n,v)
		},
		cz(){
			
			let maxw = 640;
			let maxy = 360;
			let onw = 0;
			let onh = 0;
			let img = document.createElement('img');
			img.src=this.value.data.cover_img;
			img.onload = ()=>{
			
				let w = img.naturalWidth;
				let y = img.naturalHeight;
				let bl = w/y;
			
				onh = 360;
				onw = bl*onh;
				if(onw>640){
					onw = 640;
					onh = onw/bl;
				}
				this.imgs = 'width:'+onw+'px;height:'+onh+'px;';
				this.picset({
					width:onw,
					height:onh
				});				
				this.cjkset(this.pic);	
			}
			
			
			
		},		
		td_01(e,tp){
			if(e && e.stopPropagation()) {
				e.stopPropagation();
			} else {
				e.cancelBubble = false;
			}
			let ev = e || window.event,
			disX = ev.clientX,
			disY = ev.clientY,
			disW = this.cjk.x,
			disH = this.cjk.y,	
			y_w = this.cjk.w,
			y_h = this.cjk.h,
			max_l_x = this.pic.x,
			max_l_y = this.pic.y,
			max_r_x = this.pic.x+this.pic.w-this.cjk.w,
			max_r_y = this.pic.y+this.pic.h - this.cjk.h;	
					
			/*计算最大边界值*/
			var min_h=0;
			var max_h=0;
			var min_w=0;
			var max_w=0;
			var max_y = 0;
			var min_y = 0;
			var min_x = 0;
			var max_x = 0;
			max_w = this.pic.x+this.pic.w-this.cjk.x;
			max_h = this.pic.y+this.pic.h-this.cjk.y;
			
			if(tp=='m'){
				min_x = this.pic.x;
				min_y = this.pic.y;
				max_x = this.pic.x+this.pic.w-this.cjk.w;
				max_y = this.pic.y+this.pic.h - this.cjk.h;
			}
			let mw = 0,mh =0;
			
			if(tp=='t_l' || tp=='b_l'){
				mw = this.cjk.x-this.pic.x+this.cjk.w;
				mh = this.cjk.y-this.pic.y+this.cjk.h;					
			}
			if(tp=='t_r' || tp=='b_r'){
				mw = this.pic.w-(this.cjk.x-this.pic.x);
				mh = this.cjk.y-this.pic.y+this.cjk.h;				
			}			
			if(tp=='b_r' || tp=='b_l'){
				
				mh = this.pic.h-(this.cjk.y - this.pic.y);
				
				
			}
			
			var hg = mw/9*16;
			if(hg<=mh){
				max_w = mw;					
				max_h = hg;					
			}else{				
				max_w = mh/16*9;
				max_h = hg;
			}
			
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (ev)=>{
				var ev = ev || window.event;
				if(ev && ev.stopPropagation()) {
					ev.stopPropagation();
				} else {
					ev.cancelBubble = false;
				}
				var ydx = ev.clientX - disX;
				var ydy = ev.clientY - disY;
				var x = ydx+disW;
				var y = ydy+disH;
				
				if(tp=='t_l'){				
					let zd = ydx;
					let wd = y_w-zd;
					if(wd>max_w){
						wd = max_w;
					}
					if(wd<5){
						wd = 5;
					}
					this.cjk.w = wd;
					this.cjk.h = wd/9*16;
					this.cjk.x = disW-(wd-y_w);
					this.cjk.y = disH+(y_h-this.cjk.h);
					return
				}
				if(tp=='t_r'){
					let zd = ydx;
					let wd = y_w+zd;
					if(wd>max_w){
						wd = max_w;
					}
					if(wd<5){
						wd = 5;
					}
					this.cjk.w = wd;
					this.cjk.h = wd/9*16;
					this.cjk.y = disH+(y_h-this.cjk.h);
					return
				}
				if(tp=='b_l'){
				
					let zd = ydx;
					let wd = y_w+zd;
					if(wd>max_w){
						wd = max_w;
					}
					if(wd<5){
						wd = 5;
					}
		
					this.cjk.w = wd;
					this.cjk.h = wd/9*16;
					
					return
				}
				if(tp=='b_r'){
					let zd = ydx;
					let wd = y_w-zd;
					if(wd>max_w){
						wd = max_w;
					}
					this.cjk.w = wd;
					this.cjk.h = wd/9*16;
					this.cjk.x = disW-(wd-y_w);	
					return
					
				}
				if(x>max_x){
					x=max_x;
				}
				if(y>max_y){
					y=max_y;
				}				
				if(x<min_x){
					x = min_x;
				}
				if(y<min_y){
					y = min_y;
				}	
				if(tp=='m'){
					this.cjk.x = x;
					this.cjk.y = y;
				}
				
			}			 
			document.onmouseup =  ()=>{
				document.onmousemove = document.onmouseup = null;
			}
		},
	
		picset(el){
			this.pic = {
				x:(640-el.width)/2,
				y:(360-el.height)/2,
				w:el.width,
				h:el.height,
			};
		},
		cjkset(el){
			let pr = {};
			if(el.h>el.w){
				pr.w = el.w;
				
				pr.h = (el.w/this.bl[this.ccun].x)*this.bl[this.ccun].y;
				
				pr.fd = (360-pr.h)/pr.h;
			
			}else{
				pr.h = el.h;
				pr.w = (el.h/this.bl[this.ccun].y)*this.bl[this.ccun].x;
				pr.fd = (640-pr.w)/pr.w;
			}
			pr.x=(640-pr.w)/2;
			pr.y=(360-pr.h)/2;
			this.max.w=pr.w;
			this.max.h=pr.h;
			this.cjk = pr;
		},
		backys(){
			return 'width:'+this.cjk.w+'px;height:'+this.cjk.h+'px;top:0;left:0;transform: translate('+this.cjk.x+'px,'+this.cjk.y+'px);';
		},
		backIm(){
			let x = (640-this.pic.w)/2 ;
			let y = (360-this.pic.h)/2;
			
			
			
			return 'width:'+this.pic.w+'px;height:'+this.pic.h+'px;transform: translate('+(x-this.cjk.x)+'px,'+(y-this.cjk.y)+'px);';
		},
		
		close(){
			this.$emit('input',{});
		},
	}
}
</script>

<style>
.pr_qpx{
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0,0,0,.3);
	width: 100%;	
	height: 100%;
	min-width: 1300px;
	text-align: left;
	z-index: 100;
}

.mp3_01x2{
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	width:720px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;	
}
.pcat_01{
	position: relative;
	margin: 0 auto;
	width:640px;
	height:360px;
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC) 0 0 repeat;
}
.pcat_02{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);

	max-width: 100%;
	max-height: 100%;
}
.pcat_03{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.5);
}
.pcat_04{
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
	box-sizing: border-box;
}
.pcat_05{
	position: absolute;
    top:0;
    left:0;
}
.tzk_01{
	position: absolute;
	top: 0;
	left: 0;
	box-sizing: border-box;
	border: 1px solid #33B3FF;
	width: 100%;
	height: 100%;
}
.tzk_01>div{
	position: absolute;
}
.tzk_02{
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.tzk_03{
	top: 0;
	left: 0;
	width: 2px;
	height: 100%;
	cursor: e-resize;
	background: #33B3FF;
}
.tzk_03,.tzk_05{
	top: 0;
	width: 2px;
	height: 100%;
	cursor: e-resize;
}
.tzk_03{	
	left: 0;	
}
.tzk_05{
	right: 0;	
}
.tzk_04,.tzk_06{
	
	left: 0;
	width: 100px;
	height: 2px;
	cursor: n-resize;
}
.tzk_04{
	top: 0;
}
.tzk_06{
	bottom: 0;
}
.tzk_07{
	left: 0;
	top: 0;
	
	width: 5px;
	height: 5px;
	cursor: nw-resize;
}
.tzk_08{
	right: 0;
	top: 0;

	
	width: 5px;
	height: 5px;
	cursor: ne-resize;
}
.tzk_09{
	right: 0;
	bottom: 0;
	
	width: 5px;
	height: 5px;
	cursor: nw-resize;
	
}
.tzk_10{
	left: 0;
	bottom: 0;
	
	width: 5px;
	height: 5px;
	cursor: ne-resize;
}
.pcat_bt{
	position: relative;
	margin: 40px 40px;
	height: 32px;
}
.pcat_bt_0x{
	position: absolute;
	right: 0;
	top: 0;
}
.pcat_bt_0x>span{
	display: inline-block;
	height:32px;
	text-align: center;
	font-size:14px;
	font-weight:400;
	color:#666666;
	line-height:32px;
}
.pcat_bt_0x>span.pcat_bt_0x1{
	margin-left: 32px;
	width:64px;
	background:rgba(51,179,255,1);
	border-radius:5px;
	color: #fff;
}
.pcat_bt>label{	
	margin-right: 40px;
    font-size: 15px;
    line-height: 16px;
}
.pcat_bt>label>span{
	display: inline-block;
	position: relative;
	vertical-align: top;
	
	width:16px;
	height:16px;
	border-radius: 50%;
	background:rgba(255,255,255,1);
	margin-right: 8px;
	
	box-sizing: border-box;
}
.pcat_bt>label>span:after{
	content: "";
	position: absolute;	
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 12px;
	height: 12px;
	background: #fff;
	border-radius: 50%;
}
.pcat_bt>label>span:before{
	content: "";
	position: absolute;	
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background: #BBBBBB;
}
.pcat_bt>label>span.chek:after{
	
	transform: translate(-50%,-50%) scale(.7);
	
}
.pcat_bt>label>span.chek:before{	
	background: #33B3FF;	
}
</style>
