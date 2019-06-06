<template>
	<ul class="listBox">
		<li v-for="(el,index) in List" :key="index">
			<slot name="todo" v-bind:todo="el"></slot>			
		</li>
		<el-pagination class="pagesddd" v-if="total>40"
		background
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page="page"
		:page-sizes="[40, 80, 120, 160]"
		:page-size="limit"
		layout="prev,pager, next,sizes, jumper"
		:total="total">   
		</el-pagination>
		<div v-if="isNodeat" class="emptyData">
			<img src="/imge/k/empty_nodata@3x.png"/>
		</div>
	</ul>
	
</template>

<script>
import { Loading } from 'element-ui';
export default {
	props:{
		config:{
			type:Object,
			default:{
				pr:{},
			},
			
		}
	},
	data(){
		return{
			List:[],
			page:1,
			limit:40,
			total:0,
			isNodeat:'',
			loading: '',
			sxCs:{},
		}
	},
	mounted: function () {	
		this.getData();		
	}, 
	methods: {
		sxfn(){
			this.page=1;
			this.limit=40;
			console.log('进来了')
			this.getData();			
		},
		
		getData(da){	
			let params = {
				page:this.page,
				limit:this.limit
			};		
			params =  Object.assign(params,this.config.pr)		
			this.loading = Loading.service({ fullscreen: true });
			this.api[this.config.ajax.url](params).then((da)=>{
				this.loading.close();
				if(!da){
					return
				}				
				this.List = da.data;
				this.total = da.total;
				if(this.$parent.settotal){
					this.$parent.settotal(da.total);
				}
				if(this.List.length==0){
					this.isNodeat=1;
				}				
				window.scrollTo(0,0);
			}).catch(()=>{
				this.loading.close();
			})
		},
		handleSizeChange(val) {
			this.limit = val;
			this.page=1;
			this.getData();
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getData();
		}
	}
}
</script>
<style>
.listBox{
	margin: 0 auto 120px;
	text-align: left;
	width: 1300px;  
}
.listBox>li{
	display: inline-block;
	vertical-align: top;
}
.csBox .listBox>li:nth-child(4n+4)>div{
	margin-right: 0;
}
.emptyData{
	width: 1300px;
    margin: 120px auto;
    text-align: center;
}
.emptyData>img{
	display: block;
	margin: 0 auto;
}
</style>
