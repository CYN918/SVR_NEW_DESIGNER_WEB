<template>
		<el-form-item :prop="setDatax.po">
			<div v-if="setDatax.type=='user'">							
				<el-select class="lgoin_s1" v-model="form[setDatax.model]">
					<el-option
					v-for="item in xnData"
					:key="item.label"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
				<el-input class="lgoin_s2" v-model="form[setDatax.model]" :placeholder="setDatax.placeholder"></el-input>
			</div>
			<div v-if="setDatax.type=='password'">
				<el-input class="lgoin_s3" v-model="form[setDatax.model]" :type="midf" :placeholder="setDatax.placeholder"></el-input>
				<div class="iconfont pend mad" @click="chemima">
					<span  v-if="mim">&#xe61f;</span>
					<span  v-else>&#xe6a2;</span>
				</div>	
			</div>
		</el-form-item>
</template>

<script>
export default {
	name: 'commde',
	props:['setDatax'],
	data(){
		return{
			midf:"password",
			mim:true,
			type:0,
			form:{
				qh:'86',
			},
			rules: {
				user: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
				],
				password:[
					{ required: true, message: '密码不能为空', trigger: 'blur' },
				]
			},
			input1:'86',
			input2:'',
			islgoin_s4:'',
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
			input3:'',
		}
	},
	mounted: function () {	
		
		console.log(this.setDatax)
	}, 
	methods: {
		setData(){
			return this.form;
		},
		chemima(){
			this.midf = this.midf=='password'?'text':'password';
			this.mim = this.mim==true?false:true;
		},
		cheackLogin(on){
			this.midf = 'password';
			this.mim = true;
			this.type=on;			
		},
		onSubmit(){
			console.log(1);
		},
		setTimer(){
			if(this.timer!='获取验证码'){
				return
			}
			if(!this.input3){
				return
			}
			this.runTimer(60);
			
		},
		runTimer(num){
			this.timer = num;
			if(num==0){
				this.timer = '获取验证码';
				return
			}
			setTimeout(()=>{
				num--;
				this.runTimer(num);
			},1000)
			
		}
	}

}
</script>

<style>
</style>
