<template>
	<TcBox :config="outc"  @qFn="Follow_del" ref="tcBox"></TcBox>
</div>
</template>
<script>
import TcBox from './TcBoxQr';
export default {
	components:{TcBox},
	data(){
		return{
			outc:{
				title:'取消关注确认',
				scroll:1,
				cent:'是否取消关注?',
			},
			follwTyle:'',
			follwId:''
		}
	},
	methods: {			
		Follow_del(){
			if(!window.userInfo){return}			
			if(this.follwTyle==1){
				return
			}
			this.follwTyle=1;
			let pr = {
				follow_id:this.follwId
			};
			this.api.Follow_del(pr).then((da)=>{
				this.follwTyle=0;
				if(da=='error'){					
					return
				}
				this.$emit('sussFn');
				this.close();
				this.$message({message:'取消关注成功'});
			}).catch(()=>{
				this.follwTyle = 0;		
			});
		},
		setFollowId(a){
			if(!a){
				this.$message({message:'数据错误请稍后重试'});
				return
			}
			this.follwId = a;
			this.show();
		},
		show(){
			this.$refs.tcBox.show();
		},
		close(){
			this.$refs.tcBox.close();
		},
	}
}		
	
</script>

<style>

</style>
