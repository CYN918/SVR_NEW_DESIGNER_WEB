<template>
	<tanC :title="'稿件撤回'">
		<template v-slot:todo="{ todo }">
			<div class="qxBm_btns_1">项目运营可能正在浏览你的稿件，<br/>确定要撤回？</div>	
			<div class="qxBm_btns">
				<div @click="pr_revokeDelivery" class="btns  pend">确定</div>
				<div @click="close" class="btns btns_js pend">取消</div>
				
			</div>
		</template>			
	</tanC>
</template>
<script>
import tanC from '../../components/tanC';
export default {
	components:{tanC},
	props:{
		data:Object
	},
	data(){
		return{}
	},
	methods: {	
		gorz(){
			this.is='';
		},
		pr_revokeDelivery(){
		
			this.api.pr_revokeDelivery({
				project_id:this.$parent.deta.id,
			}).then((da)=>{
				if(da=='error'){return}
				this.$parent.setStaus('3');
				this.$message({message:"撤回稿件成功"});
				this.$parent.getData();
				this.$parent.close();
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
.qxBm_btns_1{
	font-size:14px;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:20px;
	margin: 30px 84px;
}
.qxBm_btns{
	border-top: 1px solid rgba(244,246,249,1);
	height: 79px;
	line-height: 79px;
}
</style>
