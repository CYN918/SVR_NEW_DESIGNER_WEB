<template>
	<div class="pr_list_01" @click="openCent">
		<div class="pr_list_02" :style="'background-image: url('+backBan(el.banner)+')'"></div>
		<div class="pr_list_02" v-if="el.banner == ''" :style="'background-image: url('+imgSig+'toltImg/Zoocreators_logo.svg'+')'"></div>
		<div class="pr_list_02x">
			<div class="pr_list_03 pp_wnz" 
			 
			:style="setTil(el.name)" 
			v-html="bakci(el.name,iscre)"></div>
			<div>
				<div style="width:60%;float:left;">
					<div class="pr_list_04">
						项目类型：<span>{{el.classify_name}}</span><i></i>制作周期：<span>{{el.production_cycle_d}}天{{el.production_cycle_h}}时</span> 
					</div>
					<div class="pr_list_06">
						预计收益:<span class="pr_list_07_1" v-if="el.settlement == '0'">[买断]{{el.expected_profit}}<i style="font-style: normal;color:#282828;font-size:14px;margin-left:5px;margin-right:5px;">或</i>[分成]永久收益</span><span class="pr_list_07_1" v-if="el.settlement == '1'">[买断]{{el.expected_profit}}</span><span class="pr_list_07_1" v-if="el.settlement == '2'">[分成]永久收益</span>
					</div>
				</div>
				<div style="width:40%;float:left;">
					<div class="pr_list_08" style="padding-top: 13px;">
						<span >
							<span>
								<div class="pr_cent_2_9" v-html="djtime"></div>
							</span>					
						</span>
					</div>
				</div>
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
		djs:Number,
		iscre:String
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
		bakci(sr,ck){
			if(!sr){
				return '';
			}
			if(!ck){
				return sr;
			}
			
			let on = sr.indexOf(ck);
			if(on==-1){
				return sr;
			}
			
			var re =new RegExp(ck);
			return sr.replace(re,"<span>"+ck+"</span>")
		},
		ovshow(e){
		
		},
		oushow(e){
		
		},
		backBan(o){

			if(!o || o==null || o==undefined || o=='null' || o=='undefined'){
				return 'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/com/no_img.svg';
			}
			return o;
		},
		openCent(){
			if(this.el.special_url){
				let rul = this.el.special_url.split('?')[0];
				window.open(rul+'?id='+this.el.id+'&type=prj');					
				return
			}
			if(this.el.id){
				window.open('/#/prcent?id='+this.el.id+'&type=prj')
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
/* .pr_list_01{
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
	
} */

.pr_list_01{
	cursor: pointer;
	position: relative;
	box-sizing: border-box;
	width:640px;
	height:354px;
	background:rgba(255,255,255,1);
	border-radius:5px;
}
.pr_list_01>div{
	display: inline-block;
}
.pr_list_02{
	margin-right: 15px;
	width:640px;
	height:240px;
	border-radius:5px;
	background-size:cover;
}
.pr_list_02x{
	width: 640px;
}
.pr_list_03{
	font-size:16px;
	color:rgba(40,40,40,1);
	line-height:22px;
	margin-bottom: 10px;
	padding-left: 10px;
	margin-top: 16px;
}
.pr_list_04{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
	margin-bottom: 10px;
	padding-left:10px;
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
	line-height:18px;
	padding-left:10px;
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
	margin-left: 5px;
	color: #FF9300;
	font-size: 14px;
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
	float: right;
	margin-right: 10px;
	
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
	width: 38px;
	height: 38px;
	border: 1px solid #D9D9D9;
	text-align: center;
	line-height: 38px;
	color: #FF9300;
	font-size: 24px;
	padding: 5px;
	margin: 5px;
}
</style>
