<template>
	<div class="setHeadBox">
		<div class="setHeadBox_1">
			<span class="setHeadBox_2">{{navData.title}}</span>
			<div class="setHeadBox_3">
				<a v-for="(el,index) in navData.list" :class="['pend',ison==el.u?'router-link-active':'']" @click="goZP(el.u,el.bdtj)">{{el.n}}</a>								
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
		}
	},
	mounted: function () {	
		this.init();	
	}, 
	
	methods: {	
		init(){
			this.ison = this.$route.fullPath;
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
.setHeadBox{
	min-width: 1300px;
	height: 80px;
	background: #FFFFFF;

}

.setHeadBox_1{
	position: relative;
	width: 1300px;
	line-height: 80px;
	margin: 0 auto;
	text-align: left;
}
.setHeadBox_2{
	font-size: 16px;
	color: #1E1E1E;
    display: inline-block;
    width: 361px;
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
	color: #FF5121;
}
.setHeadBox_3>a.router-link-active:after{
	content: "";
	position: absolute;
	bottom: 1px;
	left: 5%;
	
	width: 90%;
	height: 2px;
	background: #FF5121;
}
.setHeadBox_3>a:hover{
	color: #FF5121;
	opacity: .7;
}
</style>
