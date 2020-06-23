<template>
	<div>
		<div class="ps_zb_box">
			<div class="ps_zp_02">
				作品投稿<span>一经验收，永久分成</span>
				<div class="ps_zp_03">
					<span v-for="el in navs" @click="qhfn(el.v)" :class="tanc.zj==el.v?'check_d':''">{{el.n}}</span>
				</div>			
			</div>			
		</div>
		<component v-bind:is="tanc.zj" v-model="tanc" ref="tanbox"></component>
		<div class="ps_zb_box">
			<div class="ps_zp_05">
				<span class="ps_zp_06"><i class="ps_zp_06x"></i>源文件上传</span><span class="ps_zp_08">建议压缩后上传，1GB以内</span>
			</div>	
			<div class="ps_zp_07">
				<upFj v-model="tanc.filse"></upFj>	
			</div>
			
		</div>
		
		<div class="btns_ps_zb">
			<span @click="subpush()" class="btn_ps_1 pend">提交</span><span @click="showTac({zj:'tips'})" class="pend">投稿必读</span>
		</div>
		<component v-bind:is="tanc2.zj" v-model="tanc2" ref="tanbox"></component>
	</div>
</template>

<script>
import pic from './pic';
import work from './work';
import upFj from './upFj';
import tips from './tips';
import sucsses from './sucsses';
export default{
	components: {pic,work,upFj,tips,sucsses},
	data(){
		return{
			navs:[
				{n:'使用预览图提交',v:'pic'},
				{n:'投稿已上传的原创作品',v:'work'}
			],
			tanc:{
				zj:'pic',
				imgs:[],
				filse:[],
			},
			tanc2:{
				zj:''
			},
			filed:{},
			ajx:false,

		}
	},
	mounted: function(){
		this.init();
	},
	methods:{
		init(){
			if(!window.userInfo){
				this.goFn('/index');
			}
		},
		qhfn(n){
			this.tanc.zj = n;
		},
		showTac(obj){
			this.tanc2 = obj;
		},
		subpush(){
			if(this.ajx){
				this.tipMr('正在交稿请稍后')
				return
			}
			let pr = {
				type:1,
			};
			let tips = {
				pic:['请填写投稿标题','请上传预览图'],
				work:['请选择投稿作品','请选择投稿作品']
			};
			if(!this.tanc.name){
				this.tipMr(tips[this.tanc.zj][0])
				return
			}
			pr.name = this.tanc.name;
			if(this.tanc.remark){
				pr.remark = this.tanc.remark
			}
			if(this.tanc.imgs.length==0){
				this.tipMr(tips[this.tanc.zj][1])
				return
			}
			let arr = [];
			for(let i=0,n=this.tanc.imgs.length;i<n;i++){
				if(this.tanc.imgs[i].bfb!=100){
					this.tipMr('预览图正在上传请稍后提交')
					return
				}
				arr.push(this.tanc.imgs[i].url)
			}
			pr.preview_pic = JSON.stringify(arr);
			if(this.tanc.filse.length==0){
				this.tipMr('请上传源文件')
				return
			}
			if(this.tanc.filse[0].bfb!=100){
				this.tipMr('源文件正在上传请稍后提交')
				return
			}
			pr.file_size = this.tanc.filse[0].allInfo.file_size;
			pr.file_name = this.tanc.filse[0].allInfo.file_name;
			pr.file_url = this.tanc.filse[0].allInfo.url;
			pr.file_info = JSON.stringify(this.tanc.filse[0].allInfo);
			this.ajx = true;
			this.api.pr_delivery(pr).then((da)=>{
				this.ajx = false;
				if(da=='error' || da=='104'){return}
				
				this.tipMr("交稿成功，请耐心等待验收");
				this.tanc2.zj = 'sucsses';
				
			}).catch(()=>{
				this.ajx = false;
			});
		
		},
		
	}
}
</script>

<style>
.ps_zp_01{
	

	
}
.ps_zb_box{
	text-align: left;
	margin: 0 auto 20px;

	width:1170px;
	background:rgba(255,255,255,1);
	border-radius:5px;
}
.ps_zp_02{
	margin-top: 20px;
	position: relative;
	padding: 20px 30px;
	font-size:20px;
	color:rgba(40,40,40,1);
	line-height:28px;
}
.ps_zp_02>span{
	margin-left: 16px;
	font-size:14px;
	color:rgba(187,187,187,1);
}
.ps_zp_03{
	position: absolute;
	top: 22px;
	left: 50%;
	transform: translateX(-50%);
}
.ps_zp_03>span{
	cursor: pointer;
	position: relative;
	display: inline-block;
	vertical-align: top;
	font-size:14px;
	color:rgba(30,30,30,1);
	line-height:28px;
	margin: 0 41px;
}
.ps_zp_03>span:hover{
	opacity: .7;
}
.ps_zp_03>span.check_d{
	color: #33B3FF;
}
.ps_zp_03>span.check_d:after{
	content: "";
	position: absolute;
	bottom: -20px;
	left: 0;
	background: #33B3FF;
	width:100%;
	height:1px;
}

.ps_zp_05{
	padding: 0 30px;
	line-height: 68px;
	border-bottom: 1px solid rgba(0,0,0,0.1);
	font-size:16px;
	color:rgba(40,40,40,1);

}
.ps_zp_06{
	position: relative;
	display: inline-block;
	vertical-align: top;
}
.ps_zp_07{
	padding: 30px;
}
.ps_zp_08{
	margin-left: 16px;
	font-size:12px;
	color:rgba(187,187,187,1)
}
.ps_zp_06x{
	position: absolute;
	top: 50%;
	left: -14px;
	transform: translateY(-50%);
	border-radius: 50%;
	width:6px;
	height:6px;
	background:rgba(255,59,48,1);
}
.btns_ps_zb{
	margin:  60px auto;
	text-align: center;
	font-size:14px;
	color:rgba(30,30,30,1);
	line-height:40px;
}
.btn_ps_1{
	display: inline-block;
	vertical-align: top;
	margin-right: 24px;
	width:100px;
	height:40px;
	background:rgba(51,179,255,1);
	border-radius:5px;
	color:rgba(255,255,255,1);
	text-align: center;
}
</style>
