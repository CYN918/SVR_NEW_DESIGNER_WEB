<template>
	<TcBox :config="config" ref="tcBox">
		<template v-slot:todo="{ todo }">
			<div class="qxBm_btns_1">{{config.cent}}</div>	
			<div class="qxBm_btns">
				<div @click="qdFn" class="btns pend">确定</div>	
				<div @click="close" class="btns btns_js pend">取消</div>							
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
			this.$parent[this.config['qFn']]();	 
		},
		show(){

			this.$refs.tcBox.show();
		},
		close(){
			this.$parent[this.config['closeFnd']]();
			this.$refs.tcBox.close();
		},
	}
}		
	
</script>

<style>

</style>
