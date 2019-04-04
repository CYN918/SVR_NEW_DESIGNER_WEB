<template>
	<div class="seed">
		<div class="seed1box">
			<div class="seed1">
				<div class="seed1_1">
					{{contDat.work_name}}
				</div>
				<div class="seed1_2">
					<span class="seed1_2_1">刚刚</span>
					<span class="seed1_2_2"><span class="iconfont">&#xe616;</span>0</span>
					<span class="seed1_2_3"><span class="iconfont">&#xe672;</span>0</span>
					<span class="seed1_2_4"><span class="iconfont">&#xe64c;</span>分享</span>
					<span class="seed1_2_5"><span class="iconfont">&#xe652;</span>推荐</span>
				</div>
				<div class="seed1_3">
					{{contDat.classify_1+'-'+contDat.classify_2+'-'+contDat.classify_3}}
					<span  class="iconfont seed1_3_1">&#xe654;
					<div>
						<div>{{'作品版权由【'+contDat.username+'】解释，'+contDat.copyright}}</div>
					</div>
					</span>			
				</div>
			</div>
		</div>
		<div class="seed2">
			<div class="seed2_1">
				<div class="seed2_1_1" >
					<div class="seed2_1_1_1" v-html="contDat.content"></div>
					<div class="seed2_1_1_2">标签<span v-for="(el,index) in contDat.labels" :key="index">{{el}}</span><span class="iconfont">&#xe73c;</span><div v-if="contDat.attachment">下载附件（{{contDat.attachment.file_size_format}}）</div></div>
				</div>
				<div class="seed2_1_2">
					<div class="seed2_1_2_1"><div>说点什么吧<span>0/140</span></div><span>评论</span></div>
				</div>
			</div>
			<div class="seed2_2">
				<div class="seed2_1_1">
					<div class="seed2_1_1_1">
						<img :src="contDat.avatar" alt="">
						<div>
							<div>{{contDat.username}}</div>
							<div>{{contDat.city}}  |  {{contDat.province}}</div>
							<div><span v-if="contDat.is_platform_work">xx</span> xx</div>
						</div>
					</div>
					<div class="seed2_2_1_2">
						<div>粉丝<div>{{contDat.fans_num}}</div></div>
						<div>人气<div>{{contDat.popular_num}}</div></div>
						<div>创作<div>{{contDat.work_num}}</div></div>
					</div>
					<div class="seed2_1_1_3">
						<span>关注</span>
						<span>私信</span>
					</div>
				</div>
				<div class="seed2_1_2">
					<div class="seed2_1_2_1">TA的更多作品</div>
					<div class="seed2_1_2_2" v-for="(el,index) in contDat.more_work" :key="index">
						<img :src="el.face_pic" alt="" class="i_listd1">
						<div class="i_listd2">
							<div class="i_listd2_1">
								<span>{{el.work_name}}</span>
								<img v-if="el.is_recommend==1" src="/imge/zs_icon_tj.png" alt="">
							</div>
							<div class="i_listd2_2">
								<span>{{el.classify_1+'-'+el.classify_2}}</span>
								<span>{{backtime(el.create_time)}}</span>
							</div>
							<div class="i_listd2_3">
								<span><img src="https://img.zcool.cn/community/01e9b65c986887a801214168d67106.jpg@260w_195h_1c_1e_1o_100sh.jpg" alt=""></span>
								<div>
								<span class="iconfont pend">&#xe6a2; {{el.view_num}}</span>
								<span class="iconfont pend">&#xe672; {{el.like_num}}</span>
								<span class="iconfont pend">&#xe616; {{el.comment_num}}</span>
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
			prom:{
				
			},
			data:{
				username:"xxxx",
				xx:'禁止匿名转载；禁止商业使用。临摹作品，同人作品原型版归原作者所有。',
			},
			contDat:{},
		}
	},
	mounted: function () {	
		this.init();		
	}, 
	methods: {
		init(){		
			let token = localStorage.getItem('userT');
			let pr = {
				work_id:this.$route.query.id,
			}
			if(token){
				pr.access_token = JSON.parse(token).access_token;
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
.seed{
	padding-bottom: 120px;
}
.seed1box{
	min-width: 1300px;
	height: 128px;
	background: #FFFFFF;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);	
	margin-bottom: 20px;
	
}
.seed1{
	width: 1300px;
	margin: 0 auto;
	padding: 15px 0;
	text-align: left;
}
.seed1_1{

	font-size: 24px;
	color: #1E1E1E;
	margin-bottom: 12px;
}
.seed1_2{
	font-size: 14px;
	color: #666666;

	text-align: right;
}
.seed1_2_1{
	float: left;
	padding-top: 8px;
}

.seed1_2_2,.seed1_2_3{
	display: inline-block;
	font-size: 14px;
	color: #999999;
	margin-right: 48px;
}
.seed1_2_2>span,.seed1_2_3>span{
	margin-right: 13px;
}
.seed1_2_4{
	margin-right: 20px;
}
.seed1_2_5,.seed1_2_4{
	cursor: pointer;
	display: inline-block;
	border: 1px solid #979797;
	border-radius: 5px;
	box-sizing: border-box;
	width: 140px;
	height: 38px;
	text-align: center;
	line-height: 38px;
	font-size: 14px;
	color: #1E1E1E;
	box-sizing: border-box;
}
.seed1_2_5>span,.seed1_2_4>span{
	margin-right: 6px;
}
.seed1_2_5{
	margin-right: 50px;
}
.seed1_3{
	font-size: 14px;
	color: #666666;
}
.seed1_3_1{
	display: inline-block;
	position: relative;
	vertical-align: middle;
	margin-left: 45px;
	cursor: pointer;
}
.seed1_3_1>div{
	display: none;
	position: absolute;
    left: 0;
    bottom: 0;
    -webkit-transform: translate(-50%,115%);
    transform: translate(-24%,115%);
    padding: 8px 12px;
    font-size: 12px;
    color: #FFFFFF;
    background: #323232;
    border-radius: 6px;
}
.seed1_3_1>div>div{
	white-space: nowrap;
}
.seed1_3_1>div:before{
	display: none;
	content: "";
    content: "";
    position: absolute;
    top: -3px;
    left: 25%;
    width: 6px;
    height: 6px;
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    z-index: 9;
    background: #323232;
}
.seed1_3_1:hover>div:before{
	display: block;
}
.seed1_3_1:hover>div{
	display: block;
}
.seed2{
	width: 1300px;
	margin: 0 auto;
	
}
.seed2>.seed2_2,.seed2>.seed2_1>div{
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;

}

.seed2_1>div:first-child{
	
	padding: 40px;
	margin-bottom: 20px;
}
.seed2_1{
	display: inline-block;
	width: 950px;
	vertical-align: top;
}
.seed2_2{
	display: inline-block;
	width: 330px;
	margin-left: 20px;
	box-sizing: border-box;
	
}
.seed2_1_2{
	padding: 40px;
}
.seed2_1_1_1{
	margin-bottom: 17px;
}
.seed2_1_1_1 img{
	max-width: 100%;
}
.seed2_1_1_1>img{
	display: inline-block;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	margin-right: 10px;
	vertical-align: middle;
}
.seed2_1_1_1>div{
	display: inline-block;
	vertical-align: middle;
	text-align: left;
}
.seed2_1_1_1>div>div:nth-child(1){
	font-size: 16px;
	color: #1E1E1E;
	line-height: 35px;
}
.seed2_1_1_1>div>div:nth-child(2){
	font-size: 12px;
	color: #999999;
	margin-bottom: 14px;
}
.seed2_1_1_1>div>div:nth-child(3){
	font-size: 16px;
	color: #1E1E1E;
}
.seed2_2_1_2>div{
	display: inline-block;
	font-size: 12px;
	color: #999999;
	margin-right: 68px;
}
.seed2_2_1_2>div:last-child{
	margin-right: 0;
}
.seed2_2_1_2>div>div{
	margin-top: 7px;
	font-size: 16px;
	color: #1E1E1E;
}
.seed2_2_1_2{
	margin-bottom: 16px;
}
.seed2_1_1_3>span{
	cursor: pointer;
	display: inline-block;
	border: 1px solid #979797;
	border-radius: 5px;
	box-sizing: border-box;
	width: 120px;
	height: 40px;
	text-align: center;
	line-height: 40px;
}
.seed2_1_1_3>span:hover{
	opacity: .7;
}
.seed2_1_1_3>span:first-child{
	background: #FF5121;
	border-color: #FF5121;
	color: #fff;
	margin-right: 20px;
}
.seed2_2>div{
	border-bottom: 1px solid #E6E6E6;
	padding: 41px 30px;
}
.seed2_1_2_1{
	font-size: 16px;
	color: #FF5121;
	margin-bottom: 18px;
}
.seed2_1_2_2{
	background: #F6F6F6;
	border-radius: 5.08px;
	width: 270px;
	margin: 0 auto;
	text-align: left;
}
.seed2_1_2_2>img{
	display: block;
	width: 100%;
	height: 201px;
}
.seed2_1_2_2{
	cursor: pointer;
	margin-bottom: 40px;
}
.seed2_1_2_2:hover{
	opacity: .7;
}
.seed2_1_1_2{
	text-align: left;
}
.seed2_1_1_2>span{
	display: inline-block;
	padding: 2px 5px;
	border: 1px solid #999999;
	border-radius: 5px;
	font-size: 14px;
	color: #999999;
	margin-right: 12px;
}
.seed2_1_1_2>span:first-child{
	margin-left: 18px;
}
.seed2_1_1_2>span.iconfont{
	border: none;
	margin-left: 17px;
	margin-top: 12px;
	float: right;
}
.seed2_1_1_2>div{
	background: #E6E6E6;
	border-radius: 5px;
	font-size: 14px;
	color: #666666;
	text-align: center;
	line-height: 40px;
	width: 216px;
	height: 40px;

	float: right;
}
.seed2_1_2_1>div{
	position: relative;
	display: inline-block;
	width: 690px;
	height: 40px;
	line-height: 40px;
	text-align: left;
	background: #E6E6E6;
	border-radius: 5px;
	box-sizing: border-box;
	padding: 0 20px;
	font-size: 14px;
	color: #666666;
	
}
.seed2_1_2_1>div>span{
	float: right;
}
.seed2_1_2_1>span{
	display: inline-block;
	background: #666666;
	border-radius: 5px;
	width: 160px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	font-size: 14px;
	color: #FFFFFF;
	margin-left: 20px;
}
</style>
