<template>
	<div :class="['pr_boxd',total>40?'toptool':'']">
		<table v-if="List.length>0" class="tabld" border="1">
			<tr >
				<th v-for="(el,index) in cg.title" :key="index">{{el.n}}<img v-if="el.t == '1'"  @mouseout="mod()" @mouseover="modx($event,1)" class="pbx_n_06" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/project/09.svg" alt=""></th>
			</tr>
			<tr v-for="(el,index) in List" :key="index">
				<td v-for="(el2,index2) in cg.title" :key="index2">
					{{xData(el2,el)}}
					<span v-if="el2.html" v-html="el[el2.html]"></span>
					<span v-if="el2.temp" @click="clickFn(el2.temp.cFn,el)" :class="el2.temp.cls" >
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
			<!-- <div class="noDatawan">找不到数据了o(╥﹏╥)o</div> -->
			<div class="noDatawan">这里还什么都没有呢~</div>
		</div>
		<!-- <div v-if="sfas" class="sytc">
			<div class="sytc_1">
				<div class="sytc_1_n1">年收益加成</div>
				<div class="sytc_1_n2">若达成年累计收益条件，则该年后续每单项目均会获得额外百分比收益加成，年末累计收益清零重新计算。</div>
				<div class="sytc_1_n3">项目加成收益=验收价格*收益加成比</div>
				<div class="sytc_1_n4">
					<span class="sytc_1_n5">
						你的{{new Date().getFullYear()}}累计收益：
						<span class="sytc_1_n6">￥ {{basDa.year_total_income?basDa.year_total_income:0}}</span>
					</span>
					<span class="sytc_1_n7">
						当前收益加成：
						<span class="sytc_1_n8">+ {{basDa.gain_share_rate}}</span>
					</span>
				</div>
			</div>
			<div class="sytc_2">
				<div class="sytc_2_1">
					<span>达成条件</span><span>收益加成</span>
				</div>
				<div v-for="(el,index) in basDa.profit_config" :key="index" :class="backCl(index)">
					<span>累计收益达到 ￥ {{el.total_income}}</span><span>+ {{el.gain_share_rate}}%</span>
				</div>
				
				
			</div>
		</div>		 -->
	</div>
</template>

<script>
import { Loading } from 'element-ui';
export default {
	name: 'prTable',
	props:{
		cg:{
			type:Object,
			default:{pr:{}},
			sfas:'',
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
		},
		mod(e){
			alert(1)
		},
		modx(e,on){
			alert(2)
		},
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
	color: #33B3FF;
    margin-top: 18px;
}
.jc{
	color:rgba(255,146,0,1);
	
}
.pbx_n_06{
	margin-top: 19px;
}
.sy{
	color:rgba(255,146,0,1);
}
.proLink{
	color:rgba(51,51,51,1);
}
</style>
