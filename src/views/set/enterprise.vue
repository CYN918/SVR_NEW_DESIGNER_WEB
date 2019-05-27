<template>
	<div>
		<tophead :navData="navDatad"></tophead>
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
					<div class="suc_1">
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
								<span class="suc_1_9_3">上传照片<input @change="fileUp" ref="upnfile"  type="file"></span>
								<div class="suc_1_9_4 iconfont">&#xe65c;
									<div class="suc_1_9_5">
										<div class="suc_1_9_6">
											<div class="suc_1_9_9">证件上传示例</div>
											<div class="suc_1_9_8"><span></span>四角完整</div>
											<div class="suc_1_9_8"><span></span>亮度均匀</div>
											<div class="suc_1_9_8"><span></span>照片清晰</div>
										</div>
										<img class="suc_1_9_7" src="/imge/sfz_zm.png" alt="">
									</div>
								</div>
							</div>
						</div>
						<div class="suc_1_10">
							<div class="suc_1_10_1">格式jpg，jpeg，png，大小不超过20M</div>
							<div class="suc_1_10_2">上传营业执照照片<img v-if="postData.business_license" class="suc_1_10_3" :src="postData.business_license" alt=""></div>
						</div>
						<div class="suc_1_9">
							<span>开户许可证</span>
							<div class="suc_1_9_2">
								<span class="suc_1_9_3">上传照片<input @change="fileUp2" ref="upnfile"  type="file"></span>
								<div class="suc_1_9_4 iconfont">&#xe65c;
									<div class="suc_1_9_5">
										<div class="suc_1_9_6">
											<div class="suc_1_9_9">证件上传示例</div>
											<div class="suc_1_9_8"><span></span>四角完整</div>
											<div class="suc_1_9_8"><span></span>亮度均匀</div>
											<div class="suc_1_9_8"><span></span>照片清晰</div>
										</div>
										<img class="suc_1_9_7" src="/imge/sfz_bm.png" alt="">
									</div>
								</div>
							</div>
						</div>
						<div class="suc_1_10">
							<div class="suc_1_10_1">格式jpg，jpeg，png，大小不超过20M</div>
							<div class="suc_1_10_2">上传开户许可证照片<img v-if="postData.opening_permit" class="suc_1_10_3" :src="postData.opening_permit" alt=""></div>
						</div>
						
						<div class="suc_1_9 ridieodf ridieodf2">
							<span>提供发票税率</span><el-radio v-model="postData.tax_rate_type" value="1" label="1">增值税专用发票，税率6%或17%</el-radio>
						</div>	
						<div class="suc_1_11 ridieodf">
							
							<el-radio v-model="postData.tax_rate_type" value="2" label="2">增值税专用发票，税率3%</el-radio>
						</div>
						
					</div>
					<div class="suc_1 suc_2">
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
					<div class="suc_1 suc_3">
						<div class="suc_title">身份验证<div class="xhds"></div></div>
						<div class="suc_1_9">
							<span>手机号</span><div class="suc_1_9_c">{{form.mobile}}</div><span @click="openTc1(2)" class="suc_1_9_c1">更换号码</span>
			
							
						</div>
						<div class="suc_1_9">
							<span>验证码</span>
							<Input class="suc_1_9yzm" v-model="postData.verify_code"  @ajaxYzm="ajaxYzmZd" :type="'text'" :oType="'yzm'" :chekFn="chekverify" :placeholder="'输入 6 位短信验证码'"  ref="verify"></Input>
						</div>
						
						
					</div>
					<p class="rz_qr">
						<el-checkbox v-model="ischecked">我已阅读并同意</el-checkbox><span @click="goPU('#/text/authorization')" class="pend">《狮圈儿供稿人协议》</span>
					</p>
					<div :class="['suc_btndf2',isPostky?'ispos':'']" @click="Userupdate">申请认证平台供稿人</div>
				</div>
			</div>
			
		</div>
		
		
		<div v-if="tAncType>0" class="tc_sucd">
			<div v-if="tAncType==1" class="tc_sucd_1">
				<img class="tc_sucd_1X" @click="closeTc1" src="/imge/cj_00.png"/>
				<Input class="tc_sucd_1_1" v-model="tancData.userName"  :oType="'max'" :max="15"  :chekFn="chekusername" :type="'text'" :placeholder="'请输入新的用户名'"></Input>		
				<div class="tc_sucd_1_2">
					<span @click="closeTc1">取消</span>
					<span @click="qdTc1">确定</span>
				</div>
			</div>
			
			<div v-if="tAncType==2" class="tc_sucd_1">
				<img class="tc_sucd_1X" @click="closeTc1" src="/imge/cj_00.png"/>
				<Input class="tc_sucd_2_1" v-model="tancData.oldMoble" @setYzm="setYzmOld" :type="'text'" :oType="'phone'" :chekFn="chekPhpne" :placeholder="'请输入旧的手机号码'"  ></Input>
				<Input class="tc_sucd_2_1" v-model="tancData.newMoble" @setYzm="setYzm" :type="'text'" :oType="'phone'" :chekFn="chekPhpne2" :placeholder="'请输入新的手机号码'"  ></Input>
				<Input v-model="tancData.verify_code"  @ajaxYzm="ajaxYzm" :type="'text'" :oType="'yzm'" :chekFn="chekverify" :placeholder="'输入 6 位短信验证码'"  ref="verify"></Input>
				<div class="tc_sucd_1_2">
					<span @click="closeTc1">取消</span>
					<span @click="qdTc2">确定</span>
				</div>
			</div>
			
			<div v-if="tAncType==3" class="tc_sucd_1">
				<img class="tc_sucd_1X" @click="closeTc1" src="/imge/cj_00.png"/>
				<el-input class="elmentIputNoborder" v-model="tancData.email" placeholder="请输入email"></el-input>
				<div class="emailyzm">
					<el-input v-model="tancData.pic_verify" placeholder="请输入验证码"></el-input>
					<div class="emailyzm2"><img @click="Verifycodeget" :src="tancData.pic_verifyimg" alt=""></div>
				</div>
				<div class="tc_sucd_1_2">
					<span @click="closeTc1">取消</span>
					<span @click="qdTc3">确定</span>
				</div>
			</div>
			<div v-if="tAncType==4" class="tc_sucd_1">
				<img class="tc_sucd_1X" @click="closeTc1" src="/imge/cj_00.png"/>
				<img class="tAncType4_1" src="/imge/email01.png" alt="">
				<div class="tAncType4_2">
					激活邮件已发送到你的邮箱中，邮件有效期为24小时。<br/>
					请及时登录邮箱，点击邮件中的链接激活帐户。
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>

import {Message} from 'element-ui'
import tophead from './myHead2';
import upoloadcaver from './upoloadcaver';
import Input from '../../components/input'
import Citys from '../../components/citys'
import Select from '../../components/select'
import rideo from '../../components/rideo'
export default {
	name: 'works',
	components:{upoloadcaver,Input,Citys,Select,rideo,tophead},
	data(){
		return {
			check_type:1,
			postData:{tax_rate_type:"1"},
			zhData:[],
			navDatad:{},
			isPostky:false,
			ischecked:false,
			navDta:[
				'主体信息',
				'银行卡信息',
				'身份验证',			
			],			
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
				if(!(/^1[34578]\d{9}$/.test(val))){ 
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
		goPu(ud){
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
			
			if(!this.postData.verify_code){
				return
			}			
			this.isPostky = true;
		},

		getBINKname(){
			
			if(!this.form.bank_card_no){
				return
			}
			this.$ajax.get('https://ccdcapi.alipay.com/validateAndCacheCardInfo.json', {
				params: {
				  _input_charset: 'utf-8',
				  cardNo:this.form.bank_card_no,
				  cardBinCheck:true
				}
			  })
			  .then(function (response) {
				console.log(response);
			  })
			  .catch(function (error) {
				console.log(error);
			  });

			
			
			 
		},
		fileUp(flie){
			let fld = flie.target.files[0];
			if(['image/jpeg','image/png'].indexOf(fld.type)==-1){
				Message({message: '格式不正确'});
				return
			}
			if(fld.size>(20*1024*1024)){
				Message({message: '文件过大'});
				return
			}
	
			let app_secret = '6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY';
			let times = (Date.parse(new Date())/1000);
			let arr = [
				1001,
				app_secret,
				window.userInfo.open_id,
				times
			];
		
			let formData = new FormData();
			formData.append('app_id',1001);
			formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
			formData.append('user',window.userInfo.open_id)
			formData.append('file',fld)
			formData.append('relation_type','work')
			formData.append('timestamp',times)
			let xhr = new XMLHttpRequest();
			
			
			let uploadProgress = (evt)=>{		
				if(evt.lengthComputable) {
					let percent = Math.round(evt.loaded * 100 / evt.total);
					percent = percent>98?98:percent;
					percent  = Math.floor(percent);
				}
			};
			let uploadComplete = (data)=>{
				if(data.currentTarget.response){
					let da = JSON.parse(data.currentTarget.response).data;					
					this.$set(this.postData,'business_license',da.url)
					console.log(da);
					Message({message: '文件上传成功'});
				}
				
			};
			let uploadFailed = ()=>{
				// delete p;
				// p.type="none";
				this.$refs.upnfile.value ='';
				Message({message: '文件上传失败请稍后重试'});
				
			};
			let uploadCanceled = ()=>{
				// p.type="none";
				this.$refs.upnfile.value ='';
				Message({message: '取消成功'});
				
			};
			xhr.upload.addEventListener("progress",uploadProgress, false);
			xhr.addEventListener("load",uploadComplete, false);
			xhr.addEventListener("error",uploadFailed, false);
			xhr.addEventListener("abort",uploadCanceled, false);
			xhr.open("POST", "http://139.129.221.123/File/File/insert");
			xhr.send(formData);
			
		},
		fileUp2(flie){
			let fld = flie.target.files[0];
			if(['image/jpeg','image/png'].indexOf(fld.type)==-1){
				Message({message: '格式不正确'});
				return
			}
			if(fld.size>(20*1024*1024)){
				Message({message: '文件过大'});
				return
			}
			
			let app_secret = '6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY';
			let times = (Date.parse(new Date())/1000);
			let arr = [
				1001,
				app_secret,
				window.userInfo.open_id,
				times
			];
		
			let formData = new FormData();
			formData.append('app_id',1001);
			formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
			formData.append('user',window.userInfo.open_id)
			formData.append('file',fld)
			formData.append('relation_type','work')
			formData.append('timestamp',times)
			let xhr = new XMLHttpRequest();
			
			
			let uploadProgress = (evt)=>{		
				if(evt.lengthComputable) {
					let percent = Math.round(evt.loaded * 100 / evt.total);
					percent = percent>98?98:percent;
					percent  = Math.floor(percent);
				}
			};
			let uploadComplete = (data)=>{
				if(data.currentTarget.response){
					let da = JSON.parse(data.currentTarget.response).data;					
					this.$set(this.postData,'opening_permit',da.url)
					console.log(da);
					Message({message: '文件上传成功'});
				}
				
			};
			let uploadFailed = ()=>{
				// delete p;
				// p.type="none";
				this.$refs.upnfile.value ='';
				Message({message: '文件上传失败请稍后重试'});
				
			};
			let uploadCanceled = ()=>{
				// p.type="none";
				this.$refs.upnfile.value ='';
				Message({message: '取消成功'});
				
			};
			xhr.upload.addEventListener("progress",uploadProgress, false);
			xhr.addEventListener("load",uploadComplete, false);
			xhr.addEventListener("error",uploadFailed, false);
			xhr.addEventListener("abort",uploadCanceled, false);
			xhr.open("POST", "http://139.129.221.123/File/File/insert");
			xhr.send(formData);
			
		},
		
		identifyAuth1(){
			
		},
		Verifycodeget(){
			this.$set(this.tancData,'pic_verifyimg','http://139.129.221.123/Passport/Verifycode/get?client_id='+window.userInfo.open_id+'&t='+(new Date()).valueOf())
		},
		setYzm(val){
			this.tancData.mobile_zone = val;
		},
		setYzmOld(val){
			this.tancData.old_mobile_zone = val;
		},
		ajaxYzmZd(){
			let pd = this.form.mobile;
			if(this.form.mobile_zone!='86'){
				if(!(typeof pd === 'number' && pd%1 === 0)){
					Message({message: '请输入正确的手机号码'});
					return 					
				}			
			}else{
				console.log(22222);
				if(!(/^1[34578]\d{9}$/.test(pd))){ 
					Message({message: '请输入正确的手机号码'});
					return
				} 
				
			}		
			let params = {
				mobile:this.form.mobile,
				mobile_zone:this.form.mobile_zone
			};
			this.api.sendVerifyCode(params).then((da)=>{	
				if(!da){
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
				if(!(/^1[34578]\d{9}$/.test(pd))){ 
					Message({message: '请输入正确的手机号码'});
					return
				} 
				
			}		
			let params = {
				mobile:this.tancData.newMoble,
				mobile_zone:this.tancData.mobile_zone
			};
			this.api.sendVerifyCode(params).then((da)=>{	
				if(!da){
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
				if(!da){
					return
				}
				this.tancData.email = '';	
				this.tancData.pic_verify = '';
				this.tAncType=4;

				
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
				if(!da){
					return
				}
				this.form.mobile = this.tancData.newMoble;
				this.tancData.mobile_zone = '86';
				this.tancData.newMoble = '';
				this.tancData.oldMoble = '';
				this.tancData.old_mobile_zone = '86';
				this.tancData.verify_code = '';			
				this.tAncType=0;
				Message({message: '修改成功'});
				
				
			});
		},
		qdTc1(){
			
			let postData = {
				access_token:window.userInfo.access_token,
				username:this.tancData.userName,				
			};
			this.api.Userupdate(postData).then((da)=>{
				if(!da){
					return
				}
				this.form.username = this.tancData.userName;
				this.tancData.userName = '';
				this.tAncType=0;
				Message({message: '修改成功'});
			});
		},
		closeTc1(){		
			if(this.tAncType==1){			
				this.tancData.userName = '';				
			}	
			
			this.tAncType=0;
		},
		openTc1(on){
			if(on==3){
				this.Verifycodeget();
			}
			this.tAncType=on;
		},
		
		init(){
			this.form.mobile = window.userInfo.mobile;
			this.form.mobile_zone = window.userInfo.mobile_zone;
			this.navDatad = {
				title:'平台供稿人-认证申请',
				list:[
					{n:'个人',u:'/setPersonal'},
					{n:'企业',u:'/setEnterprise'},
				],
			};
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
				

				if(t>=690){
					this.navdOn =2;
					return
				}
				if(t>=490){
					this.navdOn =1;
					return
				}
				
				this.navdOn =0;
				

;			}
		},
		setNavd(on){
			this.navdOn = on;
			this.setScll(490*on)
			
		},
		Userupdate(){
			if(!this.isPostky){
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
			};
			this.api.identifyAuth(pr).then((da)=>{
				if(!da){
					return
				}
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
			
			let pr = {
				access_token:window.userInfo.access_token,
				contribute_type:1
			};
			this.api.contributorInfo(pr).then((da)=>{
				if(!da){
					return
				}
				if(da.check_status==0){
					this.check_type = 1;
					this.navDatad = {
						title:'平台供稿人-认证申请',
						list:[
							{n:'个人',u:'/setPersonal'},
							{n:'企业',u:'/setEnterprise'},
						],
					};
				}
				if(da.check_status==1){
					this.$router.push({path: '/index'})			
				}
				if(da.check_status==-1){
					this.check_type = 2;
					this.navDatad = {
						title:'平台供稿人-认证申请',
						list:[
							{n:'企业',u:'/setEnterprise'},						
						],
					};
				}
				if(da.check_status==2){
					this.check_type = 3;
					this.navDatad = {
						title:'平台供稿人-认证申请',
						list:[
							{n:'企业',u:'/setEnterprise'},				
						],
					};
				}
				this.postData = da; 
				this.postData = da;
			})
		},
		showisPhto(){
			this.$refs.upoloadcaver.setImgd(this.caver);
			this.isPhto=true;
		},
		close(img){
			if(img){
				this.caver = img;
			}
			this.isPhto=false;
		},
	}
}
</script>

<style>

</style>
