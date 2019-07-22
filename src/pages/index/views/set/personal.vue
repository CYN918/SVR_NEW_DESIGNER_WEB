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
					<div class="suc_1">
						<div class="suc_title">主体信息<div class="xhds"></div></div>
						<div class="suc_1_9">
							<span>身份证姓名</span><el-input  class="suc_1_9_1" v-model="postData.name" placeholder="请输入姓名"></el-input>
						</div>
						<div class="suc_1_9">
							<span>身份证号码</span><el-input class="suc_1_9_1" v-model="postData.id_card" placeholder="请输入身份证号码"></el-input>
						</div>
						
						<div class="suc_1_9">
							<span>身份证正面照片</span>
							<div class="suc_1_9_2">
								<span class="suc_1_9_3" @click="scsk('身份证正面照')">
									上传照片
									<uploadFile :setJdt="setJdt1" :sussFn="uploadSC1" :cg="fileConfig"></uploadFile>
								</span>
								<div class="suc_1_9_4 iconfont" @click="scsk('身份证正面照？')">&#xe65c;
									<div class="suc_1_9_5">
										<div class="suc_1_9_6">
											<div class="suc_1_9_9">证件上传示例</div>
											<div class="suc_1_9_8"><span></span>四角完整</div>
											<div class="suc_1_9_8"><span></span>亮度均匀</div>
											<div class="suc_1_9_8"><span></span>照片清晰</div>
										</div>
										<img class="suc_1_9_7" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/sfz_zm.png" alt="">
									</div>
								</div>
							</div>
						</div>
						<div class="suc_1_10">
							<div class="suc_1_10_1">格式jpg，jpeg，png，大小不超过20M</div>
							<div class="suc_1_10_2">
								上传身份证正面照片
								<img v-if="postData.front_photo" class="suc_1_10_3" :src="postData.front_photo" alt="">
								<jdt v-if="isJdt1" ref="jdt1"></jdt>
							</div>
						</div>
						
						
						<div class="suc_1_9">
							<span>身份证反面照片</span>
							<div class="suc_1_9_2">
								<span class="suc_1_9_3" @click="scsk('身份证反面照片')">
									上传照片
									<uploadFile :setJdt="setJdt2" :sussFn="uploadSC2" :cg="fileConfig"></uploadFile>
								</span>
								<div class="suc_1_9_4 iconfont" @click="scsk('身份证反面照片？')">&#xe65c;
									<div class="suc_1_9_5">
										<div class="suc_1_9_6">
											<div class="suc_1_9_9">证件上传示例</div>
											<div class="suc_1_9_8"><span></span>四角完整</div>
											<div class="suc_1_9_8"><span></span>亮度均匀</div>
											<div class="suc_1_9_8"><span></span>照片清晰</div>
										</div>
										<img class="suc_1_9_7" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/sfz_bm.png" alt="">
									</div>
								</div>
							</div>
						</div>
						<div class="suc_1_10">
							<div class="suc_1_10_1">格式jpg，jpeg，png，大小不超过20M</div>
							<div class="suc_1_10_2">
								上传身份证反面照片
								<img v-if="postData.back_photo" class="suc_1_10_3" :src="postData.back_photo" alt="">
								<jdt v-if="isJdt2" ref="jdt2"></jdt>
							</div>
						</div>
						<div class="suc_1_9">
							<span>手持身份证照片</span>
							<div class="suc_1_9_2">
								<span class="suc_1_9_3" @click="scsk('手持身份证照片')">
									上传照片
									<uploadFile :setJdt="setJdt3" :sussFn="uploadSC3" :cg="fileConfig"></uploadFile>
								</span>
								<div class="suc_1_9_4 iconfont" @click="scsk('手持身份证照片？')">&#xe65c;
									<div class="suc_1_9_5">
										<div class="suc_1_9_6">
											<div class="suc_1_9_9">证件上传示例</div>
											<div class="suc_1_9_8"><span></span>四角完整</div>
											<div class="suc_1_9_8"><span></span>亮度均匀</div>
											<div class="suc_1_9_8"><span></span>照片清晰</div>
										</div>
										<img class="suc_1_9_7" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/sfz_sc.png" alt="">
									</div>
								</div>
							</div>
						</div>
						<div class="suc_1_10">
							<div class="suc_1_10_1">格式jpg，jpeg，png，大小不超过20M</div>
							<div class="suc_1_10_2">
								上传手持身份证照片
								<img v-if="postData.hand_hold_photo" class="suc_1_10_3" :src="postData.hand_hold_photo" alt="">
								<jdt v-if="isJdt3" ref="jdt3"></jdt>
							</div>
						</div>
	
						
					</div>
					<div class="suc_1 suc_2">
						<div class="suc_title">银行卡信息<div class="xhds"></div></div>
						<div class="suc_1_9">
							<span>收款账户名</span><el-input class="suc_1_9_1" v-model="postData.account_name" placeholder="收款账户名需与身份证验证信息一致"></el-input>
						</div>
						<div class="suc_1_9">
							<span>银行卡号</span><el-input class="suc_1_9_1" @blur="getBINKname" v-model="postData.bank_card_no" placeholder="请输入银行卡号"></el-input>
						</div>
						<div class="suc_1_9">
							<span>银行预留手机号</span><el-input class="suc_1_9_1" v-model="postData.reserve_phone" placeholder="请输入手机号码"></el-input>
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
						<el-checkbox v-model="ischecked">我已阅读并同意</el-checkbox><span @click="goPu('#/authorization')" class="pend">《狮圈儿供稿人协议》</span>
					</p>
					<div :class="['suc_btndf2',isPostky?'ispos':'']" @click="Userupdate">申请认证平台供稿人</div>
				</div>
			</div>
			
		</div>
		
		
		<div v-if="tAncType>0" class="tc_sucd">
			<div v-if="tAncType==1" class="tc_sucd_1">
				<img class="tc_sucd_1X" @click="closeTc1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/cj_00.png"/>
				<Input class="tc_sucd_1_1" v-model="tancData.userName"  :oType="'max'" :max="15"  :chekFn="chekusername" :type="'text'" :placeholder="'请输入新的用户名'"></Input>		
				<div class="tc_sucd_1_2">
					<span @click="closeTc1">取消</span>
					<span @click="qdTc1">确定</span>
				</div>
			</div>
			
			<div v-if="tAncType==2" class="tc_sucd_1">
				<img class="tc_sucd_1X" @click="closeTc1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/cj_00.png"/>
				<Input class="tc_sucd_2_1" v-model="tancData.oldMoble" @setYzm="setYzmOld" :type="'text'" :oType="'phone'" :chekFn="chekPhpne" :placeholder="'请输入旧的手机号码'"  ></Input>
				<Input class="tc_sucd_2_1" v-model="tancData.newMoble" @setYzm="setYzm" :type="'text'" :oType="'phone'" :chekFn="chekPhpne2" :placeholder="'请输入新的手机号码'"  ></Input>
				<Input v-model="tancData.verify_code"  @ajaxYzm="ajaxYzm" :type="'text'" :oType="'yzm'" :chekFn="chekverify" :placeholder="'输入 6 位短信验证码'"  ref="verify"></Input>
				<div class="tc_sucd_1_2">
					<span @click="closeTc1">取消</span>
					<span @click="qdTc2">确定</span>
				</div>
			</div>
			
			<div v-if="tAncType==3" class="tc_sucd_1">
				<img class="tc_sucd_1X" @click="closeTc1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/cj_00.png"/>
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
	
			
		</div>
	</div>
</template>

<script>

import {Message} from 'element-ui'
import Input from '../../components/input'
import Citys from '../../components/citys'
import uploadFile from '../../components/uploadFile'
import jdt from '../../components/jdt'
export default {
	name: 'works',
	components:{Input,Citys,uploadFile,jdt},
	data(){
		return {
			isJdt1:'',
			isJdt2:'',
			isJdt3:'',
			fileConfig:{
				type:['image/jpeg','image/png'],
				max:20*1024*1024,
				userType:'user_info',
			},
			
			postData:{},
			zhData:[],
			navDatad:{},
			check_type:1,
			ischecked:false,
			navDta:[
				'主体信息',
				'银行卡信息',
				'身份验证',			
			],			
			form:{mobile_zone:'86',front_photo:'',back_photo:'',hand_hold_photo:''},
			navdOn:0,
			topTyped:false,
			tAncType:0,
			options:[],
			isPostky:false,
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
		'postData.name'() {
			this.checkPost();
		},
		'postData.id_card'() {
			this.checkPost();
		},
		'postData.front_photo'() {
			console.log(111)
			this.checkPost();
		},
		'postData.back_photo'() {
			console.log(333)
			this.checkPost();
		},
		'postData.hand_hold_photo'() {
			console.log(222)
			this.checkPost();
		},
		'postData.account_name'() {
			this.checkPost();
		},
		'postData.bank_card_no'() {
			this.checkPost();
		},
		'postData.reserve_phone'() {
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
		scsk(a){
			this.bdtj('个人认证页面',a,'--');
		},
		uploadSC1(da){
			this.isJdt1='';
			this.postData.front_photo = da.url;
			this.checkPost();
		},
		uploadSC2(da){
			this.isJdt2='';
			this.postData.back_photo = da.url;
			this.checkPost();
		},
		uploadSC3(da){
			this.isJdt3='';
			this.postData.hand_hold_photo = da.url;
			this.checkPost();
		},
		setJdt1(on){
			this.isJdt1=1;
			if(this.$refs.jdt1){
				this.$refs.jdt1.bfb = on;
			}		
		},
		setJdt2(on){
			this.isJdt2=1;
			if(this.$refs.jdt2){
				this.$refs.jdt2.bfb = on;
			}		
		},
		setJdt3(on){
			this.isJdt3=1;
			if(this.$refs.jdt3){
				this.$refs.jdt3.bfb = on;
			}		
		},
		goPu(ud){
			this.bdtj('个人认证页面','供稿人协议','--');
			if(!ud){return}
			window.open(ud)
	
		},
		checkSfz(el){
			
		},
		checkPost(){
			console.log(2222223)
			this.isPostky = false;
			if(!this.ischecked){
				return
			}
			if(!this.postData.name){
				return
			}
			if(!this.postData.id_card){
				return
			}
			
			let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
			if(!regIdNo.test(this.postData.id_card)){  				  
				return 
			}  

			if(!this.postData.front_photo){
				return
			}
			if(!this.postData.back_photo){
				return
			}
			if(!this.postData.hand_hold_photo){
				return
			}
			if(!this.postData.account_name){
				return
			}
			
			if(this.checkBankno(this.postData.bank_card_no)==false){
				return
			}
			if(!(/^1[34578]\d{9}$/.test(this.postData.reserve_phone))){
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
		postCheck(){
			if(!(/^1[34578]\d{9}$/.test(this.postData.reserve_phone))){
				Message({message: '请输入正确的银行预留手机号'}); 	
				return false;
			} 
			let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
			if(!regIdNo.test(this.postData.id_card)){  
				Message({message: '请输入正确的身份证号'});  
				return false;
			}  
			if(this.checkBankno(this.postData.bank_card_no)==false){
				Message({message: '请输入正确的银行卡号'});
				return false;
			}
			
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
			this.bdtj('个人认证页面','获取验证码','--');
			let pd = this.form.mobile;
			if(this.form.mobile_zone!='86'){
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
				mobile:this.form.mobile,
				mobile_zone:this.form.mobile_zone,
	
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
				if(!(/^1[34578]\d{9}$/.test(pd))){ 
					Message({message: '请输入正确的手机号码'});
					return
				} 
				
			}		
			let params = {
				mobile:this.tancData.newMoble,
				mobile_zone:this.tancData.mobile_zone,
				type:'register'
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
				this.tancData.email = '';	
				this.tancData.pic_verify = '';
				this.tAncType=4;

				
			});
		},
		qdTc2(){
			if(!this.tancData.oldMoble){
				alert(1);
				return
			}
			if(!this.tancData.newMoble){
				alert(1);
				return
			}
			if(!this.tancData.verify_code){
				alert(2);
				return
			}
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
				Message({message: '修改成功'});
				
				
			});
		},
		qdTc1(){
			
			let postData = {
				access_token:window.userInfo.access_token,
				username:this.tancData.userName,				
			};
			this.api.Userupdate(postData).then((da)=>{
				if(da=='error'){
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
			if(on==2){
				this.bdtj('个人认证页面','更换手机号','--');
			}
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
			if(1==2){
				this.getUserDetail();
			}		
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
				

				if(t>=1048){
					this.navdOn =2;
					return
				}
				if(t>=800){
					this.navdOn =1;
					return
				}
				
				this.navdOn =0;
				

			}
		},
		checkBankno(bankno) {
    var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）
    var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
    var newArr = [];

    for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
    }

    var arrJiShu = []; //奇数位*2的积 <9
    var arrJiShu2 = []; //奇数位*2的积 >9
    var arrOuShu = []; //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) {//奇数位
            if (parseInt(newArr[j]) * 2 < 9)
                arrJiShu.push(parseInt(newArr[j]) * 2); else
                arrJiShu2.push(parseInt(newArr[j]) * 2);
        }
        else //偶数位
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1 = [];//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = [];//奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
    var sumOuShu = 0; //偶数位数组之和
    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }
    for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }
    for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
    //计算Luhm值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhm = 10 - k;
    if (lastNum == luhm) {
        return true;
    }
    else {
        return false;
    }
},

		setNavd(on){
			this.navdOn = on;
			this.setScll(800*on)
			
		},
		Userupdate(){
			this.bdtj('个人认证页面','申请成为供稿人','--');
			if(this.postCheck()==false){
				this.bdtj('个人认证页面','申请成为供稿人失败','--');
				return
			}
			if(!this.isPostky){
				this.bdtj('个人认证页面','申请成为供稿人失败','--');
				Message({message: '请填写所有信息'});
				return
			}
		
			let pr = {
				access_token:window.userInfo.access_token,
				type:1,
				name:this.postData.name,
				id_card:this.postData.id_card,
				front_photo:this.postData.front_photo,
				back_photo:this.postData.back_photo,
				hand_hold_photo:this.postData.hand_hold_photo,
				account_name:this.postData.account_name,
				bank_card_no:this.postData.bank_card_no,
				reserve_phone:this.postData.reserve_phone,
				branch_bank:this.postData.branch_bank,
				verify_code:this.postData.verify_code,
				bank_name:this.postData.bank_name,
				mobile_zone:window.userInfo.mobile_zone,
				mobile:window.userInfo.mobile,
				check_type:this.check_type,
			};
			this.api.identifyAuth(pr).then((da)=>{
				if(da=='error'){
					this.bdtj('个人认证页面','申请成为供稿人失败','--');
					return
				}
				this.bdtj('个人认证页面','申请成为供稿人成功','--');
				window.userInfo.contributor_format_status = 1;
				window.userInfo.contributor_type = 1;
				localStorage.setItem('userT',JSON.stringify(window.userInfo));
				Message({message: '申请已提交审核'});
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
			if(window.userInfo.contributor_type==2){
				this.$router.push({path:'/setEnterprise'})
				return
			}
			let pr = {
				access_token:window.userInfo.access_token,
				contribute_type:1
			};
			this.api.contributorInfo(pr).then((da)=>{
				if(da=='error'){
					return
				}
				let navd=0;
				if(da.check_status==0){
					this.check_type = 1;
				}
			
				if(da.check_status==1){
					this.$router.push({path: '/index'})	
					return
				}
				if(da.check_status==-1){
					this.check_type = 2;
					navd=1;
				}
				
				if(da.check_status==2){
					this.check_type = 3;
					navd=1;
				}
				this.$parent.setNav(navd);
				this.postData = da; 
			})
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
