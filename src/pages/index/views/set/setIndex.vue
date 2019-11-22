<template>
	<div>
		<tophead :navData="navDatad"></tophead>
		<div class="setBox">
			<LeftNav :navDta="navDta" :setPz="setPz"></LeftNav>
			<component v-bind:is="tcZj"></component>					
		</div>		
	</div>
</template>

<script>
import tophead from '../../components/topNav_a';
import setSkill from './setSkill';
import setUser from './setUser';
import setSecurity from './setSecurity';
import LeftNav from '../../components/leftNav_a';
export default {
	name: 'works',
	components:{tophead,setSkill,setUser,setSecurity,LeftNav},
	data(){
		return{
			navDatad:{
				title:'账号设置',
				list:[
					{n:'基本信息',u:'/setUser',bdtj:['帐号设置','tag_基本信息_点击基本信息']},
					{n:'能力资料',u:'/setSkill',bdtj:['能力资料','tag_基本信息_点击能力资料']},
					{n:'账号安全',u:'/setSecurity',bdtj:['帐号设置','tag_基本信息_点击帐号安全']},
				],
				isScoll:1,
			},
			tcZj:'',
			navDta:[],
			setPz:{},
			lefList:{
				setUser:[
					{n:'个人资料',tj:['帐号设置','基本信息-个人资料'],num:73},
					{n:'教育背景',tj:['帐号设置','基本信息-教育背景'],num:646},
					{n:'联系方式',tj:['帐号设置','基本信息-联系方式'],num:700},
			
				],
				setSkill:[
					{n:'项目投入意向',tj:['帐号设置','能力资料-项目投入意向'],num:73},
					{n:'创作能力',tj:['帐号设置','能力资料-创作能力'],num:376},
				],
				setSecurity:[
					{n:'账号设置',tj:['帐号设置','账号安全-账号设置'],num:73},
					{n:'第三方账号绑定',tj:['帐号设置','账号安全-第三方账号绑定'],num:329},
					{n:'平台投稿人-认证信息',tj:['帐号设置','账号安全-认证信息'],num:450},
				],
			},
		}	
	},
	mounted: function () {			
		this.init();		
	}, 
	methods: {
		init(){
			this.tcZj = this.$route.name;
			this.navDta = this.lefList[this.$route.name];
			this.setScll(1);
		}
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
</style>