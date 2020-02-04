<template>
	<div>
		<div class="b_con_01">
			<div class="tolu_01">
				<span>我的来电秀工程</span>
				<a href="/#/help?on=4-02">如何通过制作来电秀获得收益？</a>
			</div>
			<div class="tolu_02" >
				<div v-if="showK" class="tolu_03">
					<img class="tolu_04" :src="imgPath+'svg/empty_nodata.svg'">
					<div class="tolu_05">{{btn_a[btn_on].t}}</div>
					<div>
						<span @click="go(btn_a[btn_on].p)" class="btn_n btn_n3">{{btn_a[btn_on].n}}</span>
					</div>
					
				</div>
				
				<div v-else class="tolu_06">
					
					<list :config="conf" ref="sfafa">
						
						<template v-slot:todo="{ todo }">
							<div v-if="todo.id==1" @click="go(btn_a[btn_on].p)" class="tolu_06_x1 pend" >
								<img :src="imgPath+'new/tools/icon_add_small.svg'">
								<div>新建项目</div>
								
							</div>
							
							
							<cent :el="todo"></cent>
						</template>			
					</list>
					<div v-if="isnodata">
						<div class="tolu_05">{{btn_a[btn_on].t}}</div>
						<div>
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
import list from '../../components/list';
import cent from './cent';
export default{
	components:{list,cent},
	data(){
		return{
			isRz:'',
			btn_a:[
				{t:'来电秀工程为空，快去开启你的设计之路吧！',n:'开始制作',p:'/tools'},
				{t:'认证供稿人后，即可开始制作',n:'立即认证',p:''},
				
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
			if(window.userInfo.is_contributor!=true){
				this.showK = 1;
				this.btn_on = 1;
				return
			}
			this.showK = '';
			
			
		},
		go(to){
			this.$router.push({path:to});	
		},
		kfn(on){
			this.isnodata = on;
			
		},

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
	
	color:rgba(51,51,51,1);
	line-height:20px;
	margin-bottom: 32px;
}
.tolu_06{
	padding: 20px;
	text-align: left;
}
.tolu_06_x1{
	display: inline-block;
	vertical-align: top;
	width:193px;
	height:345px;
	background:rgba(244,246,249,1);
	border-radius:5px;

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
</style>
