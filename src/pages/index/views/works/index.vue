<template>
	<div class="csBox">		
		<div class="in_d1">
			<pTop class="in_d3" :cn="topCn">
				<template v-slot:todo="{ todo }">
					<div class="homghhd">
						<div class="md_titie">作品推荐</div>
						<div class="md_zt">
							<workNav></workNav>
						</div>
						<div v-if="data.pr.type==1" class="md_class">
							<el-select @change="setFL" v-model="value" placeholder="全部类型">
								<el-option 
								v-for="(item,index) in options"
								:key="index"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</div>						
					</div>	
					
				</template>		
			</pTop>
			
		</div>	
		<list :config="data" ref="sfafa">
			<template v-slot:todo="{ todo }">
				<box_a :tjData="bdtjdata" :el="todo"></box_a>
			</template>			
		</list>
	</div>
</template>
<script>
import workNav from './workNav';
import list from '../../components/list';
import box_a from '../../components/box_a';
import pTop from '../../components/postionTop';
export default {
	components:{list,box_a,pTop,workNav},
	name: 'home',
	data(){
		return {
			data:{
				ajax:{
					url:'work_worklist',
				},
				pr:{
					type:1
				},
				bdtj:[['首页','翻页'],['首页','更改单页显示数']]				
			},	
			topCn:{
				min:60,
			},
			bdtjdata:[['首页','作品'],['首页','创作者']],
			type:'rec',
			isTop:'',
			adFn:'',
			options:[],
			value:'',
			
			
		}
	},
	mounted: function(){
		this.init()		
	}, 
	methods: {
		init(){
			this.mJs.scTop(1);
			this.getClass();
		},
		setFL(){
			
			if(this.value){
				this.data.pr.classify_name = this.value;
			}else{
				this.data.pr = {
					type:this.data.pr.type
				};
			}
			this.mJs.scTop(1);
			this.$refs.sfafa.sxfn();	
		},
		qhZt(id){
			this.data.pr.type = id;
			this.value = '';
			this.mJs.scTop(1);	
			this.$refs.sfafa.sxfn();
		
		},

		getClass(){
			this.api.getClassify().then((da)=>{
				if(da=='error'){
					return
				}
				let arr1 = [{label:'全部分类',value:''}],arr2=[];
				for(let i=0,n=da.length;i<n;i++){
					arr1 = arr1.concat(sbd(da[i].sub_data));
				}
				function sbd(d){
					let arr = [];
					for(let i=0,n=d.length;i<n;i++){
						if(arr2.indexOf(d[i].classify_name)!=-1){
							continue
							return
						}
						arr2.push(d[i].classify_name);
						arr.push({label:d[i].classify_name,value:d[i].classify_name});
					}
					return arr;
				}
				this.options = arr1;   
			})
		}
	}
}
</script>

<style>
.proNav2{
	padding-top: 7px;
	border-bottom: 2px solid #E6E6E6;
}
.in_d1{
	height: 75px;	
}
.in_d3{
	width: 100%;
	height: 75px;
}
.proNav2_1{
	position: relative;
	text-align: center;
	margin: 0 auto;
	line-height: 48px;
	height: 48px;
	width: 1300px;
}
.proNav2_1>a{
	display: inline-block;
	margin: 0 20px;
	font-size:16px;
	font-weight:400;
	color:rgba(30,30,30,1);
}
.proNav2_1>a.router-link-active{
	font-weight:500;
	color:#33B3FF;
}
.proNav2_1>a.router-link-active:after{
	content: "";
	display: block;
	margin: 0 auto;
	background: #33B3FF;
	width: 100%;
	height: 2px;
	
}
.homghhd{
	position: relative;
	margin: 0 auto ;
	width: 1300px;
	padding: 27px 0 ;
	text-align: center;
}
	
.homghhd>a{
	position: relative;
	display: inline-block;
	font-size:16px;
	font-weight:400;
	color:rgba(30,30,30,1);
	line-height:22px;
	margin-right: 40px;
}
.homghhd>a.router-link-active{
	color: #33B3FF;
}

.in_d1 .p_isTop{
	z-index: 9999;
	position: fixed;
	top: 0;
	left: 0;

	width: 100%;
	-webkit-animation: bjs .3s linear forwards;
	animation: bjs .3s linear forwards;
	-webkit-box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
	box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
}
.md_titie{
	position: absolute;
	left: 0;
	top: 27px;
	font-size:16px;

	color:rgba(40,40,40,1);
	line-height:22px;
}
.md_class{
	position: absolute;
	right: 0;
	top: 17px;
	width: 90px;
}

.md_class input{
	border: none;
	
	font-size: 14px;
	background: initial;
	color: #999999;
}
</style>