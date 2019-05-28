<template>
	<div class="csBox">
		<list :config="data">
			<template v-slot:todo="{ todo }">
				<box_a :el="todo"></box_a>
			</template>			
		</list>
	</div>
</template>

<script>
import list from '../../components/list';
import box_a from '../../components/box_a';
export default {
	components:{list,box_a},
	name: 'into',	 
	data(){	
		return{
			data:{
				ajax:{
					url:'a_getWork',
				},
				setp:(da)=>{
					if(!this.$route.query.id){
						this.$router.push({path:'/activvity'})	
						return false
					}
					da.type=1;
					da.activity_id = this.$route.query.id;
					return true;
				}
			},	
		}		
	}, 
	methods:{

	},
}
</script>
<style>
</style>
