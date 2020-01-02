<template>
	<div>
		<div class="setBox">
			<div class="setUserBoxs_nav">
				<div  v-for="(el,index) in navDta" :key="index" @click="setNavd(index)" :class="[index==navdOn?'action':'']">
					<span class="tjsj_2">{{el.n}}</span>
					<span v-if="el.l" :class="['tjsj_1',el.l>9?'tjsj_1':'']">{{backTj(el.l)}}</span>
				</div>	
			</div>
			<component v-bind:is="tcZj"></component>					
		</div>	
	</div>
</template>

<script>

import chat from './chat';
import comment from './comment';
import notify from './notify';
import LeftNav from '../../components/leftNav_a';
export default {
	name: 'works',
	components:{notify,chat,comment,LeftNav},
	data(){
		return{
			navdOn:0,
			tcZj:'',
			navDta:[
				{n:'通知'},
				{n:'评论/回复'},
				{n:'私信'},	
			],
			pz:{
				notify:{nOn:0},				
				comment:{nOn:1},
				chat:{nOn:2},
			}
			
		}	
	},
	mounted: function () {			
		this.init();	
		
	}, 
	methods: {
		init(){
			this.tcZj = this.$route.name;
			this.navdOn = this.pz[this.$route.name].nOn;
		},
		setNavd(on){
			let urld = ['notify','comment','chat'];
			this.$router.push({path: urld[on]});
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
.setBox{
	padding-top: 20px;
    width: 1300px;
    margin: 0 auto;
    text-align: left;
}


.ms_r{
	display: inline-block;
	width: 910px;
}
.ms_r_1{
	position: relative;
	padding-bottom: 60px;
}
.ms_r_2{
    text-align: center;
    width: 100%;
    font-size:14px;
	color:rgba(153,153,153,1);
	line-height:24px;
	color: #33B3FF;  
}
.ms_r_2>img{
	display: block;
	width: 100%;
	margin-bottom: 15px;

}
</style>