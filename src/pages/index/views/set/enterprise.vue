<template>
	<div>
	
		<div class="setUserBox">
			<div class="setUserBoxs">
				<div class="setUserBoxs_nav">
					<div  v-for="(el,index) in navDta" :key="index" @click="setNavd(index)" :class="[index==navdOn?'action':'']">{{el}}</div>					
				</div>
				<div class="navDwzc">
					<div :class="['setUserBoxs_nav',topTyped?'fixdon':'']">
						<div  v-for="(el,index) in navDta" :key="index" @click="setNavd(index)" :class="[index==navdOn?'action':'']">{{el}}</div>
					</div>
				</div>				
				<div class="setUserBoxs_cent">
					<div class="scBox suc_1">
						<div class="suc_title">主体信息<div class="xhds"></div></div>
						<div class="suc_1_9">
							<span>企业/机构名称</span><el-input class="suc_1_9_1" v-model="postData.company_name" placeholder="企业/机构名称"></el-input>
						</div>
						<div class="suc_1_9">
							<span>统一社会信用代码</span><el-input class="suc_1_9_1" v-model="postData.code" placeholder="请输入统一社会信用代码"></el-input>
						</div>
						<div class="suc_1_9">
							<span>营业执照</span>
							<div class="suc_1_9_2">
								<span class="suc_1_9_3" @click="scsk('营业执照')">
									上传照片
									<uploadFile :setJdt="setJdt1" :sussFn="uploadSC1" :cg="fileConfig"></uploadFile>
								</span>
								<div class="suc_1_9_4 iconfont" @click="scsk('营业执照？')">&#xe65c;
									<div class="suc_1_9_5">
										<div class="suc_1_9_6">
											<div class="suc_1_9_9">证件上传示例</div>
											<div class="suc_1_9_8"><span></span>四角完整</div>
											<div class="suc_1_9_8"><span></span>亮度均匀</div>
											<div class="suc_1_9_8"><span></span>照片清晰</div>
										</div>
										<img class="suc_1_9_7" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/ggrrzsl_yyzz.svg" alt="">
									</div>
								</div>
							</div>
						</div>
						<div class="suc_1_10">
							<div class="suc_1_10_1">格式jpg，jpeg，png，大小不超过20M</div>
							<div class="suc_1_10_2">
								上传营业执照照片
								<img v-if="postData.business_license" class="suc_1_10_3" :src="postData.business_license" alt="">
								<jdt v-if="isJdt1" ref="jdt1"></jdt>
							</div>
						</div>
						<div class="suc_1_9">
							<span>开户许可证</span>
							<div class="suc_1_9_2">
								<span class="suc_1_9_3"  @click="scsk('开户许可证')">上传照片<uploadFile :setJdt="setJdt2" :sussFn="uploadSC2" :cg="fileConfig"></uploadFile></span>
								<div class="suc_1_9_4 iconfont"  @click="scsk('开户许可证？')">&#xe65c;
									<div class="suc_1_9_5">
										<div class="suc_1_9_6">
											<div class="suc_1_9_9">证件上传示例</div>
											<div class="suc_1_9_8"><span></span>四角完整</div>
											<div class="suc_1_9_8"><span></span>亮度均匀</div>
											<div class="suc_1_9_8"><span></span>照片清晰</div>
										</div>
										<img class="suc_1_9_7" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/ggrrzsl_khykz.svg" alt="">
									</div>
								</div>
							</div>
						</div>
						<div class="suc_1_10">
							<div class="suc_1_10_1">格式jpg，jpeg，png，大小不超过20M</div>
							<div class="suc_1_10_2">
								上传开户许可证照片
								<img v-if="postData.opening_permit" class="suc_1_10_3" :src="postData.opening_permit" alt="">
								<jdt v-if="isJdt2" ref="jdt2"></jdt>
							</div>
						</div>
						
						<div class="suc_1_9 ridieodf ridieodf2">
							<span>提供发票税率</span><el-radio v-model="postData.tax_rate_type" value="1" label="1">增值税专用发票，税率6%或17%</el-radio>
						</div>	
						<div class="suc_1_11 ridieodf">
							
							<el-radio v-model="postData.tax_rate_type" value="2" label="2">增值税专用发票，税率3%</el-radio>
						</div>
						
					</div>
					<div class="scBox suc_1 suc_2">
						<div class="suc_title">银行卡信息<div class="xhds"></div></div>
						<div class="suc_1_9">
							<span>企业银行账户</span><el-input @blur="getBINKname" class="suc_1_9_1" v-model="postData.bank_card_no" placeholder="请输入企业银行账户"></el-input>
						</div>
						<div class="suc_1_9">
							<span>所属开户银行</span><el-input class="suc_1_9_1" v-model="postData.bank_name" placeholder="无法识别时请手动输入"></el-input>
						</div>
						<div class="suc_1_9">
							<span>所属开户支行</span>
							<el-input class="suc_1_9_1" v-model="postData.branch_bank" placeholder="请输入所属开户支行"></el-input>
						</div>
					</div>
					<div class="scBox suc_1 suc_3">
						<div class="suc_title">身份验证<div class="xhds"></div></div>
						<div class="suc_1_9">
							<span>联系人姓名</span>
							<el-input class="suc_1_9_1" v-model="postData.contact" placeholder="请输入联系人姓名"></el-input>
						</div>
						<div class="newSC">
							<span>手机号</span>
							<div class="newSC_2">{{mJs.phone_encryption(form.mobile)}}</div>
							<span @click="openTc1(2)" class="btns pend newSC_2_1">更换号码</span>
						</div>
	
						<div class="newSC">
							<span>验证码</span>
							<Input class="suc_1_9yzm" v-model="postData.verify_code"  @ajaxYzm="ajaxYzmZd" :type="'text'" :oType="'yzm'" :chekFn="chekverify" :placeholder="'输入 6 位手机短信验证码'"  ref="verify"></Input>
						</div>
						
						<div class="newSC">
							<span>邮箱</span>
							<div class="newSC_2">{{emailD?mJs.email_encryption(emailD):'你还未认证邮箱'}}</div>
							<div @click="openTc1(3)" :class="['btns pend',emailD?'':'btns_js']">{{emailD?'修改邮箱':'立即认证'}}</div>
							<div v-if="nogxzl" @click="gxZl" class="btns pend">已认证更新资料</div>
						</div>

					</div>
					<p class="rz_qr">
						<label :class="['rz_chk pend',ischecked==true?'rz_chk_check':'']">
							<span class="rz_chk_1">
								<input class="rz_chk_1_1" v-model="ischecked" type="checkbox"/>
							</span>
							<span class="rz_chk_2">我已阅读并同意</span>
						</label>
						<span @click="goPU('#/authorization')" class="pend">《狮圈儿供稿人协议》</span>
					</p>
					<div :class="['suc_btndf2',isPostky?'ispos':'']" @click="Userupdate">申请认证平台供稿人</div>
				</div>
			</div>			
		</div>
		<TcBox :config="outc" ref="tcBox">
			<template v-slot:todo="{ todo }">				
				<div v-if="tAncType==2" class="tc_sucd_1">
					<img class="tc_sucd_1X" @click="closeTc1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/cj_00.png"/>
					<Input class="tc_sucd_2_1" v-model="tancData.oldMoble" @setYzm="setYzmOld" :type="'text'" :oType="'phone'" :chekFn="chekPhpne" :placeholder="'请输入旧的手机号码'"  ></Input>
					<Input class="tc_sucd_2_1" v-model="tancData.newMoble" @setYzm="setYzm" :type="'text'" :oType="'phone'" :chekFn="chekPhpne2" :placeholder="'请输入新的手机号码'"  ></Input>
					<Input v-model="tancData.verify_code"  @ajaxYzm="ajaxYzm" :type="'text'" :oType="'yzm'" :chekFn="chekverify" :placeholder="'输入 6 位短信验证码'"  ref="verify"></Input>
				</div>
				
				<div v-if="tAncType==3" class="tc_sucd_1">
					<img class="tc_sucd_1X" @click="closeTc1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/cj_00.png"/>
					<el-input class="elmentIputNoborder" v-model="tancData.email" placeholder="请输入邮箱"></el-input>
					<div class="emailyzm">
						<el-input v-model="tancData.pic_verify" placeholder="请输入验证码"></el-input>
						<div class="emailyzm2"><img @click="Verifycodeget" :src="tancData.pic_verifyimg" alt=""></div>
					</div>
				</div>
				<div class="qxBm_btns">
					<div @click="closeTc1" class="btns pend">取消</div>
					<div @click="qrFn()" class="btns btns_js pend">确定</div>				
				</div>
			</template>			
		</TcBox>
	</div>
</template>

<script>

import {Message} from 'element-ui'
import Input from '../../components/input'
import Citys from '../../components/citys'
import uploadFile from '../../components/uploadFile'
import jdt from '../../components/jdt'
import TcBox from '../../components/TcBox';
export default {
	name: 'works',
	components:{Input,Citys,uploadFile,jdt,TcBox},
	data(){
		return {
			outc:{
				title:'',
				scroll:1,
			},
			nogxzl:'',
			qrFnName:'',
			isJdt1:'',
			isJdt2:'',
			fileConfig:{
				type:['image/jpeg','image/png'],
				max:20*1024*1024,
				userType:'user_info',
			},
			
			
			check_type:1,
			postData:{tax_rate_type:"1"},
			zhData:[],
		
			isPostky:false,
			ischecked:false,
			navDta:[
				'主体信息',
				'银行卡信息',
				'身份验证',			
			],	
			emailD:'',
			form:{mobile_zone:'86'},
			navdOn:0,
			topTyped:false,
			tAncType:0,
			options:[],
			props: {
				value: 'label',
				children: 'cities'
			},
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
			chekPhpne2:function(val){
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
			tancData:{mobile_zone:'86',old_mobile_zone:'86'}
		}
	},
	watch: {
		'postData.company_name'() {
			this.checkPost();
		},
		'postData.code'() {
			this.checkPost();
		},
		'postData.business_license'() {
			this.checkPost();
		},
		'postData.opening_permit'() {
			this.checkPost();
		},
		'postData.tax_rate_type'() {
			this.checkPost();
		},
		'postData.bank_card_no'() {
			this.checkPost();
		},
		'postData.branch_bank'() {
			this.checkPost();
		},
		'postData.verify_code'() {
			this.checkPost();
		},		
		'postData.bank_name'() {
	
			this.checkPost();
		},	
		
		'ischecked'(){
			this.checkPost();
		}
	},
	mounted: function () {			
		this.init();
	}, 
	methods: {
		gxZl(){
			this.api.getSelfInfo({}).then((da)=>{
				if(da=='error'){return}
				da.access_token = window.userInfo.access_token;
				window.userInfo = da;
				localStorage.setItem('userT',JSON.stringify(da));
				this.form.mobile = window.userInfo.mobile;
				this.form.mobile_zone = window.userInfo.mobile_zone;
				this.emailD = window.userInfo.email;
				this.$message({message:'更新完成'})
			})
		},
		show(){
			this.$refs.tcBox.show();
		},
		close2(){
			this.$refs.tcBox.close();
		},
		scsk(a){
			this.bdtj('企业认证页面',a,'--');
		},
		uploadSC1(da){
			this.isJdt1='';
			this.postData.business_license = da.url;
			this.checkPost();
		},
		uploadSC2(da){
			this.isJdt2='';
			this.postData.opening_permit = da.url;
			this.checkPost();
		},
		setJdt1(on){
			this.isJdt1=1;
			this.$refs.jdt1.bfb = on;
		},
		setJdt2(on){
			this.isJdt2=1;
			if(this.$refs.jdt2){
				this.$refs.jdt2.bfb = on;
			}		
		},
		goPu(ud){
			this.bdtj('企业认证页面','供稿人协议','--');
			if(!ud){return}
			window.open(ud);
		},
		checkPost(){
			
			this.isPostky = false;
			if(!this.ischecked){
				return
			}
			if(!this.postData.company_name){
				return
			}
			if(!this.postData.code){
				return
			}
			if(this.postData.code.length!=18){
				Message({message: '统一社会信用代码格式不正确'});
				return
			}
			if(!this.postData.business_license){
				return
			}
			if(!this.postData.opening_permit){
				return
			}
			if(!this.postData.tax_rate_type){
				return
			}
			if(!this.postData.bank_card_no){
				return
			}
			if(!this.postData.branch_bank){
				return
			}
			if(!this.postData.bank_name){
				return
			}
			if(!this.postData.contact){
				return
			}
			if(!this.postData.verify_code){
				return
			}			
			this.isPostky = true;
		},
		getBINKname(){
			if(!this.postData.bank_card_no){
				return
			}
			this.$ajax.get('https://ccdcapi.alipay.com/validateAndCacheCardInfo.json', {
				params: {
				  _input_charset: 'utf-8',
				  cardNo:this.postData.bank_card_no,
				  cardBinCheck:true
				}
			}).then((response)=>{				
				if(!response.data.bank){
					return
				}
				let conf = {
					"PSBC":'中国邮政储蓄银行',
					"ICBC":'工商银行',
					"ABC":'农业银行',
					"BOC":'中国银行',
					"CCB":'建设银行',
					"COMM":'交通银行',
					"CITIC":'中信银行',
					"CEB":'光大银行',
					"HXBANK":'华夏银行',
					"CMBC":'民生银行',
					"GDB":'广发银行',
					"SPDB":"浦东发展银行",
					"CMB":'招商银行',
					"CIB":'兴业银行',
					"EGBANK":'恒丰银行',
					"CZBANK":'浙商银行',
				}  
				this.$set(this.postData,'bank_name',conf[response.data.bank ]);
			}).catch(()=>{
				
			});
		},
		Verifycodeget(){
			this.$set(this.tancData,'pic_verifyimg',window.basrul+'/Passport/Verifycode/get?client_id='+window.userInfo.open_id+'&t='+(new Date()).valueOf())
		},
		setYzm(val){
			this.tancData.mobile_zone = val;
		},
		setYzmOld(val){
			this.tancData.old_mobile_zone = val;
		},
		ajaxYzmZd(){
			this.bdtj('企业认证页面','获取验证码','--');
			let pd = this.form.mobile;
			if(this.form.mobile_zone!='86'){
				if(!(typeof pd === 'number' && pd%1 === 0)){
					Message({message: '请输入正确的手机号码'});
					return 					
				}			
			}else{
				
				if(!(/^1[345789]\d{9}$/.test(pd))){ 
					Message({message: '请输入正确的手机号码'});
					return
				} 
				
			}		
			let params = {
				mobile:this.form.mobile,
				mobile_zone:this.form.mobile_zone,
				type:'login',
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
		ajaxYzm(){
			let pd = this.tancData.newMoble;
			if(this.tancData.mobile_zone!='86'){
				if(!(typeof pd === 'number' && pd%1 === 0)){
					Message({message: '请输入正确的手机号码'});
					return 					
				}			
			}else{
				if(!(/^1[345789]\d{9}$/.test(pd))){ 
					Message({message: '请输入正确的手机号码'});
					return
				} 
				
			}		
			let params = {
				mobile:this.tancData.newMoble,
				mobile_zone:this.tancData.mobile_zone,
				type:'login',
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
		qdTc3(){
			let pr = {
				access_token:window.userInfo.access_token,
				third_part:'email',
				type:'add',
				email:this.tancData.email,
				pic_verify:this.tancData.pic_verify,
				
			};
			this.api.Bindbind(pr).then((da)=>{
				if(da=='error'){
					return
				}
				this.nogxzl = 1;
				Message({message: '已发送认证邮件请注意查收'});
				this.tancData.email = '';	
				this.tancData.pic_verify = '';
				this.tAncType=0;
				this.closeTc1();

				
			});
		},
		qdTc2(){
			let pr = {
				access_token:window.userInfo.access_token,
				third_part:'mobile',
				type:'update',
				old_mobile_zone:this.tancData.old_mobile_zone,
				old_mobile:this.tancData.oldMoble,
				mobile_zone:this.tancData.mobile_zone,
				mobile:this.tancData.newMoble,
				verify_code:this.tancData.verify_code,
				
			};
			this.api.Bindbind(pr).then((da)=>{
				if(da=='error'){
					return
				}
				this.form.mobile = this.tancData.newMoble;
				this.tancData.mobile_zone = '86';
				this.tancData.newMoble = '';
				this.tancData.oldMoble = '';
				this.tancData.old_mobile_zone = '86';
				this.tancData.verify_code = '';			
				this.tAncType=0;
				this.closeTc1();
				Message({message: '修改成功'});
				
				
			});
		},
		qrFn(){
			if(this.tAncType==3){
				this.qdTc3();
			}	
			if(this.tAncType==2){
				this.qdTc2();
			}
			
		},
		closeTc1(){		
			if(this.tAncType==1){			
				this.tancData.userName = '';				
			}	
			this.close2();
			this.tAncType=0;
		},
		openTc1(on){
			if(on==3){
				this.outc.title='邮箱认证';
				this.qrFnName = 'qdTc2';
				this.Verifycodeget();
			}
			if(on==2){
				this.outc.title='更换手机号';
				this.qrFnName = 'qdTc3';
				this.bdtj('企业认证页面','更换手机号','--');
			}			
			this.show();
			this.tAncType=on;
		},
		
		init(){
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
			if(this.$route.query.on){
				this.setNavd(this.$route.query.on);
			}
			this.form.mobile = window.userInfo.mobile;
			this.form.mobile_zone = window.userInfo.mobile_zone;
			this.emailD = window.userInfo.email;
			this.getUserDetail();
			window.onscroll = ()=>{
				let t = document.documentElement.scrollTop||document.body.scrollTop;
				if(t==0){
					document.documentElement.scrollTop =1;
					document.body.scrollTop =1;
				}
				if(this.topTyped==false){
					if(t>188){
						this.topTyped=true;
					}
					
				}
	
				if(t<=188){
					this.topTyped=false;
				}
				

				if(t>=1240){
					this.navdOn =2;
					return
				}
				if(t>=900){
					this.navdOn =1;
					return
				}
				
				this.navdOn =0;
				

;			}
		},
		setNavd(on){
			this.navdOn = on;
			this.setScll(1040*on)
			
		},
		Userupdate(){
			this.bdtj('企业认证页面','申请成为供稿人','--');
			if(!this.isPostky){
				this.bdtj('企业认证页面','申请成为供稿人失败','--');
				return
			}
			let pr = {
				access_token:window.userInfo.access_token,
				type:2,
				company_name:this.postData.company_name,
				code:this.postData.code,
				business_license:this.postData.business_license,
				opening_permit:this.postData.opening_permit,
				tax_rate_type:this.postData.tax_rate_type,
				bank_card_no:this.postData.bank_card_no,
				branch_bank:this.postData.branch_bank,				
				verify_code:this.postData.verify_code,
				bank_name:this.postData.bank_name,
				mobile_zone:window.userInfo.mobile_zone,
				mobile:window.userInfo.mobile,
				check_type:this.check_type,
				email:this.emailD
			};
			this.api.identifyAuth(pr).then((da)=>{
				if(da=='error'){
					this.bdtj('企业认证页面','申请成为供稿人失败','--');
					return
				}
				this.bdtj('企业认证页面','申请成为供稿人成功','--');
				Message({message: '申请已提交审核'});
				window.userInfo.contributor_format_status = 1;
				window.userInfo.contributor_type = 2;
				localStorage.setItem('userT',JSON.stringify(window.userInfo));
				setTimeout(()=>{
					this.$router.push({path:'/profit'})
				},2000);
			});
			
		},
		setScll(top){
			
			if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
			
                document.documentElement.scrollTop = Number(top);
            }
            if (document.body) {// all other Explorers
			
                document.body.scrollTop = Number(top);
				
			}	
			
		
		},
		getUserDetail(){
			if(!window.userInfo){
				this.$router.push({path:'/login'})
				return
			}
			if(window.userInfo.contributor_type==1){
				this.$router.push({path:'/setPersonal'})
				return
			}
			let pr = {
				access_token:window.userInfo.access_token,
				contribute_type:2
			};
			
			this.api.contributorInfo(pr).then((da)=>{
				if(da=='error'){
					return
				}
				let navd = 0;
				if(da.check_status==0){
					this.check_type = 1;
					da.tax_rate_type = "1";
				}
				if(da.check_status==1){
					this.$router.push({path: '/index'})			
				}
				if(da.check_status==-1){
					this.check_type = 2;
					navd = 2;
				}
				if(da.check_status==2){
					this.check_type = 3;
					navd = 2;
				}
				da.tax_rate_type+='';
				this.$parent.setNav(navd);
				this.postData = da; 
			
	
			})
		},

	}
}
</script>

<style>
.jdtboxd{
	position: absolute;
	top: 50%;
	left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
.suc_1>.newSC>span{
	vertical-align: top;
}
.suc_1>.suc_1_9>span.suc_1_9_c1n{
	color: #666;
	cursor: pointer;
	margin-left: 33px;
}
.suc_1>.suc_1_9>span.suc_1_9_c1n:hover{
	color: #33B3FF;
	
}



</style>
