<template>
	<tanC :title="'投稿作品'">
		<template v-slot:todo="{ todo }">
			<!-- <div class="home_tc_0">
				你还不是供稿人，现在立即认证，获得作品变现收益
				<span class="pend" @click="goFn('/setPersonal')">前往认证</span>
			</div> -->
			<div class="home_tc_0 home_tc_1">
				<div>
					<img :src="setImgU('home/tgzp.svg')">
					<div class="home_tc_2">原创作品投稿，一经验收，永久分成</div>
					<div @click="goFncl('/pushZp')" class="lBtbn">投稿作品</div>
				</div>
				<div>
					<img :src="setImgU('home/dctg.svg')">
					<div class="home_tc_2">
						项目只做一次没做够？来这里多次交稿，交多少收多少！
					</div>
					<div @click="goFncl('/dcpushZp')" class="lBtbn">项目多次交稿</div>
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
			this.value.zj = '';
		},
		goFncl(p){
			this.value.zj = '';
			this.goFn(p)
		}
	}
}		
</script>
<style>

.home_tc_0{
	width: 670px;
	padding: 40px 0;
}
.home_tc_0>span{
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
.home_tc_1>div{
	display: inline-block;
	vertical-align: top;
	margin:0 20px;
	width: 192px;
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
.home_tc_2{
	font-size:12px;
	color:rgba(102,102,102,1);
	line-height:17px;
	height: 34px;
	margin-bottom: 20px;
}
</style>
