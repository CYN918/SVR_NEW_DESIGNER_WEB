<template>
	<div id="app">
		<!-- <img class="bgd" src="/imge/app/bg3.png" alt=""> -->
		<router-view/>
	</div>
</template>

<style lang="scss">
html,body,div,img,p,ul,li{
	margin: 0;
	padding: 0;
	border: none;
}
html,body{
	position: relative;
	margin: 0 auto;
	height:100%;
}
a{list-style-type: none}
:link{text-decoration:none;}
a:visited{text-decoration:none;}
a:hover{text-decoration:none;}
a:active{text-decoration:none;}
li{list-style-type: none}
.bgd{position: absolute;top: 0;left: 0;z-index: -1;width: 100%}
</style>
