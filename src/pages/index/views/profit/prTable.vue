<template>
	<div :class="['pr_boxd',total>40?'toptool':'']">
		<table v-if="List.length>0" class="tabld" border="1">
			<tr >
				<th v-for="(el,index) in cg.title" :key="index">{{el.n}}</th>
			</tr>
			<tr v-for="(el,index) in List" :key="index">
				<td v-for="(el2,index2) in cg.title" :key="index2">
					{{xData(el2,el)}}
					<span v-if="el2.html" v-html="el[el2.html]"></span>
					<span @click="clickFn(el2.temp.cFn,el)" :class="el2.temp.cls" v-if="el2.temp">
						
						<span v-if="el2.temp.clfn" v-html="el2.temp.clfn(el)"></span>
						<span v-else>
							{{el2.temp.poprs?el[el2.temp.poprs]:el2.temp.value?el2.temp.value:''}}
						</span>
					</span> 
				</td>				
			</tr>	
		</table>	
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
			<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/empty_nodata.svg" alt="">
			<div class="noDatawan">找不到数据了o(╥﹏╥)o</div>
		</div>
	</div>
</template>

<script>
import { Loading } from 'element-ui';
export default {
	name: 'prTable',
	props:{
		cg:{
			type:Object,
			default:{pr:{}}
		},
	},
	data(){
		return {
			List:[],
			page:1,
			limit:40,
			total:0,
			isNodeat:'',
			loading: '',
		}
	},
	mounted: function(){
		this.getData();
	}, 
	methods: {
		clickFn(n,o){
			if(!this.$parent[n]){
				return
			}
			this.$parent[n](o);
		},
		xData(o1,o2){
			if(o1.poprs){
				return o2[o1.poprs]?o2[o1.poprs]:'';
			}
			
			if(o1.clfn){				
				return o1.clfn(o2);
			}
			
			if(o1.temp){
				
			}
		},
		sxfn(){
			this.page=1;
			this.limit=40;
			this.getData();
		},
		getData(da){			
			let params = {
				page:this.page,
				limit:this.limit
			};
			
			params =  Object.assign(params,this.cg.pr);		
			this.loading = Loading.service({ fullscreen: true });
			this.api[this.cg.ajax.url](params).then((da)=>{
				this.loading.close();
				if(da=='error'){
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
.pr_boxd{
	min-height: 315px;
	position: relative;
	width: 1300px;
	margin: 20px auto 60px;
}

.pr_boxd .pagesddd{
	bottom: 0;
}
.toptool{
	padding-bottom:80px;
}
.tabld{
	width: 100%;
	text-align: left;
	border: none;
	line-height: 55px;
	border-collapse: collapse;
}
.tabld th{
	padding-left: 20px;
	background: #fff;
	border: none;
	border-bottom: 1px solid #f6f8fa;

}
.tabld td{
	padding-left: 20px;
	border: none;
	background: #fff;
	border-bottom: 1px solid #f6f8fa;
}
.noDatawan{
	color: #ff5121;
    margin-top: 18px;
}
</style>
