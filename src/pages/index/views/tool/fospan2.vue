<template>
	<div class="spam_so_f">
		<div ref="boxs">
			<span 
			v-for="el in lists"
			@click="qh(el[keys])"
			:class="[el[keys]==value?'chekd':'']"
			>{{el[v]}}</span>
			<span @click="showFn">更多 <i :class="['el-icon-arrow-down',isCc?'selicon':'selicoc']"></i></span>
		</div>
		<div v-if="isCc" class="spam_so_f_1">
			<span
			v-for="el in molist"
			@click="qh(el[keys])"
			:class="[el[keys]==value?'chekd':'']"
			>{{el[v]}}</span>
		</div>
	</div>
</template>

<script>
export default{
	props:{
		List:Array,
		keys:{
			type:String,
			default:'k',
		},
		v:{
			type:String,
			default:'v',
		},
		value:String,
		
	},
	data(){
		return{
			lists:[],
			sl:0,
			molist:[],
			isCc:'',
			
		}
		
	},
	watch:{
		List(){
			this.setfn();
		}
	},
	beforeDestroy:function(){
		/*清除事件监听*/
		window.removeEventListener('resize',this.setfn);		
	},
	methods:{
		qh(en){
			this.isCc = '';
			if(this.value==en){
				en = '';
				return;
			}
			this.$parent.scrolls();
			this.$emit('input',en);
		},
		setfn(){
			let wdth =  this.$refs.boxs.getBoundingClientRect().width;
			this.sl = parseInt(wdth/120)*2;
			let len = this.List.length;
			this.lists = this.List.slice(0,this.sl-1);	
			this.molist = this.List.slice(this.sl-1,len);	
		},
		init(){
			this.setfn();
			window.addEventListener('resize',this.setfn,false);
		},
		showFn(e){
			if (e && e.stopPropagation()) {
				e.stopPropagation();
			} else {
				e.cancelBubble = false;
			}
			if (this.isCc == 1) {
				this.isCc = '';
				return
			}
			this.isCc = 1;
			
			document.onclick = () => {
				this.isCc = '';
				
				document.onclick = null;
			}
		},
	},
	mounted(){
		this.init();
	}
}	
</script>

<style>
.spam_so_f{
	position: relative;
}
.spam_so_f_1{
	position: absolute;
	bottom: 0;
	padding: 10px 24px;
	border-radius: 8px;
	padding-top: 24px;
	z-index: 9;
	left: -20px;
	width: 90%;
	transform: translateY(100%);
	
	
	background:rgba(255,255,255,1);
	box-shadow:0px 8px 32px 0px rgba(0,0,0,0.1);
	
}
</style>
