<template>
	<tanC :title="'交稿记录'">
		<template v-slot:todo="{ todo }">
			<div class="jglogbox">
				<div class="jgbix jgtitle">
					<div>交稿文件</div>
					<div>文件大小</div>
					<div>交稿时间</div>
					<div>验收结果</div>
					<div>验收反馈时间</div>
					<div>驳回理由</div>
				</div>
				<div v-for="(el,index) in List" :key="index" class="jgbix jgcent">
					<div>{{el.file_name | nameLent}}</div>
					<div>{{el.file_size}}</div>
					<div>{{el.created_at | logtime}}</div>
					<div>{{el.check_status | typsuu}}</div>
					<div>{{el.updated_at | logtime}}</div>
					<div @mouseout="mod()" @mouseover="modx($event,0)">{{el.check_reason}}</div>
				</div>
			</div>
			<tipd :tipCent="csff" :style="sfas" ref="csdf"></tipd>
		</template>			
	</tanC>
</template>
<script>
import tanC from '../../components/tanC';
import tipd from './cenTip';
export default {
	components:{tanC,tipd},
	data(){
		return{
			List:[],
			csff:'',
			sfas:'display:none',
		}
	},
	filters: {
		nameLent:(v)=>{
			if (!v) return '';
			let on = v.split('.');
			let onlen = on[0].length-12;
			if(onlen>0){
				on[0] = on[0].substring(0,12)+'...';
			}
			
			return on[0]+'.'+on[1];
		},
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
			let str = '待审核';
			
			switch (v){
				case '-2':str = '已撤销';
					break;
				case '-1':str = '已驳回';
					break;
				case '1':str = '已验收';
					break;
				default:
					break;
			}
			
			return str;
		}
	 
	},
	mounted: function(){
		this.init();
	},
	methods: {	
		init(){
			this.pr_deliveryList();
		},
		pr_deliveryList(){
			
			this.api.pr_deliveryList({
				project_id:this.$parent.deta.id,
			}).then((da)=>{
				if(da=='error'){return}
				// -2 已撤销  -1 已驳回 0 待审核 1 已验收
				// let pd = {file_name:'项目文件名称最长显示字符.zip',file_size:'100M',remark:'列表根据驳回文字自适应高度',check_status:0,check_time:'2012/22/22',:'2019/02/19',}
				// // da = [];
				// 
				this.List = da;
			}).catch(()=>{
				
			});
		},
		close(){
			this.$parent.close();
		},
		mod(e){
			this.sfas = 'display:none';
		},
		modx(e,on){
			this.csff = this.list[on].remark;
			this.setPos(e.clientX,e.clientY);
		},
		setPos(x,y){
			this.sfas = 'top:'+y+'px;left:'+x+'px';
		},
	}
}		
	
</script>

<style>
.jglogbox{
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
	margin-right: 20px;
	text-align: left;
}
.jgbix>div:nth-child(1){
	padding-left:20px;
	width: 194px;
}
.jgbix>div:nth-child(2){
	width: 81px;
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
	width: 198px;
}
.jgcent{

	font-size:14px;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height: 53px;
	border-bottom:1px solid rgba(244,246,249,1);
}

</style>
