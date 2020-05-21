<template>
	<t_qr v-if="value.type=='del'"  @qdFn="Follow_cl" @close="close"  v-model="outc"></t_qr>
</div>
</template>
<script>
import t_qr from './t_qr';
export default {
	components:{t_qr},
	props:{
		value:Object,
	},
	data(){
		return{
			outc:{
				title:'取消关注确认',
				cent:'是否取消关注?',
			},
			follwTyle:'',

			atype:'',
		}
	},

	methods: {	
		Follow_cl(){
			let cl = '';
			if(this.value.type=='del'){
				cl = {
					ajx:'Follow_del',
					msg:'取消关注成功',
				};
			}else{
				cl = {
					ajx:'Follow_add',
					msg:'关注成功',
				};
			}
			if(this.atype){
				this.$message({
					message:'正在处理中请稍后'
				})
				return
			}
			this.atype = 1;
			this.api[cl.ajx]({
				follow_id:this.value.id
			}).then((da)=>{
				this.atype=0;
				if(da=='error' || da=='104'){					
					return
				}
				this.$emit('suFn',da);
				this.$message({message:cl.msg});				
				this.close();				
			}).catch(()=>{
				this.atype = 0;		
			});
			
		},		
		close(){
			this.$emit('input',{});
		},
	}
}		
	
</script>

<style>

</style>
