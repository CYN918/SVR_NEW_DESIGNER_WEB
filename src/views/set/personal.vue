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
							<span>身份证姓名</span><el-input class="suc_1_9_1" v-model="input" placeholder="请输入企业/机构名称"></el-input>
						</div>
						<div class="suc_1_9">
							<span>身份证号码</span><el-input class="suc_1_9_1" v-model="input" placeholder="请输入统一社会信用代码"></el-input>
						</div>
						<div class="suc_1_9">
							<span>身份证正面照片</span>
							<div class="suc_1_9_2">
								<span class="suc_1_9_3">上传照片</span>
								<div class="suc_1_9_4">
									<div class="suc_1_9_5"></div>
								</div>
							</div>
						</div>
						<div class="suc_1_9">
							<span>身份证反面照片</span>
						</div>
						<div class="suc_1_9">
							<span>手持身份证照片</span>
						</div>
						
					</div>
					<div class="suc_1 suc_2">
						<div class="suc_title">银行卡信息<div class="xhds"></div></div>
						<div class="suc_1_9">
							<span>收款账户名</span>
						</div>
						<div class="suc_1_9">
							<span>银行卡号</span>
						</div>
						<div class="suc_1_9">
							<span>银行预留手机号</span>
						</div>
						<div class="suc_1_9">
							<span>所属开户银行</span>
						</div>
						<div class="suc_1_9">
							<span>所属开户支行</span>
						</div>
					</div>
					<div class="suc_1 suc_3">
						<div class="suc_title">身份验证<div class="xhds"></div></div>
						<div class="suc_1_9">
							<span>手机号</span>
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
						<div class="suc_1_9">
							<span>验证码</span>
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
				title:'平台供稿人-认证申请',
				list:[
					{n:'个人',u:'/setPersonal'},
					{n:'企业',u:'/setEnterprise'},
				],
			},
			
			navDta:[
				'主体信息',
				'银行卡信息',
				'身份验证',			
			],			
			form:{},
			navdOn:0,
			topTyped:false,
		}
	},
	mounted: function () {			
		this.init();
		
	}, 
	methods: {
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
				console.log(this.form.qq_visible)
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
.suc_1 >.suc_1_9> span{
	display: inline-block;
	width: 157px;
	text-align: left;
	margin-right: 0;
	text-align-last:auto;
}
.suc_1_9_1{
	display: inline-block;
	width: 300px;
}
.suc_1_9_1 input{
	border: none;
	border-radius: 0;
	border-bottom: 1px solid #DDDDDD;
	padding: 0;
}
.suc_1_9_2{
	display: inline-block;
}
.suc_1_9_3{
	display: inline-block;
	border: 1px solid #999999;
	border-radius: 5px;
	font-size: 14px;
	color: #333333;
	text-align: center;
	width: 98px;
	line-height: 38px;
	cursor: pointer;

}
</style>
