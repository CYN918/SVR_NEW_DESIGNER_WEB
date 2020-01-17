<template>
	<div class="tols_05_0b" ref="boxW">
		<div class="tols_05_0bx">
			<div class="tols_05_0" >
				<div class="tols_05_1" >
					<span v-for="el in imgs">
						<img :src="el"/>
					</span>					
				</div>
				
				
				
				
			</div>
		</div>
		
		
		
		<div class="tols_05_2">
			
			<div class="setv02" :style="'width:'+eT+'px;'">
				
			</div>
			<div class="setv03" :style="'width:'+sT+'px;'">
				
			</div>
			
			
			<div class="setv01" :style="'right:'+eT+'px;left:'+sT+'px;'" ref="quy">
				
				<div class="setv01_2" :style="leftt">
					<span>{{clTime(bfz)}}</span>
				</div>
				
				
				<div 
				@mousedown="dragS2"
				class="setv01btn setv01_0" ref="zbtn">
					<i></i>
					<i></i>
					<i></i>
				</div>
				<div 
				@mousedown="dragS"
				class="setv01btn setv01_1" ref="yzbtn">
					<i></i>
					<i></i>
					<i></i>
				</div>
				
				
				
				<div class="timef time_1">{{clTime(bfb2)}}</div>
				
				<div class="timef time_3">{{clTime(bfb)}}</div>
				
			</div>
			
			<video v-once @canplay="canplay" class=" rdVideo" ref="yspic2"></video>
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
			imgs:[],
			isload:'',
			time:0,
			lzb:0,
			rzb:0,
			wid1:0,
			maxW:0,
			
			star:0,
			mov:0,
			
			sT:0,
			cT:0,
			eT:0,
			sTime:0,
			enTime:0,
			boxO:{},
			bfb:100,
			bfb2:0,
			con:{
				zs:24,
				maxzs:0
			},
			leftt:0,
			bfz:0,
			
			zsNum:24,
		}
	},
	methods:{
		clTime(num){
			let str = [0,0,0];
		
			let on = num%this.zsNum;
			if(on<10){
				on = '0'+on;
			}
			
			if(num<=this.zsNum){
				return '00:00:'+on;
			}
			
			let pn = (num-on)/this.zsNum;
			let ms = pn%60;
			if(ms<10){
				ms = '0'+ms;
			}
			if(pn<60){
				
				return '00:'+ms+':'+on;
			}
			
			let fz = (pn-ms)/60;
			if(fz<10){
				fz = '0'+fz;
			}	
			
			return fz+':'+ms+':'+on;
			
			
			
		},
		init(){			
			this.boxO = this.$refs.boxW.getBoundingClientRect();
		},
		pao(t){
			this.bfz = this.bfb2;
			this.leftt = '';
			let tim = t*1000;
			let L = this.bfb-this.bfb2;
			
			let ot = tim/L;
			
			
			
			
			
			let fn = ()=>{
				if(this.bfz>=this.bfb){
					this.bfz = this.bfb;
					return
				}
				this.bfz++;
		
				
				setTimeout(()=>{
					fn();
				},ot)
			}
			fn();
			let wdtth = this.$refs.quy.getBoundingClientRect().width-2;
			setTimeout(()=>{		
				this.leftt = 'transition:transform '+t+'s linear;transform: translateX('+wdtth+'px);'
			},25)
				
		
		},
		
		bT(t){
			
			let st1 = '',st2='';
			st2 = t%60;
			
			
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
			this.init();
			this.leftt = '';
			this.star = e.pageX;
			this.mov = this.eT;
			let max = this.boxO.width;
			let min = ((this.con.maxzs-this.bfb2-this.zsNum)/this.con.maxzs)*max;
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				this.eT =  this.mov-(e.pageX-this.star);
				if(this.eT<0){
					this.eT = 0;
				}
				if(this.eT>min){
					this.eT = min;
				}
				this.bfb = Math.ceil(((max - this.eT)/max)*this.con.maxzs);	
				this.$parent.setEnd((this.bfb*this.zsNum)/1000);
			}
			
			document.onmouseup =  ()=>{
			    document.onmousemove = document.onmouseup = null;
			}
		},
		dragS2(e){
			this.leftt = '';
			this.star = e.pageX;
			this.mov = this.sT;
			let max = this.boxO.width;
			let min = ((this.bfb - this.zsNum)/this.con.maxzs)*max;
			this.init();	
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				let on = this.mov + (e.pageX-this.star);
				if(on<0){
					on = 0;
				}
				if(on>min){
					on = min;
				}
				this.sT = on;
				this.bfb2 = Math.ceil((on/max)*this.con.maxzs);
				this.$parent.setStar((this.bfb2*this.zsNum)/1000);
			}
			 
			document.onmouseup =  ()=>{
				document.onmousemove = document.onmouseup = null;
			}

		},

		setUrl(on){
			this.init();
			this.$refs.yspic2.src = on;	
		},
		canplay(){	
			if(this.isload){
				return
			}
			this.isload = 1;
			this.time = this.$refs.yspic2.duration;
			this.con.maxzs =  Math.ceil(this.time*this.zsNum);
			this.bfb = this.con.maxzs;
			
			this.getImg();		
		},
		getImg(strT){
		
			var canvas = document.createElement("canvas");
			canvas.width = 64;
			canvas.height = 114;
			let jg =0;
			jg = +(this.time/20).toFixed(3);
			
			let on = new Array(20).fill('https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/header/logo.svg');
			
			this.imgs = on;
			let t=strT?strT:0;
			this.$refs.yspic2.currentTime = 0;
			let arr = [];
			let cr = ()=>{
				canvas.getContext('2d').drawImage(this.$refs.yspic2, 0, 0, canvas.width, canvas.height);
				arr.push(canvas.toDataURL("image/png"));
				let po = arr.length-1;
				
				this.imgs.splice(po,1,arr[po]);
				if(t<this.time){
				
					t = (+t+jg).toFixed(3);
					
					if(arr.length==19){
						t = this.time;
					}
					if(t>this.time){
						t = this.time;					
					}
			
					this.$refs.yspic2.currentTime = t;
				
					setTimeout(()=>{
						cr();
					},1300)
					return
				}
					
			}
		
			setTimeout(()=>{
				cr();
			},200)		
				 
		},

	}
}
</script>

<style>
.tols_05_0b{
	position: relative;
}
.tols_05_0bx{
	overflow: hidden;
	text-align: left;
	height: 114px;
	border-radius: 5px;

}
.tols_05_0{
	position: relative;
	display: inline-block;
	height: 114px;
	background: #006699;
	overflow: hidden;
	/* display: inline-block;
	 */
}
.tols_05_1{
	position: relative;
	width: 100%;
	height: 114px;
	overflow: hidden;
	white-space: nowrap;
}
.tols_05_1>span{
	display: inline-block;
	vertical-align: top;
	width: 65px;
	height: 114px;
	
}
.tols_05_1>span>img{
	display: block;
	vertical-align: top;
	width: 100%;
}
.tols_05_2{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.setv01{
	position: absolute;
	top: 0;
	left: 0;
	
	height: 110px;
	border-radius: 5px;
	border: 2px solid rgba(51,179,255,1);

}
.setv02{
	position: absolute;
	right: 0;
	top: 0;
	height: 100%;
	background: rgba(0,0,0,0.3);
}
.setv01>div{
	position: absolute;
	top: 25px;
}
.setv01btn{
	width:20px;
	height:54px;
	background:rgba(51,179,255,1);
	border-radius:10px;
}
.setv01btn>i{
	display: block;
	width:8px;
	height:8px;
	background:rgba(255,255,255,1);
	margin: 5px auto 0;
	border-radius: 50%;
}
.setv01btn>i:nth-child(1){
	margin-top: 10px;
}

.setv01_0{
	left: -10px;
}
.setv01_1{
	right: -10px;
}

.setv01>div.setv01_2{
	position: absolute;
	width: 1px;
	height: 100%;
	background: rgba(51,179,255,1);
	top: 0;
	left: 0;	
}
.setv01_2>span{
	position: absolute;
    top: -33px;
    left: -35px;
    width: 65px;
    height: 27px;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.05);
    font-size: 12px;
    line-height: 27px;
}
.setv01_2>span:after{
	content: "";
    position: absolute;
    left: 50%;
    bottom: -8px;
    width: 10px;
    height: 10px;
    background: #fff;
    -webkit-transform: rotate(45deg) translateX(-50%);
    transform: rotate(45deg) translateX(-50%);
    border-right: 0;
    border-bottom: 0;
}



.setv03{
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	background: rgba(0,0,0,0.3);
	
}
.setv01>.timef{
	position: absolute;
	top: 122px;	
}
.time_1{
	left: 0;
}
.time_2{
	left: 50%;
	transform: translateX(-50%);
}
.time_3{
	right: 0;
}
.rdVideocz{
	    position: fixed;
	    top: 0;
	    /* bottom: 0; */
	    left: 0;
	    width: 0;
	    /* height: 0; */
	    /* border: none; */
	    /* background: none; */
	    width: 300px;
	    height: 300px;
}
</style>
