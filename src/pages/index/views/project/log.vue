<template>
	<tanC :title="'交稿记录'">
		<template v-slot:todo="{ todo }">
			<div class="newLog_01" >
				<div class="newLog_02" v-for="(el, idx) in List" :key="idx">
					<div class="newLog_03">
						<div class="newLog_04">
							<Carousel :interval="5000" height="102px" indicator-position="none" arrow="always">
								<CarouselItem v-for="pic in el.preview_pic" :key="pic">
									<div class="newLog_preview_pic">
										<img  :src="pic">
									</div>
								</CarouselItem>
							</Carousel>
					
						</div>						
						<div class="newLog_05">
							<div class="newLog_06">
								<span :class="['newLog_07','newLog_07_'+el.check_status]">{{comState.check_status[el.check_status]}}</span>
								<span class="newLog_08">{{tc_N(el)}}</span>
							</div>
							<div class="newLog_09">
								{{tc_N2(el)}}
							</div>
							<div class="newLog_09">交稿时间：{{el.created_at | logtime}}</div>
							<div class="newLog_09 newLog_10">验收时间：{{el.updated_at | logtime}}</div>
						</div>
					</div>
					<div class="newLog_12">
						{{el.remark}}
					</div>
					<div class="newLog_13">
						<span  @click="fileCy(el)" v-if="checkCh(el)" class="pend">撤回稿件</span>
						<span v-if="el.check_status==-1" class="bh_013">
							驳回原因
							<div class="newLog_13_1">
								<div>{{el.check_reason}}</div>
								<div>{{el.check_comment}}</div>
							</div>
						</span>
					</div>					
				</div>
				<qxGj class="logqxgj" v-if="isShow" :datad="data"></qxGj>
			</div>
		</template>			
	</tanC>
</template>
<script>
import tanC from '../../components/tanC';
import qxGj from './qxGj';
import { Carousel, CarouselItem } from 'element-ui'

export default {
	components:{tanC,qxGj, Carousel, CarouselItem },
	props: {
		datad: Object
	}	,
	data(){
		return{
			List:[],
			csff:'',
			sfas:'display:none',
			ylt:'',
			isShow:false,
			data:{},
			index:0,
			pagename:"项目详情页"

		}
	},
	filters: {
		logtime:(now)=>{
			let t = new Date(now);
			var year=t.getFullYear(); 
			var month=t.getMonth()+1; 
			var date=t.getDate(); 
			month = month<10?('0'+month):month;
			date = date<10?('0'+date):date;
			return year+"/"+month+"/"+date; 	
			 
		},
		typsuu:(v)=>{
			if(v==-2){
				return '已撤销'
			}
			if(v==-1){
				return '已驳回'
			}
			if(v==1){
				return '已验收'
			}
			return '待审核';
		}
	 
	},
	computed:{
		
	},
	mounted: function(){
		this.init();
	},
	methods: {
		picP(el){
			if(!el.picOn || el.picOn==0){
				return
			}
			el.picOn--;
		},
		picN(el){
			if(!el.picOn){
				return
			}
			if(!Array.isArray(el.pics)){
				return
			}
			let ond = el.pics.length-1;
			if(ond==el.oicOn){
				return
			}
			
			el.picOn++;
		},
		tc_N(el){
			return el.type==2?el.online_disk_url:el.file_name
		},
		tc_N2(el){
			return el.type==2?`网盘密码：${el.access_code}`:`文件大小：${el.file_size}`
		},
		comtn(el){
			let str = `<div class="newLog_06">
				<span class="newLog_07 newLog_07_${el.check_status}">${this.comState.check_status[el.check_status?el.check_status:0]}</span>
				<span class="newLog_08">${el.type==2?el.online_disk_url:el.file_name}</span>
			</div>`;
			str +='<div class="newLog_09">';
			if(el.type==2){
				str +='<span>网盘密码：jhjbhg</span>';
			}else{
				str +='<span>文件大小：100M</span>';
			}
			str+='</div>';
			str+=`<div class="newLog_09">交稿时间：2019-09-09 09:00</div>`;
			str+=`<div class="newLog_09 newLog_10">验收时间：2019-09-09 09:00</div>`;
			return str;
		},
		// 格式化预览图数据
		formatPreviewPic(picsStr) {
			let pics = []

			try {
				pics = JSON.parse(picsStr)
			} catch (error) {
				pics = [picsStr]
			}
			return pics
		},
		checkCh(el,index){
			this.index = index;
			if(this.datad.project_type == 4) {
				return false;
			}else if(el.status==4 && el.check_steps!=1 && [-2,-1,1].indexOf(+el.check_status)==-1){
				return true;
			}
			return false;
		},
		fileCy(data){
			if(data.check_steps==1){
				this.tipMr('项目已在审核中，请勿撤回')				
				return
			}
			this.isShow = true;
			this.data = {id:data.project_id};
		},
		closepick(){
			this.ylt = '';
		},
		getstate(){
			let state = '--';
			if(this.List[this.index].status == '1'){
				state = '招募期'
			} else if(this.List[this.index].status == '2'){
				state = '选标期'
			} else if(this.List[this.index].status == '3'){
				state = '制作期'
			}  else if(this.List[this.index].status == '4'){
				state = '待验收'
			}else if(this.List[this.index].status == '5'){
				state = '已验收'
			}
			return state;
		},
		showPic(i){
			this.ylt = i;
		},
		init(){
			this.pr_deliveryList();		
		},
		pr_deliveryList(){			
			this.api.pr_deliveryList({
				project_id:this.$parent.deta.id,
			}).then((da)=>{
				if(da=='error' || da=='104'){return}

				da.forEach(item => {
					item.preview_pic = this.formatPreviewPic(item.preview_pic)
				})
				this.List = da;
			}).catch(()=>{
				
			});
		},
		close(){
			this.$parent.close();
		},

	}
}		
	
</script>

<style lang="scss">
@import "~styles/define.scss";

.newLog_01{
	width: 720px;
	padding: 40px 0;
	max-height: 600px;
	overflow: hidden;
	overflow-y: auto;
}
.newLog_02{
	position: relative;
	padding: 20px;
	margin: 0 auto 20px;
	width:530px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	border:1px solid rgba(0,0,0,0.15);
}
.newLog_03{
	text-align: left;
}
.newLog_04{
	display: inline-block;
	vertical-align: top;
	width:136px;
	height:102px;
	border-radius:5px;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	margin-right: 20px;
}
.newLog_05{
	display: inline-block;
	vertical-align: top;
}
.newLog_06{
	margin-bottom: 8px;
	width: 260px;
}
.newLog_07{
	display: inline-block;
	vertical-align: top;
	width:62px;
	height:22px;
	background:rgba(255,146,0,0.1);
	border-radius:4px;
	border:1px solid rgba(255,146,0,1);
	margin-right: 10px;
	font-size: 14px;
	line-height: 22px;
	text-align: center;
}
.newLog_08{
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:24px;
	margin-bottom: 8px;
}
.newLog_09{
	text-align: left;
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
	margin-bottom: 8px;
}
.newLog_10{
	margin-bottom: 0;
}
.newLog_12{
	text-align: left;
	margin-top: 10px;
	padding-top: 10px;
	border-top:1px solid rgba(244,246,249,1);
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.newLog_07_0{
	border-color: #FF9200;
	background: rgba(255,146,0,0.1);
	color: #FF9200;
}
.newLog_07_-1{
	border-color: #FF3B30;
	background: rgba(255,59,48,0.1);
	color: #FF3B30;
}
.newLog_07_1{
	border-color: #4DC600;
	background: rgba(77,198,0,0.1);
	color: #4DC600;
}
.newLog_07_-2{
	border-color: #BBBBBB;
	background: rgba(187, 187, 187, .1);
	color: #BBBBBB;
}
.newLog_13{
	position: absolute;
	top: 90px;
	right: 20px;
	
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:30px;
}
.newLog_13>span{
	display: inline-block;
	vertical-align: top;
	text-align: center;
	width:98px;
	height:30px;
	background:rgba(255,255,255,0.1);
	border-radius:5px;
	border:1px solid rgba(216,216,216,1);
}
.newLog_13>span.bh_013{
	cursor: pointer;
	position: relative;
	border-color: rgba(255,59,48,1);
	color: rgba(255,59,48,1);
	background: rgba(255,59,48,.1);
}
.bh_013:hover .newLog_13_1{
	display: block;
} 
.newLog_13_1{
	display: none;
	position: absolute;
	width: 530px;
    top: 40px;
    right: -20px;
	padding: 15px 20px;
    background: rgba(255,255,255,1);
    box-shadow: 0px 8px 24px 0px rgba(0,0,0,0.2);
    border-radius: 4px;
	text-align: left;
}
.newLog_13_1:after{
	content: "";
	position: absolute;
	top: 0px;
	right: 2px;
}
.newLog_04{
	position: relative;
	@include border;
}
.newLog_04>span{
	position: absolute;
}
.newLog_preview_pic{
	width: 136px;
	height: 102px;
	display: flex;
	justify-content: center;
	align-items: center;
	>img{
		max-width: 100%;
		max-height: 100%;
	}
}
</style>
