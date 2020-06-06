<template>
	<div class="pr_qpx" >
		<div class="mp3_01x">
			<div class="mp3_01x_1">
				<span class="a">来电秀信息填写</span><img @click="close()" class="pend b" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/cj_00.svg">
			</div>
			<div class="mp3_01x_2">
				
				<div class="sa_a_02">
					<div>
						<div class="ldx_sav_2_1">来电秀名称</div>
						<div>
							<inputMax
							v-model="value.title"
							:max="20"
							></inputMax>
						</div>
					</div><div>
						<div class="ldx_sav_2_1">标签</div>
						<div class="xldof" style="width: 390px;height: 70px;">
							<checks :cfg="tags" v-model="value.tag"></checks>	
						</div>
					</div><div>
						<div class="ldx_sav_tipx">
							<div>1、提交过后，可前往狮圈儿-<router-link target="_blank" :to="{path:'/projectAll'}">我的项目</router-link>，了解验收审核进展。</div>
							<div>2、若验收审核通过，可前往狮圈儿-<router-link target="_blank" :to="{path:'/profit'}">我的收益</router-link>，了解订单结果。</div>
							<div>3、若未验收通过，请了解驳回原因后，在工具重新制作提交。</div>
						</div>
					</div>
					
				</div>
			</div>
			<div class="mp3_01x_3">
				<span @click="tijF()" :class="isok?'mp3_01x_3ok':''">立即交稿</span>
			</div>
		</div>		
	</div>
</template>

<script>
import inputMax from '../../../components/inputMax'
import checks from '../../../components/checks'
export default{
	components:{inputMax,checks},
	props:{
		value:Object
	},
	data(){
		return{
			isok:'',
			tags:['极简','扁平','风景'],
			ajaxType:'',
			bfmax:0,
		}
	},
	beforeDestroy:function(){
		document.body.style = "";
	},
	watch:{
		'value.title'(){
			this.check()
		},
		'value.tag'(){
			this.check()
		},
	},
	mounted: function () {
		this.init();
	}, 
	methods:{
		init(){
			document.body.style = "overflow: hidden;";
			this.bfmax = this.backto(this.$parent.preview.maxTime);
			if(this.value.tag){
				for(let i=0,n=this.value.tag.length;i<n;i++){
					let pod = this.value.tag[i];
					if(this.tags.indexOf(pod)==-1){
						this.tags.push(pod);
					}
				}
			}
			
			this.check();
		},
		close(){
			this.$emit('input',{});
		},

		cl_audio(el){
			let pd = el.json.audio;
			let tims = 0;	
			let arr = [];
			if(pd[0].start!=0){
				arr.push({type:'blank',start:0,end:this.backto(pd[0].start)});				
			}		
			pd[0].start = this.backto(pd[0].start);
			pd[0].cut_end = this.backto(pd[0].cut_end);
			pd[0].cut_start = this.backto(pd[0].cut_start);
			pd[0].end = this.backto(pd[0].start+(pd[0].cut_end-pd[0].cut_start));			
			arr.push(pd[0]);
			el.json.audio = arr;
		},
		backto(num){
			return Math.round(num*100)/100
		},
		
		cl_video(el){
			let pd = el.json.media;
			let on=0;
			let len = pd.length;
			let arrdo = [];
			if(len==0){
				el.json.media = [{type:'blank',start:0,end:this.backto(el.maxTime)}];
				return		
			}
			
			var fn = ()=>{
				
				pd[on].end = this.backTim(pd[on]);
				if(pd[on].sw!=pd[on].yw || pd[on].sh!=pd[on].yh || pd[on].sx!=0 || pd[on].sy!=0){
					pd[on].crop = this.backto(pd[on].sw)+':'+this.backto(pd[on].sh)+':'+this.backto(pd[on].sx)+':'+this.backto(pd[on].sy);
				}
				pd[on].start = this.backto(pd[on].start);
				pd[on].cut_end = this.backto(pd[on].cut_end);
				pd[on].cut_start = this.backto(pd[on].cut_start);
				pd[on].end = this.backto(pd[on].end);
				pd[on].x = this.backto(pd[on].x);
				pd[on].y = this.backto(pd[on].y);
				arrdo.push(pd[on]);
				if(on<len-1){
					on++;
					
					if(pd[on].start>pd[on-1].end){
						arrdo.push(
						{type:'blank',
						start:this.backto(pd[on-1].end),
						end:this.backto(pd[on].start)});						
					}
					fn();
					
				}else if(pd[on].end<this.bfmax){
					arrdo.push({type:'blank',start:this.backto(pd[on].end),end:this.backto(this.bfmax)});		
				}				
			}
			fn(); 
			el.json.media = arrdo;
			return 			
		},
		
		backTim(ob) {
			return (ob.cut_end - ob.cut_start) + ob.start;
		},
		
		cldevs(on){
		
			let arr = [];
			let wdb = 1080/this.$parent.boxW;
			let hy = 1920/this.$parent.boxH;
			for(let i=0,n=on.length;i<n;i++){
				let ar = on[i];
				for(let i2=0,n2=ar.length;i2<n2;i2++){
					let pd = ar[i2];
					pd.ond = i;
					pd.end = this.backto(pd.start+(pd.cut_end-pd.cut_start));					
					
					if(pd.zsx){
						pd.x = this.backto(pd.zsx * wdb);
					}
					if(this.backto(pd.zsy * hy)){
						pd.y = this.backto(pd.zsy * hy);
					}
					if(pd.sw!=pd.yw || pd.sh!=pd.yh || pd.sx!=0 || pd.sy!=0){
						pd.crop = this.backto(pd.sw)+':'+this.backto(pd.sh)+':'+this.backto(pd.sx)+':'+this.backto(pd.sy);
					}
					if(pd.zsw){
						pd.zsw = pd.zsw?pd.zsw:0;
						pd.zsh = pd.zsh?pd.zsh:0;
						wdb = wdb?wdb:0;
						hy = hy?hy:0;
						// let x =  this.backto(pd.zsw*wdb);
						// let y = this.backto(pd.zsh*hy);
						
						let w = this.backto(pd.sw/pd.yw*pd.zsw*wdb);
						let h = this.backto(pd.sh/pd.yh*pd.zsh*hy);
						
						pd.resize =w+':'+h;						
					}
					arr.push(pd);
				}	
			}
			return arr;
		},
		tijF(){
		
			if(this.ajaxType){
				this.$message({
					message:'正在处理请稍后',
				})
				return
			}
			
			if(!this.isok){
				this.$message({
					message:"名称*标签不能为空"
				})
				return;
			}
			let pr = this.value;	
					
			let len1 = pr.json.media.length;
			let len2 = pr.json.decorates.length;
				
			this.cl_video(pr);
			this.cl_audio(pr);
			pr.json.max_length = this.bfmax;
			let sd = this.cldevs(pr.json.decorates);
			if(sd.length>0){
				pr.json.decoration = sd;
			}
			if(pr.json.media[0] && pr.json.media[0].start==0){
				pr.img = pr.json.media[0].cover_img;
			}
			
			pr.json = JSON.stringify(pr.json);			
			pr.submit = 1;		
			this.ajaxType = 1;
			this.bdtj('来电秀工具-制作页','[立即交稿]','--')
			this.api.sh_save(pr).then((da)=>{				
				this.ajaxType = '';
				if(da=='error' || da=='104'){
					return
				}
				this.$message({
					message:'交稿成功',
				})
				setTimeout(()=>{
					this.$router.push({path:'/toluser'});	
				},1000)
		
			}).catch(()=>{
		
				this.ajaxType = '';
			})
			
			
		},
		check(){
			this.isok = '';
			if(!this.value.title){
				return 
			}
			if(!(this.value.tag && this.value.tag.length>0)){
				return 
			}
			this.isok = 1;
		},
		

	}
}
</script>

<style>
.pr_qpx{
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0,0,0,.3);
	width: 100%;	
	height: 100%;
	min-width: 1300px;
	text-align: left;
	z-index: 100;
}

.mp3_01x{
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);

	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;	
}
.mp3_01x_1{
	position: relative;
	border-bottom: 1px solid rgba(244,246,249,1);
	line-height: 54px;
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:54px;
}
.mp3_01x_1>span.a{

	margin-left: 20px;
}
.mp3_01x_1>img.b{
	position: absolute;
	top: 22px;
	right: 20px;
	width: 12px;
}
.mp3_01x_2{
	padding: 40px 80px;
}
.mp3_01x_3{
	border-top: 1px solid rgba(244,246,249,1);
	text-align: center;
	height: 80px;
}
.mp3_01x_3>span{
	display: inline-block;
	vertical-align: top;
	margin-top: 20px;
	width:120px;
	height:40px;
	background:rgba(223,223,223,1);
	border-radius:5px;
	font-size:14px;
	color:rgba(187,187,187,1);
	line-height:40px;
	cursor: pointer;
}
.mp3_01x_3>span.mp3_01x_3ok{
	cursor: pointer;
	background: #33B3FF;
	color: #fff;
}
.mp3_01x_2>div{
	display: inline-block;
	vertical-align: top;
}
.sa_a_01{
	margin-right: 24px;
	width: 240px;
}
.ldx_sav_tipx{
	position: relative;
    margin-top: 30px;
    padding-top: 25px;
    border-top: 1px solid #D9D9D9;
}
.ldx_sav_tipx>div{
	font-size: 14px;
    color: rgba(153,153,153,1);
    line-height: 30px;
}
.ldx_sav_tipx>div>a{
	color: #27B1FF;
}
.sa_a_02>div{
	margin-bottom: 24px;
}
.xldof{
	margin-bottom: -15px;
}
.ldx_sav{
	margin: 103px auto;
	width:1300px;
	padding: 56px 0;
	height:667px;
	background:rgba(255,255,255,1);
}
.ldx_sav>div{
	display: inline-block;
	vertical-align: top;

}
.ldx_sav_1{
	position: relative;
	width:375px;
	height:667px;
	border-radius:5px;
	overflow: hidden;
}
.ldx_sav_1_1{
	width: 100%;
	height: 100%;
	background: red;
	margin-right: 60px;
}
.ldx_sav_1>div{
	position: absolute;	
}
.ldx_sav_1_2{
	top: 20px;
	left: 20px;
	border-radius: 50%;
	background: rgba(0,0,0,.5);
	width:32px;
	height:32px;
}
.ldx_sav_1_2>img{
	display: block;
    width: 17px;
    margin: 7px auto 0;
}
.ldx_sav_1_3{
	bottom: 20px;
	left: 20px;
	width:38px;
	height:24px;
	background:rgba(0,0,0,.5);
	border-radius:12px;

}
.ldx_sav_1_3>img{
	display: block;
    width: 20px;
    margin: 2px auto 0;
}
.ldx_sav_2{

	margin-left: 60px;
	width: 480px;
	text-align: left;
}
.ldx_sav_2>div{
	margin-bottom: 30px;
}
.ldx_sav_2_1{
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
	margin-bottom: 10px;
}

.ldx_sav_2_1x .el-input--suffix .el-input__inner{
	padding-left: 10px;
}
.ldx_sav_tip{
	position: relative;
	margin-top: 30px;
	padding-top: 25px;
	height: 335px;
	border-top: 1px solid #D9D9D9;
}
.ldx_sav_tip>div{
	font-size:14px;

	color:rgba(153,153,153,1);
	line-height:30px;
}
.ldx_sav_tip>div>a{
	color: #33B3FF;
}
.ldx_sav_tip_1{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	text-align: center;
}
.ldx_sav_tip_1>span{
	display: inline-block;
	vertical-align: top;
	width:120px;
	height:40px;
	background:rgba(223,223,223,1);
	border-radius:5px;
	font-size:14px;
	color:rgba(187,187,187,1);
	line-height:40px;
}
.ldx_sav_tip_1>span.checko{
	background: #33B3FF;
	color: #fff;
}
.ldx_sav_1_4{
	top: 20px;
	right: 20px;
	width:263px;
	height:32px;
	text-align: left;
	padding:0 15px;
	background:rgba(0,0,0,.5);
	border-radius:16px;
	font-size:14px;
	color:rgba(255,255,255,1);
	line-height:32px;
}
.ldx_sav_1_5{
	bottom: 20px;
	right: 20px;
	width:54px;
	height:24px;
	background:rgba(0,0,0,.5);
	border-radius:12px;
	font-size:14px;
	color:rgba(255,255,255,1);
	line-height:24px;
}
.ldx_sav_1_6{
	position: absolute;
	top: 0;
	left: 0;
	background: rgba(0,0,0,.5);
	width: 100%;
	height: 100%;
}
.ldx_sav_1_6_1{
	position: absolute;
	top:50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	width: 126px;
	text-align: center;
}

.ldx_sav_1_6_1 .el-progress--circle .el-progress__text{
	color: #fff;
}
.ldx_sav_1_6_2{
	margin-top: 10px;
	font-size:16px;
	font-weight:500;
	color:rgba(255,255,255,1);
	line-height:22px;
}
</style>
