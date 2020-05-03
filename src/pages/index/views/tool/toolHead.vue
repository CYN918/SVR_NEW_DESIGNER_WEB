<template>
	<div class="toolHead">
		<div @click="backs()" class="toolHead_1">
			<i class="icon_jt_left"></i>
			<!-- <img :src="imgPath+'new/tools/icon_back.svg'"> -->
			返回
		</div>
		<div class="toolHead_2">
			<input
			 @focus="setFocus(1)"
			 @blur="setFocus('')"
			 v-model="value.title" type="text" placeholder="请输入来电秀名称">
			<span v-if="isfocus" class="toolHead_2_1">{{value.title.length}}/20</span>
			<img v-else :src="imgPath+'new/tools/n/icon_bj.svg'" />
		</div>
		<div class="toolHead_3">
			<span :class="el.cls" @click="clickFn(el.fn)" v-for="el in btns">{{el.n}}</span>
		</div>
	</div>
</template>

<script>
export default{
	props:{
		value:Object
	},
	data(){
		return{
			isfocus:'',
			btns:[
				{n:'保存',fn:'savs'},
				{n:'制作完成',fn:'over',cls:'noto_bys'}
			]
		}
	},
	methods:{
		clickFn(n,pr){
			this[n](pr);
		},
		setFocus(t){
			this.isfocus = t;
		},
		backs(){
			this.$router.push({path:'/toluser'});
		},
		savs(){
			this.parent.save();
		},
		over(){
			this.parent.over();
		}
	}
}
</script>

<style>
.toolHead{
	display: flex;
	flex-direction: center;
	position: relative;
	text-align: center;
	background: #fff;
	height: 48px;
	width: 100%;
	-webkit-box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
	box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
	z-index: 3;
}
.toolHead_1{
	cursor: pointer;
	margin: 12px 0 0 16px;
	line-height: 28px;
	font-size:14px;
	color:rgba(102,102,102,1);
	text-shadow:0px 4px 8px rgba(0,0,0,0.05);
}

.icon_jt_left{
	
	position: relative;
	display: inline-block;
	vertical-align: top;
	overflow: hidden;
	width: 24px;
	height: 24px;
}
.icon_jt_left:after{
	content: "";
	position: absolute;
	top: 50%;
	left: 50%;
	width: 8px;
	height: 8px;
	transform: rotate(-45deg) translate(10%,-50%);
	border-top: 1.5px solid #666;
	border-left: 1.5px solid #666;
}	
.toolHead_2{
	flex: 1;
}


.toolHead_3{
	position: relative;
	margin: 8px 8px 0 0;
}
.toolHead_3>span {
	display: inline-block;
	vertical-align: top;
	cursor: pointer;
	width: 78px;
	height: 30px;
	background: rgba(255, 255, 255, 1);
	border-radius: 5px;
	border: 1px solid rgba(187, 187, 187, 1);
	font-size: 14px;
	text-align: center;
	color: rgba(102, 102, 102, 1);
	line-height: 30px;
	margin-left: 15px;
}
.toolHead_3>span:hover {
	opacity: .7;
}
.toolHead_3>.noto_bys {
	background: #33B3FF;
	border-color: #33B3FF;
	color: #fff;
}

.toolHead_2{
	flex: 1;
	margin-top: 14px;
	line-height: 20px;
}
.toolHead_2>input {
	text-align: right;
	display: inline-block;
	vertical-align: top;
	border: none;
	background: none;
	font-size: 14px;
	color: rgba(30, 30, 30, 1);
	line-height: 20px;
}
.toolHead_2_1{
	margin-left: 10px;
	line-height: 22px;
	font-size: 14px;
	color: rgba(187,187,187,1);
}
</style>
