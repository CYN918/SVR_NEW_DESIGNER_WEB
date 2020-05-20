<template>
	<div>
		<Header></Header>
		<router-view/>
		<Footer></Footer>
		<component v-bind:is="compData.zj" v-model="compData"></component>			
	</div>
</template>
<script>
import Header from '../header';
import Footer from '../footer2';
import syFlot from '../../adPage/syDownFooterFlot';
export default {
	components:{Header,Footer,syFlot},
	data(){
		return{
			compData:{
				zj:'syFlot',
			},
		}
	},
}
</script>
<style>
</style>