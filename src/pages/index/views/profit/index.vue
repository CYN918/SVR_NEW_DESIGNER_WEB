<template>
	<div>
		<TopNav :data="topConifg"></TopNav>
		<div class="profitBox_2">
			<div class="pbx_1">
				<div>
					<img src="/imge/pro/0.png">
					<div class="pbx_1_1">
						<span class="pbx_1_1x">{{num1}}</span>
						<span @click="showtx()" class="btndf btndfys pend pbx_1_1_1">提现</span>
					</div>
					<div class="pbx_1_2 pbx_1_3">账号余额<span @click="checkd(1)" class="iconfont pend pbx_1_4" v-html="min1"></span></div>
					<div class="pbx_1_2">平台每月10日-15日汇款当月的提现申请</div>
				</div>
				<div>
					<img src="/imge/pro/1.png">
					<div class="pbx_1_1">
						<span>{{num2}}</span>						
					</div>
					<div class="pbx_1_2">累计收益 <span @click="checkd(2)" class="iconfont pend pbx_1_4" v-html="min2"></span></div>
				</div>
				<div>
					<img src="/imge/pro/2.png">
					<div class="pbx_1_1">
						<span>{{basDa.total_hirework}}</span>					
					</div>
					<div class="pbx_1_2">累计供稿作品</div>
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
		getData(){
			let pr = {};
			this.api.Income_info(pr).then((da)=>{
				
				if(da=='error'){return}
		
				this.basDa = da;
				this.num1 = '￥ '+da.account_balance;
				this.num2 = '￥ '+da.total_income;				
				

			})
		},
		showtx(){
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
			this.basDa.account_balance -=num;
			if(this.num1!='******'){
				this.num1 = '￥ '+this.basDa.account_balance;
			}			
			this.close();
			if(this.$refs.chartView.addGetData){
				this.$refs.chartView.addGetData();
			}
		},
		checkd(on){
			if(on==1){
				if(this.num1=='******'){
					this.num1 = '￥ '+this.basDa.account_balance;
					this.min1 = '&#xe6a2;';
					return
				}
				this.num1='******';
				this.min1 = '&#xe61f;';
				return
			}
			if(on==2){
				if(this.num2=='******'){
					this.num2 = '￥ '+this.basDa.total_income;
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
				
			})
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




</style>
