<template>
	<div class="md_nav_01">		
		<span @click="ckezt(el.id,index)" :class="on==el.id?'checks':''" v-for="(el,index) in navs" :key="el.id">{{el.name}}</span>
	</div>
</template>
<script>
export default {
	props:{value:Object},
	data(){
		return {
			navs:[],
			on:1,
			mr:'精选推荐'
		}
	},
	mounted: function(){
		this.init()		
	}, 
	methods: {
		init(){
			this.value.classify_name = this.mr;
			this.getsubject();
		},
		ckezt(id,index){
			this.bdtj("首页","点击专题Tab",this.navs[index].name);
			this.on = id;
			this.value.classify_name = this.navs[index].name;
			this.$parent.$parent.qhZt(this.on);
	
			this.$parent.$parent.specialname = this.navs[index].name;
		},
		getsubject(){
			this.api.subject().then((da)=>{
				if(da=='error' || da=='104'){
					return
				}
				da.unshift({
					id:1,
					name:this.mr,
				})
				this.navs = da;
			})
		}
		
	}
}
</script>

<style>
.md_nav_01>span{
	display: inline-block;
	vertical-align: top;
	height:20px;
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
	margin: 0 20px;
	cursor: pointer;
}
.md_nav_01>span:hover{
	color: #33B3FF;
}
.md_nav_01>span.checks{
	color: #33B3FF;
	/* border-bottom: 3px solid;
    padding-bottom: 27px; */
}
</style>