<template>
	<tanC :title="'报名项目'">
		<template v-slot:todo="{ todo }">
			<div class="qxBm_btns_1">是否确认取消报名？</div>	
			<div class="qxBm_btns">
				<div @click="close" class="btns pend">取消</div>
				<div @click="pr_cancelSignup" class="btns btns_js pend">确定</div>				
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
		return{
			ajtype:false,
		}
	},
	methods: {
		gorz(){
			this.is='';
		},
		pr_cancelSignup(){
			if(this.ajtype){
				this.tipMr('正在处理请稍后')
				return
			}
			this.ajtype = true;
			let str = this.datad.project_type==0?'招标':'长期';
			this.bdtj('项目详情页',str+'项目-招募期','确认[取消报名]');			
			this.api.pr_cancelSignup({
				project_id:this.datad.id,
			}).then((da)=>{
				this.ajtype = false;
				if(da=='error' || da=='104'){return}
				this.$parent.setBm(0);
				this.$parent.getData();
				this.$parent.close();
			}).catch(()=>{
				this.ajtype = false;
			});
		},
		close(){
			this.$parent.close();
		},
	}
}		
	
</script>

<style>
.qxBm_btns_1{
	margin: 30px 84px;
}
.qxBm_btns{
	border-top: 1px solid rgba(244,246,249,1);
	height: 80px;
	line-height: 80px;
}
</style>
