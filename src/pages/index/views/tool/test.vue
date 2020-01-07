<template>

		<div class="box_01x">
			<input type="file" @change="sup">
			<input type="file" @change="sup2">
			<video @timeupdate="set" class="testC" @canplay="canplay"  ref="vi"></video>
			<div @click="bf" class="bof"></div>
			<div class="lod_01">
				<!-- <btnSc v-model="starT" :con="yp"></btnSc> -->
	<!-- 		<btnSc v-model="starT" :con="starCom"></btnSc>
				<btnSc v-model="endT"  :con="endCom"></btnSc> -->
				
			</div>
			<!-- <div class="lod_01">
				<btnSc v-model="starT2" :con="starCom2"></btnSc>
				<btnSc v-model="endT2"  :con="endCom2"></btnSc>
				
			</div> -->
			<div class="imgs">
				<img v-for="el in imgs" :src="el"/>
			</div>
			
			<video  @canplay="canplay2" class="ysPic" ref="yspic"></video>
		</div>

</template>

<script>
import btnSc from './togBtn';
export  default{

	components:{btnSc},
	data(){
		return{
			imgs:[],
			time:0,
			time2:0,
			starT:0,
			endT:0,
			starT2:0,
			endT2:0,
			starCom:{
				time:0,
				leng:0,
			},
			endCom:{
				time:0,
				leng:0,
			},
			starCom2:{
				time:0,
				leng:0,
			},
			endCom2:{
				time:0,
				leng:0,
			},
			yp:{
				time:0,
				width:100,
				leng:0,
			},
			isload:'',
		}
	},
	mounted: function () {
		// this.getImg();
	}, 
	methods:{
		sup(e){
			let video = e.target.files[0];		
			let vi = URL.createObjectURL(video);
			this.$refs.vi.src = vi;	
		},
		sup2(e){
			let video = e.target.files[0];		
			let vi = URL.createObjectURL(video);
			this.$refs.vi2.src = vi;	
		},
		canplay(){
			this.time = this.$refs.vi.duration;
			this.starCom.leng = this.time;
			this.endCom.leng = this.time;
			this.$refs.yspic.src = this.$refs.vi.src;
		
		},
		canplay2(){
			
			// this.$refs.yspic.play();
			if(this.isload){
				return
			}
			this.isload = 1;
			this.getImg();

		},
		setcurrentTime(t){		
			this.$refs.vi.currentTime = t;
		},	
		setcurrentTime2(t){
			
			this.$refs.vi2.currentTime = t;
		},	
		set(){
			// if(this.$refs.vi.currentTime>=this.endT){
			// 	this.$refs.vi.pause();
			// }
			
		},
		set2(){
			
			// if(this.$refs.vi2.currentTime>=this.endT2){
			// 	this.$refs.vi2.pause();
			// }			
		},
		bf(){
	
	// 		this.setcurrentTime(this.starT);
	// 		this.setcurrentTime2(this.starT2);
			this.$refs.vi.play();
			// this.$refs.vi2.play();
			
		},
			
		getImg(){
			var scale = 0.3;
			var canvas = document.createElement("canvas");
			canvas.width = this.$refs.vi.videoWidth * scale;
			canvas.height = this.$refs.vi.videoHeight * scale;
			let jg =2 ;
			if(this.time<30){
				jg = this.time/15;
			}
			
			let t=0;
			this.$refs.yspic.currentTime = 0;
			let arr = [];
			let cr = ()=>{
				canvas.getContext('2d').drawImage(this.$refs.yspic, 0, 0, canvas.width, canvas.height);
				arr.push(canvas.toDataURL("image/png"));
				if(t<this.time){
					t+=jg;
					if(t>this.time){
						t = this.time;					
					}
					this.$refs.yspic.currentTime = t;
					setTimeout(()=>{
						cr();
					},60)					
				}else{
					this.imgs = arr;
				}				
			}
			setTimeout(()=>{
				cr();
			},50)		
				 
		}	
		
	}
}
</script>

<style>
#app > div.box_01x{
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
}
#app > div.box_01x>div{
	width: 100%;
	padding: 0;
	min-height: 0;
	border: none;
}
.testC{
	margin: 0 auto;
    width: 231px;
    height: 500px;
}
.lod_01{
	position: relative;
	width: 1000px !important;
	height: 40px;
	background: #0055AA;
}
.bof{
	width: 40px;
	height: 40px;
	background: #000;
	border-radius: 50%;
}
.testC2{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 0;
	height: 0;
	
}

.ysPic{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 10px;
	height: 60px;
}
.imgs>img{
	display: inline-block;
	vertical-align: top;
	width: 40px;
	height: 100px;
}
</style>
