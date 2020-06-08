<template>
	<div>
		<Header ref="topZj"></Header>
		<div class="ac_v1-1">
			<img class="ac_v1-2" :src="imgPath+'ac_v5/ban.jpg?a=1'"/>
		
			<img v-if="infoData.status==1 && infoData.setting_type!=1" @click="showZp()" class="ac_v1-2-x" :src="imgPath+'ac_v5/banBT.png'"/>
			<div class="ac_v1-4" v-if="arr.length>1">
				<pTop class="isflo_01" :cn="topCn">
					<template v-slot:todo="{ todo }">
						<div class="ac_v1-4x">
							<span @click="navCl(el)" :class="el.p==navOn?'checkO':''" v-for="el in arr">{{el.n}}</span>
						</div>
					</template>		
				</pTop>
				
			</div>
			<div class="ac_v1-5">
				<div v-if="navOn==1" class="ac_v1-5-1">
					<img  :src="imgPath+'ac_v5/01.jpg?a=2'">
					<div class="btnsa">
						<div @click="navCl({p:2})"></div>
						<div @click="goun"></div>
					</div>
					
				</div>
				
				<div v-if="navOn==2" class="ac_v1-5-1">
					<img :src="imgPath+'ac_v5/03.jpg?a=1'">
				</div>
				<div v-if="navOn==3" class="ac_v1-5-2">
					<div class="ac-01">
						<div class="ac-02">
							<div class="ac-01-1">
								全部作品<span>{{total}}</span>
								<div class="ac-01-2">
									<span :class="!this.px?'chko':''" @click="timeO()">推荐</span>
									<span :class="this.px?'chko':''" @click="timeO(1)">最新</span>
								</div>
							</div>
							<div class="mo_01box">
								<box_a v-for="(el,index) in workList" :key="index"  :el="el"></box_a>
							</div>
							
							<div v-if="total>workList.length" class="ac-01-3">
								<el-pagination
								background
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="page"
								:page-sizes="limits"
								:page-size="limit"
								layout="total,prev, pager, next,sizes"
								:total="total">
								</el-pagination>
							</div>
						</div>
						
						
					</div>
					
					<img class="ac-04" :src="imgPath+'ac_v5/07.png'">
					
					
					
				</div>

				
			</div>
			
			<div class="ac_v1-3">
				<img :src="imgPath+'ac_v5/fx.png?a=1'"/>
				<div class="ac_v1-3-1fx1">
					<div class="ac_v1-3-1fx" id="qrcode"></div>
				</div>
				<div @click="shaFn('fxUrl2')" class="ac_v1-3-2"></div>
				<div @click="shaFn('fxUrl1')" class="ac_v1-3-3"></div>
				
			</div>
			<component v-bind:is="tanData.zj" v-model="tanData"></component>
			<loginDialog ref="logindialog" :config="outc"></loginDialog>	
		</div>
		<img class="hctip" :src="imgPath+'ac_v5/01.jpg?a=1'">
		<img class="hctip" :src="imgPath+'ac_v5/03.jpg'">
	</div>
</template>

<script>
import pTop from '../../components/postionTop2';
import list from '../../components/list';
import box_a from '../../components/box_a';
import com_wp from '../activvity/com_wp';
import bm_01 from '../activvity/tan_c';
import QRCode from 'qrcodejs2'
import Header from '../header';
import loginDialog from '../../components/loginDialog'
export default{
	components:{list,box_a,com_wp,bm_01,QRCode,pTop,Header,loginDialog},
	data(){
		return{
			topCn:{
				min:680,
			},
			arr:[
				{n:'活动详情',p:1},
				{n:'奖品放送',p:2},
			],
			navOn:1,
			limits:[20,40,80],
			page:1,
			limit:20,
			total:0,
			workList:[],
			infoData:{},
			px:'',
			ids:'',
			isnav:'',
			fxUrl1:'',
			fxUrl2:'',
			tanData:{},
			isfl:'',
			isnv_02:'',
			outc: {
				num:'',
				scroll:2,
			}
		}
	},
	mounted: function(){
		this.ckl();
	}, 
	methods:{
		goun(){

			window.open('/#/upload');				
		},
		qrcode(u) {
		    let qrcode = new QRCode('qrcode', {
		        width: 96,  
		        height: 96,
		        text: u, // 二维码地址
		        colorDark : "#000",
		        colorLight : "#fff",
		    })
		},
		
		navCl(el){
		
			if(el.p==this.navOn){
				return
			}
			if(el.p==4){
				this.downMoble(this.infoData);
				return
			}
			
			this.navOn = el.p;
			var top = this.mJs.getTop();
			if(top<600){
				return
			}			
			this.mJs.scTop(680);
		},
		ckl(){
			if(!this.$route.query.id){
				this.$router.push({path:'/activvity'})	
				return
			}
			
			this.ids = this.$route.query.id
			this.a_getInfo();
			
		},

		shaFn(n){
			window.open(this[n]);
		},
		shar(da){
		
			let ulrd = encodeURIComponent(da.url);
			this.fxUrl1 = 'http://service.weibo.com/share/share.php?appKey=3473072390&title='+da.title+'&url='+ulrd+'&pic='+da.pics+'#_loginLayer_'+(new Date()).valueOf();
			this.fxUrl2 ='https://connect.qq.com/widget/shareqq/index.html?url='+ulrd+'&title='+da.title+'&pics='+da.pics+'&desc=&summary='+da.summary+'&site=wo';			
			
			setTimeout(()=>{
				this.qrcode(da.url);
			},50);
		},
		timeO(a){
			this.px = a;
			this.page=1;
			this.limit=20;
			this.a_getWork();
		},
		downMoble(d){
			if(d.template_file_type==1){
				window.downloadFiles(d.template_url,d.template_file_name);
				return
			}
			this.tanData = {
				zj:'com_wp',
				info:online_disk_info
			};
		},
		a_getWork(){
			let pr = {
				activity_id:this.ids,
				page:this.page,
				limit:this.limit,
			};
			if(this.px){
				pr['sort'] = this.px;
			}
			this.api.a_getWork(pr).then((da)=>{
				if(da=='error' || da=='104'){
					return
				}
				
				this.total = da.total;
				this.workList = da.data;
				if(this.total>0 && !this.isnv_02){
					this.isnv_02=1;
					this.arr.push({n:'全部作品',p:3})
				}
				if(!this.isnav){
					this.isnav =1;
				}
				
				
			}).catch(()=>{
				
			})
		},
		a_getInfo(){
			this.api.a_getInfo({activity_id:this.ids}).then((da)=>{	
				if(da=='error' || da=='104'){
					this.$router.push({path: '/404'});
					return
				}
				this.infoData = da;
				if(da.is_provide_template==1){
					this.arr.push({n:'资料下载',p:4});
				}
				
				
				this.a_getWork();
				
				document.title=this.infoData.activity_name+'-狮圈儿（Zoocreators）';
				let dp = window.location.origin+'/aindex.html#/conta?id='+this.infoData.id;
			
				this.shar({
					titlec:'活动分享',
					url:window.location.origin+'/aindex.html#/conta?id='+this.infoData.id, 
					title:da.activity_name+'-狮圈儿创作者平台',
					pics:da.banner,
					desc:'惊现大神快来膜拜',
					summary:da.activity_name+'-狮圈儿创作者平台',				
				});

			});
		},	
		showZp(){
			console.log(window.userInfo)
			if (!window.userInfo) {
				this.outc.num = 1;
				this.$refs.logindialog.show()
				return
			}
			this.tanData = {
				zj:'bm_01'
			};
		},
		
		
		handleSizeChange(val) {
		
			this.limit = val;
			this.page = 1;
			this.a_getWork();
			
		},
		handleCurrentChange(val) {	
			this.goTop=1;	
			this.page = val;
			this.a_getWork();
		},
	}
}	
</script>

<style scoped="scoped">
#app > div > div.ac_v1-1{
	padding: 0;
}
.ac_v1-2{
	padding-top: 60px;
	display: block;width: 100%;
}
.ac_v1-3{
	position: fixed;
	width: 80px;
    top: 308px;
    right: 16px;
}
.ac_v1-3>div{
	cursor: pointer;
}
.ac_v1-3>img{
	display: block;
	width: 100%;
}
.ac_v1-4{
	background: #3257ab;
	height:80px;
	width: 100%;
}
.ac_v1-4x{
	margin: 0 auto;
	width: 1300px;
	text-align: center;
}
.ac_v1-4x>span{
	cursor: pointer;
	display: inline-block;
	vertical-align: top;
	color: #fff;
	line-height: 80px;
	font-size: 30px;
	text-align: center;
	width: 325px;
}
.ac_v1-4x>span.checkO{
	background: #17e7fe;
	color: #fff;
}
.ac_v1-4x>span:hover{
	color: #fff;
	background: #17e7fe;
}
.ac_v1-5{
	position: relative;
}
.ac_v1-5-1{
	position: relative;
}
.ac_v1-5-1>img{
	display: block;
	width: 100%;
}
.ac_v1-5-2{
	background: url(https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/ac_v5/02.jpg?a=2) 0 0/100% auto no-repeat;
	padding: 80px 0 0 0;
	
}

.ac-01{
	margin-bottom: 40px;
	background: none;
}

.ac-04{

	display: block;
	width: 100%;
}
.ac-02{
	position: relative;
	padding: 30px;
	text-align: left;
	box-sizing: border-box;
	margin: 0 auto;
	background:#fff;
	border-radius: 4px;
	width: 1300px;
}
.ac-01-1{
	font-size: 30px;
	line-height: 35px;
	margin-bottom: 30px;
}
.ac-01-1>span{
	display: inline-block;
	vertical-align: top;
	font-size: 40px;
	margin-left: 4px;
	line-height: 35px;
}
.ac-01-2{
	position: absolute;
	right: 30px;
	top: 30px;
	font-size: 16px;
	line-height: 35px;
}
.ac-01-2>span{
	cursor: pointer;
	display: inline-block;
    vertical-align: top;
    font-size: 20px;
    color: rgb(51, 51, 51);
    line-height: 20px;
    margin: 0px 10px;
}
.ac-01-2>span:hover,.ac-01-2>span.chko{
	color: #ffb652;
}
.ac-01-3{
	text-align: center;
}
.ac-01-3 .el-pagination span:not([class*=suffix]){
	line-height: 40px;
}

.ac_v1-3-1{
	position: absolute;
}
.ac_v1-3-2{
    position: absolute;
    top: 138px;
    left: 10px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.ac_v1-3-3{
	position: absolute;
    top: 209px;
    left: 10px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.mo_01box{
	margin-right: -20px;
}
.mo_01box .wk_a{
	width: 295px;
}
.sfcjfs{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 38%;
}
.sfcjfs1{
	cursor: pointer;
	display: block;
    margin: 0 auto;
    width: 13%;
    padding-top: 4%;

}
.ac_v1-3-1fx1{
	position: absolute;
    top: 70px;
    left: 10px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.ac_v1-3-1fx{
	display: none;
	position: absolute;
    top: -25px;
    right:80px;
    padding: 10px;
    border-radius: 5px;
    background: #fff;
}
.ac_v1-3-1fx1:hover .ac_v1-3-1fx{
	display: block;
}
.hctip{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 0;
	height: 0;
}
.isflo_01{
    width: 100%;
	height: 100%;
    min-width: 1300px;
    z-index: 10;
    background: #00b4ff;
}
.ac_v1-2-x{
	cursor: pointer;
    position: absolute;
    top: 0;
    left: 50%;
    padding-top: 44%;
    width: 13%;
    transform: translateX(-50%);
}
.btnsa{
    position: absolute;
    bottom: 0;
    left: 34%;
    width: 31%;
    padding-bottom: 48%;

}
.btnsa>div{
	cursor: pointer;
	display: inline-block;
    width: 23%;
    margin: 0 3%;
    padding: 10%;

}
</style>
