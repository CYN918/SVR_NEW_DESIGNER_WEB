<template>
	<TcBox :config="con" ref="tcBox">
		<template v-slot:todo="{ todo }">
			<div class="igL">
				<div class="igL_l">
					<div class="igL_l_1">
						<div class="igL_up_1">
							<div class="igL_up_2t">请选择至少<span>1个符合</span>项目需求的<span>原创作品</span>作为案例</div>
						</div>
						<div class="igL_l_box">
							<div class="igL_l_1_2" >
								<div class="igL_up_Box" v-for="(el,index) in list" :key="index">
									<div v-if="!el.isAc"  @click="cs(index)" class="igL_up_L">
										<div class="igL_up_L_1 mxImgbg">
											<div :style="Imgbj(el.face_pic)"></div>
										</div>
										<div class="igL_up_L_2">
											<div class="igL_up_L_2N_1">
												<span class="hft">{{el.work_name}}</span>
												<img v-if="el.is_recommend==1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/works/icon_r.svg" />
											</div>
											<div class="igL_up_L_2N_2">
												<span>{{el.classify_1_name}}</span>{{el.classify_2_name}}-{{el.classify_3_name}}
											</div>
											
										</div>
									</div>
								</div>
								<div ref="botmm"></div>
								<img v-if="isnoData" class="upImnoData" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/k/empty_nodata@3x.png"/>
								
							</div>
						</div>
					</div>
				</div>
				<div class="igL_r">
					<p class="igL_rt">已选案例（{{list2.length}}）</p>
					<div class="igL_r_1 mxImgbg closeX_1Hv" @click="cs2(index)" v-for="(el,index) in list2" :key="index">
						<div :style="Imgbj(list[el].face_pic)"></div>
						<p class="closeX_1">
							<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/new/close1.svg"/>
						</p>
					</div>
				</div>
			</div>
			<div class="qxBm_btns qxBm_btns2">

				<div class="btn-lod btns btns_js pend" @click="cs">
					<i v-if="getType" class="loading_a m_c"></i>
					<span v-else @click="pushBm">提交报名 ({{list2.length}})</span>
				</div>		
									
			</div>
		</template>			
	</TcBox>

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
			isnoData:'',
			postData:{
				deal_type:1,
				work_ids:[],
			},
			noGd:'',
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
		test(){
			if(this.noGd){
				return
			}
			let data = this.$refs.botmm.getBoundingClientRect();
			if(data.top<800 && !this.getType && !this.noGd){
				if(this.total<40){
					this.noGd=1;
					return
				}
				
				this.page++;
				this.getList();
			}
		},
		pushBm(){
			let pn = this.list2.length;
			if(pn==0){
				this.$message({message:'请先选择作品'})
				return 
			}
			this.postData.work_ids = [];
			for(let i=0;i<pn;i++){
				this.postData.work_ids.push(this.list[this.list2[i]].work_id);
			}
			this.api.pr_signup(this.postData).then((da)=>{
				if(da=='error'){return}
				this.$message({message: '报名成功'});
				this.close();
				this.$parent.setBm(1);
				this.$parent.getData();
			}).catch(()=>{
				
			});
		},
		getSelfWorkList(){
			if(this.getType==1){return}
			if(!window.userInfo){return}
			let pr = {
				status:2,
				page:this.page2,
				limit:40,
				classify_1:1,
			};
			this.getType=1;
			
			this.api.getSelfWorkList(pr).then((da)=>{
				
				if(da=='error'){
					if(this.List.length==0){
						this.isnoData=1;
					}
					return
				}
				if(this.List.length>0 && this.page2!=1){
					this.List = this.List.concat(da.data);
					return
				}
		
				this.total = da.total;
				this.List = da.data;
				if(this.List.length==0){
					this.isnoData=1;
				}
			})
		},
		getList(){
			this.isnoData='';
			if(!window.userInfo){return}
			this.api.getPersonalWorkList({
				activity_id:45,
				page:this.page,
				limit:40,
			}).then((da)=>{
				if(da=='error'){return}
				// if(da.data.length==0){
				// 	this.noGd=1;
				// }
				if(this.list.length>0){
					this.list = this.list.concat(da.data);
					return
				}
				
				this.list = da.data;
				if(this.list.length==0){
					// this.isnoData=1;
				}
			})
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
	cursor: pointer;
	overflow: hidden;
	margin: 0 20px 20px 0;
	text-align: left;

	width:210px;
	height:224px;
	background:rgba(255,255,255,1);
	box-shadow:0px 3px 9px 0px rgba(0,0,0,0.06);
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
	width:210px;
	height:157px;
	border-radius:5px 5px 0px 0px;

	margin-bottom: 6px;
}
.igL_up_L_1>div{
	width:210px;
	height:157px;
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
	cursor: pointer;
	position: relative;
	margin: 0 auto 30px;
	width:100px;
	height:75px;
	box-shadow:0px 2px 6px 0px rgba(0,0,0,0.1);
	border-radius:5px;
	overflow: hidden;
}
.igL_r_1>div{
	position: relative;
	border-radius: 5px;
	width:100px;
	height:75px;
	
}
.igL_r_1{
	
}
.myis{
	overflow: hidden;
	margin: 0;
	width: 0;
}
.igL_up_2t{
	font-size: 14px;
	color: #333;
}
.igL_up_2t>span{
	margin: 0 5px;

	font-weight: 600;
}
.igL_rt{
	font-size: 12px;
	color: #bbb;
	margin-bottom: 10px;
}
.igL_up_L_2N_1{
	position: relative;
	height:20px;
	line-height:20px;
	font-size:14px;
	color:rgba(51,51,51,1);
	margin-bottom: 7px;
}
.igL_up_L_2N_1>span{
	width:152px;
}
.igL_up_L_2N_1>img{
	position: absolute;
	right: 0;
	top: 5px;
}
.igL_up_L_2N_2{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:22px;
}
.igL_up_L_2N_2>span{
	display: inline-block;
	vertical-align: top;
	padding: 0px 8px;
	margin-right: 5px;
	height:22px;
	background:rgba(244,246,249,1);
	border-radius:5px;
}
</style>
