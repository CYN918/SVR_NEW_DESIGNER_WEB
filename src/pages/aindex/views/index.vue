<template>
	<div>
		<Header></Header>
		<router-view/>
		<Footer></Footer>
	</div>
</template>

<script>
import Footer from '../components/footer';
import Header from '../components/header';
export default {
	name: 'index',
	components:{Header,Footer},
}
</script>
