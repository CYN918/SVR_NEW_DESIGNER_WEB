<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<style lang="scss">
html,body,div,img,p{
	margin: 0;
	padding: 0;
	border: none;
}
html,body{
	min-width: 1300px;
	
}
html{
	height:100%;
}
body{
	position: relative;
	min-height:100%;
}
a{list-style-type: none}
:link{text-decoration:none;}
a:visited{text-decoration:none;}
a:hover{text-decoration:none;}
a:active{text-decoration:none;}
@font-face {
	font-family: 'iconfont';
	src: url('/font/iconfont.eot');
	src: url('/font/iconfont.eot?#iefix') format('embedded-opentype'),
	url('/font/iconfont.woff') format('woff'),
	url('/font/iconfont.ttf') format('truetype'),
	url('/font/iconfont.svg#iconfont') format('svg');
}
.iconfont{
	font-family:"iconfont" !important;
	font-size:16px;font-style:normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;

}
.pend{
	cursor: pointer;	
}
.pend:hover{
	opacity: .7;
}
 input::-webkit-input-placeholder{
    color:#c0c4cc;
}
input::-moz-placeholder{   
    color:#c0c4cc;
}
input:-moz-placeholder{ 
   	color:#c0c4cc;
}
input:-ms-input-placeholder{
    color:#c0c4cc;
}
</style>
