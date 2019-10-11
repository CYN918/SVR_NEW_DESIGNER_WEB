<template>
	<div>
		<TopNav :data="topConifg"></TopNav>
		<div class="profitBox_2">
			<div class="pbx_1">
				<div>
					<img class="pbx_n_04" src="/imge/profit/qj.svg">
					<div class="pbx_n_02">账号余额<span @click="checkd(1)" class="iconfont pend pbx_1_4" v-html="min1"></span></div>
					<div class="pbx_1_1">
						<span class="pbx_1_1x"><span class="pbx_n_03">￥ </span>{{mJs.money_deiv(num1)}}</span>
						<span @click="showtx()" class="btndf  pend pbx_1_1_1">提现</span>
					</div>
					
					<div class="pbx_1_2 pbx_1x_2x">每月10日-25日汇款上月10号至当月10号的提现申请</div>
				</div>
				<div class="pbx_n_01">
					<div>
						<img src="/imge/profit/qb.svg">
						<div class="pbx_n_02">累计收益 <span @click="checkd(2)" class="iconfont pend pbx_1_4" v-html="mJs.money_deiv(min2)"></span></div>
						<div class="pbx_1_1">
							<span><span class="pbx_n_03">￥ </span>{{mJs.money_deiv(num2)}}</span>						
						</div>
						
					</div>
					<div>
						<img src="/imge/profit/bi.svg">
						<div class="pbx_n_02">累计成交订单</div>
						<div class="pbx_1_1">
							<span>{{basDa.total_hirework}}</span>					
						</div>
						
					</div>
					<div>
						<img src="/imge/profit/qxt.svg">
						<div class="pbx_n_02">收益加成<img  @mouseout="mod()" @mouseover="modx($event,1)" class="pbx_n_06" src="/imge/project/09.svg" alt=""></div>
						<div class="pbx_1_1">
							<span>{{basDa.gain_share_rate}}</span>	
							<div v-if="sfas" class="sytc">
								<div class="sytc_1">
									<div class="sytc_1_1">
										<div>当前累计收益：<span>￥ {{mJs.money_deiv(num2)}}</span></div>
										<div>当前收益加成：<span class="sytc_1_1x">+ {{basDa.gain_share_rate}}</span></div>
									</div>
									<div class="sytc_1_2">
										收益成长任务
									</div>
									<div class="sytc_1_3">
										达成收益条件，之后每单项目均会获得额外百分比收益加成
									</div>
									<div class="sytc_1_4">
										项目加成收益=验收价格*收益加成比
									</div>
								</div>
								<div class="sytc_2">
									<div class="sytc_2_1">
										<span>达成条件</span><span>收益加成</span>
									</div>
									<div :class="num2>=3000?'sydpjcOn':''">
										<span>累计收益达到 ￥ 3,000.00</span><span>+ 5%</span>
									</div>
									<div :class="num2>=20000?'sydpjcOn':''">
										<span>累计收益达到 ￥ 20,000.00</span><span>+ 15%</span>
									</div>
									<div :class="num2>=50000?'sydpjcOn':''">
										<span>累计收益达到 ￥ 50,000.00</span><span>+ 20%</span>
									</div>
									<div :class="num2>=120000?'sydpjcOn':''">
										<span>累计收益达到 ￥ 120,000.00</span><span>+ 25%</span>
									</div>
									<div :class="num2>=300000?'sydpjcOn':''">
										<span>累计收益达到 ￥ 300,000.00 及以上</span><span>+ 30%</span>
									</div>
								</div>
							</div>							
						</div>
						
					</div>
				</div>
				
			</div>
		</div>
		<router-view ref="chartView"/>
		<tjLisst></tjLisst>
		<txBox v-if="istx" :user="txData" ref="txBd"></txBox>
	</div>	
</template>
<script>
import {Message} from 'element-ui'
import TopNav from '../commd/topNav.vue';
import tjLisst from './tjLisst'
import txBox from './txBox'
import tipd from '../project/cenTip';
export default {
	components:{TopNav,tjLisst,txBox,tipd},
	name: 'profit',	
	data(){
		return {
			basDa:{},
			istx:'',			
			topConifg:{title:'我的收益'},
			num1:0,
			num2:0,
			min1:'&#xe6a2;',
			min2:'&#xe6a2;',	
			txData:{},
			sfas:'',
			csff:'',
		}
	},
	beforeCreate:function(){
		if(!window.userInfo){
			this.$router.push({path: '/index'});
			return
		}
		if(!window.userInfo.is_contributor || window.userInfo.is_contributor==0){
			this.$router.push({path: '/noIs'});
			return
		}	
	},
	mounted: function () {			
		this.init();		
	}, 
	methods: {		
		init(){			
			this.txData.type = window.userInfo.contributor_type;
			this.getData();
			this.getUserDetail();
		},
		mod(e){
			this.sfas = '';
		},
		modx(e,on){
			this.sfas = 1;
		},
	
		getData(){
			let pr = {};
			this.api.Income_info(pr).then((da)=>{
				
				if(da=='error'){return}
		
				this.basDa = da;
				this.num1 = da.account_balance;
				this.num2 = da.total_income;				
				

			})
		},
		showtx(){
			this.bdtj('我的收益','提现','--');
			if(this.basDa.account_balance<300){
				Message({message: '账户余额不足300'});
				return
			}
			this.txData.meny = this.basDa.account_balance;
			this.istx = 1;
		},
		close(){
			this.istx = '';
		},
		txcg(num){
			this.basDa.account_balance = ((this.basDa.account_balance*100)-(num*100))/100;
			if(this.num1!='******'){
				this.num1 = this.basDa.account_balance;
			}			
			this.close();
			if(this.$refs.chartView.addGetData){
				this.$refs.chartView.addGetData();
			}
		},
		checkd(on){
			if(on==1){
				if(this.num1=='******'){
					this.num1 = this.basDa.account_balance;
					this.min1 = '&#xe6a2;';
					return
				}
				this.num1='******';
				this.min1 = '&#xe61f;';
				return
			}
			if(on==2){
				if(this.num2=='******'){
					this.num2 = this.basDa.total_income;
					this.min2 = '&#xe6a2;';
					return
				}
				this.num2='******';
				this.min2 = '&#xe61f;';
				return
			}
		},
		getUserDetail(){
			if(!window.userInfo){
				this.$router.push({path:'/login'})
				return
			}
			if(!window.userInfo.contributor_type){
				this.$router.push({path: '/noIs'});
				return
			}
			let pr = {
				access_token:window.userInfo.access_token,
				contribute_type:window.userInfo.contributor_type
			};
			this.api.contributorInfo(pr).then((da)=>{
				if(da=='error'){return}
				this.txData.account_name = da.account_name?da.account_name:da.company_name;
				this.txData.bank_card_id = da.bank_card_no;
				this.txData.bank_name = da.bank_name;				
				this.txData.bank_subbranch = da.branch_bank;
				if(da.id_card){
					this.txData.id_card = da.id_card;
					this.txData.reserve_phone = da.reserve_phone;
					return
				}
				this.txData.code = da.code;
				
			})
		},
		
		
		
	},
}
</script>

<style>
.pbx_1x_2x{
	font-size:12px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:18px;
}
.profitBox{
	background: red;
	height: 100%;
}
.profitBox_2{
	margin: 0 auto;
	padding: 20px 0 40px;
	width: 1300px;	
}

.pbx_1>div{
	display: inline-block;
	vertical-align: top;
	box-sizing: border-box;
	padding: 30px 0 28px;
	height:257px;
	background:rgba(255,255,255,1);

	border-radius:5px;
}

.pbx_1>div:nth-child(1){
	width: 449px;
}
.pbx_1>div:nth-child(2){
	margin: 0 0 0 20px;	
	width: 831px;
}

.pbx_1_1{
	position: relative;
	font-family:PingFang SC Semibold;
	font-size:24px;
	font-weight:600;
	color:rgba(30,30,30,1);
	line-height:40px;
	margin:20px auto;
}
.btndf{
	display: inline-block;
	vertical-align: top;
	border-radius:5px;
	line-height: 38px;
	font-size:14px;
	font-weight: 400;
	text-align: center;
	width: 100px;
	height: 38px;

	border: 1px solid #999;
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
	vertical-align: top;
	white-space:nowrap;
    text-align: right;
}
.pbx_n_01>div{
	display: inline-block;
	vertical-align: top;
	width: 275px;
	height: 175px;
	border-right: 1px solid rgba(244,246,249,1);
}
.pbx_n_01>div:last-child{
	border: none;
}
.pbx_n_01>div>img,.pbx_n_04{
	display: block;
	margin: 0 auto 24px;
	width: 68px;
}
.pbx_n_02{
	font-size:14px;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:20px;
	margin-bottom: 24px;
}
.pbx_n_03{
	display: inline-block;
	vertical-align: top;
	margin-top: 9px;
    margin-right: 5px;
	font-size:16px;
	font-family:PingFang SC Regular;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:22px;
}
.pbx_n_06{
	display: inline-block;
	cursor: pointer;
	vertical-align: top;
	width: 16px;
	margin: 1px 0 0 5px;
}
.sytc{
	z-index: 10;
	position: absolute;
	top: 0;
	left: 0;

	box-sizing: border-box;
	text-align: left;
    -webkit-transform: translate(-35%,-3%);
    transform: translate(-35%,-3%); 
	width:424px;
	height:491px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius: 5px;
}
.sytc:after{
    content: "";
    position: absolute;
    left: 74%;
    top: -3px;
    width: 15px;
    height: 15px;
    background: #fff;
    -webkit-transform: rotate(45deg) translateX(-50%);
    transform: rotate(45deg) translateX(-50%);
    border: 1px solid rgba(152, 144, 144, 0.1);
    border-right: 0;
    border-bottom: 0;
}
.sytc>div{
	padding:30px;
}
.sytc_1{
	border-bottom: 1px solid rgba(244,246,249,1);
}
.sytc_1_1{
	margin-bottom: 23px;
}
.sytc_1_1>div{
	vertical-align: top;
	display: inline-block;
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:20px;
	
}
.sytc_1_1>div:nth-child(1){
	margin-right: 72px;
}
.sytc_1_1>div>span{
	margin-top: 10px;
	display: block;
	line-height:34px;
}
.sytc_1_1x{
	font-size:24px;
	font-weight:600;
	color:rgba(255,81,33,1);	
}
.sytc_1_2{
	margin-bottom: 16px;
	font-size:16px;
	color:rgba(40,40,40,1);
	line-height:22px;
}
.sytc_1_3{
	font-size:14px;
	color:rgba(187,187,187,1);
	line-height:20px;
	margin-bottom: 8px;
}
.sytc_1_4{
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.sytc_2>div{
	margin-bottom: 10px;
	font-size:14px;
	color: rgba(102, 102, 102, 0.31);
	
	line-height:20px;
	height: 20px;
}
.sytc_2>div>span:nth-child(1){
	float: left;
}
.sytc_2>div>span:nth-child(2){
	float: right;
}
.sytc_2>div.sytc_2_1{
	color: #333;
	margin-bottom: 14px;
}
.sytc_2>div.sydpjcOn{
	color: #FF5121;
}
.sytc_2>div.sydpjcOn~div{
	color:rgba(51,51,51,1);
}
</style>
