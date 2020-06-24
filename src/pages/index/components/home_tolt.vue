<template>
	<tanC :title="'投稿作品'">
		<template v-slot:todo="{ todo }">
			<div class="home_tolt home_tolt_1">
				<div>
					<img :src="setImgU('home/tgzp.svg')">
					<div class="home_tolt_2">你还不是供稿人，现在立即认证，获得作品变现收益</div>
					<div @click="goFncl('/tolt')" class="lBtbn">前往认证</div>
				</div>
			</div>
		</template>			
	</tanC>
</template>
<script>
import tanC from '../components/tanC';
export default {
	props:{value:Object},
	components:{tanC},
	methods: {	
		close(){
			this.bdtj('作品投稿页','不是供稿人提示框','点击[关闭]');
			this.value.zj = '';
		},
		goFncl(p){
			this.bdtj('作品投稿页','不是供稿人提示框','点击[前往认证]');
			this.value.zj = '';
			this.goFn(p)
		}
	}
}		
</script>
<style>

.home_tolt{
	width: 470px;
	padding: 40px 0;
}
.home_tolt>span{
	margin: 20px auto 0;
	display: block;
	width:120px;
	height:40px;
	background:rgba(51,179,255,1);
	border-radius:5px;
	font-size:14px;
	text-align: center;
	color:rgba(255,255,255,1);
	line-height:40px;
}
.home_tolt_1>div{
	display: inline-block;
	vertical-align: top;
	margin:0 20px;
}
.lBtbn{
	cursor: pointer;
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
.lBtbn:hover{
	opacity: .7;
}
.home_tolt_2{
	font-size:12px;
	color:rgba(102,102,102,1);
	line-height:17px;
	height: 34px;
	margin-bottom: 20px;
}
</style>
