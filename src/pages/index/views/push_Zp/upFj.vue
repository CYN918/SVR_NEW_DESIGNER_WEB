<template>
	<div>
		<span @click="upFn()" class="ps_zp_09 pend">{{(value[0] && value[0].bfb==100)?'重新选择':'选择文件'}}</span>
		<div class="ps_zp_10" v-if="value[0]">
			<div class="upfj_01">
				<span class="iconfont upfj_02">&#xe621;</span>
				<div class="upfj_03">
					{{value[0].name}}			
					<span @click="delet()" class="iconfont pend upfj_04" >&#xe619;</span>
					<span class="upfj_05" :style="{transform:'translateX(-'+(100-value[0].bfb)+'%)'}"></span>
				</div>
			</div>		
		</div>
		<div class="upfj_012"><uploadFile v-model="value" :cg="fileConfig" ref="upfile"></uploadFile></div>
	</div>
</template>

<script>
import uploadFile from '../../components/uploadFileArr'
export default{
	components: {uploadFile},
	props:{value:Array},
	data(){
		return{
		
			fileConfig:{			
				max:1*1024*1024*1024,
				userType:'user_info',
				isAarr:true,
			},			
		}
	},
	methods:{
		upFn(){
			this.$refs.upfile.upfile(0);		
		},
		delet(){
			this.$refs.upfile.deletfile(0);
		}

	}
}
</script>
<style>
.ps_zp_09{
	display: inline-block;
	vertical-align: top;
	width:88px;
	height:30px;
	background:rgba(255,255,255,1);
	border-radius:16px;
	border:1px solid rgba(151,151,151,1);
	line-height: 30px;
	text-align: center;
	font-size:14px;
	color:rgba(51,51,51,1);
}
.ps_zp_10{
	display: inline-block;
	vertical-align: top;
	margin-left: 46px;
	width: 294px;
}
.upfj_01{
	position: relative;
	width: 100%;
}
.upfj_02{
	position: absolute;
	top: 2px;
	left: -24px;
}
.upfj_03{
	position: relative;
	overflow: hidden;
	border-bottom: 1px solid rgba(0,0,0,0.06);;
	font-size:14px;
	line-height:31px;
	color:rgba(102,102,102,1);

}
.upfj_04{
	position: absolute;
	right: 0;
	top: 2px;
	color: #979797;
	font-size: 12px;
}
.upfj_05{
	position: absolute;
	bottom: 0;
	left: 0;
	background: #33B3FF;
	border-radius: 4px;
	height: 2px;
	width: 100%;
}
.upfj_012{
	display: none;
}
</style>
