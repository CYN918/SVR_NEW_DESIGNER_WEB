<template>
	<div>
		<img class="activBan2" :src="da.banner"/>
		<!-- <div class="activBan" :style="setImg()"></div> -->
		<div class="ac_1" v-if="da">
			<div class="ac_1_1">{{da.activity_name}}</div>
			<div class="ac_1_2">
				{{backtid()}}				
				<span class="ac_1_3">{{da.status==1?'进行中':'已结束'}}</span>
			</div>
		</div>
		<div class="mydcond" v-html="da.info"></div>
	</div>
	
</template>

<script>
export default {
	name: 'home',	 
	data(){	
		return{
			da:{}
		}		
	},
	mounted: function () {	
		this.a_getInfo()
	}, 
	methods:{
		backtid(){
			if(!this.da.start_time){return}
			return this.da.category_name+'  |  '+this.da.start_time.slice(0,10)+' 至 '+this.da.end_time.slice(0,10);
		},
		setImg(ur){
			return 'background-image: url('+ur+');';
		},
		a_getInfo(){
			if(!this.$route.query.id){
				this.$router.push({path:'/activvity'})	
				return
			}
			this.api.a_getInfo({activity_id:this.$route.query.id}).then((da)=>{	
				if(da=='error'){return}
				
				da.info = da.info.replace(/\d*px/ig,(m)=>{
					m.split('px')[0];
					return window.hotcss.px2rem(m.split('px')[0],320)+'rem';
				})
				this.contDat = da;	
				this.da = da;
				
			});
		},		
	},
}	
</script>
<style lang="scss">
.activBan{
	background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
	width: 100%;
	height: px2rem(211);
}
.activBan2{
	display: block;
	width: 100%;
}
.ac_1{
	border-bottom: 2px solid #e6e6e6;
	width: 100%;
	min-height: px2rem(82);
}
.ac_1>div{
	padding: 0 px2rem(12);
}
.ac_1>div.ac_1_1{
	padding: px2rem(15) px2rem(12) px2rem(3);
}
.ac_1_1{
	
	font-size:px2rem(20);
	font-weight:500;
	color:rgba(30,30,30,1);
	line-height:px2rem(28);
}
.ac_1_2{
	font-size:px2rem(13);
	font-weight:400;
	color:rgba(135,135,135,1);
	line-height:px2rem(18);
}
.ac_1_3{
	float: right;
	color: #000;
}
.mydcond{
	padding: px2rem(26) px2rem(12);
}
.mydcond img{
	max-width: 100%;
}
</style>
