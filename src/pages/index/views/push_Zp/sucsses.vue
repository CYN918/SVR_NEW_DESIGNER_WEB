<template>
	<tanC :title="'投稿成功'">
		<template v-slot:todo="{ todo }">
			<div class="ps_suc_01">
				<div>
					<img :src="setImgU('push_Zp/wdxm.svg')">
					<div>投稿作品的项目已创建，可在<a class="pend" @click="gof('/projectZz')">[我的项目]</a>内内查看验收审核进度</div>		
					
				</div>
				<div>
					<img :src="setImgU('push_Zp/wdsy.svg')">
					<div>
						该项目收益最快次月开始计算，可在<a class="pend" @click="gof('/profit')">[我的收益]</a>分成收益列表查看
					</div>
					
				</div>
				<p class="ps_suc_01_1">
					<span @click="iKnowClick" class="pend">我知道了</span>
				</p>
				
			</div>
		</template>			
	</tanC>
</template>
<script>
import tanC from '../../components/tanC';
export default {
	components:{tanC},
	props: {
		value: Object
	},
	methods: {	
		iKnowClick(){
			this.bdtj('作品投稿页','提交后-作品投稿提示框','[我知道了]');
			this.close()
		},
		gof(path){
			let map = {
				'/projectZz':'点击[我的项目]',
				'/profit':'点击[我的收益]'
			};
			this.bdtj('作品投稿页','提交后-作品投稿提示框',map[path]);

			let { href } = this.$router.resolve({
				path
			});

			window.open(href, "_blank")
		},
		// 移除当前对话框
		close() {
			this.value.zj = '';
		}
	}
}		
</script>
<style>
.ps_suc_01{
	width: 670px;
	text-align: center;
}
.ps_suc_01>div{
	display: inline-block;
	vertical-align: top;
	margin: 40px 41px 0;
	width: 190px;
	font-size:12px;
	color:rgba(153,153,153,1);
	line-height:17px;
}
.ps_suc_01>div>div>a{
	color: #33B3FF;
}
.ps_suc_01>div>div{
	margin-bottom: 20px;
}
.ps_suc_01>div>img{
	display: block;
	width: 100%;
	margin-bottom: 20px;
}
.ps_suc_01_1{
	margin-top: 20px;
	margin-bottom: 40px;
}
.ps_suc_01_1>span{
	display: inline-block;
	width:120px;
	height:40px;
	background:rgba(51,179,255,1);
	border-radius:5px;
	font-size:14px;
	text-align: center;
	color:rgba(255,255,255,1);
	line-height:40px;
}
</style>
