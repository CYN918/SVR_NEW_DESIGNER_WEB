<template>
	<div class="setMt">
		<div class="setMt_01">
			媒体库<span>请上传图片、MP4格式（视频大小10MB以内，视频上传后自动处理为无声）</span>
		</div>
		
		<ul class="setMt_03">
			<li>
				<span class="setMtUp">
					<img src="\imge\new\tools\n/up.svg">
					上传视频/图片
				</span>
				
			</li><li>
				<span class="setMtUp">
					<img src="\imge\new\tools\n/up.svg">
					上传视频/图片
				</span>
				
			</li><li>
				<span class="setMtUp">
					<img src="\imge\new\tools\n/up.svg">
					上传视频/图片
				</span>
				
			</li><li>
				<span class="setMtUp">
					<img src="\imge\new\tools\n/up.svg">
					上传视频/图片
				</span>
				
			</li><li>
				<span class="setMtUp">
					<img src="\imge\new\tools\n/up.svg">
					上传视频/图片
				</span>
				
			</li><li>
				<span class="setMtUp">
					<img src="\imge\new\tools\n/up.svg">
					上传视频/图片
				</span>
				
			</li>
		</ul>
	</div>
</template>

<script>
</script>

<style>
.setMt{
	padding: 24px 24px 0 24px;
}
.setMt_01{
	font-size:16px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:24px;
	margin-bottom: 16px;
}
.setMt_01>span{
	margin-left: 8px;
	font-size:12px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:20px;
}
.setMt_03>li{
	cursor: pointer;
	position: relative;
	display: inline-block;
	vertical-align: top;
	width:180px;
	height:100px;
	background:rgba(40,40,40,1);
	border-radius:10px;
	margin: 0 16px 16px 0;
}
.setMt_03>li:after{
	content: "";
	position: absolute;
	top: o;
	left: 0;
	border-radius:10px;
	background: rgba(0,0,0,.3);
	width: 100%;
	height: 100%;
}
.setMt_03>li:hover:after{
	display: none;
}
.setMtUp{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	font-size:14px;
	color:#fff;
	line-height:20px;
}
.setMtUp>img{
	display: block;
	margin: 0 auto 5px;
	width: 25px;
}
</style>
