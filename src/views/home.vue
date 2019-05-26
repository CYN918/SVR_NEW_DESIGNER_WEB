<template>
	
	
	
	
	<div class="myCentBox">
		
		<div  class="banner" id="banner1" style="margin: 50px auto;">
			<div @click="test" class="banner-view"></div>
			<div class="banner-btn"></div>
			<div class="banner-number"></div>
			<div class="banner-progres"></div>
		</div>

		
		
		
		
		<list  class="" :config="data">
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
			banImg:[],
			banUrl:[],
			
		}
	},
	mounted: function () {	
		this.getBanner();
		
	}, 
	methods: {
		test(){
			if(this.banUrl[window.banenr2.index]){
				window.open(this.banUrl[window.banenr2.index]);
			}
			
		},
		getBanner(){
			this.api.getBanner().then((da)=>{
				this.banners = da;
				for(let i=0,n=da.length;i<n;i++){
					this.banImg.push(da[i].banner_pic);
					this.banUrl.push(da[i].jump_url);
				}
				window.banenr2 = new FragmentBanner({
					container : "#banner1",//选择容器 必选
					imgs : this.banImg,//图片集合 
					size : {
						width : 1300,
						height : 328
					},					
					grid : {
						line : 12,
						list : 14
					},
					index: 0,
					type : 2,
					boxTime : 3000,
					fnTime : 8000
				});

			});
			
		},		
	}
}
</script>

<style>
.ac_list_Box{
	position: relative;
	min-width: 1300px;
	box-sizing: border-box;
	overflow-x: hidden;
	padding: 20px 0 80px;
	
}
.ac_list_Box_0{
	width: 1300px;
	margin: 20px auto 0;
	text-align: left;
	padding-bottom: 120px;
}
.ac_list_Box_0>li{

	cursor: pointer;
	position: relative;
	display: inline-block;
	background: #F6F6F6;
	border-radius: 0 0 5px 5px;
	margin: 0 20px 20px 0;
	width: 640px;
	height: 460px;
	vertical-align: top;
}
.ac_list_Box_0>li:hover{
	opacity: .7;
}
.ac_list_Box_0>li:nth-child(2n+2){
	margin-right: 0;
}
</style>
