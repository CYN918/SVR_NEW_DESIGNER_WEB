<template>
	<div>
		<div class="ac_list_Box">
			<ul class="ac_list_Box_0">
				<li @click="goDetailed(el.id)" v-for="(el,index) in dataList" :key="index">
					<img class="ac_list_Box_1" :src="el.banner" alt="">
					<div class="ac_list_Box_2">
						<div class="ac_list_Box_4">{{el.activity_name}}</div>
						<div class="ac_list_Box_5"><span>{{el.category_name}}</span>投稿时间：{{el.start_time.split(" ")[0]}} 至 {{el.end_time.split(" ")[0]}}</div>
						<div class="ac_list_Box_3">
							<span v-if="el.left_day" class="ac_list_Box_6">{{el.left_day}}天</span><span v-if="el.left_day" class="ac_list_Box_7">距离截止</span>
							<span v-if="!el.left_day" class="ac_list_Box_8">已结束</span>
						</div>
					</div>				
				</li>				
			</ul>			
		</div>
		<el-pagination v-if="pL.total>40" class="pagesddd"
		background
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page="pL.page"
		:page-sizes="[20, 40, 80, 120]"
		:page-size="pL.limit"
		layout="prev,pager, next,sizes, jumper"
		:total="pL.total">   
		</el-pagination>
	</div>
</template>

<script>
export default {
	name: 'home',	 
	data(){	
		return{
			dataList:[],
			pL:{
				page:1,
				limit:20,
				total:0,
			}
		}
		
	},
	mounted: function () {	
		this.a_getList()
	}, 
	methods:{
		a_getList(){
				
			this.api.a_getList(this.pL).then((da)=>{
				if(!da){					
					return
				}
				
				this.dataList =da.data;
				this.pL.total = da.total;
				document.documentElement.scrollTop =0;
				document.body.scrollTop =0;
			});
		},
		handleSizeChange(val) {
			this.pL.limit = val;
			this.a_getList();
		},
		handleCurrentChange(val) {
			this.pL.page = val;
			this.a_getList();
		},
		goDetailed(id){
			
			this.$router.push({path:'/detailed',query:{id:id}});	
		}
	},
	
	
	
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
	margin: 20px auto 60px;
	text-align: left;
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
.ac_list_Box_1{

	border-radius: 5px 5px 0 0;
	display: block;
	width: 100%;
	height: 360px;
}
.ac_list_Box_2{
	position: relative;
	padding: 22px 20px 23px;
}
.ac_list_Box_4{
	font-size: 16px;
	color: #1E1E1E;
	margin-bottom: 14px;
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

</style>
