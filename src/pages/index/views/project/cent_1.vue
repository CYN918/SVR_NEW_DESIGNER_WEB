<template>
	<div @click="openCent()" class="pr_cent_1">
		<img class="pr_cent_1_1" :src="el.banner" alt="">
		<div class="sjxd" v-if="el.extra_reward">
			额外奖金¥{{el.extra_reward}}
		</div>
		<div class="pr_cent_2">
			<div class="pr_cent_2_1">
				<div class="pr_cent_2_2">{{el.name}}</div>
				<div class="pr_cent_2_3">项目类型：{{el.classify_name}}</div>
				<div class="pr_cent_2_4">领域范围：<span v-for="(ed,index) in el.fields">{{ed}}</span></div>				
			</div>
			<div class="pr_cent_2_5">
				<div class="pr_cent_2_6">
					<img class="cicon" src="/imge/project/01.png" alt="">{{el.expected_profit}}
				</div>
				<div class="pr_cent_2_7">
					<span class="pr_cent_2_7zy">
						<div class="pr_cent_2_8"><img class="cicon" src="/imge/project/02.png" alt="">报名人数</div>
						<div class="pr_cent_2_9"><span class="pr_hs">{{el.sign_up_num}}</span></div><i></i></span>
					<span>
						<div class="pr_cent_2_8"><img class="cicon" src="/imge/project/03.png" alt="">报名时间</div>						
						<div class="pr_cent_2_9">
							<span v-for="(od,name) in el.left_time" :key="name">
								<span class="pr_hs">{{od}}</span>{{name}}
							</span>
						</div>
					</span>
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
		djs:{
			type:Number,
			default:0,
		}
	},
	data(){
		return{
			shareData:{},
		}
	},
	methods: {	
		openCent(){
			if(this.el.id){
				window.open('/#/prcent?id='+this.el.id)
			}
			
		}
	}
}
</script>

<style>
.pr_cent_1{
	position: relative;
	width:640px;
	height:232px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	cursor: pointer;
}
.pr_cent_1_1{
	display: block;
	position: absolute;
	bottom: 20px;
	left: 20px;
	background: rgba(244,246,249,1);
	overflow: hidden;
	width:310px;
	height:232px;
	box-shadow:0px 5px 15px 0px rgba(0,0,0,0.1);
	border-radius:5px 5px 5px 5px;
}
.sjxd{
	position: absolute;
	top: 0;
	right: 21px;
	width:65px;
	height:58px;
	background:rgba(255,81,33,.1);
	border-radius:0px 0px 2px 4px;
	font-size:12px;
	text-align: center;
	font-weight:400;
	color:rgba(255,81,33,1);
	line-height:17px;
	box-sizing: border-box;
	padding: 5px;
}
.sjxd:after{
	content: "";
	position: absolute;
	bottom: 0;
	left: 0;
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0;
    border-left: 32.5px solid transparent;
    border-right: 32.5px solid transparent;
    border-bottom: 9px solid #fff;

}
.pr_cent_2{
	margin-left: 350px;
	padding-top: 20px;
}
.pr_cent_2_1{
	width: 210px;
	border-bottom: 1px solid rgba(216,216,216,.3);
	margin-bottom: 11px;
}
.pr_cent_2_2{
	margin-bottom: 10px;
	font-size:16px;
	font-weight:400;
	color:rgba(40,40,40,1);
	line-height:22px;
	overflow: hidden;
	white-space: nowrap;
}
.pr_cent_2_3{
	font-size:12px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:18px;
	margin-bottom: 6px;
}
.pr_cent_2_4{
	font-size:12px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:18px;
	margin-bottom: 21px;
}
.cicon{
	display: inline-block;
	vertical-align: middle;
	margin-right: 5px;
	width: 26px;
	height: 26px;
}
.pr_cent_2_6{
	font-size:14px;
	font-weight:600;
	color:rgba(255,81,33,1);
	line-height:20px;
	margin-bottom: 10px;
}
.pr_cent_2_7>span{
	display: inline-block;
	vertical-align: top;
	width: 110px;
	margin-right: 24px;
}
.pr_cent_2_7zy{
	position: relative;
}
.pr_cent_2_7zy>i{
	position: absolute;
	top: 5.5px;
	right: 0;
	width: 1px;
	height: 15px;
	background: rgba(151,151,151,.3);
}
.pr_cent_2_8{
	height: 26px;
	line-height: 26px;
	font-size:12px;
	font-weight:400;
	color:rgba(187,187,187,1);

}
.pr_hs{
	font-size:14px;
	font-weight:400;
	color:rgba(255,81,33,1);
	line-height:20px;
}
.pr_cent_2_9{
	text-align: right;
	text-indent: 30px;
}

.pr_cent_2_9{
	font-size:12px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:18px;	
	white-space: nowrap;
}
</style>
