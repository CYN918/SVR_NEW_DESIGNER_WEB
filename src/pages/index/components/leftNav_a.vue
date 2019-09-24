<template>
	<div class="leftNav_a">
		<div :class="['leftNav_a1',isTop]">
			<div class="leftNav_a2">
				<div  v-for="(el,index) in navDta" :key="index" @click="setNavd(index)" :class="[index==navdOn?'action':'']">{{el.n}}</div>
			</div>			
		</div>			
	</div>
</template>
<script>
export default {
	props:{
		navDta:Array,
	},
	data(){
		return{
			navdOn:'',
			isTop:'',
			len:0,
		}
	},
	mounted: function () {
		this.init();
		this.cs();
	}, 	
	methods: {	
		init(){
			this.navdOn=0;
		},
		cs(){
			document.removeEventListener('scroll',this.setTop);
			document.addEventListener("scroll",this.setTop);
		},
		setNavd(on){					
			this.navdOn = on;
			if(this.navDta[on].num){				
				this.setScll(this.navDta[on].num);	
			}
			if(this.navDta[on].tj){
				this.bdtj(this.navDta[on].tj[0],this.navDta[on].tj[1],'--');
			}									
		},
		setTop(e){	
			this.len = this.navDta.length;
			let t = document.documentElement.scrollTop||document.body.scrollTop;

			if(t<=60){	
				this.navdOn=0;
				this.isTop='';
				return
			}
		
			this.isTop = 'isTople';
			for(let i=this.len-1;i>0;i--){
				if(this.navDta[i].num<=t){
					this.navdOn = i;
					break; 
				}
			}
		},

	},
	watch: {	
		'$route': function() {
			this.init();
		},
	}
}
	
</script>
<style>
.leftNav_a{
	display: inline-block;
	vertical-align: top;
	margin-right: 20px;
	border-radius: 5px; 
    width: 310px;
}
.leftNav_a1>div{
	background: #FFFFFF;
    border-radius: 5px;
    width: 310px;
}
.leftNav_a2>div{
	position: relative;
    line-height: 59px;
    font-size: 14px;
    color: #1E1E1E;
    border-bottom: 1px solid #E6E6E6;
    text-indent: 30px;
    cursor: pointer;
}
.leftNav_a2>div.action {
    color: #FF5121;
}
.leftNav_a2>div.action:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: #FF5121;
    width: 3px;
    height: 100%;
}
.isTople{
	z-index: 10000;
	position: fixed;
    top: 13%;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 1300px;
}

</style>