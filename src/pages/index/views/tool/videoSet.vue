<template>
	<div class="tols_05_0b">
		<div class="tols_05_0bx">
			<div class="tols_05_0" ref="boxW">
				<div class="tols_05_1">
					<span v-for="el in imgs">
						<img :src="el"/>
					</span>
					
				</div>
			</div>
		</div>
		
		
		
		<div class="tols_05_2">
			
			<!-- <div class="setv02" :style="'width:'+cLW(eT)+'%;'">
				
			</div> -->
			<!-- <div class="setv03" :style="'width:'+cLW(sT)+'%;'">
				
			</div> -->
			
			
			<div class="setv01" :style="'right:'+eT+'px;left:'+sT+'px;'" ref="quy">
				
				<div class="setv01_2" :style="leftt">
					<span>{{bfz}}</span>
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
				
				
				
				<div class="timef time_1">{{bfb2}}</div>
				
				<div class="timef time_3">{{bfb}}</div>
				
			</div>
			
			<video @canplay="canplay" class="rdVideo" ref="yspic2"></video>
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
		}
	},
	methods:{
		init(){			
			this.boxO = this.$refs.boxW.getBoundingClientRect();
		},
		pao(t){
			this.leftt = '';
			this.bfz = this.bfb2;
			
		
			let tims = ((this.bfb-this.bfb2)*24)/1000;
			let wdtth = this.$refs.quy.getBoundingClientRect().width-2;
			
			let L = this.bfb-this.bfb2;
			let mit = L/tims;
			let fn = ()=>{
				if(this.bfz>=this.bfb){
					return
				}
				setTimeout(()=>{
					this.bfz++;
				},mit)
			};
			fn();
			// let dod = ()=>{
			// 	this.bfz++;
			// 	if(this.bfz<this.bfb){
			// 		window.requestAnimationFrame(dod);
			// 	}
			// };
			// dod();
			
			setTimeout(()=>{
				
				
				
				this.leftt = 'transition:transform '+tims+'s linear;transform: translateX('+wdtth+'px);'
				
			},25)
			
		},
		cLW(t){
			return
			// if(!t){return}
			// return (t/this.time).toFixed(2);
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
			
			this.star = e.pageX;
			this.mov = this.eT;
			
			document.onmousemove = (e)=>{
				
				this.eT =  this.mov-(e.pageX-this.star);
				let max = this.boxO.width;
				
				if(this.eT<0){
					this.eT = 0;
				}
				if(this.eT>max){
					this.eT = max;
				}
				this.bfb = Math.ceil(((max - this.eT)/max)*this.con.maxzs);	
				// this.$parent.setcurrentTime((this.bfb*24)/1000);
				this.$parent.setEnd((this.bfb*24)/1000);
			}
			
			document.onmouseup =  ()=>{
			    document.onmousemove = document.onmouseup = null;
			}
		},
		dragS2(e){
			this.star = e.pageX;
			this.mov = this.sT;
			this.init();	
			document.onmousemove = (e)=>{
				let on = this.mov + (e.pageX-this.star);
				let max = this.boxO.left+this.boxO.width;
				console.log(this.boxO.width)
				if(on<0){
					on = 0;
				}
				if(on>this.boxO.width){
					
					on = this.boxO.width;
				}
				this.sT = on;
			
				this.bfb2 = Math.ceil((on/this.boxO.width)*this.con.maxzs);
				this.$parent.setStar((this.bfb2*24)/1000);
			}
			 
			document.onmouseup =  ()=>{
				document.onmousemove = document.onmouseup = null;
			}
			
			// this.wid1 = x;
			// this.wid2= this.wid2-x;
			// if(x>1000){x = 1000;}
			// if(x<0){x = 0;}
			// this.py_cs = x;		
			// let on = (this.py_cs/1000).toFixed(4)*this.con.leng;
			// this.$emit('input',on);	
		},
		dragD(e){
			// let x = e.x;
			
			
			// if(x>1000){x = 1000;}
			// if(x<0){x = 0;}
			// this.py_cs = x;
			// let on = (this.py_cs/1000).toFixed(4)*this.con.leng;
			// this.$emit('input',on);	
		},
		setUrl(on){
			this.init();
			this.$refs.yspic2.src = on;	
			
			
			
		},
		canplay(){			
			this.time = this.$refs.yspic2.duration;
			this.con.maxzs =  Math.ceil(this.time*24);
			this.bfb = this.time;
			if(this.isload){
				return
			}
			this.isload = 1;
		
			this.getImg();		
		},
		getImg(strT){
			return
			var canvas = document.createElement("canvas");
			canvas.width = 64;
			canvas.height = 114;
			let jg =2 ;
			if(this.time<30){
				jg = this.time/15;
			}
			
			let t=strT?strT:0;
			this.$refs.yspic2.currentTime = 0;
			let arr = [];
			let cr = ()=>{
				canvas.getContext('2d').drawImage(this.$refs.yspic2, 0, 0, canvas.width, canvas.height);
				arr.push(canvas.toDataURL("image/png"));
				if(t<this.time){
					t+=jg;
					if(t>this.time){
						t = this.time;					
					}
					this.$refs.yspic2.currentTime = t;
					setTimeout(()=>{
						cr();
					},100)					
				}else{
					this.imgs = arr;
				
					setTimeout(()=>{
						this.setT();
					},50)
				}				
			}
			
			setTimeout(()=>{
				cr();
			},200)		
				 
		},
		setT(){
			// this.sT = 0;			
			// if(this.time>30){
			// 	this.eT = 30;
			// }
			// if(this.time<30){
			// 	this.eT = this.time;
			// }						
			// this.cT = Math.ceil(this.eT/2);		
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
	
	border-radius: 5px;
	background: url(http://zk-new-designer.oss-cn-beijing.aliyuncs.com/91db75cfbb98611da65ea7908f2aa09d) 0 0/auto 100% no-repeat;
}
.tols_05_0{
	width: 100%;
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
	background: #008200;
	width: 64px;
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
</style>
