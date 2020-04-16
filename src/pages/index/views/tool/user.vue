<template>
	<div>
		<component v-if="coms.zj" v-bind:is="coms.zj" v-model="coms" ref="vid"></component>
		<div v-else class="b_con_01">
			<div class="tolu_01">
				<span>我的来电秀工程</span>
				<a href="/#/help?on=4-02">如何通过制作来电秀获得收益？</a>
			</div>
			<div>
				<ul class="listbg">
					<li v-for="(item,index) in statelist" :class="['statelist',statelistindex == index?'statelist-active':'']" @click="statechange(index,item.state)">{{item.title}}</li>
				</ul>
				<div class="listbgline"></div>
			</div>
			<div class="tolu_02" >
				
				
				<div  class="tolu_06">
					
					<list :config="conf" ref="sfafa">
						
						<template v-slot:todo="{ todo }">
						
							<div v-if="todo.on==0" @click="go(btn_a[btn_on].p)" class="tolu_06_x1 pend" >
								<img :src="imgPath+'new/tools/icon_add_small.svg'">
								<div>新建项目</div>
								
							</div>
							
							
							<cent :el="todo.data"></cent>
						</template>			
					</list>
					<div v-if="isnodata">
						<div class="tolu_05">{{btn_a[btn_on].t}}</div>
						<div class="btn_n4">
							<span @click="go(btn_a[btn_on].p)" class="btn_n btn_n3">{{btn_a[btn_on].n}}</span>
						</div>
					</div>
				</div>
				
			</div>
			<!-- 
			
			<div>
				
				
			</div> -->
			
			
		</div>
	</div>
</template>

<script>
import list from '../../components/list2';
import cent from './cent';
import noDshow from './noDshow';
export default{
	components:{list,cent,noDshow},
	data(){
		return{
			coms:{
				zj:'noDshow',
				type:0,
			},
			isRz:'',
			btn_a:[
				{t:'来电秀工程为空，快去开启你的设计之路吧！',n:'开始制作',p:'/pushTool'},
				{t:'认证供稿人后，即可开始制作',n:'立即认证',p:'/setPersonal'},
				{t:'认证供稿人后，即可开始制作',n:'立即认证',p:'/setPersonal'},
			],
			btn_on:0,
			conf:{
				ajax:{
					url:'sh_selfList',
				},
				pr:{
					type:'doing', 
					
				},	
				noData:'1',
			},	
			showK:'',
			isnodata:'',
			statelist:[
				{
					title:"进行中",
					state:"doing"
				},
				{
					title:"已完成",
					state:"finish"
				}
			],
			statelistindex:0
		}
	},
	mounted: function () {
		this.init();
	}, 
	methods:{
		init(){
			if(!window.userInfo){
				this.$router.push({path:'/login'});	
			}
			if(window.userInfo.contributor_format_status==2){
				this.coms.zj = '';
			}
		},
		go(to){
			this.$router.push({path:to});	
		},
		kfn(on){
			this.isnodata = on;
			
		},
		statechange(index,type){
			this.statelistindex = index;
			this.conf.pr.type = type;
			this.$refs.sfafa.getData();
		}
	}
}
</script>

<style>
.tolu_01{
	position: relative;
	text-align: left;
	font-size:16px;
	color:rgba(40,40,40,1);
	line-height:22px;
	margin-bottom: 23px;
}
.tolu_01>a{
	position: absolute;
	top: 0;
	right: 0;
	color:rgba(255,146,0,1);
}
.tolu_02{

	background: #fff;
	border-radius: 5px;
}
.tolu_04{
	display: block;
	width: 100%;
	margin-bottom: 62px;
}
.tolu_05{
	font-size:14px;
	text-align: center;
	color:rgba(51,51,51,1);
	line-height:20px;
	margin-bottom: 32px;
}
.tolu_06{
	padding: 20px 20px 20px 0;
	text-align: left;
}
.tolu_06_x1{
	display: inline-block;
	vertical-align: top;
	width:193px;
	height:345px;
	background:rgba(244,246,249,1);
	border-radius:5px;
	margin-left:20px;
}
.tolu_06_x1>div{
	font-size:14px;
	color:rgba(30,30,30,1);
	line-height:20px;
	text-align: center;
}
.tolu_06_x1>img{
	margin: 146px auto 10px;
	display: block;
	width:24px;
}
.btn_n4 {
	text-align: center;
	/*padding-bottom: 20px;*/
}
.listbg{
	overflow: hidden;
	margin-top: 21px;
	position: relative;
}
.listbgline{
	width: 100%;
	height: 1px;
	background: #D9D9D9;
	margin-bottom: 21px;
	position: relative;
	top: -1px;
	z-index: 0;
}
.statelist{
	float: left;
	margin-right: 48px;
	font-weight:500;
	color:#1E1E1E;
	font-size:14px;
	font-family:PingFangSC-Medium,PingFang SC;
	padding-bottom: 13px;
	cursor: pointer;
	position: relative;
	z-index: 1;
}

.statelist-active{
	color:rgba(51,179,255,1);
	border-bottom: 1px solid rgba(51,179,255,1);
}
</style>
