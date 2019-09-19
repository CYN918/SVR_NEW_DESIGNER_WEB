<template>
	<div>
		<tophead :navData="navDatad"></tophead>
		<div class="setUserBox">
			<div class="setUserBoxs">
				<div class="setUserBoxs_nav">
					<div  v-for="(el,index) in navDta" :key="index" @click="setNavd(index,el.bdtj)" :class="[index==navdOn?'action':'']">{{el.n}}</div>
					
				</div>
				<div class="navDwzc">
					<div :class="['setUserBoxs_nav',topTyped?'fixdon':'']">
						<div  v-for="(el,index) in navDta" :key="index" @click="setNavd(index,el.bdtj)" :class="[index==navdOn?'action':'']">{{el.n}}</div>
					</div>
				</div>
				
				<div class="setUserBoxs_cent">
					<div class="suc_1">
						<div class="suc_title">账号设置</div>
						<div>
							<span>手机号</span><div class="userSZ_1">{{form.mobile}}</div>
							<div class="userSZ_2"><span @click="openTc1(1,'手机号','修改')">修改</span></div>
						</div>
						<div>
							<span>邮箱</span><div v-if="form.email" class="userSZ_1">可以使用邮箱  {{form.email}}</div><div class="userSZ_1_n1" v-else >未绑定</div>
							<div class="userSZ_2"><span v-if="!form.email" @click="openTc1(2,'邮箱','绑定')">立即绑定</span><span v-else @click="openTc1(2,'邮箱','修改')">修改</span></div>
						</div>
						<div class="suc_1_3">
							<span>登录密码</span><div class="userSZ_1">密码要求至少包含字母，符号或数字中的两项且长度超过6位</div>
							<div class="userSZ_2"><span @click="openTc1(4)">修改</span></div>
						</div>						
					</div>
					<div class="suc_1 suc_2">
						<div class="suc_title">第三方账号绑定</div>
						<div class="suc_1_4">
							<span><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/rz02.png" alt="">微信</span><div class="bindwxd_1" v-if="form.weixin_name">{{form.weixin_name}}</div><div class="bindwxd_2"><span @click="openTc1(5,'weixin','del')" v-if="form.weixin_name">解绑</span><span v-else @click="bindXg('weixin','add')">立即绑定</span></div>							
						</div>
						<div class="suc_1_4">
							<span><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/rz01.png" alt="">QQ</span><div class="bindwxd_1" v-if="form.qq_name">{{form.qq_name}}</div><div class="bindwxd_2"><span @click="openTc1(5,'qq','del')" v-if="form.qq_name">解绑</span><span v-else @click="bindXg('qq','add')">立即绑定</span></div>							
						</div>
						<div class="suc_1_4">
							<span><img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/rz03.png" alt="">微博</span><div class="bindwxd_1" v-if="form.weibo_name">{{form.weibo_name}}</div><div class="bindwxd_2"><span @click="openTc1(5,'weibo','del')" v-if="form.weibo_name">解绑</span><span v-else @click="bindXg('weibo','add')">立即绑定</span></div>							
						</div>
					</div>
					<div class="suc_1 suc_3">
						<div class="suc_title">平台投稿人-认证信息</div>
						<div class="suc_1_3">
							<span>认证状态</span><div class="rzzt_1">
							{{form.is_contributor==1?'已认证':form.contributor_format_status==1?'认证中':'未认证'}}
							</div>
							<div v-if="form.contributor_format_status==0" class="rzzt_2" @click="gosetPersonal('认证')">
								立即认证
							</div>
							<div v-else-if="form.contributor_format_status!=1" class="rzzt_2" @click="gosetPersonal('修改')">
								修改
							</div>
						
						</div>
					</div>
					
					
					<div class="suc_btndf" @click="Userupdate">保存资料</div>
				</div>
			</div>
			
		</div>
		<upoloadcaver v-show="isPhto" @close="close" ref="upoloadcaver"></upoloadcaver>
		<TcBox :config="outc" ref="tcBox">
			<template v-slot:todo="{ todo }">				
				<div v-if="tAncType==1" class="tc_sucd_1">
					
					<Input class="tc_sucd_2_1" v-model="tancData.oldMoble" @setYzm="setYzmOld" :type="'text'" :oType="'phone'" :chekFn="chekPhpne" :placeholder="'请输入旧的手机号码'"  ></Input>
					<Input class="tc_sucd_2_1" v-model="tancData.newMoble" @setYzm="setYzm" :type="'text'" :oType="'phone'" :chekFn="chekPhpne2" :placeholder="'请输入新的手机号码'"  ></Input>
					<Input v-model="tancData.verify_code"  @ajaxYzm="ajaxYzm(tancData.newMoble,tancData.mobile_zone)" :type="'text'" :oType="'yzm'" :chekFn="chekverify" :placeholder="'输入 6 位短信验证码'"  ref="verify"></Input>
		
					<div class="tc_sucd_1_2">
						<div @click="closeTc1" class="btns pend">取消</div>
						<div @click="qdTc2" class="btns btns_js pend">确定</div>
					</div>
				</div>
				
				<div v-if="tAncType==2" class="tc_sucd_1">
				
					<el-input class="elmentIputNoborder" v-model="tancData.email" placeholder="请输入邮箱"></el-input>
					<div class="emailyzm">
						<el-input v-model="tancData.pic_verify" placeholder="请输入验证码"></el-input>
						<div class="emailyzm2"><img @click="Verifycodeget" :src="tancData.pic_verifyimg" alt=""></div>
					</div>
					<div class="tc_sucd_1_2">
						<div @click="closeTc1" class="btns pend">取消</div>
						<div @click="qdTc3" class="btns btns_js pend">确定</div>
					</div>

				</div>
				<div v-if="tAncType==3" class="tc_sucd_1">
					<img class="tc_sucd_1X" @click="closeTc1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/cj_00.png"/>
					<img class="tAncType4_1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/email01.png" alt="">
					<div class="tAncType4_2">
						激活邮件已发送到你的邮箱中，邮件有效期为24小时。<br/>
						请及时登录邮箱，点击邮件中的链接激活帐户。
					</div>
				</div>
				
				
				<div v-if="tAncType==4" class="tc_sucd_1">
					
					<div class="tc_spasswodr_1">
						<span @click="checkPwor(0)" :class="isyazfs==0?'checkd':''">旧密码验证</span>
						<span @click="checkPwor(1)" :class="isyazfs==1?'checkd':''">短信验证</span>
					</div>
					<div class="tc_spasswodr_1_1" v-if="isyazfs==0">
						<Input v-model="tancData.old_password"  :oType="'password'" :chekFn="chekPssword" :type="'password'" :placeholder="'旧密码'"></Input>
						<Input v-model="tancData.password"  :oType="'password'" :chekFn="chekPssword" :type="'password'" :placeholder="'新密码，6-16位'"></Input>			
						<Input v-model="tancData.password_repass"  :oType="'password'" :chekFn="vp_r" :type="'password'" :placeholder="'确认新密码，6-16位'"  ></Input>
						<div class="tc_sucd_1_2">
							<div @click="closeTc1" class="btns pend">取消</div>
							<div @click="qdTc4" class="btns btns_js pend">确定</div>
						</div>
					</div>
					<div class="tc_spasswodr_1_1" v-if="isyazfs==1">
						<div class="tc_sucd_1_2">
							<Input v-model="tancData.mobile" @setYzm="setYzm" :type="'text'" :oType="'phone'" :chekFn="chekPhpne" :placeholder="'请输入手机号'"  ></Input>
							<Input v-model="tancData.verify_code"  @ajaxYzm="ajaxYzm(tancData.mobile,tancData.mobile_zone)" :type="'text'" :oType="'yzm'" :chekFn="chekverify" :placeholder="'输入 6 位短信验证码'"  ref="verify"></Input>
							<Input v-model="tancData.password"  :oType="'password'" :chekFn="chekPssword" :type="'password'" :placeholder="'新密码，6-16位'"></Input>			
							<Input v-model="tancData.password_repass"  :oType="'password'" :chekFn="vp_r" :type="'password'" :placeholder="'确认新密码，6-16位'"  ></Input>
							<div class="tc_sucd_1_2">
								<div @click="closeTc1" class="btns pend">取消</div>
								<div @click="qdTc5" class="btns btns_js pend">确定</div>
							</div>
						</div>
					</div>
					
				</div>
				<div v-if="tAncType==5" class="tc_sucd_1">
					<img class="tc_sucd_1X" @click="closeTc1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/cj_00.png"/>
				
					<div class="bindwxd_3">
						是否确认解绑？
					</div>
					<div class="tc_sucd_1_2">
						<div @click="closeTc1" class="btns pend">取消</div>
						<div @click="qdTc6" class="btns btns_js pend">确定</div>
					</div>
				</div>
			</template>			
		</TcBox>
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
import TcBox from '../../components/TcBox';
export default {
	name: 'works',
	components:{upoloadcaver,Input,Citys,Select,rideo,tophead,TcBox},
	data(){
		return {
			outc:{
				title:'',
				scroll:1,
			},
			navDatad:{
				title:'账号设置',
				list:[
					{n:'基本信息',u:'/setUser',bdtj:['帐号设置','tag_帐号安全_点击基本信息']},
					{n:'能力资料',u:'/setSkill',bdtj:['能力资料','tag_基本信息_点击能力资料']},
					{n:'账号安全',u:'/setSecurity',bdtj:['帐号设置','tag_帐号安全_点击帐号安全']},
				],
			},
			isyazfs:0,
			tancData:{
				mobile_zone:'86',
				old_mobile_zone:'86'
			},
			navDta:[
				{n:'账号设置',bdtj:'账号设置'},
				{n:'第三方账号绑定',bdtj:'第三方账号绑定'},
				{n:'平台投稿人-认证信息',bdtj:'平台投稿人-认证信息'},		
			],
			form:{},
			sexData:[{n:'男',v:1},{n:'女',v:2}],	
			isPhto:false,
			zy:[
				{n:"平面设计师"},
				{n:"插画师"},
				{n:"三维设计师"},
				{n:"网页设计师"},
				{n:"UI设计师"},
				{n:"动画师"},
				{n:"产品设计师"},
				{n:"室内设计师"},
				{n:"摄影师"},
				{n:"学生"},
				{n:"设计爱好者"},
				{n:"UX设计师"},
				{n:"新媒体设计师"},
				{n:"概念设计师"},
				{n:"特效合成师"},
				{n:"建筑师"},
				{n:"服装设计师"},
				{n:"手工艺人"},
				{n:"艺术工作者"},
				{n:"教育工作者"},
			],
			caver:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/nav_tx.png',
			vp_r(val){
				if(!val){
					return {type:false,text:'请确认密码',cls:'errd'}
				}
	
				if(this.$parent.tancData.password != val){
					return {type:false,text:'两次密码不一致',cls:'errd'}
				}
				return true
			},
			chekPssword(val){	
				if(!val){
					return {type:false,text:'请输入密码',cls:'errd'}
				}
				if(!(/^\S*$/.test(val))){ 				
					return {type:false,text:'密码不能有空格',cls:'errd'}
				} 				
				let len = val.length;				
				if(len<6){
					return {type:false,text:'强度：太短',cls:'errd2'}
				}
				if(len<10){
					return {type:true,text:'强度：中等',cls:'errd3'}
				}
				
				if(len>16){
					return {type:false,text:'密码请小于16位',cls:'errd'}
				}
				if(len<17){
					return {type:true,text:'强度：安全',cls:'errd4'}
				}
				return false;
			},	
			chekusername:function(val){
				
				return true
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
			vocationOn:0,
			inDad:[
				{label:'仅自己可见',value:'0'},
				{label:'所有人可见',value:'1'}
			],
			topTyped:false,
			navdOn:0,
			postData:{},
			tAncType:0,
			jbnData:'',
			
		}
	},
	mounted: function () {			
		this.init();
		
	}, 
	methods: {
		show(){
			this.$refs.tcBox.show();
		},
		close2(){
			this.$refs.tcBox.close();
		},
		gosetPersonal(a){
			this.bdtj('帐号设置','帐号安全-'+a,'--');
			if(this.form.contributor_type==2){
				this.$router.push({path: '/setEnterprise'})
				return
			}
			this.$router.push({path: '/setPersonal'})
		},
		qdTc6(){
			if(!this.jbnData.type){
				return
			}
			this.bindXg(this.jbnData.type,this.jbnData.type2);
		},
		bindXg(type,type2){
			this.bdtj('帐号设置','帐号安全-'+type+'-'+type2,'--');
			let pr = {
				access_token:window.userInfo.access_token,
				third_part:type,
				type:type2,				
			};
			this.api.Bindbind(pr).then((da)=>{
				if(da=='error'){
					return
				}
				if(type2=='add'){
					window.location.href=da.url;
					return
				}
				this.form[type+'_name'] = '';
				Message({message: '解绑成功'});
				this.closeTc1();
			})
		},
		qdTc4(){
			let pds = this.chekPssword(this.tancData.old_password);
			if(pds==false || pds.type==false){
				Message({message: '请输入正确的旧密码'});
				return
			}
			let pds2 = this.chekPssword(this.tancData.password);
			if(pds2==false || pds2.type==false){
				Message({message: '请输入正确的新密码'});
				return
			}
			if(this.tancData.password!=this.tancData.password_repass){
				Message({message: '两次密码不一致'});
				return
			}
			let pr = {
				type:'password',
				open_id:window.userInfo.open_id,
				old_password:this.MD5(this.tancData.old_password),
				password:this.MD5(this.tancData.password),
				password_repass:this.MD5(this.tancData.password_repass),
			};
			this.api.modifyPassword(pr).then((da)=>{
				if(da=='error'){
					return
				}
				this.tancData.old_password = '';	
				this.tancData.password = '';
				this.tancData.password_repass = '';
				this.close2();
				this.tAncType=0;
				Message({message: '密码修改成功'});
			})
		},
		qdTc5(){
			if(this.chekPhpne2(this.tancData.mobile)!=true){
				Message({message: '请输入正确的手机号码'});
				return
			}
			if(this.chekverify(this.tancData.verify_code)!=true){
				Message({message: '请输入正确的验证码'});
				return
			}
			let pds = this.chekPssword(this.tancData.password);
			if(pds==false || pds.type==false){
				Message({message: '请输入正确的密码'});
				return
			}
			if(this.tancData.password!=this.tancData.password_repass){
				Message({message: '两次密码不一致'});
				return
			}
			
			let pr = {
				type:'mobile',
				mobile_zone:this.tancData.mobile_zone,
				mobile:this.tancData.mobile,
				verify_code:this.tancData.verify_code,
				password:this.MD5(this.tancData.password),
				password_repass:this.MD5(this.tancData.password_repass),
			};
			this.api.modifyPassword(pr).then((da)=>{
				if(da=='error'){
					return
				}
				this.tancData.mobile_zone = '';	
				this.tancData.mobile = '';
				this.tancData.password = '';
				this.tancData.verify_code = '';
				this.tancData.password_repass = '';
				this.isyazfs=0;
				this.close2();
				this.tAncType=0;
				Message({message: '密码修改成功'});
			})
		},
		checkPwor(on){
			this.isyazfs = on;
			if(on==0){
				this.tancData.mobile_zone = '';	
				this.tancData.mobile = '';
				this.tancData.password = '';
				this.tancData.verify_code = '';
				this.tancData.password_repass = '';
				return
			}
			this.tancData.old_password = '';	
			this.tancData.password = '';
			this.tancData.password_repass = '';
			
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
		ajaxYzm(p,m){
			let pd = p;
			if(m!='86'){
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
				mobile:p,
				mobile_zone:m,
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
			if(!this.tancData.email){
				Message({message: '请输入正确的邮箱'});
				return
			}
			if(!this.tancData.pic_verify){
				Message({message: '请输入正确的验证码'});
				return
			}
			let pr = {
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
				this.tAncType=3;

				
			});
		},
		qdTc2(){
			if(this.chekPhpne(this.tancData.oldMoble).type==false){
				Message({message: '请填写正确的旧手机号'});
				return
			}
			if(this.chekPhpne2(this.tancData.newMoble).type==false){
				Message({message: '请填写正确的新手机号'});
				return
			}
			if(this.chekverify(this.tancData.verify_code).type==false){
				Message({message: '请填写正确的验证码'});
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
				this.close2();
				this.tAncType=0;
				Message({message: '修改成功'});
				
				
			});
		},
		closeTc1(){		
			if(this.tAncType==1){			
				this.tancData.mobile_zone = '86';
				this.tancData.newMoble = '';
				this.tancData.oldMoble = '';
				this.tancData.old_mobile_zone = '86';
				this.tancData.verify_code = ''			
			}	
			if(this.tAncType==3 || this.tAncType==2){
				this.tancData.email = '';	
				this.tancData.pic_verify = '';
			}
			
			if(this.tAncType==4){
				this.tancData.mobile_zone = '';	
				this.tancData.mobile = '';
				this.tancData.password = '';
				this.tancData.verify_code = '';
				this.tancData.password_repass = '';
				this.tancData.old_password = '';	
				this.isyazfs=0;
			}
			
			if(this.tAncType==5){
				this.jbnData = '';
			}
			this.close2();
			this.tAncType=0;
		},
		openTc1(on,t,t2){
			if(on==2){
				this.Verifycodeget();
			}
			if(on==5){
				this.jbnData = {
					type:t,
					type2:t2
				};
			}
			if(t2){
				this.bdtj('帐号设置','帐号安全-'+t+'-'+t2,'--');
			}
			this.show();
			this.tAncType=on;
		},
		
		init(){
			this.getUserDetail();
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
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
			231/3 
				if(t<=188){
					this.topTyped=false;
				}
				

				if(t>=154){
					this.navdOn =2;
					return
				}
				if(t>=77){
					this.navdOn =1;
					return
				}
				
				this.navdOn =0;
				

;			}
		},
		setNavd(on,tj){
			this.bdtj('帐号设置','帐号安全-'+tj,'--');
			this.navdOn = on;
			this.setScll(77*on)
			
		},
		Userupdate(){
			
			this.bdtj('帐号设置','帐号安全-保存资料','--');
			let postData = {
				access_token:window.userInfo.access_token,
				username:this.form.username,
				sex:this.form.sex,
				vocation:this.form.vocation,
				avatar:this.form.avatar,
				country:this.form.citye[0],
				province:this.form.citye[1],
				city:this.form.citye[2],
				personal_sign:this.form.personal_sign,
				education_school:this.form.education_school,
				weixin:this.form.weixin,
				weixin_visible:this.form.weixin_visible,
				qq:this.form.qq,
				qq_visible:this.form.qq_visible
			};
			this.api.Userupdate(postData).then((da)=>{
				if(da=='error'){
					return
				}
				Message({message: '修改成功'});
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
				user_open_id:window.userInfo.open_id
			};
			this.api.getSelfInfo(pr).then((da)=>{
				if(da=='error'){
					return
				}
				this.form = da;
				for(let i=0,n=this.zy.length;i<n;i++){
					if(this.zy[i].n ==this.form.vocation){
						this.vocationOn = i;
						break
					}
					
				}
				
				this.form.citye = [this.form.country,this.form.province,this.form.city]
			
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
