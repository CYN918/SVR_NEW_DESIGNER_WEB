<template>
	<div>
		<TopNav :data="topConifg"></TopNav>
		<div class="profitBox_2">
			<div class="pbx_1">
				<div>
					<img class="pbx_n_04" src="/imge/profit/qj.svg">
					<div class="pbx_n_02">账号余额<span @click="checkd(1)" class="iconfont pend pbx_1_4" v-html="min1"></span></div>
					<div class="pbx_1_1">
						<span class="pbx_1_1x"><span class="pbx_n_03">￥ </span>{{num1}}</span>
						<span @click="showtx()" class="btndf  pend pbx_1_1_1">提现</span>
					</div>
					
					<div class="pbx_1_2 pbx_1x_2x">每月10日-25日汇款上月10号至当月10号的提现申请</div>
				</div>
				<div class="pbx_n_01">
					<div>
						<img src="/imge/profit/qb.svg">
						<div class="pbx_n_02">累计收益 <span @click="checkd(2)" class="iconfont pend pbx_1_4" v-html="min2"></span></div>
						<div class="pbx_1_1">
							<span><span class="pbx_n_03">￥ </span>{{num2}}</span>						
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
export default {
	components:{TopNav,tjLisst,txBox},
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
			this.sfas = 'display:none';
		},
		modx(e,on){
			this.csff = this.tips[on];
			this.setPos(e.clientX,e.clientY);
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
	padding: 20px 0;
	width: 1300px;	
}

.pbx_1>div{
	display: inline-block;
	vertical-align: top;
	box-sizing: border-box;
	padding: 30px 0 28px;
	height:257px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
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
	font-family:PingFang SC Semibold;
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
</style>
