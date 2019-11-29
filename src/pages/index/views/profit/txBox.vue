<template>
	<div class="newTanc">
		<div class="newTanc_1">	

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
					<span>{{user.type==1?'收款账户名':'企业/机构名称'}}</span><span>{{backname(form.account_name)}}</span>
				</div>
				<div class="pr_xx_1_c">
					<span>{{user.type==1?'银行卡号':'企业银行账号'}}</span><span>{{backBan(form.bank_card_id)}}</span>
				</div>
				<div class="pr_xx_1_c">
					<span>开户银行</span><span>{{form.bank_name}}</span>
				</div>
				<div class="pr_xx_1_c">
					<span>开户支行</span><span>{{form.bank_subbranch}}</span>
				</div>
			</div>
				
			<div v-if="typedon==1 && user.type==1" class="pr_xx_1">
				<div class="pr_xx_1_c">
					<span>账户余额</span><span>{{meny}}</span>
				</div>
				<div class="pr_xx_1_c">
					<span>提现金额</span><span><input @input="oninput" class="txje" placeholder="请输入金额，最少不小于300元" v-model="form.cash_money" type="text">元</span>
				</div>
			</div>
				
			<div v-if="typedon==1 && user.type==2" class="pr_xx_1">
				<div class="pr_xx_1_c">
					<span>账户余额</span><span>{{meny}}</span>
				</div>
				<div class="pr_xx_1_c">
					<span>提现金额</span><span><input @input="oninput" class="txje" placeholder="请输入金额，最少不小于300元" v-model="form.cash_money" type="text">元</span>
					<div class="xf11l">
						当月到账金额=当月提现总额-税费
						<span class="iconfont">
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
						</span>
					</div>
				</div>
			</div>
				
			
			
			<div v-if="typedon==2 && user.type==1" class="pr_xx_1">
				<div class="phodegg">
					<div class="hm_n1">
						<span class="hm_n1_1">手机 +86</span>
						<span class="hm_n1_2"></span>
						<span class="hm_n1_3">{{backPhone2()}}</span>
						<span class="uphodefbt pend" @click="editPhone()">修改手机号</span>
					</div>
					<Input v-model="form.verify_code"  @ajaxYzm="ajaxYzm" :type="'text'" :oType="'yzm'" :chekFn="chekverify" :placeholder="'输入 6 位短信验证码'"  ref="verify"></Input>
					
				</div>
			</div>
				
			<div v-if="typedon==2 && user.type==2" class="txTbox">
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
						<div><span>联系地址</span><span>广东省深圳市南山区高新南区科苑南路3176号彩讯科创中心9楼</span></div>
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
						<div class="hm_n1">
							<span class="hm_n1_1">手机 +86</span>
							<span class="hm_n1_2"></span>
							<span class="hm_n1_3">{{backPhone2()}}</span>
							<span class="uphodefbt pend" @click="editPhone()">修改手机号</span>
						</div>
						<Input v-model="form.verify_code"  @ajaxYzm="ajaxYzm" :type="'text'" :oType="'yzm'" :chekFn="chekverify" :placeholder="'输入 6 位短信验证码'"  ref="verify"></Input>
						
					</div>
				</div>
				
				
				<div class="pr_xx_btns botnbox">
					<span v-if="typedon>0" @click="next_x(-1)">上一步</span>
					<span v-if="typedon==0" @click="goUpsuer()">修改银行信息</span>
					<span v-if="backisnext()" @click="next_x(1)" class="btn_n3">下一步</span>
					<span v-if="backPusbtn()" @click="pushData" class="btn_n3">完成</span>
				</div>
			</div>
	
					
				<img @click="close" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/imge/project/cj_00.svg" class="newTanc_2">
			</div>		
		</div>

</template>
<script>
import {Message} from 'element-ui'
import Input from '../../components/input'
export default {
	components:{Input},
	props:{
		user:{
			type:Object,
			default:{type:1},
		},	
	},
	data(){
		return{
			form:{},
			upfjData:{},
			typedon:0,
			ldList:['信息确认','提现金额','发票寄送','身份验证'],
			ldList2:['信息确认','提现金额','身份验证'],
			chekPhpne:function(val){
				if(this.form.mobile_zone!='86'){
					if(!(typeof val === 'number' && val%1 === 0)){
						return {type:false,text:'请输入正确的手机号码',cls:'errd5'}; 					
					}			
					return true; 
				}	
				if(!(/^1[345789]\d{9}$/.test(val))){ 
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
			meny:0,
		}
	},
	mounted: function () {			
		this.init();		
	},

	methods: {
		oninput(e){
			if(e.target.value>+this.meny){
				this.form.cash_money = this.meny;
				return
			}
			let onm = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null			
			this.form.cash_money = onm;
			
		},
		backisnext(){
			if(this.user.type==1 && this.typedon<2){
				return 1;
				
			}
			if(this.user.type==2 && this.typedon<3){
				return 1;
			}
			return '';
		},
		backPusbtn(){
			if(this.user.type==1 && this.typedon==2){
				return 1;
				
			}
			if(this.user.type==2 && this.typedon==3){
				return 1;
			}
			return '';
		},
		init(){	
			this.$set(this.form,'account_name',this.user.account_name?this.user.account_name:this.user.company_name);
			// this.form.account_name = ;
			this.form.bank_card_id = this.user.bank_card_id;
			this.form.bank_name = this.user.bank_name;				
			this.form.bank_subbranch = this.user.bank_subbranch;
			this.meny = this.user.meny;
			if(this.user.code){
				this.form.code = this.user.code;
				return
			}
			this.form.id_card = this.user.id_card;
			this.form.reserve_phone = this.user.reserve_phone;
			
			
		},
		close(){
			this.$parent.close();
		},
		next_x(o){
			if(o==1){
				this.bdtj('我的收益','下一步','--');
			}
			let  p = this.typedon+o;
			if(p==2 && (parseFloat(this.form.cash_money).toString() == "NaN" || this.form.cash_money<300) ){
				Message({message: '请输入正确金额,提现金额不得小于300'});
				return;
			}
			if(p==2 && this.form.cash_money>+this.meny){
				Message({message: '余额不足'});
				return;
			}
			
			if(this.user.type==2 && p==3){
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
			qxclosd(obj){
			if(obj){
				obj.abort();			
				return
			}
			
			this.form.invoice = '';
			this.form.attachment_id='';
			this.upfjData = {};
		},
		goUpsuer(){
			this.bdtj('我的收益','修改账户信息','--');
			if(!window.userInfo){
				this.$router.push({path:'/login'})
				return
			}	
			if(window.userInfo.contributor_type==2){
				this.$router.push({path: '/setEnterprise?on=1'})
				return
			}
			this.$router.push({path: '/setPersonal?on=1'});
		},
		gosetPersonal(){
			this.$router.push({path:'/setPersonal'})			
		},
		setJdt2(){
			return 'transform: translateX('+(this.typedon*33.33-100)+'%);';
		},
		setJdt(){		
			return 'transform: translateX('+(this.typedon*33.33-100)+'%);';
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
					let pn = Math.floor(percent);
					if(pn==100){
						return
					}
					this.upfjData.bf  = pn; 
				}
			};
			let uploadComplete = (data)=>{
				this.upfjData.bf  = 100; 
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
		pushData(){
			this.bdtj('我的收益','完成提现提交','--');
			if(this.chekverify(this.form.verify_code)!=true){
				Message({message: '请填写正确的验证码'});
				return
			}
			let pr = this.form;
			this.api.Income_applyCash(pr).then((da)=>{
				if(da=='error'){return}
				Message({message: '申请成功请耐心等待审核'});
				this.$parent.txcg(pr.cash_money);			
			});	
		},
		editPhone(){
			this.bdtj('我的收益','更换手机号','--');
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
		backPhone2(){
			return window.userInfo.mobile.substring(0,3)+'*******'+window.userInfo.mobile.substring(7);
		},
		backPhone(){
			return window.userInfo.mobile_zone+'+'+window.userInfo.mobile.substring(0,3)+'*******'+window.userInfo.mobile.substring(7);
		
		},
		backBan(da){
			if(!da){return}
			return da.substring(0,4)+'*******'+da.substring(da.length-4);
		},
		backname(da){
			if(!da){return}
			let len = da.length,
			str = da.substring(0,1);
		
			for(let i=0;i<len-1;i++){
				str+='*';
			}
			return str;
		},
	}
}	
	
	
	
</script>

<style>
.newTanc{
	position: fixed;
	top:0;
	left: 0;
	background: rgba(0,0,0,.3);
	width: 100%;
	height: 100%;
	z-index:9999;
	
}	
.newTanc_1{
	position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: white;
    -webkit-box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
	overflow: hidden;
}

.newTanc_2{
    position: absolute;
    right: 24px;
    top: 29.5px;
    cursor: pointer;
    width: 16px;
    height: 16px;
}
.newTanc_2:hover{
	opacity: .7;
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
	width: 345px;
	
}
.pr_xx_1>div.pr_xx_1_c{
	margin-bottom: 13px;
}
.pr_xx_1>div.pr_xx_1_c>span{
	display: inline-block;
	vertical-align: top;
}
.pr_xx_1>div.pr_xx_1_c>span:nth-child(1){
	width:100px;
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
    background: #33B3FF;
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
    color: #33B3FF;
    font-size: 14px;
}
.hm{
	position: relative;
    height: 40px;
    border-bottom: 1px solid #ddd;
    line-height: 40px;
    margin-bottom: 20px;
	background: #ddd;
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
.hm_n1{
	border-bottom: 1px solid #ddd;
	height: 39px;
	line-height: 39px;
	margin-bottom: 20px;
}
.hm_n1_1{
	position: relative;
	display: inline-block;
	vertical-align: top;
	
}
.hm_n1_1:after{
	    content: "";
	    display: inline-block;
	    width: 5px;
	    height: 5px;
	    border: 1px solid #666;
	    border-bottom: 0;
	    border-right: 0;
	    margin-left: 8px;
	    -webkit-transform: rotate(-135deg);
	    transform: rotate(-135deg);
	    -webkit-transform-origin: 20% 20%;
	    transform-origin: 20% 20%;
}
.hm_n1_2{
	vertical-align: top;
	display: inline-block;
	background: #EEEEEE;
	width:1px;
	height:19px;
	margin: 10px 19px;
}
.hm_n1_3{
	font-size: 14px;
	color: #999;
}
.botnbox>span.btn_n3{
	border-color: #33B3FF;
}
</style>
