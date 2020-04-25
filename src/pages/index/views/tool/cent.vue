<template>
	<div class="ldx_l_1x">
		<div @mouseenter="btnchange" @mouseleave="btnchange1" class="ldx_l_1fd2" >
			<div class="ldx_l_1_1" :style="'background-image: url('+el.img+');'"></div>
		
		
			
			<div class="ldxwc_yy">
				<img src="/imge/tools/Upload_icon_music_24.svg" alt="">
				<div>{{(jsons.audio && jsons.audio[0])?jsons.audio[0].author:'无歌手名'}}</div>
			</div>
			
			
			
			
			<div class="ldx_l_1_top" v-if="el.status==0 || el.status==-10">
				<div class="ldx_l_1_top_btn" @click="changebtn()">···</div>
				<div class="ldx_l_1_top_btn1" v-if="top_btn">
					<div class="ldx_l_1_btn1_1" @click.stop="del(el.id)">
						删除
					</div>
				</div>
			</div>
			<div class="ldx_l_1_btn">
				<div class="ldx_l_1_btn" v-if="el.status==0 && Isbtn">
					<span @click="bjfn(el.id)" class="pendno">编辑</span>
				</div>
				<div class="ldx_l_1_btn2" v-if="el.status==1 && Isbtn">
					<span>审核中</span>
				</div>
				<div class="ldx_l_1_btn2" v-if="el.status==10">
					<span>合成中</span>
				</div>
				<div class="ldx_l_1_btn2" v-if="el.status==-10">
					<span>合成失败</span>
				</div>
				<div class="ldx_l_1_btn2" v-if="el.status==2 && Isbtn">
					<span @click="gojg(el.project_id)" class="ldx_l_1_btn2_a">项目结果</span>
				</div>
				<div class="ldx_l_1_btn3" v-if="el.status==-1 && Isbtn">
					<span class="pendno" @click="bjfn(el.id)">重新编辑</span>
					<span class="pendno ldx_l_1_btn3x" @click="getrejectInfo(el.project_id)">
						查看驳回原因 
						<div class="ldx_l_1_btn3xt" v-if="Ischeck">
							<div class="ldx_l_1_btn3xt_1">驳回理由：</div>
							<div class="ldx_l_1_btn3xt_2">
								{{ checkinfo.check_reason }}
							</div>
							<div class="ldx_l_1_btn3xt_1">驳回详情：</div>
							<div class="ldx_l_1_btn3xt_2">
								{{ checkinfo.check_comment }}
							</div>
						</div>
					
					</span>
					
				</div>
			</div>
			
			<div class="ldxwc_01">
				
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
			{{backtims(el)}}
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
		pr:Object,
	},
	data(){
		return{
			tjTy:'',
			top_btn:false,
			Isbtn:false,
			checkinfo:{
				check_reason:"",
				check_comment:""
			},
			Ischeck:false,
			jsons:{},
		}
		
	},
	mounted: function() {
		this.init();
	},
	methods:{
		init(){
			try{
				this.jsons = JSON.parse(this.el.json);
				console.log(this.jsons);
			}catch(e){
				//TODO handle the exception
			}
			
		},
		backtims(el){
			if(this.pr.sort){
				return this.mJs.getTimes(this.pr.sort =='{"update_at":"DESC"}'?el.update_at:el.created_at)
			}
			
		},
		btnchange(e){
			this.Isbtn = true;
		},
		btnchange1(e){
			this.Isbtn = false;
			this.Ischeck = false
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
		gojg(id){
			
			this.$router.push({path:'/prcent',query:{id:id}});
		},
		getrejectInfo(id){
			if(this.Ischeck){
				this.Ischeck = false;
				return;
			}
			if(id){
				this.api.rejectInfo({
					project_id:id
				}).then(da=>{
					//console.log(da)
					this.checkinfo = da;
					this.Ischeck = !this.Ischeck
				}).catch(da=>{
					
				})
			}
			
		}

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
.ldx_l_1fd2{
	position: relative;
	width:193px;
	height:343px;
	background: #000;
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
.pendno{
	cursor: pointer;
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
	position: relative;
}
.ldx_l_1_btn3xt{
	width:200px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:4px;
	position: absolute;
	top: 0;
	left: 157px;
	padding: 16px;
	z-index: 999;
	text-align: left;
}
.ldx_l_1_btn3xt_1{
	color: #333333;
}
.ldx_l_1_btn3xt_2{
	color: #666666;
	line-height: 20px;
}
.ldx_l_1_top{
	position:absolute;
	right: 10px;
	top: 10px;
	z-index: 100;
}
.ldx_l_1x:hover .ldx_l_1_top_btn{
	display: block;
} 
.ldx_l_1_top_btn{
	display: none;
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
.ldx_l_1_btn2 .ldx_l_1_btn2_a{
	background: #33B3FF;
	border-color: #33B3FF;
	color: #fff;
}
.ldx_l_1_btn2_a{
	cursor: pointer;
}
.ldxwc_yy{
	position: absolute;
	top: 10px;
	left: 10px;
	
}
.ldxwc_yy>img{
	display: inline-block;
	vertical-align: top;
	width: 24px;
}
.ldxwc_yy>div{
	margin-left: 4px;
	display: inline-block;
	width:129px;
	height:24px;
	padding: 0 8px;
	background:rgba(0,0,0,.5);
	border-radius:12px;
	font-size:12px;
	color:rgba(255,255,255,1);
	line-height:24px;
	overflow: hidden;
}
</style>
