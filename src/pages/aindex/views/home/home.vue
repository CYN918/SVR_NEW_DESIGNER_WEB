<template>
	<div>
		<ListTemp :data="configData">
			<div class="homeList">
				<div><img src="" alt=""></div>
				<div>小魔熊-设计品牌IP形象<span></span></div>
				<div>平面-海报 <span>3天前</span></div>
				<div>
					<img src="" alt="">jagger
					<span><img src="" alt="">9342<img src="" alt="">9342</span>
				</div>
			</div>
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
	}
}
</script>

<style>
.homeList{
	width: 12rem;
	
}
</style>
