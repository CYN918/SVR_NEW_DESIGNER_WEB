<template>
	<div>
		<TopNav :data="topConifg"></TopNav>
		<div class="profitBox_2">
			<div class="pbx_1">
				<div>
					<img src="/imge/pro/0.png">
					<div class="pbx_1_1">
						<span class="pbx_1_1x">{{da.num1}}</span>
						<span @click="showtx()" class="btndf btndfys pend pbx_1_1_1">提现</span>
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
						<span>{{da.num3}}</span>					
					</div>
					<div class="pbx_1_2">累计供稿作品</div>
				</div>
			</div>
		</div>
		<router-view/>
		
		<tacBox v-if="istx">
			<template v-slot:tanBox="{todo}">
				<div class="pr_ntc_1">提现</div>
				<div class="pr_ntc_2">
					<div :class="['jdt_n','jdtOn'+typedon]">
						<div class="jdt_n_jdt"><span :style="setJdt()"></span></div>
						<span v-for="(el,index) in ldList" :key="index" :class="index==typedon?'jdt_n_on':''">
							<div>{{1+index}}</div>	
							{{el}}
						</span>						
					</div>
					
					<div v-if="typedon==0" class="pr_xx_1">
						<div>
							<span>企业/机构名称</span><span>**凡</span>
						</div>
						<div>
							<span>企业银行账号</span><span>6666********6666</span>
						</div>
						<div>
							<span>开户银行</span><span>招商银行</span>
						</div>
						<div>
							<span>开户支行</span><span>南山某某支行</span>
						</div>
					</div>
					
					<div v-if="typedon==1" class="pr_xx_1">
						<div>
							<span>账户余额</span><span>￥300，000.00</span>
						</div>
						<div>
							<span>提现金额</span><span><input class="txje" placeholder="请输入金额，最少不小于300元" v-model="form.je" type="text">元</span>
						</div>
					</div>
					
					<div v-if="typedon==2" class="pr_xx_1">
						2
					</div>
					
					<div v-if="typedon==3" class="pr_xx_1">
						3
					</div>
					
					
					<div class="pr_xx_btns botnbox">
						<span v-if="typedon>0" @click="next_x(-1)">上一步</span>
						<span v-if="typedon==0" @click="goUpsuer()">修改银行信息</span>
						<span v-if="typedon<3" @click="next_x(1)" class="ysHei">下一步</span>
						<span v-if="typedon==3" @click="" class="ysHei">完成</span>
					</div>
				</div>
				
			</template>	
			
		</tacBox>
	</div>
	
</template>

<script>
import {Message} from 'element-ui'
import TopNav from '../commd/topNav.vue';
import tacBox from '../../components/tacBox.vue';
export default {
	components:{TopNav,tacBox},
	name: 'profit',	
	data(){
		return {
			istx:'',
			form:{},
			typedon:0,
			ldList:['信息确认','提现金额','发票寄送','身份验证'],
			topConifg:{title:'我的收益'},
			da:{num1:999,num2:999,num3:0},
			mo:{num1:999,num2:999},
			min1:'&#xe6a2;',
			min2:'&#xe6a2;',
		}
	},
	beforeCreate:function(){
	
		if(!window.userInfo){
			this.$router.push({path: '/index'});
			return
		}
		if(window.contributor_format_status!=2){
			this.$router.push({path: '/noIs'});
			return
		}
	
	},
	mounted: function () {			
		this.init();
	}, 
	methods: {
		showtx(){
			this.istx = 1;
		},
		close(){
			this.istx = '';
		},
		next_x(o){
			let  p = this.typedon+o;
			console.log(parseFloat(this.form.je).toString() == "NaN");
			if(p==2 && (parseFloat(this.form.je).toString() == "NaN" || this.form.je<300) ){
				Message({message: '请输入正确金额'});
				return;
			}
			this.typedon = p;
		},
		setJdt(){		
			return 'transform: translateX('+(this.typedon*33.33-100)+'%);';
		},
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
		goUpsuer(){
			if(!window.userInfo){
				this.$router.push({path:'/login'})
				return
			}	
			if(window.userInfo.contributor_type==2){
				this.$router.push({path: '/setEnterprise'})
				return
			}
			this.$router.push({path: '/setPersonal'});
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



.pr_ntc_1{
	position: fixed;
	top: 0;
	left: 0;
	background: #fff;
	text-indent: 30px;
	font-size:16px;
	font-weight:500;
	color:rgba(30,30,30,1);
	text-align: left;
	line-height: 74px;
	border-bottom: 1px solid #E6E6E6;
	width: 100%;
	height: 74px;
}
.pr_ntc_2{
	padding: 104px 30px 70px;
	width: 620px;
	min-height: 249px;
}
.jdt_n{
	position: relative;
	margin-bottom: 43px;
}
.jdt_n_jdt{
	z-index: -1;
    position: absolute;
    top: 8px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    background: #979797;
	overflow: hidden;
    width: 68%;
    height: 2px;	
}
.jdt_n_jdt>span{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #67C239;
	-webkit-transform: translateX(-100%);
	transform: translateX(-100%);
}
.jdt_n>span{
	display: inline-block;
	margin-right: 89px;
	font-size:14px;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:20px;
}
.jdt_n>span:last-child{
	margin-right: 0;
}
.jdt_n>span>div{
	background: #67C239;
	border-radius: 50%;
	margin: 0 auto 7px;
	width:20px;
	height:20px;
	font-size:14px;
	text-align: center;
	font-weight:500;
	color:rgba(255,255,255,1);
	line-height:20px;
	
}
.jdt_n>span.jdt_n_on{
	font-weight:500;
	color:rgba(30,30,30,1);
}
.jdt_n>span.jdt_n_on~span>div{
	background:rgba(153,153,153,1);
}


.pr_xx_1{
	display: inline-block;
	text-align: left;
	margin: 0 auto 27px;
	
}
.pr_xx_1>div{
	margin-bottom: 13px;
}
.pr_xx_1>div>span{
	display: inline-block;
	vertical-align: top;
}
.pr_xx_1>div>span:nth-child(1){
	margin-right: 44px;
	width:91px;
	height:20px;
	font-size:14px;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:20px;
}
.pr_xx_1>div>span:nth-child(2){
	font-size:14px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:20px;
	width: 248px;
}
.pr_xx_btns{
	position: absolute;
	bottom: 30px;
	left: 0;
	width: 100%;
}
.pr_xx_btns>span{
	width: 140px;
}
.txje{
	padding-bottom: 3px;
    border: none;
    line-height: 22px;
    border-bottom: 1px solid #DDDDDD;	
    width: 215px;
	outline: none;
}
</style>
