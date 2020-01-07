<template>
	<div class="newCI">		
		<baner></baner>
		<div class="home_0x1">
			<div class="home_0x2">让设计更有价值，让生活更加自由</div>
			<div class="home_0x3">如果你是设计师、摄影师、特效工程师、音乐工作者、短视频等创作大师或创意团队，加入狮圈儿，这里就是你施展才能的圈子！在这里，你的作品将更容易获得更多关注和收益，狮圈儿帮助你们将作品内容实现最大的价值。</div>
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
					<div>专注创作，轻松收获成就</div>
					全新的创作者平台，聚集创意、分发、收益和社区一站式无缝连接，你只需专注于创作，狮圈儿帮你搞定其他的一切。在这里，你将和各行业的创意大师们一起，尽情发挥奇思妙想，创造更多无限的可能。
				</div><img class="home_0x5_2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/7.svg"/>
			</div><div>
				<img class="home_0x5_2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/9.svg"/>
				<div class="home_0x5_1">
					<div>让你的创作突破限制</div>
					不要让你的照片像在其他平台上一样在角落里积灰，在狮圈儿建立个人或者工作室专页，报名设计比赛或征集活动，以获得荣誉和奖励。狮圈儿用心对待每一份作品，让每一个热爱创作的人都能实现自己的价值。
				</div>
			</div><div>
				<div class="home_0x5_1">
					<div>作品将获全球7亿用户曝光</div>
					狮圈儿与华为、OPPO、VIVO、魅族等众多一线移动终端企业均有密切商业合作，整个合作网络覆盖全球73%的安卓移动终端。创作者所制作产生的作品素材一经录用发行，即会以主题、壁纸、Banner等展示形式获得国内外海量用户曝光。
				</div><img class="home_0x5_2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/8.svg"/>
			</div><div>
				<img class="home_0x5_2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/10.svg"/>
				<div class="home_0x5_1">
					<div>我们汇聚各界人才，共同发挥创作才能</div>
					作为一个全开放平台，狮圈儿对各类创意内容都具有极大的包容性和开放性，无论你是设计师、摄影师还是其他创作者和团队都将有属于你的一席之地。加入狮圈儿，让你的创作成就非凡，让生活变得更加自由美好。
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
		</div>
		
	</div>
</template>
<script>
import baner from '../components/banner';
import list from '../components/list';
import box_a from '../components/box_a';
export default {
	components:{baner,list,box_a},
	name: 'home',
	data(){
		return {
			Ds_01:[
				{n:'UI图标',t:'UI Icon',u:'/#/project',i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/1.svg'},
				{n:'摄影',t:'Photography',u:'/#/project',i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/2.svg'},
				{n:'视觉设计',t:'Visual Design',u:'/#/project',i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/3.svg'},
				{n:'动效制作',t:'Animation production',u:'/#/project',i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/4.svg'},
				{n:'脚本制作',t:'Script production',u:'/#/project',i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/5.svg'},
				{n:'插画',t:'Illustration',u:'/#/project',i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/6.svg'}
			],
			List:[],
			fls:[],
			cOn:'全部',
		}
	},
	mounted: function(){
		this.getData()
		this.getClass();
	}, 
	methods: {
		sec(n){
			if(n==this.cOn){
				return
			}
			this.cOn = n;
			if(n=='全部'){
				n = '';
			}
			this.getData(n);
		},
		getData(cn){
			let pr = {
				type:'rec',
				page:1,
				limit:4
			};
			if(cn){
				pr.classify_name = cn;				
			}
			this.api.getHList(pr).then((da)=>{
				if(da=='error'){return}				
				this.List = da.data;
			})
		},
		getClass(){
			this.api.getClassify().then((da)=>{
				if(da=='error'){
					return
				}
				let arr1 = [],arr2=['全部'];
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
						
					}
					return arr;
				}
				this.fls = arr2;  
			})
		}
	}
}
</script>

<style>
.newCI{
	background: #F4F6F9;
}	
.home_0x1{
	padding: 60px 0;
	text-align: center;
}
.home_0x2{
	margin-bottom: 16px;
	font-size:32px;
	color:rgba(64,64,64,1);
	line-height:45px;
}
.home_0x3{
	margin: 0 auto 40px;
	width: 619px;
	text-align: center;

	font-size:12px;
	color:rgba(102,102,102,1);
	line-height:17px;
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
	padding-top: 125px;
	font-size:32px;
	color:rgba(64,64,64,1);
	line-height:45px;
	margin-bottom: 16px;
	
}
.home_0x5_1{
	width: 437px;
	display: inline-block;
	vertical-align: top;
	text-align: left;
	margin: 0 63px 0 85px;
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:20px;
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
}
</style>