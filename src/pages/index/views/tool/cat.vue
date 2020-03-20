<template>
	<div class="pr_qpx" >
		<div class="mp3_01x2">
			<div class="mp3_01x_1">
				<span class="a">视频剪辑</span><img @click="close()" class="pend b" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/cj_00.svg">
			</div>
			<div class="pcat_01">
				<img class="pcat_02" :src="value.data.cover_img" ref="bgh"/>
				
				<div class="pcat_03"></div>
				<div @mousedown="jl" class="pcat_04" :style="backys()">
					<img :style="backIm()" class="pcat_05" :src="value.data.cover_img"/>					
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
			pic:{
				w:0,
				h:0,
				x:0,
				y:0
			},
			cjk:{
				x:0,
				y:0,
				w:0,
				h:0
			},
		}
	},
	beforeDestroy:function(){
		
		document.body.style = "";
	},
	watch:{

	},
	mounted: function () {
		this.init();
	}, 
	methods:{
		jl(e){
			let tdStar = e.pageX;	
			document.onmousemove = document.onmouseup = null;
			document.onmousemove = (e)=>{
				this.cjk.x = 0;
				this.cjk.y = 0;
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
			console.log(el);
			if(el.h>el.w){
				pr.w = el.w;
				pr.h = (el.w/9)*16;
				
				pr.fd = (360-pr.h)/pr.h;
			
			}else{
				pr.h = el.h;
				pr.w = (el.h/16)*9;
				pr.fd = (640-pr.w)/pr.w;
			}
			pr.x=(640-pr.w)/2;
			pr.y=(360-pr.h)/2;
			this.cjk = pr;
		},
		backys(){
			return 'width:'+this.cjk.w+'px;height:'+this.cjk.h+'px;top:0;left:0;transform: translate('+this.cjk.x+'px,'+this.cjk.y+'px);';
		},
		backIm(){
			let x = (640-this.cjk.w)/2;
			let y = (360-this.cjk.h)/2;
			return 'width:'+this.pic.w+'px;height:'+this.pic.h+'px;transform: translate('+(-x)+'px,'+(-y)+'px);';
		},
		init(){		
			setTimeout(()=>{
				let dop = this.$refs.bgh.getBoundingClientRect();
				this.picset(dop);				
				this.cjkset(this.pic);								
			},50)
			document.body.style = "overflow: hidden;";
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
	height:555px;
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
	border:1px solid #0000CC;
	overflow: hidden;
	box-sizing: border-box;
}
.pcat_05{
	position: absolute;
    top:0;
    left:0;
}
</style>
