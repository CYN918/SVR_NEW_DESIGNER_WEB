<template>
	<tanC :title="'交稿记录'">
		<template v-slot:todo="{ todo }">
			<div class="jglogbox">
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
						<div class="log_hid">{{el.type==2?el.access_code:el.file_size}}</div>
						
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
						<div @click="fileCy(el)" class="log_tipbox" v-if="el.check_status != -2 && el.check_status != -1">撤回</div>
						
					</div>
					<qxGj v-if="isShow" :datad="datad"></qxGj>
		
					

					
					
				</div>	
			</div>
			
			
			<div class="ylt" v-if="ylt">
				<div>
					<img class="ippic" :src="ylt"/>
					<img @click="closepick()" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/cj_00.svg"class="ylt_03 pend">
				</div>
				
			</div>
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
		fileCy(data){
			this.isShow = true;
			this.datad = data;
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
				if(da=='error'){return}
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

.jglogbox{
	text-align: left;
	padding: 20px 60px;
	overflow: hidden;
	overflow-y: auto;
	width: 944px;
	height: 553px;
}


.jgtitle{

	background:rgba(242,242,242,.5);
	font-size:14px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:38px;
}
.jgbix>div{
	display: inline-block;
	vertical-align: top;
	margin-right: 20px;
	text-align: left;

}
.log_hid{
	overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.jgbix>div:nth-child(1){
	padding-left:20px;
	width: 245px;
	height: 58px;

}
.jgbix>div:nth-child(2){
	width: 116px;
}
.jgbix>div:nth-child(3){
	width: 105px; 
}
.jgbix>div:nth-child(4){
	width: 104px;
}
.jgbix>div:nth-child(5){
	width: 104px;
}
.jgbix>div:nth-child(6){
	min-width: 28px;
	max-width: 198px;
}
.jgcent{

	font-size:14px;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height: 53px;
	border-bottom:1px solid rgba(244,246,249,1);
	float: left;
}
.log_tipbox{
	cursor: pointer;
	position: relative;
	color: #33B3FF;
	float: left;
	margin-left: 5px;
}
.log_tipbox2{
	color: #666;
}
.log_tipbox2 .log_tip{
	width: auto;
	left: 0;
}
.log_tipbox2 .log_tip:after{
	left: 30px;
}
.log_tipbox:hover>.log_tip{
	display: inline-block;
}
.log_tip{
	display: none;
	z-index: 1;
	position: absolute;
	top: 50px;
    width: 232px;
    right: -85px;  
    background: #fff;
    -webkit-box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.1);
   	box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.1);
   	box-sizing: border-box;
	word-wrap:break-word;
    padding: 20px 16px;
    font-size: 14px;
    font-weight: 400;
    color: #666;
    line-height: 20px;
    text-align: left;
}
.log_tip1{
	display: block;
	margin-bottom: 10px;
}
.log_tip:after{
	content: "";
    position: absolute;
    left: 50%;
    top: -3px;
    width: 15px;
    height: 15px;
    background: #fff;
    -webkit-transform: rotate(45deg) translateX(-50%);
    transform: rotate(45deg) translateX(-50%);
    border: 1px solid rgba(152, 144, 144, 0.1);
    border-right: 0;
    border-bottom: 0;
}
.nogd{
	height: 200px;
}
.ylt{position: fixed;
	top: 0;
	left: 0;
	z-index: 100004;
	background: rgba(0, 0, 0, 0.4);
	width: 100%;
	height: 100%;
}
.ylt>div{
	position: absolute;
	top: 50%;
	left: 50%;
	background: #fff;
	padding: 30px;
	border-radius: 5px;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
}
.ylt>div>img.ippic{
	display: block;
	max-width: 1300px;
	max-height: 600px;
}
.ylt_03{
	position: absolute;
    top: 10px;
    right: 10px;
}
</style>
