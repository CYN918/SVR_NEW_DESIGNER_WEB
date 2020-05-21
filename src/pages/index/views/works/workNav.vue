<template>
	<div class="md_nav_01">		
		<span @click="ckezt(el.id)" :class="on==el.id?'checks':''" v-for="(el,index) in navs" :key="el.id">{{el.name}}</span>
	</div>
</template>
<script>
export default {
	data(){
		return {
			navs:[],
			on:1,
		}
	},
	mounted: function(){
		this.init()		
	}, 
	methods: {
		init(){
			this.getsubject();
		},
		ckezt(id){
			this.on = id;
			this.$parent.$parent.qhZt(this.on);
		},
		getsubject(){
			this.api.subject().then((da)=>{
				if(da=='error' || da=='104'){
					return
				}
				da.unshift({
					id:1,
					name:'精选推荐',
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