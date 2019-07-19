<template>
	<div class="csBox">
		<list :config="data">
			<template v-slot:todo="{ todo }">
				<box_a :tjData="bdtjdata" :el="todo"></box_a>
			</template>			
		</list>
	</div>
</template>
<script>
import list from '../../components/list';
import box_a from '../../components/box_a';
export default {
	components:{list,box_a},
	name: 'home',	 
	data(){	
		return{
			data:{
				ajax:{
					url:'a_getWork',					
				},
				pr:{
					type:2,
				},
				bdtj:[['活动','Tag-录用作品-翻页'],['活动','Tag-录用作品-更改单页显示数']]
			},	
			bdtjdata:[['活动','Tag-录用作品-作品'],['活动','Tag-录用作品-创作者']],
		}		
	}, 
	created(){
		this.init();
	},
	methods: {
		init(){
			if(!this.$route.query.id){
				this.$router.push({path:'/activvity'})	
				return false
			}	
			this.data.pr.activity_id = this.$route.query.id;
		}
	}
}
</script>

<style>
</style>
