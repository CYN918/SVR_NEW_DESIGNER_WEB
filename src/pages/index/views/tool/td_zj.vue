<template>
	<div :style="backtop()" @contextmenu="contexMs($event)" class="imgd">
		<div :style="bgtf()" class="setToll0"></div>
		<div class="setToll">
			<div @mousedown="jl3($event)" class="setToll1"></div>
			<div @mousedown="jl2($event)"  class="setToll2"></div>
			<div @mousedown="jl($event)" class="setToll3"></div>
			<!-- <div @click="showcj($event,{n:'audio',o:index},value)" class="setToll4">
				<i></i><i></i><i></i>
			</div> -->
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
		backtop(){
			let el = this.value;
			let str = "width:"+((el.cut_end-el.cut_start)/this.bl)*this.wdk+"px;transform:translateX("+((el.start/this.bl)*this.wdk)+"px);";			
			if(el.ischeck){
				str+='z-index:2;';
			}		
			return str;
		},
		bgtf(){
			let el = this.value;
			if(!el){return}
			let url = el.type=='pic'?el.file_url:el.fps_pic;
			return "background:url("+url+") 0 0/auto 100% repeat-x;";
		},
		contexMs(e,b){
			if(e.button != "2"){
				return
			}
			e.preventDefault();
			this.$parent.contexMs(e,b);
		},
		
		showcj(){
			
		},
		jl(e,el,index,list){
			e.preventDefault();
			this.checkDOm(el);
			this.tdStar = e.pageX;			
			let wid = el.long*this.wdk;	
			let mv = ((el.long-el.cut_end)/el.long)*wid;
			
			let max = +el.long;	
			if(el.type=='pic'){
				max = 999999;
			}		
			let min = el.cut_start+1;
			let prEnd,prStar,nxEnd,nxStar;
			let doml = list[index-1];
			let cen = el.cut_end;
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				e.preventDefault();
				let on = -(this.tdStar-e.pageX)/(this.wdk/this.bl);
				
				let pn = +cen+on;
				if(+pn>max){
					pn = max;
				}				
				if(pn<min){
					pn = min;
				}	
			
				// pn = pn*this.bl;
				el.cut_end = pn;
				this.setHm(index,el,list);		
			}			 
			document.onmouseup =  ()=>{
				document.onmousemove = document.onmouseup = null;
			}
		},
		setHm(on,el,list){
			
			let ond = el.start+(el.cut_end-el.cut_start);
			for(let i=on,n=list.length;i<n;i++){
				if(list[i+1]){
					list[i+1].start = list[i].start+(list[i].cut_end-list[i].cut_start);
				}
				
			}
		
		},
		jl3(e,el,onc,list){
			e.preventDefault();
			this.checkDOm(el);
			this.tdStar = e.pageX;	
			let cs = el.start;
			let wid = el.long*this.wdk;
			let ond = onc-1;
			let ondn = onc+1;
			let tms = el.cut_end-el.cut_start;
			
			let prEnd,prStar,nxEnd,nxStar;
			let prd = list[ond];
			if(prd){
				
				prEnd = +prd.start +(prd.cut_end-prd.cut_start);
				prStar = prd.start;
			}
			let nxd = list[ondn];
			if(nxd){
				nxEnd = +nxd.start+(nxd.cut_end-nxd.cut_start);
				nxStar = nxd.start;
			}
		
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				e.preventDefault();				
				let on = -(this.tdStar-e.pageX)/(this.wdk/this.bl);
			
				let dd = +cs+on;
			
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
				let on = +(((e.pageX-this.tdStar)/wid)*el.long).toFixed(3);
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
			this.checkDOm(el);
			this.tdStar = e.pageX;
			let wid = el.long*this.wdk;	
			let timd = el.cut_end-el.cut_start;
			
			let max = (+timd)-1;
			let osta = el.start;
			let stad = el.start-el.cut_start;
			let cuat = el.cut_start;
			
			let min = 0;
			
			let ond = list[index-1];
			if(ond){
				min = ond.start+(ond.cut_end-ond.cut_start);				
			}
			
			
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				e.preventDefault();
				let on = -(this.tdStar-e.pageX)/(this.wdk/this.bl);
					
				let pn = (+cuat+on);
					
				if(+pn<min){
					pn = min;
				}			
				if(+pn>max){
					pn = max;
				}
				
				el.cut_start = pn;
				
				
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
