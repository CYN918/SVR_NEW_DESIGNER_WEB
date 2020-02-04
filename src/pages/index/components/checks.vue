<template>
	<div class="psh_span_1">
		<span 
		@click="check1(el)" 
		:class="checkArr.indexOf(el)!=-1?'check':''" 
		v-for="el in tags"
		>{{el}}</span>
		<div class="addM_n_1">
			<input 
			@keyup.enter="keyups" 
			@focus="infous1" 
			@blur="ninfous1" 
			maxlength="9"
			v-model="newTaga" 
			:placeholder="plac2" 
			type="text" ref="keydown2"/>
			<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/new/icon_add.svg"/>
		</div>
		
	</div>
</template>

<script>
export default {
	props:{
		cfg:Array,
		value:Array
	},
	data(){
		return{
			tags:[],
			checkArr:[],
			newTaga:'',
			isfus_a:'',
			plac2:'标签'
		}
	},
	watch: {		
	    'checkArr'() {
	    	this.$emit('input', this.checkArr); 
	    },
		'newTaga'(a,b){
			if(a.length>4){
				this.newTaga = a.substring(0,4);				
			}			
		},									
	},
	mounted: function(){
		this.init();
	}, 

	methods: {
		infous1(){
			this.plac2 = '请输入最多4个文字回车结束';
		},
		ninfous1(){
			this.newTaga = '';
			this.plac2 = '标签';
		},				
		init(){
			console.log()
			this.tags = this.cfg;
			this.checkArr = this.value;
		},
		keyups(){
			let on = this.tags.indexOf(this.newTaga);
			if(on==-1){
				this.tags.push(this.newTaga);
				this.$refs.in.blur();
				
				return
			}
			this.$message({
				message:'标签已存在'
			})
			return
		},
		check1(el){
			let on = this.checkArr.indexOf(el);
			if(on==-1){
				this.checkArr.push(el);				
				return
			}
			this.checkArr.splice(on,1);
		},
		isfus(){
			this.isfus_a = 1;
		},
		qktag(){
			this.newTaga = '';
			this.isfus_a = '';
		},
		setM(arr){
			this.checkArr = arr;
		},
	}
	
	
}
</script>

<style>
.psh_span_1>span{
	cursor: pointer;
	display: inline-block;
	vertical-align: top;
	padding: 0 16px;
	height:30px;
	background:rgba(255,255,255,1);
	border-radius:16px;
	border:1px solid rgba(187,187,187,1);
	font-size:14px;
	margin-right: 10px;
	margin-bottom: 15px;
	color:#666;
	line-height:30px;
	text-align: center;
	
	
}
.psh_span_1>span.check,.psh_span_1>span:hover{
	background: #33B3FF;
	color: #fff;
	border-color: #33B3FF;
}
/* .newTag{
	display: inline-block;
	vertical-align: top;
	position: relative;
	width:80px;
	height:22px;
	background: #F4F5F7;
	border-radius:3px;
	border:1px dashed rgba(165,173,186,1);
	font-size:12px;
	color:rgba(151,160,175,1);
	line-height:22px;
}
.newTag>input{
	box-sizing: border-box;
	padding: 0 10px;
	width: 100%;
	height: 100%;
	border: none;
} */
.addM_n_1{
	display: inline-block;
	position: relative;	
}
.addM_n_1>img{
    position: absolute;
    left: 12px;
    top: 9px;
    width: 14px;
}
.addM_n_1>input{
	outline: none;	
	display: inline-block;
	box-sizing: border-box;
	padding: 0 15px 0 34px;
	width: 79px;
	height:32px;
	font-size:14px;
	background:rgba(255,255,255,1);
	border-radius:16px;
	border:1px solid rgba(187,187,187,1);
}
.addM_n_1>input:focus{
	width:228px;
}
</style>
