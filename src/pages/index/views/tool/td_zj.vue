<template>
	<div :style="backtop(value)" @contextmenu="contexMs($event)" class="imgd">
		<div :style="bgtf(value)" class="setToll0"></div>			
			<div   class="setToll">
				<div @mousedown="tdFn($event)" class="setToll1"></div>
				<div @mousedown="tdFn($event)"  class="setToll2"></div>
				<div @mousedown="tdFn($event)" class="setToll3"></div>
				<div @click="showcj($event,value)" class="setToll4">
					<i></i><i></i><i></i>
			</div>
		</div>										
	</div>
	
</template>

<script>
export default{
	props:{
		value:Object,
		conf:Object,
		on:Number
	},
	data(){
		return{
			wdk:21,
			bl:1,
		}
	},
	methods:{
		backtop(el){
			let str = "width:"+((el.cut_end-el.cut_start)/this.conf.bl)*this.conf.wdk+"px;transform:translateX("+((el.start/this.bl)*this.wdk)+"px);";			
			if(el.ischeck){
				str+='z-index:2;';
			}	
			return str;
		},
		bgtf(el){
			if(!el){return}
			let url = el.type=='pic'?el.file_url:el.fps_pic;
			return "background:url("+url+") 0 0/auto 100% repeat-x;";
		},
		contexMs(e,b){
			if(e.button != "2"){
				return
			}
			e.preventDefault();
			// let dom =  e.target.getBoundingClientRect();
			// if(b){
			// 	this.xzData = b;
			// }
			// this.csad = 'display:block;top:'+(e.y-5)+'px;left:'+(e.x-22)+'px';
			// let fn = ()=>{
			// 	setTimeout(()=>{
			// 		this.csad = '';
			// 	},100)
			// };
			// this.clerClick(fn)
		},
		
		showcj(){
			
		},
	
		getCon(el){
			let obj = {};
			obj.min = el.cut_start+1;
			obj.max = +el.long;
			if(el.type=='pic'){
				obj.max = 999999;
			}
				
			return obj;
		},
		tdFn(e){
			e.preventDefault();
			let el = this.value;
			let tdStar = e.pageX;			
			let wid = el.long*this.wdk;	
			let mv = ((el.long-el.cut_end)/el.long)*wid;
			let max = this.setMax(el);				
			let min = this.setMin(el);
			
			let con = this.getCon(el);
			
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				e.preventDefault();
				let on = +(((e.pageX-tdStar-con.mv)/wid)*el.long).toFixed(3);
				let pn = +el.long+on;
				if(+pn>con.max){
					pn = con.max;
				}				
				if(pn<con.min){
					pn = con.min;
				}	
				el.cut_end = Math.round((pn*100)/100);
				this.setHm(el);		
			}			 
			document.onmouseup =  ()=>{
				document.onmousemove = document.onmouseup = null;
			}
		},
		setHm(){
			if(!this.$parent.setHm){
				return
			}
			this.$parent.setHm(this.on,this.value);		
		},
		
		jl3(e,el,onc,list){
			e.preventDefault();
		
			let tdStar = e.pageX;	
			let cs = el.start;
			let wid = el.long*this.wdk;
			let ond = onc-1;
			let ondn = onc+1;
			let tms = el.cut_end-el.cut_start;
			
			let prEnd,prStar,nxEnd,nxStar;
			let prd = list[ond];
			
			
			let max = max;
			let min = min;
			
			// if(prd){
				
			// 	prEnd = +prd.start +(prd.cut_end-prd.cut_start);
			// 	prStar = prd.start;
			// }
			// let nxd = list[ondn];
			// if(nxd){
			// 	nxEnd = +nxd.start+(nxd.cut_end-nxd.cut_start);
			// 	nxStar = nxd.start;
			// }
		
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				e.preventDefault();
				let on = +(((e.pageX-this.tdStar)/wid)*el.long).toFixed(3);
			
				let dd = Math.round(((+cs+(on))*100)/100);
				if(prd && dd<prEnd){
					dd = prEnd;					
				}
				if(nxd && (dd+tms)>nxStar){
					dd = nxStar-tms;
				}
				if(dd<0){
					dd = 0;
				}
				el.start =  dd;
			}			 
			document.onmouseup =  (e)=>{
				e.preventDefault();
				let on = +(((e.pageX-tdStar)/wid)*el.long).toFixed(3);
				let dd = Math.round(((+cs+(on))*100)/100);				
				if(prStar || prStar==0){					
					if(dd<=prEnd-((prEnd-prStar)/2)){					
						list[onc].start = list[ond].start;
						list[ond].start = list[onc].start+(list[onc].cut_end-list[onc].cut_start);
						list.splice(ond,2,list[onc],list[ond]);
					}
				}			
				if(nxStar || nxStar==0){					
					if(dd>=nxStar+((nxEnd-nxStar)/2)){				
						list[ondn].start = list[onc].start;
						list[onc].start = list[ondn].start+(list[ondn].cut_end-list[ondn].cut_start);
						list.splice(onc,2,list[ondn],list[onc]);
					}
					
				}
				
				document.onmousemove = document.onmouseup = null;
			}
		},
		jl2(e,el,index,list){
			e.preventDefault();
			let tdStar = e.pageX;
			let wid = el.long*this.wdk;	
			let mv = ((el.long-el.cut_start)/el.long)*wid;
			let max = +el.cut_end-1;
			let osta = el.start;
			let stad = el.start-el.cut_start;
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				e.preventDefault();
				let on = +(((tdStar-e.pageX+mv)/wid)*el.long).toFixed(3);			
				let pn = +el.long-on;	
				if(+pn<0){
					pn = 0;
				}			
				if(+pn>max){
					pn = max;
				}
				let opd = Math.round((pn*100)/100);
				let pnmin = stad+opd;
				let ond = list[index-1];
				if(ond){
					let maxd = ond.start+(ond.cut_end-ond.cut_start);
					if(pnmin<maxd){
						el.cut_start = maxd-stad;												
						el.start = maxd;						
						return
					}
					
				}
				
				el.cut_start = opd;
				el.start = 	stad+el.cut_start;					
			}									 
			document.onmouseup =  ()=>{
				document.onmousemove = document.onmouseup = null;
			}
		},

	}
}
</script>

<style>
</style>
