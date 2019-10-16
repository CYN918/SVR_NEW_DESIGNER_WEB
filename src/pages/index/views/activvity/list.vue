<template>	
	<div class="activvit">
		<list :page="setPage" :config="data">
			<template v-slot:todo="{ todo }">
				<div class="ac_list_Box_0" @click="go(todo.id,todo.status==-1?'已结束':'进行中')">
					<div class="ac_list_Box_2x" :style="backBn(todo.cover_img?todo.cover_img:todo.banner)"></div>					
					<div class="ac_list_Box_2">
						<div class="ac_list_Box_4">{{todo.activity_name}}</div>
						<div class="ac_list_Box_5"><span>{{todo.category_name}}</span>投稿时间：{{todo.start_time.split(" ")[0]}} 至 {{todo.end_time.split(" ")[0]}}</div>
						<div class="ac_list_Box_3">
							<span v-if="todo.status==1" class="ac_list_Box_6">{{todo.left_day==0?'今':todo.left_day}}天</span><span v-if="todo.status==1" class="ac_list_Box_7">距离截止</span>
							<span v-else-if="todo.status==-1" class="ac_list_Box_8">已结束</span>
						</div>
					</div>
				</div>
			</template>			
		</list>
		
	</div>
</template>

<script>
import list from '../../components/list';
export default {
	components:{list},
	name: 'activvity_list',	 
	data(){	
		return{
			data:{
				ajax:{
					url:'a_getList',

				},
				bdtj:[['活动','活动列表-翻页'],['活动','活动列表-更改单页显示数']]
			},	
			setPage:{page:1,limit:10,size:[10,20,40,60]},
		}		
	},
	created(){
		this.init();
	},
	
	methods:{	
		bdtjCom(a){
			this.bdtj('活动','活动列表-'+a,'--');
		},
		init(){
		
			document.documentElement.scrollTop =1;
			document.body.scrollTop =1;
		},
		go(id,a){
			this.bdtjCom(a);
			window.open('/#/detailed?id='+id)
			
		},
		backBn(ur){
			return 'background-image: url('+ur+'?x-oss-process=image/resize,w_640);'
		}
	},
	
	
	
}
</script>

<style>
.activvit{
	background: #f4f6f9;
}
.activvit .listBox{
	margin-top: 20px;
}
.activvit .listBox>li:nth-child(2n+2)>div{
	margin-right: 0;
}
.ac_list_Box_0{
	cursor: pointer;
	background: #fff;
	border-radius: 5px;
	margin: 0 20px 20px 0;
	width: 640px;
	height: 460px;
}

.ac_list_Box_2{
	position: relative;
	padding: 22px 20px 23px;
}
.ac_list_Box_4{
	font-size: 16px;
	color: #1E1E1E;
	margin-bottom: 14px;
	width: 540px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.ac_list_Box_5{
	font-size: 14px;
	color: #999999;
}
.ac_list_Box_5>span{
    font-size: 12px;
    color: #999999;
    padding: 5px 10px;
    background: #E6E6E6;
    border-radius: 2px;
	margin-right: 10px;
}
.ac_list_Box_3{
	position: absolute;
	bottom: 26px;
	right: 20px;
	text-align:right;
}
.ac_list_Box_6{
	display: block;
	font-size: 16px;
	color: #1D1D1D;
	margin-bottom: 4px;
}
.ac_list_Box_7{
	font-size: 14px;
	color: #999999;
}
.ac_list_Box_8{
	display: inline-block;
	font-size: 16px;
	color: #999999;
	margin-bottom: 12px;
}
.ac_list_Box_2x{
	position: relative;
	border-radius: 5px 5px 0 0;
	overflow: hidden;
	display: block;
	width: 100%;
	height: 360px;
	background-size: cover;
    background-position: 50%,50%;
	
}
.ac_list_Box_1{
	position: absolute;
	top: 50%;
	left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
	display: block;
	min-width: 100%;
	min-height:100%;
}
</style>
