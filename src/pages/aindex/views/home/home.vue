<template>
	<div>
		<ListTemp :config="configData">
			<template v-slot:todo="{ todo }">
				<div class="homeList">
					<div class="homeList_1" :style="setImg(todo.face_pic)"></div>
					<div>小魔熊-设计品牌IP形象<span></span></div>
					<div>平面-海报 <span>3天前</span></div>
					<div>
						<img src="http://zk-new-designer.oss-cn-beijing.aliyuncs.com/316a5542f048fd72f781c792af75b534.png" alt="">jagger
						<span><img src="/imge/svg/see/zs_icon_dz.svg" alt="">9342<img src="/imge/svg/see/zs_icon_xx.svg" alt="">9342</span>
					</div>
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
			configData:{ajaxUrl:'getHList'},
		}
	},
	
	mounted: function () {	
	
	}, 
	methods: {
		setImg(ur){
			return 'background-image: url('+ur+');';
		}
	}
}
</script>

<style>
.homeList{
	width: 12rem;
	
}
</style>
