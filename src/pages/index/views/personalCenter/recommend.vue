<template>
	<div class="csBox csBoxNx1">
		<div class="worksBox">
			<div class="worksBox_1">
				共推荐{{total}}个作品 
				<div class="worksBox_2__x_1">
					{{sxData[sxtj].name}}
					<div class="worksBox_2__x_1_1x_c">
						<div @click="sxFn(index)" :class="sxtj==index?'oncdf':''" v-for="(el,index) in sxData">{{el.name}}</div>
					</div>
				</div>
			</div>					
		</div>
		<list :config="data" ref="listDom">
			<template v-slot:todo="{ todo }">
				<box_a :el="todo"></box_a>
			</template>			
		</list>	
		
	</div>
</template>

<script>
import list from '../../components/list';
import box_a from '../../components/box_a';
export default {
	name: 'works',
	components:{list,box_a},
	data(){
		return {
			data:{
				ajax:{
					url:'likeList',					
				},
				pr:{
					sort:'create_time',
				}	

			},	
			sxtj:0,
			sxData:[
				{name:'时间最新',key:'create_time'},
				
			],
			sort:'create_time',
			total:0,
			
		}
	},
	created(){
		this.init();
	},
	watch: {	
		'$route': function() {
			this.init();
			this.$refs.listDom.getData();
		},
	},
	methods: {
		init(){
			if(!this.$route.query.id){
				this.$router.push({path:'/index'})	
				return 
			}
			let pd = '他人视角-推荐Tag-';
			if(window.userInfo && this.$route.query.id ==  window.userInfo.open_id){
				pd='自己视角-推荐Tag-';
			}
			this.data.bdtj = [['个人主页',pd+'翻页'],['个人主页',pd+'更改单页显示数']];
			this.bdtj = [['个人主页',pd+'作品'],['个人主页',pd+'创作者']];
			this.data.pr.user_open_id = this.$route.query.id;
		},
		getData(){
			this.$refs.listDom.sxfn((da)=>{
				da.sort = this.sort;
				da.user_open_id = this.$route.query.id;
			});
		},
		sxFn(on){
			if(this.sxtj==on){
				return
			}
			this.sxtj = on;			
			this.sort = this.sxData[on].key;
			this.page=1;
			this.$refs.listDom.sxfn((da)=>{
				da.sort = this.sort;
				da.user_open_id = this.$route.query.id;
			});
		},
		settotal(n){
			this.total = n;
		}
	},

	
}
</script>

<style>
.worksBox{
	margin: 17px auto 0;
}
.worksBox_1{
	position: relative;
	width: 1300px;
	margin: 0 auto 17px;
	text-align: left;
	
}
.worksBox_2__x_1{
	cursor: pointer;
	position: absolute;
	right: 0;
	top: 0;
	font-size: 14px;
	color: #666666;
	text-align: center;
	width: 95px;
}
.worksBox_2__x_1:after{
	content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    border: 1px solid #666;
    border-bottom: 0;
    border-right: 0;
	margin-left: 8px;
    transform: rotate(-135deg);
    transform-origin: 70% 20%;
}
.worksBox_2__x_1:hover>.worksBox_2__x_1_1x_c{
	display: block;
}
.worksBox_2__x_1_1x_c{
	display: none;
	position: absolute;
	top: 19px;
	right: 0;
	z-index: 99;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 95px;
	padding: 10px 0;
	
}
.worksBox_2__x_1_1x_c>div{
	line-height: 30px;
	font-size: 14px;
	color: #333333;
}
.worksBox_2__x_1_1x_c>.oncdf{
	color: #FF5121;
}
.worksBox_2__x_1_1x_c>div:hover{
	background: #E6E6E6;
}

</style>
