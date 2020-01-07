<template>
	<header class="header">
		<img @click="goIndex" class="log" src="/imge/new/header/logo.svg" alt="">		
		<!-- <span @click="shar" class="fxbtn">分享</span> -->
	</header>
</template>

<script>
export default {
	name: 'home',	 
	data(){	
		return{}		
	},
	methods:{
		goIndex(){
			this.$router.push({path: '/index'});
		},
		shar(){
			var nativeShare = new NativeShare()
			var shareData = {
			    title: window.document.title,
			    desc: document.querySelector('meta[name="description"]').content,
			    link: window.location.href,
				icon: 'https://shiquaner.zookingsoft.com/imge/new/header/logo.svg',
			    success: function() {
			        alert('success')
			    },
			    fail: function() {
			        alert('fail')
			    }
			}
			nativeShare.setShareData(shareData)
			function call(command) {
			    try {
			        nativeShare.call(command)
			    } catch (err) {
			        alert(err.message)
			    }
			}
			function setTitle(title) {
			    nativeShare.setShareData({
			        title: title,
			    })
			}
			    
		}
		
	},
}
</script>

<style>
.header{
	position: relative;
	width: 100%;
    height: 2rem;
	background:#fff;
	-webkit-box-shadow:0px 2px 6px 0px rgba(0,0,0,0.05);
	box-shadow:0px 2px 6px 0px rgba(0,0,0,0.05);
}
.log{
    display: inline-block;
    vertical-align: middle;
    width: 4.3rem;
    margin: .3rem 0 0 1rem;
}
.fxbtn{
	position: absolute;
    line-height: 2rem;
    font-size: .6rem;
    right: .9rem;
}
</style>
