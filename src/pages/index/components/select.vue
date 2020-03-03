<template>
	<div :class="['citysbos',opType]">
		<input class="citysbos1" v-model="input" type="text" :placeholder="prd">
		<div @click="check" class="citysbos2">
		</div>
		<div class="citysbosx3">
			<div>
				<span @click="check1(index)" v-for="(el,index) in Data" :key="index">{{el.n}}</span>				
			</div>
		</div>
		<div @click="check" class="fiddf"></div>
	</div>
</template>

<script>
export default {
	props:{
		valued:{
			default:-1,
		},
		Data:Array,
		prd:{
			default:'请选择'
		}
	},
	data(){
		return{
			opType:'',			
			gjOn:0,
			input:'',
		}
	},
	mounted: function () {	
		
		this.gjOn = this.valued;
		// this.setData();	
	}, 
	watch: {
		'valued'(){
			
			if(this.gjOn==this.valued){
				return
			}
			this.gjOn = this.valued;
			this.input = this.Data[this.gjOn].n;
			
		},
	    'input'(val) {

			this.input = val;
	    	this.$emit('input', this.input); 	    		      		      	
	    },
	},
	methods: {

		setData(){

			this.input = this.Data[this.gjOn].n;
		},
		check(){
			this.opType = this.opType==''?'opType':'';
			// this.setData();
		},
		check1(on){	
			this.gjOn =on;
			this.check();
			this.setData();
		},
	}
}
</script>

<style>
.citysbosx3{
	display: none;
	position: absolute;
	bottom: 0;
	left: 0;
	background: #FFFFFF;
	box-shadow: 0 3px 6px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 292px;
	text-align: left;
	transform: translateY(100%);
	z-index: 12;
    padding: 10px;
	height: 140px;
	width: 100%;
	overflow: hidden;
	overflow-y: auto;
}
.opType .citysbosx3{
	display: block;
}


.citysbosx3>div>span{
	display: block;
	height: 30px;
	line-height: 30px;
	text-align: center;
	margin-bottom: 6px;
}
.citysbosx3>div>span:hover{
	background:  #D8D8D8;
	cursor: pointer;
	opacity: .7;
}
.citysbosx3::-webkit-scrollbar {
    width: 6px;     
    height: 1px;
}
.citysbosx3::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;
}
.citysbosx3::-webkit-scrollbar-track {
    background: none;
}
.fiddf{
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9;
}
.opType .fiddf{
	display: block;
}
</style>