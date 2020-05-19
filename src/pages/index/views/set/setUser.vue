<template>
	<div class="setUserBoxs_cent">
		<div class="scBox suc_1 userFont">
			<div class="suc_title">个人资料</div>
			<div class="suc_1_1">
				<span>头像</span>
				<div class="suc_1_1_1"><img :src="mJs.Cavars(form.avatar)" alt="">
					<div @click="showisPhto">修改头像</div>
				</div>
			</div>
			<div>
				<span class="dqys_1">用户名</span>
				<div class="xgnamed">{{form.username}}<span @click="openTc1(1)">修改</span></div>
			</div>
			<div>
				<span class="dqys_1">手机号</span>
				<div class="xgnamed dqys_1">{{phoneDm(form.mobile)}}<span @click="openTc1(2)">修改</span></div>
			</div>
			<div>
				<span class="dqys_1">邮箱</span>
				<div v-if="form.email" class="xgnamed dqys_1">{{emailDm(form.email)}}<span @click="openTc1(3)">修改</span></div>
				<div v-else @click="openTc1(3)" class="bindEamil dqys_1">绑定邮箱</div>

			</div>
			<div>
				<span>性别</span>
				<rideo class="setUserRiode" :valued="form.sex" :Data="sexData" v-model="form.sex"></rideo>
			</div>
			<div>
				<span class="lIN4">职业</span>
				<Select class="setUserSeLET" :valued="vocationOn" :Data="zy" v-model="form.vocation"></Select>
			</div>
			<div>
				<span class="dqys_1">所在地</span>
				<Citys :valued="form.citye" class="setUserSeLET" v-model="form.citye"></Citys>
			</div>
			<div class="suc_1_3">
				<span class="dqys_1">个性签名</span>
				<Input :valued="form.personal_sign" class="userBoxd2_1" v-model="form.personal_sign" :oType="'max'" :max="30" :chekFn="chekusername" :type="'text'" :placeholder="'请输入标签，15字以内（或30字符内）'"></Input>
			</div>
		</div>
		<div class="scBox suc_1 suc_2">
			<div class="suc_title">教育背景</div>
			<div class="suc_1_3">
				<span class="lIN4">学校名称</span>
				<Input class="userBoxd2_2" :valued="form.education_school" v-model="form.education_school" :oType="'max'" :max="20" :chekFn="chekusername" :type="'text'" :placeholder="'请输入学校名称'"></Input>
			</div>
		</div>
		<div class="scBox suc_1 suc_3">
			<div class="suc_title">联系方式</div>
			<div class="suc_1_3">
				<span>微信号</span>
				<el-input class="suc_3xInput" v-model="form.weixin" placeholder="请输入内容"></el-input>
				<el-select class="suc_3xInputx" v-model="form.weixin_visible" placeholder="请选择">
					<el-option v-for="item in inDad" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>

			</div>
			<div class="suc_1_3">
				<span>QQ号</span>
				<el-input class="suc_3xInput " v-model="form.qq" placeholder="请输入内容"></el-input>
				<el-select class="suc_3xInputx" v-model="form.qq_visible" placeholder="请选择">
					<el-option v-for="item in inDad" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
		</div>
		<div class="suc_btndf" @click="Userupdate">保存资料</div>

		
		<TcBox :config="outc" ref="tcBox">
			<template v-slot:todo="{ todo }">
				<div v-if="tAncType==1" class="tc_sucd_1">
					<Input class="tc_sucd_1_1" v-model="tancData.userName" :isHz="'is'" :oType="'max'" :max="18" :chekFn="chekusername" :type="'text'" :placeholder="'请输入新的用户名；一个中文等于两个字母'"></Input>
				</div>
				<div v-if="tAncType==2" class="tc_sucd_1">
					<Input class="tc_sucd_2_1" v-model="tancData.oldMoble" @setYzm="setYzmOld" :type="'text'" :oType="'phone'" :chekFn="chekPhpne" :placeholder="'请输入旧的手机号码'"></Input>
					<Input class="tc_sucd_2_1" v-model="tancData.newMoble" @setYzm="setYzm" :type="'text'" :oType="'phone'" :chekFn="chekPhpne2" :placeholder="'请输入新的手机号码'"></Input>
					<Input v-model="tancData.verify_code" @ajaxYzm="ajaxYzm" :type="'text'" :oType="'yzm'" :chekFn="chekverify" :placeholder="'输入新手机号码的6位短信验证码'" ref="verify"></Input>
				</div>

				<div v-if="tAncType==3" class="tc_sucd_1">
					<Input v-model="tancData.email" :type="'text'" :oType="'text'" :chekFn="chekemail" :placeholder="'请输入邮箱'"></Input>
					<div class="emailyzm">
						<el-input v-model="tancData.pic_verify" placeholder="请输入验证码"></el-input>
						<div class="emailyzm2"><img @click="Verifycodeget" :src="tancData.pic_verifyimg" alt=""></div>
					</div>
				</div>
				<div v-if="tAncType==4" class="tc_sucd_1">
					<img class="tAncType4_1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/email01.png" alt="">
					<div class="tAncType4_2">
						激活邮件已发送到你的邮箱中，邮件有效期为24小时。<br/> 请及时登录邮箱，点击邮件中的链接激活帐户。
					</div>
				</div>
				<div v-if="tAncType!=4" class="tc_sucd_1_2">
					<div @click="closeTc1" class="btns pend">取消</div>
					<div @click="qrFn()" class="btn-lod btns btns_js pend">
						<i v-if="upType" class="loading_a m_c"></i>
						<span v-else>确定</span>
					
					</div>
				</div>
			</template>
		</TcBox>
		<myCaver ref="myCaver"></myCaver>
	</div>
	
</template>

<script>
	import { Message } from 'element-ui'

	
	import Input from '../../components/input'
	import Citys from '../../components/citys'
	import Select from '../../components/select'
	import rideo from '../../components/rideo'
	import TcBox from '../../components/TcBox';
	
	import myCaver from '../../components/cavar';
	export default {
		name: 'works',
		components: {
			Input,
			Citys,
			Select,
			rideo,
			TcBox,
			myCaver
		},
		data() {
			return {
				outc: {
					title: '',
					scroll: 1,
					closeFn:'closeCler'
				},
				qrFnName: '',
				tjList: [

					{
						a: '修改昵称',
						b: '修改昵称弹窗-关闭',
						c: '修改昵称弹窗-取消',
						d: '修改昵称弹窗-确定',
						fn: 'qdTc1'
					},
					{
						a: '修改手机号',
						b: '修改手机号弹窗-关闭',
						c: '修改手机号弹窗-取消',
						d: '修改手机号弹窗-确定',
						fn: 'qdTc2'
					},
					{
						a: '绑定邮箱',
						b: '绑定邮箱弹窗-关闭',
						c: '绑定邮箱弹窗-取消',
						d: '绑定邮箱弹窗-确定',
						fn: 'qdTc3'
					}
				],
				tancData: {
					mobile_zone: '86',
					old_mobile_zone: '86'
				},
				form: {
					qq_visible: 1,
					weixin_visible: 1
				},
				sexData: [{
					n: '男',
					v: 1
				}, {
					n: '女',
					v: 2
				}],
				zy:[
					{n:"平面设计师"},
					{n:"插画师"},
					{n:"网页设计师"},
					{n:"UI设计师"},
					{n:"动画师"},
					{n:"产品设计师"},
					{n:"摄影师"},
					{n:"学生"},
					{n:"设计爱好者"},
					{n:"UX设计师"},
					{n:"新媒体设计师"},
					{n:"特效合成师"},
					{n:"服装设计师"},
					{n:"教育工作者"},
				],
				
				chekusername: function() {
					return true
				},
				chekemail:function(val){
					
					let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; //正则表达式
					if(!val){
						return {type:false,text:'请填写正确的邮箱地址',cls:'errd5'}; 
					}
					if(!reg.test(val)){
						return {type:false,text:'请填写正确的邮箱地址',cls:'errd5'}; 
					}
					return true
	
				},
				chekPhpne: function(val) {
					if(this.form.mobile_zone != '86') {
						if(!(typeof val === 'number' && val % 1 === 0)) {
							return {
								type: false,
								text: '请输入正确的手机号码',
								cls: 'errd5'
							};
						}
						return true;
					}
					if(!(/^1[23456789]\d{9}$/.test(val))) {
						return {
							type: false,
							text: '请输入正确的手机号码',
							cls: 'errd5'
						};
					}
					return true;
				},
				chekPhpne2: function(val) {
					if(this.form.mobile_zone != '86') {
						if(!(typeof val === 'number' && val % 1 === 0)) {
							return {
								type: false,
								text: '请输入正确的手机号码',
								cls: 'errd5'
							};
						}
						return true;
					}
					if(!(/^1[23456789]\d{9}$/.test(val))) {
						return {
							type: false,
							text: '请输入正确的手机号码',
							cls: 'errd5'
						};
					}
					return true;
				},
				chekverify: function(val) {
					if(!val) {
						return {
							type: false,
							text: '请填写验证码',
							cls: 'errd5'
						};
					}
					if(!(/^\S*$/.test(val))) {
						return {
							type: false,
							text: '验证码不能有空格',
							cls: 'errd5'
						};
					}
					if(val.length != 6) {
						return {
							type: false,
							text: '请填写6位验证码',
							cls: 'errd5'
						}
					}
					return true
				},
				vocationOn: -1,
				inDad: [{
						label: '仅自己可见',
						value: '0'
					},
					{
						label: '所有人可见',
						value: '1'
					}
				],
				topTyped: false,
				navdOn: 0,
				postData: {},
				tAncType: 0,
				upType:'',
				txtype:''

			}
		},
		mounted: function() {
	
			this.init();

		},
		methods: {
			closeCavar(i){
				this.form.avatar = i;
				this.oneXg('avatar',this.form.avatar);
				
			},
			oneXg(n,a){
				if(this.txtype){
					this.$message({message:'正在提交请稍后'})
					return 
				}
				this.txtype=1;
				let od = {};
				od[n] = a;
			
				this.api.Userupdate(od).then((da) => {
					this.txtype='';
					if(da == 'error') {
						return
					}

					window.userInfo[n] = a;

					localStorage.setItem('userT', JSON.stringify(window.userInfo));
					Message({
						message: '修改成功'
					});
					
					this.$parent.$parent.$refs.topZj.initHead();
				}).catch(()=>{
					this.txtype='';
				});
			},
			show() {
				this.$refs.tcBox.show();
			},
			close2() {
				this.$refs.tcBox.close();
			},
			qrFn() {
				this[this.qrFnName]();
			},
			phoneDm(p) {
				if(!p) {
					return
				}
				return p.substring(0, 3) + '****' + p.substring(7, 11);
			},
			emailDm(p) {
				if(!p) {
					return
				}
				let str = p.split('@');
				if(str.length == 1) {
					return str[0];
				}
				return str[0].substring(0, 1) + '****' + str[0].substr(-1, 1) + '@' + str[1];
			},
			Verifycodeget() {
				this.$set(this.tancData, 'pic_verifyimg', window.basrul + '/Passport/Verifycode/get?client_id=' + window.userInfo.open_id + '&t=' + (new Date()).valueOf())
			},
			setYzm(val) {
				this.tancData.mobile_zone = val;
			},
			setYzmOld(val) {
				this.tancData.old_mobile_zone = val;
			},
			ajaxYzm() {
				this.bdtj('帐号设置', '基本信息-修改手机号弹窗-发送验证码', '--');
				let pd = this.tancData.newMoble;
				if(this.tancData.mobile_zone != '86') {
					if(!(typeof pd === 'number' && pd % 1 === 0)) {
						Message({
							message: '请输入正确的手机号码'
						});
						return
					}
				} else {
					if(!(/^1[23456789]\d{9}$/.test(pd))) {
						Message({
							message: '请输入正确的手机号码'
						});
						return
					}

				}
				let params = {
					mobile: this.tancData.newMoble,
					mobile_zone: this.tancData.mobile_zone,
					type:'register',
				};
				this.api.sendVerifyCode(params).then((da) => {
					if(da == 'error') {
						return
					}
					Message({
						message: '验证码已发送'
					});
					this.$refs.verify.runTimer(60);
				}).catch(() => {

				});
			},
			qdTc3() {
				let pr = {
					access_token: window.userInfo.access_token,
					third_part: 'email',
					type: 'add',
					email: this.tancData.email,
					pic_verify: this.tancData.pic_verify,

				};
				if(this.upType){
					this.$message({message:'正在提交请稍后'})
					return 
				}
				this.upType=1;
				this.api.Bindbind(pr).then((da) => {
					this.upType='';
					if(da == 'error') {
						this.Verifycodeget();
						return
					}
					this.tancData.email = '';
					this.tancData.pic_verify = '';
					this.tAncType = 4;

				}).catch(()=>{
					this.upType='';
				});
			},
			qdTc2() {
				let pr = {
					access_token: window.userInfo.access_token,
					third_part: 'mobile',
					type: 'update',
					old_mobile_zone: this.tancData.old_mobile_zone,
					old_mobile: this.tancData.oldMoble,
					mobile_zone: this.tancData.mobile_zone,
					mobile: this.tancData.newMoble,
					verify_code: this.tancData.verify_code,

				};
				if(this.upType){
					this.$message({message:'正在提交请稍后'})
					return 
				}
				this.upType=1;
				this.api.Bindbind(pr).then((da) => {
					this.upType='';
					if(da == 'error') {
						this.bdtj('帐号设置', '基本信息-修改手机号弹窗-修改失败', '--');
						return
					}
					this.form.mobile = pr.mobile;
					this.form.mobile_zone = pr.mobile_zone;
					this.tancData.mobile_zone = '86';
					this.tancData.newMoble = '';
					this.tancData.oldMoble = '';
					this.tancData.old_mobile_zone = '86';
					this.tancData.verify_code = '';
					this.closeTc1();
					this.tAncType = 0;
					window.userInfo.mobile = this.form.mobile;
					window.userInfo.mobile_zone = this.form.mobile_zone;
					localStorage.setItem('userT', JSON.stringify(window.userInfo));
					this.bdtj('帐号设置', '基本信息-修改手机号弹窗-修改成功', '--');
					Message({
						message: '修改成功'
					});

				}).catch(()=>{
					this.upType='';
				});
			},
			qdTc1() {
				let postData = {
					username: this.tancData.userName,
				};
				if(this.upType){
					this.$message({message:'正在提交请稍后'})
					return 
				}
				this.upType=1;
				this.api.Userupdate(postData).then((da) => {
					this.upType='';
					if(da == 'error') {
						return
					}
					this.form.username = this.tancData.userName;
					this.tancData.userName = '';
					this.closeTc1();
					this.tAncType = 0;
					window.userInfo.username = this.form.username;
					localStorage.setItem('userT', JSON.stringify(window.userInfo));
					Message({
						message: '修改成功'
					});
				}).catch(()=>{
					this.upType='';
				});
			},
			closeCler(){
				this.tancData = {
					mobile_zone: '86',
					old_mobile_zone: '86'
				};
			},
			closeTc1() {			
				this.bdtj('帐号设置', '基本信息-' + this.tjList[this.tAncType - 1].b, '--');
				this.closeCler();
				this.close2();
				this.tAncType = 0;
			},
			openTc1(on) {

				this.bdtj('帐号设置', '基本信息-' + this.tjList[on - 1].a, '--');
				this.outc.title = this.tjList[on - 1].a;
				if(on == 3) {
					this.Verifycodeget();
				}
				this.qrFnName = this.tjList[on - 1].fn;
				this.show();
				this.tAncType = on;
			},

			init() {
				this.getUserDetail();
				document.documentElement.scrollTop = 1;
				document.body.scrollTop = 1;
				window.onscroll = () => {
					let t = document.documentElement.scrollTop || document.body.scrollTop;
					if(t == 0) {
						document.documentElement.scrollTop = 1;
						document.body.scrollTop = 1;
					}
					if(this.topTyped == false) {
						if(t > 188) {
							this.topTyped = true;
						}

					}
					if(t <= 188) {
						this.topTyped = false;
					}

				}
			},
	
			Userupdate() {
				this.bdtj('帐号设置', '基本信息-保存资料', '--');
				let postData = {
					access_token: window.userInfo.access_token,
					username: this.form.username,
					sex: this.form.sex,
					vocation: this.form.vocation,
					avatar: this.form.avatar,
					country: this.form.citye[0],
					province: this.form.citye[1],
					city: this.form.citye[2],
					personal_sign: this.form.personal_sign,
					education_school: this.form.education_school,
					weixin: this.form.weixin,
					weixin_visible: this.form.weixin_visible,
					qq: this.form.qq,
					home_page: this.form.home_page,
					qq_visible: this.form.qq_visible
				};
				this.api.Userupdate(postData).then((da) => {
					if(da == 'error') {
						return
					}
					window.userInfo.username = postData.username;
					window.userInfo.sex = postData.sex;
					window.userInfo.vocation = postData.vocation;
					window.userInfo.avatar = postData.avatar;
					window.userInfo.country = postData.country;
					window.userInfo.province = postData.province;
					window.userInfo.city = postData.city;
					window.userInfo.personal_sign = postData.personal_sign;
					window.userInfo.education_school = postData.education_school;
					window.userInfo.weixin = postData.weixin;
					window.userInfo.weixin_visible = postData.weixin_visible;
					window.userInfo.qq = postData.qq;
					window.userInfo.qq_visible = postData.qq_visible;
					window.userInfo.home_page = postData.home_page;
					localStorage.setItem('userT', JSON.stringify(window.userInfo));
					Message({
						message: '修改成功'
					});
				});

			},

			getUserDetail() {
				if(!window.userInfo) {
					this.$router.push({
						path: '/login'
					})
					return
				}

				let pr = {
					access_token: window.userInfo.access_token,
					user_open_id: window.userInfo.open_id
				};
				this.api.getSelfInfo(pr).then((da) => {
					if(da == 'error') {
						return
					}
					for(let key in da) {
						if(da[key] == null) {
							da[key] = '';
						}
					}

					this.form = da;
					for(let i = 0, n = this.zy.length; i < n; i++) {
						if(this.zy[i].n == this.form.vocation) {
							this.vocationOn = i;
							break
						}

					}
					this.form.qq_visible += '';
					this.form.weixin_visible += '';

					this.form.citye = [this.form.country, this.form.province, this.form.city]

				})
			},
			showisPhto() {
				this.$refs.myCaver.show(this.form.avatar);
			},
		},
	}
</script>

<style>
.suc_1 > div > span.lIN4{
	line-height: 41px;
}
.suc_1 > .suc_1_3 > span.lIN4{
	line-height: 41px;
}
.userFont{
	font-size: 14px;
}
.suc_1 > div > span.dqys_1{
	line-height: 20px;
}

</style>