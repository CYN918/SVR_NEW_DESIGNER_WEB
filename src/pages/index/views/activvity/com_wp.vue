<template>
		<div class="pr_tc_01">
			<div class="pr_tc_02">			
				<div class="pr_tc_04">
					网盘信息<img @click="close" class="pr_tc_03 pend" src="/imge/project/cj_00.svg" alt="">
				</div>
				<div class="wp_01" v-html="value.info">
									
				</div>
			</div>
		</div>
</template>

<script>
export default{
	props:{
		value:Object
	},
	methods:{
		close(){
			this.$emit('input',{});
		}
	}
	
}
</script>

<style>
.wp_01{
	padding: 16px;
	text-align: left;
}
</style>
