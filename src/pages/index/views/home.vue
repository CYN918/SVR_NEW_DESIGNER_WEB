<template>
	<div class="newCI">		
		<baner></baner>
		<div class="home_0x1">
			<div class="home_0x2">平台项目外包</div>
			<div class="home_0x3">帮助设计师、摄影师将创作内容发挥最大价值</div>
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
					<div>分成式收益，一次交稿，永久收钱</div>
					坐享每日分成收益结算，还是一次买断落袋为安，你说了算
				</div><img class="home_0x5_2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/7.svg"/>
			</div><div>
				<img class="home_0x5_2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/9.svg"/>
				<div class="home_0x5_1">
					<div>收益成长累计，越赚越多</div>
					累计收益越多，每次完成项目的收益加成额度越大
				</div>
			</div><div>
				<div class="home_0x5_1">
					<div>交稿作品分发渠道覆盖近7亿用户曝光</div>
					龙头合作品牌覆盖73%安卓移动终端，而你只需提供灵感创意。
				</div><img class="home_0x5_2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/8.svg"/>
			</div><div>
				<img class="home_0x5_2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/home/10.svg"/>
				<div class="home_0x5_1">
					<div>项目众多，长期供给，每周更新</div>
					一经中标，最终交稿作品100%验收，每一次的创作都有价值
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
	margin-bottom: 40px;
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