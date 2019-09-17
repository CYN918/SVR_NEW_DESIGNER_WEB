<template>
	<div>
		<Header></Header>
		<router-view/>
		<Footer>Footer</Footer>
	</div>
</template>

<script>
import Header from './header';
import Footer from './footer';

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
