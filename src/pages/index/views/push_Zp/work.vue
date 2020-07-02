<template>

		<div class="ps_zb_box">
			<div class="ps_zp_05">
				<span class="ps_zp_06">投稿信息</span>
			</div>	
			<div class="ps_zp_07">
				<div class="ps_wk_01">
					<span @click="showzp" class="pend">选择作品</span>选择可投稿的原创作品
					<ul v-if="tanc.obj.face_pic" class="bmXm_03 px_wk_x1">
						<li>
							<img class="bmXm_03_1" :src="tanc.obj.face_pic">
							<div class="bmXm_03_2">
								{{tanc.obj.work_name.slice(0,10)}}
								<img v-if="tanc.obj.is_recommend==1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/imge/new/works/icon_r.svg" alt="">
							</div>
							<div class="bmXm_03_3">
								<span>{{tanc.obj.classify_1_name}}</span>
								{{tanc.obj.classify_2_name+'-'+tanc.obj.classify_3_name}}								
							</div>							
						</li>
					</ul>
				</div>
				<div class="ps_zp_pic_3">
					<textarMax :placeholder="'请输入投稿说明'" :max="140" v-model="value.remark" ></textarMax>
				</div>
			</div>
			<component v-bind:is="tanc.zj" v-model="tanc"></component>
		</div>

</template>

<script>
import textarMax from '../../components/textarMax';
import bmXm from './bmXm';
export default{
	components: {textarMax,bmXm},
	props:{value:Object},
	data(){
		return{
			tanc:{
				zj:'',
				obj:{},
			}
		}
	},
	watch:{
		'tanc.obj'(n,b){
			let { work_name, work_id } = this.tanc.obj

			this.value.name = work_name
			this.value.work_id = work_id
			this.value.imgs[0] = { url: this.tanc.obj.face_pic, bfb: 100 };
		},
	},
	methods:{
		showzp(){
			this.tanc.zj= 'bmXm';
		}
	}
}
</script>

<style>
.ps_wk_01{
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:40px;
	margin-bottom: 30px;
}
.ps_wk_01>span{
	display: inline-block;
	vertical-align: top;
	width:120px;
	height:40px;
	text-align: center;
	background:rgba(51,179,255,1);
	border-radius:5px;
	font-size:14px;
	color:rgba(255,255,255,1);
	margin-right: 16px;

}
.px_wk_x1{
	margin-top: 20px;
}
</style>
