<template>
	<tanC :title="'交稿记录'">
		<template v-slot:todo="{ todo }">
			<div class="newLog_01" >
				<div class="newLog_02" v-for="el in List">
					<div class="newLog_03">
						<div class="newLog_04"  :style="setBg(el)"></div>
						<div class="newLog_05">
							<div class="newLog_06">
								<span class="newLog_07"></span>
								<span class="newLog_08">文件名称文件名称文件名称文件名称文件….zip</span>
							</div>
							<div class="newLog_09">
								文件大小：100M
							</div>
							<div class="newLog_09">交稿时间：2019-09-09 09:00</div>
							<div class="newLog_09 newLog_10">验收时间：2019-09-09 09:00</div>
						</div>
					</div>
					<div class="newLog_12">
						交稿说明交稿说明交稿说明交稿说明交稿说明交稿说明交稿说明交稿说明交稿说明交稿
					</div>
					<div class="newLog_13"></div>					
				</div>
				
			</div>
		<!-- 	<div class="jglogbox">
				<div class="jgbix jgtitle">
					<div>交稿文件/网盘链接</div>
					<div>文件大小/提取密码</div>
					<div>交稿时间</div>
					<div>验收结果</div>
					<div>验收反馈时间</div>
					<div>操作</div>				
				</div>
				<div v-for="(el,index) in List" :key="index" class="jgbix jgcent">
					<div class="log_tipbox log_tipbox2">
						<div class="log_hid">{{(el.type==2?el.online_disk_url:el.file_name)}}</div>
						<div v-if="(el.type==2&&el.online_disk_url.length>12) || el.file_name.length>12" class="log_tip">
							{{el.type==2?el.online_disk_url:el.file_name}}
						</div>
					</div>
					<div class="log_tipbox log_tipbox2">
						<div class="log_hid log_hid_00_01">{{el.type==2?el.access_code:el.file_size}}</div>
						
						<div v-if="(el.type==2&&el.access_code.length>12) || el.file_size.length>12" class="log_tip">
							{{ el.type==2?el.access_code:el.file_size}}
						</div>
					</div>
					<div>{{el.created_at | logtime}}</div>
					<div>{{el.check_status | typsuu}}</div>
					<div style="margin-right:6px;">{{el.updated_at | logtime}}</div>
					<div v-if="el.check_status==-1">
						<div class="log_tipbox">
							驳回理由
							<div class="log_tip">
								<span class="log_tip1">{{el.check_reason}}</span>
								{{el.check_comment}}
							</div>		
						</div>
						
										
					</div>
					<div>
						<div @click="showPic(el.preview_pic)" class="log_tipbox" v-if="el.preview_pic">预览</div>
						<div @click="fileCy(el)" class="log_tipbox" v-if="checkCh(el)">撤回</div>
						
					</div>
					<qxGj class="logqxgj" v-if="isShow" :datad="datad"></qxGj>
		
					

					
					
				</div>	
			</div>
			
			
			<div class="ylt" v-if="ylt">
				<div>
					<img class="ippic" :src="ylt"/>
					<img @click="closepick()" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/cj_00.svg"class="ylt_03 pend">
				</div>
				
			</div> -->
		</template>			
	</tanC>
</template>
<script>
import tanC from '../../components/tanC';
import qxGj from './qxGj';

export default {
	components:{tanC,qxGj},	
	data(){
		return{
			List:[],
			csff:'',
			sfas:'display:none',
			ylt:'',
			isShow:false,
			datad:{}
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

	mounted: function(){
		this.init();
	},
	methods: {
		setBg(el){
			let str = el.preview_pic;
			try{
				str = JSON.parse(el.preview_pic)[0]
			}catch(e){
				
			}
		
			return "background-image: url("+str+");";
		},
		checkCh(el){	
			if(el.status==4 && el.check_steps!=1 && [-2,-1,1].indexOf(+el.check_status)==-1){
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
			this.datad = {id:data.project_id};
		},
		closepick(){
			this.ylt = '';
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

<style>
.newLog_01{
	width: 720px;
	padding: 40px 0;
	max-height: 600px;
	overflow: hidden;
	overflow-y: auto;
}
.newLog_02{
	padding: 20px;
	margin: 0 auto 20px;
	width:530px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	border:1px solid rgba(0,0,0,0.15);
}
.newLog_03{
	
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
}
.newLog_08{
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:24px;
	margin-bottom: 8px;
}
.newLog_09{
	font-size:12px;
	color:rgba(187,187,187,1);
	line-height:18px;
	margin-bottom: 8px;
}
.newLog_10{
	margin-bottom: 0;
}
.newLog_12{
	margin-top: 10px;
	padding: 10px 0;
	border-top:1px solid rgba(244,246,249,1);
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:20px;
}
</style>
