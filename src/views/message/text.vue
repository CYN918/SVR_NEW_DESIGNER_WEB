<template>
	<div>
		<headNav :config="navData"></headNav>
		<router-view/>
	</div>
</template>

<script>
import headNav from '../../components/myHead2'
export default {
	components:{headNav},
	name: 'index',
	data(){
		return{
			navData:{
				title:'文档服务中心',
				arr:[
					{u:'/text/about',n:'关于我们'},
					{u:'/text/userProtocol',n:'用户协议'},
					{u:'/text/authorization',n:'授权协议'},
					{u:'/text/help',n:'帮助中心'}
				]
			}
		}
	},	
}	
</script>

<style>
.content{
	max-width: 1300px;
	margin: 80px auto;
    text-align: left;
    min-height: 666px;
}
.content p{
	margin: 20px auto;
}
</style>
