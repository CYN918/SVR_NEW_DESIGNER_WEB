<template>
	<div class="tols_04x">
		<div class="tols_04">
			<div class="tols_04_1 tobtn">
				<span class="chekd">视频</span>
			</div>
			<div class="tols_04_2 tobtn">
				<span 
				@click="sdbq(el)"
				v-for="el in sd_01"
				:class="['pend',value.video_sd==el?'chekd':'']"
				>{{el}}x</span>
			</div>
		</div>
		<div class="tols_05">
			<div class="tols_05_0b" ref="boxW">
				<div class="tols_05_0bx">
					<div class="tols_05_0" >
						<div class="tols_05_1" >
							
							
							<img :src="value.video_fps_pic"/>	
						</div>
					</div>
				</div>
				<div class="tols_05_2">
					
					<div 
					class="setv02" 
					:style="'width:'+(100-back_l(value.video_endT))+'%;'"></div>
					<div
					class="setv03" 
					:style="'width:'+back_l(value.video_starT)+'%;'"></div>
					<div 
					class="setv01" 
					:style="'right:'+(100-back_l(value.video_endT))+'%;left:'+back_l(value.video_starT)+'%;'" 
					ref="quy">
						
						<div 
						@mousedown="dragS"
						class="setv01btn setv01_0" ref="zbtn">
							<i></i>
							<i></i>
							<i></i>
						</div>
						<div 
						@mousedown="dragE"
						class="setv01btn setv01_1" ref="yzbtn">
							<i></i>
							<i></i>
							<i></i>
						</div>
						<div class="timef time_1">{{clTime(this.value.video_starT)}}</div>				
						<div class="timef time_3">{{clTime(this.value.video_endT)}}</div>				
					</div>	
					<div class="setv01_2" :style="leftt">
						<span>{{clTime2(bfT)}}</span>
					</div>
				</div> 
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
			sd_01:[
				'2.25',
				'0.5',
				'1.0',
				'1.25',
				'1.5'
			],
			imgs:[],
			isload:'',
			boxO:{},
			leftt:0,
			star:0,
			mov:0,
			bfT:0,
		}
	},
	methods:{
		sdbq(on){
			this.value.video_sd = on;
		},
		init(){
			this.boxO = this.$refs.boxW.getBoundingClientRect();
		},
		back_l(nm){
			return (nm/this.value.video_max)*100;
		},
		clTime2(dz){
			let tm = Math.ceil(dz/this.value.video_fps);
			let zs = dz%this.value.video_fps;
			if(zs<10){
				zs = '0'+zs;
			}
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
			
			return fn+':'+ms+':'+zs;
		},
		stop(){
			
		},
		pao(){			
			let zxJg = 1000/this.value.video_fps;
			let star_z = parseInt(this.value.video_starT*this.value.video_fps);
			let lenz = Math.ceil(this.value.video_endT*this.value.video_fps);	
			let endT = this.value.video_endT-this.value.video_starT;
			let maxzs = Math.ceil(this.value.video_max*this.value.video_fps);		
			let mt = (endT*1000)/(lenz-star_z);
			var fnsd = ()=>{
				if(star_z+1>=lenz){
					star_z = lenz;
					this.bfT = star_z;
					this.leftt = 'left:'+((star_z/maxzs)*100)+'%;';
					return
				}
		
				star_z++;
				this.bfT = star_z;
				this.leftt = 'left:'+((star_z/maxzs)*100)+'%;';
				setTimeout(fnsd,zxJg)
			};
			fnsd();
			return
			let fnd = ()=>{
				
				if(on>=maxL){
					on = maxL;
					this.leftt = 'left:'+on+'%;';
					return
				}
				on = on+gk;
				this.leftt = 'left:'+on+'%;';
				this.bfT = (on/1300)*this.value.video_max;
				setTimeout(()=>{
					fnd();
				},1000/60)
				
			}
			fnd();
			
			return
			let setx = ()=>{
				if(on>=maxL){
					on = maxL;
					this.leftt = 'transform: translateX('+on+'px);';
					
					return
				}
				
				on = on+gk;
				this.leftt = 'transform: translateX('+on+'px);';
				window.requestAnimationFrame(setx)
			};
			
			window.requestAnimationFrame(setx)
			return
			let fn = ()=>{
				if(starz>=endz){
					starz = endz;
					this.bfz = this.value.video_endT;
					
					this.leftt = 'transform: translateX('+((this.value.video_endT/this.value.video_max)*1300)+'px);'
					return
				}
				starz++;
				this.bfT = starz/this.value.video_fps;
			
				let od = (this.bfT/this.value.video_max)*1300;
				this.leftt = 'transform: translateX('+od+'px);'
				setTimeout(()=>{
					fn();
				},50)
			}
			fn();
			
									
		},
		dragS(e){
			this.init();
			
			this.star = e.pageX;
			this.mov = +this.value.video_starT;
			let max = 30;
			let min = 1;			
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				let wdt = (+this.mov + ((e.pageX-this.star)/1300)*this.value.video_max).toFixed(3);
				if(wdt<0){
					wdt=0;
				}
				if(wdt>this.value.video_max){
					wdt = this.value.video_max;
				}
				let vt = this.value.video_endT-wdt;
				if(vt<1){
					wdt = this.value.video_endT-1;
				}
				if(vt>30){
					wdt = this.value.video_endT-30;
				}
				this.value.video_starT = wdt;
			
			}
			
			document.onmouseup =  ()=>{
			    document.onmousemove = document.onmouseup = null;
			}
		},
		dragE(e){
			this.init();
		
			this.star = e.pageX;
			this.mov = +this.value.video_endT;
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				let on = (+this.mov + ((e.pageX-this.star)/1300)*this.value.video_max).toFixed(3);
			
			
				if(on>this.value.video_max){
					on = this.value.video_max;
				}
				let vt = on-this.value.video_starT;
				if(vt<1){
					on = this.value.video_starT+1;
				}
				if(vt>30){
					on = this.value.video_starT+30;
				}
				this.value.video_endT = on;
				
			}
			 
			document.onmouseup =  ()=>{
				document.onmousemove = document.onmouseup = null;
			}
		
		},
		clTime(t){
			let num = Math.ceil(t*this.value.video_fps);		
			let zs = num%this.value.video_fps;
			if(zs<10){
				zs = '0'+zs;
			}
			let mt = Math.ceil(t);
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
			
			return fn+':'+ms+':'+zs;
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
.tols_05_1>img{
	pointer-events: none;
	display: block;
	height: 100%;
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

.setv01_2{
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
	color: #33B3FF;
}
.time_1{
	left: -34px;
}
.time_2{
	left: 50%;
	transform: translateX(-50%);
}
.time_3{
	
	right: -34px;
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
