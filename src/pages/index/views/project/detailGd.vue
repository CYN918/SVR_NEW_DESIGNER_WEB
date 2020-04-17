<template>
	<div class="box">
		<div v-if="djsshow.d" class="topGd_04_1">
			<span v-if="djsshow.d>0">
				{{djsshow.d}}<span>天</span>
			</span><span>
				{{djsshow.h+':'+djsshow.m+':'+djsshow.s}}
			</span>
		</div>
	</div>
</template>

<script>
export default {
	props:{
		obj:Object,	
	},
	data(){
		return{
			djsshow:{}
		}
	},
	mounted: function(){
		this.init();
	},
	methods: {
		init(){
			this.djsshow = this.$parent.djstimd;
		},
		setTim(t){
			this.djsshow = t;
		},
	}
}
</script>

<style scoped="scoped">
.box{
	margin-top: 6px;
	padding-left: 13px;
}
.topGd_04_1>span{
	color:rgba(255,146,0,1);
}
</style>
