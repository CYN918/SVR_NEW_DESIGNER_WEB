<template>
	<div>
		<div :style="backtop(el,index)" class="imgd" v-for="(el,index) in value">
			<div @click="checkDOm($event,el,index,'media')" class="setToll0">
				<img v-if="el.type=='pic'" :src="el.file_url">
				<img v-if="el.fps_pic" :src="el.fps_pic">	
			</div>
			
			<div  v-if="el.ischeck" class="setToll">
				<div @mousedown="jl3($event,el,index,value)" class="setToll1"></div>
				<div @mousedown="jl2($event,el,index,value)"  class="setToll2"></div>
				<div @mousedown="jl($event,el,index,value)" class="setToll3"></div>
				<div class="setToll4">
					<i></i><i></i><i></i>
					<input @blur="csb" @focus="csa($event,{n:'media',o:index})" class="setToll4_1" type="text">				
					<div :style="csad" class="setToll4_2">
						<span @click="cats()">裁剪</span>
						<span>复制</span>
						<span @click="delt()">删除</span>
					</div>				
				</div>
			</div>							
			
		</div>
	</div>
</template>
<script>
export default{
	props:{
		value:Array,
	},
	data(){
		return{
			checkDOmx:'',
			csad:'',
			xzData:'',
			fd:[
				{s:10,jg:1},
				{s:60,jg:60},
				{s:120,jg:120},
			],
			fdjb:0,
			wdk:21,
		}
	},
	methods:{
		backtop(el,index){
			let str = "width:"+((el.cut_end-el.cut_start)/this.fd[this.fdjb].jg)*this.wdk+"px;transform:translateX("+((el.start*this.fd[this.fdjb].jg)*this.wdk)+"px);";			
			if(el.ischeck){
				str+='z-index:2;';
			}	
			return str;
		},
		jl(e,el,index,list){
			e.preventDefault();
			this.tdStar = e.pageX;			
			let wid = el.long*this.wdk;	
			let mv = ((el.long-el.cut_end)/el.long)*wid;
			let max = +el.long;			
			let min = el.cut_start+1;
			let prEnd,prStar,nxEnd,nxStar;
			let doml = list[index-1];
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				e.preventDefault();
				let on = +(((e.pageX-this.tdStar-mv)/wid)*el.long).toFixed(3);
				let pn = +el.long+on;
				if(+pn>max){
					pn = max;
				}				
				if(pn<min){
					pn = min;
				}			
				el.cut_end = Math.round((pn*100)/100);
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
			this.tdStar = e.pageX;
			let wid = el.long*this.wdk;	
			let mv = ((el.long-el.cut_start)/el.long)*wid;
			let max = +el.cut_end-1;
			let osta = el.start;
			let stad = el.start-el.cut_start;
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				e.preventDefault();
				let on = +(((this.tdStar-e.pageX+mv)/wid)*el.long).toFixed(3);			
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
		
		checkDOm(e,el,on,dom){
			if(e && e.stopPropagation()) {
				e.stopPropagation();
			} else {
				e.cancelBubble = false;
			}
			if(this.checkDOmx){
				if(el.fid!=this.checkDOmx.fid){
					this.checkDOmx.ischeck = '';
				}
			}
			
			
			if(el.ischeck==1){
				return
			}			
			el.ischeck = 1;		
			this.checkDOmx = el;		
		
		
		},	
		csa(e,b){
			let dom =  e.target.getBoundingClientRect();
			if(b){
				this.xzData = b;
			}
			
			this.csad = 'display:block;';
		},
		csb(e){
			setTimeout(()=>{
				this.csad = '';
			},200)
			
		}
	}
}
</script>

<style>
</style>
