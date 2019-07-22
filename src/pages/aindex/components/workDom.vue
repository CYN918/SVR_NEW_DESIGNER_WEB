<template>
	<div v-if="el && el.user_info" class="worksBox">
		<div @click="goPth('cont',el.work_id)" class="worksBox_fm" :style="setImg(el.face_pic)"></div>
		<div class="worksBox_n">
			<span @click="goWork(el.work_id)">{{backName(el.work_name)}}</span>
			<img class="tjImg" v-if="el.is_recommend==1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/zs_icon_tj.svg"/>
		</div>
		<div class="worksBox_cl">
			<span class="worksBox_cl_l">{{el.classify_1_name+'-'+el.classify_2_name}}</span>
			<span class="worksBox_clr">{{backtime(el.create_time)}}</span>
		</div>		
		<div @click="goPth('user',el.user_info.open_id)" v-if="el.isUser" class="worksUser">
			<img class="worksUser_1" :src="el.user_info.avatar" alt="">
			<span class="worksUser_2">{{backName(el.user_info.username)}}</span>
			<div class="worksUser_3">
				<span><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/see/zs_icon_xx.svg" alt="">{{el.comment_num}}</span>
				<span><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/see/zs_icon_dz.svg" alt="">{{el.like_num}}</span>	
			</div>			
			
		</div>
	</div>
</template>
<script>
export default {
	props:{
		el:{
			type:Object,
			default:{}
		}
	},
	name: 'workDom',
	data(){
		return {}
	},
	
	mounted: function () {	
	
	}, 
	methods: {
		goPth(p,id){
			this.$router.push({path:'/'+p,query:{id:id}});
		},
		setImg(ur){
			return 'background-image: url('+ur+');';
		},
		backtime(time){
			return	window.getTimes(time);
		},
		backName(n){
			if(!n){
				return
			}
			return n.slice(0,10);
		}
	}
}
</script>

<style lang="scss">
.worksBox{
	margin: 0 auto px2rem(38);
	width: px2rem(335);
}
.worksBox_fm{
	background-size:cover; 
	border-radius: px2rem(5);
	width: 100%;
	height: px2rem(220);
}
.worksBox_n{
	font-size:px2rem(18);
	font-weight:500;
	color:rgba(30,30,30,1);
	line-height:px2rem(25);
	margin: px2rem(11) auto px2rem(3);
}
.worksBox_cl{
	display: block;
	font-size:px2rem(12);
	font-weight:400;
	color:rgba(135,135,135,1);
	line-height:px2rem(17);
}
.worksBox_clr{
	float: right;
	display: block;
}
.worksBox_cl_l{
	display: inline-block;
}
.worksUser_1{
	display: inline-block;
	vertical-align: middle;
	border-radius: 50%;
	width: px2rem(21);
	height: px2rem(21);
	margin-right: px2rem(11);
}
.tjImg{
	float: right;
	margin-top: .23rem;
	width: px2rem(15);
	height: px2rem(15);
}
.worksUser_2{
	display: inline-block;
	vertical-align: middle;
	font-size:px2rem(12);
	font-weight:400;
	color:rgba(135,135,135,1);
	line-height:px2rem(17);
}
.worksUser_3{
	float: right;
	margin-top: .45rem;
	font-size:px2rem(12);
	font-weight:400;
	color:rgba(135,135,135,1);
	line-height:px2rem(17);
}
.worksUser_3>span{
	margin-left: px2rem(29);
}
.worksUser_3>span>img{
	display: inline-block;
	vertical-align: middle;
	width: px2rem(11);
	margin-right: px2rem(4);
}
.worksUser_3>span>span{
	display: inline-block;
	vertical-align: middle;
}
</style>
