<template>
	<div>
		<TcBox :config="outc2"  @qFn="Follow_del" ref="tcBox"></TcBox>
	    <loginDialog ref="logindialog" :config="outc"></loginDialog>	
	</div>
</template>
<script>
import TcBox from './TcBoxQr';
import loginDialog from '../components/loginDialog';
export default {
	components:{TcBox,loginDialog},
	data(){
		return{
			outc2:{
				title:'取消关注确认',
				scroll:1,
				cent:'是否取消关注?',
				qFn:'Follow_del',
			},
			follwTyle:'',
			follwId:'',
			outc:{
				num:'',
				scroll:2,
			}
		}
	},
	methods: {			
		Follow_del(){
			if(!window.userInfo){
				this.$refs.logindialog.show();
				this.outc.num = 1;
				return
			}	
			if(this.follwTyle==1){
				this.$message({message:'正在处理中请稍后'});
				return
			}
			this.follwTyle=1;
			let pr = {
				follow_id:this.follwId
			};
			this.api.Follow_del(pr).then((da)=>{
				this.follwTyle=0;
				if(da=='error' || da=='104'){					
					return
				}
				this.$emit('suUnFn');
				this.$message({message:'取消关注成功'});
				
				this.close();				
			}).catch(()=>{
				this.follwTyle = 0;		
			});
		},
		Follow_add(id){
			if(!window.userInfo){
				this.$refs.logindialog.show();
				this.outc.num = 1;
				return
			}

			if(this.follwTyle==1){this.$message({message:'正在处理中请稍后'}) ;return}
			this.follwTyle=1;
			let pr = {
				follow_id:id
			};
			this.api.Follow_add(pr).then((da)=>{
				this.follwTyle=0;
				if(da=='error' || da=='104'){
					return
				}
				this.$emit('suAdFn',da);
				this.$message({message:'关注成功'});
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
