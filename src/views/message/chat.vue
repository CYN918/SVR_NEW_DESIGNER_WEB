<template>
	<div>
		
		<div class="setUserBox messgdo">
			<div class="setUserBoxs">
				<div class="setUserBoxs_nav">
					<div  v-for="(el,index) in navDta" :key="index" @click="setNavd(index)" :class="[index==navdOn?'action':'']"><span class="tjsj_2">{{el.n}}</span><span v-if="el.l" class="tjsj_1">{{el.l}}</span></div>
					
				</div>
				<div class="navDwzc">
					<div :class="['setUserBoxs_nav',topTyped?'fixdon':'']">
						<div  v-for="(el,index) in navDta" :key="index" @click="setNavd(index)" :class="[index==navdOn?'action':'']"><span class="tjsj_2">{{el.n}}</span><span v-if="el.l" class="tjsj_1">{{el.l}}</span></div>
					</div>
				</div>
				
				<div class="sxBodx1">
					<div class="sxBodx2">
						<div class="sxBodx2_1">
							<span :class="['sxBodx2_1_n1','sxBodx2_1_n1x']">最近联系</span>
							<span :class="['sxBodx2_1_n1']">我关注的</span>
						</div>
						<div class="sxBodx2_2">
							<ul class="sxBodx2_2x">
								<li v-for="(el,index) in listData">
									<img src="/imge/nav_tx.png" alt="">
									<div>
										<div class="sxBodx2_2x_1">Don Gibson<span class="sxBodx2_2x_2">18:00</span></div>
										<div class="sxBodx2_2x_3">你好！你的作品很棒，我能请…</div>
									</div>
								</li>
							</ul>
						</div>
						<div class="sxBodx2_3"></div>
					</div>
					
					<div class="sxBodx3">
				
						<div class="sxBodx2_1">
							<div class="sxBodx3_1_1">Harriett Bass<span class="sxBodx3_1_2">与你的对话</span><span class="sxBodx3_1_3 iconfont">&#xe73c;</span></div>
						</div>
						<div class="sxBodx3_2">
							
							<ul>
								<li>
									<div class="sxBodx3_2x_1">昨天16:00</div>
								
								</li>
								<li>
									<div class="jyb_x2">
									<div class="sxBodx3_2xbox sxBodx3_2x_2">
										<img src="/imge/nav_tx.png" alt="">
										<div class="sxBodx3_2x_3b sxBodx3_2x_3">你好！你的作品很棒哦</div>
									</div>
									</div>
									
								</li>
								<li>
									<div class="jyb_x1">
									<div class="sxBodx3_2xbox sxBodx3_2x_4">
										
										<div class="sxBodx3_2x_3b sxBodx3_2x_5">谢谢，希望可以一起学习进步！谢谢，希望可以一起学习进步！谢谢，希望可以一起学习进步！谢谢，希望可以一起学习进步！</div>
										<img src="/imge/nav_tx.png" alt="">
									</div>
									</div>
								</li>
								<li>
									<div class="sxBodx3_2x_1">昨天16:00</div>
								
								</li>
							</ul>
						</div>
						<div class="sxBodx2_3"></div>
					</div>
					
				</div>
			</div>
			
		</div>
		
	</div>
</template>

<script>
import Input from '../../components/input';
import {Message} from 'element-ui'
export default {
	components:{Input},
	name: 'chat',
	data(){
		return {
			hfnc:'',
			messgNum:{},
			navDta:[
				{n:'通知',l:''},
				{n:'评论/留言',l:''},
				{n:'私信',l:''},	
			],
			topTyped:false,
			navdOn:2,
			limit:10,
			total:0,
			page:1,
			onType:'notify',
			listData:new Array(10),
			addLink:0,
			plType:0,
			pl2:'',
		}
	},
	mounted: function () {			
		this.init();
		
	}, 
	methods: {
		setNavd(on){
			let urld = ['notify','comment','chat'];
			this.$router.push({path: urld[on]});	
		},
		// goUserIn(on){
		// 	this.$router.push({path: '/works',query:{id:this.listData[on].user_info.open_id}})	
		// },
		// handleSizeChange(val) {
		// 	this.limit = val;
		// 	this.getMessgList();
		// },
		// handleCurrentChange(val) {
		// 	this.page = val;
		// 	this.getMessgList();
		// },
		
		backtime(t){		
			let time = new Date(t*1000);
			let ym = time.getMonth();
			if(ym<10){
				ym = '0'+ym;
			}
			return time.getDate()+'-'+ym+'-'+time.getFullYear();
		},
		
		init(){
			this.pushCk();
			this.getMessgNumber();
			this.getMessgList();
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
			window.onscroll = ()=>{
				let t = document.documentElement.scrollTop||document.body.scrollTop;
				if(t==0){
					document.documentElement.scrollTop =1;
					document.body.scrollTop =1;
				}
				if(this.topTyped==false){
					if(t>188){
						this.topTyped=true;
					}
					
				}
				if(t<=188){
					this.topTyped=false;
				}
	
				
			}
		},
		pushCk(){
	
			// let op = {
			// 	access_token:window.userInfo.access_token,
			// 	type:'notify',
			// };
			// this.api.Messageread(op).then((da)=>{
			// 	if(!da){
			// 		return
			// 	}
			// })
		},
		setScll(top){
			
			if (document.documentElement && document.documentElement.scrollTop) {
			
                document.documentElement.scrollTop = Number(top);
            }
            if (document.body) {			
                document.body.scrollTop = Number(top);				
			}	
		},
		getMessgNumber(){
			let pr = {
				access_token:window.userInfo.access_token
			};
			this.api.getCounter(pr).then((da)=>{
				if(!da){
					return
				}
				this.messgNum = da;
				this.navDta[0].l = 0;
				this.navDta[1].l = this.messgNum.unread_comment_num;
				this.navDta[2].l = this.messgNum.unread_chat_num;
		
			})
		},
		
		getMessgList(type){

			let pr = {
				access_token:window.userInfo.access_token,
				type:'chat',
				page:this.page,
				limit:this.limit
			};
			this.api.getMessgList(pr).then((da)=>{
				if(!da){return}
				this.listData = da.data;
				this.total = da.total;
			});
		},



	}
}
</script>

<style>
.sxBodx1{
	display: inline-block;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 970px;
	height: 700px;
}

.sxBodx2{
	position: relative;
	display: inline-block;
	vertical-align: top;
	height: 100%;
	width: 309px;
	border-right:2px solid rgba(151, 151, 151, .1);
}
.sxBodx2_1{
	border-bottom: 2px solid rgba(151, 151, 151, .1);
	height: 59px;
	width: 100%;
}

.sxBodx3{
	position: relative;
	display: inline-block;
	vertical-align: top;
	width: 659px;
	height: 100%;
}
.sxBodx2_3{
	position: absolute;
    bottom: 0;
    left: 0;
    background: #FFFFFF;
    -webkit-box-shadow: 0 -1px 0px 0 rgba(0,0,0,0.05);
    box-shadow: 0 -1px 0px 0 rgba(0,0,0,0.05);
 
    width: 100%;
    height: 60px;
}
.sxBodx2_1_n1{
	position: relative;
	cursor: pointer;
	display: inline-block;
	width: 50%;
	height: 100%;
	text-align: center;
	font-size: 16px;
	color: #1E1E1E;
	line-height: 60px;
}
.sxBodx2_1_n1x{
	color: #FF5121;
}
.sxBodx2_1_n1x:after{
	position: absolute;
	content: "";
	bottom: 0;
	left: 50%;
	-webkit-transform: translate(-50%,50%);
	transform: translate(-50%,50%);
	width: 48px;
	height: 2px;
	background: #FF5121;
}
.sxBodx3_1_1{
	line-height: 60px;
	text-align: center;
	font-size: 14px;
	color: #333333;
}
.sxBodx3_1_2{

	color: #999999;
	margin-left: 8px;
}
.sxBodx2_2{
	overflow: hidden;
	overflow-y: auto;
	width:100%;
	height:580px;
	
}
.sxBodx2_2x>li{
	padding: 21px 30px 0;
	display: block;
	width: 100%;
	height: 69px;
	border-bottom: 2px solid rgba(151, 151, 151, .1);
}
.sxBodx2_2x>li>img{
	display: inline-block;
	vertical-align: top;
	border-radius: 50%;
	width: 32px;
	height: 32px;
}
.sxBodx2_2x>li>div{
	display: inline-block;
	margin-left: 10px;
	width: 207px;
}
.sxBodx2_2x_1{
	font-size: 14px;
	line-height: 20px;
	color: #1E1E1E;
	margin-bottom: 5px;
}
.sxBodx2_2x_2{
	float: right;
	font-size: 12px;
	color: #999999;
}
.sxBodx2_2x_3{
	font-size: 14px;
	color: #666666;
	line-height: 24px;
}
.sxBodx3_2{
	overflow: hidden;
    overflow-y: auto;
    width: 100%;
    height: 580px;
}
.sxBodx3_2x_1{
	display: block;
	text-align: center;
	font-size: 14px;
	color: #333333;
	margin: 25px auto;
}
.sxBodx3_2 li{
	margin-bottom: 40px;
}
.sxBodx3_2xbox>img{
	display: inline-block;
	vertical-align: top;
	width: 48px;
	height: 48px;
	border-radius: 50%;
}
.sxBodx3_2x_3b{
	position: relative;
	display: inline-block;
	font-size: 14px;
	padding:15px 30px;
	background: #F4F4F4;
	border-radius: 5px 5px 5px 5px 2px 2px 2px;
	max-width: 344px;
}
.sxBodx3_2x_3{
	background: #F4F4F4;
}
.sxBodx3_2x_5{
	text-align: left;
	background: #FF5121;
	color: #fff;
}
.sxBodx3_2x_2{
	margin-left: 31px;

}
.sxBodx3_2x_2>img{
	margin-right: 10px;
}
.sxBodx3_2x_4{
	margin-right: 28px;

}
.sxBodx3_2x_4>img{
	margin-left: 10px;
}
.jyb_x2{
	text-align: left;
}
.jyb_x1{
	text-align: right;
}
.sxBodx3_2x_3b:after{
	content: "";
    position: absolute;
 
    width: 10px;
    height: 10px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    z-index: 9;
   
}

.sxBodx3_2x_3:after{
    top: 19px;
    left: -5px;
    background: #f4f4f4;
}
.sxBodx3_2x_5:after{
    top: 19px;
    right: -5px;
    background: #ff5121;
}
</style>
