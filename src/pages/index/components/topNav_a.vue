<template>
	<div >
		<div class="tpN_a">
			<div :class="['tpN_a',isTop]">
				<div class="tpN_a2">
					<span class="tpN_a3">{{navData.title}}</span>
					<div class="setHeadBox_3">
						<a v-for="(el,index) in navData.list" :class="['pend',ison==el.u?'router-link-active':'']" @click="goZP(el.u,el.bdtj)">{{el.n}}</a>								
					</div>
				</div>
			</div>
		</div>		
	</div>	
</template>
<script>
export default {
	name: 'index',
	props:['navData'],
	data(){
		return{
			ison:'',
			isTop:'',
		}
	},
	mounted: function () {
		this.cs();
		this.init();	
	}, 
	
	methods: {	
		init(){
			this.ison = this.$route.fullPath;
		},	
		setTop(e){		
			let t = document.documentElement.scrollTop||document.body.scrollTop;
			if(t==0){
				document.documentElement.scrollTop =1;
				document.body.scrollTop =1;
				return
			}
			if(t>60 && !this.isTop){
				this.isTop='isTop';
				return
			}
			if(t<=60 && this.isTop=='isTop'){				
				this.isTop='';
				return
			}
		},
		cs(){	
			document.removeEventListener('scroll',this.setTop);	
			document.addEventListener("scroll",this.setTop);
		},		
		goZP(a,b){
			this.bdtj(b[0],b[1],'--');
			this.$router.push({path: a})			
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
.tpN_a{
	background: #fff;
	height: 80px;
	width: 100%;
}
.isTop{
	z-index: 10000;
	position: fixed;
	top: 0;
	left: 0;
	-webkit-box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
    box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
}
.tpN_a2{
	position: relative;
	text-align: center;
	margin: 0 auto;
	line-height: 80px;
	width: 1300px;	
}
.tpN_a3{
	position: absolute;
	top: 0;
	left: 0;
	font-size: 16px;
	color: #1E1E1E;
    display: inline-block;

}
.setHeadBox_3{
	display: inline-block;
}
.setHeadBox_3>a{
	position: relative;
	display: inline-block;
	font-size: 14px;
	color: #1E1E1E;
	margin-right: 64px;
}
.setHeadBox_3>a:last-child{
	margin-right: 0;
}
.setHeadBox_3>a.router-link-active{
	color: #33B3FF;
}
.setHeadBox_3>a.router-link-active:after{
	content: "";
	position: absolute;
	bottom: 1px;
	left: 5%;
	
	width: 90%;
	height: 2px;
	background: #33B3FF;
}
.setHeadBox_3>a:hover{
	color: #33B3FF;
	opacity: .7;
}
</style>
