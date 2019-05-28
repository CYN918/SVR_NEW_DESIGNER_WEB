<template>
	<div>
		<TopNav :data="topConifg"></TopNav>
		
		<div v-if="1==2" class="profitBox_1"></div>
		<div class="profitBox_2">
			<div class="pbx_1">
				<div>
					<img src="/imge/pro/0.png">
					<div class="pbx_1_1">
						<span class="pbx_1_1x">{{da.num1}}</span>
						<span class="btndf btndfys pend pbx_1_1_1">提现</span>
					</div>
					<div class="pbx_1_2 pbx_1_3">账号余额<span @click="checkd(1)" class="iconfont pend pbx_1_4" v-html="min1"></span></div>
					<div class="pbx_1_2">平台每月10日-15日汇款当月的提现申请</div>
				</div>
				<div>
					<img src="/imge/pro/1.png">
					<div class="pbx_1_1">
						<span>{{da.num2}}</span>						
					</div>
					<div class="pbx_1_2">累计收益 <span @click="checkd(2)" class="iconfont pend pbx_1_4" v-html="min2"></span></div>
				</div>
				<div>
					<img src="/imge/pro/2.png">
					<div class="pbx_1_1">
						<span>{{da.num}}</span>					
					</div>
					<div class="pbx_1_2">累计供稿作品</div>
				</div>
			</div>
		</div>
		<div class="proNav2">
			<div class="proNav2_1">
				<router-link class="pend" to="/profit">录用记录</router-link>
				<router-link class="last pend" to="/activvity">提现记录</router-link>
			</div>			
		</div>
	</div>
	
</template>

<script>
import {Message} from 'element-ui'
import TopNav from '../commd/topNav.vue';
export default {
	components:{TopNav},
	name: 'profit',	
	data(){
		return {
			topConifg:{title:'我的收益'},
			da:{num1:999,num2:999},
			mo:{num1:999,num2:999},
			min1:'&#xe6a2;',
			min2:'&#xe6a2;',
		}
	},
	mounted: function () {			
		this.init();
	}, 
	methods: {
		checkd(on){
			if(on==1){
				if(this.da.num1=='******'){
					this.da.num1 = '￥ '+this.mo.num1;
					this.min1 = '&#xe6a2;';
					return
				}
				this.da.num1='******';
				this.min1 = '&#xe61f;';
				return
			}
			if(on==2){
				if(this.da.num2=='******'){
					this.da.num2 = '￥ '+this.mo.num2;
					this.min2 = '&#xe6a2;';
					return
				}
				this.da.num2='******';
				this.min2 = '&#xe61f;';
				return
			}
		},
		init(){
			this.da.num1 = '￥ '+this.mo.num1;
			this.da.num2 = '￥ '+this.mo.num2;
			// this.getUserDetail();
		},
		gosetPersonal(){
			this.$router.push({path:'/setPersonal'})			
		},
		getUserDetail(){
			if(!window.userInfo){
				this.$router.push({path:'/login'})
				return
			}	
			this.userData = window.userInfo;
		},
	},
}
</script>

<style>
.profitBox{
	background: red;
	height: 100%;
}
.profitBox_2{
	margin: 0 auto;
	padding: 20px 0;
	width: 1300px;	
}

.pbx_1>div{
	display: inline-block;
	vertical-align: top;
	box-sizing: border-box;
	padding: 30px 0 28px;
	width: 340px;
	height:268px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;
}

.pbx_1>div:nth-child(1){
	width: 580px;
}
.pbx_1>div:nth-child(2){
	margin: 0 20px;	
}
.pbx_1>div>img{
	display: block;
	width: 68px;
	margin: 0 auto;
}
.pbx_1_1{
	
	font-size:24px;
	font-weight:600;
	color:rgba(30,30,30,1);
	line-height:40px;
	margin:20px auto;
}
.btndf{
	display: inline-block;
	border-radius:5px;
	line-height: 40px;
	font-size:14px;
	font-weight: 400;
	text-align: center;
	width: 100px;
	height: 40px;
	box-sizing: border-box;
	border: 1px solid #000;
}
.btndfys{
	border-color: #FF5121;
	background: #FF5121;
	color: #fff;
}
.pbx_1_1_1{
	margin-left: 30px;
}
..pbx_1_2{
	font-size:14px;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:20px;
}
.pbx_1_3{
	margin-bottom: 20px;
}
.pbx_1_4{
	vertical-align: middle;
	display: inline-block;
    width: 35px;
}
.pbx_1_1x{
	display: inline-block;
    width: 140px;
    text-align: right;
}

.proNav2{
	padding-top: 7px;
	border-bottom: 2px solid #E6E6E6;
}
.proNav2_1{
	height: 48px;
	width: 1300px;
}
</style>
