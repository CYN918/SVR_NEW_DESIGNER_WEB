<template>
	<div :class="['page2_1_4',isUpd?'isUpd':'']">
	    <div class="page2Tbnd1">{{fjtext}}</div>
		<uploadFile :setJdt="setJdt1" :sussFn="value.sucss" :cg="value.confg"></uploadFile>
	  
		<div class="page2_1_6" v-if="upfjData.type">
			
			<span class="iconfont" :title="upfjData.file_name">&#xe621;<span style="padding-left: 10px">{{upfjData.file_name?upfjData.file_name.substring(0,10):''}}</span></span>
			<span @click="qxclosd(fileUpfj)" class="iconfont pend" style="float: right;">&#xe619;</span>
			
		</div>
		<div v-if="upfjData.type && isUpd" class="page2_1_5"><span><span :style="{transform:'translateX(-'+(100-upfjData.bf)+'%)'}"></span></span></div>
	</div>
</template>

<script>
import uploadFile from '../../components/uploadFile'
export default{
	components:{uploadFile},
	props:{
		value:Object
	},
	data(){
		return{
			bfb:0,
		}
	},
	methods:{
		setJdt1(on){
			this.bfb = on;
		},
	}
}
</script>

<style>
</style>
