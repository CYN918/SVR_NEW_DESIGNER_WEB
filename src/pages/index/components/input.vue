<template>
	<div :class="['inptud',passqd]" >
		<div  :class="['myInput',inputType]">
			<el-select :style="{width:'90px'}" class="lgoin_s1" v-if="oType=='phone'" v-model="form.mobile_zone">
				<el-option
				v-for="item in xnData"
				:key="item.label"
				:label="item.label"
				:value="item.value">
				</el-option>	
			</el-select>
			<div v-if="oType=='phone'" class="lgoin_s2 lgoin_s2xx"></div>
			<input autocomplete="off" @keyup.enter="keyup"  @focus="focus" @blur="blur" v-model="input" :placeholder="placeholder" :type="midf2" ref="input"/><div v-if="oType=='yzm'" class="lgoin_s2"></div><span v-if="oType=='yzm'" class="lgoin_s3x2" @click="ajaxYzm">{{timer}}</span>
			<div v-if="oType=='password'" class="iconfont pend mad" @click="chemima('midf2')">
				<span  v-if="midf2=='password'">&#xe61f;</span>
				<span  v-else>&#xe6a2;</span>
			</div>
			
			<div v-if="oType=='max'" :class="['nubMax',maxerr]">
				{{numd}}/{{max}}
			</div>
		</div>			
		<div :class="['tip',tpd]">{{eeText}}<span></span></div>
	</div>
</template>
<script>
export default {
	name: 'myInput',
	data(){
		return{
			passqd:'',
			maxerr:'',
			input:'',
			inputType:'',
			midf2:this.type,
			tpd:'',
			numd:0,
			eeText:'',
			setimed:'',
			form:{
				mobile_zone:'86',
			},			
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
		oType:String,
		disabled: Boolean,
		readonly: Boolean,
		type: {
			type: String,
			default: 'text'
		},
		name:String,
		id:String,
		placeholder:String, 
		value: { 
　　　　　	default: '',
　　　　	},
		valued:{
			default:'',
		},	
		chekFn:{
			type:Function,
			default:()=>{}
		},
		max:{
			type:Number,
			default:0,
		},
		keyup:{
			type:Function,
			default:()=>{}
		},
		mblur:Function,
		mfocus:Function,
		isHz:String,
	},		
	computed: {
	},
	mounted: function () {	
		
		

	}, 
	watch: {
		'valued'(){
			this.input = this.valued;			
		},
	    'input'(val,oldeval) {
			if(this.input){
				this.numd = this.input.gblen();
				if(this.isHz){
					this.numd = this.backHz(this.input);
				}				
			}else{
				this.numd = 0;
			}
			if(this.max>0 && this.numd>this.max){				
				this.input = oldeval;				
				return
			}
	    	this.$emit('input', this.input); 
	    	
	    	if(this.oType!='password'){
	    		return;
	    	}
	    	
	    	let p = this.chekFn(this.input);
	    	if(p){	    		
	    		this.setErr(p.cls,p.text);
	    		return
	    	}
	    	this.setErr('onIn','');
	    		      		      	
	    },
	    'form.mobile_zone'(val){
	    	let p = this.chekFn(this.input);
			
	    	if(p){
				if(p.text){
					p = p.text;
				}
	    		this.setErr("errd",p);
	    		return
	    	}
	    	if(this.passqd=='errd' && this.input){
	    		this.setErr('onIn','');
	    		return
	    	}
	    	this.$emit('setYzm',val);		   		      	
	    },
   	},
   	methods: {
   		monfocus(){
   			this.$refs.input.focus();
   		},
		backHz(str){
			let n =0;
			for (var i=0; i<str.length; i++) {  
				if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {  
					n++;  
				} 				
				n ++; 				
			} 
			return n;			
		},
		initData(){
			this.form.mobile_zone = 86;
			this.input = '';
			this.setErr('outIn','');	
		},
		setData(da){			
			this.input = da;
		},
		clearValue(){
			this.numd = 0;
			this.input="";
			
		},
   		setErr(cls,text){
			this.passqd=cls;
   	 		this.eeText=text;
   		},
   		chemima(data){
			this[data] = this[data]=='password'?'text':'password';
		},
   		focus(){
			
// 			let p = this.chekFn(this.input);
//	    	if(p){	    		
//	    		this.setErr(p.cls,p.text);
//	    		return
//	    	}
	    	this.setErr('onIn','');
			if(this.mfocus){
				this.mfocus();
				return
			}
   		},
   	 	blur(){
   	 		if(this.mblur){
   	 			this.mblur();
   	 			return
   	 		}
   	 		
			if(!this.input){
				this.setErr('outIn','');	
				return 
			}
			
   	 		let p = this.chekFn(this.input);
	    	if(p){	    		
	    		this.setErr(p.cls,p.text);
	    		return
	    	}
			this.setErr('outIn','');	
   	 	},
   	 	ajaxYzm(){
			if(this.timer!='获取验证码'){
				return
			}
			this.$emit('ajaxYzm');	
		},
		initYZM(){
			clearTimeout(this.setimed);		
			this.timer = '获取验证码';			
		},
		runTimer(num){
			this.timer = num +'秒后重试';
			if(num==0){
				this.timer = '获取验证码';
				return
			}
			this.setimed = setTimeout(()=>{
				num--;
				this.runTimer(num);
			},1000)
			
		}
   	},
   	
   	
   	
   	
}	
</script>

<style>
.lgoin_s2xx{
	margin-right: 19px;
}
</style>
