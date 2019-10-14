<template>
	<div class="bj_cent_1">
		<div class="ylzp_0">
			<div class="ylzp_1">
				当前页面为预览状态，仅供视觉参考
			</div>
		</div>
		<div class="seed1box" ref="topNav">
			<div class="seed1">
			<div class="seed11">
				<div class="seed1_1">
					{{contDat.work_name}}
				</div>
				<div class="seed1_2">
					<span class="seed1_2_1">刚刚</span>					
				</div>
				<div class="seed1_3">
					{{contDat.classify_1_name+'-'+contDat.classify_2_name+'-'+contDat.classify_3_name}}
					<span  class="iconfont seed1_3_1">&#xe654;
					<div>
						<div v-if="contDat.user_info">{{'作品版权由【'+contDat.user_info.username+'】解释，'+contDat.copyright}}</div>
					</div>
					</span>			
				</div>
			</div>
			<div class="seed12">
				<span class="seed1_2_2"><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/icon/zs_icon_xx.png">0</span>
				<span class="seed1_2_3"><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/icon/zs_icon_dz.png">0</span>
				<span class="seed1_2_4"><img class="svgImgx2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/cent/sc_icon_share.svg"/>分享</span>
				<span class="seed1_2_5"><img class="svgImgx2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/cent/sc_icon_tj.svg"/>推荐</span>
				<div class="zdc"></div>
			</div>
			</div>
			
		</div>
		<div v-if="topTyped==true" class="topNav_x_1">
			<div class="topNav_x_2">
			<div class="topNav_x_1_1">
				{{contDat.work_name}}
			</div>
			<div class="topNav_x_1_2">
				<span class="seed1_2_4"><img class="svgImgx2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/cent/sc_icon_share.svg"/>分享</span>
				<span class="seed1_2_5"><img class="svgImgx2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/cent/sc_icon_tj.svg"/>推荐</span>
			</div>
			</div>
			<div class="zdc"></div>
		</div>
		<div class="seed2">
			<div class="seed2_1">
				<div class="seed2_1_1" >
					<div class="seed2_1_1_1" v-html="contDat.content"></div>
					<div class="seed2_1_1_2">标签<span v-for="(el,index) in contDat.labels" :key="index">{{el}}</span><span class="iconfont">&#xe73c;</span><div v-if="contDat.attachment">下载附件（{{contDat.attachment.file_size_format}}）</div></div>
				</div>
				<div class="seed2_1_2 possdddg">
					<div class="plyl_01">暂无评论</div>
					<div class="seed2_1_2_1 seed2_1_2_1n2"><div>说点什么吧<span>0/140</span></div><span class="plyl_02">评论</span></div>
					<div class="myplde">
						还没有人评论，快来抢沙发吧~
					</div>
					<div class="zdc"></div>
				</div>
				
			
				
				
			</div>
			<div class="seed2_2p">
			<div :class="['seed2_2','.seed2_2xxxx']">
				<div class="seed2_1_1" v-if="contDat.user_info">
					<div class="seed2_1_1_1">
						<img class="contavatar" :src="contDat.user_info.avatar" alt="">
						<div>
							<div>{{contDat.user_info.username}}</div>
							<div>{{contDat.user_info.vocation}}  |  {{contDat.user_info.province}}  {{contDat.user_info.city}}</div>
							<div><span v-if="contDat.user_info.is_platform_work"></span> </div>
						</div>
					</div>
					<div class="seed2_2_1_2">
						<div>粉丝<div>{{contDat.user_info.fans_num}}</div></div>
						<div>人气<div>{{contDat.user_info.popular_num}}</div></div>
						<div>创作<div>{{contDat.user_info.work_num}}</div></div>
					</div>
					<div class="seed2_1_1_3">
					
						<span class="jrzybtn_x1">进入主页</span>
					</div>
				</div>
				<div v-if="contDat.more_work && contDat.more_work.length>0" class="seed2_1_2">
					<div class="seed2_1_2_1" style="color: #333;">TA的更多作品</div>
					<div class="seed2_1_2_1x1" >
						<div  class="seed2_1_2_2" v-for="(el,index) in contDat.more_work" :key="index">
							<box_a  :el="el"></box_a>
							<div class="zdc"></div>
						</div>
					
					</div>
					
				</div>
				<div class="seed2_1_2xx" v-else>
					你正在浏览TA首次发布的作品<br/>作为老前辈, 送个赞鼓励下吧~
					<span class="btns pend seed1_2_5xx" @click="addLikeNe('创作者信息-更多作品-推荐','work',contDat.work_id,contDat)"><img class="svgImgx2" :class="contDat.liked?'likeis':''" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/cent/sc_icon_tj.svg"/>{{contDat.liked?'已推荐':'推荐'}}</span>
				</div>
			</div>
			</div>
			
		</div>
		
	</div>
	
</template>

<script>
import box_a from '../../components/box_a';
export default {
	components:{box_a},
	data(){
		return{
			isfix:'',
			prom:{
				
			},
			data:{
				username:"xxxx",
				xx:'禁止匿名转载；禁止商业使用。临摹作品，同人作品原型版归原作者所有。',
			},
			topTyped:false,
			contDat:{},
		}
	},
	mounted: function () {	
		this.init();		
	}, 
	methods: {
		backtime(time){
			return window.getTimes(time)
		},
		init(){		
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
			window.onscroll = ()=>{
				let t = document.documentElement.scrollTop||document.body.scrollTop;
				if(this.topTyped==0){
					if(t>188){
						this.topTyped=true;
						this.isfix = 'isfix';
					}
					return
				}
				if(t<=188){
					this.topTyped=false;
					this.isfix = '';
				}
			
			}
			
			let pr = {
				work_id:this.$route.query.id,
			}

			if(this.$route.query.tmp_token){
				pr.tmp_token = this.$route.query.tmp_token;
			}
			if(window.userInfo){
				pr.access_token = window.userInfo.access_token;
			}
			this.api.getWorkDetail(pr).then((da)=>{
				if(da=='error'){this.$router.push({path: '/error'});return}
				da.labels = JSON.parse(da.labels)
				this.contDat = da;
				
			});
		},
	}

}
</script>

<style>
.jrzybtn_x1{
	display: inline-block;
	background: #666666;
	border-radius: 5px;
	width: 150px;
	height: 40px;
	line-height: 40px;
	font-size: 16px;
	color: #FFFFFF;
	text-align: center;
}
.zdc{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 996;
	background: none !important;
	cursor: initial;
}
.possdddg{
	position: relative;
}
.seed2_1_2_1 div.nubMax{
	position: absolute;
	right: 0;
	top: 0;
	line-height: 42px;
}


.ylzp_0{
	background: #fff;
}
.ylzp_1{
	font-size:16px;
	color:#33B3FF;
	line-height:60px;
	background: rgba(255,81,33,.1);
	height: 60px;
	width: 100%;
	text-align: center;
}

.plyl_01{
	text-align: left;
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:20px;
	margin-bottom: 17px;
}
.plyl_02{
	display: inline-block;
	vertical-align: top;
	margin-left: 20px;
	width:100px;
	height:40px;
	text-align: center;
	background:rgba(153,153,153,1);
	border-radius:5px;
	font-size:14px;
	color:rgba(255,255,255,1);
	line-height:40px;
}
.seed2_1_2_1n2 > div{
	width: 750px;
	margin-bottom: 77px;
}
</style>
