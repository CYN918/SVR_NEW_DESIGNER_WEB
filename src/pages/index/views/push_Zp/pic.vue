<template>
	<div>
		<div class="ps_zb_box">
			<div class="ps_zp_05">
				<span class="ps_zp_06">投稿信息</span>
			</div>	
			<div class="ps_zp_07">
				<div class="ps_zp_pic_2">
					<i class="ps_zp_06x"></i>
					<inputMax class="ps_zp_pic_0" :placeholder="'请输入投稿标题'" v-model="value.name" @focus="focus" @blur="blur" :max="10"></inputMax>
					<span v-if="isTite" class="ps_zp_pic_1">
						<img :src="setImgU('svg/warning-circle.svg')">
						请输入投稿标题
					</span>
				</div>
				<div class="ps_zp_pic_3">
					<textarMax :placeholder="'请输入投稿说明'" :max="140" v-model="value.remark" ></textarMax>
				</div>
			</div>			
		</div>
		<div class="ps_zb_box">
			<div class="ps_zp_05">
				<span class="ps_zp_06 ps_zp_06x">作品预览图</span><span class="ps_zp_08">单张1M以内；最多3张；JPG/PNG/GIF</span>
			</div>	
			<div class="ps_zp_07 ps_zp_pic_4">
				<div>
					<span class="add_x01">
						<span class="pend">+</span>
						上传图片
					</span>
					<uploadFile :setJdt="setJdt1" :sussFn="uploadSC1" :cg="fileConfig"></uploadFile>
					<jdt v-if="isJdt1" ref="jdt1"></jdt>
				</div>
				<div v-for="el in imgs">
					
				</div>
			</div>			
		</div>
	</div>
</template>

<script>
import inputMax from '../../components/inputMax';
import textarMax from '../../components/textarMax';
import uploadFile from '../../components/uploadFile'
import jdt from '../../components/jdt'
export default{
	components: {inputMax,textarMax,uploadFile,jdt},
	props:{
		value:Object,
	},
	data(){
		return{
			isTite:false,
			fileConfig:{
				type:['image/jpeg','image/png','image/gif'],
				max:1*1024*1024,
				userType:'user_info',
				isAarr:true,
				arrayMax:3,
			},
			isJdt1:'',	
			imgs:[],
		}
	},
	methods:{
		focus(){
			this.isTite = false;
		},
		blur(){
			this.isTite = !this.value.name;
		},
		uploadSC1(da){
			this.isJdt1='';
			this.imgs.push(da.url)
		},
		setJdt1(on){
			this.isJdt1=1;
			if(this.$refs.jdt1){
				this.$refs.jdt1.bfb = on;
			}		
		},
	}
}
</script>

<style>
.ps_zp_pic_2{
	position: relative;
	margin-bottom: 30px;
}
.ps_zp_pic_0{
	display: inline-block;
	vertical-align: top;
	width: 936px;
}
.ps_zp_pic_1{
	display: inline-block;
	vertical-align: top;
	margin-left: 20px;
	line-height: 40px;
	font-size:14px;
	color:rgba(255,59,48,1);

}
.ps_zp_pic_1>img{
	display: inline-block;
	vertical-align: top;
	margin: 8px 5px 0 0;
}
.pushGj_03_2{
	width:938px;
	height:88px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	border:1px solid rgba(0,0,0,0.15);
	font-size:14px;
	line-height:20px;
}
.ps_zp_pic_3{
	width: 938px;
	height: 88px;
}
.ps_zp_pic_4>div{
	position: relative;
	display: inline-block;
	vertical-align: top;
	width:260px;
	height:195px;
	background:rgba(244,246,249,1);
	border-radius:5px;
}
.add_x01{
	position: relative;
	display: block;
	width: 100%;
	height: 100%;
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
	text-align: center;
}
.add_x01>span{
	display: block;
	width: 22.9px;
    height: 22.9px;
    border-radius: 50%;
    font-size: 21px;
    text-align: center;
    line-height: 22.9px;
    background: #33B3FF;
    color: #fff;
    margin: 84px auto 11px;
}
</style>
