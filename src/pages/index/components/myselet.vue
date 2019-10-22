<template>
	
	<div :class="['msc_1',isfuse]" ref="zbwz">

		<input v-model="mode1" placeholder="请选择" @focus="cs" @blur="bfn" autocomplete="off" readonly="readonly" type="text" />
		<i></i>
		<div v-if="isfuse" class="msc_2">
			<div @click="xzz(e[v],k?e[k]:i)" v-for="(e,i) in List" :key="k?e[k]:i" :class="e[v]==mode1?'onca':''">{{e[v]}}</div>			
		</div>
	</div>

</template>

<script>
export default {
	props: {
		List:Array,
		v:String,
		k:String
	},
	data(){
		return{
			mode1:'',
			mode2:'',
			isfuse:'',
		}
	},
	watch: {
		'mode2'(){
			this.$emit('input', this.mode2); 
		}
	},
	methods: {
		cs(){
			this.isfuse='isfuse';
			console.log(this.$refs.zbwz);
		},
		bfn(){
			setTimeout(()=>{
				this.isfuse='';
			},200);
			
		},
		xzz(a,b){	
			this.mode1 = a;
			this.mode2 = b;
		}
	}
	
	
}
	
	
	
</script>

<style>
.msc_1{
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 40px;
	font-size: 14px;
	line-height: 40px;
	border-bottom: 1px solid #ddd;
}	
.msc_1>input{
	position: absolute;
	top: 0;
	left: 0;
	/*-webkit-opacity: 0;
	opacity: 0;*/
	width: 100%;
	height: 100%;
	border: none;
	background: no-repeat;
	
}
.msc_1>input:focus .msc_2{
	display: block;
}	
.msc_2{
	z-index: 9999;
	position: absolute;
	top:40px;
	padding: 10px 0;
	width:300px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;
	font-size:14px;
	line-height:40px;
	color:rgba(51,51,51,1);
}	
.msc_2>div{
	cursor: pointer;
	box-sizing: border-box;
	padding: 0 20px;
	height: 40px;
}

.msc_2>div.onca{
	color: #33B3FF;
}
.msc_2>div:hover{
	background:rgba(242,242,242,1);
}

.msc_1>i{
	position: absolute;
	right: 0;
	top: 1px;
	width: 10px;
	height: 100%;
}


.msc_1>i:after{
    content: "";
    display: inline-block;
    position: absolute;
    top: 39%;
    right: 17%;
    width: 5px;
    height: 5px;
    border: 1px solid #ddd;
    border-bottom: 0;
    border-right: 0;
	transition: transform .4s;
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
    transform-origin: center;
}
.isfuse>i:after{
	-webkit-transform: rotate(45deg) translate(3px,2px);
    transform: rotate(45deg) translate(3px,2px);
}
</style>