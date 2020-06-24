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
	inject:['reload'],
	props:{
		datad:Object
	},
	data(){
		return{
			qxType:'',
		}
	},
	methods: {	
		gorz(){
			this.is='';
		},
		pr_revokeDelivery(){
			
			if(this.$parent.$parent.getstate){
				this.bdtj(this.$parent.$parent.pagename,this.$parent.$parent.getstate(),'[确定]撤回稿件')
			} 
			if(this.$parent.getstate){
				console.log(this.$parent.pagename,this.$parent.getstate(),'[确定]撤回稿件',"《《《《《《《")
				this.bdtj(this.$parent.pagename,this.$parent.getstate(),'[确定]撤回稿件')
			} 
			
			if(this.datad.check_steps==1){
				this.tipMr('项目已在审核中，请勿撤回')
				this.close();
				return
			}
			
			if(this.qxType){
				this.$message({message:"正在撤回请稍后"});
				return
			}
			this.qxType=1;
			this.api.pr_revokeDelivery({
				project_id:this.datad.id,
			}).then((da)=>{
				this.qxType='';
				if(da=='error' || da=='104'){return}
				if(this.$parent.setStaus){
					this.$parent.setStaus('3');
				}
				this.$message({message:"撤回稿件成功"});
				this.reload();				
				this.close();
			}).catch(()=>{
				this.qxType='';
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
	text-align: center;
	border-top: 1px solid rgba(244,246,249,1);
	height: 80px;
	line-height: 80px;
}
</style>
