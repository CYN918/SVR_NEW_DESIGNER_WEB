<template>
	<ul :class="['listBox',total<page.limit?'nopage_':'']" ref="adLoDom">
		<li v-for="(el,index) in List" :key="index">
			<slot name="todo" v-bind:todo="el"></slot>			
		</li>
		<el-pagination class="pagesddd" v-if="total>page.limit"
		background
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page="page.page"
		:page-sizes="page.size"
		:page-size="page.limit"
		layout="prev,pager, next,sizes, jumper"
		:total="total">   
		</el-pagination>
		<div v-if="isNodeat" class="emptyData">
			<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/empty_nodata.svg" alt="">
			<div v-if="!config.noData" class="noDatawan">{{nodTip}}</div>
		</div>
		<div v-if="islod" class="jloadBox" ref="jloadBox"></div>
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
			noData:String,
		},
		nodTip:{
			type:String,
			default:'找不到数据了o(╥﹏╥)o',
		},
		page:{
			type:Object,
			default:
				()=>{
					return{
						limit:40,
						page:1,
						size:[40, 80, 120, 160],
					}
				}
			
		},
		isDjs:String,
		
	},
	data(){
		return{
			List:[],
			total:0,
			isNodeat:'',
			loading: '',
			sxCs:{},
			goTop:'',
			djsOn:0,
			islod:'',
		}
	},
	created(){
		
		let apid = sessionStorage.getItem('currentApi');
		if(apid==this.config.ajax.url){
			let currentpage = sessionStorage.getItem('currentpage'),
			currentlimit = sessionStorage.getItem('currentlimit');
			if(currentpage != null){
				this.page.page = Number(currentpage);
			};
			if(currentlimit != null){
				this.page.limit = Number(currentlimit);
			};
		}
		
					
	},
	mounted: function () {	
		
		let currentpage = null,
		currentlimit = null;
		let apid = sessionStorage.getItem('currentApi');
		if(apid==this.config.ajax.url){
			currentpage = sessionStorage.getItem('currentpage');
			currentlimit = sessionStorage.getItem('currentlimit');
		}
		if(this.$route.path){
			if(currentpage == null && currentlimit == null){
				this.page.page = 1;
				this.page.limit = 40;
			}
		}
		this.getData();	
	}, 
	beforeDestroy:function(){
		this.loading.close();
		this.removeSession();
	},
	watch:{
		'isNodeat'(){
			if(this.$parent.kfn){
				this.$parent.kfn(this.isNodeat);
			}
			
		},
	},
	methods: {
		removeSession(){
			
			
			sessionStorage.removeItem('currentpage')
		    sessionStorage.removeItem('currentlimit')
		},
		paramCl(){
			let pr = {
				page:this.page.page,
				limit:this.page.limit
			};	
			pr =  Object.assign(pr,this.config.pr);
			return pr;
		},
		
		
		sxfn(){
			this.page.page=1;
			this.page.limit=this.page.size[0];
			this.getData();			
		},
		
		getData(){	
			let params = this.paramCl();	
			this.isNodeat='';
			this.islod =1;
			this.loading = Loading.service({target:'.jloadBox', fullscreen: true,background:'rgba(0,0,0,0)' });
			this.api[this.config.ajax.url](params).then((da)=>{
				this.loading.close();
				this.islod ='';
				if(da=='error'){					
					if(this.List.length==0){
						this.isNodeat=1;
					}	
					return
				}
				
				this.List = da.data;
				this.total = da.total;
				
				if(this.isDjs){
					this.$parent.stardjs();
				}
				if(this.$parent.settotal){
					this.$parent.settotal(da.total);
				}
				if(this.List.length==0){
					this.isNodeat=1;
				}			
				if(this.goTop){
					document.documentElement.scrollTop =1;
					document.body.scrollTop =1;
					this.goTop='';
				}
			}).catch(()=>{
				this.loading.close();
				this.islod ='';
				if(this.List.length==0){
					this.isNodeat=1;
				}							
			})
		},
		handleSizeChange(val) {
			if(this.config.bdtj){
			
				this.bdtj(this.config.bdtj[1][0],this.config.bdtj[1][1],'--');
			}
			this.goTop=1;
			this.page.limit = val;
			sessionStorage.setItem('currentApi', this.config.ajax.url);
			sessionStorage.setItem('currentlimit', val);
			this.page.page=1;
			this.total=0;
			this.getData();
			
		},
		handleCurrentChange(val) {	
			if(this.config.bdtj){
				this.bdtj(this.config.bdtj[0][0],this.config.bdtj[0][1],'--');
			}
			this.goTop=1;
			this.total=0;
			this.page.page = val;
			sessionStorage.setItem('currentApi', this.config.ajax.url);
			sessionStorage.setItem('currentpage', val);
			this.getData();
		},

	}
}
</script>
<style>
.listBox{
	margin: 0 auto 120px;
	text-align: left;
	width: 1300px;  
}
.nopage_{
	margin-bottom: 0;
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
    margin: 20px auto 60px;
    text-align: center;
}
.emptyData>img{
	display: block;
	margin: 0 auto;
}

.jloadBox{
	z-index: 100001;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
