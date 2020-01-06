<template>

		<div class="box_01x">
			<input type="file" @change="sup">
			<video class="testC" @canplay="canplay" src="" ref="vi"></video>
			<div class="lod_01">
				<div :style="'transform: translateX('+py_cs+'px);'" draggable="true" @dragstart="dragS" @drag="dragD" @dragend="dragE" class="ks"  ref="ks"></div>
				<div class="js" ref="js"></div>
			</div>
		</div>

</template>

<script>
export  default{
	data(){
		return{
			starX:0,
			py_cs:0,
			time:0,
		}
	},
	methods:{
		sup(e){
			let video = e.target.files[0];		
			let vi = URL.createObjectURL(video);
			this.$refs.vi.src = vi;	
		},
		canplay(){
			this.time = this.$refs.vi.duration;
		},
		setcurrentTime(t){
			this.this.$refs.vi.currentTime = t;
		},
		dragS(e){
			this.starX = e.x;
		},
		dragE(e){
			 
			this.py_cs = e.x;
		},
		dragD(e){
		
			this.py_cs = e.x;
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
	width: 375px;
	height: 812px;
}
.lod_01{
	position: relative;
	width: 1200px;
	height: 40px;
	background: #0055AA;
}
.ks{
	position: absolute;
	top:0;
	left: 0;
	background: red;
	width: 10px;
	height: 100%;
}
</style>
