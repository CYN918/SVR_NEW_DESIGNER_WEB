<template>
	<div>
		<ListTemp :config="configData">
			<template v-slot:todo="{ todo }">
				<workDom :el="setUser(todo)"></workDom>
			</template>				
		</ListTemp>
	</div>
</template>
<script>
import ListTemp from '../../components/list';
import workDom from '../../components/workDom';
export default {
	components:{ListTemp,workDom},
	name: 'home',
	data(){
		return {
			configData:{ajaxUrl:'getHList',isUser:1},
		}
	},
	methods: {
		setUser(e){
			e.isUser=1;
			return e;
		},
	}
}
</script>
<style>
</style>
