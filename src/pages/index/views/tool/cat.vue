<template>
	<div class="pr_qpx" >
		<div class="mp3_01x2">
			<div class="mp3_01x_1">
				<span class="a">视频剪辑</span><img @click="close()" class="pend b" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/cj_00.svg">
			</div>
			<div class="pcat_01">
				<img class="pcat_02" :src="value.data.cover_img" ref="bgh"/>
				
				<div class="pcat_03"></div>
				<div class="pcat_04" :style="ysd">
					<img :style="vido" class="pcat_05" :src="value.data.cover_img"/>
				
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
			ysd:'width:202.5px;height:360px;top:0;left:219px',
			vido:'',

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
		
		init(){		
			setTimeout(()=>{
				let dop = this.$refs.bgh.getBoundingClientRect();
				this.vido = 'width:'+dop.width+'px;height:'+dop.height+'px;';
				let wd = 0,hd = 0,str='';
			
				if(dop.height>dop.width){
					wd = dop.width;
					
					hd = (dop.width/9)*16;
					str = 'transform: translate('+((640-wd)/2)+'px,'+((360-hd)/2)+'px);';
					
					this.value.data.fd = (1+Math.round((((360-hd)/hd)*100))/100);
					console.log(this.value);
					
				}else{
					hd = dop.height;
					wd = (dop.height/16)*9;
					
					str = 'transform: translate('+((640-wd)/2)+'px,0);';
					
					this.value.data.fd = (1+Math.round((((640-wd)/wd)*100))/100);
					console.log(this.value);
				}
				
				
				
				this.ysd = 'width:'+wd+'px;height:'+hd+'px;top:0;left:0;'+str;
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
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>
