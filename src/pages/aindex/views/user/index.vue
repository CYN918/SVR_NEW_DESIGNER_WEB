<template>
	<div>
		<div class="userTop">
			<div class="userTop_bg" :style="setImg(da.user_center_banner_pic)"></div>
			<div class="userTop_info">
				<img class="userTop_info_avatar" :src="da.avatar">
				<div class="userTop_info_name">{{da.username}}</div>
				<div class="hsesize">{{da.city+' | '+da.vocation}}</div>
				<div class="userTop_info_num">
					<span>
						<span class="hsesize">粉丝</span>
						<span>{{da.fans_num}}</span>
					</span>
					<span>
						<span class="hsesize">人气</span>
						<span>{{da.popular_num}}</span>
					</span>
					<span>
						<span class="hsesize">创作</span>
						<span>{{da.work_num}}</span>
					</span>
				</div>
			</div>
		</div>
		<div class="fgx"></div>
		<div class="user_top_nav">
			<router-link :to="'/user'+id">作品</router-link>
			<router-link :to="'/info'+id">资料</router-link>	
		</div>
		<router-view/>
	</div>
</template>

<script>
export default {
	name: 'home',
	data(){
		return {
			da:{},
			id:'?id=',
		}
	},	
	mounted: function () {	
		this.getUserInfo();
	}, 
	methods: {
		setImg(ur){
			return 'background-image: url('+ur+');';
		},
		getUserInfo(){
			if(!this.$route.query.id){
				this.$router.push({path: '/index'});	
				return
			}
			this.id='?id='+this.$route.query.id;
			let pr = {
				user_open_id:this.$route.query.id
			};
			this.api.getUserDetail(pr).then((da)=>{
				if(da=='error'){return}
				this.da = da;
				window.oioi = da;
			}).catch(()=>{
				
			});
		},		
	}
}
</script>

<style lang="scss">
.userTop_bg{
	display: block;
	width:100%;
	height: px2rem(120);
	background-size:cover; 
}
.userTop_info{
	text-align: center;
}
.userTop_info_avatar{
	display: block;
	margin: px2rem(-44) auto px2rem(12);
	border-radius: 50%;
	width: px2rem(88);
	height: px2rem(88);
	
}
.userTop_info_name{
	text-align: center;
	font-size:px2rem(24);
	font-weight:400;
	color:rgba(30,30,30,1);
	line-height:px2rem(33);
}
.hsesize{
	font-size:px2rem(12);
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:px2rem(17);
}
.userTop_info_num{
	margin: px2rem(25) auto px2rem(15);
}
.userTop_info_num>span{
	display: inline-block;
	
}
.userTop_info_num>span>span{
	display: block;
	width:4rem;
}
.userTop_info_num>span>span:last-child{
	font-size:px2rem(16);
	font-weight:500;
	color:rgba(30,30,30,1);
	line-height:px2rem(22);
}
.user_top_nav{
	line-height: px2rem(62);
	text-align: center;
}
.user_top_nav>a{
	display: inline-block;
	font-size:px2rem(16);
	font-weight:500;
	color:rgba(102,102,102,1);
	line-height:px2rem(22);
	margin: 0 px2rem(24);
}
.user_top_nav>a.router-link-active{
	color:rgba(30,30,30,1);
}
.user_top_nav>a.router-link-active:after{
	content: "";
	display:block;
	margin:px2rem(5) auto 0;
	width: 100%;
	height: px2rem(1);
	background:#FF5121;
	
}
</style>
