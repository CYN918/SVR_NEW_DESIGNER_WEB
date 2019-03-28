<template>
	<div class="upBoxd">
		<div class="upBoxd1">
			<div class="upBoxd1_1"></div>
			<div class="upBoxd1_2">
				<vue-ueditor-wrap :config="myConfig" v-model="msg"></vue-ueditor-wrap>
			</div>
		</div>
		<div class="upBoxd2">
			<div><span></span></div>
			<div><span></span></div>
			<div><span></span></div>
		</div>
		<UplodImg></UplodImg>
	</div>
</template>

<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
import UplodImg from './uploadImag'
export default {
	name: 'index',
	components:{VueUeditorWrap,UplodImg},
	data(){
		return{
			msg:'<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue + UEditor + v-model双向绑定</h2>',
			myConfig: {
			  // 编辑器不自动被内容撑高
			  autoHeightEnabled: false,
			  // 初始容器高度
			  initialFrameHeight: 240,
			  // 初始容器宽度
			  initialFrameWidth: '100%',
			  // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
			  serverUrl: 'http://35.201.165.105:8000/controller.php',
			  // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
			  UEDITOR_HOME_URL: '/UEditor/'
			}
		}  
	},
}
</script>
<style>

.upBoxd>div{
	display: inline-block;
}
.upBoxd1{
	
}
.upBoxd2,.upBoxd1_1{
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
}
.upBoxd1_1{
	width: 1080px;
	height: 80px;
}
.upBoxd2{
	width: 200px;
	height: 210px;
	vertical-align: top;
}
.upBoxd1_2{
	width: 1080px;
	height: 624px;
}
.edui-default .edui-editor-toolbarboxouter{
	border: none !important;
	background: none !important;
}
</style>
