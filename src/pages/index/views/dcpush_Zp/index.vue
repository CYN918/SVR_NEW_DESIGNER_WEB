<template>
	<div>
		<div class="ps_zb_box">
			<div class="ps_zp_02">
				项目多次交稿<span>已经获得平台认可，分派过当前线上项目进行制作的设计师，可在此再次认领该项目，进行多次交稿</span>
				<div @click="showTac({zj:'tips'})"  class="dc_ps_01 pend">多次交稿 注意事项</div>	
			</div>			
		</div>
		<div class="ps_zb_box">
			<div class="ps_zp_05">
				<span class="ps_zp_06"><i class="ps_zp_06x"></i>项目信息</span>
			</div>	
			<div class="ps_dc_02">
				<div class="ps_zp_pic_2">
					<i class="ps_zp_06x"></i>
					<el-select class="ps_dc_03 dc_xm_02" v-model="form.project_id" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.project_id"
					      :label="item.name"
					      :value="item.project_id">
							<span class="dc_xm_01" :style="setBgc(item.banner)"></span>
							<span class="dc_xm_03">
								<span class="dc_xm_03_1">{{item.name}}</span>
								<span class="dc_xm_03_2">项目类型：{{item.classify_name}}</span>
							</span>
					    </el-option>
					</el-select>
				</div>
				<div class="ps_zp_pic_2">
					<i class="ps_zp_06x"></i>
					<inputMax class="ps_zp_pic_0" :placeholder="'请输入投稿标题'" v-model="form.name" @focus="focus" @blur="blur" :max="10"></inputMax>
					<span v-if="isTite" class="ps_zp_pic_1 ps_dc_08">
						<img :src="setImgU('svg/warning-circle.svg')">
						请输入投稿标题
					</span>
				</div>
				<div class="ps_zp_pic_3">
					<textarMax :placeholder="'请输入投稿说明'" :max="140" v-model="form.remark" ></textarMax>
				</div>
			</div>
			
			
			
			
		</div>
		
		<div class="ps_zb_box">
			<div class="ps_zp_05">
				<span class="ps_zp_06"><i class="ps_zp_06x"></i>作品预览图</span><span class="ps_zp_08">单张1M以内；最多3张；JPG/PNG/GIF</span>
			</div>	
			<div class="ps_zp_07 ps_zp_pic_4">
				<div v-if="form.imgs.length<3">
					<span class="add_x01">
						<span class="pend">+</span>
						上传图片
					</span>
					<uploadFile v-model="form.imgs" :cg="fileConfig" ref="upfile"></uploadFile>			
				</div>
				<div v-for="(el,index) in form.imgs" :style="setBg(el.url)">
					<jdt v-if="el.state==1" v-model="el.bfb"></jdt>
					<div class="ps_zp_pic_4_1">
						<div @click="upImg(index)" class="ps_zp_pic_4_3">替换图片</div>
						<img @click="delet(index)" class="ps_zp_pic_4_2" :src="setImgU('push_Zp/zptg_image_icon_close.svg')">
					</div>					
				</div>
			</div>			
		</div>
		
		<div v-if="form.type==2" class="ps_zb_box ps_dc_06">
			网盘交稿仅支持大文件，小于1G的文件请使用<span @click="qhNa()" class="pend">本地上传</span>交稿
		</div>
		
		<div class="ps_zb_box">
			<div class="ps_zp_05 ps_dc_05">
				<span class="ps_zp_06"><i class="ps_zp_06x"></i>{{tipOn[form.type].n1}}</span><span class="ps_zp_08">建议压缩后上传，1GB以内</span>
				<div @click="qhNa()" class="ps_dc_04 pend">{{tipOn[form.type].n2}}</div>
			</div>	
			<div v-if="form.type==1" class="ps_zp_07">
				<upFj v-model="form.filse"></upFj>	
			</div>
			<div class="ps_dc_02" v-else>
			
				<div class="ps_zp_pic_2">
					<i class="ps_zp_06x"></i>
					<inputMax class="ps_zp_pic_0" :placeholder="'请将稿件上传至网盘后，提供稿件的网盘地址'" v-model="form.online_disk_url" @focus="focus2" @blur="blur2" :max="10"></inputMax>
					<span v-if="isonline_disk_url" class="ps_zp_pic_1 ps_dc_08">
						<img :src="setImgU('svg/warning-circle.svg')">
						请输入网盘链接
					</span>
				</div>
				
				<div class="ps_zp_pic_2 ps_dc_07">
					<el-input v-model="form.access_code" placeholder="请提供网盘提取密码，如：xxxx；无提取码则不填"></el-input>
				</div>
			</div>
			
		</div>
		
		
		<div class="btns_ps_zb">
			<span @click="subpush()" class="btn_ps_1 pend">提交</span><span class="pend">今日可交稿次数10次</span>
		</div>
		<component v-bind:is="tanc2.zj" v-model="tanc2" ref="tanbox"></component>
	</div>
</template>

<script>

import upFj from './upFj';
import tips from './tips';
import sucsses from './sucsses';
import inputMax from '../../components/inputMax';
import textarMax from '../../components/textarMax';
import uploadFile from '../../components/uploadFileArr'
import jdt from '../../components/jdtN'
export default{
	components: {textarMax,inputMax,uploadFile,jdt,upFj,tips,sucsses},
	data(){
		return{
			tipOn:{
				1:{n1:'本地源文件上传',n2:'稿件太大？用网盘传吧'},
				2:{n1:'网盘链接',n2:'本地上传稿件'},
			},
			form:{
				type:1,
				imgs:[],
				filse:[],
			},
			options:[],
			fileConfig:{
				type:['image/jpeg','image/png','image/gif'],
				max:1*1024*1024*1024,
				userType:'user_info',
				isAarr:true,
				arrayMax:3,
			},
			isJdt1:'',	
			isTite:'',
			isonline_disk_url:false,
			tanc:{
				zj:'pic',
				imgs:[],
				filse:[],
			},
			tanc2:{
				zj:''
			},
			ajx:false,

		}
	},
	beforeDestroy:function(){
		document.body.className = "";
	},
	mounted: function(){
		this.init();
		document.body.className = "dcjgxm";
	},
	methods:{
		qhNa(){
			this.form.type = this.form.type==1?2:1;
		},
		getOpt(){
			this.api.personalLongList({}).then((da)=>{
				if(da=='error' || da=='402'){
					return
				}
				this.options = da;
			})
		},
		focus(){
			this.isTite = false;
		},
		blur(){
			this.isTite = !this.form.name;
		},
		init(){
			if(!window.userInfo){
				this.goFn('/index');
			}
			this.getOpt();
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
			
			if(!this.form.project_id){
				this.tipMr('请选择要提交的项目')
				return
			}
			if(!this.form.name){
				this.tipMr('请输入投稿标题')
				return
			}
			let pr = {
				type:this.form.type,
				project_id:this.form.project_id,
				name:this.form.name,
			};
			if(this.form.remark){
				pr.remark = this.form.remark
			}
			if(this.form.imgs.length==0){
				this.tipMr('请上传项目预览图')
				return
			}
			let arr = [];
			for(let i=0,n=this.form.imgs.length;i<n;i++){
				if(this.form.imgs[i].bfb!=100){
					this.tipMr('预览图正在上传请稍后提交')
					return
				}
				arr.push(this.form.imgs[i].url)
			}
			pr.preview_pic = JSON.stringify(arr);
			
			if(this.form.type==1){
				if(this.form.filse.length==0){
					this.tipMr('请上传源文件')
					return
				}
				if(this.form.filse[0].bfb!=100){
					this.tipMr('源文件正在上传请稍后提交')
					return
				}
				pr.file_size = this.form.filse[0].allInfo.file_size;
				pr.file_name = this.form.filse[0].allInfo.file_name;
				pr.file_url = this.form.filse[0].allInfo.url;
				pr.file_info = JSON.stringify(this.form.filse[0].allInfo);
			}else{
				
				if(!this.form.online_disk_url){
					this.tipMr('请提供稿件的网盘地址')
				}
				pr.online_disk_url = this.form.online_disk_url;
				pr.access_code = this.form.access_code?this.form.access_code:'';
				
			}
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
		setBg(el){
			if(!el){
				return 
			}
			return "background-image: url("+el+");";
		},
		setBgc(el){
			if(!el){
				return 
			}
			return "background-image: url("+el+");";
		},
		delet(on){
			this.$refs.upfile.deletfile(on);
		},
		upImg(on){
			this.$refs.upfile.upfile(on)			
		},
		focus2(){
			this.isonline_disk_url = false;
		},
		blur2(){
			this.isonline_disk_url = !this.form.online_disk_url;
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
.dc_ps_01{
	position: absolute;
	top: 26px;
	right: 20px;
	text-align: right;
	font-size:14px;
	font-weight:400;
	color:rgba(51,179,255,1);
	line-height:20px;
}
.ps_dc_02{
	padding: 30px;
}
.ps_dc_03{
	width: 732px;
}
.ps_dc_05{
	position: relative;
}
.ps_dc_04{
	position: absolute;
	top: 26px;
	right: 20px;
	text-align: right;
	font-size:14px;
	font-weight:400;
	color:rgba(51,179,255,1);
	line-height:20px;
}
.ps_dc_06{
	height:45px;
	background:rgba(233,247,255,1);
	border-radius:5px;
	border:1px solid rgba(51,179,255,1);
	font-size:14px;
	text-align: center;
	color:rgba(40,40,40,1);
	line-height:45px;
}
.ps_dc_06>span{
	color: #27B1FF;
}
.ps_dc_07{
	width: 360px;
	margin-bottom: 0;
}
.ps_dc_08{
	float: right;
}
.dc_xm_01{
	display: inline-block;
	vertical-align: top;
	margin: 10px 10px 0 -10px;
	width:80px;
	height:60px;
	border-radius:5px 5px 5px 5px;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}
.dc_xm_03{
	display: inline-block;
	vertical-align: top;
	height: 100%;
	line-height: 1px;
	margin-top: 10px;
}
.dcjgxm .el-select-dropdown__item{
	height: 80px;
	line-height: 80px;
	
}
.dc_xm_03_1{
	display: block;
	font-size:18px;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	color:rgba(40,40,40,1);
	line-height:26px;
	margin-bottom: 10px;
	margin-top: 3px;
}
.dc_xm_03_2{
	font-size:12px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:18px;
}
</style>
