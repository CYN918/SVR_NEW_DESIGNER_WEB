<template>
	<div class="csBox">
		<baner></baner>
		<list :config="data">
			<template v-slot:todo="{ todo }">
				<box_a :el="todo"></box_a>
			</template>			
		</list>
	</div>
</template>
<script>
import baner from './banner';
import list from '../components/list';
import box_a from '../components/box_a';
export default {
	components:{baner,list,box_a},
	name: 'home',
	data(){
		return {
			data:{
				type:'box_a',
				ajax:{
					url:'getHList',
				}
			},	
		}
	},
	mounted: function(){}, 
	methods: {}
}
</script>

<style>
</style>