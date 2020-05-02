<template>
	<div>
	<TcBox :config="con" ref="tcBox">
		<template v-slot:todo="{ todo }">
			<div class="igL">
				<div class="igL_l">
					<div class="igL_l_1">
						<div class="igL_up_1">
							<div class="igL_up_1_1">我的图片素材库</div>
							<div class="igL_up_1_2">
								上传文件大小需小于10M，支持JPG、PNG、GIF格式。
							</div>
							<div class="igL_up_1_3">上传图片</div>
						</div>
						<div class="igL_l_box">
							<div class="igL_l_1_2">
								<div class="igL_up_Box" v-for="(el,index) in list" :key="index">
									<div v-if="!el.isAc"  @click="cs(index)" class="igL_up_L">
										<div class="igL_up_L_1 mxImgbg">
											<div :style="Imgbj(el.url,el.cover_img)"></div>
										</div>
										<div class="igL_up_L_2">
											<span class="igL_up_L_2_1 hft">{{el.file_name}}</span>
											<span class="igL_up_L_2_2">{{el.file_size_format}}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					
				</div>
				<div class="igL_r">
					<div class="igL_r_1 mxImgbg" @click="cs2(index)" v-for="(el,index) in list2" :key="index">
						<div :style="Imgbj(list[el].url,list[el].cover_img)"></div>
					</div>
				</div>
			</div>
			<div class="qxBm_btns qxBm_btns2">
				<div class="btns pend">取消</div>	
				<div class="btn-lod btns pend" @click="cs">
					<i v-if="getType" class="loading_a m_c"></i>
					<span v-else>删除</span>
				</div>		
				<div class="btn-lod btns btns_js pend">
					<i v-if="getType" class="loading_a m_c"></i>
					<span v-else>插入</span>
				</div>										
			</div>
		</template>			
	</TcBox>
	</div>
</div>
</template>
<script>
import TcBox from './TcBox';
export default {
	components:{TcBox},
	props:{
		config:Object,
	},
	data(){
		return{
			con:{
				title:'上传图片',
			},
			getType:'',
			list:[],
			list2:[],
			page:1,
		}
	},
	mounted: function() {
		this.init();
		this.show();
	},
	methods: {
		init(){
			this.getList();
		
		},
		Imgbj(a,b){
			let p = "background-image: url(";
			switch ('image'){
				case 'image': p+=a;
					break;
				case 'video': p+=b;
					break;
				case 'audio': p+='https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/m.jpg';
					break;	
			}
			return p+");";
		},
		getList(){
			if(!window.userInfo){
				this.$router.push({path:'/login'})
				return
			}
			if(this.getType){
				return
			}
			
			this.getType=1;
			let times = (Date.parse(new Date())/1000);
			let arr = [
				1001,
				'6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY',
				window.userInfo.open_id,
				times
			];
			let params = {
				app_id:1001,
				sign:this.MD5(encodeURIComponent(arr.sort())),
				user:window.userInfo.open_id,
				timestamp:times,
				file_type:'image',
				relation_type:'work',
				limit:40,
				page:this.page,
			};
			console.log(params);
			this.api.getFList(params).then((da)=>{
				this.getType='';
				if(da=='error'){
					return
				}
		
				if(da.data.length==0 || !da){
					this.noGd=1;
				}
				if(da.data.length==0 && this.list.length==0){
					this.isnoData=1;
				}else{
					this.isnoData='';
				}
				this.total = da.total;
				if(this.list.length>0){
					this.list = this.list.concat(da.data);
					return
				}
				this.list =da.data;
				
			}).catch(()=>{
				this.getType='';
			});
		},
		
		
		cs(on){			
			this.$set(this.list[on],'isAc',1);
			if(this.list2.indexOf(on)==-1){
				this.list2.push(on);
			}
		},
		cs2(on){
			this.list[this.list2.splice(on,1)].isAc='';
		},
		qdFn(){	
			if(this.config['qFn']){
				this.$parent[this.config['qFn']]();	 
				return
			}
			this.$emit('qFn')
		
		},
		show(){

			this.$refs.tcBox.show();
		},
		close(){
			if(this.config['closeFnd']){
				this.$parent[this.config['closeFnd']]();
			}			
			this.$refs.tcBox.close();
		},
	}
}		
	
</script>

<style>
.igL{
	width: 960px;
	height: 544px;
	overflow-y: hidden;
}
.igL_l,.igL_r{
	display: inline-block;
	vertical-align: top;
}
.igL_l{
	width:780px;
	height:544px;
	background:rgba(244,246,249,1);
}
.igL_l_1{
	padding: 30px 0;
}
.igL_l_1>div{
	padding: 0 40px;
}
.igL_up_1{
	position: relative;
	height: 42px;
	text-align: left;
	margin-bottom: 20px;
}
.igL_up_1_1{
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
}
.igL_up_1_2{
	font-size:12px;
	color:rgba(153,153,153,1);
	line-height:17px;
}
.igL_up_1_3{
	position: absolute;
	right: 40px;
	bottom: 0;
	box-sizing: border-box;
	text-align: center;
	line-height: 31px;
	font-size:14px;
	color:rgba(102,102,102,1);
	width:100px;
	height:32px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	border:1px solid rgba(187,187,187,1);
}
.igL_r{
	
    overflow: hidden;
    overflow-y: auto;
	width: 180px;
	height: 500px;
}
.igL_up_L{
	overflow: hidden;
	margin: 0 20px 20px 0;
	display: inline-block;
	vertical-align: top;
	text-align: left;
	width:220px;
	height:156px;
	background:rgba(255,255,255,1);
	border-radius:5px;
}
.igL_l_1_2{
	position: relative;
	text-align: left;
	margin-right: -40px;
}
.igL_up_L_1{
	position: relative;
	overflow: hidden;
	width:220px;
	height:124px;
	border-radius:5px 5px 0px 0px;

	margin-bottom: 6px;
}
.igL_up_L_1>div{
	width:220px;
	height:124px;
}


.igL_up_L_2{
	position: relative;
	padding: 0 10px;
	text-align: left;
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.igL_up_L_2_1{
	display: inline-block;
	vertical-align: top;
	width: 127px;
	height: 20px;
}
.igL_up_L_2_2{
	position: absolute;
	right: 10px;
	top:0;
	color:rgba(187,187,187,1);

}
.igL_l_box{
	overflow-y: auto;
	height: 453px;
}
.igL_r{
	padding: 30px 0;
}
.igL_up_Box{
	display: inline-block;
	vertical-align: top;
}
.igL_r>div{
	margin: 0 auto 30px;
	width:100px;
	height:56px;
	box-shadow:0px 2px 6px 0px rgba(0,0,0,0.1);
	border-radius:5px;
}
.igL_r_1>div{
	width:100px;
	height:56px;
	
}
.igL_r_1{
	
}
.myis{
	overflow: hidden;
	margin: 0;
	width: 0;
}

</style>
