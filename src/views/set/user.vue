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
						<div class="suc_title">个人资料</div>
						<div class="suc_1_1">
							<span>头像</span><div class="suc_1_1_1"><img  :src="form.avatar" alt=""><div @click="showisPhto">修改头像</div></div>
						</div>
						<div>
							<span>用户名</span><div class="xgnamed">{{form.username}}<span @click="openTc1(1)">修改</span></div> 
						</div>
						<div>
							<span>手机号</span><div class="xgnamed">{{form.mobile}}<span @click="openTc1(2)">修改</span></div> 
						</div>
						<div>
							<span>邮箱</span><div v-if="form.email" class="xgnamed">{{form.email}}<span @click="openTc1(3)">修改</span></div><div @click="openTc1(3)" class="bindEamil" v-else>绑定邮箱</div> 
						</div>
						<div>
							<span>性别</span><rideo class="setUserRiode" :valued="form.sex"  :Data="sexData" v-model="form.sex"></rideo>	
						</div>
						<div>
							<span>职业</span><Select class="setUserSeLET" :valued="vocationOn" :Data="zy" v-model="form.vocation"></Select>	
						</div>
						<div>
							<span>所在地</span><Citys :valued="form.citye" class="setUserSeLET" v-model="form.citye"></Citys>
						</div>
						<div class="suc_1_3">
							<span>个性签名</span><Input :valued="form.personal_sign" class="userBoxd2_1" v-model="form.personal_sign"  :oType="'max'" :max="30"  :chekFn="chekusername" :type="'text'" :placeholder="'请输入签名'"></Input>		
						</div>
					</div>
					<div class="suc_1 suc_2">
						<div class="suc_title">教育背景</div>
						<div class="suc_1_3">
							<span>学校名称</span>
							<Input class="userBoxd2_2" :valued="form.education_school" v-model="form.education_school"  :oType="'max'" :max="20"  :chekFn="chekusername" :type="'text'" :placeholder="'请输入学校名称'"></Input>		
						</div>
					</div>
					<div class="suc_1 suc_3">
						<div class="suc_title">联系方式</div>
						<div class="suc_1_3">
							<span>微信号</span>
							<el-input class="suc_3xInput" v-model="form.weixin" placeholder="请输入内容"></el-input>
							<el-select class="suc_3xInputx" v-model="form.weixin_visible" placeholder="请选择">
								<el-option
								  v-for="item in inDad"
								  :key="item.value"
								  :label="item.label"
								  :value="item.value">
								</el-option>
							</el-select>
							
						</div>
						<div class="suc_1_3">
							<span>QQ号</span>
							<el-input class="suc_3xInput " v-model="form.qq" placeholder="请输入内容"></el-input>
							<el-select class="suc_3xInputx" v-model="form.qq_visible" placeholder="请选择">
								<el-option
								  v-for="item in inDad"
								  :key="item.value"
								  :label="item.label"
								  :value="item.value">
								</el-option>
							</el-select>
						
						</div>
						
						
					</div>
					<div class="suc_1 suc_4">
						<div class="suc_title">个人链接</div>
						<div class="suc_1_3">
							<span>主页链接</span>
							<el-input class="suc_3xInput" v-model="form.home_page" placeholder="请输入内容"></el-input>
							<span>zookingsoft.com.cn</span>
						</div>
					</div>
					
					<div class="suc_btndf" @click="Userupdate">保存资料</div>
				</div>
			</div>
			
		</div>
		<upoloadcaver v-show="isPhto" @close="close" ref="upoloadcaver"></upoloadcaver>
		
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
			navDatad:{
				title:'账号设置',
				list:[
					{n:'基本信息',u:'/setUser'},
					{n:'账号安全',u:'/setSecurity'},
				],
			},
			tancData:{
				mobile_zone:'86',
				old_mobile_zone:'86'
			},
			navDta:[
				'个人资料',
				'教育背景',
				'联系方式',
				'个人链接'				
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
			caver:'/imge/nav_tx.png',
				
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
		
			
		}
	},
	mounted: function () {			
		this.init();
		
	}, 
	methods: {
		Verifycodeget(){
			this.$set(this.tancData,'pic_verifyimg','http://139.129.221.123/Passport/Verifycode/get?client_id='+window.userInfo.open_id+'&t='+(new Date()).valueOf())
		},
		setYzm(val){
			this.tancData.mobile_zone = val;
		},
		setYzmOld(val){
			this.tancData.old_mobile_zone = val;
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
				this.form.mobile_zone = this.tancData.mobile_zone;
				this.tancData.mobile_zone = '86';
				this.tancData.newMoble = '';
				this.tancData.oldMoble = '';
				this.tancData.old_mobile_zone = '86';
				this.tancData.verify_code = '';			
				this.tAncType=0;
				window.userInfo.mobile = this.form.newMoble;
				window.userInfo.mobile_zone = this.form.mobile_zone;
				localStorage.setItem('userT',JSON.stringify(window.userInfo));
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
				window.userInfo.username = this.form.username;
				localStorage.setItem('userT',JSON.stringify(window.userInfo));
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
				if(t<=188){
					this.topTyped=false;
				}
				
				if(t>=480){
					this.navdOn =3;
					return
				}
				if(t>=320){
					this.navdOn =2;
					return
				}
				if(t>=160){
					this.navdOn =1;
					return
				}
				
				this.navdOn =0;
				

;			}
		},
		setNavd(on){
			this.navdOn = on;
			this.setScll(160*on)
			
		},
		Userupdate(){
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
				if(!da){
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
				localStorage.setItem('userT',JSON.stringify(window.userInfo));
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
				if(!da){
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
				this.form.avatar = img;
			
			}
			
			this.isPhto=false;
		},
	}
}
</script>

<style>

</style>
