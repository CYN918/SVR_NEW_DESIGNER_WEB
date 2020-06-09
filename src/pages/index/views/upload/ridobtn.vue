<template>
	<span class="up_zp_01">
		<span :class="value==el.v?'chckd':''" @click="checkfn(el.v)" v-for="el in option">{{el.k}}</span>
	</span>		
</template>
<script>
export default{
	props:{value:String,option:Array},
	methods:{
		checkfn(n){
			this.$emit('input',n)
		}
	}
}
</script>

<style>
.up_zp_01{
	display: inline-block;
	vertical-align: top;
}
.up_zp_01>span{
	display: inline-block;
	vertical-align: top;
	width:42px;
	height:22px;
	font-size:14px;
	color:#BBBBBB;
	line-height:22px;
	text-align: center;
	cursor: pointer;
	border:1px solid rgba(217,217,217,1);

}
.up_zp_01>span:hover{
	opacity: .7;
}
.up_zp_01>span:nth-child(1){
	border-radius:4px 0px 0px 4px;	
}
.up_zp_01>span:nth-child(2){
	border-radius:0 4px 4px 0;
}
.up_zp_01>span.chckd{
	background:rgba(51,179,255,1);
	color: #fff;
	border-color:rgba(51,179,255,1);
}

</style>
