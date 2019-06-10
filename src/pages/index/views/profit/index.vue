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
		<tacBox v-if="istx && userTypes==1">
			<template v-slot:tanBox="{todo}">
				<div class="pr_ntc_1">提现</div>
				<div class="pr_ntc_2">
					<div :class="['jdt_n','jdtOn'+typedon]">
						<div style="width: 47%;" class="jdt_n_jdt"><span :style="setJdt2()"></span></div>
						<span v-for="(el,index) in ldList2" :key="index" :class="index==typedon?'jdt_n_on':''">
							<div>{{1+index}}</div>	
							{{el}}
						</span>						
					</div>
					
					<div v-if="typedon==0"  class="pr_xx_1">
						<div class="pr_xx_1_c">
							<span>收款账户名</span><span>{{backname(form.account_name)}}</span>
						</div>
						<div class="pr_xx_1_c">
							<span>银行卡号</span><span>{{backBan(form.bank_card_id)}}</span>
						</div>
						<div class="pr_xx_1_c">
							<span>开户银行</span><span>{{form.bank_name}}</span>
						</div>
						<div class="pr_xx_1_c">
							<span>开户支行</span><span>{{form.bank_subbranch}}</span>
						</div>
					</div>
					<div v-if="typedon==1" class="pr_xx_1">
						<div class="pr_xx_1_c">
							<span>账户余额</span><span>{{num1}}</span>
						</div>
						<div class="pr_xx_1_c">
							<span>提现金额</span><span><input class="txje" placeholder="请输入金额，最少不小于300元" v-model="form.cash_money" type="text">元</span>
							<div class="xf11l">当月到账金额=当月提现总额-税费<span class="iconfont">
								&#xe65c;
								<div class="txtipgr">
									<div class="titledsx">税费计算</div>
									<div class="conddf">
										<span>劳动报酬 X</span>
										<span>X≤800</span>
										<span>800＜X≤4000</span>
										<span>4000＜X≤25000</span>
										<span>25000＜X≤62500</span>
										<span>62500＜X</span>
									</div>
									<div class="conddf conddf2">
										<span>个税</span>
										<span>0</span>
										<span>(X-800)*20%</span>
										<span>X*80%*20%</span>
										<span>X*800*30%-2000</span>
										<span>X*80%*40%-7000</span>
									</div>
								</div>
							</span></div>
						</div>
					</div>
					
					
					
					<div v-if="typedon==2" class="pr_xx_1">
						<div class="phodegg">
							<div class="hm">{{backPhone()}}<span class="uphodefbt pend" @click="editPhone()">修改手机号</span></div>
							
							<Input v-model="form.verify_code"  @ajaxYzm="ajaxYzm" :type="'text'" :oType="'yzm'" :chekFn="chekverify" :placeholder="'输入 6 位短信验证码'"  ref="verify"></Input>
							
						</div>
					</div>
					
					
					<div class="pr_xx_btns botnbox">
						<span v-if="typedon>0" @click="next_x(-1)">上一步</span>
						<span v-if="typedon==0" @click="goUpsuer()">修改银行信息</span>
						<span v-if="typedon<2" @click="next_x(1)" class="ysHei">下一步</span>
						<span v-if="typedon==2" @click="pushData" class="ysHei">完成</span>
					</div>
				</div>
				
			</template>	
			
		</tacBox>
		<tacBox v-if="istx && userTypes==2">
			<template v-slot:tanBox="{todo}">
				<div class="pr_ntc_1">提现</div>
				<div class="pr_ntc_2">
					<div :class="['jdt_n','jdtOn'+typedon]">
						<div  class="jdt_n_jdt"><span :style="setJdt()"></span></div>
						<span v-for="(el,index) in ldList" :key="index" :class="index==typedon?'jdt_n_on':''">
							<div>{{1+index}}</div>	
							{{el}}
						</span>						
					</div>
					
					<div v-if="typedon==0"  class="pr_xx_1">
						<div class="pr_xx_1_c">
							<span>企业/机构名称</span><span>{{backname(form.account_name)}}</span>
						</div>
						<div class="pr_xx_1_c">
							<span>企业银行账号</span><span>{{backBan(form.bank_card_id)}}</span>
						</div>
						<div class="pr_xx_1_c">
							<span>开户银行</span><span>{{form.bank_name}}</span>
						</div>
						<div class="pr_xx_1_c">
							<span>开户支行</span><span>{{form.bank_subbranch}}</span>
						</div>
					</div>
					<div v-if="typedon==1" class="pr_xx_1">
						<div class="pr_xx_1_c">
							<span>账户余额</span><span>{{num1}}</span>
						</div>
						<div class="pr_xx_1_c">
							<span>提现金额</span><span><input class="txje" placeholder="请输入金额，最少不小于300元" v-model="form.cash_money" type="text">元</span>
						</div>
					</div>
					
					<div v-if="typedon==2" class="txTbox">
						<div class="txTbox_t">发票说明</div>
						<div class="txTbox_c">
							<div class="txTbox_c_fp_1">
								请将提现金额等额的发票寄出给我们，并提供寄出信息<br/>若提供的是3%税率的发票，则平台将另代替扣除3%税费<br/> 
								<span class="hszt">如:提现1000元，实际汇款为970元</span>
							</div>
						</div>
						<div class="txTbox_t">平台开票信息</div>
						<div class="txTbox_c zyfb">
							<div><span>公司名称</span><span>深圳掌酷软件有限公司</span></div>							
							<div><span>开户银行</span><span>中国银行深圳科技园支行</span></div>
							<div><span>企业银行账号</span><span>749763916542</span></div>
							<div><span>税号</span><span>9144030031 1975518G</span></div>
							<div><span>联系地址</span><span>广东省深圳市南山区高新园中区科技路11号 伟杰大厦2楼212</span></div>
						</div>
						<div class="txTbox_t">寄送信息</div>
						<div class="txTbox_c zyfb">
							<div class="up_fp">
								<span>发票拍照</span>
								<div class="botnbox">
									<span class="up_fp_1 up_file">上传照片<input @change="fileUpfj" ref="upnfile2" type="file"></span>
									<div class="up_fp_2" v-if="upfjData.bf">
										<div class="up_fp_3">
											<div class="jdtBox">
												<div :style="{transform:'translateX(-'+(100-upfjData.bf)+'%)'}"></div>										
											</div>
										</div>
										<div>{{upfjData.bf?upfjData.bf+'%':''}}</div>
										<div @click="qxclosd(fileUpfjd)" class="up_fp_4 iconfont pend">&#xe619;</div>
									</div>
									<div v-if="upfjData.bf" class="up_fp_5 iconfont" :title="upfjData.file_name">
										&#xe621; {{upfjData.file_name?upfjData.file_name.substring(0,10):'xxxxxx'}}
										<span @click="qxclosd(fileUpfjd)" class="cldo iconfont pend">&#xe619;</span>
									</div>
								</div>
							</div>
							<div><span>物流公司名称</span><span><input class="txje" placeholder="请输入物流公司名称" v-model="form.express_company" type="text"></span></div>
							<div><span>寄送物流单号</span><span><input class="txje" placeholder="请输入物流单号" v-model="form.express_id" type="text"></span></div>
						
						</div>
						
					</div>
					
					<div v-if="typedon==3" class="pr_xx_1">
						<div class="phodegg">
							<div class="hm">{{backPhone()}}<span class="uphodefbt pend" @click="editPhone()">修改手机号</span></div>
							
							<Input v-model="form.verify_code"  @ajaxYzm="ajaxYzm" :type="'text'" :oType="'yzm'" :chekFn="chekverify" :placeholder="'输入 6 位短信验证码'"  ref="verify"></Input>
							
						</div>
					</div>
					
					
					<div class="pr_xx_btns botnbox">
						<span v-if="typedon>0" @click="next_x(-1)">上一步</span>
						<span v-if="typedon==0" @click="goUpsuer()">修改银行信息</span>
						<span v-if="typedon<3" @click="next_x(1)" class="ysHei">下一步</span>
						<span v-if="typedon==3" @click="pushData" class="ysHei">完成</span>
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
import Input from '../../components/input'
export default {
	components:{TopNav,tacBox,Input},
	name: 'profit',	
	data(){
		return {
			basDa:{},
			fileUpfjd:'',
			istx:'',
			form:{account_name:'测试',bank_card_id:'xxxxxxxxx',bank_name:'bank_name',bank_subbranch:'xxxx'},
			typedon:0,
			ldList:['信息确认','提现金额','发票寄送','身份验证'],
			ldList2:['信息确认','提现金额','身份验证'],
			topConifg:{title:'我的收益'},
			num1:0,
			num2:0,
			min1:'&#xe6a2;',
			min2:'&#xe6a2;',
			upfjData:{},
			chekPhpne:function(val){
				if(this.form.mobile_zone!='86'){
					if(!(typeof val === 'number' && val%1 === 0)){
						return {type:false,text:'请输入正确的手机号码',cls:'errd5'}; 					
					}			
					return true; 
				}	
				if(!(/^1[34578]\d{9}$/.test(val))){ 
					return {type:false,text:'请输入正确的手机号码',cls:'errd5'}; 
				} 
				return true;
			},
			chekverify:function(val){
				if(!val){
					return {type:false,text:'请填写验证码',cls:'errd5'}; 
				}
				if(!(/^\S*$/.test(val))){ 				
					return {type:false,text:'验证码不能有空格',cls:'errd5'}; 
				} 			
				if(val.length!=6){
					return {type:false,text:'请填写6位验证码',cls:'errd5'}
				}
				return true
			},
			userTypes:1,
		}
	},
	beforeCreate:function(){
		if(!window.userInfo){
			this.$router.push({path: '/index'});
			return
		}
		if(window.userInfo.contributor_format_status!=2){
			this.$router.push({path: '/noIs'});
			return
		}
	
	},
	mounted: function () {			
		this.init();
	}, 
	methods: {
		backPhone(){
			return window.userInfo.mobile_zone+'+'+window.userInfo.mobile;
		},
		backBan(da){
			if(da=='error'){return}
			return da.substring(0,4)+'*******'+da.substring(-1,4);
		},
		backname(da){
			if(da=='error'){return}
			let len = da.length,
			str = da.substring(-1,1),
			xx = '';
			for(let i=0;i<len-1;i++){
				xx+='*';
			}
			return xx+str;
		},
		init(){
			this.userTypes=window.userInfo.contributor_type;
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
		pushData(){
			if(this.chekverify(this.form.verify_code)!=true){
				Message({message: '请填写正确的验证码'});
				return
			}
			let pr = this.form;
			this.api.Income_applyCash(pr).then((da)=>{
				if(da=='error'){return}
				Message({message: '申请成功请耐心等待审核'});
				this.basDa.account_balance -= pr.cash_money;
				this.num1 = '￥ '+this.basDa.account_balance;
				this.form={};
				
				
				this.close();
				if(this.$refs.chartView.addGetData){
					this.$refs.chartView.addGetData();
				}
							
			});	
		},
		editPhone(){
			this.$router.push({path: '/setUser'});
		},
		setYzm(val){
			this.from.mobile_zone = val;
		},
		ajaxYzm(){
			if(!window.userInfo){
				return
			}
			let params = {
				mobile:window.userInfo.mobile,
				mobile_zone:window.userInfo.mobile_zone
			};
			this.api.sendVerifyCode(params).then((da)=>{	
				if(da=='error'){
					return
				}
				Message({message: '验证码已发送'});
				this.$refs.verify.runTimer(60);
			}).catch(()=>{
				
			});
		},
		fileUpfj(flie){			
			if(this.upfjData && this.upfjData.type){
				Message({message: '正在上传中请稍后'});
				return
			}	
			if (!/\.(jpg|jpeg|png|JPG|PNG|GIF)$/.test(flie.target.value)||flie.target.files.length==0) {
				Message({message: '请上传正确的格式'});
				return
			}
			let fld = flie.target.files[0],	
			app_secret = '6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY',		
			times = (Date.parse(new Date())/1000);
			let arr = [
				1001,
				app_secret,
				window.userInfo.open_id,
				times
			],
			formData = new FormData();
			formData.append('app_id',1001);
			formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
			formData.append('user',window.userInfo.open_id)
			formData.append('file',fld)
			formData.append('relation_type','user')
			formData.append('timestamp',times)
			formData.append('is_callback',1)
			let xhr = new XMLHttpRequest();
			this.upfjData = {
				file_name:fld.name,
				bf:0,
				xhr:xhr,
				type:'上传中'
			};
			let uploadProgress = (evt)=>{		
				if(evt.lengthComputable) {
					let percent = Math.round(evt.loaded * 100 / evt.total);
					this.upfjData.bf  = Math.floor(percent); 
				}
			};
			let uploadComplete = (data)=>{
				
				if(data.currentTarget.response){
					let da = JSON.parse(data.currentTarget.response).data;
					this.upfjData.fid=da.fid;					
					this.upfjData.type='上传成功';
					this.form.invoice = da.url;
					this.$refs.upnfile2.value ='';		
					this.form.attachment_id = da.fid;	
					Message({message: '文件上传成功'});
				}
				
			};
			let uploadFailed = ()=>{
				// delete p;
				p.type="none";
				this.$refs.upnfile2.value ='';
				this.upfjData = {};
				Message({message: '文件上传失败请稍后重试'});
				
			};
			let uploadCanceled = ()=>{
				// p.type="none";
				this.$refs.upnfile2.value ='';
				this.upfjData = {};
				this.form.invoice = '';
				Message({message: '取消成功'});
				
			};
			xhr.upload.addEventListener("progress",uploadProgress, false);
			xhr.addEventListener("load",uploadComplete, false);
			xhr.addEventListener("error",uploadFailed, false);
			xhr.addEventListener("abort",uploadCanceled, false);
			xhr.open("POST", window.basrul+"/File/File/insert");
			xhr.send(formData);
			this.fileUpfjd = xhr;
			
		},
		qxclosd(obj){
			if(obj){
				obj.abort();			
				return
			}
			
			this.form.invoice = '';
			this.form.attachment_id='';
			this.upfjData = {};
		},
		showtx(){
			if(this.basDa.account_balance<300){
				Message({message: '账户余额不足300'});
				return
			}
			this.istx = 1;
		},
		close(){
			this.istx = '';
		},
		next_x(o){
			let  p = this.typedon+o;
			if(p==2 && (parseFloat(this.form.cash_money).toString() == "NaN" || this.form.cash_money<300) ){
				Message({message: '请输入正确金额,提现金额不得小于300'});
				return;
			}
			
			if(p==2 && this.form.cash_money>this.basDa.account_balance){
				Message({message: '余额不足'});
				return;
			}
			
			if(this.userTypes==2 && p==3){
				if(!this.form.invoice){
					Message({message: '请先上传照片'});
					return;
				}
					  
				if(!this.form.express_company){
					Message({message: '请先填写物流公司名称'});
					return;
				}
				if(!this.form.express_id){
					Message({message: '请先填写物流单号'});
					return;
				}
				
			}
			this.typedon = p;
		},
		setJdt2(){
			return 'transform: translateX('+(this.typedon*33.33-100)+'%);';
		},
		setJdt(){		
			return 'transform: translateX('+(this.typedon*33.33-100)+'%);';
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
		
		gosetPersonal(){
			this.$router.push({path:'/setPersonal'})			
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
		
		
		getUserDetail(){
			if(!window.userInfo){
				this.$router.push({path:'/login'})
				return
			}
			let pr = {
				access_token:window.userInfo.access_token,
				contribute_type:window.userInfo.contributor_type
			};
			this.api.contributorInfo(pr).then((da)=>{
				if(da=='error'){return}
				this.form.account_name = da.account_name?da.account_name:da.company_name;
				this.form.bank_card_id = da.bank_card_no;
				this.form.bank_name = da.bank_name;				
				this.form.bank_subbranch = da.branch_bank;
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
	background: #C1EDAA;
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
.jdt_n>span.jdt_n_on>div{
	background: #67C239;
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
.pr_xx_1>div.pr_xx_1_c{
	margin-bottom: 13px;
}
.pr_xx_1>div.pr_xx_1_c>span{
	display: inline-block;
	vertical-align: top;
}
.pr_xx_1>div.pr_xx_1_c>span:nth-child(1){
	margin-right: 44px;
	width:91px;
	height:20px;
	font-size:14px;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:20px;
}
.pr_xx_1>div.pr_xx_1_c>span:nth-child(2){
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


.txTbox{
	margin: 0 auto;
	text-align: left;
	width: 550px;
	
}
.txTbox_t{
	margin-bottom: 12px;
	font-size:14px;
	font-weight:500;
	color:rgba(51,51,51,1);
	line-height:20px;
}
.txTbox_c{
	width: 410px;
    margin: 0 auto 25px;
}
.txTbox_c_fp_1{
	font-size:14px;
	font-weight:400;
	color:#333333;
	line-height:21px;
}
.txTbox_c_fp_1>span.hszt{
	color:#999;
}
.zyfb{
	
	
}
.zyfb>div{
	margin-bottom: 12px;
}
.zyfb>div>span{
	display: inline-block;
	vertical-align: top;
	font-size:14px;
	font-weight:400;
	line-height:20px;
}
.zyfb>div>span:nth-child(1){
	color:rgba(153,153,153,1);
	margin-right: 33px;
	width: 84px;
}
.zyfb>div>span:nth-child(2){
	color:rgba(51,51,51,1);
	width: 264px;
}
.up_fp>span{
	margin-top: 10px;
}
.up_fp>div{
	display: inline-block;
}

.jdtBox{
	position: relative;
    background: #D8D8D8;
    border-radius: 4px;
    width: 100%;
    height: 4px;
    overflow: hidden;
}
.jdtBox>div{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #FF5121;
}
.up_fp .botnbox{
	text-align: left;
}
.up_fp .up_fp_1{
	margin-bottom: 15px;
}
.up_fp_2>div{
	display: inline-block;
	font-size:14px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:20px;
}
.up_fp_3{
	vertical-align: middle;
	margin-right: 10px;
	width: 127px;
	height: 4px;
}
.up_fp_4{
	margin-left: 22px;
}
.up_fp_5{
	font-size:14px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:20px;
}
.cldo{
	display: inline-block;
	margin-left: 12px;
	font-size: 14px;
	vertical-align: middle;
}
.up_file{
	position: relative;
}
.up_file>input{
	cursor: pointer;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.phodegg{
	position: relative;
}
.phodegg .lgoin_s2{
	margin-right: 12px;
    margin-left: 0px;
}
.uphodefbt{
	position: absolute;
    right: 0;
    top: 0;
    color: #FF5121;
    font-size: 14px;
}
.hm{
	position: relative;
    height: 40px;
    border-bottom: 1px solid #ddd;
    line-height: 40px;
    margin-bottom: 20px;
}
.xf11l{
	font-size:13px;
	font-weight:400;
	color:rgba(153,153,153,1);
	line-height:18px;
	margin: 6px 0 0 135px;
}
.xf11l>span{
	position: relative;
	display: inline-block;
	vertical-align: middle;
	margin-left: 9px;
}
.xf11l>span:hover{
	cursor: pointer;
}
.xf11l>span:hover>.txtipgr{
	display: block;
}
.txtipgr{
	display: none;
	position: absolute;
	top: 30px;
	left: -500px;
	z-index: 9;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;
	padding: 30px;
}
.txtipgr:after{
    content: "";
    position: absolute;
	top: -8px;
    left: 52%;
    width: 10px;
    height: 10px;
    border-left: 1px solid rgba(0, 0, 0, 0.08);
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    z-index: 9;
    background: #fff;
}
.txtipgr .titledsx{
	margin-bottom: 11px;
	text-align: center;
	font-size:14px;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.txtipgr .conddf{
	white-space: nowrap;
	border: 1px solid #979797;
	border-right: 0;
	border-bottom: 0;
}
.txtipgr .conddf>span{
	display: inline-block;
	width:150px;
	height:40px;
	border-right: 1px solid #979797;
	border-bottom: 1px solid #979797;
	
	line-height: 40px;
	text-align: center;
	font-size:12px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(102,102,102,1);

}
.conddf2{
	border-top: 0;
}
</style>
