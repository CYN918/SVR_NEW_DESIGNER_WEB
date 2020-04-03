<template>
	<div class="ldx_l_1x">
		<div class="ldx_l_1">
			<div class="ldx_l_1_1" :style="'background-image: url('+el.img+');'"></div>
		
		<!-- 	<div class="ldx_l_1_1_2"><img :src="imgPath+'new/tools/v_02.svg'" ></div>
			<div class="ldx_l_1_1_3"><img :src="imgPath+'new/tools/v_01.svg'" ></div>
			<div class="ldx_l_1_1_4">这首歌的名称很长-歌手名称</div>
			<div class="ldx_l_1_1_5">00:30</div> -->
			<div class="ldx_l_1_top">
				<div class="ldx_l_1_top_btn" @click="changebtn()">···</div>
				<div class="ldx_l_1_top_btn1" v-if="top_btn">
					<div class="ldx_l_1_btn1_1" @click.stop="del(el.id)">
						删除
					</div>
				</div>
			</div>
			<div class="ldx_l_1_btn">
				<div class="ldx_l_1_btn" v-if="el.status==0 && Isbtn">
					<span @click="bjfn(el.id)" class="pend">编辑</span>
					<span @click="pusjg" class="pend ldx_l_1_btn1">交稿</span>
				</div>
				<div class="ldx_l_1_btn2" v-if="el.status==1 && Isbtn">
					<span>审核中</span>
				</div>
				<div class="ldx_l_1_btn2" v-if="el.status==10">
					<span>合成中</span>
				</div>
				<div class="ldx_l_1_btn3" v-if="el.status==-1 && Isbtn">
					<span class="pend" @click="bjfn(el.id)">重新编辑</span>
					<span class="pend ldx_l_1_btn3x">查看驳回原因</span>
				</div>
			</div>
			
			<div v-if="tjTy" class="ldx_sav_1_6">
				<div class="ldx_sav_1_6_1">
					<i class="loading_a m_c"></i>
					<div class="ldx_sav_1_6_2">来电秀合成中</div>
				</div>
			</div>
			
		</div>
		<div class="ldx_l_1x_2">
			{{el.title}}
		</div>
		<div class="ldx_l_1x_3">
			{{mJs.getTimes(el.update_at) }}
		</div>
	</div>
	
</template>

<script>
export default{
	props:{
		el:{
			type:Object,
			default:{},
		},
	},
	data(){
		return{
			tjTy:'',
			top_btn:false,
			Isbtn:true
		}
		
	},
	methods:{
		btnchange(e){
			//console.log(e.target.className)
			// if(e.target.className != 'ldx_l_1_btn'){
			this.Isbtn = true;
			
		},
		del(id){
			this.api.mobileshowdel({
				id:id
			}).then(da=>{
				this.$parent.getData();	
				this.changebtn();
			})
		},
		changebtn(){
			this.top_btn=!this.top_btn;
		},
		bjfn(id){
			localStorage.setItem('ldxData',JSON.stringify(this.el));
			this.$router.push({path:'/pushTool',query:{id:id}});
	
		},
		pusjg(){
			if(this.tjTy){
				return
			}
			if(!el.audio_m_id){
				this.$message({
					message:"请先完善信息再提交"
				})
				return
			}
			if(!el.title){
				this.$message({
					message:"请先完善信息再提交"
				})
				return
			}
			if(!el.tag){
				this.$message({
					message:"请先完善信息再提交"
				})
				return
			}
			if(!el.classify_name){
				this.$message({
					message:"请先完善信息再提交"
				})
				return
			}			
			let pr = {
				img:el.img,
				user_video_url:this.el.user_video_url,
				user_video_size_format:this.el.user_video_size_format,
				fps:this.el.fps,
				fps_pic:this.el.fps_pic,
				video_start:this.el.video_start,
				video_duration:this.el.video_duration,	
				audio_m_id:this.el.audio_m_id,
				audio_name:this.el.audio_name,
				audio_author:this.el.audio_author,
				audio_start:this.el.audio_start,
				audio_duration:this.el.audio_duration,
				title:this.el.title,
				classify_id:this.el.classify_id,
				classify_name:this.el.classify_name,
				tag:this.el.tag,	
				compose:1,
				submit:1,
			};
			this.tjTy = 1;
			this.api.sh_save(pr).then((da)=>{
				this.tjTy = '';
				if(da=='error'){
					return
				}
				this.$message({
					message:'交稿成功',
				})
				setTimeout(()=>{
					this.$router.push({path:'/tolt/toluser'});	
				},1000)
					
			}).catch(()=>{
				this.tjTy = '';
			})
			
		},
	},
	mounted() {
		document.addEventListener('click', (e)=> {
			if (e.target.className != 'ldx_l_1_top_btn1' && e.target.className != 'ldx_l_1_top_btn') {
				this.top_btn = false;
			}
		})
	}
}
</script>

<style>
.ldx_l_1{
	position: relative;
	width:193px;
	height:343px;
	background: rgba(244,246,249,1);
	border-radius:5px;
}
.ldx_l_1x{
	
	display: inline-block;
	vertical-align: top;
	margin-left: 20px;
	margin-bottom: 20px;
	
}
.ldx_l_1_1{
	width:193px;
	height:343px;
	border-radius:5px;
	background-repeat:no-repeat;
	background-size: cover;
	background-position: center;
	
}
.ldx_l_1x_2{
	margin: 8px 0 4px;
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
}
.ldx_l_1x_3{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
}
.ldx_l_1_btn{
	position: absolute;
	bottom: 20px;
	left: 0;
	width: 100%;
	text-align: center;
}
.ldx_l_1_btn>span{
	display: inline-block;
	vertical-align: top;
	width:68px;
	height:32px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	border:1px solid rgba(187,187,187,1);
	font-size:14px;
	margin: 0 7.5px;
	color:rgba(102,102,102,1);
	line-height:32px;
}
.ldx_l_1_btn>span.ldx_l_1_btn1{
	background:rgba(51,179,255,1);
	color: #fff;
	border-color: rgba(51,179,255,1);
}
.ldx_l_1_btn2>span{
	display: block;
	margin: 0 auto;
	width:153px;
	height:32px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	border:1px solid rgba(187,187,187,1);
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:32px;
	text-align: center;
}
.ldx_l_1_btn3>span{
	display: block;
	margin: 0 auto;
	width:153px;
	height:32px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	border:1px solid rgba(187,187,187,1);
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:32px;
	text-align: center;
}
.ldx_l_1_btn3>span.ldx_l_1_btn3x{
	margin-top: 10px;
	background: #33B3FF;
	border-color: #33B3FF;
	color: #fff;
}
.ldx_l_1_top{
	position:absolute;
	right: 10px;
	top: 10px;
	z-index: 100;
}
.ldx_l_1_top_btn{
	width:26px;
	height:18px;
	background:rgba(255,255,255,1);
	box-shadow:0px 4px 12px 0px rgba(0,0,0,0.2);
	border-radius:5px;
	text-align: center;
	line-height: 18px;
	font-size: 16px;
	cursor: pointer;
}
.ldx_l_1_top_btn1{
	width:82px;
	height: 45px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;
	position: absolute;
	margin-top: 2px;
}
.ldx_l_1_btn1_1{
	width:100%;
	height:45px;
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:45px;
	position: absolute;
	text-align: center;
	cursor: pointer;
}
</style>
