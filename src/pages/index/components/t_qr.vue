<template>
	<div class="pr_tc_01">
		<div class="pr_tc_02">			
			<div class="pr_tc_04">
				{{value.title}}<img @click="close" class="pr_tc_03 pend" src="/imge/project/cj_00.svg" alt="">
			</div>
			<div class="qxBm_btns_1">{{value.cent}}</div>	
			<div class="qxBm_btns">
				<div @click="close" class="btns pend">取消</div>		
				<div @click="qdFn" class="btns btns_js pend">确定</div>										
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
	props:{
		value:Object,
	},
	methods: {
		qdFn(){	
			this.$emit('qdFn')		
		},
		close(){
			this.$emit('close')
			this.$emit('input',{});
		},
	}
}		
	
</script>

<style>

</style>
