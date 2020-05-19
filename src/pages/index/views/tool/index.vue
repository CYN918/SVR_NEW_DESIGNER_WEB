<template>
	<div>
		<Header></Header>
		<router-view/>
		<Footer></Footer>
		<p v-if="isAd" class="tfbox">
			<img @click="goFn('/syPage')" class="tfbox_bn" src="/imge/tools/tip_banner.jpg"/>
			<img @click="checkAd()" class="tfbox_cl" src="/imge/tools/Toast_closed.svg"/>
		</p>
		
	</div>
</template>

<script>
import Header from '../header';
import Footer from '../footer2';
export default {
	components:{Header,Footer},
	data(){
		return{
			isAd:true,
		}
	},
	methods:{
		checkAd(){
			this.isAd = false;
		},
	}
}
</script>
<style>
.tfbox{
	cursor: pointer;
	position: relative;
	display: block;
	width: 100%;
}
.tfbox_bn{
	display: block;
	width: 100%;
}
.tfbox_cl{
	
    position: absolute;
    right: 14%;
    top: 16px;
}

</style>