<template>
	<div>
		<div class="activBan" :style="setImg(da.banner)"></div>
		<div class="ac_1" v-if="da">
			<div class="ac_1_1">{{da.activity_name.slice(0,9)}}</div>
			<div class="ac_1_2">
				{{da.category_name.slice(0,9)+'  |  '+da.start_time.slice(0,9)+' 至 '+da.end_time.slice(0,9)}}
				<span class="ac_1_3">{{da.left_day?'进行中':'已结束'}}</span>
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
				this.da = da;
				
			});
		},		
	},
	
	
	
}	
</script>
<style lang="scss">
.activBan{
	background-size: cover;
	width: 100%;
	height: px2rem(211);
}
.ac_1{
	border-bottom: 2px solid #e6e6e6;
	width: 100%;
	height: px2rem(82);
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
