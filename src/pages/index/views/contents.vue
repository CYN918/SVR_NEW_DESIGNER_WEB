<template>
	<div class="seed">
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
				<span class="seed1_2_2"><img src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/icon/zs_icon_xx.png">0</span>
				<span class="seed1_2_3"><img src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/icon/zs_icon_dz.png">0</span>
				<span class="seed1_2_4"><img class="svgImgx2" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/cent/sc_icon_share.svg"/>分享</span>
				<span class="seed1_2_5"><img class="svgImgx2" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/cent/sc_icon_tj.svg"/>推荐</span>
			</div>
			</div>
			<div class="zdc"></div>
		</div>
		<div v-if="topTyped==true" class="topNav_x_1">
			<div class="topNav_x_2">
			<div class="topNav_x_1_1">
				{{contDat.work_name}}
			</div>
			<div class="topNav_x_1_2">
				<span class="seed1_2_4"><img class="svgImgx2" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/cent/sc_icon_share.svg"/>分享</span>
				<span class="seed1_2_5"><img class="svgImgx2" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/cent/sc_icon_tj.svg"/>推荐</span>
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
					<div class="seed2_1_2_1"><div>说点什么吧<span>0/140</span></div><span>评论</span></div>
					<div class="myplde">
						还没有人评论，快来抢沙发吧~
					</div>
					<div class="zdc"></div>
				</div>
				
				
			</div>
			<div class="seed2_2p">
			<div :class="['seed2_2','.seed2_2xxxx',isfix]">
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
				<div class="seed2_1_2">
					<div class="seed2_1_2_1" style="color: #333;">TA的更多作品</div>
					<div class="seed2_1_2_1x1">
					<div @click="seeWorks(el.work_id)" class="seed2_1_2_2" v-for="(el,index) in contDat.more_work" :key="index">
						<div class="i_listd1x2"><img :src="el.face_pic" alt="" class="i_listd1"></div>
						<div class="i_listd2">
							<div class="i_listd2_1">
								<span>{{el.work_name}}</span>
								<img v-if="el.is_recommend==1" src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/zs_icon_tj.png" alt="">
							</div>
							<div class="i_listd2_2">
								<span>{{el.classify_1+'-'+el.classify_2}}</span>
								<span>{{backtime(el.create_time)}}</span>
							</div>
							
							<div class="i_listd2_3">
								<span><img @click="goUser(index)" :src="el.user_info.avatar" alt=""></span>
								
								<div class="i_listd2_3x1" @click="openxq(index)">
									<span class="pend"><img src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/icon/zs_icon_gk.png">{{el.view_num}}</span>
									<span class="pend"><img src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/icon/zs_icon_dz.png">{{el.like_num}}</span>
									<span class="pend"><img src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/icon/zs_icon_xx.png">{{el.comment_num}}</span>
								</div>
							</div>
							<div class="zdc"></div>
						</div>
						
					</div>
					
					</div>
					
					</div>
				</div>
			</div>
			
		</div>
		
	</div>
	
</template>

<script>
export default {
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
			if(window.userInfo){
				pr.access_token = window.userInfo.access_token;
			}
			this.api.getWorkDetail(pr).then((da)=>{
				da.labels = JSON.parse(da.labels)
				this.contDat = da;
				
			});
		},
		
		backType(){
		
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
</style>
