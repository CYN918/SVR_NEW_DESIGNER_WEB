<template>
	<div>
	<ul>
		<li v-for="(el,index) in List" :key="index">
			<slot name="todo" v-bind:todo="el"></slot>			
		</li>
	</ul>
	<el-pagination class="pagesddd" v-if="total>limit"
	background
	@size-change="handleSizeChange"
	@current-change="handleCurrentChange"
	:current-page="page"
	:page-sizes="[40, 80, 120, 160]"
	:page-size="limit"
	layout="prev,pager, next,sizes, jumper"
	:total="total">   
	</el-pagination>
	</div>
</template>

<script>
import box_a from './box_a';
import box_b from './box_b';
import { Loading } from 'element-ui';
export default {
	components:{box_a,box_b},
	props:{
		config:{
			type:Object,
			default:{}
		}
	},
	data(){
		return{
			shareData:{},
			List:[],
			page:1,
			limit:40,
			total:0,
			loading: '',
		}
	},
	mounted: function () {	
		this.getData();		
	}, 
	methods: {	
		getData(){
			window.scrollTo(0,0);
			let params = {
				page:this.page,
				limit:this.limit
			};
			if(window.userInfo){
				params.access_token = window.userInfo.access_token;
			}			
			this.loading = Loading.service({ fullscreen: true });
			this.api[this.config.ajax.url](params).then((da)=>{
				this.loading.close();
				if(!da){
					return
				}
				this.List = da.data;
				this.total = da.total;
			}).catch(()=>{
				this.loading.close();
			})
		},
		handleSizeChange(val) {
			this.limit = val;
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

</style>
