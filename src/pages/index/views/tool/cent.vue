<template>
	<div class="ldx_l_1x">
		<div @mouseenter="btnchange" @mouseleave="btnchange1" class="ldx_l_1fd2" >
			<div class="ldx_l_1_1" :style="'background-image: url('+el.img+');'"></div>
		
		<!-- 	<div class="ldx_l_1_1_2"><img :src="imgPath+'new/tools/v_02.svg'" ></div>
			<div class="ldx_l_1_1_3"><img :src="imgPath+'new/tools/v_01.svg'" ></div>
			<div class="ldx_l_1_1_4">这首歌的名称很长-歌手名称</div>
			<div class="ldx_l_1_1_5">00:30</div> -->
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
				<div class="ldx_l_1_btn3" v-if="el.status==-1 && Isbtn">
					<span class="pendno" @click="bjfn(el.id)">重新编辑</span>
					<span class="pendno ldx_l_1_btn3x">查看驳回原因</span>
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
			Isbtn:false
		}
		
	},
	methods:{
		btnchange(e){
			this.Isbtn = true;
		},
		btnchange1(e){
			this.Isbtn = false;
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
