<template>
	<div>
		<div class="u_top1"></div>
		<div class="u_top2">
			<img class="u_top2_1" :src="userBg" alt="">
			<div class="u_top2_2">
				
			</div>
		</div>
		<div class="u_top1"></div>
	</div>
</template>

<script>

import {Message} from 'element-ui'
export default {
	name: 'index',
	data(){
		return{
			userBg:'/imge/grzx_bg.png'
		}
	}
}	
</script>

<style>
.u_top2{
	position: relative;
}
.u_top2{
	background: #000000;
	border-radius: 10px;
}
</style>
