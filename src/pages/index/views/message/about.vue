<template>
	<div class="content">
	    <div v-if="isMr">
	        <p style="margin:10px auto; orphans:0; text-align:center; widows:0">
	            <span style="font-family:微软雅黑; font-size:14pt; font-weight:bold">关于我们</span>
	        </p>
	        <p style="margin:10px auto; orphans:0; text-indent:21pt; widows:0">
	            <span style="font-family:微软雅黑; font-size:10.5pt">狮</span>
	            <span style="font-family:微软雅黑; font-size:10.5pt">圈儿</span>
	            <span style="font-family:微软雅黑; font-size:10.5pt">创作者平台，2</span>
	            <span style="font-family:微软雅黑; font-size:10.5pt">019</span>
	            <span style="font-family:微软雅黑; font-size:10.5pt">年在深圳出身，聚集了数万名优质的设计师、摄影师、插画师等各行业创作者</span>
	            <span style="font-family:微软雅黑; font-size:10.5pt">。</span></p>
	        <h1 style="font-size:14pt; line-height:241%; margin:17pt 0pt 16.5pt; orphans:0; page-break-after:avoid; page-break-inside:avoid; text-align:justify; widows:0"><span style="font-family:微软雅黑; font-size:14pt; font-weight:bold">狮</span><span style="font-family:微软雅黑; font-size:14pt; font-weight:bold">圈儿能为你提供什么？</span></h1><h2 style="font-size:12pt; line-height:173%; margin:13pt 0pt; orphans:0; page-break-after:avoid; page-break-inside:avoid; text-align:justify; widows:0"><span style="font-family:微软雅黑; font-size:12pt; font-weight:normal">作品展示交流</span></h2><p style="margin:10px auto; orphans:0; text-indent:21pt; widows:0"><span style="font-family:微软雅黑; font-size:10.5pt">作为汇集了各路豪杰创作者的平台，其本身拥有优质的流量用户，以及舒适的同领域交流环境，不但能为每一位创作者提供作品曝光展示，也为创作者之间交流创作提供了良好的媒介。</span></p><h2 style="font-size:12pt; line-height:173%; margin:13pt 0pt; orphans:0; page-break-after:avoid; page-break-inside:avoid; text-align:justify; widows:0"><span style="font-family:微软雅黑; font-size:12pt; font-weight:normal">优质作品变现</span></h2><p style="margin:10px auto; orphans:0; text-indent:21pt; widows:0"><span style="font-family:微软雅黑; font-size:10.5pt">“让创作发挥最大价值”，是我们期望在互联网界打造的创作者平台的口号与目标。</span><span style="font-family:微软雅黑; font-size:10.5pt">平台会定期发布</span><span style="font-family:微软雅黑; font-size:10.5pt">征集活动，</span><span style="font-family:微软雅黑; font-size:10.5pt">无论你的创作技能是绘画、是摄影、是U</span><span style="font-family:微软雅黑; font-size:10.5pt">I</span><span style="font-family:微软雅黑; font-size:10.5pt">设计、甚至是程序员，你都可以在这里</span><span style="font-family:微软雅黑; font-size:10.5pt">找到适合的征集活动，</span><span style="font-family:微软雅黑; font-size:10.5pt">获得与创作作品价值相匹配的收益</span><span style="font-family:微软雅黑; font-size:10.5pt">报酬。</span></p><h2 style="font-size:12pt; line-height:173%; margin:13pt 0pt; orphans:0; page-break-after:avoid; page-break-inside:avoid; text-align:justify; widows:0"><span style="font-family:微软雅黑; font-size:12pt; font-weight:normal">知名企业合作</span></h2><p style="margin:10px auto; orphans:0; text-indent:21pt; widows:0"><span style="font-family:微软雅黑; font-size:10.5pt">狮</span><span style="font-family:微软雅黑; font-size:10.5pt">圈儿</span><span style="font-family:微软雅黑; font-size:10.5pt">与</span><span style="font-family:微软雅黑; font-size:10.5pt">众多一线互联网企业均有商业合作，创作者所设计的作品素材，会经平台征集后，使用在他们的产品上得以呈现。努力帮助创作者的作品获得更大价值，获取更多人认可，也是</span><span style="font-family:微软雅黑; font-size:10.5pt">狮</span><span style="font-family:微软雅黑; font-size:10.5pt">圈儿一直在做的事情。</span></p></div><div class="cnzz" style="display: none;">
		</div>
		<div v-html="comt" v-if="!isMr"></div>
	</div>
</template>

<script>
export default {
	name: "text_about",
	data(){
		return{
			comt:'',
			isMr:'',
		}
	},	
	mounted: function(){
		this.init();
	}, 
	methods: {
		init(){
			let pr = {
				type:'about'
			};
			this.api.documentget(pr).then((da)=>{
				if(da=="error" || !da.document){this.isMr=1;return}
				this.comt = da.document;
			}).catch(()=>{
				this.isMr=1;
			});
		},
	}
	
	
}
</script>

<style>
</style>
