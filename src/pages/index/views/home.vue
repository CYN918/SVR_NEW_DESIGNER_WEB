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
		
	</div>
</template>
<script>
import baner from '../components/banner';
import workNav from '../views/works/workNav';
import list from '../components/list';
import box_a from '../components/box_a';
import pTop from '../components/postionTop';
import navRight from '../components/nav_right';

export default {
	components:{baner,list,box_a,pTop,workNav,navRight},
	name: 'home',
	data(){
		return {
			pagename:"首页",
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
		}
	},
	mounted: function(){
		this.init()
	}, 
	methods: {
		init(){
			let referrer_id = this.$route.query.referrer_id;
			if(referrer_id){
				let pr = {
					referrer_id:referrer_id,
					time:(new Date()).getTime()
				};
				localStorage.setItem('referrer_id',JSON.stringify(pr));
			}
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
			this.bdtj("首页","点击作品分类",this.data.pr.classify_name);
		},
		qhZt(id){
			this.data.pr.type = id;
			this.value = '';
			this.mJs.scTop(702);	
			this.$refs.sfafa.sxfn();
		
		},

		getClass(){
			this.api.getClassify().then((da)=>{
				if(da=='error' || da=='104'){
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
	width: 100px;
	
}

.md_class input{
	border: none;
	text-align: right !important;
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