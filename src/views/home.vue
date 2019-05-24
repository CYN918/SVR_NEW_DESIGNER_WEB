<template>
	<div class="csBox">
		<div class="banner">
			<div class="banner1">
				<img v-for="(el,index) in banners" @click="opend(el.jump_url)" :class="[banOn==index?'action':'']" :src="el.banner_pic" alt="">
			</div>
			<div class="banner_nav1">
				<span v-for="(el,index) in banners" @click="checkBan(index)" :class="[banOn==index?'action':'']"></span>
			</div>
			<div class="banner_jt pend banner_jt1" @click="checkBan1()"></div>
			<div class="banner_jt pend banner_jt2" @click="checkBan2()"></div>
		</div>
		<list class="" :config="data">
			<template v-slot:todo="{ todo }">
				<box_a :el="todo"></box_a>
			</template>			
		</list>
	</div>
</template>

<script>
import { Loading } from 'element-ui';
import list from '../components/list';
import box_a from '../components/box_a';
export default {
	components:{list,box_a},
	name: 'home',
	data(){
		return {
			data:{
				type:'box_a',
				ajax:{
					url:'getHList',
				}
			},
			banners:[],
			banOn:0,
			
			
		}
	},
	mounted: function () {	
		this.getBanner();
		
	}, 
	methods: {
		getBanner(){
			this.api.getBanner().then((da)=>{
				this.banners = da;
				setInterval(()=>{
					this.checkBan2();
				},5000);
			});
			
		},
		checkBan(on){
			this.banOn = on;
		},
		checkBan1(){
			if(this.banOn>0){
				this.banOn--;
				return
			}
			this.banOn = this.banners.length-1;
		},
		checkBan2(){
			if(this.banOn<this.banners.length-1){
				this.banOn++;
				return
			}
			this.banOn = 0;
		},
		
	}
}
</script>

<style>
</style>
