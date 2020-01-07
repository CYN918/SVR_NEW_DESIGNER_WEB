<template>
	<div class="pr_list_01" @click="openCent">
		<div class="pr_list_02" :style="'background-image: url('+backBan(el.banner)+')'"></div>
		<div class="pr_list_02x">
			<div class="pr_list_03" :style="setTil(el.name)">{{el.name}}</div>
			<div class="pr_list_04">
				项目类型：<span>{{el.classify_name}}</span><i></i>制作周期：<span>13天</span> 
			</div>
			<div class="pr_list_05">
				<span v-for="ed in el.fields">{{ed}}</span>
			</div>
			<div class="pr_list_06">
				<img :src="imgPath+'project/03.svg'"/>预计收益
			</div>
			<div class="pr_list_07">
				<span class="pr_list_07_1">
					{{el.expected_profit}}
				</span>
				<span  class="pr_list_07_2" v-if="el.extra_reward && el.extra_reward!='0.00'">
					<img :src="imgPath+'new/project/icon_ewjj.svg'"/> + ¥{{el.extra_reward}}
					
					<div class="tip_ew">
						有额外奖金的项目，通常为交稿时间较急、或难度较大，也可能会是平台福利项目，额外奖金将在正常项目验收后计入最终成交价格内。
					</div>
				</span>
			</div>			
			<div class="pr_list_08">
				<span>
					<span class="pr_list_06">
						<img :src="imgPath+'project/10.svg'"/>已报名人数
					</span>
					<div class="pr_list_08_1">{{el.sign_up_num}}<span>人</span></div>
				</span>
				<i></i>
				<span >
					<span class="pr_list_06">
						<img  :src="imgPath+'project/01.svg'"/>报名时间
					</span>
					
					<span>
						<div class="pr_cent_2_9" v-html="djtime"></div>
					</span>					
				</span>
			</div>
		</div>
		
		
		
	</div>	
</template>

<script>

export default {
	
	props:{
		el:{
			type:Object,
			default:{}
		},	
		djs:Number
	
	},
	data(){
		return{
			shareData:{},
			djtime:'',
		}
	},
	mounted: function(){
		this.backtims();
	}, 
	watch: {
		'djs'(){
		
			this.backtims();
		}
	},
	methods: {	
		ovshow(e){
			console.log(e)
		},
		oushow(e){
			console.log(e)
		},
		backBan(o){

			if(!o || o==null || o==undefined || o=='null' || o=='undefined'){
				return 'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/com/no_img.svg';
			}
			return o;
		},
		openCent(){
			if(this.el.special_url){
				window.open(this.el.special_url);			
				return
			}
			if(this.el.id){
				window.open('/#/prcent?id='+this.el.id)
			}
			
		},
		setTil(str){
			if(!str){return}
			if(str.substring(0,1)=='【'){
				return 'text-indent:-7px';
			}
		},
		backtims(){
			let a = this.el.left_time;
			if(!a || a.length==0){return}
			let str = '';
			if(a.s>0){
				a.s--;	
				
			}else
			
			if(a.m>0){
				a.s = 59;
				a.m--;
			}else
			if(a.h>0){
				a.s = 59;
				a.m = 59;
				a.h--;
				
			}else
			if(a.d>0){
				a.s = 59;
				a.m = 59;
				a.h = 23;
				a.d--;
				
			}else{
				this.$parent.$parent.djsjs();
				return
			}
			let strtime = '';
			if(a.d>0){
				strtime+='<span><span class="pr_hs f_a newFa">'+a.d+'</span>天';
			}
			this.djtime = strtime+'<span class="pr_hs f_a newFa">'+(a.h>9?a.h:'0'+a.h)+'</span>时<span class="pr_hs f_a newFa">'+(a.m>9?a.m:'0'+a.m)+'</span>分<span class="pr_hs f_a newFa">'+(a.s>9?a.s:'0'+a.s)+'</span>秒</span>';	
		
		}
	}
}
</script>

<style>
.pr_list_01{
	cursor: pointer;
	position: relative;
	padding: 20px;
	box-sizing: border-box;
	width:640px;
	height:232px;
	background:rgba(255,255,255,1);
	border-radius:5px;
}
.pr_list_01>div{
	display: inline-block;
	vertical-align: top;
}
.pr_list_02{
	margin-right: 15px;
	width:257px;
	height:192px;
	box-shadow:0px 5px 15px 0px rgba(0,0,0,0.1);
	border-radius:5px;
	background-size:cover;
}
.pr_list_02x{
	width: 323px;
}
.pr_list_03{
	font-size:16px;
	color:rgba(40,40,40,1);
	line-height:22px;
	margin-bottom: 10px;
}
.pr_list_04{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
	margin-bottom: 10px;
}
.pr_list_04>i{
	display: inline-block;
	vertical-align: top;
	margin: 3px 20px;
	width:1px;
	height:12px;
	background:rgba(216,216,216,.3);

}
.pr_list_05{
	border-bottom: 1px solid rgba(216,216,216,.3);
	height: 34px;
	margin-bottom: 10px;
}
.pr_list_05>span{
	display: inline-block;
	vertical-align: top;
	padding: 0 8px;
	line-height: 22px;
	background:rgba(244,246,249,1);
	border-radius:5px;
	font-size:12px;
	color:rgba(187,187,187,1);
	margin-right: 5px;
}
.pr_list_06{
	line-height: 18px;
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px
}
.pr_list_06>img{
	display: inline-block;
	vertical-align: top;
	margin-right: 6px;
	width: 18px;
	height: 18px;
}
.pr_list_07{
	font-size:14px;
	color:rgba(255,146,0,1);
	line-height:22px;
	margin-bottom: 10px;
}
.pr_list_07_1{
	margin: 0 6px 0 24px;
}
.pr_list_07_2{
	cursor: pointer;
	position: relative;
	display: inline-block;
	vertical-align: top;
	padding: 0 7px;
	height:22px;
	background:rgba(255,146,0,.1);
	border-radius:2px;
}
.pr_list_07_2>img{
	display: inline-block;
	vertical-align: top;
	margin-top: 5px;
}
.pr_list_08>span{
	display: inline-block;
	vertical-align: top;
	
}
.pr_list_08>span:nth-child(1){
	width: 124px;
}
.pr_list_08>i{
	position: relative;
	display: inline-block;
	vertical-align: top;	
	width:1px;
	height:24px;
	background:rgba(216,216,216,.3);
	margin: 8px 41px 0 0;
}

.pr_list_08>span:nth-child(3){
	width: 145px;
}
.pr_list_08_1{
	margin-left: 24px;
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.pr_list_08_1>span{
	font-size:12px;
	color:rgba(187,187,187,1);
	margin-left: 2px;
}
.pr_list_07_2:hover .tip_ew{
	display: block;
}
.tip_ew{
	display: none;
	position: absolute;
	z-index: 10;
	bottom: 30px;
	left: 50%;
	-webkit-transform: translateX(-50%);
	transform: translateX(-50%);
	padding: 14px 16px;
	width:232px;
	height:124px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius: 5px;
	font-size:14px;
	box-sizing: border-box;
	color:rgba(51,51,51,1);
	line-height:20px;
}
.tip_ew:after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -8px;
    width: 10px;
    height: 10px;
    background: #fff;
    -webkit-transform: rotate(45deg) translateX(-50%);
    transform: rotate(45deg) translateX(-50%);
    border-right: 0;
    border-bottom: 0;
}
.pr_cent_2_9{
	font-size: 12px !important;
	color:rgba(187,187,187,1);
}
.newFa{
	margin: 0 2px;
	
}
</style>
