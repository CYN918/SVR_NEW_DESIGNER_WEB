<template>
	<div>
		<img style="position: absolute;top: 0;left: 0;width: 100%;z-index: -1;" src="/imge/i1.png" alt="">
		<Header>11</Header>
		<router-view/>
		<Footer>Footer</Footer>
	</div>
</template>

<script>
import Footer from '../components/footer';
import Header from '../components/header';
export default {
	name: 'index',
	components:{Header,Footer},
	data(){
		return {
			
		}
	},
	methods: {
		
	}
}
</script>
