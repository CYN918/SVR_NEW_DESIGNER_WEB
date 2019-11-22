<template>
	<ListTemp :config="configData">
		<template v-slot:todo="{ todo }">
			<workDom :el="todo"></workDom>
		</template>				
	</ListTemp>
</template>

<script>
import ListTemp from '../../components/list';
import workDom from '../../components/workDom';
export default {
	components:{ListTemp,workDom},
	name: 'home',
	data(){
		return {
			configData:{ajaxUrl:'getUserWorkList',prms:{n:'user_open_id',v:()=>{return this.$route.query.id}}},
		}
	},	
	mounted: function () {	
		
	}, 
	methods: {
		
	}
}
</script>

<style lang="scss">

</style>
