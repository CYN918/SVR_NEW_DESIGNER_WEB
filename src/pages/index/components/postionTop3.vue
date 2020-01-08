<template>
	<div ref="topBoxd">
		<div :class="isTop">
			<slot name="todo" v-bind:todo="isTop"></slot>
		</div>
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
			topOn:0,
			adfn:'',
		}
	},
	mounted: function(){
		this.init();
	}, 
	beforeDestroy:function(){
		this.remove();
		window.onresize = '';
	},
	methods: {	
		init(){				
			window.onload = ()=>{
				let t = this.mJs.getTop();
				this.topOn = t+this.$refs.topBoxd.getBoundingClientRect().top;					
			}	
			this.add();
			window.onresize = ()=>{
				let t = this.mJs.getTop();
			    this.topOn = t+this.$refs.topBoxd.getBoundingClientRect().top;
			}
		},	
		setTop(e){				
			let t = this.mJs.getTop();

			if(t>=this.topOn && !this.isTop){
				this.isTop='p_isTop';
				return
			}
			if(t<this.topOn && this.isTop=='p_isTop'){				
				this.isTop='';
				return
			}
		},
		throttle(func, delay){
			var timer = null;
			var startTime = Date.now();     
			return function() {             
			    var curTime = Date.now();             
			    var remaining = delay - (curTime - startTime);             
			    var context = this;             
			    var args = arguments;             
			    clearTimeout(timer);              
			    if (remaining <= 0) {                    
			        func.apply(context, args);                    
			        startTime = Date.now();              
			    } else {                    
			        timer = setTimeout(func, remaining);              
			    }      
			}
		},
		add(){	
			this.adfn = this.throttle(this.setTop, 50);
			window.addEventListener('scroll', this.adfn);
		},
		remove(){
			window.removeEventListener('scroll',this.adfn);
		},
	}
}	
</script>

<style>
.p_isTop{
	position: fixed;
}
.pos_001>div{
	top: 0;
	left: 0;
	width: 100%;
	background: inherit;
	z-index: 999;
}
</style>
