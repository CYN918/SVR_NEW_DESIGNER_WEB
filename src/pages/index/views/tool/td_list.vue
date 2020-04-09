<template>
	<div  class="tlo_02"  @mouseover="setMos(1)" @mouseout="setMos('')">
		<tcEN 
		v-for="(el,index) in value" 
		v-model="value[index]"
		v-bind:conf="conf"
		v-bind:on="index"
		></tcEN>							
	</div>	
</template>
<script>
import tcEN from './td_zj';
export default{
	components:{
		tcEN
	},
	props:{
		value:Array,
		conf:Object
	},
	data(){
		return{
			Mos:'',
		}
	},
	methods:{
		setMos(on){
			this.Mos = on;
		},
		setHm(on,el){
			let list = this.value;
			let ond = el.start+(el.cut_end-el.cut_start);
			for(let i=on,n=list.length;i<n;i++){
				if(list[i+1]){
					list[i+1].start = list[i].start+(list[i].cut_end-list[i].cut_start);
				}				
			}		
		},
	}	
}
</script>

<style>
</style>
