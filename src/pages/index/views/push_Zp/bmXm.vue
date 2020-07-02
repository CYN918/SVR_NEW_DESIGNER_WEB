<template>
	<tanC :title="'选择可投稿的原创作品'">
		<template v-slot:todo="{ todo }">
			<div class="ps_wkj_01" @scroll="test">
				
					<ul class="bmXm_03">
						
						<li v-for="(el,index) in List" :key="index">
							<img class="bmXm_03_1" :src="el.face_pic">
							<div class="bmXm_03_2">
								{{el.work_name.slice(0,10)}}
								<img v-if="el.is_recommend==1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/imge/new/works/icon_r.svg" alt="">
							</div>
							<div class="bmXm_03_3">
								<span>{{el.classify_1_name}}</span>
								{{el.classify_2_name+'-'+el.classify_3_name}}
								
							</div>
							<span @click="chekcfN(el)" class="ps_wk_xzxm">选择投稿</span>
						</li>
						<div ref="botmm"></div>	
											
						<div v-if="isnoData">
							<img class="tgndat_1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/empty_nodata.svg"/>
							<div class="tgndat_2">没有可投稿的原创作品，你可以在上传原创作品时选择直接投稿</div>
							<div @click="goFn('/upload')" class="tgndat_3 pend">上传原创作品</div>
						</div>
					</ul>
				
			</div>
		</template>			
	</tanC>
</template>
<script>
import tanC from '../../components/tanC';
export default {
	components:{tanC},
	props:{
		value:Object,
	},
	data(){
		return{
			page2:1,
			List:[],
			isnoData:'',
			getType:'',
			noGd:'',
			total:0,
		}
	},
	
	mounted: function(){
		this.init();
	},
	methods: {	
		chekcfN(obj){
			this.value.obj = obj;
			console.log(obj);
			this.close();
		},	
		init(){
			this.getSelfWorkList();
		},
		close(){	
			this.value.zj = '';			
		},
		test(){
			let data = this.$refs.botmm.getBoundingClientRect();
			if(data.top<800 && !this.getType && !this.noGd){
				if(this.total<40){
					this.noGd=1;
					return
				}				
				this.page2++;
				this.getSelfWorkList();
			}
		},
		
		getSelfWorkList(){
			if(this.getType==1){return}
			if(!window.userInfo){return}
			let pr = {
				status: 2,
				page: this.page2,
				limit: 40,
				classify_1: 1,
				is_project_delivery: 0
			};
			this.getType=1;
			
			this.api.getSelfWorkList(pr).then((da)=>{
				
				if(da=='error' || da=='104'){
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
	}
}		
	
</script>

<style>
.ps_wkj_01{
	width: 917px;
    padding: 30px;
	height: 546px;
	overflow: hidden;
	overflow-y: auto;
}
.ps_wk_xzxm{
	cursor: pointer;
	display: none;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	width:118px;
	height:38px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	border:1px solid rgba(187,187,187,1);
	font-size:14px;
	text-align: center;
	color:rgba(102,102,102,1);
	line-height:38px;
}
.bmXm_03>li:hover .ps_wk_xzxm{
	display: block;
}
.tgndat_1{
    width: 960px;
    margin-top: 52px;
}
.tgndat_2{
    font-size: 14px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(187,187,187,1);
    line-height: 20px;
    text-align: center;
}
.tgndat_3{
	width: 120px;
    height: 40px;
    background: rgba(51,179,255,1);
    border-radius: 5px;
    text-align: center;
    line-height: 40px;
    margin: 20px auto 0;
    color: #fff;
    font-size: 14px;
}
</style>
