<template>
	<div :class="isTop">
		<slot name="todo" v-bind:todo="isTop"></slot>
	</div>
</template>

<script>
export default {
	props:{
		cn:Object,
	},
	data(){
		return{
			isTop:'',
		}
	},
	mounted: function(){
		this.init();
	}, 
	beforeDestroy:function(){
		this.adFn.remove();
	},
	methods: {	
		init(){
			this.adFn = this.mJs.Jl_fn(this.setTop);
			this.adFn.add();
		},		
		setTop(e){				
			let t = this.mJs.getTop();
			// console.log(t);
			if(t>=this.cn.min && !this.isTop){
				this.isTop='p_isTop';
				return
			}
			if(t<this.cn.min && this.isTop=='p_isTop'){				
				this.isTop='';
				return
			}
		},
	}
}	
</script>

<style>
.p_isTop{
	position: fixed;
}

</style>
