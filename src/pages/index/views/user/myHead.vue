<template>
	<div class="myWorks_1">
		<div class="myWorks_2">
			<span class="myWorks_3">{{con.title}}</span>
			<div class="myWorks_4">
				<a v-for="(el,index) in con.list" :key="index" :class="['pend',ison==el.a?'router-link-active':'']" @click="goZP(el)">{{el.b}}</a>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props:{
		con:{
			type:Object,
			default:{
				title:'',
				list:[]
			}
		},
	},
	data(){
		return{
			ison:''
		}
	},
	watch: {
		'$route': function() {
			this.init();
		},
	},
	mounted: function () {	
		this.init()	
	}, 	
	methods: {	
		init(){
			this.ison = this.$route.fullPath;
		},	
		goZP(el){
			console.log(el)
			if(this.con.bdtj){
				this.bdtj(this.con.bdtj,'tab_'+el.b,'--');
			}			
			this.$router.push({path:el.a})			
		},	
	},	
}	
</script>

<style>
.myWorks_1{
	min-width: 1300px;
	height: 80px;
	background: #FFFFFF;

}
.myWorks_2{
	position: relative;
	width: 1300px;
	line-height: 80px;
	margin: 0 auto;
}
.myWorks_3{
	position: absolute;
	top: 0;
	left: 0;

	font-size: 16px;
	color: #1E1E1E;
}
.myWorks_4>a{
	position: relative;
	display: inline-block;
	font-size: 14px;
	color: #1E1E1E;
	margin-right: 64px;
}
.myWorks_4>a:last-child{
	margin-right: 0;
}
.myWorks_4>a.router-link-active{
	color: #33B3FF;
}
.myWorks_4>a.router-link-active:after{
	content: "";
	position: absolute;
	bottom: -1px;
	left: 5%;	
	width: 90%;
	height: 2px;
	background: #33B3FF;
}
.myWorks_4>a:hover{
	color: #33B3FF;
	opacity: .7;
}
</style>
