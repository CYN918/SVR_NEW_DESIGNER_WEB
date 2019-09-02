<template>
	<div @click="openCent()" class="pr_cent2_1">
		<div class="pr_cent2_2">
			<img class="pr_cent2_3" :src="el.banner"/>
			<div class="pr_cent2_rs" v-if="el.status==1 || el.status==2">{{el.sign_up_num}}人已报名</div>
			<div class="pr_cent2_r2" v-html="backBtm()">
				
				
				
			</div>
		</div>
		<div class="pr_cent2_4">
			<div class="pr_cent2_5">
				<div class="pr_cent2_6">{{el.name}}</div>
				<div class="pr_cent2_7">项目类型：{{el.classify_name}}</div>
				<div class="pr_cent2_8">领域范围：<span v-for="(ed,index) in el.fields">{{ed}}</span></div>	
			</div>
			<div class="pr_cent2_9">
				<div class="pr_cent2_10">
					<div>预计收益：{{el.expected_profit}}</div>
				</div>
			</div>
		</div>
		<img v-if="el.status==5" class="pr_cent2_js" :src="'/imge/project/'+(el.deal_type==1?'md':'fc')+'.svg'" alt="">
		<div class="sjxd" v-if="el.extra_reward">
			额外奖金¥{{el.extra_reward}}
		</div>
	</div>
	<!-- <div @click="openCent()" class="pr_cent_1">
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
					<img class="cicon" src="/imge/project/02.svg" alt="">{{el.expected_profit}}
				</div>
				<div class="pr_cent_2_7">
					<span class="pr_cent_2_7zy">
						<div class="pr_cent_2_8"><img class="cicon" src="/imge/project/03.svg" alt="">报名人数</div>
						<div class="pr_cent_2_9">
							<span class="pr_hs">{{el.sign_up_num}}</span>
						</div><i></i></span>
					<span>
						<div class="pr_cent_2_8"><img class="cicon" src="/imge/project/01.svg" alt="">报名时间</div>						
						<div class="pr_cent_2_9" v-html="djtime">
							<span v-for="(el2,keys) in el.left_time" :key="keys">
								<span class="pr_hs">'+(el2>9>el2:'0'+el2)+'</span>keys
							</span>
						</div>
					</span>
				</div>
			</div>
		</div>
	</div> -->
</template>

<script>

export default {
	
	props:{
		el:{
			type:Object,
			default:{}
		},	
	
	},
	data(){
		return{
			shareData:{},
			djtime:'',
			tips:[
				'',
				'截稿时间：2019/07/07  17:00前',
				'',
				'',
				'',				
			],
			
		}
	},
	mounted: function(){
		this.init();
		this.backtims();
	}, 
	
	methods: {	
		init(){
			
		},
		bckdtimed(t){
			console.log(new Date(t.replace(/-/g,'/')))
			let times =new Date(t.replace(/-/g,'/')),
			Y = times.getFullYear(),
			M = times.getMonth(),
			D = times.getDate(),
			h = times.getHours(),
			m = times.getMinutes();
			return [(Y+'/'+M+'/'+D),(h+':'+m)];
		},
		backBtm(){
			
			if(this.el.status==1){
				return '<div class="pr_cent2_r2_1 backdse"><span><span>'+this.el.left_time.d+'</span>天<span>'+this.el.left_time.h+'</span>时<span>'+this.el.left_time.m+'</span>分<span>'+this.el.left_time.s+'</span>秒</span>后截止报名</div>';
			}
			if(this.el.status==2){
				return '<div class="backdse pr_cent2_r2_2">报名已截止，等待平台选标</div>';
			}
			if(this.el.status==3){
				if(this.el.is_de){
					return '<div class="backdse pr_cent2_r2_2">你已延期01天14小时，请尽快完成</div>';
				}
				
				let otim = this.bckdtimed(this.el.deadline);
				
				return '<div class="pr_cent2_r2_1 backdse"><span>截稿时间：<span>'+otim[0]+'</span></span><span><span>'+otim[1]+'前</span></span></div>';
			}
			
			if(this.el.status==4){
				return '<div class="backdse pr_cent2_r2_2">稿件已提交，请等待验收审核</div>';
			}
			if(this.el.status==5){
				return '<div class="backdse pr_cent2_r2_2">项目已验收，感谢与你的本次合作</div>';
			}
			
		},
		openCent(){
			if(this.el.id){
				window.open('/#/prcent?id='+this.el.id)
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
				this.$parent.getData();
				return
			}
			this.djtime = '<span><span class="pr_hs">'+a.d+'</span>d<span class="pr_hs">'+(a.h>9?a.h:'0'+a.h)+'</span>h<span class="pr_hs">'+(a.m>9?a.m:'0'+a.m)+'</span>m<span class="pr_hs">'+(a.s>9?a.s:'0'+a.s)+'</span>s</span>';	
		
		}
	}
}
</script>

<style>
.pr_cent2_1{
	position: relative;
	width:600px;
	height:212px;
	padding: 20px;
	background:rgba(255,255,255,1);
	border-radius:5px;
}
.pr_cent2_2{
	position: relative;
	display: inline-block;
	vertical-align: top;
	margin-right: 20px;
	overflow: hidden;
	width:283px;
	height:212px;
	box-shadow:0px 5px 15px 0px rgba(0,0,0,0.1);
	border-radius:5px 5px 5px 5px;
}
.pr_cent2_3{
	display: block;
	width: 100%;
	height: 100%;
}
.pr_cent2_4{
	display: inline-block;
	vertical-align: top;
	width:290px;
}
.pr_cent2_5{
	width:290px;
	border-bottom: 1px solid rgba(216,216,216,.3);

}
.pr_cent2_6{
	font-size:16px;
	color:rgba(40,40,40,1);
	line-height:22px;
	margin-bottom: 10px;
}
.pr_cent2_7,.pr_cent2_8{
	font-size:12px;
	color:rgba(187,187,187,1);
	
}
.pr_cent2_7{
	margin-bottom: 4px;
	line-height:18px;
}
.pr_cent2_8{margin-bottom: 20px;line-height:22px;}
.pr_cent2_8>span{
	display: inline-block;vertical-align: top;
	margin-right: 5px;
	margin-bottom: 5px;
	padding: 0 8px;
	height: 22px;
	background:rgba(244,246,249,1);
	border-radius:5px;
}
.pr_cent2_rs{
	position: absolute;
    right: 5px;
    top: 5px;
    padding: 1px 8px;
	background:rgba(0,0,0,.5);
	border-radius:3px;
	font-size:12px;
	color:rgba(255,255,255,1);
	line-height:20px;
}
.pr_cent2_r2{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height:32px;
	
	
}
.pr_cent2_r2>div{
	border-radius:0px 0px 5px 5px;
	text-align: center;	
	line-height:32px;
	height: 100%;
	width: 100%;
}

.backdse{
	background:rgba(0,0,0,.7);
}
.pr_cent2_r2_1{		
	font-size:12px;
	color:rgba(255,255,255,.7);		
}
.pr_cent2_r2_1>span{
	margin-right: 4px;
}
.pr_cent2_r2_1>span>span{
	font-family: PingFang SC Medium;
	font-size: 16px;
	margin:0 1px;
	color:rgba(255,255,255,1);
}
.pr_cent2_r2_2{
	font-size:14px;
	color:rgba(255,255,255,1);
}
.pr_cent2_js{
	position: absolute;
    bottom: 80px;
    right: 5px;
    width: 98px;
	
}
</style>
