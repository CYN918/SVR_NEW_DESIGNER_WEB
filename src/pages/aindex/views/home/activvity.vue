<template>
	<div>
		<ListTemp :config="configData">
			<template v-slot:todo="{ todo }">
				<div @click="goPth(todo.id)" v-if="todo" class="homeList">
					<div class="homeList_1" :style="setImg(todo.cover_img?todo.cover_img:todo.banner)"></div>
					<div class="homeList_2 nox"><span>{{backName(todo.activity_name.slice(0,4))}}</span></div>
					<div class="homeList_gg nox"><span class="sfsafas">{{backName(todo.category_name)+' | '+todo.start_time.slice(0,10)+'-'+todo.end_time.slice(0,10)}}</span><span class="rigto xsff"><span v-if="todo.left_day">进行中</span><span v-else>已结束</span></span></div>
				</div>
			</template>				
		</ListTemp>
	</div>
</template>
<script>
import ListTemp from '../../components/list';
export default {
	components:{ListTemp},
	name: 'home',
	data(){
		return {
			configData:{ajaxUrl:'a_getList'},
		}
	},
	
	mounted: function () {	
	
	}, 
	methods: {
		goPth(id){
			this.$router.push({path:'/conta',query:{id:id}});
		},
		setImg(ur){
			return 'background-image: url('+ur+');';
		},
		backtime(time){
			return	window.getTimes(time);
		},
		backName(n){
			if(!n){
				return
			}
			return n.slice(0,10);
		}
	}
}
</script>

<style>
.homeList_gg{
	font-size: .4rem;
	color: #878787;
}
.sfsafas{
    font-size: .54rem;
    display: inline-block;
    height: 1rem;
}
.xsff{
	display: inline-block;
	font-size: .54rem;
}
</style>
