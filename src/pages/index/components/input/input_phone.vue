<template>
	<div :class="['myInput_phoneBox0',tpd]">
		<div :class="['myInput_phoneBox',inputType]">
			<el-select class="phone_0" v-if="inputType=='phones'" :style="{width:'90px'}" v-model="mobile_zone">
				<el-option
				v-for="item in xnData"
				:key="item.label"
				:label="item.label"
				:value="item.value">
				</el-option>	
			</el-select>
			<div v-if="inputType=='phones'"  class="phone_2"></div>
			<input class="phone_1" @keyup.enter="keyup"  @focus="focus" @blur="blur" :type="midf2" v-model="input" :placeholder="placeholder"  ref="input"/>
			
			<span v-if="inputType=='verifys'" class="phone_3" @click="ajaxVerifys">{{timer}}</span>
			<div v-if="inputType=='password' || inputType=='password_repass'" class="iconfont pend mad" @click="chemima('midf2')">
				<span  v-if="midf2=='password'">&#xe61f;</span>
				<span  v-else>&#xe6a2;</span>
			</div>
			
			<div v-if="inputType=='max'" :class="['nubMax',maxerr]">
				{{numd}}/{{max}}
			</div>
		</div>
		<div class="tip">{{eeText}}<span></span></div>
	</div>
</template>

<script>
import {Message} from 'element-ui'
export default {
	name: 'myInput',
	data(){
		return{	
			mobile_zone:'86',
			input:'',
			tpd:'',
			eeText:'',
			midf2:this.type,
			setimed:'',
			maxerr:'',
			numd:0,
			timer:'获取验证码',
			xnData:[
				{label:"中国 +86",value:"86"},
				{label:"中国香港 +852",value:"852"},
				{label:"中国澳門 +853",value:"853"},
				{label:"中国台灣 +886",value:"886"},
				{label:"美国 +1",value:"1"},
				{label:"日本 +81",value:"81"},
				{label:"韩国 +82",value:"82"},
				{label:"马来西亚 +60",value:"60"},
				{label:"新加坡 +65",value:"65"},
				{label:"越南 +84",value:"84"},
				{label:"澳大利亚 +61",value:"61"},
				{label:"加拿大 +1",value:"1"},
				{label:"英国 +44",value:"44"},
				{label:"法国 +43",value:"43"},
				{label:"泰国 +66",value:"66"},
				{label:"印度 +91",value:"91"},
				{label:"菲律宾 +63",value:"63"},
				{label:"巴西 +55",value:"55"},
				{label:"印度尼西亚 +62",value:"62"},
				{label:"意大利 +39",value:"39"},
				{label:"土耳其 +90",value:"90"}, 								
			],
		}
	},
	props: {
		inputType:String,
		disabled: Boolean,
		readonly: Boolean,
		type: {
			type: String,
			default: 'text'
		},
		name:String,
		id:String,
		placeholder:String, 
		valued:{
			default:'',
		},
		max:{
			type:Number,
			default:0,
		},
		ajaxVerifysType:'',
		iscf:String,
		chekFn:{
			type:Function,
			default:(obj)=>{
				if(obj.inputType=='phones'){
					obj.chekPhpne();
					return
				}				
				obj.$emit('input',obj.input); 
				if(obj.inputType=='verifys'){
					obj.chekverify(obj.input);
					return
				}
				if(obj.inputType=='password'){
					obj.chekPssword(obj.input);
					return
				}				
				if(obj.inputType=='password_repass'){
					obj.checkpasswor2(obj.input);
					return
				}	
					
					
			}
		},
		keyup:{
			type:Function,
			default:()=>{
				
			}
		},
		
	},		
	computed: {},
	mounted: function () {
	
	}, 
	watch: {
		'valued'(){
			this.form = this.valued;			
		},
		'input'(){
			this.chekFn(this);
		},
	    'mobile_zone'(val){
			if(!this.input){
				return
			}
	    	this.chekPhpne();		   		      	
	    },
   	},
   	methods: {
		/*tiping*/
		setErro(a,b){
			this.tpd = a;
			
			this.eeText = b?b:'';	
		},
		
		/*checking*/
		checkBack(type){
			this.$emit('checkBack',type,this.inputType);
		},
		
		chekPhpne(){
		
			if(this.mobile_zone!='86'){
				if(!(typeof this.input === 'number' && this.input%1 === 0)){
					this.checkBack(false);
					this.setErro('pherr','请输入正确的手机号码');					
					return				
				}			
			}	
			if(!(/^1[345789]\d{9}$/.test(this.input))){ 
				this.checkBack(false);
				this.setErro('pherr','请输入正确的手机号码');
				return ; 
			}
			this.setErro('');
			
			this.$parent.form.mobiles = {
				mobile:this.input,
				mobile_zone:this.mobile_zone,
			};	

			this.checkBack(true); 
		},
		chekverify(val){
			if(!val){
				this.checkBack(false);
				this.setErro('pherr','请填写验证码');	
				return ; 
			}
			if(!(/^\S*$/.test(val))){ 		
				this.checkBack(false);
				this.setErro('pherr','验证码不能有空格');	
				return ; 
			} 			
			if(val.length!=6){
				this.checkBack(false);
				this.setErro('pherr','请填写6位验证码');
				return ; 
			}
			this.setErro('');	
			this.checkBack(true); 
		},
		chekPssword(val){	
			if(!val){
				this.checkBack(false);
				this.setErro('pherr','请输入密码');
				return;
			}
			if(!(/^\S*$/.test(val))){ 	
				this.checkBack(false);
				this.setErro('pherr','密码不能有空格');
				return;
			} 				
			let len = val.length;				
			if(len<6){
				this.checkBack(false);
				this.setErro('pherr2','强度：太短');
				return;
			}
			if(len<10){
				this.checkBack(true);
				this.setErro('pherr3','强度：中等');
				return;
			}
			
			if(len>16){
				this.checkBack(false);
				this.setErro('pherr','密码请小于16位');
				return;
			}
			if(len<17){
				this.checkBack(true);
				this.setErro('pherr4','强度：安全');
				return;
			}
		},
		checkpasswor2(val){
			if(!val){
				this.checkBack(false);
				this.setErro('pherr','请确认密码');
				return;
				
			}
			if(this.$parent.form.password != val){
				this.checkBack(false);
				this.setErro('pherr','两次密码不一致');
				return;
				
			}
			this.setErro('');	
			this.checkBack(true); 
		},
		
		
		
		ajaxVerifys(){	
			
			if(this.ajaxVerifysType){
				return
			}
			if(!this.$parent.form.mobiles){
				Message({message: '请填写正确的手机号码'});
				return
			}
			
		
			let params = {
				mobile:this.$parent.form.mobiles.mobile,
				mobile_zone:this.$parent.form.mobiles.mobile_zone
			};
		
			if(this.iscf==1){
				params.type = 'register';
			}
			if(this.iscf==2){
				params.type = 'login';
			}
			this.ajaxVerifysType = 1;
			this.api.sendVerifyCode(params).then((da)=>{	
				if(da=='error'){
					this.ajaxVerifysType = '';
					return
				}
				this.runTimer(60);	
			}).catch(()=>{
				this.ajaxVerifysType = '';	
			});
		},
		chemima(data){
			this[data] = this[data]=='password'?'text':'password';
		},
		setData(da){
			this.input = da;
		},
		clearValue(){
			this.input="";
		},
   		setErr(cls,text){
			this.passqd=cls;
   	 		this.eeText=text;
   		},

   		focus(){
			this.chekFn(this);
   		},
   	 	blur(){  	 			
			this.setErro('');
   	 	},

		runTimer(num){
			this.timer = num +'秒后重新获取';
			if(num==0){
				this.ajaxVerifysType = '';
				this.timer = '获取验证码';
				return
			}
			this.setimed= setTimeout(()=>{
				num--;
				this.runTimer(num);
			},1000)
			
		}
   	},
   	
   	
   	
   	
}	
</script>

<style>
.myInput_phoneBox {
	position: relative;
	width: 100%;
	line-height: 40px;
	border-bottom: 1px solid #EEEEEE;
}
.myInput_phoneBox .el-input__inner{
	border: none;
}
.phone_0{
	position: absolute;
	top: 0;
	left: 0;
}
.phone_1{
	box-sizing: border-box;
	width: 100%;
	border: none;
	height: 100%;
	outline: none;
}
.phones .phone_1{
	padding-left: 120px;
	
}
.phone_2{
	position: absolute;
	top: 50%;
	left: 100px;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
	width: 1.6px;
	height: 18.9px;
	background: #EEEEEE;
}

.verifys .phone_1{
	padding-right: 140px;
	
}
.password .phone_1{
	padding-right: 50px;
}
.phone_3{
	position: absolute;
	right: 0;
	top: 0;
	display: inline-block;
	font-size: 14px;
	color: #33B3FF;
	text-align: right;
	padding-left: 20px;
}
.phone_3:after{
	content: "";
	position: absolute;
	top: 50%;
	left: 0;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
	width: 1.6px;
	height: 18.9px;
	background: #EEEEEE;
	
}
.myInput_phoneBox0 .tip{
	font-size: 12px;
	line-height: 30px;
	text-align: left;
}

	
.myInput_phoneBox0 .tip>span{
	display: none;
	position: relative;
	width: 120px;	
	height: 4px;
	background: #F5F5F5;
	border-radius: 2.5px;
	margin-left: 11px;
	vertical-align: middle;
}
.myInput_phoneBox0 .tip>span:after{
	content: "";
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	background: #FF0000;
	border-radius: 2.5px;
}

.pherr>.tip{
	color: #F56C6C;
    font-size: 12px;
    line-height: 30px;
    text-align: left;
}
.pherr2>.tip{
	color: #F56C6C;
}
.pherr .myInput_phoneBox{
	border-color: #F56C6C;
}
.pherr2 .myInput_phoneBox{
	border-color: #F56C6C;
}
.pherr2>.tip>span{
	display: inline-block;
}
.pherr2>.tip>span:after{
	width: 40px;
	background: #F56C6C;
}

.pherr3>.tip{
	color: #FF9A00;
}
.pherr3 .myInput_phoneBox{
	border-color: #FF9A00;
}
.pherr3>.tip>span{
	display: inline-block;
}
.pherr3>.tip>span:after{
	width: 80px;
	background: #FF9A00;
}
.pherr4>.tip{
	color: #51C514;
}
.pherr4>.tip>span{
	display: inline-block;
}
.pherr4>.tip>span:after{
	width: 120px;
	background: #51C514;
}
</style>
