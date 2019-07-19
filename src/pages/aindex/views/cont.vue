<template>
	<div>
		<div class="centbox">
			<img class="cent_banner" :src="contDat.face_pic" alt="">
			<div v-if="contDat.user_info" class="userBox">
				<img class="userBox_1" :src="contDat.user_info.avatar">
				<div class="userBox_2">
					<div class="userBox_3">{{contDat.user_info.username}}</div>
					<div class="userBox_4">{{contDat.user_info.province+' | '+contDat.user_info.vocation}}</div>
				</div>				
			</div>
			<div class="centbox_x_1 cont_box_c">
				<div class="centbox_x_2">{{contDat.work_name}}</div>
				<div class="centbox_x_3">{{backtime(contDat.create_time)}}
					<span class="centbox_x_3_1">
						<span><img src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/see/zs_icon_gk.svg">{{contDat.view_num}}</span>
						<span><img src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/see/zs_icon_dz.svg">{{contDat.like_num}}</span>
						<span><img src="http://c3p.vanmatt.com/imgUrl/SVR_NEW_DESIGNER_WEB/svg/see/zs_icon_xx.svg">{{contDat.comment_num}}</span>
					</span>
				</div>
			</div>
			<div class="cont_page" v-html="contDat.content">

			</div>
			<div @click="showWorks" :class="['cont_box_c','workxx',isshowwor?'onwor':'']">作品信息</div>
			<div v-if="isshowwor" class=" cont_box_c workxx_1">
				<div>原创作品<span>平面-品牌</span></div>
				<div>创作时间<span>2019-03-12</span></div>
				<div>作品版权<span>作品版权由【创作者昵称】解释，禁止匿名转载；禁止商业使用。临摹作品，同人作品原型版归原作者所有。</span></div>
			</div>
		</div>
		<div class="ht"></div>
		<div class="plcont">
			<div class="cont_box_c pl_1">{{hfnum}} 条评论</div>
			<ul class="boxd2">
				<li v-for="(el,index) in hfData" :key="index">
					<div class="userBox">
						<img class="userBox_1" :src="el.avatar">
						<div class="userBox_2">
							<div class="userBox_3">{{el.username}}</div>
							<div class="userBox_4 pl2_01">{{backtime(el.create_time)}}</div>
							
							
							<div class="pl_01 pl2_02">{{backComt(el.content)}}</div>
							<div v-if="el.sub_comment" class="pl_02">
								<div class="userBox">
									<img class="userBox_1" :src="el.sub_comment[0].avatar">
									<div class="userBox_2">
										<div class="userBox_3">{{el.sub_comment[0].username}}<span class="pl2_02_1">{{backtime(el.sub_comment[0].create_time)}}</span></div>
										
									</div>	
									<div class="pl_01 pl2_02">{{backComt(el.sub_comment[0].content)}}</div>
									<div v-if="el.isshowfh">
										<div v-for="(el2,index2) in el.sub_comment">
											<div v-if="index2>0">
												<div class="jgd"></div>
												<div  class="pl2_0x">
													<img class="userBox_1" :src="el2.avatar">
													<div class="userBox_2">
														<div class="userBox_3">{{el2.username}}<span class="pl2_02_1">{{backtime(el2.create_time)}}</span></div>												
													</div>	
													<div class="pl_01 pl2_02">{{backComt(el2.content)}}</div>
												</div>
											</div>
										</div>
									</div>
									<div v-if="el.sub_comment.length>0" @click="zkpl(index)" :class="['pl_01','pl2_03','workxx',el.isshowfh?'onwor':'']">展开更多评论</div>
								</div>
								
							</div>
						</div>				
					</div>		
				</li>
			</ul>
			<div class="moadd">
				<span v-if="hfnum>hfData.length">查看更多评论</span>
			</div>
		</div>
	</div>
	
</template>

<script>

import Header from '../components/header';
export default {
	data(){
		return{
			contDat:'',
			hfData:[],
		
			hfnum:0,
			page:1,
			limit:10,
			userData:'',
			isshowwor:'',
		}
	},
	mounted: function () {	
		this.init();
	}, 
	methods: {	
		init(){
			if(!this.$route.query || !this.$route.query.id){
				window.close();
				return;
			}			
			this.getData();	
			this.getCommentList();
		},
		getData(){
			let pr = {
				work_id:this.$route.query.id,
			}			
			if(window.userInfo){
				this.userData = window.userInfo;
				pr.access_token =window.userInfo.access_token;
			}
			this.api.getWorkDetail(pr).then((da)=>{
				if(da=='error'){return}
				if(da.length==0){
					alert('该作品已删除');	
					window.close();
					return
				}
				da.labels = JSON.parse(da.labels)
				this.contDat = da;			
			});			
		},
		getCommentList(){
			let pr = {
				work_id:this.$route.query.id,
				page:this.page,
				limit:this.limit,
			};
			if(window.userInfo){
				pr.access_token = window.userInfo.access_token;
			}
			this.api.getCommentList(pr).then((da)=>{
				if(da=='error'){return}
				this.hfnum = da.total;
				this.hfData = this.hfData.concat(da.data);
				
		    });
		},
		backtime(time){
			console.log(22222);
			return	window.getTimes(time);
		},	
		showWorks(){
			this.isshowwor = this.isshowwor?'':'on'
		},
		backComt(data){
			let p = '';
			try{
				data = JSON.parse(data);	
			
				p = data[0];
				
				if(data.length>1){
					p +=' '+data[1];
				}
					
			}catch(e){
				p=data;
			}
		
			return p;
		},
		zkpl(on){
			if(this.hfData[on].isshowfh){
				this.$set(this.hfData[on],'isshowfh','');	
				return
			}
			this.$set(this.hfData[on],'isshowfh','1');	
		}
	}
}
</script>

<style lang="scss">
.cent_banner{
	display: block;
	width: 100%;
}
.cont_box_c{
	padding: 0 .8rem;
}
.userBox{padding: px2rem(20)}
.userBox_1{
	vertical-align: top;
	display: inline-block;
    width: px2rem(44);
	height: px2rem(44);
    border-radius: 50%;
	margin-right: px2rem(4);
}
.userBox_2{
	vertical-align: top;
	display: inline-block;
}
.userBox_3{
	margin-bottom: .3rem;
	font-size: px2rem(14);
    line-height: 1rem;
}
.userBox_4{
	font-size: px2rem(12);
	color: #cacaca;
}
.centbox_x_2{
	font-size: .8rem;
    line-height: 1rem;
	margin-bottom: .4rem;
}
.centbox_x_3{
	font-size: .55rem;
}
.centbox_x_3_1{
	float: right;
}
.centbox_x_1{
	margin-bottom: .7rem;
}
.centbox_x_3_1>span{
	display: inline-block;
	overflow: hidden;
	vertical-align: middle;

    margin-left: .7rem;
}
.centbox_x_3_1>span:first-child{
	margin-left: 0;
}
.centbox_x_3_1>span>img{
	display: inline-block;
	width: .55rem;
	margin-right: .1rem;
}
.cont_page{
	padding: px2rem(20);
	border-top: 1px solid #ebebeb;
}
.cont_page img{
	max-width: 100%;
}


.ht{
	margin: px2rem(20) auto;
	height: .5rem;
	background: rgba(248,249,251,1);
}
.workxx{position: relative;font-size: .62rem;}
.workxx_1{
	padding: .5rem .8rem 0;
	font-size: .55rem;

}
.workxx:after{
	content: "";
    width: .3rem;
    height: .3rem;
    border: 1px solid #000;
    border-top: 0;
    border-right: 0;
    margin-left: 15px;
    -webkit-transform: rotate(-45deg) translateY(-5px);
    transform: rotate(-45deg) translateY(-5px);
    -webkit-transform-origin: 25%;
    transform-origin: 50% 50%;
    position: absolute;
    top: 36%;
    left: 3.47rem;
}
.onwor:after{
	-webkit-transform: rotate(135deg) translateY(-4px);
	transform: rotate(135deg) translateY(-4px);
}
.workxx_1>div>span{
	vertical-align: top;
	display: inline-block;
	line-height: px2rem(17);
	margin-left: 1.1rem;
    max-width: 10rem;
	margin-bottom: .25rem;
}
.pl_1{
	font-size: .6rem;
    margin-bottom: .5rem;
    line-height: 2rem;
}
.boxd2>li{
    border-bottom: 1px solid #ebebeb;
    padding: .8rem 0;
}
.boxd2>li:first-child{
	border-top: 1px solid #ebebeb;
}
.pl2_01{margin-bottom: .6rem;}
.pl2_02{font-size: .6rem;margin-bottom: .3rem;}
.pl_02{
	width: 12.2rem;
    min-height: 4.6rem;
    background: #f8f9fb;
    border-radius: .2rem;
    box-sizing: border-box;
    padding: .3rem 0;
}
.pl_02 .userBox_1{
	width: 1.2rem;
    height: 1.2rem;
    margin: 0;
    margin-right: .2rem;
	margin-left: .3rem;
}
.pl_02 .userBox_3{
	width: 8rem;
	line-height: 1rem;
}
.pl2_02_1{
	float: right;
	line-height: 1rem;
    font-size: .5rem;
}
.pl_02 .pl2_02{
    padding: 0 .5rem;
    margin-bottom: .5rem;
}
.pl_02 .pl2_03{
	padding: 0 .5rem;
	font-size: .52rem;
}
.pl_02 .workxx:after{
	left: 3.8rem;
    top: 36%;

}
.pl_02 .userBox{
	margin-bottom: 0;
}
.jgd{height: 1px;background: #ebebeb;margin: .8rem auto;}
.moadd{
	height: 4rem;
	text-align: center;
	line-height: 4rem;
}
.moadd>span{
	display: inline-block;
	text-align: center;
    
    font-size: .5rem;
}
</style>
