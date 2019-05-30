<template>
	<div class="tancBox">
		<div class="tanc1 tancBoxBg">
			<div class="tctile">{{cg.title}}</div>
			<div class="botnbox">
				<span @click="clickFn(el.fn)" :class="el.cls" v-for="(el,index) in cg.btns">{{el.n}}</span>
			</div>
			<img @click="clickFn('close')" src="/imge/cj_00.png" class="tctilex pend">
		</div>
		
	</div>
</template>
<script>
export default {
	props:{
		cg:{
			title:{
				type:String,
				default:'狮圈提示'
			},
			btns:{
				type:Array,
				default:[{n:'确定',fn:'tcOk'}],
				
			},
			closeFn:{
				type:String,
				default:'close'
			},
		}
	},
	name: 'tancQr',
	methods: {
		clickFn(fn){
			console.log(fn);
			this.$parent[fn]();
		}
	}
	
}
</script>

<style>
	
.tancBoxBg{
	box-sizing: border-box;
	padding: 20px 30px;
	min-width: 420px;
}
.tctile{
	margin-bottom: 27px;
	font-size:14px;
	font-weight:400;
	color:rgba(30,30,30,1);
	line-height:20px;
}
.tctilex{
	position: absolute;
	right: -41px;
	top: -41px;
	width: 36px;
	height: 36px;
}
.botnbox>.ysHei{
	background: #333333;
	color: #fff;
	border-color: #333333;
}
</style>
