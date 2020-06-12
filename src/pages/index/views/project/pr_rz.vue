<template>
	<tanC :title="'报名项目'">
		<template v-slot:todo="{ todo }">
			<div class="pr_rzd">
				<div class="pr_rzd_1">报名前你还需要完成以下事项</div>
				<div class="pr_rzd_2">
					<div v-if="datad.contributor_format_status == '1'">
						<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/rz_01.svg" alt="">
						<div>完成供稿人认证</div>
						<div class="btns btns_js pend" style="background:#999999;border-color:#999999;color:#FFFFFF;">认证审核中</div>
					</div>
					<div v-if="datad.contributor_format_status == '0'">
						<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/rz_01.svg" alt="">
						<div>完成供稿人认证</div>
						<div @click="goTo('/setPersonal')" class="btns btns_js pend">立即认证</div>
					</div>
					<div v-if="datad.contributor_format_status == '-1'">
						<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/rz_01.svg" alt="">
						<div>完成供稿人认证</div>
						<div @click="goTo('/setPersonal')" class="btns btns_js pend" style="background:#999999;border-color:#999999;color:#FFFFFF;">认证失败再次认证</div>
					</div>
					<div @click="goTo('/upload')" v-if="datad.work_num<=3">
						<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/rz_02.svg" alt="">
						<div>上传并通过3个原创作品（{{datad.work_num}}/3）</div>
						<div class="btns btns_js pend">立即创作</div>
					</div>
					<div v-if="!datad.is_complete">
						<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/rz_03.svg" alt="">
						<div>完善个人能力资料</div>
						<div @click="goTo('/setSkill')" class="btns btns_js pend">立即完善</div>
					</div>
				</div>
			</div>
		</template>			
	</tanC>
</template>
<script>
import tanC from '../../components/tanC';
export default {
	components:{tanC},
	props:{
		datad:Object
	},
	data(){
		return{}
	},
	created(){
	

	},
	methods: {	
		gorz(){
			this.is='';
		},
		close(){
			this.$parent.close();
		},
		goTo(p){
			let ps ='';
			if(p == '/setPersonal'){
				ps = '[立即认证]'
			} else if  (p == '/upload') {
				ps = '[立即上传]'
			} else if (p == '/setSkill'){
				ps = '[去完善]'
			}
			if(this.$parent.getstate()){
				this.bdtj('项目详情页',"未达到报名资格",ps)
			}
			
			this.$router.push({path: p})	
		}
	}
}		
	
</script>

<style>
.pr_rzd{
	white-space: nowrap;
	padding: 30px 67.5px;
}
.pr_rzd_1{
	margin-bottom: 30px;
	font-size:14px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:20px;
}
.pr_rzd_2>div{
	display: inline-block;
	margin: 0 22.5px;
}
.pr_rzd_2>div>img{
	display: block;
	margin-bottom: 10px;
	width: 178px;
	height: 100px;
}
.pr_rzd_2>div>div:nth-child(2){
	margin-bottom: 30px;
	font-size:14px;
	text-align: center;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.tbn_1{
	
}
</style>
