<template>
	<div class="centLcen">
		<div class="centLcen_1">作业流程指南</div>
		<div class="centLcen_2" v-for="(el,index) in List" :key="index">
			<div class="centLcen_2_1">
				<span>{{index+1}}</span>
				<span>{{el.t}}</span>
			</div>
			<div class="centLcen_2_2">							
				<a target="_blank" v-for="(el2,index2) in el.L" :href="'/#/help?on='+el2.u" :key="index2">{{el2.n}}</a>				
			</div>
		</div>
		
	</div>	
</template>
<script>
export default {
	data(){
		return{
			shareData:{},
			List:[
				{t:'项目报名',L:[{n:'如何报名项目？',u:'4-02'},{n:'为什么要认证供稿人？',u:'4-04'}]},
                {t:'项目中标',L:[{n:'如何提高中标率？',u:'4-07'},{n:'如何得知是否中标？',u:'4-08'}]},
                {t:'项目制作',L:[{n:'制作要求是什么？',u:'4-05'},{n:'特殊原因无法制作？',u:'4-09'}]},
                {t:'项目交稿',L:[{n:'交稿延期了怎么办？',u:'4-10'},{n:'交稿文件太大/上传慢怎么办？',u:'4-11'}]},
                {t:'平台验收',L:[{n:'验收标准是什么？',u:'4-12'},{n:'如何避免多次返工？',u:'4-14'}]},
                {t:'获得收益',L:[{n:'项目收益怎么定？',u:'4-13'},{n:'如何提现？',u:'4-15'}]}	
			]
		}
	},
	methods: {	
		
	}
}
</script>
<style>
.centLcen{
	padding: 40px 0 32px;
}
.centLcen_1{
	margin-bottom: 20px;
	font-size:16px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:22px;
}
.centLcen_2{
	text-align: left;
	padding: 0 40px;
	margin-bottom: 20px;
}

.centLcen_2_1{
	margin-bottom: 5px;
}
.centLcen_2_1>span:nth-child(1){
	margin-right: 15px;
	display: inline-block;
	border-radius: 50%;
	font-size:14px;
	font-weight:400;
	color:rgba(0,0,0,0.25);
	line-height:31px;
	text-align: center;
	width:31px;
	height:31px;
	border:1px solid rgba(0,0,0,0.15);
}
.centLcen_2_1>span:nth-child(2){
	display: inline-block;
	font-size:14px;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:20px;
}
.centLcen_2_2{
	margin-left: 17px;
	
	border-left: 1px solid rgba(217,217,217,1);
	padding:0 0 0 30px;
}
.centLcen_2_2>a{
	display: block;
	font-size:14px;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:20px;
	margin-bottom: 5px;
}
.centLcen_2_2>a:hover{
	color:#33B3FF;
}
</style>
