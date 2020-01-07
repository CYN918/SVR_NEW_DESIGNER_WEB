<template>

		<div class="box_01x">
			<input type="file" @change="sup">
			<input type="file" @change="sup2">
			<video @timeupdate="set" class="testC" controls=true @canplay="canplay" src="http://zk-new-designer.oss-cn-beijing.aliyuncs.com/62be2dc2728590b29e8f5b435d680d4d.mp4" ref="vi"></video>
			<video @timeupdate="set2" class="testC2" controls=true @canplay="canplay2" src="" ref="vi2"></video>
			
			<div @click="bf" class="bof"></div>
			<div class="lod_01">
				<btnSc v-model="starT" :con="yp"></btnSc>
	<!-- 			<btnSc v-model="starT" :con="starCom"></btnSc>
				<btnSc v-model="endT"  :con="endCom"></btnSc> -->
				
			</div>
			<!-- <div class="lod_01">
				<btnSc v-model="starT2" :con="starCom2"></btnSc>
				<btnSc v-model="endT2"  :con="endCom2"></btnSc>
				
			</div> -->
		</div>

</template>

<script>
import btnSc from './togBtn';
export  default{

	components:{btnSc},
	data(){
		return{
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
			}
		}
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
		
		},
		canplay2(){
			
			this.time2 = this.$refs.vi2.duration;
			this.yp.width = (this.time/this.time2).toFixed(4)*100;
			
			this.starCom2.leng = this.endCom.leng;
			this.endCom2.leng = this.endCom.leng;

		},
		setcurrentTime(t){		
			this.$refs.vi.currentTime = t;
		},	
		setcurrentTime2(t){
			
			this.$refs.vi2.currentTime = t;
		},	
		set(){
			if(this.$refs.vi.currentTime>=this.endT){
				this.$refs.vi.pause();
			}
			
		},
		set2(){
			
			if(this.$refs.vi2.currentTime>=this.endT2){
				this.$refs.vi2.pause();
			}			
		},
		bf(){
	
			this.setcurrentTime(this.starT);
			this.setcurrentTime2(this.starT2);
			this.$refs.vi.play();
			this.$refs.vi2.play();
		},
			
		// dragE(e){

		// 	let on = (this.py_cs/1000).toFixed(4);
		// 	this.setcurrentTime(this.time*on);	
		// },
		// dragD(e){			
		// 	let on = (this.py_cs/1000).toFixed(4);
		// 	this.setcurrentTime(this.time*on);
		// }
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
	width: 375px;
	height: 812px;
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
</style>
