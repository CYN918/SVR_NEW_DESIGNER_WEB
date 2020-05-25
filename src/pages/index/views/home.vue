<template>
	<div class="newCI">		
		<baner></baner>
		<div class="csBox">		
			<div class="in_d1">
				<pTop class="in_d3" :cn="topCn">
					<template v-slot:todo="{ todo }">
						<div class="homghhd">
							<div class="md_titie"><img :src="imgSig+'newHome/home_icon_tj.svg'" alt="" style="margin-right: 8px;"/>作品推荐</div>
							<div class="md_zt">
								<workNav></workNav>
							</div>
							<div v-if="data.pr.type==1" class="md_class">
								<el-select @change="setFL" v-model="value" placeholder="全部类型">
									<el-option 
									v-for="(item,index) in options"
									:key="index"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
							</div>						
						</div>			
					</template>		
				</pTop>
			</div>	
			<list class="uiinop" :config="data" ref="sfafa">
				<template v-slot:todo="{ todo }">
					<box_a :tjData="bdtjdata" :el="todo"></box_a>
				</template>			
			</list>
		</div>
		<navRight></navRight>
		<!-- <div class="home_0x1">
			<div class="home_0x2">让设计更有价值，让生活更加自由</div>
			<div class="home_0x3">如果你是设计师、摄影师、特效工程师、音乐工作者、短视频等创作者或创意团队，加入狮圈儿，这里就是你施展才华的圈子，让作品获取最大的价值！</div>
			<div class="home_0x4">
				<a  v-for="(el,index) in Ds_01" :key="index">
					<div class="home_0x4_1">
						<img :src="el.i"/>
					</div>
					<div class="home_0x4_2">{{el.n}}</div>
					<span class="home_0x4_3">{{el.t}}</span>
				</a>
			</div>
			<a class="btns btns_js home_0x5_bt pend" href="/#/project">立即查看项目</a>
		</div>	
		
		<div class="home_0x5">
			<div>
				<div class="home_0x5_1">
					<div>自由创作，轻松赚取收益</div>
					以更轻松的方式专注创作，其他交给我们。从投稿设计项目、征集活动，到作品录用和获取收益，全程透明化无忧呈现。
				</div><img class="home_0x5_2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/7.svg"/>
			</div><div>
				<img class="home_0x5_2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/9.svg"/>
				<div class="home_0x5_1">
					<div>让你的创作突破限制</div>
					不要让你的作品像在其他平台上一样在角落里积灰，狮圈儿将创意、分发、收益和社区一站式无缝连接，助你达成更高的成就。
				</div>
			</div><div>
				<div class="home_0x5_1">
					<div>让全球7亿人看到你的作品</div>
					稿件一经录用发行即可被7亿人看到，获得不限于华为、OPPO、VIVO、魅族等遍布全球73%安卓移动终端用户的海量曝光。
				</div><img class="home_0x5_2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/8.svg"/>
			</div><div>
				<img class="home_0x5_2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/10.svg"/>
				<div class="home_0x5_1">
					<div>包容性最强的创作者平台</div>
					狮圈儿具有极大的包容性和爆发性，持续不断的内容需求和收益加成，让每一个热爱创作的人都能实现自己的价值。
				</div>
			</div>
			
			<a class="btns btns_js home_0x5_bt pend" href="/#/project">立即入驻，承接项目</a>
		</div>
		
		<div class="home_0x6">
			<div class="home_0x7">
				<div class="home_0x7_1">优秀作品推荐，为你持续输出灵感</div>
				<div class="home_0x7_2 hovs">
					<span :class="cOn==fls[el]?'check':''" @click="sec(fls[el])" v-for="el in [0,1,2,3,4]">{{fls[el]}}</span>
					<i class="fgx_01"></i>
					<span @click="goFn('/Work_i')">更多</span>
				</div>
			</div>
			<div class="home_0x8">
				<box_a v-for="(el,index) in List" :el="el" :key="index"></box_a>
			</div>
			<a class="btns btns_js home_0x5_bt pend" href="/#/upload">上传我的原创作品</a>
		</div>	 -->
	</div>
</template>
<script>
import baner from '../components/banner';
import workNav from '../views/works/workNav';
import list from '../components/list';
import box_a from '../components/box_a';
import pTop from '../components/postionTop';
import navRight from '../components/nav_right';
// import list from '../components/list';
// import box_a from '../components/box_a';
export default {
	// components:{baner,list,box_a},
	components:{baner,list,box_a,pTop,workNav,navRight},
	name: 'home',
	data(){
		return {
			data:{
				ajax:{
					url:'work_worklist',
				},
				pr:{
					type:1
				},
				bdtj:[['首页','翻页'],['首页','更改单页显示数']]				
			},	
			topCn:{
				min:670,
			},
			bdtjdata:[['首页','作品'],['首页','创作者']],
			type:'rec',
			isTop:'',
			adFn:'',
			options:[],
			value:'',
			specialname:""
			// Ds_01:[
			// 	{n:'UI图标',t:'UI Icon',u:'/#/project',i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/1.svg'},
			// 	{n:'摄影',t:'Photography',u:'/#/project',i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/2.svg'},
			// 	{n:'视觉设计',t:'Visual Design',u:'/#/project',i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/3.svg'},
			// 	{n:'动效制作',t:'Animation production',u:'/#/project',i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/4.svg'},
			// 	{n:'脚本制作',t:'Script production',u:'/#/project',i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/5.svg'},
			// 	{n:'插画',t:'Illustration',u:'/#/project',i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/6.svg'}
			// ],
			// List:[],
			// fls:[],
			// cOn:'全部',
		}
	},
	mounted: function(){
		this.init()
		// this.getMothod()
		// this.getData()
		// this.getClass();
	}, 
	methods: {
		// getMothod(){
		// 	var windowWidth = window.innerWidth;
		// 	if(windowWidth <= 1440){
		// 		this.isShow = false;
		// 	}
		// 	if(windowWidth > 1440){
				
		// 	}

		// },
		init(){
			this.mJs.scTop(1);
			this.getClass();
		},
		setFL(){
			
			if(this.value){
				this.data.pr.classify_name = this.value;
			}else{
				this.data.pr = {
					type:this.data.pr.type
				};
			}
			this.mJs.scTop(702);
			this.$refs.sfafa.sxfn();
			this.bdtj("首页",this.data.pr.classify_name,"--");
		},
		qhZt(id){
			this.data.pr.type = id;
			this.value = '';
			this.mJs.scTop(702);	
			this.$refs.sfafa.sxfn();
		
		},

		getClass(){
			this.api.getClassify().then((da)=>{
				if(da=='error'){
					return
				}
				let arr1 = [{label:'全部分类',value:''}],arr2=[];
				for(let i=0,n=da.length;i<n;i++){
					arr1 = arr1.concat(sbd(da[i].sub_data));
				}
				function sbd(d){
					let arr = [];
					for(let i=0,n=d.length;i<n;i++){
						if(arr2.indexOf(d[i].classify_name)!=-1){
							continue
							return
						}
						arr2.push(d[i].classify_name);
						arr.push({label:d[i].classify_name,value:d[i].classify_name});
					}
					return arr;
				}
				this.options = arr1;   
			})
		}
		// sec(n){
		// 	if(n==this.cOn){
		// 		return
		// 	}
		// 	this.cOn = n;
		// 	if(n=='全部'){
		// 		n = '';
		// 	}
		// 	this.getData(n);
		// },
		// getData(cn){
		// 	let pr = {
		// 		type:'rec',
		// 		page:1,
		// 		limit:4
		// 	};
		// 	if(cn){
		// 		pr.classify_name = cn;				
		// 	}
		// 	this.api.getHList(pr).then((da)=>{
		// 		if(da=='error'){return}				
		// 		this.List = da.data;
		// 	})
		// },
		// getClass(){
		// 	this.api.getClassify().then((da)=>{
		// 		if(da=='error'){
		// 			return
		// 		}
		// 		let arr1 = [],arr2=['全部'];
		// 		for(let i=0,n=da.length;i<n;i++){
		// 			arr1 = arr1.concat(sbd(da[i].sub_data));
		// 		}
		// 		function sbd(d){
		// 			let arr = [];
		// 			for(let i=0,n=d.length;i<n;i++){
		// 				if(arr2.indexOf(d[i].classify_name)!=-1){
		// 					continue
		// 					return
		// 				}
		// 				arr2.push(d[i].classify_name);
						
		// 			}
		// 			return arr;
		// 		}
		// 		this.fls = arr2;  
		// 	})
		// }
	}
}
</script>

<style scoped="scoped">
.proNav2{
	padding-top: 7px;
	border-bottom: 2px solid #E6E6E6;
}
.in_d1{
	height: 75px;	
	position: relative;
    top: -76px;
}
.in_d3{
	width: 100%;
	height: 75px;
}
.proNav2_1{
	position: relative;
	text-align: center;
	margin: 0 auto;
	line-height: 48px;
	height: 48px;
	width: 1300px;
}
.proNav2_1>a{
	display: inline-block;
	margin: 0 20px;
	font-size:16px;
	font-weight:400;
	color:rgba(30,30,30,1);
}
.proNav2_1>a.router-link-active{
	font-weight:500;
	color:#33B3FF;
}
.proNav2_1>a.router-link-active:after{
	content: "";
	display: block;
	margin: 0 auto;
	background: #33B3FF;
	width: 100%;
	height: 2px;
	
}
.homghhd{
	position: relative;
	margin: 0 auto ;
	width: 1300px;
	padding: 27px 0 ;
	text-align: center;
}
	
.homghhd>a{
	position: relative;
	display: inline-block;
	font-size:16px;
	font-weight:400;
	color:rgba(30,30,30,1);
	line-height:22px;
	margin-right: 40px;
}
.homghhd>a.router-link-active{
	color: #33B3FF;
}
.in_d1 .p_isTop{
	/* z-index: 9999;
	position: relative !important;
	top: -76px !important;
	left: 0;

	width: 100%;
	-webkit-animation: none !important;
	animation: none !important;
	-webkit-box-shadow: none !important;
	box-shadow: none !important; */
	z-index: 9999;
	position: fixed;
	top: 0;
	left: 0;

	width: 100%;
	-webkit-animation: bjs .3s linear forwards;
	animation: bjs .3s linear forwards;
	-webkit-box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
	box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
}
.md_titie{
	position: absolute;
	left: 0;
	top: 27px;
	font-size:16px;

	color:rgba(40,40,40,1);
	line-height:22px;
}
.md_class{
	position: absolute;
	right: 0;
	top: 17px;
	width: 90px;
}

.md_class input{
	border: none;
	
	font-size: 14px;
	background: initial;
	color: #999999;
}
.uiinop{
	margin-bottom: 140px !important;
	margin-top: -50px !important;
}

/* .newCI{
	background: #F4F6F9;
}	
.home_0x1{
	padding: 60px 0;
	text-align: center;
}
.home_0x2{
	margin-bottom: 15px;
	font-size:32px;
	font-family:PingFangSC-Regular,PingFang SC;
	color:rgba(64,64,64,1);
	line-height:45px;
	
}
.home_0x3{
	margin: 0 auto 40px;
	width: 592px;
	text-align: center;

	font-size:16px;
	font-family:PingFangSC-Regular,PingFang SC;

	color:rgba(102,102,102,1);
	line-height:24px;
	
}
.home_0x4{
	margin: 0 auto;
	width: 1300px;
}
.home_0x4>a{
	display: inline-block;
	margin:  0 240px 40px 0;
	width: 166px;
}

.home_0x4>a:nth-child(3n+3){
	margin-right: 0;
}
.home_0x4_1{
	position: relative;
	margin-bottom: 16px;
	border-radius: 50%;
	background:#fff;
	width:166px;
	height:166px;	
}

.home_0x4_1>img{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	
}
.home_0x4>a:nth-child(1)>div>img{
	width: 152px;
}
.home_0x4>a:nth-child(2)>div>img{
	width: 137px;
}
.home_0x4>a:nth-child(3)>div>img{
	width: 123px;
    top: 60%;
    left: 58%;
}
.home_0x4>a:nth-child(4)>div>img{
	width: 147px;
    left: 54%;
}
.home_0x4>a:nth-child(5)>div>img{
	width: 130px;
}
.home_0x4>a:nth-child(6)>div>img{
	width: 160px;
}
.home_0x4_2{
	margin-bottom: 4px;
	font-size:20px;
	font-weight:500;
	color:rgba(64,64,64,1);
	line-height:28px;
}
.home_0x4_3{
	font-size:14px;
	font-family:Helvetica;
	color:rgba(64,64,64,1);
	line-height:22px;
}
.home_0x5{
	min-width: 1360px;
	padding: 60px 0;
	background: #fff;
}
.home_0x5>div{
	margin:0 auto 30px;
}
.home_0x5_1>div{
	padding-top: 112px;
	margin-bottom: 14px;
	
	
	font-size:32px;
	color:rgba(40,40,40,1);
	line-height:40px;
	
}
.home_0x5_1{
	width: 456px;
	display: inline-block;
	vertical-align: top;
	text-align: left;
	margin: 0 63px 0 85px;
	color:rgba(102,102,102,1);	
	font-size:16px;
	line-height:24px;		
}
.home_0x5_2{
	display: inline-block;
	vertical-align: top;
	width: 532px;
}
.home_0x5_bt{
	margin-top:40px;
	width:224px;
	height:56px;
	border-radius:7px;
	font-size:20px;
	line-height:56px;
}
.home_0x6{
	margin: 0 auto;
	padding: 60px 0;
	width: 1300px;

}
.home_0x7{
	text-align: left;
	margin-bottom: 20px;
}
.home_0x7_1{
	display: inline-block;
	font-size:16px;
	color:rgba(40,40,40,1);
	line-height:22px;
}
.home_0x7_2{
	float: right;
}
.home_0x7_2>a{
	display: inline-block;
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:22px;
}
.home_0x8{
	height: 393px;
}

.home_0x8>div:last-child{
	margin-right: 0;
}
.home_0x7_2>span{
	display: inline-block;
	vertical-align: top;
	margin: 0 20px;
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
}
.hovs>span{
	cursor: pointer;
}
.hovs>span:hover{
	color: #33B3FF;
}
.hovs>span.check{
	color: #33B3FF;
}
.fgx_01{
	display: inline-block;
	vertical-align: top;
	
	width:1px;
	height:16px;
	background:rgba(187,187,187,1);
	margin: 2px 20px 0 ;
} */
</style>