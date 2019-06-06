<template>
	<div class="csBox">
		<tophead></tophead>
		<div class="worksBox">
			<div class="worksBox_1">
				共发布{{total}}个作品 
				<div class="worksBox_2">
					{{sxData[sxtj].name}}
					<div class="worksBox_2_1">
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
import tophead from './head';
import list from '../../components/list';
import box_a from '../../components/box_a';
export default {
	name: 'works',
	components:{tophead,list,box_a},
	data(){
		return {
			data:{
				ajax:{
					url:'getUserWorkList',					
				},
				pr:{
					sort:'create_time',
				}				
			},	
			sxtj:0,
			sxData:[
				{name:'时间最新',key:'create_time'},
				{name:'推荐最多',key:'like_num'},
				{name:'评论最多',key:'comment_num'}
			],
			sort:'create_time',
			total:0,
			
		}
	},
	created(){
		this.init();
	},	
	mounted: function () {			
		// this.init();		
	}, 
	methods: {
		init(){
			if(!this.$route.query.id){
				this.$router.push({path:'/index'})	
				return 
			}
			this.data.pr.user_open_id = this.$route.query.id;
		},
		sxFn(on){
			if(this.sxtj==on){
				return
			}
			this.sxtj = on;			
			this.sort = this.sxData[on].key;
			this.data.pr.sort = this.sort;
			this.$refs.listDom.sxfn();
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
.worksBox_2{
	cursor: pointer;
	position: absolute;
	right: 0;
	top: 0;
	font-size: 14px;
	color: #666666;
	text-align: center;
	width: 95px;
}
.worksBox_2:after{
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
.worksBox_2:hover>.worksBox_2_1{
	display: block;
}
.worksBox_2_1{
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
.worksBox_2_1>div{
	line-height: 30px;
	font-size: 14px;
	color: #333333;
}
.worksBox_2_1>.oncdf{
	color: #FF5121;
}
.worksBox_2_1>div:hover{
	background: #E6E6E6;
}

</style>
