<template>
	<TcBox :config="config" ref="tcBox">
		<template v-slot:todo="{ todo }">
			<div class="qxBm_btns_1">{{config.cent}}</div>	
			<div class="qxBm_btns">
				<div @click="close" class="btns pend">取消</div>		
				<div @click="qdFn" class="btns btns_js pend">确定</div>	
									
			</div>
		</template>			
	</TcBox>
</div>
</template>
<script>
import TcBox from './TcBox';
export default {
	components:{TcBox},
	props:{
		config:Object,
	},
	methods: {
		qdFn(){	
			if(this.config['qFn']){
				this.$parent[this.config['qFn']]();	 
				return
			}
			this.$emit('qFn')
		
		},
		show(){

			this.$refs.tcBox.show();
		},
		close(){
			if(this.config['closeFnd']){
				this.$parent[this.config['closeFnd']]();
			}			
			this.$refs.tcBox.close();
		},
	}
}		
	
</script>

<style>

</style>
